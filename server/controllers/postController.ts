import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware.js";
import { GoogleGenAI } from "@google/genai";
import axios from "axios"
import cloudinary from "../config/cloudinary.js";



// Generate post
export const generatePost = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { prompt, tone, generateImage } = req.body;

        if (!prompt || typeof prompt !== "string") {
            res.status(400).json({ message: "Prompt is required" });
            return;
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            res.status(400).json({ message: "Gemini Api Key is missing. Please add to your server/.env file" });
            return;
        }

        const ai = new GoogleGenAI({ apiKey });

        // 1) Text
        const textResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate a social media post based on this prompt: "${prompt}".
            Tone: ${tone || "professional"}.
            Include relevant hashtags.
            Respond ONLY with valid JSON in this format:
            {"content": "...", "imagePrompt": "..."}
            The "imagePrompt" should be a highly descriptive prompt for an image generator
            that complements this post.`,
        });

        let content = "";
        let imagePrompt = prompt;

        const rawText = textResponse.text || "";
        try {
            const jsonMatch = rawText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const data = JSON.parse(jsonMatch[0]);
                content = data.content || rawText;
                imagePrompt = data.imagePrompt || prompt;
            } else {
                content = rawText;
            }
        } catch (e) {
            content = rawText;
        }

        // 2) Image (optional)
        let mediaUrl = "";
        let mediaType: "image" | "" = "";

        if (generateImage) {
            try {
                const imageResponse = await ai.models.generateContent({
                    model: "gemini-2.5-flash-image",
                    contents: imagePrompt,
                });

                const parts = imageResponse.candidates?.[0]?.content?.parts || [];
                const imagePart = parts.find((p: any) => p.inlineData?.data);

                if (imagePart?.inlineData?.data) {
                    const mime = imagePart.inlineData.mimeType || "image/png";
                    const dataUri = `data:${mime};base64,${imagePart.inlineData.data}`;

                    const upload = await cloudinary.uploader.upload(dataUri, {
                        folder: "social-posts",
                        resource_type: "image",
                    });

                    mediaUrl = upload.secure_url;
                    mediaType = "image";
                }
            } catch (imgError: any) {
                // image fail ho to bhi text return ho jaye
                console.error("Image generation error:", imgError.message);
            }
        }

        res.status(200).json({ content, imagePrompt, mediaUrl, mediaType });
    } catch (error: any) {
        console.error("Generate post error:", error);
        res.status(500).json({ message: "Failed to generate post", error: error.message });
    }
};

// Get Generations
export const getGenerations=async(req:AuthRequest,res:Response):Promise<void>=>{
    
} 

// Get Posts
export const getPosts=async(req:AuthRequest,res:Response):Promise<void>=>{
    
} 

// Schedule Posts
export const SchedulePosts=async(req:AuthRequest,res:Response):Promise<void>=>{
    
} 