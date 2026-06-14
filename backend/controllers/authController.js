import express from 'express';
import bcrypt from 'bcryptjs';
import Company from '../schemas/companySchema.js';
import User from '../schemas/userSchema.js';


export const registerCompany=async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingCompany = await Company.findOne({ email });
        if (existingCompany) {
            return res.status(400).json({ message: "Company email already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newCompany = new Company({
            name,
            email,
            password: hashedPassword 
        });

        await newCompany.save();
        res.status(201).json({ message: "Company profile created successfully!" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const registerUser=async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User email already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "User profile created successfully!" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const loginCompany= async (req,res)=>{

    try {
        const { email, password } = req.body;

        const foundCompany = await Company.findOne({ email: email.toLowerCase() });
        
        if (!foundCompany) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, foundCompany.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const payload = {
            id: foundCompany._id,
            email: foundCompany.email,
            name: foundCompany.name,
            role: "company" // Helps your backend distinguish companies from regular users later
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        return res.status(200).json({
            message: "Login successful!",
            token: token,
            company: {
                id: foundCompany._id,
                name: foundCompany.name,
                email: foundCompany.email
            }
        });

    } catch (error) {
        console.error("Login Error: ", error.message);
        return res.status(500).json({ message: "Server error during login" });
    }
}

export const loginUser= async (req,res)=>{

    try {
        const { email, password } = req.body;

        const foundUser = await Company.findOne({ email: email.toLowerCase() });
        
        if (!foundUser) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, foundUser.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const payload = {
            id: foundUser._id,
            email: foundUser.email,
            name: foundUser.name,
            role: "user" 
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        return res.status(200).json({
            message: "Login successful!",
            token: token,
            company: {
                id: foundUser._id,
                name: foundUser.name,
                email: foundUser.email
            }
        });

    } catch (error) {
        console.error("Login Error: ", error.message);
        return res.status(500).json({ message: "Server error during login" });
    }
}