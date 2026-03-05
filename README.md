# DemoRAG - RAG 應用展示前端

此專案為 **RAG（Retrieval-Augmented Generation）應用** 的展示用前端，用於 Demo 地端 AI 治理管理平台的操作介面，包含 AI 小助手、知識庫管理、Prompt 與模型管理、回應品質監控、漂移監控等功能頁面。

> 目前為純前端 Demo，所有資料皆為 Mock Data，尚未串接後端 API。

## 技術棧

| 項目 | 版本 |
|------|------|
| React | 19 |
| TypeScript | 5.8 |
| Vite | 7 |
| PrimeReact | 10 |
| PrimeFlex | 3 |
| SASS | 1.81 |
| React Router DOM | 7 |

## 快速啟動

```bash
# 安裝依賴
npm install

# 啟動開發伺服器（預設 http://localhost:3000）
npm run dev
```

## 建置與預覽

```bash
# Production 建置
npm run build

# 預覽建置結果
npm run preview
```

## 功能頁面

| 路徑 | 功能 |
|------|------|
| `/` | 儀表板 |
| `/ai/assistant` | AI 小助手（對話介面） |
| `/ai/knowledge-base` | 知識庫管理（CRUD、文件上傳） |
| `/ai/prompt-model` | Prompt 與模型管理 |
| `/ai/quality-monitor` | 回應品質監控 |
| `/ai/drift-monitor` | 漂移監控（RAG Triad 指標） |
| `/system/*` | 後台管理（帳號、角色、設定） |
| `/logs` | 日誌稽核 |
| `/fhir/*` | FHIR 專區（Placeholder） |

## 專案結構

```
src/
├── components/        # 共用元件（PageHeader 等）
├── context/           # React Context（Toast）
├── data/              # Mock 假資料
├── layout/            # 版面（Header、Sidebar、MainLayout）
├── pages/             # 各功能頁面
├── router/            # React Router 路由設定
└── styles/            # 全域 SCSS 樣式
```
