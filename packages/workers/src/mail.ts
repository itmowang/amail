import { Hono } from "hono/dist/types/hono";
import { Context } from "hono/dist/types/context";

export default (app: Hono, path: string) => {
 // 刷新当前邮箱列表
 app.get(`${path}/refetch`, async (c: Context) => {
  const {name} = c.req.query();   
  const inboxJSONString = (await c.env.amailkv.get(name)) || "[]";
  const inboxJSON = JSON.parse(inboxJSONString);
  inboxJSON.reverse();
  return new Response(JSON.stringify(inboxJSON), { headers: { "content-type": "application/json" } });
});
};
