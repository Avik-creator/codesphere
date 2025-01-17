import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const POST = async (request: Request) => {
  try {
    const { question } = await request.json();
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Q: ${question}\nA:`;

    // Generate content asynchronously
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    if (!question) {
      return NextResponse.json({ error: "Missing question in request body" });
    }

    // Handle the rest of your code here...

    // Add a return statement here, e.g., return a success response
    return NextResponse.json({ text });
  } catch (error) {
    // Handle errors here
    return NextResponse.json({ error: error || "Unknown error" });
  }
};
