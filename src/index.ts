import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import driver from "./driver";

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

app.fire();
export default app;
