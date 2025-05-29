# vue3-elementui-demo

Vue3 + Vite + ElementPlus + Pinia + TS + SCSS + Tailwindcss

## 分支ai-chat-elementplusx

- 功能：体验Element-Plus-X库(2025.5.21)，官方处于前期功能迭代阶段，后续可以跟着更新体验
- 缺点（1.2.0版本）：
  - 目前不支持主题配置，且element-plus设置的主题失效；

## 命令

### 安装依赖

```shell
npm install
```

### 本地启动

```shell
npm run dev
```

### 编译打包（不同环境）

```shell
#采用开发环境配置（.env.development）
npm run build:dev
#采用测试环境配置（.env.test）
npm run build:test
#采用生产环境配置（.env.production）
npm run build:pro
```

### 格式化和格式校验

```shell
#prettier一键格式化
npm run format
#eslint格式化
npm run lint
#scss/css等样式格式化
npm run lint:stylelint
#整体格式化 + 校验（git commit之前执行的也是这个）
npm run lint:lint-staged
```

### 预览

```shell
npm run preview
```
