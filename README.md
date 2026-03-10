# DigiCare AI Agent Demo

此專案為 **DigiCare 醫療數位生態系平台** 的展示用前端，涵蓋 RAG 應用、AI Agent 管理、FHIR 醫療資料表單等功能頁面，用於 Demo 地端 AI 治理管理平台的操作介面。

> 目前為純前端 Demo，所有資料皆為 Mock Data，尚未串接後端 API。

## 技術棧

| 項目 | 版本 |
|------|------|
| React | 19 |
| TypeScript | 5.8 |
| Vite | 7 |
| PrimeReact | 10 |
| PrimeFlex | 3 |
| React Hook Form | 7 |
| React Markdown | latest |
| Font Awesome | 6 |
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

## 功能模組

### 後台管理

| 路徑 | 功能 |
|------|------|
| `/` | 儀表板 |
| `/system/settings` | 系統參數設定 |
| `/system/users` | 內建帳號維護（CRUD） |
| `/system/roles` | 角色 X 功能維護 |
| `/logs` | 日誌稽核 |

### RAG 應用

| 路徑 | 功能 |
|------|------|
| `/ai/assistant` | AI 小助手（對話介面，支援來源引用） |
| `/ai/knowledge-base` | 知識庫管理（CRUD、文件上傳、Chunk 統計） |
| `/ai/prompt-model` | Prompt 與模型管理（System/User Prompt 模板） |
| `/ai/quality-monitor` | 回應品質監控（正負面回饋、分數分佈） |
| `/ai/drift-monitor` | 漂移監控（衝突偵測、品質下降警示、過期提醒） |

### AI Agent

| 路徑 | 功能 |
|------|------|
| `/agent/dashboard` | Agent 儀表板 — 即時統計（技能數、活躍 Agent、今日執行數、成功率、平均回應時間）、執行趨勢圖表、成功/失敗比例分析 |
| `/agent/execution` | 執行狀態 — 即時監控所有 Agent 執行紀錄，顯示執行步驟明細（每步驟耗時與狀態）、Token 用量、錯誤訊息；支援依狀態篩選（running / success / failed / queued） |
| `/agent/skills` | Agent 技能管理 — 三大分頁（我的技能 / 公開技能 / 共享技能）；我的技能提供 DataTable CRUD；公開技能依擁有者分群展示卡片；支援搜尋、新增、編輯、刪除 |
| `/agent/settings` | Agent 設定 — 預設模型提供者與模型選擇、執行參數配置（Temperature、Max Tokens、Timeout）、日誌等級、功能開關（Auto Retry、Webhook 通知、排程執行） |

### FHIR 專區

| 路徑 | 功能 |
|------|------|
| `/fhir/twpas` | 癌藥事審 TWPAS IG — 完整 9 分頁表單（院所、病人、門診、疾病、評估、治療、基因、結果、申請），支援 10 個正式版操作按鈕、查詢舊案帶入、產生 FHIR Bundle 且驗證、下載檔案 |
| `/fhir/twci` | 重大傷病 TWCI（Placeholder） |
| `/fhir/twngs` | 次世代基因定序檢測 TWNGS（Placeholder） |
| `/fhir/twiam` | 流感抗病毒藥劑使用報告 TWIAM（Placeholder） |

#### TWPAS AI 小幫手

TWPAS 表單中的特定欄位旁內建 AI 小幫手按鈕，點擊後開啟右側 Sidebar，根據當前表單的診斷、用藥、基因檢測等臨床資料，以 Markdown 格式即時串流產生對應建議：

- **影像報告項目 (imgItem)** — 依 ICD-10 診斷碼建議影像檢查項目（ICD-10-PCS）
- **檢驗名稱 / 套組代碼 (inspect)** — 依用藥計畫與基因結果建議檢驗項目（LOINC）
- **報告類型 (reportType)** — 依診斷與治療計畫建議所需附上的報告類型

## 專案結構

```
src/
├── components/           # 共用元件
│   ├── PageHeader.tsx    # 頁面標頭
│   └── Twpas/            # TWPAS 表單元件群
│       ├── hospinfo/     # 院所資訊
│       ├── patientinfo/  # 病人資訊
│       ├── opdInfo/      # 門診病例
│       ├── medicalInfo/  # 疾病資訊（影像、癌症分期、檢查報告）
│       ├── assessmentinfo/ # 評估資訊（檢驗、病人評估）
│       ├── treatmentinfo/  # 治療資訊
│       ├── geneinfo/     # 基因資訊
│       ├── resultInfo/   # 結果資訊
│       ├── applyInfo/    # 申請項目
│       ├── component/    # 共用子元件（AiHelperButton、DynamicFieldArray）
│       ├── utils/        # RHF 表單元件封裝（RHFDropdown、RHFInputText 等）
│       ├── type/         # TypeScript 型別定義（TwpasForm）
│       └── valid/        # 表單驗證規則
├── context/              # React Context（Toast）
├── data/                 # Mock 假資料與代碼對照表
├── layout/               # 版面（Header、Sidebar、MainLayout）
├── pages/                # 各功能頁面
├── router/               # React Router 路由設定
└── styles/               # 全域 SCSS 樣式
```
