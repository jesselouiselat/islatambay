import { GoogleGenAI } from "@google/genai";
import env from "dotenv";

env.config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export default ai;
