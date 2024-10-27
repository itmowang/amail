import { Hono } from "hono/dist/types/hono";
import { Context } from "hono/dist/types/context";

export default (app: Hono, path: string) => {
  // 测试的生成接口
  app.get(`${path}/test`, async (c: Context) => {
    try {
      // 随机生成随机邮箱前缀
      const randomEmail = Math.random().toString(36).substring(7);
      // 判断邮箱是否已存在
      const exist = await c.env.amailkv.get(randomEmail, "prefix");
      if (exist) {
        return c.json({ status: 400, message: "邮箱已存在" });
      } else {
        // const expirationTimeInSeconds = 3600; // 设置过期时间为1小时
        // const currentTime = Math.floor(Date.now() / 1000); // 获取当前时间的秒数
        // const expirationTime = currentTime + expirationTimeInSeconds; // 计算过期时间
        // 创建一条随机邮箱的kv值 并且设定过期时间
        const isRandowm = await c.env.amailkv.put(randomEmail, "prefix", {
            expirationTtl: 3600,
        });
        // 操作cloudflare API 操作某域名电子邮件路由，拿取反馈信息
        // 明天写。。。
        
        
        return c.json({
          status: 200,
          data: {
            prefix: randomEmail,
            test: isRandowm,
          },
          message: "邮箱已生成",
        });
      }
      //    const as =  await c.env.amailkv.put("name", "123123");
    } catch (error) {
      console.log(error);
      return c.json({
        status: 500,
        message: "创建失败",
      });
    }
  });
};
