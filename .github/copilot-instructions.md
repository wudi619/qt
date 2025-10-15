## 快速定位（给 AI 代理）

此仓库是一个基于 Vue 3 + Vite 的移动优先 H5 应用（UI 使用 Vant），状态管理用 Pinia 并启用了持久化插件。要快速上手请先打开：

- 入口与全局启动：`src/main.js`
- 根组件：`src/App.vue`
- 路由：`src/router/index.js` 与 `src/router/routes.js`（子路由分模块在 `src/router/module/*`）
- 页面视图：`src/views/*`（目标页面通常在这里）
- 组件：`components/`（公用组件分文件夹，例如 `components/common/`）
- 全局样式：`src/assets/main.scss`
- Vite 配置：`vite.config.js`（包含自定义 html 插件 `vite.html.plugin.js`）
- 构建脚本：`package.json`（`npm run dev` / `npm run build` / `npm run preview`）

## 架构与关键启动逻辑（读这些文件以获得“为什么”）

- `src/main.js` 会做很多全局初始化：加载主题(`initTheme`)、平台切换(`switchPlanform`)、初始化 socket (`_initCoinWebSocket`)、注册 pinia（并使用 `pinia-plugin-persistedstate`）、全局工具注入（`utils/public`）、以及异步初始化 i18n 后再挂载应用。
- 路由使用 hash 模式（`createWebHashHistory()`）；路由项大量按模块懒加载（`component: () => import('...')`），路由守卫在 `src/router/index.js` 包含“钱包/登录”逻辑（`getAcount`, `signUp`），这会影响页面能否被直接访问。
- 配置注入：项目通过 `vite.html.plugin.js` 注入运行时配置到全局对象 `__config`（例如 `__config._APP_ENV`），很多流程（客服、冻结策略、环境差异）依赖该值。
- 插件与 socket：WebSocket / 钱包相关逻辑分散于 `plugin/socket`、`plugin/chain` 等文件，单页独立运行时需要考虑是否初始化或 mock 这些依赖。

## 将单个页面抽出为独立 H5 单页 — 可复制的步骤（具体到本项目）

注意：大多数页面可以通过直接访问对应路由（例如 `#/service`）在 dev 环境下单独查看。但要做真正的“独立 H5 单页”（不依赖主 App 路由/全局事件/复杂初始化），请按下列步骤：

1. 选择目标页面文件，例如 `src/views/service/index.vue`（把路径写清楚，AI 在编辑时直接引用全路径）。
2. 创建一个最小入口（放在 `src/h5/`）：

   - 新文件：`src/h5/<name>Entry.js`，内容最小化，只做必要的导入：
     - 直接导入目标组件（`import Page from '@/views/xxx.vue'`）
     - 挂载前只加载必须的样式（例如 `import 'vant/lib/index.css'`），避免把 `src/assets/main.scss` 整体拉入（除非需要全局变量）
     - 不要使用 `router`，直接 `createApp(Page).mount('#app')`。

3. 新建独立 HTML（放在 `public/h5/<name>.html`），包含一个 `#app` 挂载节点。Vite 会在构建时把入口 JS 注入进来（见下一步配置）。

4. 在 `vite.config.js` 的 `build.rollupOptions.input` 中添加这个新 HTML 路径（或扩展已有自定义 html 插件 `customHtmlPlugin`），以便 `vite build` 可以输出该独立页面资产。示例位置：文件顶部 `export default ({ mode }) => defineConfig({... rollupOptions: { input: { main: 'index.html', h5page: 'public/h5/<name>.html' } } })`。

5. 运行测试：

   - 开发查看（最快）：`npm run dev`，然后打开 `http://localhost:9000/h5/<name>.html` 或直接访问 dev server 上的相对路径（若 dev server 能服务 `public/` 下的 HTML）。
   - 构建并预览：`npm run build`，然后 `npm run preview` 或直接将 `dist` 部署到静态服 务器并打开 `dist/h5/<name>.html`。

6. 常见坑和如何处理（本仓库特有）

- 路由守卫依赖钱包/登录：若页面原先依赖路由守卫内容（如自动 sign-in），独立页面需要：
  - 在入口中 mock 必要的 store 状态（`useUserStore().setIsSign(true)` / `setToken(...)`），或移除/绕过需要 `router.beforeEach` 的逻辑。
- 全局插件（socket、chain、i18n）：若页面依赖这些，请选择性初始化：
  - i18n: `setupI18n(defaultLang)` 可按需调用；若页面不需要多语言，可跳过。
  - socket/wallet: 若不需要实时数据，避免调用 `_initCoinWebSocket()` 与 `initSwitchWalletEvent()`；否则单独初始化并确保正确 teardown。
- 全局 CSS 和变量：`src/assets/main.scss` 包含全局变量与 mixin，若页面依赖 CSS 变量可单独引入该文件；否则只引入组件级样式以减少体积。
- 全局事件与 PubSub：`App.vue` 绑定了很多 document event（如 `event_userInfoChange`），独立页面无需这些监听，若复制组件中使用到这些事件，确保在入口中注册或替换实现。

## 代码风格与项目约定（可直接引用示例）

- 路由按模块拆分：查看 `src/router/module/*`，每个模块导出数组合并到 `src/router/routes.js`。
- 组件自动引入：项目使用 `unplugin-auto-import` 与 `unplugin-vue-components`（Vant resolver），因此代码中通常省略常见导入；在新入口文件中显式导入需要的包以避免运行时缺失。
- 状态管理：Pinia（`src/store/*`），持久化使用 `pinia-plugin-persistedstate`，不要假设 store 初始状态为空，read/write 操作会落到 localStorage。
- 环境标识：使用 `__config._APP_ENV` 做分支，任何修改或抽离页面时注意不同平台/渠道的行为差异（客服链接、冻结策略等）。

## 常用命令（项目特有参数）

- 本地开发：`npm run dev`（dev server 端口默认 9000）
- 构建：`npm run build`（vite build，输出目录 `dist`）
- 预览构建：`npm run preview`
- 多语言 json 格式化：`npm run lang`

## 若你是 AI 代理要做的第一件事

1. 打开 `src/main.js`、`src/router/index.js` 和目标 `src/views/...`，识别该页面是否依赖 socket、i18n、pinia 或路由守卫。把依赖列表写成可操作清单（例如：需要 store.user、需要 websocket、需要 global scss）。
2. 基于清单，生成 `src/h5/<name>Entry.js` 与 `public/h5/<name>.html` 的草稿，并在 `vite.config.js` 中给出需要修改的最小建议补丁（不要直接改 `vite.config.js`，除非用户授权）。

---

如果需要，我可以：
- 根据你指定的页面（例如 `src/views/service/index.vue`）直接生成 `src/h5/<name>Entry.js` 与 `public/h5/<name>.html` 草稿并演示如何在 `vite.config.js` 中添加输入；
- 或在仓库中直接帮你完成修改并跑一次构建/预览来验证。请告诉我你要抽出的具体页面路径。
