import { Hono } from "hono";
import driver from "./driver";
const app = new Hono();

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

export default app;
