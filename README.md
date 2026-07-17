# Jax · 凌拾四 — 未来科技风个人网站

> 🚀 纯静态 · 零依赖 · 炫酷未来科技风

---

## 📁 项目结构

```
jax-portfolio/
├── index.html          # 主页面
├── css/
│   └── style.css       # 未来科技风样式表
├── js/
│   └── main.js         # 交互脚本（粒子/打字机/3D倾斜/滚动动画）
├── assets/
│   └── favicon.svg     # 网站图标
│   └── avatar.jpg      # 个人头像
├── CNAME               # 自定义域名
├── vercel.json         # Vercel 部署配置
└── README.md
```

---

## 👤 个人信息

| 项目 | 内容 |
|------|------|
| 中文名 | 罗会光 |
| 英文名 | Jax |
| 网名 | 凌拾四 |
| 微信 | L_12081014 |
| 邮箱 | jax.050810@gmail.com |
| 学校 | 河南科技大学 |
| 学院 | 信息工程学院 |
| 专业 | 计算机科学与技术 |
| 年级 | 大三 |
| 域名 | **jax.me.com** |
| 爱好 | 编程 · 篮球 · 健身 · 电竞 · 旅游 |

---

## 🔧 本地预览

打开 `index.html` 即可——你可以：

- **方式一**：直接双击 `index.html` 在浏览器中打开
- **方式二**：在项目目录下运行本地服务器（推荐，可避免跨域限制）：

```bash
# Python 3
python -m http.server 8080

# Node.js (npx)
npx serve .
```

然后访问 http://localhost:8080

---

## 🌐 部署上线

### 方案一：Vercel（推荐 ⭐ 免费 + 自动 HTTPS）

Vercel 对纯静态网站最友好，支持一行命令部署：

```bash
# 1. 安装 Vercel CLI（一次性）
npm i -g vercel

# 2. 在项目目录执行
cd D:\Absurd\jax-portfolio
vercel

# 3. 按提示操作（选择默认配置即可）
# 部署后你会得到一个类似 jax-portfolio.vercel.app 的临时域名
```

**或通过网页**：
1. 打开 [vercel.com](https://vercel.com)，用 GitHub/GitLab/邮箱 注册
2. 点击 "New Project" → 上传项目文件夹
3. 部署完成后设置自定义域名

**绑定自定义域名到 Vercel**：
1. Vercel 项目 → Settings → Domains
2. 添加你的域名
3. 在域名注册商后台添加 DNS 记录：
   - 类型：`CNAME`
   - 名称：`@`（或留空，取决于注册商）
   - 值：`cname.vercel-dns.com`

---

### 方案二：GitHub Pages（免费）

```bash
# 1. 在 GitHub 创建仓库
# 2. 推送代码
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/你的用户名/jax-portfolio.git
git branch -M main
git push -u origin main

# 3. Settings → Pages → Source: Deploy from a branch → main → Save
```

**绑定自定义域名到 GitHub Pages**：
1. 将 `CNAME` 文件中的内容改为你的域名
2. 在域名注册商添加 DNS：
   - 类型：`CNAME`
   - 名称：`@`
   - 值：`你的用户名.github.io`

---

### 方案三：Netlify（免费）

1. 打开 [netlify.com](https://netlify.com)
2. 拖拽 `jax-portfolio` 整个文件夹到页面上
3. 部署完成后在 Domain Settings 添加 `jax.me.com`
4. DNS 记录指向：`your-site.netlify.app`

---

## 🌍 域名注册指南

`jax.me.com` 是 me.com 的子域名。获取方式：

- 如果已有 `me.com` 域名：在 DNS 管理中添加 `jax` 子域名的 CNAME 记录指向部署平台
- 或者使用 **Vercel** 部署后直接获得 `*.vercel.app` 免费域名，无需额外购买

---

## 🎨 页面特性

- 🔮 全屏粒子网络背景 + 科技网格 + 扫描线
- ✨ 自定义霓虹光标 + 悬停光晕
- ⚡ 打字机轮播标题
- 🎯 滚动渐入动画（Intersection Observer）
- 🧊 玻璃拟态卡片 + 3D 鼠标倾斜
- 🧬 CSS Glitch 故障艺术效果
- 📊 数字滚动计数动画
- 📱 完全响应式（手机/平板/桌面）
- 🌙 深色未来科技风配色
- ♿ 尊重 `prefers-reduced-motion`

---

## 📝 自定义修改

- **修改个人信息**：编辑 `index.html` 中的文字和链接
- **修改颜色**：编辑 `css/style.css` 中的 CSS 变量（`:root`）
- **修改动效**：编辑 `js/main.js` 中的相关参数
- **更换打字机文字**：修改 `js/main.js` 中 `phrases` 数组

---

Built with ❤ and code — **罗会光 Jax · 凌拾四**
