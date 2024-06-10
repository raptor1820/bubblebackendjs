import { extract } from "@extractus/article-extractor/";
import { stripHtml } from "string-strip-html";

const extractArticleText = async (articleUrl: string) => {
    let cleantext: string = await extract(articleUrl)
        .then((res) => {
            if (res?.content) return stripHtml(res.content).result;
            else return "No content found";
        })
        .catch((error) => {
            console.error(error);
            return "";
        })
        .then((response) => response);
    return cleantext;
};

export default extractArticleText;
