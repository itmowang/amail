import { Hono } from "hono";

import { jwt } from "hono/jwt";
import { cors } from "hono/cors";
import { Context } from "vm";
import mail from "./src/mail";


const app = new Hono().basePath("/api");

// app.use("*", cors());

// app.use("/mail/*", jwt({ secret: "mowang" }));


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
  return c.json({
        status:status || 500,
        message: err,
      },
    status
  );
  // return c.text("Custom Error Message", 500 );
});

export default app;