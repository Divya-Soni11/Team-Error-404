from gtts import gTTS
from PIL import Image
from fastapi import FastAPI, UploadFile, File, Body
from pypdf import PdfReader
from dotenv import load_dotenv
import google.generativeai as genai
import os
from fastapi.middleware.cors import CORSMiddleware

from sentence_transformers import SentenceTransformer
import chromadb


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # hackathon quick fix
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# -------------------------------
# supporting multiple product queries at a time , earlier last feeded data was getting lost after uploading new pdf 
# -------------------------------
documents = {}
chat_history = {}

# -------------------------------
# FastAPI App
# -------------------------------
app = FastAPI()

# -------------------------------
# Load Gemini API Key
# -------------------------------
load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

embedding_model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

chroma_client = chromadb.Client()

collection = chroma_client.get_or_create_collection(
    name="manuals"
)


# -------------------------------
# Upload Directory
# -------------------------------
UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)

# -------------------------------
# Home Route
# -------------------------------
@app.get("/products")
def get_products():
    return {
        "products": list(documents.keys())
    }

# -------------------------------
# Ask Question From Uploaded PDF
# -------------------------------
@app.post("/ask")
async def ask_question(
    data: dict = Body(...)
):
    global documents
    global chat_history

    product = data.get("product")
    question = data.get("question")

    if not product:
        return {
            "error": "Product filename is required"
        }

    if not question:
        return {
            "error": "Question is required"
        }

    if product not in documents:
        return {
            "error": f"{product} not found"
        }

    if product not in chat_history:
        chat_history[product] = []

    # -----------------------------
    # Get conversation history
    # -----------------------------
    history = "\n".join(
        chat_history[product]
    )

    # -----------------------------
    # ChromaDB Retrieval
    # -----------------------------
    question_embedding = embedding_model.encode(
        question
    ).tolist()

    results = collection.query(
        query_embeddings=[question_embedding],
        n_results=3
    )

    relevant_chunks = "\n".join(
        results["documents"][0]
    )

    # -----------------------------
    # Prompt
    # -----------------------------
    prompt = f"""
You are an experienced product technician.

Use the conversation history and retrieved manual content.

CONVERSATION HISTORY:
{history}

RELEVANT MANUAL CONTENT:
{relevant_chunks}

LATEST USER MESSAGE:
{question}

Rules:

1. Remember previous conversation.
2. Ask diagnostic questions when needed.
3. Narrow down probable causes.
4. Do not repeat previous questions.
5. Reference the manual whenever possible.
6. Continue the conversation naturally.

Important:
Answer in the same language as the user.

For Reference:
If the user asks in Hindi, answer in Hindi.
If the user asks in Punjabi, answer in Punjabi.
If the user asks in English, answer in English.

If the answer is not available in the retrieved content,
say:
'Information not found in uploaded manual.'
"""

    response = model.generate_content(
        prompt
    )

    chat_history[product].append(
        f"User: {question}"
    )

    chat_history[product].append(
        f"Assistant: {response.text}"
    )

    return {
        "product": product,
        "retrieved_chunks": len(results["documents"][0]),
        "answer": response.text
    }

#---------------------Chat-------------

@app.post("/chat")
async def chat(data: dict = Body(...)):
    product = data.get("product")
    message = data.get("message")

    if not product or not message:
        return {"error": "product and message required"}

    if product not in documents:
        return {"error": "product not found"}

    pdf_content = documents[product]

    history = "\n".join(chat_history.get(product, []))

    prompt = f"""
You are a diagnostic product technician assistant.

Use ONLY product manual and history.

History:
{history}

Manual:
{pdf_content[:30000]}

User Issue:
{message}

Return:
- Answer
- 2-3 diagnostic questions
- step-by-step fix
- source reference
"""

    response = model.generate_content(prompt)

    chat_history.setdefault(product, [])

    chat_history[product].append(f"User: {message}")
    chat_history[product].append(f"AI: {response.text}")

    return {
        "answer": response.text,
        "product": product
    }

# -------------------------------
# Upload PDF Route
# -------------------------------
@app.post("/upload-pdf")
async def upload_pdf(
    file: UploadFile = File(...)
):
    global documents

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(file_path, "wb") as f:
        f.write(await file.read())

    reader = PdfReader(file_path)

    text = ""

    for i, page in enumerate(reader.pages):

        extracted = page.extract_text()

        print(f"\n--- PAGE {i+1} ---")

        if extracted:
            print(extracted[:500])
            text += extracted + "\n"
        else:
            print("No text extracted")

    # Save extracted text
    documents[file.filename] = text

    # Create chunks
    chunks = [
        text[i:i+1000]
        for i in range(0, len(text), 1000)
    ]

    # Store chunks in ChromaDB
    for idx, chunk in enumerate(chunks):

        embedding = embedding_model.encode(
            chunk
        ).tolist()

        collection.add(
            ids=[f"{file.filename}_{idx}"],
            documents=[chunk],
            embeddings=[embedding],
            metadatas=[{
                "product": file.filename
            }]
        )

    print("\n===== PDF CONTENT LENGTH =====")
    print(len(text))

    print("\n===== FIRST 1000 CHARACTERS =====")
    print(text[:1000])

    return {
        "filename": file.filename,
        "characters_extracted": len(text),
        "total_documents": len(documents),
        "chunks_created": len(chunks),
        "preview": text[:1000]
    }

#----------Analyze Image-------------------

@app.post("/analyze-image")
async def analyze_image(
    product: str,
    file: UploadFile = File(...)
):

    global documents

    if product not in documents:
        return {
            "error": "Product not found"
        }

    image_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(image_path, "wb") as f:
        f.write(await file.read())

    image = Image.open(image_path)

    manual_content = documents[product]

    prompt = f"""
You are an experienced product technician.

A user has uploaded an image related to a product issue.

Use BOTH:
1. The uploaded image
2. The product manual

PRODUCT MANUAL:
{manual_content[:30000]}

Tasks:

1. Describe what you see in the image.
2. Detect any error code, warning light, damaged part, screen message, or issue.
3. Explain the likely cause.
4. Suggest troubleshooting steps.
5. Reference the product manual whenever possible.

Keep the response structured.

Format:

Issue Detected:
Possible Cause:
Recommended Checks:
Recommended Solution:
"""

    response = model.generate_content(
        [prompt, image]
    )

    return {
        "product": product,
        "analysis": response.text
    }

@app.post("/reset-chat")
async def reset_chat(
    data: dict = Body(...)
):
    global chat_history

    product = data.get("product")

    if product in chat_history:
        chat_history[product] = []

    return {
        "message": f"Chat reset for {product}"
    }

#------------------voice assistant 


@app.post("/voice-assistant")
async def voice_assistant(
    data: dict = Body(...)
):

    product = data.get("product")
    question = data.get("question")

    if product not in documents:
        return {
            "error": "Product not found"
        }

    manual_content = documents[product]

    prompt = f"""
You are an expert technician.

Use the manual below.

MANUAL:
{manual_content[:15000]}

USER ISSUE:
{question}
"""

    response = model.generate_content(
        prompt
    )

    answer = response.text

    tts = gTTS(
        text=answer,
        lang="en"
    )

    tts.save("response.mp3")

    return {
        "answer": answer,
        "audio_file": "response.mp3"
    }