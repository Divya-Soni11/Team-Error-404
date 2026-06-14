from PIL import Image
from fastapi import FastAPI, UploadFile, File, Body
from pypdf import PdfReader
from dotenv import load_dotenv
import google.generativeai as genai
import os

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
    global documnets
    global chat_history
    product = data.get("product")
    question = data.get("question")
    
    
    if product not in chat_history:
      chat_history[product] = []


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

    pdf_content = documents[product]
    history = "\n".join(
    chat_history[product]
)
    prompt = f"""
You are an experienced product technician.

Use the conversation history and product manual.

CONVERSATION HISTORY:
{history}

PRODUCT MANUAL:
{pdf_content[:30000]}

LATEST USER MESSAGE:
{question}

Rules:

1. Remember previous conversation.
2. Ask diagnostic questions when needed.
3. Narrow down probable causes.
4. Do not repeat previous questions.
5. Reference the manual whenever possible.
6. Continue the conversation naturally.
"""

    response = model.generate_content(prompt)
    chat_history[product].append(
    f"User: {question}"
)

    chat_history[product].append(
    f"Assistant: {response.text}"
)
    return {
        "pdf_length": len(pdf_content),
         "product": product,
        "answer": response.text
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
        f.write(
            await file.read()
        )

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

    # Save extracted text globally
    documents[file.filename] = text

    print("\n===== PDF CONTENT LENGTH =====")
    print(len(text))

    print("\n===== FIRST 1000 CHARACTERS =====")
    print(text[:1000])

    return {
        "filename": file.filename,
        "characters_extracted": len(text),
        "total_documents": len(documents),
        "preview": text[:1000]
    }

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

    pdf_content = documents[product]

    prompt = f"""
You are an experienced product technician.

Analyze the uploaded image.

Use the product manual below as reference.

PRODUCT MANUAL:
{pdf_content[:30000]}

Tasks:
1. Identify what is visible in the image.
2. Identify any error code, warning light, damaged part, or issue.
3. Relate it to the manual.
4. Suggest diagnostic steps.
5. Suggest possible solutions.

Be specific and helpful.
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