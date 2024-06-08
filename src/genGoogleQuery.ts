import OpenAI from "openai";
import { config } from "dotenv";
config({
    path: "../.env",
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const genGoogleQuery = async (article: string) => {
    if (!article) {
        return "error";
    }
    const title = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [
            {
                role: "user",
                content:
                    article +
                    "\nGenerate a possible Google Search Query in less than 20 words that could return articles having the opposite sentiments to the main object of the above article. Return just the query.  Do not name anyone or any group except the main object. DO not use any proper nouns except the name of the main object. Keep in mind that the sentiment has to be opposite to what is reflected in the article. It should be a Google Search query. ",
            },
        ],
        temperature: 0.7,
        max_tokens: 20,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    return title.choices[0].message.content?.replaceAll('"', "");
};

export default genGoogleQuery;
