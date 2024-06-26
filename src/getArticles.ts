import { config } from "dotenv";
config({
    path: "../.env",
});

const apiKey = process.env.GOOGLE_SEARCH_KEY;
const cxKey = process.env.GOOGLE_CX_KEY;

const getArticles = async (searchParam: string) => {
    if (searchParam === "error") return { error: "error" };
    let queryUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cxKey}&q=${searchParam}`;
    const response = await fetch(queryUrl)
        .then((response) => response.json())
        .then((res) => res);
    let cleanedLinks = [];
    if (response.items) {
        for (let i = 0; i < response.items.length; i++) {
            let entry = response.items[i];
            cleanedLinks.push({
                title: entry.title,
                displayLink: entry.displayLink,
                link: entry.link,
                read_time: "0 min",
            });
        }
    }
    return cleanedLinks;
};

export default getArticles;
