import OpenAI from "openai";
import { config } from "dotenv";
config({ path: "../.env" });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const summarizeArticle = async (text: string): Promise<string> => {
  if (!text) return "";
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "user",
          content: `Summarize the following article in three sentences:\n${text}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });
    return completion.choices[0].message.content?.trim() || "";
  } catch (error) {
    console.error(error);
    return "";
  }
};

export default summarizeArticle;
