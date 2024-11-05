# 关于AMAIL 邮件服务

AMAIL 是一个基于Cloudflare Email Routeing的邮件服务，用于快速搭建临时邮箱服务。


# 快速上手

1. 创建一个 Cloudflare 账户，并且绑定好一个属于自己的域名。 并且创建一个 Cloudflare Pages 项目。和一个 Cloudflare Workers。同样的也建立好KV存储。

2.  修改 **/packages/workers/wrangler.toml** 中的 **name** 改为你的cloudflare workers名称。 并且修改kv的`binding` `id`，修改 **/packages/web/wrangler.toml** 中的 `name` 改为你的cloudflare pages的所属name

3. 修改 **/packages/web/config.ts** 中的 `nuxt.config.ts` 文件

```js
public: {
    API_URL: "amail.xmw.pw",  // 你的workers绑定的域名
    EMAIL_DOMAIN: "xmw.pw"    // 你所使用的邮箱域名
}
```

4. 创建一个 Cloudflare routeing，开启 `Catch-all addres`s 模式，并指向 `Workers` 为邮件接受地

![0](http://img.blog.loli.wang/2024-11-05-amail/3.png)

5. 执行命令一键部署

```bash
pnpm build
```

### 预览
![0](http://img.blog.loli.wang/2024-11-05-amail/0.png)
![0](http://img.blog.loli.wang/2024-11-05-amail/1.png)


### 

[演示地址](https://xmw.pw)

[GitHub](https://github.com/itmowang/amail)