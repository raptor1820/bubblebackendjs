import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import driver from "./driver";
import extractArticleText from "./extractArticleText";
import summarizeArticle from "./summarizeArticle";
import estimateReadTime from "./estimateReadTime";

const app = new Hono();

app.use(logger());
app.use(cors());

app.get("/", async (c) => {
    let url;
    let param = c.req.queries("url");
    if (param) {
        url = param[0];
        const response = await driver(url);
        return c.json(response);
    } else
        return c.json({
            error: "error",
        });
});

app.get("/summary", async (c) => {
    const url = c.req.query("url");
    if (!url) {
        return c.json({ error: "error" });
    }
    const text = await extractArticleText(url);
    const summary = await summarizeArticle(text);
    const read_time = estimateReadTime(text);
    return c.json({ summary, read_time });
});

app.fire();
export default app;
