# GYO PRO PTY LTD — 品牌宣传网站需求

## 目标

让 GYO PRO PTY LTD 在 Google 搜索可被搜到；展示品牌和服务；接客户咨询。

## 品牌资产

- **公司全称**: GYO PRO PTY LTD
- **域名**: gyopro.com.au（计划中）
- **logo**: 见 `图2.jpg`（金色渐变双屋 icon + GYO PRO PTY LTD 字标，白底）
- **tagline**: "Plaster & Gyprock specialist Services"
- **主营**: 商业 + 住宅项目的石膏板吊顶与隔墙
- **品牌色调**: 深色纹理背景 + 金色 logo + 米白文字（基于图1、图3的视觉语言）

## 服务清单（5 项）

1. Cornices, Sq set, P50…
2. Insulation
3. Framing
4. Plasterboard
5. **Float and Set Rendering**（新增）

## 联系方式

- Elsa + 61 450 920 702（英文）
- Yao + 61 452 053 381（仅限中文）
- Email: Manager@gyopro.com.au

## 服务区域

澳大利亚全国。

## 语言策略

英文为主（SEO 主战场）；中文联系方式在 contact 区独立展示，不做双语站点。

## 商务合规

ABN 待用户提供，footer 与 schema.org 结构化数据保留位置。

## 站点结构（v1 单页 + 可扩展）

单页 + 锚点 section。后期可拆分为多页（每个服务独立页利于 SEO）。

| Section | 来源图 | 内容要点 |
|---|---|---|
| Hero | 图1 | logo + tagline + 联系方式 + 工作照片 collage |
| Services | 图3 | 标题 + 5 项服务清单 + 建筑描线视觉 |
| Projects | 待补充 | 项目案例照片 gallery（用户后期上传） |
| Contact | 图1 右侧 | Elsa / Yao / Email + 简单表单（mailto 或第三方） |
| Footer | 新增 | ABN 占位、版权、服务区域 |

## SEO 要求

- `<title>` / `<meta description>` 优化"GYO PRO PTY LTD"、"Plaster & Gyprock specialist"
- Open Graph / Twitter Card
- Schema.org `HomeAndConstructionBusiness` 结构化数据（含 address、areaServed、contactPoint）
- `sitemap.xml`、`robots.txt`
- 语义化 HTML（h1/h2/h3 层级）
- 图片 alt 文本
- 移动端响应式
- 加载快（无重型 JS）

## 技术栈

- 纯静态 HTML + CSS + JS（零构建）
- 部署：Netlify / Vercel / Cloudflare Pages（任一免费 tier）
- 后期如需多页，迁移到 Astro / 11ty 增量式 SSG

## 设计语言

- 深色（接近 `#1a1a1a`）纹理背景
- 金色 logo 为主视觉锚
- 字体：标题无衬线 + 正文衬线（拟澳洲建筑行业稳重感）
- 不引入 icon font，用 inline SVG 或 CSS 绘制装饰图形

## 资产文件

- `图1.jpg` — 联系卡主视觉（参考）
- `图2.jpg` — logo（白底）
- `图3.jpg` — 服务介绍模板（参考）
- 项目照片：用户后续上传到 `photos/` 目录

## 决策记录

| 项 | 选择 |
|---|---|
| 交付形态 | 品牌宣传网站 |
| 语言 | 英文为主 + 中文联系单独 |
| 域名 | gyopro.com.au |
| 技术栈 | 纯静态 HTML/CSS/JS |
| 服务区域 | 澳大利亚全国 |
| ABN | 占位，用户后期填 |
| 照片 | 先骨架，后期替换 |
| Float and Set Rendering | 加入 Services 清单 |
| 照片位置 | Hero 区 collage + Projects section |