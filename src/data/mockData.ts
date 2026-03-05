export interface UserRecord {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  department: string
  createdAt: string
}

export interface RoleRecord {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
}

export interface LogRecord {
  id: string
  user: string
  action: string
  target: string
  ip: string
  result: 'success' | 'fail'
  createdAt: string
}

export const MOCK_USERS: UserRecord[] = [
  { id: '1', name: '王大明', email: 'wang.dm@hospital.org', role: '系統管理員', status: 'active', department: '資訊部', createdAt: '2025-01-15' },
  { id: '2', name: '李小華', email: 'li.xh@hospital.org', role: '一般使用者', status: 'active', department: '護理部', createdAt: '2025-02-20' },
  { id: '3', name: '張美玲', email: 'zhang.ml@hospital.org', role: '維運人員', status: 'active', department: '資訊部', createdAt: '2025-03-10' },
  { id: '4', name: '陳志偉', email: 'chen.zw@hospital.org', role: '一般使用者', status: 'inactive', department: '藥劑部', createdAt: '2025-04-05' },
  { id: '5', name: '林佳蓉', email: 'lin.jr@hospital.org', role: '系統管理員', status: 'active', department: '資訊部', createdAt: '2025-05-12' },
  { id: '6', name: '黃俊傑', email: 'huang.jj@hospital.org', role: '一般使用者', status: 'active', department: '醫務部', createdAt: '2025-06-01' },
  { id: '7', name: '吳淑芬', email: 'wu.sf@hospital.org', role: '維運人員', status: 'inactive', department: '資訊部', createdAt: '2025-06-18' },
  { id: '8', name: '蔡明宏', email: 'tsai.mh@hospital.org', role: '一般使用者', status: 'active', department: '行政部', createdAt: '2025-07-22' },
  { id: '9', name: '鄭雅文', email: 'zheng.yw@hospital.org', role: '一般使用者', status: 'active', department: '護理部', createdAt: '2025-08-03' },
  { id: '10', name: '劉建國', email: 'liu.jg@hospital.org', role: '維運人員', status: 'active', department: '資訊部', createdAt: '2025-08-15' },
  { id: '11', name: '楊宗翰', email: 'yang.zh@hospital.org', role: '一般使用者', status: 'inactive', department: '醫務部', createdAt: '2025-09-01' },
  { id: '12', name: '許雅婷', email: 'xu.yt@hospital.org', role: '一般使用者', status: 'active', department: '藥劑部', createdAt: '2025-09-20' },
  { id: '13', name: '周家豪', email: 'zhou.jh@hospital.org', role: '稽核人員', status: 'active', department: '管理部', createdAt: '2025-10-08' },
  { id: '14', name: '趙怡君', email: 'zhao.yj@hospital.org', role: '一般使用者', status: 'active', department: '護理部', createdAt: '2025-11-14' },
  { id: '15', name: '孫國華', email: 'sun.gh@hospital.org', role: '維運人員', status: 'active', department: '資訊部', createdAt: '2025-12-01' },
]

export const MOCK_ROLES: RoleRecord[] = [
  { id: '1', name: '系統管理員', description: '擁有所有系統功能的存取權限', permissions: ['read', 'write', 'delete'], userCount: 2 },
  { id: '2', name: '維運人員', description: '負責系統維護與監控', permissions: ['read', 'write'], userCount: 4 },
  { id: '3', name: '一般使用者', description: '基本功能存取權限', permissions: ['read'], userCount: 7 },
  { id: '4', name: '稽核人員', description: '可檢視系統日誌與操作記錄', permissions: ['read'], userCount: 1 },
]

export const MOCK_LOGS: LogRecord[] = [
  { id: '1', user: '王大明', action: '登入系統', target: '-', ip: '192.168.1.100', result: 'success', createdAt: '2026-03-05 09:15:30' },
  { id: '2', user: '王大明', action: '新增使用者', target: '楊宗翰', ip: '192.168.1.100', result: 'success', createdAt: '2026-03-05 09:20:45' },
  { id: '3', user: '李小華', action: '登入系統', target: '-', ip: '192.168.1.105', result: 'success', createdAt: '2026-03-05 09:30:12' },
  { id: '4', user: '張美玲', action: '修改系統設定', target: '密碼策略', ip: '192.168.1.102', result: 'success', createdAt: '2026-03-05 10:05:00' },
  { id: '5', user: '陳志偉', action: '登入系統', target: '-', ip: '192.168.1.110', result: 'fail', createdAt: '2026-03-05 10:15:22' },
  { id: '6', user: '林佳蓉', action: '刪除使用者', target: '測試帳號A', ip: '192.168.1.101', result: 'success', createdAt: '2026-03-05 10:30:18' },
  { id: '7', user: '王大明', action: '修改角色權限', target: '維運人員', ip: '192.168.1.100', result: 'success', createdAt: '2026-03-05 11:00:05' },
  { id: '8', user: '黃俊傑', action: '登入系統', target: '-', ip: '192.168.1.115', result: 'success', createdAt: '2026-03-05 11:20:33' },
  { id: '9', user: '蔡明宏', action: '匯出報表', target: '使用者列表', ip: '192.168.1.120', result: 'success', createdAt: '2026-03-05 11:45:50' },
  { id: '10', user: '陳志偉', action: '登入系統', target: '-', ip: '192.168.1.110', result: 'fail', createdAt: '2026-03-05 12:00:10' },
  { id: '11', user: '張美玲', action: '新增角色', target: '稽核人員', ip: '192.168.1.102', result: 'success', createdAt: '2026-03-05 13:10:25' },
  { id: '12', user: '鄭雅文', action: '登入系統', target: '-', ip: '192.168.1.108', result: 'success', createdAt: '2026-03-05 13:30:40' },
  { id: '13', user: '劉建國', action: '重啟服務', target: 'Elasticsearch', ip: '192.168.1.103', result: 'success', createdAt: '2026-03-05 14:00:00' },
  { id: '14', user: '王大明', action: '修改使用者', target: '黃俊傑', ip: '192.168.1.100', result: 'success', createdAt: '2026-03-05 14:30:15' },
  { id: '15', user: '吳淑芬', action: '登入系統', target: '-', ip: '192.168.1.107', result: 'fail', createdAt: '2026-03-05 15:00:00' },
  { id: '16', user: '周家豪', action: '檢視日誌', target: '操作日誌', ip: '192.168.1.130', result: 'success', createdAt: '2026-03-05 15:30:00' },
  { id: '17', user: '趙怡君', action: '登入系統', target: '-', ip: '192.168.1.112', result: 'success', createdAt: '2026-03-05 16:00:00' },
  { id: '18', user: '孫國華', action: '備份資料庫', target: 'PostgreSQL', ip: '192.168.1.103', result: 'success', createdAt: '2026-03-05 16:30:00' },
]

export const PERMISSION_OPTIONS = [
  { key: 'read', label: '讀取' },
  { key: 'write', label: '寫入' },
  { key: 'delete', label: '刪除' },
]

export const ROLE_FILTER_OPTIONS = [
  { name: '全部', code: '' },
  { name: '系統管理員', code: '系統管理員' },
  { name: '維運人員', code: '維運人員' },
  { name: '一般使用者', code: '一般使用者' },
  { name: '稽核人員', code: '稽核人員' },
]

export const DEPT_FILTER_OPTIONS = [
  { name: '全部', code: '' },
  { name: '資訊部', code: '資訊部' },
  { name: '護理部', code: '護理部' },
  { name: '醫務部', code: '醫務部' },
  { name: '藥劑部', code: '藥劑部' },
  { name: '行政部', code: '行政部' },
  { name: '管理部', code: '管理部' },
]

// ===== AI 相關假資料 =====

export interface KnowledgeBase {
  id: string
  name: string
  description: string
  docCount: number
  chunkCount: number
  status: 'active' | 'processing' | 'error'
  updatedAt: string
  version: string
}

export interface KBDocument {
  id: string
  kbId: string
  fileName: string
  fileType: string
  pages: number
  chunks: number
  status: 'completed' | 'processing' | 'error'
  uploadedAt: string
  uploadedBy: string
}

export interface PromptTemplate {
  id: string
  name: string
  type: 'system' | 'user'
  content: string
  model: string
  temperature: number
  isActive: boolean
  updatedAt: string
}

export interface QAFeedback {
  id: string
  question: string
  answer: string
  source: string
  score: number
  feedback: 'positive' | 'negative' | 'none'
  user: string
  createdAt: string
  status: 'reviewed' | 'pending' | 'corrected'
}

export interface DriftAlert {
  id: string
  type: 'conflict' | 'outdated' | 'quality_drop'
  severity: 'high' | 'medium' | 'low'
  title: string
  description: string
  affectedKB: string
  detectedAt: string
  status: 'open' | 'resolved' | 'dismissed'
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: { doc: string; page: number; section: string }[]
  timestamp: string
}

export const MOCK_KNOWLEDGE_BASES: KnowledgeBase[] = [
  { id: '1', name: '醫療器材法規知識庫', description: '包含醫療器材管理法、施行細則、查驗登記相關法規', docCount: 45, chunkCount: 3200, status: 'active', updatedAt: '2026-03-01', version: 'v2.1' },
  { id: '2', name: '醫材仿單資料庫', description: '各類醫療器材仿單（IFU）結構化資料', docCount: 128, chunkCount: 8500, status: 'active', updatedAt: '2026-02-28', version: 'v1.5' },
  { id: '3', name: '藥品查驗登記法規', description: '藥品查驗登記審查準則、藥事法相關規範', docCount: 32, chunkCount: 2100, status: 'active', updatedAt: '2026-02-15', version: 'v1.3' },
  { id: '4', name: '申請流程與規費標準', description: '各類申請作業流程、所需文件、規費標準', docCount: 18, chunkCount: 950, status: 'processing', updatedAt: '2026-03-05', version: 'v3.0-beta' },
]

export const MOCK_KB_DOCUMENTS: KBDocument[] = [
  { id: '1', kbId: '1', fileName: '醫療器材管理法.pdf', fileType: 'PDF', pages: 42, chunks: 380, status: 'completed', uploadedAt: '2026-01-10', uploadedBy: '王大明' },
  { id: '2', kbId: '1', fileName: '醫療器材管理法施行細則.pdf', fileType: 'PDF', pages: 28, chunks: 240, status: 'completed', uploadedAt: '2026-01-10', uploadedBy: '王大明' },
  { id: '3', kbId: '1', fileName: '醫療器材查驗登記審查準則.pdf', fileType: 'PDF', pages: 65, chunks: 520, status: 'completed', uploadedAt: '2026-01-15', uploadedBy: '張美玲' },
  { id: '4', kbId: '1', fileName: '體外診斷醫療器材分類分級管理辦法.pdf', fileType: 'PDF', pages: 15, chunks: 120, status: 'completed', uploadedAt: '2026-02-01', uploadedBy: '張美玲' },
  { id: '5', kbId: '1', fileName: '醫療器材優良製造規範_更新版.pdf', fileType: 'PDF', pages: 88, chunks: 0, status: 'processing', uploadedAt: '2026-03-05', uploadedBy: '林佳蓉' },
]

export const MOCK_PROMPTS: PromptTemplate[] = [
  { id: '1', name: '法規查詢 System Prompt', type: 'system', content: '你是 CDE 醫藥品查驗中心的 AI 助手。你只能根據提供的知識庫內容回答問題。如果知識庫中沒有相關資訊，請明確告知使用者「查無相關資料」，不要進行推測。回答時請附上參考來源（文件名稱與章節）。', model: 'gpt-oss-20b', temperature: 0.1, isActive: true, updatedAt: '2026-03-01' },
  { id: '2', name: '仿單查詢 System Prompt', type: 'system', content: '你是醫療器材仿單查詢助手。請根據使用者詢問的醫材名稱或規格，從仿單資料庫中查找對應資訊。回答需包含：適應症、使用方法、注意事項。若查無資料，請回覆「目前資料庫尚未收錄此醫材仿單」。', model: 'gpt-oss-20b', temperature: 0.1, isActive: true, updatedAt: '2026-02-20' },
  { id: '3', name: '流程諮詢 System Prompt', type: 'system', content: '你是申請流程諮詢助手。請依據使用者的問題，提供完整的申請步驟、所需文件清單與預估時程。回答格式請使用條列式，並標註各步驟的法規依據。', model: 'llama-vision-90b', temperature: 0.2, isActive: false, updatedAt: '2026-02-10' },
  { id: '4', name: '摘要生成 User Prompt', type: 'user', content: '請根據以下內容生成摘要，重點包含：(1) 適用範圍 (2) 主要規定 (3) 罰則。摘要長度不超過 300 字。\n\n{context}', model: 'gpt-oss-20b', temperature: 0.3, isActive: true, updatedAt: '2026-01-25' },
]

export const MOCK_QA_FEEDBACKS: QAFeedback[] = [
  { id: '1', question: '醫療器材查驗登記需要哪些文件？', answer: '依據「醫療器材查驗登記審查準則」第5條，申請查驗登記應檢附：(1) 申請書 (2) 醫療器材製造業許可證影本...', source: '醫療器材查驗登記審查準則 第5條', score: 95, feedback: 'positive', user: '李小華', createdAt: '2026-03-05 09:30', status: 'reviewed' },
  { id: '2', question: '第二等級醫材的規費是多少？', answer: '依據「醫療器材查驗登記費用標準」，第二等級醫療器材查驗登記審查費為新臺幣 32,000 元。', source: '醫療器材查驗登記費用標準 第3條', score: 100, feedback: 'positive', user: '黃俊傑', createdAt: '2026-03-05 10:15', status: 'reviewed' },
  { id: '3', question: '如何申請醫材變更登記？', answer: '醫療器材變更登記需依「醫療器材管理法」第25條規定辦理...', source: '醫療器材管理法 第25條', score: 78, feedback: 'negative', user: '鄭雅文', createdAt: '2026-03-05 11:00', status: 'pending' },
  { id: '4', question: 'GMP 稽查的頻率是？', answer: '依據相關規定，第三等級醫療器材製造業者每年至少稽查一次...', source: '醫療器材優良製造規範', score: 60, feedback: 'negative', user: '蔡明宏', createdAt: '2026-03-05 13:20', status: 'pending' },
  { id: '5', question: '體外診斷醫療器材如何分類？', answer: '依據「體外診斷醫療器材分類分級管理辦法」，體外診斷醫療器材依風險程度分為第一等級至第三等級...', source: '體外診斷醫療器材分類分級管理辦法 第3條', score: 92, feedback: 'positive', user: '趙怡君', createdAt: '2026-03-05 14:00', status: 'reviewed' },
  { id: '6', question: '申請展延需要提前多久？', answer: '依據「醫療器材管理法」第27條，應於許可證有效期間屆滿前6個月內申請展延...', source: '醫療器材管理法 第27條', score: 88, feedback: 'none', user: '周家豪', createdAt: '2026-03-05 14:30', status: 'pending' },
  { id: '7', question: '什麼是醫療器材的臨床試驗？', answer: '根據知識庫資料，醫療器材臨床試驗係指...', source: '醫療器材管理法 第37條', score: 45, feedback: 'negative', user: '孫國華', createdAt: '2026-03-05 15:00', status: 'pending' },
  { id: '8', question: '藥品查驗登記的審查時間？', answer: '查無相關資料。目前知識庫尚未收錄藥品查驗登記審查時程相關規定，建議洽詢 CDE 藥品組。', source: '-', score: 90, feedback: 'positive', user: '許雅婷', createdAt: '2026-03-05 15:30', status: 'reviewed' },
]

export const MOCK_DRIFT_ALERTS: DriftAlert[] = [
  { id: '1', type: 'conflict', severity: 'high', title: '法規條文衝突偵測', description: '「醫療器材管理法施行細則」第12條修正後，與現有知識庫中舊版內容不一致，可能導致規費金額回答錯誤。', affectedKB: '醫療器材法規知識庫', detectedAt: '2026-03-04 08:00', status: 'open' },
  { id: '2', type: 'quality_drop', severity: 'high', title: '回答品質下降警示', description: '過去 7 天內「醫材仿單資料庫」相關問答負面回饋率上升至 25%（基準值 10%），建議檢視近期新增文件品質。', affectedKB: '醫材仿單資料庫', detectedAt: '2026-03-03 14:00', status: 'open' },
  { id: '3', type: 'outdated', severity: 'medium', title: '文件過期提醒', description: '「醫療器材優良製造規範」最後更新日期為 2025-06-15，已超過建議檢視週期（6個月），建議確認是否有新版本。', affectedKB: '醫療器材法規知識庫', detectedAt: '2026-03-01 10:00', status: 'open' },
  { id: '4', type: 'conflict', severity: 'low', title: '術語不一致偵測', description: '知識庫中「醫療器材」與「醫材」兩種用語混用，可能影響關鍵字檢索精準度。', affectedKB: '醫療器材法規知識庫', detectedAt: '2026-02-28 09:00', status: 'resolved' },
  { id: '5', type: 'quality_drop', severity: 'medium', title: '檢索精準度下降', description: '「申請流程與規費標準」知識庫近期更新後，檢索精準度由 93% 降至 82%，低於 90% 門檻值。', affectedKB: '申請流程與規費標準', detectedAt: '2026-03-05 06:00', status: 'open' },
]

export const MOCK_CHAT_HISTORY: ChatMessage[] = [
  { id: '1', role: 'user', content: '請問醫療器材查驗登記需要準備哪些文件？', timestamp: '2026-03-05 09:30:00' },
  { id: '2', role: 'assistant', content: '依據「醫療器材查驗登記審查準則」第5條規定，申請醫療器材查驗登記應檢附以下文件：\n\n1. **申請書**：依規定格式填寫完整\n2. **製造業許可證影本**：國內製造者檢附工廠登記證明，輸入者檢附原廠授權書\n3. **醫療器材技術資料**：包含產品規格、性能測試報告\n4. **品質管理系統證明**：如 ISO 13485 證書\n5. **標籤、仿單及包裝樣稿**\n6. **臨床評估報告**（第三等級醫材適用）\n7. **審查費繳費證明**\n\n詳細規定請參閱「醫療器材查驗登記審查準則」第5條至第8條。', sources: [{ doc: '醫療器材查驗登記審查準則', page: 5, section: '第5條' }, { doc: '醫療器材查驗登記審查準則', page: 8, section: '第8條' }], timestamp: '2026-03-05 09:30:05' },
  { id: '3', role: 'user', content: '第二等級醫材的查驗登記費用是多少？', timestamp: '2026-03-05 09:31:00' },
  { id: '4', role: 'assistant', content: '依據「醫療器材查驗登記費用標準」第3條規定：\n\n**第二等級醫療器材查驗登記審查費為新臺幣 32,000 元。**\n\n其他等級費用參考：\n- 第一等級：新臺幣 10,000 元\n- 第三等級：新臺幣 80,000 元\n\n上述費用不含臨床試驗審查費。如需變更登記，費用另依變更項目計算。', sources: [{ doc: '醫療器材查驗登記費用標準', page: 2, section: '第3條' }], timestamp: '2026-03-05 09:31:08' },
]

export const MODEL_OPTIONS = [
  { name: 'GPT-OSS 20B（地端）', code: 'gpt-oss-20b' },
  { name: 'GPT-OSS 120B（地端）', code: 'gpt-oss-120b' },
  { name: 'LLaMA-Vision 90B（地端）', code: 'llama-vision-90b' },
  { name: 'Claude 4 Sonnet（雲端）', code: 'claude-4-sonnet' },
  { name: 'GPT-4o（雲端）', code: 'gpt-4o' },
]

export const STATS_CARDS = [
  { title: '總使用者數', value: '1,234', icon: 'pi pi-users', bgColor: '#e3f2fd', iconColor: '#1976d2' },
  { title: '活躍使用者', value: '892', icon: 'pi pi-user-plus', bgColor: '#e8f5e9', iconColor: '#388e3c' },
  { title: '本月登入次數', value: '3,456', icon: 'pi pi-sign-in', bgColor: '#fff3e0', iconColor: '#f57c00' },
  { title: '系統狀態', value: '正常運行', icon: 'pi pi-check-circle', bgColor: '#e0f2f1', iconColor: '#00897b' },
]

// 選單結構
export interface MenuItem {
  id: string
  title: string
  icon: string
  path?: string
  children?: MenuItem[]
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'admin',
    title: '後台管理',
    icon: 'pi pi-cog',
    children: [
      { id: 'dashboard', title: '儀表板', icon: 'pi pi-home', path: '/' },
      { id: 'system-param', title: '系統參數設定', icon: 'pi pi-sliders-h', path: '/system/settings' },
      { id: 'account-setting', title: '內建帳號維護', icon: 'pi pi-users', path: '/system/users' },
      { id: 'sso-setting', title: '院內SSO帳號維護', icon: 'pi pi-id-card', path: '/system/sso-accounts' },
      { id: 'role-maintain', title: '角色X功能維護', icon: 'pi pi-shield', path: '/system/roles' },
      { id: 'function-maintain', title: '功能維護', icon: 'pi pi-list', path: '/system/functions' },
      { id: 'logs', title: '日誌稽核', icon: 'pi pi-file', path: '/logs' },
    ],
  },
  {
    id: 'ai-manage',
    title: 'RAG 應用',
    icon: 'pi pi-microchip-ai',
    children: [
      { id: 'ai-assistant', title: 'AI 小助手', icon: 'pi pi-comments', path: '/ai/assistant' },
      { id: 'knowledge-base', title: '知識庫管理', icon: 'pi pi-database', path: '/ai/knowledge-base' },
      { id: 'prompt-model', title: 'Prompt 與模型管理', icon: 'pi pi-code', path: '/ai/prompt-model' },
      { id: 'quality-monitor', title: '回應品質監控', icon: 'pi pi-chart-bar', path: '/ai/quality-monitor' },
      { id: 'drift-monitor', title: '漂移監控', icon: 'pi pi-wave-pulse', path: '/ai/drift-monitor' },
    ],
  },
  {
    id: 'fhir',
    title: 'FHIR專區',
    icon: 'pi pi-heart',
    children: [
      { id: 'twpas', title: '癌藥事審TWPAS IG', icon: 'pi pi-file-edit', path: '/fhir/twpas' },
      { id: 'twci', title: '重大傷病TWCI', icon: 'pi pi-file-edit', path: '/fhir/twci' },
      { id: 'twngs', title: '次世代基因定序檢測TWNGS', icon: 'pi pi-file-edit', path: '/fhir/twngs' },
      { id: 'twiam', title: '流感抗病毒藥劑使用報告TWIAM', icon: 'pi pi-file-edit', path: '/fhir/twiam' },
    ],
  },
  {
    id: 'twempd',
    title: 'TWEMPD FHIR',
    icon: 'pi pi-file',
    children: [
      { id: 'twempd-ep', title: '電子處方箋TWEMPD-EP', icon: 'pi pi-file-edit', path: '/twempd/ep' },
      { id: 'twempd-ds', title: '調劑單張TWEMPD-DS', icon: 'pi pi-file-edit', path: '/twempd/ds' },
    ],
  },
  {
    id: 'emr',
    title: 'EMR IG',
    icon: 'pi pi-file',
    children: [
      { id: 'emr-ep', title: '電子處方簽EMR-EP', icon: 'pi pi-file-edit', path: '/emr/ep' },
      { id: 'emr-ds', title: '調劑單張EMR-DS', icon: 'pi pi-file-edit', path: '/emr/ds' },
    ],
  },
]
