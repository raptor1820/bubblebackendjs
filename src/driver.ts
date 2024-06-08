import extractArticleText from "./extractArticleText";
import genGoogleQuery from "./genGoogleQuery";
import getArticles from "./getArticles";

const driver = async (url: string) => {
    let text = await extractArticleText(url);
    let googleQuery = await genGoogleQuery(text);
    let cleanedLinks;
    if (googleQuery) {
        cleanedLinks = await getArticles(googleQuery);
    } else cleanedLinks = [{ error: "error" }];
    return cleanedLinks;
};

export default driver;
