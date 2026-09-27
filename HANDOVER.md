# GYO PRO PTY LTD — 项目交接文档

> **最后更新**: 2026-09-27 · **接手**: 任何开发者或你自己 · **状态**: 活跃开发

---

## 0. 项目一句话

`gyopro.com.au` — 澳大利亚石膏板/抹灰公司 GYO PRO PTY LTD 的品牌宣传网站 + 后台 CMS。

---

## 1. 核心信息速查

| 项 | 值 |
|---|---|
| 公司名 | GYO PRO PTY LTD |
| 域名（主） | `gyopro.com.au` |
| 域名（待 redirect） | `gyopro.net.au`（已停用 Netlify alias 模式） |
| 邮箱 | `Manager@gyopro.com.au` |
| ABN | `60 681 278 982` |
| 联系人 | Elsa（英文）/ 姚（中文） |
| GitHub 仓库 | `https://github.com/MatthewGXY/gyopro-website`（公开） |
| Netlify 站点 | `https://app.netlify.com/` → `gyopro-website` |
| 在线 URL | `https://gyopro.com.au/` |
| 后台 CMS | `https://gyopro.com.au/admin/` |

---

## 2. 技术栈

| 层 | 技术 |
|---|---|
| 静态生成器 | **Eleventy 3.x** (`@11ty/eleventy`) |
| 模板语言 | Nunjucks (`.njk`) |
| 样式 | 纯 CSS（`assets/css/main.css`，无框架） |
| 脚本 | 纯 JS（`assets/js/main.js`） |
| 内容存储 | JSON (`src/_data/*.json`) + Markdown frontmatter (`src/projects/*.md`) |
| CMS | **Decap CMS** (Git-based, 部署在 `/admin/`) |
| CMS 后端 | Netlify Identity + Git Gateway（**当前有 bug，见 §11**） |
| 托管 | **Netlify**（免费 tier） |
| DNS | Netlify DNS（NS1 后端，nameservers 是 `dns*.p0X.nsone.net`） |
| 域名注册商 | GoDaddy |
| CI/CD | Git push → Netlify 自动构建 |
| Node | v20+（Netlify 用 v20，本地用 v24 也兼容） |

---

## 3. 文件树（28 个跟踪文件）

```
GYO/
├── .eleventy.js                # Eleventy 配置（passthrough + filters）
├── .gitignore                  # 排除 node_modules, dist, 临时截图
├── netlify.toml                # Netlify build + cache headers
├── package.json                # 依赖 + npm scripts
├── package-lock.json           # 锁定依赖版本
├── README.md                   # 用户视角文档（编辑流程 + 部署步骤）
├── REQUIREMENTS.md             # 产品需求文档
├── HANDOVER.md                 # ← 你正在看的这个
│
├── admin/
│   ├── index.html              # Decap CMS UI loader
│   └── config.yml              # Decap collections（settings/services/cookies/projects）
│
├── src/                        # Eleventy 输入
│   ├── _data/
│   │   ├── settings.json       # 公司名 / hero / 联系方式 / ABN / SEO
│   │   ├── services.json       # 5 项服务（数组，可加 icon/order）
│   │   └── cookies.json        # Cookie 横幅文本
│   ├── _includes/              # 模板分片
│   │   ├── layout.njk          # 基础 HTML（head/header/footer/cookie-banner）
│   │   ├── header.njk          # 顶部导航
│   │   ├── footer.njk          # 页脚（ABN、版权）
│   │   ├── cookie-banner.njk    # Cookie 同意横幅
│   │   └── service-card.njk    # 服务卡片（按 icon 类型渲染 SVG）
│   ├── projects/
│   │   └── .gitkeep            # Decap 加项目时会在这里建 .md
│   └── index.njk               # 首页模板
│
└── assets/                     # 静态资源（passthrough copy 到 dist）
    ├── css/main.css            # ~830 行，所有样式
    ├── js/main.js              # ~180 行，cookie + nav + Netlify badge 隐藏
    ├── img/
    │   ├── 图1.jpg             # 联系卡参考图
    │   ├── 图2.jpg             # logo
    │   ├── 图3.jpg             # 服务介绍参考图
    │   ├── favicon.png         # 32x32
    │   └── og-image.jpg        # 1200x630 OG image
    ├── photos/
    │   └── README.md           # 项目照片上传说明（用户后期填）
    └── seo/
        ├── robots.txt
        └── sitemap.xml
```

构建产物 `dist/` 包含所有生成文件（gitignored）。

---

## 4. 任何电脑接手步骤（15 分钟）

### 前置条件
- macOS / Linux / Windows（WSL 推荐）
- **Node.js v18+**（推荐 v20 或 v24）
- **Git**
- **GitHub 账号**（项目所有者）

### 第一次克隆 + 启动

```bash
# 1. 克隆
git clone https://github.com/MatthewGXY/gyopro-website.git
cd gyopro-website

# 2. 安装依赖（一次性）
npm install

# 3. 构建一次确认环境正常
npm run build
# → 应输出 "Wrote 1 file in 0.05 seconds"
# → dist/ 目录生成

# 4. 本地预览（live-reload）
npm run dev
# → http://localhost:8080

# 5. 或静态服务 dist/
python3 -m http.server 8000 --directory dist
# → http://localhost:8000
```

### 提交代码

```bash
git add -A
git commit -m "描述你的改动"
git push origin main
# → Netlify 自动重建，1-2 分钟后 https://gyopro.com.au 更新
```

---

## 5. 内容编辑（两种方式）

### 方式 A：直接改 JSON / Markdown（推荐，可控）

| 文件 | 编辑什么 |
|---|---|
| `src/_data/settings.json` | 公司名、tagline、hero 文案、3 个联系方式、ABN、SEO |
| `src/_data/services.json` | 服务列表（name, description, icon, order） |
| `src/_data/cookies.json` | Cookie 横幅文本 |
| `src/projects/<slug>.md` | 新建项目（frontmatter + body markdown） |

改完 → `npm run build` 验证 → `git push` 部署。

### 方式 B：Decap CMS（图形界面，**当前有 bug**）

打开 `https://gyopro.com.au/admin/` → 用 Netlify Identity 登录 → 编辑。

⚠️ **已知问题**：Netlify Identity 邮件确认机制有 bug，见 §11。建议改成 GitHub OAuth backend（§12 待办）。

---

## 6. 设计系统（速查）

| 元素 | 值 |
|---|---|
| 背景色 | `#1a1a1a`（深色）+ 纹理叠加 |
| 金色 accent | `#c8a96a`（品牌色） |
| 米白文字 | `#f5f1e8` |
| 字体 | 标题 Helvetica Neue；正文 Georgia（衬线） |
| 断点 | 768px（tablet）/ 1024px（desktop） |
| Logo | `assets/img/图2.jpg`（金色渐变房屋 icon） |
| 圆角 | 4px |
| iPhone 安全区 | 已用 `env(safe-area-inset-*)` |

---

## 7. SEO & Schema.org

- `<title>` / `<meta description>` / OG / Twitter Card 都从 `settings.json` 渲染
- Schema.org `HomeAndConstructionBusiness` JSON-LD 包含：
  - 5 个服务（`OfferCatalog`）
  - 2 个 contactPoint（Elsa / 姚）
  - ABN 作为 `taxID` + `identifier`
  - `areaServed: Australia`
- `sitemap.xml` 在 `assets/seo/sitemap.xml`（主域 `https://gyopro.com.au/`）
- `robots.txt` 在 `assets/seo/robots.txt`
- 所有 `<img>` 都有 alt 文本

**待做**：Google Search Console 注册 → 提交 sitemap → 注册 Google Business Profile（对澳洲本地 SEO 关键）。

---

## 8. 域名 / DNS / 重定向

### 当前 Netlify 域名状态

| 域名 | 类型 | 状态 |
|---|---|---|
| `gyopro.com.au` | Primary | ✅ 服务网站，DNS 已配置 |
| `www.gyopro.com.au` | Alias | ✅ 自动 redirect → `gyopro.com.au` |
| `gyopro.net.au` | Alias | ❌ **Bug：serve same content，不 redirect** |
| `www.gyopro.net.au` | Alias | ✅ 自动 redirect → `gyopro.com.au`（Netlify 自动 www → primary） |

### 已知 Bug：`gyopro.net.au` 不 redirect

**原因**：Netlify "Domain alias" 设计上绕过 `netlify.toml` 和 `_redirects` 文件，直接 serve same content。

**已尝试**：
- `netlify.toml` `[[redirects]]` 各种语法 → ❌ 不生效
- `_redirects` 文件 → ❌ 不生效
- Edge Function（需要 Netlify Pro，免费版不可用）→ ❌ 回退

**修复路径**（任选其一）：
1. **Netlify UI 把 `gyopro.net.au` 从 alias 改成 redirect-only**：Site configuration → Domains → `gyopro.net.au` → Options → 看是否有 "Set as redirect" 或类似选项 → Remove 后重新 Add 时选 redirect
2. **API 修改**：`PATCH /sites/{site_id}/domains/{domain_id}` body `{"redirect_to": "https://gyopro.com.au"}`
3. **放弃 `.net.au`**：删除 Netlify 域名列表，DNS 仍指 Netlify 但接受 duplicate content（不推荐，SEO 不利）

### DNS 配置（NS1 via Netlify）

- GoDaddy 注册商后台 NS 记录指向 Netlify 的 NS1：
  - `gyopro.com.au` → `dns1.p02.nsone.net` 等
  - `gyopro.net.au` → `dns1.p05.nsone.net` 等
- Netlify DNS 自动管 A 记录 + `www` CNAME

---

## 9. Netlify 配置

### `netlify.toml` 内容
- Build command: `npm run build`
- Publish: `dist`
- Node version: 20
- Cache headers（`/assets/*` 一年，`/admin/*` 不缓存）
- ⚠️ 当前无 redirects（前面尝试都失败，需要 UI 改 alias → redirect）

### Identity 配置
- 当前 **Enabled**
- Registration: 之前设过 Closed（最严）
- Git Gateway: Enabled
- ⚠️ **Email confirmation bug**（见 §11）

---

## 10. 当前消耗 & 限额

| 项 | 值 |
|---|---|
| Netlify 免费 tier | 300 credits/月 |
| 本月已用 | 270 credits（18 production deploys）|
| 剩余 | 30 credits |
| 下一个 reset | 月初（10月1日左右） |
| 域名在 GoDaddy 注册 | ✅ |

**消耗大头**：build minutes + 每个 deploy 的基线消耗。**不是** Identity（因为登录根本走不通，Edge Function 没在跑）。

**省 credit 建议**：
1. 关掉 Build & deploy → Post processing → Asset optimization（如果开了）
2. 改 Continuous deployment → "Stop builds"，手动 Trigger deploy
3. 测试时 push 到非 main 分支（只触发 Deploy Preview，不消耗 production credit）

---

## 11. 已知问题（按优先级）

### 🔴 P0：Decap CMS 邮件确认失败
**症状**：注册 Netlify Identity 账号，邮件确认链接是 `https://gyopro.net.au/#recovery_token=...`（错的域名）。点击后跳到根域名，Netlify Identity widget 在 `/admin/` 才加载，所以 token 没被处理。

**已加修复**：`src/_includes/layout.njk` 加 inline JS 检测 token 自动跳 `/admin/`。

**当前状态**：push 已上线（`9ff75a4`），但用户反馈**邮件确认链接现在直接用了 .com.au**（修复前还是 .net.au，可能没刷新缓存）。硬刷新一下试试。

**真正修法（§12 待办）**：换 GitHub OAuth backend，绕开 Netlify Identity 整套。

### 🟡 P1：`gyopro.net.au` 不 redirect（§8 详述）

### 🟢 P3：Cookie 横幅里"Learn more" 跳到 alert
- `assets/js/main.js` line 136：`alert("Privacy policy page coming soon...")`
- 修法：建 `privacy.html` 页面，CMS 的 `cookies.learnMoreUrl` 填 `/privacy.html`

### 🟢 P3：项目照片区还是占位
- `assets/photos/` 里有 `README.md` 说明怎么上传
- 用户需要通过 Decap CMS（修好 P0 后）或手动 push .md + 图片文件

### 🟢 P3：Netlify "Powered by Netlify" 标记
- 已用 CSS + JS 双层隐藏（`display:none !important` + MutationObserver）
- 视觉上看不见，但 Netlify ToS 上严格说不合规
- 长期可考虑 Pro 套餐（$19/月 官方去标）

---

## 12. 待办 / 建议（按 ROI）

### 短期（本周做）
1. **配 GitHub OAuth backend**（彻底替代 Netlify Identity）
   - 建 GitHub OAuth App（github.com/settings/developers）
   - 写 Netlify Function 处理 OAuth 回调（`netlify/functions/oauth-callback.js`）
   - 改 `admin/config.yml` 用 `backend: github`
   - 改 `admin/index.html` 删 Netlify Identity widget
   - 禁用 Netlify Identity 服务
   - 预期：每月 credit 消耗降到 5-10

2. **把 `gyopro.net.au` 改成 redirect-only**（§8 详述）

### 中期（业务跑顺后）
3. **建 `privacy.html`**（替换 cookie banner 的 alert）
4. **用户上传项目照片**（替换占位）
5. **Google Search Console 注册 + 提交 sitemap**
6. **Google Business Profile**（澳洲本地 SEO 关键）

### 长期
7. **Netlify Pro**（$19/月）— 如果业务起来了，25,000 credits + 团队协作 + 私有 repo
8. **多页拆分**（每个服务独立页）— v2 SEO 加强

---

## 13. 关键文件清单（接手必读）

| 路径 | 用途 |
|---|---|
| `src/_data/settings.json` | 全站内容入口，改这里影响 hero / 联系 / SEO |
| `src/_data/services.json` | 服务列表 |
| `src/_data/cookies.json` | Cookie 横幅文本 |
| `src/_includes/layout.njk` | HTML head + meta + JSON-LD，改这里影响所有页面 |
| `src/_includes/header.njk` | 顶部导航 |
| `src/_includes/cookie-banner.njk` | Cookie 横幅（含 Settings 面板）|
| `src/index.njk` | 首页 section 结构 |
| `assets/css/main.css` | 全部样式（含响应式、安全区、cookie、Netlify badge 隐藏）|
| `assets/js/main.js` | 全部交互（cookie、nav 关闭、Netlify badge 移除、Recovery token redirect）|
| `netlify.toml` | Netlify build + headers |
| `.eleventy.js` | Eleventy 配置 + filters |
| `admin/config.yml` | Decap CMS collections 定义 |
| `admin/index.html` | Decap CMS UI loader |
| `package.json` | npm scripts: `dev` / `build` |

---

## 14. 调试清单（出问题先查这里）

| 症状 | 检查 |
|---|---|
| 改了 JSON 但线上没更新 | 1. `npm run build` 有没有报错<br>2. `git push` 是否成功<br>3. Netlify Deploys 是否 latest build 成功 |
| Decap CMS 打不开 | 1. `/admin/config.yml` 语法（用 `yamllint` 或 https://www.yamllint.com/）<br>2. 浏览器 Console 看 JS 报错 |
| `gyopro.net.au` 不 redirect | §8 |
| Netlify Identity 收不到邮件 | 1. 检查垃圾邮件箱<br>2. Netlify → Identity → External providers → 启用 GitHub（可绕过 email confirm）|
| Eleventy 构建报错 | 1. `npm run build -- --verbose`<br>2. 检查 `src/_data/*.json` 是否合法 JSON<br>3. 检查 `.njk` 模板语法（`{{ }}` 闭合、frontmatter 三短横线）|
| Cookie banner 不显示 | 1. 浏览器 console 是否有 JS 报错<br>2. `localStorage.getItem('gyo_cookie_consent')` 看是否已 consent |
| Credit 消耗快 | 1. Netlify Usage 页面看分类<br>2. 检查 Post processing 是否开了 asset optimization<br>3. 考虑临时 Stop auto deploys |

---

## 15. 联系 / 紧急升级

- 网站 owner: GYO PRO PTY LTD
- 技术栈 owner: Matthew GXY
- GitHub: `MatthewGXY/gyopro-website`

如需紧急改动且无人在线：
- 任何人都可以本地 `npm install && npm run dev` 改完 push
- Netlify 自动部署，1-2 分钟生效
- 紧急回滚：`git revert HEAD && git push`

---

**TL;DR**：Eleventy 静态站 + Decap CMS + Netlify。改内容改 `src/_data/*.json`，push 即可上线。Decap 后端要从 Netlify Identity 切到 GitHub OAuth（§11 + §12）。