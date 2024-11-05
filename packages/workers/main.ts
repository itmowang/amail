import PostalMime, { RawEmail } from "postal-mime";
import { Hono } from "hono";
import { Context } from "vm";
import { cors } from "hono/cors";
import mail from "./src/mail";

const app = new Hono().basePath("/api");

app.use("*", cors());
app.get("/", (c) => c.text("GET /"));
app.post("/", (c) => c.text("POST /"));
app.put("/", (c) => c.text("PUT /"));
app.delete("/", (c) => c.text("DELETE /"));

//  routes
mail(app, "/mail");

app.notFound((c) => {
  return c.text("Custom 404 Message", 404);
});

app.onError((err, c: Context) => {
  const cError = c?.error;
  const status = cError?.status;
  return c.json(
    {
      status: status || 500,
      message: err,
    },
    status
  );
});

export default {
  ...app,
  async email(message: any, env: any, ctx: any) {
    const parser = new PostalMime();
    const email = await parser.parse(message.raw);
    const inboxJSON = (await env.amailkv.get(message.to)) || "[]";
    const inbox = JSON.parse(inboxJSON);
    await inbox.push(email);
    await env.amailkv.put(message.to, JSON.stringify(inbox), {
      expirationTtl: env.EMAIL_TIMEOUT,
    });
  },
};

// export default app;
