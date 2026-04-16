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

// ===== AI Agent 假資料 =====

export interface AgentSkill {
  id: string; title: string; description: string
  visibility: 'private' | 'public' | 'shared'
  version: string; stepsCount: number; toolsCount: number
  owner: string; ownerAvatar: string; updatedAt: string; tags: string[]
}

export interface AgentExecution {
  id: string; agentName: string; skillTitle: string
  trigger: 'manual' | 'scheduled' | 'webhook'
  status: 'running' | 'success' | 'failed' | 'queued'
  startTime: string; duration: string; tokensUsed: number
  input: string; output: string
  steps: { name: string; status: 'success' | 'failed' | 'skipped'; duration: string }[]
  error?: string
}

export const MOCK_AGENT_SKILLS: AgentSkill[] = [
  { id: '1', title: '法規查詢 Agent', description: '根據使用者問題自動檢索法規知識庫並生成結構化回答', visibility: 'public', version: 'v1.3', stepsCount: 5, toolsCount: 3, owner: '王大明', ownerAvatar: 'W', updatedAt: '2026-03-08', tags: ['法規', 'RAG'] },
  { id: '2', title: '仿單比對 Agent', description: '自動比對多份醫材仿單，產出差異報告', visibility: 'public', version: 'v1.1', stepsCount: 4, toolsCount: 2, owner: '王大明', ownerAvatar: 'W', updatedAt: '2026-03-07', tags: ['仿單', '比對'] },
  { id: '3', title: '報表生成 Agent', description: '根據查詢結果自動生成 PDF/Excel 報表', visibility: 'private', version: 'v2.0', stepsCount: 6, toolsCount: 4, owner: '張美玲', ownerAvatar: 'Z', updatedAt: '2026-03-06', tags: ['報表', '自動化'] },
  { id: '4', title: '品質稽核 Agent', description: '自動檢查知識庫文件品質並標記問題區塊', visibility: 'shared', version: 'v1.0', stepsCount: 3, toolsCount: 2, owner: '林佳蓉', ownerAvatar: 'L', updatedAt: '2026-03-05', tags: ['品質', '稽核'] },
  { id: '5', title: '排程通知 Agent', description: '定期檢查法規更新並發送通知給相關人員', visibility: 'private', version: 'v1.2', stepsCount: 4, toolsCount: 3, owner: '張美玲', ownerAvatar: 'Z', updatedAt: '2026-03-04', tags: ['排程', '通知'] },
  { id: '6', title: '文件摘要 Agent', description: '自動為上傳的文件生成摘要與關鍵字', visibility: 'public', version: 'v1.5', stepsCount: 3, toolsCount: 2, owner: '劉建國', ownerAvatar: 'L', updatedAt: '2026-03-03', tags: ['摘要', 'NLP'] },
  { id: '7', title: '多語翻譯 Agent', description: '將法規文件翻譯為英文/日文版本', visibility: 'shared', version: 'v1.0', stepsCount: 4, toolsCount: 2, owner: '劉建國', ownerAvatar: 'L', updatedAt: '2026-03-02', tags: ['翻譯', '多語'] },
  { id: '8', title: 'FHIR 驗證 Agent', description: '自動驗證 FHIR Bundle 格式並回報錯誤', visibility: 'public', version: 'v2.1', stepsCount: 5, toolsCount: 3, owner: '王大明', ownerAvatar: 'W', updatedAt: '2026-03-01', tags: ['FHIR', '驗證'] },
  { id: '9', title: '數據清洗 Agent', description: '清洗並標準化匯入的 CSV/Excel 資料', visibility: 'private', version: 'v1.0', stepsCount: 6, toolsCount: 4, owner: '林佳蓉', ownerAvatar: 'L', updatedAt: '2026-02-28', tags: ['數據', 'ETL'] },
  { id: '10', title: '異常偵測 Agent', description: '監控 API 回應時間，超過閾值自動告警', visibility: 'shared', version: 'v1.1', stepsCount: 3, toolsCount: 2, owner: '孫國華', ownerAvatar: 'S', updatedAt: '2026-02-27', tags: ['監控', '告警'] },
  { id: '11', title: '問答評分 Agent', description: '自動評估 AI 回答品質並生成改善建議', visibility: 'public', version: 'v1.4', stepsCount: 5, toolsCount: 3, owner: '張美玲', ownerAvatar: 'Z', updatedAt: '2026-02-26', tags: ['評分', '品質'] },
  { id: '12', title: '知識圖譜 Agent', description: '從文件中萃取實體關係建構知識圖譜', visibility: 'private', version: 'v0.9', stepsCount: 7, toolsCount: 5, owner: '王大明', ownerAvatar: 'W', updatedAt: '2026-02-25', tags: ['知識圖譜', 'NLP'] },
]

export const MOCK_AGENT_EXECUTIONS: AgentExecution[] = [
  { id: '1', agentName: '法規查詢 Agent', skillTitle: '法規查詢 Agent', trigger: 'manual', status: 'running', startTime: '2026-03-09 09:15:00', duration: '進行中', tokensUsed: 1250, input: '查詢醫療器材管理法第25條', output: '', steps: [{ name: '解析意圖', status: 'success', duration: '0.3s' }, { name: '檢索知識庫', status: 'success', duration: '1.2s' }, { name: '生成回答', status: 'success', duration: '進行中' }] },
  { id: '2', agentName: '仿單比對 Agent', skillTitle: '仿單比對 Agent', trigger: 'scheduled', status: 'running', startTime: '2026-03-09 09:10:00', duration: '進行中', tokensUsed: 3400, input: '比對 A 廠與 B 廠血糖機仿單', output: '', steps: [{ name: '載入文件', status: 'success', duration: '0.8s' }, { name: '結構化解析', status: 'success', duration: '2.1s' }, { name: '差異比對', status: 'success', duration: '進行中' }] },
  { id: '3', agentName: '報表生成 Agent', skillTitle: '報表生成 Agent', trigger: 'webhook', status: 'running', startTime: '2026-03-09 09:05:00', duration: '進行中', tokensUsed: 890, input: '生成本月法規查詢統計報表', output: '', steps: [{ name: '查詢數據', status: 'success', duration: '1.5s' }, { name: '生成圖表', status: 'success', duration: '進行中' }] },
  { id: '4', agentName: '排程通知 Agent', skillTitle: '排程通知 Agent', trigger: 'scheduled', status: 'queued', startTime: '2026-03-09 09:20:00', duration: '-', tokensUsed: 0, input: '檢查今日法規更新', output: '', steps: [] },
  { id: '5', agentName: '品質稽核 Agent', skillTitle: '品質稽核 Agent', trigger: 'scheduled', status: 'queued', startTime: '2026-03-09 09:25:00', duration: '-', tokensUsed: 0, input: '稽核醫材仿單資料庫品質', output: '', steps: [] },
  { id: '6', agentName: '法規查詢 Agent', skillTitle: '法規查詢 Agent', trigger: 'manual', status: 'success', startTime: '2026-03-09 08:30:00', duration: '3.2s', tokensUsed: 2100, input: '醫療器材查驗登記需要哪些文件？', output: '依據「醫療器材查驗登記審查準則」第5條...（完整回答）', steps: [{ name: '解析意圖', status: 'success', duration: '0.2s' }, { name: '檢索知識庫', status: 'success', duration: '1.1s' }, { name: '生成回答', status: 'success', duration: '1.8s' }, { name: '品質檢查', status: 'success', duration: '0.1s' }] },
  { id: '7', agentName: '文件摘要 Agent', skillTitle: '文件摘要 Agent', trigger: 'webhook', status: 'success', startTime: '2026-03-09 08:15:00', duration: '5.6s', tokensUsed: 4500, input: '摘要：醫療器材管理法施行細則.pdf', output: '本施行細則共28條，主要規範...', steps: [{ name: '載入文件', status: 'success', duration: '0.5s' }, { name: '分段摘要', status: 'success', duration: '4.0s' }, { name: '合併輸出', status: 'success', duration: '1.1s' }] },
  { id: '8', agentName: 'FHIR 驗證 Agent', skillTitle: 'FHIR 驗證 Agent', trigger: 'manual', status: 'success', startTime: '2026-03-09 07:45:00', duration: '2.1s', tokensUsed: 1800, input: '驗證 TWPAS Bundle', output: '驗證通過，共 12 個 Resource，0 個錯誤', steps: [{ name: '解析 Bundle', status: 'success', duration: '0.3s' }, { name: '結構驗證', status: 'success', duration: '0.8s' }, { name: '規則檢查', status: 'success', duration: '0.7s' }, { name: '生成報告', status: 'success', duration: '0.3s' }] },
  { id: '9', agentName: '問答評分 Agent', skillTitle: '問答評分 Agent', trigger: 'scheduled', status: 'success', startTime: '2026-03-09 07:00:00', duration: '12.3s', tokensUsed: 8900, input: '評估昨日所有 AI 回答品質', output: '共評估 156 筆，平均分數 82 分', steps: [{ name: '載入問答', status: 'success', duration: '0.5s' }, { name: '逐筆評分', status: 'success', duration: '10.2s' }, { name: '生成報告', status: 'success', duration: '1.6s' }] },
  { id: '10', agentName: '多語翻譯 Agent', skillTitle: '多語翻譯 Agent', trigger: 'manual', status: 'success', startTime: '2026-03-08 16:00:00', duration: '45.2s', tokensUsed: 15200, input: '翻譯醫療器材管理法第1-10條為英文', output: 'Medical Device Act, Articles 1-10...', steps: [{ name: '分段切割', status: 'success', duration: '0.3s' }, { name: '翻譯處理', status: 'success', duration: '42.1s' }, { name: '品質校對', status: 'success', duration: '2.8s' }] },
  { id: '11', agentName: '異常偵測 Agent', skillTitle: '異常偵測 Agent', trigger: 'scheduled', status: 'success', startTime: '2026-03-08 15:00:00', duration: '1.8s', tokensUsed: 650, input: '檢查過去 1 小時 API 回應時間', output: '所有 API 回應時間正常，無異常', steps: [{ name: '收集指標', status: 'success', duration: '0.8s' }, { name: '異常判斷', status: 'success', duration: '0.5s' }, { name: '結果輸出', status: 'success', duration: '0.5s' }] },
  { id: '12', agentName: '數據清洗 Agent', skillTitle: '數據清洗 Agent', trigger: 'manual', status: 'success', startTime: '2026-03-08 14:00:00', duration: '8.7s', tokensUsed: 3200, input: '清洗 醫材分類_v2.csv', output: '清洗完成：移除 12 筆重複，修正 5 筆格式', steps: [{ name: '載入資料', status: 'success', duration: '0.5s' }, { name: '去重處理', status: 'success', duration: '2.1s' }, { name: '格式修正', status: 'success', duration: '3.8s' }, { name: '驗證輸出', status: 'success', duration: '2.3s' }] },
  { id: '13', agentName: '知識圖譜 Agent', skillTitle: '知識圖譜 Agent', trigger: 'manual', status: 'success', startTime: '2026-03-08 11:00:00', duration: '32.5s', tokensUsed: 12000, input: '從醫療器材查驗登記審查準則萃取實體', output: '萃取 85 個實體，142 個關係', steps: [{ name: '分段處理', status: 'success', duration: '1.2s' }, { name: '實體辨識', status: 'success', duration: '15.3s' }, { name: '關係抽取', status: 'success', duration: '12.8s' }, { name: '圖譜建構', status: 'success', duration: '3.2s' }] },
  { id: '14', agentName: '報表生成 Agent', skillTitle: '報表生成 Agent', trigger: 'scheduled', status: 'failed', startTime: '2026-03-08 09:00:00', duration: '4.5s', tokensUsed: 1200, input: '生成每日知識庫使用報表', output: '', steps: [{ name: '查詢數據', status: 'success', duration: '1.5s' }, { name: '生成圖表', status: 'failed', duration: '3.0s' }], error: 'ChartGenerationError: 無法連線至圖表服務，請確認 chart-service 容器狀態' },
  { id: '15', agentName: '法規查詢 Agent', skillTitle: '法規查詢 Agent', trigger: 'webhook', status: 'failed', startTime: '2026-03-08 08:30:00', duration: '2.1s', tokensUsed: 500, input: '查詢藥事法第100條', output: '', steps: [{ name: '解析意圖', status: 'success', duration: '0.3s' }, { name: '檢索知識庫', status: 'failed', duration: '1.8s' }], error: 'RetrievalError: Elasticsearch 連線逾時，請確認 ES 叢集狀態' },
]

export const AGENT_STATS = [
  { title: 'Agent 技能數', value: '12', icon: 'pi pi-bolt', bgColor: '#ede7f6', iconColor: '#7b1fa2' },
  { title: '活躍 Agent', value: '3', icon: 'pi pi-android', bgColor: '#e3f2fd', iconColor: '#1976d2' },
  { title: '今日執行數', value: '28', icon: 'pi pi-play', bgColor: '#e8f5e9', iconColor: '#388e3c' },
  { title: '成功率', value: '92%', icon: 'pi pi-check-circle', bgColor: '#e0f2f1', iconColor: '#00897b' },
  { title: '平均回應時間', value: '3.8s', icon: 'pi pi-clock', bgColor: '#fff3e0', iconColor: '#f57c00' },
]

export const AGENT_PROVIDER_OPTIONS = [
  { name: 'OpenAI', code: 'openai' },
  { name: 'Azure OpenAI', code: 'azure-openai' },
  { name: '地端推論', code: 'local' },
]

export const LOG_LEVEL_OPTIONS = [
  { name: 'DEBUG', code: 'debug' },
  { name: 'INFO', code: 'info' },
  { name: 'WARN', code: 'warn' },
  { name: 'ERROR', code: 'error' },
]

export const SCHEDULE_INTERVAL_OPTIONS = [
  { name: '每 15 分鐘', code: '15m' },
  { name: '每 30 分鐘', code: '30m' },
  { name: '每小時', code: '1h' },
  { name: '每 6 小時', code: '6h' },
  { name: '每日', code: '1d' },
]

export const TIMEZONE_OPTIONS = [
  { name: 'Asia/Taipei (UTC+8)', code: 'Asia/Taipei' },
  { name: 'Asia/Tokyo (UTC+9)', code: 'Asia/Tokyo' },
  { name: 'America/New_York (UTC-5)', code: 'America/New_York' },
  { name: 'Europe/London (UTC+0)', code: 'Europe/London' },
]

export const WEBHOOK_EVENT_OPTIONS = [
  { name: '執行成功', code: 'success' },
  { name: '執行失敗', code: 'failed' },
  { name: '執行逾時', code: 'timeout' },
]

// ===== TWPAS 暫存清單假資料 =====

import type { TwpasForm } from '@/components/Twpas/type/twpasform'
import { exampleTwpasValues, exampleTwpasImmValues } from '@/components/Twpas/type/twpasform'

export interface TwpasSavedRecord {
  id: string
  createdAt: string
  createdBy: string
  updatedAt: string
  updatedBy: string
  igType?: 'pas' | 'imm'
  data: TwpasForm
}

export const MOCK_TWPAS_SAVED_RECORDS: TwpasSavedRecord[] = [
  {
    id: '1',
    createdAt: '2026-04-08 09:30:00',
    createdBy: '王大明',
    updatedAt: '2026-04-08 10:15:00',
    updatedBy: '王大明',
    igType: 'pas',
    data: {
      ...exampleTwpasValues,
      hosp: { ...exampleTwpasValues.hosp, hospId: '1555455555' },
      patient: { ...exampleTwpasValues.patient, name: '陳美華', idCard: 'A223456789' },
    } as TwpasForm,
  },
  {
    id: '2',
    createdAt: '2026-04-05 14:20:00',
    createdBy: '李小華',
    updatedAt: '2026-04-05 15:00:00',
    updatedBy: '李小華',
    igType: 'pas',
    data: {
      ...exampleTwpasValues,
      hosp: { ...exampleTwpasValues.hosp, hospId: '1234567890', applDate: '2025-07-15' },
      patient: { ...exampleTwpasValues.patient, name: '林志明', idCard: 'B112233445', gender: 'male', weight: 68, height: 172 },
      diagnosis: {
        ...exampleTwpasValues.diagnosis,
        diagDate: '2025-06-20',
        diagData: [{ icd10cmCode: 'C34.1', diagCurrentStatus: 'NSCLC Stage IIIA, EGFR L858R mutation positive', diagnosisSequence: 1 }],
      },
    } as TwpasForm,
  },
  {
    id: '3',
    createdAt: '2026-04-02 11:00:00',
    createdBy: '張美玲',
    updatedAt: '2026-04-03 08:30:00',
    updatedBy: '張美玲',
    igType: 'pas',
    data: {
      ...exampleTwpasValues,
      hosp: { ...exampleTwpasValues.hosp, hospId: '9876543210', applDate: '2025-09-01' },
      patient: { ...exampleTwpasValues.patient, name: '黃淑芬', idCard: 'F298765432', gender: 'female', weight: 55, height: 160 },
      diagnosis: {
        ...exampleTwpasValues.diagnosis,
        diagDate: '2025-08-10',
        diagData: [{ icd10cmCode: 'C50.9', diagCurrentStatus: 'Breast cancer, HER2 positive, Stage II', diagnosisSequence: 1 }],
      },
    } as TwpasForm,
  },
]

// ===== TWPAS-IMM 免疫製劑事前審查 暫存清單假資料 (igType="imm") =====

export const MOCK_TWPAS_IMM_SAVED_RECORDS: TwpasSavedRecord[] = [
  {
    id: 'imm-1',
    createdAt: '2026-04-12 09:00:00',
    createdBy: '王醫師',
    updatedAt: '2026-04-12 10:30:00',
    updatedBy: '王醫師',
    igType: 'imm',
    data: {
      ...exampleTwpasImmValues,
    } as unknown as TwpasForm,
  },
  {
    id: 'imm-2',
    createdAt: '2026-04-10 14:00:00',
    createdBy: '陳醫師',
    updatedAt: '2026-04-10 14:45:00',
    updatedBy: '陳醫師',
    igType: 'imm',
    data: {
      ...exampleTwpasImmValues,
      hosp: { ...exampleTwpasImmValues.hosp, hospId: '1122334455', applDate: '2026-03-18', oldAcptNo: 'IMM2026030002' },
      patient: { ...exampleTwpasImmValues.patient, name: '林建宏', idCard: 'A123456789', gender: 'male', weight: 72, height: 175, blood: '58460004' },
      diagnosis: {
        ...exampleTwpasImmValues.diagnosis,
        diagDate: '2026-03-10',
        diagData: [{ icd10cmCode: 'M05.79', diagCurrentStatus: 'Rheumatoid arthritis, seropositive, RF(+), anti-CCP(+), DAS28 6.1, failed conventional DMARDs.', diagnosisSequence: 1 }],
      },
      apply: {
        ...exampleTwpasImmValues.apply,
        applyData: [{
          ...exampleTwpasImmValues.apply.applyData[0],
          cancerDrugType: 'IMM002',
          applyReason: 'M05P1',
          medicationUsage: [{
            ...exampleTwpasImmValues.apply.applyData[0].medicationUsage[0],
            applQty: 1,
            applQtyUnit: 'vial',
            applDosage: 8,
            applDosageUnit: 'MG/KG',
            applDrugFre: ['Q4W'],
            applDrugRoute: ['IV'],
          }],
        }],
      },
    } as unknown as TwpasForm,
  },
  {
    id: 'imm-3',
    createdAt: '2026-04-07 11:15:00',
    createdBy: '李醫師',
    updatedAt: '2026-04-07 11:50:00',
    updatedBy: '李醫師',
    igType: 'imm',
    data: {
      ...exampleTwpasImmValues,
      hosp: { ...exampleTwpasImmValues.hosp, hospId: '2233445566', applDate: '2026-03-15', oldAcptNo: 'IMM2026030003' },
      patient: { ...exampleTwpasImmValues.patient, name: '黃雅婷', idCard: 'F234567890', gender: 'female', weight: 52, height: 158 },
      diagnosis: {
        ...exampleTwpasImmValues.diagnosis,
        diagDate: '2026-03-05',
        diagData: [{ icd10cmCode: 'K50.90', diagCurrentStatus: 'Crohn disease, moderate-to-severe, steroid-dependent, CDAI 320.', diagnosisSequence: 1 }],
      },
      apply: {
        ...exampleTwpasImmValues.apply,
        applyData: [{
          ...exampleTwpasImmValues.apply.applyData[0],
          cancerDrugType: 'IMM003',
          applyReason: 'K50P1',
          medicationUsage: [{
            ...exampleTwpasImmValues.apply.applyData[0].medicationUsage[0],
            applQty: 1,
            applQtyUnit: 'vial',
            applDosage: 5,
            applDosageUnit: 'MG/KG',
            useSdate: '2026-03-20',
            useEdate: '2026-09-20',
            applDrugFre: ['Q8W'],
            applDrugRoute: ['IV'],
          }],
        }],
      },
    } as unknown as TwpasForm,
  },
  {
    id: 'imm-4',
    createdAt: '2026-04-04 08:40:00',
    createdBy: '吳醫師',
    updatedAt: '2026-04-04 09:10:00',
    updatedBy: '吳醫師',
    igType: 'imm',
    data: {
      ...exampleTwpasImmValues,
      hosp: { ...exampleTwpasImmValues.hosp, hospId: '3344556677', applDate: '2026-03-12', oldAcptNo: 'IMM2026030004' },
      patient: { ...exampleTwpasImmValues.patient, name: '鄭宗翰', idCard: 'B234567891', gender: 'male', weight: 80, height: 178, blood: '112149005' },
      diagnosis: {
        ...exampleTwpasImmValues.diagnosis,
        diagDate: '2026-03-01',
        diagData: [{ icd10cmCode: 'M45.9', diagCurrentStatus: 'Ankylosing spondylitis, BASDAI 7.2, inadequate response to NSAIDs.', diagnosisSequence: 1 }],
      },
      apply: {
        ...exampleTwpasImmValues.apply,
        applyData: [{
          ...exampleTwpasImmValues.apply.applyData[0],
          cancerDrugType: 'IMM004',
          applyReason: 'M45P1',
          medicationUsage: [{
            ...exampleTwpasImmValues.apply.applyData[0].medicationUsage[0],
            applQty: 2,
            applQtyUnit: 'syringe',
            applDosage: 50,
            applDosageUnit: 'MG',
            applDrugFre: ['QW'],
            applDrugRoute: ['SC'],
          }],
        }],
      },
    } as unknown as TwpasForm,
  },
  {
    id: 'imm-5',
    createdAt: '2026-04-01 16:20:00',
    createdBy: '蔡醫師',
    updatedAt: '2026-04-01 17:00:00',
    updatedBy: '蔡醫師',
    igType: 'imm',
    data: {
      ...exampleTwpasImmValues,
      hosp: { ...exampleTwpasImmValues.hosp, hospId: '4455667788', applDate: '2026-03-10', oldAcptNo: 'IMM2026030005' },
      patient: { ...exampleTwpasImmValues.patient, name: '周宜臻', idCard: 'F345678901', gender: 'female', weight: 48, height: 155 },
      diagnosis: {
        ...exampleTwpasImmValues.diagnosis,
        diagDate: '2026-02-28',
        diagData: [{ icd10cmCode: 'L20.9', diagCurrentStatus: 'Severe atopic dermatitis, EASI 32, failed topical and systemic therapy.', diagnosisSequence: 1 }],
      },
      apply: {
        ...exampleTwpasImmValues.apply,
        applyData: [{
          ...exampleTwpasImmValues.apply.applyData[0],
          cancerDrugType: 'IMM005',
          applyReason: 'L20P1',
          medicationUsage: [{
            ...exampleTwpasImmValues.apply.applyData[0].medicationUsage[0],
            applQty: 2,
            applQtyUnit: 'syringe',
            applDosage: 300,
            applDosageUnit: 'MG',
            applDrugFre: ['Q2W'],
            applDrugRoute: ['SC'],
          }],
        }],
      },
    } as unknown as TwpasForm,
  },
]

// ===== TWPAS 癌藥事審 AI / FHIR 假資料 =====

export const TWPAS_AI_PROMPT = `你是癌藥事前審查(TWPAS)的 AI 輔助評估助手。請根據以下病人的檢驗數據、基因檢測結果、診斷資訊與申請藥物，提供臨床評估建議。

評估重點：
1. 病人是否符合該藥物之健保給付條件
2. 基因檢測結果與藥物適應症之關聯性
3. 檢驗數值是否在安全範圍內
4. 是否有潛在的藥物交互作用或禁忌症
5. 建議的追蹤檢查項目與頻率

請以結構化格式回覆，並標註參考依據。`

export const TWPAS_AI_RESPONSE = `## AI 臨床評估建議

### 一、健保給付條件符合性分析

根據病人資料，**陳美華**（女性，60歲）確診為**非小細胞肺癌(NSCLC) Stage IIIA**，基因檢測結果：

- **EGFR Exon 21 L858R 突變：陽性** ✓
- **ALK 融合基因：陰性**
- **PD-L1 TPS：60%（高表達）**

申請藥物 **Osimertinib (Tagrisso) 80mg** 作為第一線標靶治療，**符合健保給付規定**。

> 📋 依據：全民健康保險藥物給付項目及支付標準第九節「抗癌瘤藥物」，EGFR 突變陽性之局部晚期或轉移性 NSCLC，得使用第三代 EGFR-TKI。

### 二、檢驗數值評估

| 項目 | 數值 | 參考值 | 狀態 |
|------|------|--------|------|
| WBC | 6,800/μL | 4,000-10,000 | ✅ 正常 |
| Hemoglobin | 11.2 g/dL | 12.0-16.0 | ⚠️ 輕度偏低 |
| Creatinine | 0.8 mg/dL | 0.5-1.2 | ✅ 正常 |

**注意事項**：Hemoglobin 輕度偏低（11.2 g/dL），建議治療期間密切監測，必要時補充鐵劑。

### 三、用藥安全性

- **過敏史**：Penicillin（高敏感度）、Aspirin（中度）— 與 Osimertinib **無交叉過敏風險**。
- **肝腎功能**：Creatinine 正常，**無需調整劑量**。
- **QTc 風險**：Osimertinib 可能延長 QTc 間期，建議治療前及治療中定期監測心電圖。

### 四、建議追蹤計畫

1. **每 3 個月**：胸部 CT 追蹤腫瘤變化（RECIST 1.1）
2. **每月**：CBC、肝腎功能、電解質
3. **每 3 個月**：心電圖（監測 QTc）
4. **每 6 個月**：腦部 MRI（排除腦轉移）

### 五、綜合評估

**建議：✅ 同意核准此申請案**

病人符合 Osimertinib 第一線使用之所有條件，基因檢測明確，檢驗數值大致正常，預期可從標靶治療中獲益。`

export const MOCK_FHIR_BUNDLE_SNIPPET = {
  resourceType: 'Bundle',
  id: 'twpas-bundle-example',
  meta: {
    profile: ['https://nhicore.nhi.gov.tw/pas/StructureDefinition/Bundle-twpas|1.2.1'],
  },
  type: 'document',
  timestamp: '2026-04-10T10:00:00+08:00',
  entry: [
    {
      fullUrl: 'urn:uuid:composition-twpas-001',
      resource: {
        resourceType: 'Composition',
        status: 'final',
        type: { coding: [{ system: 'http://loinc.org', code: '11503-0', display: 'Medical records' }] },
        subject: { reference: 'urn:uuid:patient-001' },
        date: '2026-04-10',
        title: 'TWPAS 癌藥事前審查申請書',
      },
    },
    {
      fullUrl: 'urn:uuid:patient-001',
      resource: {
        resourceType: 'Patient',
        identifier: [{ system: 'http://www.moi.gov.tw/', value: 'A223456789' }],
        name: [{ text: '陳美華' }],
        gender: 'female',
        birthDate: '1965-08-15',
      },
    },
    {
      fullUrl: 'urn:uuid:condition-001',
      resource: {
        resourceType: 'Condition',
        code: { coding: [{ system: 'http://hl7.org/fhir/sid/icd-10-cm', code: 'C91.00', display: '急性淋巴芽細胞性白血病, 未達緩解' }] },
        subject: { reference: 'urn:uuid:patient-001' },
        onsetDateTime: '2026-03-20',
      },
    },
    {
      fullUrl: 'urn:uuid:medication-request-001',
      resource: {
        resourceType: 'MedicationRequest',
        status: 'active',
        intent: 'order',
        medicationCodeableConcept: { coding: [{ system: 'https://nhicore.nhi.gov.tw/pas/CodeSystem/twpas-drug-cs', code: 'KC00935209', display: 'Osimertinib (Tagrisso) 80mg' }] },
        subject: { reference: 'urn:uuid:patient-001' },
        dosageInstruction: [{ text: '80mg QD PO' }],
        dispenseRequest: {
          quantity: { value: 1, unit: 'vial', system: 'https://nhicore.nhi.gov.tw/pas/CodeSystem/twpas-pkg-unit-cs', code: 'vial' },
        },
      },
    },
    {
      fullUrl: 'urn:uuid:observation-pat-ast-001',
      resource: {
        resourceType: 'Observation',
        meta: { profile: ['https://nhicore.nhi.gov.tw/pas/StructureDefinition/Observation-pat-assessment-twpas|1.2.1'] },
        status: 'final',
        code: { coding: [{ system: 'http://loinc.org', code: '14682-9', display: 'Creatinine [Moles/volume] in Serum or Plasma' }] },
        subject: { reference: 'urn:uuid:patient-001' },
        effectiveDateTime: '2026-04-08',
        valueQuantity: { value: 28.65, unit: 'mg/dL', system: 'http://unitsofmeasure.org', code: 'mg/dL' },
      },
    },
    {
      fullUrl: 'urn:uuid:claim-twpas-001',
      resource: {
        resourceType: 'Claim',
        meta: { profile: ['https://nhicore.nhi.gov.tw/pas/StructureDefinition/Claim-twpas|1.2.1'] },
        status: 'active',
        type: { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/claim-type', code: 'pharmacy' }] },
        use: 'preauthorization',
        patient: { reference: 'urn:uuid:patient-001' },
        created: '2026-04-10',
        priority: { coding: [{ code: 'normal', display: '一般事前審查申請' }] },
        diagnosis: [
          { sequence: 1, diagnosisCodeableConcept: { coding: [{ system: 'http://hl7.org/fhir/sid/icd-10-cm', code: 'C91.00' }] } },
        ],
        // 1.2.1 新 constraint supportingInfo-c90-c91-c92：C90/C91/C92 須提供檢驗、影像、基因或檢查至少一項
        supportingInfo: [
          { sequence: 1, category: { coding: [{ code: 'laboratory', display: '檢驗' }] }, valueReference: { reference: 'urn:uuid:observation-pat-ast-001' } },
        ],
      },
    },
  ],
}

// ===== TWPAS IG 1.2.1 更新說明 =====

export const MOCK_TWPAS_CHANGELOG_121 = `## TWPAS FHIR IG **STU 1.2.1**（2026-03-27 發布）

> 官方頁面：[https://nhicore.nhi.gov.tw/pas/](https://nhicore.nhi.gov.tw/pas/)
> 基礎標準：FHIR R4.0.1 / TW Core IG V0.3.2

### 主要變更摘要

| # | 項目 | 變更內容 |
|---|------|----------|
| 1 | CodeSystem | **NHI-健保事前審查-用藥品項** 代碼更新 |
| 2 | CodeSystem | **NHI-健保事前審查-特約醫事機構** 代碼更新 |
| 3 | 影像欄位 | 取消 **DICOM 或非 DICOM 影像擇一必填** 限制 |
| 4 | Claim Profile | 修改 **HTWT Expression** 與 **supportingInfo** Constraint |
| 5 | 新 Constraint | **supportingInfo-c90-c91-c92**：C90/C91/C92 國際疾病分類需提供檢驗、影像、基因或檢查資訊 |
| 6 | 新 ValueSet | **NHI-健保事前審查-事前審查申請數量單位及包裝類型**（vial / syringe / bottle / amp / tablet / capsule / patch …） |
| 7 | Observation Profile | **pat-ast-value** 數值結果可填至**小數點後兩位** |
| 8 | ClaimResponse | 新增 \`requestor.identifier\` 查詢參數 |

### 本 Demo 對應的呈現

- 標頭顯示版本 **1.2.1（2026-03-27 發布）**
- FHIR Bundle profile canonical 已加上 \`|1.2.1\` 版本標示
- 範例 Bundle 新增 \`Observation-pat-assessment-twpas\` (含 \`valueQuantity = 28.65\`) 與 \`Claim-twpas\` (含 ICD \`C91.00\` + \`supportingInfo\` 檢驗 reference)
- 「疾病資訊」頁籤：輸入 ICD 開頭為 **C90 / C91 / C92** 時，顯示 supportingInfo 提示
- 「影像資訊」頁籤：說明 DICOM / 非 DICOM 已取消擇一必填
- 「評估資訊」頁籤：評估數值欄位提示可填至小數點後兩位
- 「申請項目」頁籤：劑量單位下拉新增 vial / syringe / bottle / amp / tablet / capsule / patch
`

// ===== TWPAS 欄位級 AI 小幫手 mock 資料 =====

export const TWPAS_AI_FIELD_PROMPTS: Record<string, string> = {
  imgItem: `你是癌藥事前審查(TWPAS)的 AI 輔助助手。根據以下病人的診斷資訊（ICD-10 編碼、癌症分期、治療狀態），建議最適合的影像檢查項目（ICD-10-PCS 編碼）。

請考量：
1. 原發腫瘤部位與常用影像檢查的對應關係
2. 癌症分期所需的影像評估
3. 治療追蹤所需的影像檢查
4. 轉移評估建議的影像項目

請以結構化格式回覆，並標註建議理由。`,

  inspect: `你是癌藥事前審查(TWPAS)的 AI 輔助助手。根據以下病人的診斷資訊、用藥計畫與基因檢測結果，建議需要進行的檢驗項目（LOINC 代碼）。

請考量：
1. 用藥前必要的基線檢驗
2. 藥物安全監測所需的檢驗項目
3. 療效評估相關的生物標記
4. 合併症風險評估所需檢驗

請以結構化格式回覆，並標註各檢驗的臨床意義。`,

  reportType: `你是癌藥事前審查(TWPAS)的 AI 輔助助手。根據以下病人的診斷與治療計畫，建議需要附上的報告類型（LOINC 報告代碼）。

請考量：
1. 病理報告的必要性（組織型態確認）
2. 基因檢測報告需求
3. 影像報告需求
4. 其他支持性報告

請以結構化格式回覆，並標註各報告的用途。`,
}

export function generateTwpasAiResponse(fieldKey: string, formData: TwpasForm): string {
  const diagCode = formData.diagnosis?.diagData?.[0]?.icd10cmCode || '（未填寫）'
  const diagStatus = formData.diagnosis?.diagData?.[0]?.diagCurrentStatus || '（未填寫）'
  const drugCode = formData.treat?.[0]?.medicationRequest?.[0]?.drugCode || '（無用藥資料）'
  const geneResult = formData.gene?.[0]?.genResult || '（無基因資料）'
  const geneInterpretation = formData.gene?.[0]?.genInterpretation || ''

  if (fieldKey === 'imgItem') {
    return `## AI 影像檢查建議

### 案件摘要
- **ICD-10**：${diagCode}
- **診斷描述**：${diagStatus}

---

### 一、建議影像檢查

根據 **${diagCode}** 之診斷，建議以下影像檢查項目：

| 優先序 | ICD-10-PCS Code | 檢查名稱 | 建議理由 |
|--------|----------------|----------|---------|
| 1 | BP2W0ZZ | 胸部X光 | ${diagCode.startsWith('C34') ? '肺癌原發部位評估' : '基線肺部評估，排除肺轉移'} |
| 2 | BW25YZZ | 胸部電腦斷層(CT) | 詳細評估腫瘤範圍與淋巴結狀態 |
| 3 | BF26YZZ | 腹部電腦斷層(CT) | 評估肝臟、腹膜轉移 |
| 4 | BN39ZZZ | 全身骨骼掃描 | 排除骨轉移 |
${diagCode.startsWith('C34') ? '| 5 | BW31ZZZ | 腦部 MRI | NSCLC 腦轉移評估（建議常規排除） |' : ''}

### 二、分期評估補充

- **PET-CT**：若 CT 結果不明確，建議安排 PET-CT 進一步評估
${diagCode.startsWith('C50') ? '- **乳房超音波 / MRI**：乳癌局部範圍評估\n- **腋下淋巴結超音波**：評估淋巴結轉移' : ''}
${diagCode.startsWith('C34') ? '- **腦部 MRI**：NSCLC 建議常規排除腦轉移' : '- **腦部 MRI**：若臨床有神經學症狀'}

### 三、追蹤建議

治療開始後，建議每 **3 個月** 安排胸腹部 CT 追蹤（依 RECIST 1.1 標準評估療效）。

> 📋 參考依據：NCCN Guidelines、健保癌藥事前審查作業要點`
  }

  if (fieldKey === 'inspect') {
    return `## AI 檢驗項目建議

### 案件摘要
- **診斷**：${diagCode} — ${diagStatus}
- **用藥代碼**：${drugCode}
- **基因檢測結果**：${geneResult}（判讀：${geneInterpretation || '無'}）

---

### 一、基線必要檢驗

| LOINC Code | 檢驗名稱 | 臨床意義 | 頻率建議 |
|-----------|---------|---------|---------|
| 48423-8 | WBC & Differential | 白血球及分類計數 | 用藥前 + 每週期 |
| 718-7 | Hemoglobin | 血紅素 | 用藥前 + 每月 |
| 777-3 | Platelets | 血小板計數 | 用藥前 + 每週期 |
| 2160-0 | Creatinine | 肌酸酐（腎功能） | 用藥前 + 每月 |
| 1742-6 | ALT | 丙氨酸轉氨酶（肝功能） | 用藥前 + 每月 |
| 1920-8 | AST | 天門冬氨酸轉氨酶 | 用藥前 + 每月 |

### 二、藥物安全監測（依 ${drugCode}）

- **心臟功能**：QTc 監測（標靶藥物可能延長 QTc）
- **電解質**：K+, Mg2+, Ca2+（QTc 相關）
${geneInterpretation === 'POS' ? '- **cfDNA / ctDNA**：液態切片追蹤突變狀態變化' : ''}

### 三、療效生物標記

${diagCode.startsWith('C34') ? '- **CEA (2857-1)**：肺癌腫瘤標記' : diagCode.startsWith('C50') ? '- **CA 15-3**：乳癌腫瘤標記\n- **CEA (2857-1)**：輔助追蹤' : '- **CEA (2857-1)**：腫瘤標記追蹤'}

> 📋 參考依據：藥品仿單、NCCN Guidelines`
  }

  if (fieldKey === 'reportType') {
    return `## AI 報告類型建議

### 案件摘要
- **診斷**：${diagCode} — ${diagStatus}
- **基因檢測**：${geneResult}

---

### 一、必要報告

| LOINC Code | 報告類型 | 用途說明 | 必要性 |
|-----------|---------|---------|-------|
| 66117-3 | **病理報告** | 確認 ${diagCode} 之組織型態與分化程度 | **必要** |
| 11502-2 | **實驗室報告** | 提供基線檢驗數據 | **必要** |

### 二、強烈建議

${geneInterpretation ? `- **基因檢測報告**：已有基因檢測結果（${geneResult}），需附上完整報告佐證` : '- **基因檢測報告**：確認驅動基因突變狀態（如 EGFR、ALK、ROS1）'}
- **影像報告**：提供分期依據與基線腫瘤量測

### 三、輔助報告

- **多專科團隊（MDT）會議紀錄**：若為複雜案例
- **前次治療摘要**：若非第一線用藥
${diagCode.startsWith('C34') ? '- **肺功能檢查報告**：評估手術可行性' : ''}

> 📋 參考依據：健保癌藥事前審查申請書格式說明`
  }

  return '無對應的 AI 建議'
}

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
    id: 'ai-agent',
    title: 'AI Agent',
    icon: 'pi pi-android',
    children: [
      { id: 'agent-execution', title: '執行狀態', icon: 'pi pi-play', path: '/agent/execution' },
      { id: 'agent-skills', title: 'Agent 技能', icon: 'pi pi-bolt', path: '/agent/skills' },
      { id: 'agent-dashboard', title: '儀錶板', icon: 'pi pi-chart-bar', path: '/agent/dashboard' },
      { id: 'agent-settings', title: '設定', icon: 'pi pi-cog', path: '/agent/settings' },
    ],
  },
  {
    id: 'medical-ai',
    title: '生成式醫療紀錄 AI',
    icon: 'pi pi-pen-to-square',
    children: [
      { id: 'teaching-record', title: '教學病歷', icon: 'pi pi-book', path: '/medical-ai/teaching' },
      { id: 'medical-writing', title: '病歷寫作', icon: 'pi pi-file-edit', path: '/medical-ai/writing' },
    ],
  },
  {
    id: 'nursing-ai',
    title: '生成式護理紀錄 AI',
    icon: 'pi pi-clipboard',
    children: [
      { id: 'nursing-writing', title: '護理紀錄寫作', icon: 'pi pi-file-edit', path: '/nursing-ai/writing' },
    ],
  },
  {
    id: 'ai-helper',
    title: 'AI 小幫手',
    icon: 'pi pi-sparkles',
    children: [
      { id: 'ai-helper-gen', title: 'AI 生成', icon: 'pi pi-bolt', path: '/ai-helper/generate' },
      { id: 'ai-helper-templates', title: '模板管理', icon: 'pi pi-list', path: '/ai-helper/templates' },
      { id: 'ai-helper-shared', title: '分享市集', icon: 'pi pi-shop', path: '/ai-helper/shared' },
      { id: 'ai-helper-stats', title: '統計報表', icon: 'pi pi-chart-bar', path: '/ai-helper/statistics' },
    ],
  },
  {
    id: 'fhir',
    title: 'FHIR專區',
    icon: 'pi pi-heart',
    children: [
      { id: 'case-tracking', title: '案件追蹤', icon: 'pi pi-sitemap', path: '/fhir/case-tracking' },
      { id: 'twpas', title: '癌藥事審TWPAS IG', icon: 'pi pi-file-edit', path: '/fhir/twpas' },
      { id: 'twpas-imm', title: '免疫製劑事前審查TWPAS-IMM IG', icon: 'pi pi-file-edit', path: '/fhir/twpas-imm' },
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
    id: 'iv-drip-mgmt',
    title: '點滴智慧管理',
    icon: 'pi pi-heart-fill',
    children: [
      { id: 'iv-drip-monitor', title: '點滴條碼智慧提醒', icon: 'pi pi-clock', path: '/nursing/iv-drip-monitor' },
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

// ===== TWPAS 案件流程追蹤：產生 Mock 流程 =====

import type { WorkflowRun, WorkflowStep, VerificationResultItem, StepStatus } from '@/components/TwpasWorkflow/twpas-workflow.types'
import { STEP_LABELS } from '@/components/TwpasWorkflow/twpas-workflow.types'

const MOCK_ERRORS: Record<string, VerificationResultItem[]> = {
  '地端FHIR驗證': [
    { resourceType: 'Patient', resourceId: 'patient-001', severity: 'error', code: 'FHIR-E001', message: 'Patient.identifier 為必填欄位，但值為空', location: 'Patient.identifier' },
    { resourceType: 'Condition', resourceId: 'condition-001', severity: 'error', code: 'FHIR-E003', message: 'Condition.code.coding.system 必須為有效的 ICD-10-CM URI', location: 'Condition.code.coding[0].system' },
    { resourceType: 'MedicationRequest', resourceId: 'medrq-001', severity: 'error', code: 'FHIR-E005', message: 'MedicationRequest.dosageInstruction 格式不符 IG 規範', location: 'MedicationRequest.dosageInstruction[0]' },
  ],
  '地端CQL驗證': [
    { resourceType: 'MedicationRequest', resourceId: 'medrq-001', severity: 'error', code: 'CQL-R001', message: '用藥劑量超出建議範圍（Osimertinib 160mg > max 80mg）', location: 'MedicationRequest.dosageInstruction[0].doseAndRate' },
    { resourceType: 'Condition', resourceId: 'condition-001', severity: 'error', code: 'CQL-R003', message: '診斷碼與申請藥物適應症不符', location: 'Condition.code' },
  ],
  '雲端FHIR預檢': [
    { resourceType: 'MedicationRequest', resourceId: 'medrq-001', severity: 'error', code: 'NHI-FHIR-E005', message: 'MedicationRequest.dosageInstruction 格式不符健保署 IG 規範', location: 'MedicationRequest.dosageInstruction[0]' },
    { resourceType: 'Organization', resourceId: 'org-001', severity: 'error', code: 'NHI-FHIR-E009', message: 'Organization.identifier 需包含醫事機構代碼', location: 'Organization.identifier' },
  ],
  '雲端CQL預檢': [
    { resourceType: 'MedicationRequest', resourceId: 'medrq-001', severity: 'error', code: 'NHI-CQL-012', message: '申請藥物不在給付品項範圍內，請確認藥品代碼', location: 'MedicationRequest.medicationCodeableConcept.coding[0]' },
    { resourceType: 'Condition', resourceId: 'condition-001', severity: 'error', code: 'NHI-CQL-W005', message: '診斷碼與申請藥物之適應症對應關係需人工確認', location: 'Condition.code' },
  ],
}

const MOCK_WARNINGS: VerificationResultItem[] = [
  { resourceType: 'Patient', resourceId: 'patient-001', severity: 'warning', code: 'FHIR-W001', message: 'Patient.telecom 建議填寫聯絡電話', location: 'Patient.telecom' },
  { resourceType: 'Composition', resourceId: 'comp-001', severity: 'warning', code: 'FHIR-W002', message: 'Composition.author 建議填寫', location: 'Composition.author' },
  { resourceType: 'Patient', resourceId: 'patient-001', severity: 'warning', code: 'FHIR-W003', message: 'Patient.address 建議填寫完整行政區代碼', location: 'Patient.address[0].district' },
]

function _formatNow(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`
}

function _pick<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n)
}

function _makeStep(label: string, status: StepStatus, ts?: string): WorkflowStep {
  if (status === 'pending') return { label, status }
  const total = 10 + Math.floor(Math.random() * 6)
  const pool = MOCK_ERRORS[label] ?? []
  if (status === 'success') {
    const ws = _pick(MOCK_WARNINGS, Math.random() < 0.4 ? 1 : 0)
    return { label, status, timestamp: ts, totalResources: total, errorCount: 0, warningCount: ws.length, items: ws }
  }
  const errs = _pick(pool, 1 + Math.floor(Math.random() * Math.min(2, pool.length)))
  const ws = _pick(MOCK_WARNINGS, Math.floor(Math.random() * 2))
  return { label, status, timestamp: ts, totalResources: total, errorCount: errs.length, warningCount: ws.length, items: [...errs, ...ws] }
}

let _runCounter = 0

export function generateMockWorkflowRun(): WorkflowRun {
  _runCounter++
  const ts = _formatNow()
  const steps: WorkflowStep[] = []
  const isOdd = _runCounter % 2 === 1
  if (isOdd) {
    // 奇數次：隨機讓某一驗證步驟失敗，後續步驟 pending
    const failIdx = Math.floor(Math.random() * (STEP_LABELS.length - 1))
    for (let i = 0; i < STEP_LABELS.length; i++) {
      if (i === STEP_LABELS.length - 1) { steps.push(_makeStep(STEP_LABELS[i], 'pending')); continue }
      if (i < failIdx) { steps.push(_makeStep(STEP_LABELS[i], 'success', ts)) }
      else if (i === failIdx) { steps.push(_makeStep(STEP_LABELS[i], 'failed', ts)) }
      else { steps.push(_makeStep(STEP_LABELS[i], 'pending')) }
    }
  } else {
    // 偶數次：前 4 步全部成功，最後一步 pending（待上傳）
    for (let i = 0; i < STEP_LABELS.length; i++) {
      if (i === STEP_LABELS.length - 1) { steps.push(_makeStep(STEP_LABELS[i], 'pending')); continue }
      steps.push(_makeStep(STEP_LABELS[i], 'success', ts))
    }
  }
  return { id: `run-${_runCounter}`, timestamp: ts, steps }
}

// ===== 生成式醫療紀錄 AI — Mock 資料 =====

export interface MedicalAiPatient {
  id: string
  name: string
  chartNo: string
  age: number
  gender: '男' | '女'
  bed: string
  diagnosis: string
  admissionDate: string
  attendingDoctor: string
  residentDoctor: string
}

export const MOCK_MEDICAL_PATIENTS: MedicalAiPatient[] = [
  { id: 'mp1', name: '王建民', chartNo: 'A2025001', age: 68, gender: '男', bed: '5A-12', diagnosis: 'Acute myocardial infarction (AMI)', admissionDate: '2026-03-18', attendingDoctor: '李文哲', residentDoctor: '陳柏宇' },
  { id: 'mp2', name: '林美珍', chartNo: 'A2025002', age: 55, gender: '女', bed: '6B-03', diagnosis: 'COPD with acute exacerbation', admissionDate: '2026-03-20', attendingDoctor: '張惠雯', residentDoctor: '黃子軒' },
  { id: 'mp3', name: '張志豪', chartNo: 'A2025003', age: 42, gender: '男', bed: '3C-08', diagnosis: 'Type 2 DM with diabetic ketoacidosis', admissionDate: '2026-03-22', attendingDoctor: '陳淑芬', residentDoctor: '吳宗翰' },
]

// --- 教學病歷 ---

export interface DiffSegment {
  type: 'unchanged' | 'added' | 'deleted' | 'modified'
  text?: string
  residentText?: string
  attendingText?: string
}

export interface TeachingRecordCase {
  id: string
  patientId: string
  diffSegments: DiffSegment[]
  aiSummary: string
  status: 'pending' | 'reviewed' | 'confirmed'
  createdAt: string
}

export const MOCK_TEACHING_CASES: TeachingRecordCase[] = [
  {
    id: 'tc1', patientId: 'mp1', status: 'pending', createdAt: '2026-03-19 09:30',
    diffSegments: [
      { type: 'unchanged', text: 'Chief Complaint: Chest pain for 3 hours.\n\n' },
      { type: 'modified', residentText: 'Present Illness: 68 y/o male presented to ER with sudden onset chest pain. Pain was substernal, squeezing in nature.', attendingText: 'Present Illness: 68 y/o male presented to ER with acute onset of substernal chest pain, squeezing in nature, radiating to left arm, accompanied by diaphoresis and nausea.' },
      { type: 'unchanged', text: '\n\nThe patient denied recent trauma or fever. ' },
      { type: 'deleted', residentText: 'He said the pain was about 7/10.' },
      { type: 'added', attendingText: 'Pain severity was rated 7/10 on NRS. Onset was at rest without preceding exertion.' },
      { type: 'unchanged', text: '\n\nPast History: HTN under regular medication for 10 years. ' },
      { type: 'modified', residentText: 'No DM.', attendingText: 'Denied DM, dyslipidemia, or prior cardiac history.' },
      { type: 'unchanged', text: '\n\nPhysical Examination:\nBP: 158/92 mmHg, HR: 98 bpm, RR: 20/min, SpO2: 96% on room air.\n' },
      { type: 'added', attendingText: 'Heart: regular rhythm, no murmur. Lungs: bilateral clear. No JVD. No pedal edema.\n' },
      { type: 'modified', residentText: 'EKG showed ST elevation in lead II, III, aVF.', attendingText: 'EKG revealed ST-segment elevation in leads II, III, aVF with reciprocal changes in leads I, aVL, consistent with inferior STEMI.' },
      { type: 'unchanged', text: '\n\nAssessment: Acute myocardial infarction.\n' },
      { type: 'modified', residentText: 'Plan: Consult cardiology for PCI.', attendingText: 'Plan:\n1. Emergent cardiac catheterization with primary PCI\n2. Dual antiplatelet therapy (Aspirin 300mg + Clopidogrel 600mg loading)\n3. Heparin drip per protocol\n4. Serial troponin monitoring q6h\n5. Echocardiography within 24 hours' },
    ],
    aiSummary: `## 修改摘要

### 主要修改項目
| 類型 | 數量 | 說明 |
|------|------|------|
| 內容補充 | 3 處 | 新增臨床描述、理學檢查發現、詳細治療計畫 |
| 用詞修正 | 3 處 | 醫學用語標準化、描述更精準 |
| 刪除修改 | 1 處 | 口語化描述改為標準疼痛評估量表 |

### 修改原因分析

1. **Present Illness 補充**：原記錄缺少放射痛（radiating to left arm）及伴隨症狀（diaphoresis, nausea），這些是 AMI 的典型表現，對於鑑別診斷至關重要。

2. **理學檢查完整性**：住院醫師僅記錄生命徵象，主治醫師補充了心臟聽診、肺部聽診、JVD、周邊水腫等重要的心臟相關理學檢查。

3. **EKG 判讀精確度**：原記錄僅寫 "ST elevation"，修改後加入 reciprocal changes 及 "inferior STEMI" 的診斷判讀，展現完整的 EKG 分析。

4. **治療計畫結構化**：原記錄僅寫 "Consult cardiology for PCI"，修改後展開為 5 點具體醫囑，包含用藥、劑量、監測頻率。

### 學習建議

- **SOAP 記錄完整性**：每次書寫 Present Illness 時，務必涵蓋 OPQRST（Onset, Provocation, Quality, Radiation, Severity, Timing）。
- **理學檢查系統性**：心臟科病人需記錄完整的心血管系統檢查。
- **治療計畫具體化**：避免僅寫 "Consult XX"，應列出初步處置及後續追蹤計畫。`,
  },
  {
    id: 'tc2', patientId: 'mp2', status: 'confirmed', createdAt: '2026-03-21 14:15',
    diffSegments: [
      { type: 'unchanged', text: 'Chief Complaint: Progressive dyspnea for 5 days.\n\n' },
      { type: 'modified', residentText: 'Present Illness: 55 y/o female came in due to worsening shortness of breath. She has COPD and uses inhaler.', attendingText: 'Present Illness: 55 y/o female with known COPD (GOLD stage III) presented with progressive dyspnea over 5 days, worsened in the past 24 hours. She reported increased sputum production (purulent, yellow-greenish) and subjective fever.' },
      { type: 'unchanged', text: '\n\nShe denied chest pain or hemoptysis. ' },
      { type: 'added', attendingText: 'Current maintenance therapy includes Tiotropium 18mcg QD and Budesonide/Formoterol 160/4.5mcg BID. Last exacerbation was 4 months ago requiring hospitalization.\n' },
      { type: 'unchanged', text: '\nPhysical Examination:\nBP: 132/78 mmHg, HR: 105 bpm, RR: 28/min, SpO2: 88% on room air.\n' },
      { type: 'modified', residentText: 'Lungs: wheezing bilateral.', attendingText: 'Lungs: diffuse bilateral expiratory wheezing with prolonged expiration. Decreased breath sounds at bilateral bases. Accessory muscle use noted.' },
      { type: 'unchanged', text: '\n\nLab: WBC 13,500, CRP 8.2\n' },
      { type: 'added', attendingText: 'ABG: pH 7.32, pCO2 52 mmHg, pO2 58 mmHg, HCO3 26 — Acute on chronic respiratory acidosis with hypoxemia.\nCXR: Bilateral hyperinflation, no focal consolidation.\n' },
      { type: 'modified', residentText: 'Assessment: COPD exacerbation.\nPlan: Nebulizer treatment, antibiotics, oxygen.', attendingText: 'Assessment: COPD acute exacerbation (Anthonisen Type I — increased dyspnea, sputum volume, and sputum purulence).\nPlan:\n1. O2 via nasal cannula titrate to SpO2 88-92%\n2. Nebulized Salbutamol 2.5mg + Ipratropium 0.5mg q4h\n3. Methylprednisolone 40mg IV q12h × 5 days\n4. Levofloxacin 750mg IV QD × 7 days\n5. Monitor ABG in 2 hours\n6. Consider BiPAP if no improvement' },
    ],
    aiSummary: `## 修改摘要

### 主要修改項目
| 類型 | 數量 | 說明 |
|------|------|------|
| 內容補充 | 2 處 | 用藥史、ABG/CXR 結果 |
| 用詞修正 | 3 處 | COPD 分級、肺部檢查描述、Anthonisen 分型 |
| 計畫展開 | 1 處 | 簡略醫囑展開為 6 項具體計畫 |

### 修改原因分析

1. **病史完整性**：原記錄僅寫 "uses inhaler"，修改後補充具體藥物名稱及劑量、GOLD stage、上次急性發作時間，有助於判斷疾病嚴重度。

2. **理學檢查描述**：原記錄僅寫 "wheezing bilateral"，修改後加入呼氣期延長、基底呼吸音減弱、輔助呼吸肌使用等重要發現。

3. **檢驗判讀**：補充 ABG 數據及判讀（acute on chronic respiratory acidosis），這是 COPD 急性發作嚴重度評估的關鍵。

### 學習建議

- **COPD 急性發作分型**：熟悉 Anthonisen criteria（Type I/II/III），指導抗生素使用決策。
- **氧氣治療目標**：COPD 病人目標 SpO2 為 88-92%，避免過度氧氣導致 CO2 retention。
- **ABG 判讀**：區分急性 vs 慢性呼吸性酸中毒（看 HCO3 代償程度）。`,
  },
]

// --- 病歷寫作 ---

export interface MedicalWritingDraft {
  type: 'admission' | 'discharge' | 'weekly'
  format: 'standard' | 'soap'
  patientId: string
  content: string
}

export const MOCK_MEDICAL_WRITING_DRAFTS: MedicalWritingDraft[] = [
  // Admission Notes
  { type: 'admission', format: 'standard', patientId: 'mp1', content: `Admission Note

Patient: 王建民 (A2025001)    Date: 2026-03-18
Attending: 李文哲 MD         Ward: 5A-12

Chief Complaint:
Sudden onset chest pain for 3 hours.

Present Illness:
This 68 year-old male presented to the emergency department with acute onset of substernal chest pain at rest. The pain was squeezing in nature, rated 7/10 on NRS, radiating to the left arm, accompanied by diaphoresis and nausea. No prior similar episodes. No recent trauma or infection.

Past Medical History:
1. Hypertension × 10 years, on Amlodipine 5mg QD
2. No known DM, dyslipidemia, or prior cardiac events
3. No surgical history
4. No known drug allergies (NKDA)

Physical Examination:
- General: Acute distress, diaphoretic
- Vital Signs: BP 158/92 mmHg, HR 98 bpm, RR 20/min, BT 36.5°C, SpO2 96% RA
- HEENT: Unremarkable
- Heart: Regular rhythm, no murmur, S1/S2 normal
- Lungs: Bilateral clear, no crackles or wheezing
- Abdomen: Soft, non-tender
- Extremities: No edema, pulses symmetric

Initial Investigations:
- EKG: ST-segment elevation in leads II, III, aVF with reciprocal changes in I, aVL → Inferior STEMI
- Troponin-I: 2.8 ng/mL (elevated)
- CBC, BMP: Within normal limits

Assessment:
1. Acute inferior ST-elevation myocardial infarction (STEMI)

Plan:
1. Emergent cardiac catheterization with primary PCI
2. Aspirin 300mg + Clopidogrel 600mg loading dose
3. Heparin drip per ACS protocol
4. Morphine 2mg IV PRN for pain
5. Serial troponin q6h, serial EKG
6. NPO for potential procedure
7. Echocardiography within 24 hours
8. Cardiology consultation — Dr. 周` },
  { type: 'admission', format: 'standard', patientId: 'mp2', content: `Admission Note

Patient: 林美珍 (A2025002)    Date: 2026-03-20
Attending: 張惠雯 MD         Ward: 6B-03

Chief Complaint:
Progressive dyspnea for 5 days with productive cough.

Present Illness:
This 55 year-old female with known COPD (GOLD stage III, FEV1 35% predicted) presented with progressive exertional dyspnea worsening over 5 days, significantly worse in the past 24 hours. She reported increased sputum production, purulent and yellow-greenish in color, with subjective fever. Denied hemoptysis, chest pain, or orthopnea. Last acute exacerbation was 4 months ago.

Current Medications:
1. Tiotropium 18mcg inhaler QD
2. Budesonide/Formoterol 160/4.5mcg BID
3. Salbutamol MDI PRN

Past Medical History:
1. COPD diagnosed 8 years ago, 2-3 exacerbations per year
2. Ex-smoker (30 pack-years, quit 3 years ago)
3. No known DM, HTN
4. NKDA

Physical Examination:
- General: Tachypneic, using accessory muscles
- Vital Signs: BP 132/78, HR 105, RR 28, BT 37.8°C, SpO2 88% RA
- Lungs: Diffuse bilateral expiratory wheezing, prolonged expiration, decreased breath sounds at bases
- Heart: Tachycardia, regular, no murmur
- Extremities: No cyanosis, no edema

Investigations:
- ABG (RA): pH 7.32, pCO2 52, pO2 58, HCO3 26 → Acute on chronic respiratory acidosis
- CBC: WBC 13,500, Hb 13.2, Plt 245k
- CRP: 8.2 mg/dL
- CXR: Bilateral hyperinflation, no focal consolidation
- Sputum culture: Pending

Assessment:
1. COPD acute exacerbation (Anthonisen Type I)
2. Acute on chronic respiratory failure

Plan:
1. O2 via NC titrate to SpO2 88-92%
2. Nebulized Salbutamol 2.5mg + Ipratropium 0.5mg q4h
3. Methylprednisolone 40mg IV q12h × 5 days
4. Levofloxacin 750mg IV QD × 7 days
5. Repeat ABG in 2 hours
6. BiPAP standby if deterioration
7. Chest physiotherapy BID` },
  { type: 'admission', format: 'standard', patientId: 'mp3', content: `Admission Note

Patient: 張志豪 (A2025003)    Date: 2026-03-22
Attending: 陳淑芬 MD         Ward: 3C-08

Chief Complaint:
Nausea, vomiting, and abdominal pain for 2 days.

Present Illness:
This 42 year-old male with known Type 2 DM (diagnosed 5 years ago, poorly controlled, last HbA1c 10.2%) presented with progressive nausea, vomiting (>10 episodes), diffuse abdominal pain, and generalized weakness over 2 days. He admitted to non-compliance with insulin regimen for the past 2 weeks due to financial difficulties. Endorsed polyuria, polydipsia, and unintentional weight loss of 3kg over 1 month.

Past Medical History:
1. T2DM × 5 years, on Metformin 1000mg BID + Glargine 20U HS (non-compliant)
2. Hypertension on Losartan 50mg QD
3. No surgical history
4. NKDA

Physical Examination:
- General: Lethargic, dry mucous membranes, fruity breath odor
- Vital Signs: BP 102/68, HR 115, RR 32 (Kussmaul), BT 36.8°C, SpO2 99% RA
- Abdomen: Diffuse tenderness, no rebound, hypoactive bowel sounds
- Skin: Poor turgor, warm extremities

Investigations:
- Glucose: 485 mg/dL
- ABG (venous): pH 7.18, pCO2 18, HCO3 8 → High anion gap metabolic acidosis
- Anion gap: 24
- Serum ketones: Strongly positive
- BUN/Cr: 32/1.4 (prerenal AKI)
- K: 5.8 mEq/L, Na: 128 mEq/L (corrected Na 134)
- Urinalysis: Glucose 4+, Ketones 3+

Assessment:
1. Diabetic ketoacidosis (DKA) — moderate severity
2. Prerenal AKI
3. Hyperkalemia

Plan:
1. NS 1L bolus → then 250 mL/hr, switch to D5 0.45% NS when glucose <250
2. Regular insulin 0.1 U/kg/hr IV drip
3. K replacement protocol: hold if K >5.2, add 20mEq/L KCl when K <5.0
4. Hourly glucose monitoring, BMP q4h
5. Repeat ABG in 4 hours, close anion gap
6. Continuous telemetry monitoring (hyperkalemia)
7. Social work consultation for medication access
8. DM education prior to discharge` },

  // Discharge Summaries
  { type: 'discharge', format: 'standard', patientId: 'mp1', content: `Discharge Summary

Patient: 王建民 (A2025001)
Admission: 2026-03-18 → Discharge: 2026-03-24
Attending: 李文哲 MD

Discharge Diagnosis:
1. Acute inferior STEMI, s/p primary PCI with DES to RCA

Hospital Course:
Mr. 王 was admitted via ER with acute inferior STEMI. He underwent emergent cardiac catheterization revealing 95% stenosis of mid-RCA. Primary PCI was performed with deployment of a drug-eluting stent (DES) with TIMI 3 flow restored. Post-PCI course was uncomplicated. Peak troponin-I was 28.5 ng/mL on day 2. Echocardiography showed LVEF 50% with inferior hypokinesis. He was started on guideline-directed medical therapy and tolerated well. Cardiac rehabilitation referral was made. No arrhythmic events on telemetry. Ambulating independently by day 5.

Discharge Medications:
1. Aspirin 100mg QD (indefinitely)
2. Ticagrelor 90mg BID (× 12 months)
3. Atorvastatin 80mg HS
4. Metoprolol 25mg BID
5. Ramipril 2.5mg QD
6. Amlodipine 5mg QD (pre-existing HTN)
7. Nitroglycerin 0.6mg SL PRN chest pain

Follow-up Plan:
1. Cardiology clinic in 2 weeks (Dr. 周)
2. Cardiac rehabilitation program enrollment
3. Lipid panel, BMP recheck in 4 weeks
4. Repeat echocardiography in 3 months
5. Return to ER if recurrent chest pain, dyspnea, or syncope` },
  { type: 'discharge', format: 'standard', patientId: 'mp2', content: `Discharge Summary

Patient: 林美珍 (A2025002)
Admission: 2026-03-20 → Discharge: 2026-03-27
Attending: 張惠雯 MD

Discharge Diagnosis:
1. COPD acute exacerbation (Anthonisen Type I), resolved
2. Acute on chronic respiratory failure, resolved

Hospital Course:
Ms. 林 was admitted with COPD acute exacerbation presenting with worsening dyspnea, purulent sputum, and hypoxemic-hypercapnic respiratory failure. Initial ABG showed pH 7.32, pCO2 52. She was managed with bronchodilator nebulization, IV corticosteroids, and antibiotics (Levofloxacin). BiPAP was initiated on day 2 due to persistent hypercapnia (pCO2 58), with improvement noted within 24 hours. BiPAP weaned on day 4. Sputum culture grew Haemophilus influenzae (susceptible to fluoroquinolones). Steroids transitioned to oral Prednisolone on day 4. Discharge ABG: pH 7.38, pCO2 46, pO2 72 on 1L NC. She was weaned off supplemental O2 on day 6 with SpO2 92% on room air.

Discharge Medications:
1. Tiotropium 18mcg inhaler QD (continued)
2. Budesonide/Formoterol 160/4.5mcg BID (continued)
3. Prednisolone 20mg QD × 3 days then stop
4. Levofloxacin 750mg PO QD × 3 more days (total 7 days)
5. Salbutamol MDI 2 puffs PRN

Follow-up Plan:
1. Pulmonology clinic in 1 week (Dr. 張)
2. Pulmonary function test in 4 weeks
3. Annual influenza and pneumococcal vaccination
4. Smoking cessation reinforcement
5. Return if worsening dyspnea, fever, or change in sputum` },
  { type: 'discharge', format: 'standard', patientId: 'mp3', content: `Discharge Summary

Patient: 張志豪 (A2025003)
Admission: 2026-03-22 → Discharge: 2026-03-26
Attending: 陳淑芬 MD

Discharge Diagnosis:
1. Diabetic ketoacidosis (DKA), resolved
2. Type 2 DM, poorly controlled
3. Prerenal AKI, resolved

Hospital Course:
Mr. 張 was admitted with moderate DKA (pH 7.18, glucose 485, anion gap 24). He was managed with IV insulin drip and aggressive fluid resuscitation per DKA protocol. Anion gap closed within 18 hours. Transitioned to subcutaneous insulin on day 2. Renal function normalized (Cr 0.9) by day 3 with hydration. Root cause analysis revealed medication non-compliance due to financial burden. Social work was consulted and assisted with medication access program enrollment. Comprehensive DM education was provided including insulin injection technique, hypoglycemia recognition, and sick-day management.

Discharge Medications:
1. Glargine 24U SC HS (dose adjusted)
2. Lispro 6U SC with meals
3. Metformin 1000mg BID
4. Losartan 50mg QD
5. Glucose meter and test strips provided

Follow-up Plan:
1. Endocrinology clinic in 1 week (Dr. 陳)
2. HbA1c recheck in 3 months
3. BMP recheck in 1 week
4. Social work follow-up for medication assistance program
5. Return if recurrent N/V, abdominal pain, or glucose >400` },

  // Weekly Summaries
  { type: 'weekly', format: 'standard', patientId: 'mp1', content: `Weekly Summary (2026-03-18 ~ 2026-03-24)

Patient: 王建民 (A2025001)   Ward: 5A-12
Attending: 李文哲 MD

本週病程概要：
本週王先生因急性下壁 STEMI 入院，入院當日接受緊急心導管檢查及 PCI 治療，於右冠狀動脈中段置放藥物塗層支架一枚，術後血流恢復 TIMI 3 級。

病程變化：
• Day 1 (03/18): 緊急 PCI 完成，術後轉入 CCU 監測
• Day 2 (03/19): Peak troponin-I 28.5 ng/mL，血行動力學穩定，轉出一般病房
• Day 3 (03/20): 開始 guideline-directed medical therapy（DAPT, statin, beta-blocker, ACEi）
• Day 4 (03/21): 心臟超音波 LVEF 50%，下壁運動減弱。可床邊活動
• Day 5 (03/22): 自行如廁，活動耐受良好
• Day 6-7 (03/23-24): 穩定進步，安排出院

檢驗趨勢：
• Troponin-I: 2.8 → 28.5 → 15.2 → 4.8 → 1.2 (持續下降)
• CK-MB: 45 → 185 → 92 → 28
• LDL: 142 mg/dL（目標 <55，Atorvastatin 80mg 持續使用）

目前用藥：
Aspirin 100mg QD, Ticagrelor 90mg BID, Atorvastatin 80mg HS, Metoprolol 25mg BID, Ramipril 2.5mg QD

下週計畫：
1. 預計 03/24 出院
2. 安排心臟復健門診
3. 2 週後心臟科回診` },
  { type: 'weekly', format: 'standard', patientId: 'mp2', content: `Weekly Summary (2026-03-20 ~ 2026-03-27)

Patient: 林美珍 (A2025002)   Ward: 6B-03
Attending: 張惠雯 MD

本週病程概要：
林女士因 COPD 急性發作合併急性呼吸衰竭入院，經積極治療後病情逐步穩定。

病程變化：
• Day 1 (03/20): 入院，SpO2 88% RA, ABG pH 7.32/pCO2 52，開始噴霧治療及 IV 類固醇、抗生素
• Day 2 (03/21): pCO2 升至 58，啟用 BiPAP（IPAP 14/EPAP 6）
• Day 3 (03/22): BiPAP 下 ABG 改善 pH 7.36/pCO2 48，痰液培養報告 H. influenzae
• Day 4 (03/23): BiPAP 白天脫離成功，類固醇轉口服 Prednisolone
• Day 5 (03/24): 全日脫離 BiPAP，SpO2 91% on 1L NC
• Day 6 (03/25): 脫離氧氣，SpO2 92% RA，活動耐受度改善
• Day 7 (03/27): 穩定出院

檢驗趨勢：
• WBC: 13,500 → 9,800 → 7,200（感染控制）
• CRP: 8.2 → 3.1 → 0.8
• ABG: pH 7.32/52/58 → 7.36/48/65 → 7.38/46/72（改善）

下週計畫：
1. 已於 03/27 出院
2. 1 週後胸腔科回診
3. 4 週後安排肺功能檢查` },
  { type: 'weekly', format: 'standard', patientId: 'mp3', content: `Weekly Summary (2026-03-22 ~ 2026-03-26)

Patient: 張志豪 (A2025003)   Ward: 3C-08
Attending: 陳淑芬 MD

本週病程概要：
張先生因糖尿病酮酸血症（DKA）入院，經胰島素滴注及大量輸液後快速改善，並針對停藥原因進行社工介入。

病程變化：
• Day 1 (03/22): 入院 pH 7.18, glucose 485, AG 24。開始 DKA protocol
• Day 1 (03/22, +12h): AG closing (AG 16), glucose 280，轉為 D5 0.45% NS
• Day 2 (03/23): AG closed (AG 12), pH 7.34。轉 SC insulin, 開始進食
• Day 3 (03/24): Cr 正常化 (0.9)，血糖 fasting 168/AC lunch 195
• Day 4 (03/25): 社工完成藥物補助方案申請，糖尿病衛教完成
• Day 5 (03/26): 血糖穩定 (fasting 142)，出院

檢驗趨勢：
• Glucose: 485 → 280 → 195 → 168 → 142
• pH: 7.18 → 7.28 → 7.34 → 7.40
• Anion Gap: 24 → 16 → 12 → 10
• Cr: 1.4 → 1.1 → 0.9
• K: 5.8 → 4.2 → 4.0

下週計畫：
1. 已於 03/26 出院
2. 1 週後內分泌科回診
3. 追蹤 BMP、3 個月後 HbA1c` },

  // === SOAP 格式 ===
  { type: 'admission', format: 'soap', patientId: 'mp1', content: `[Subjective] 主觀陳述

Chief Complaint (CC):
突發性胸痛持續 3 小時。

History of Present Illness (HPI):
68 歲男性，過往有高血壓病史。今日下午突發性胸骨後壓迫性疼痛，疼痛放射至左臂，伴隨冒冷汗及噁心。疼痛強度 NRS 7/10，休息時發作，無先前劇烈活動。否認類似發作史、近期創傷或感染。

Past Medical History (PMH):
• 高血壓 × 10 年，規律服用 Amlodipine 5mg QD
• 無糖尿病、高血脂或既往心臟病史
• 無手術史

Allergy: NKDA（無已知藥物過敏）
Family History: 父親有高血壓病史

[Objective] 客觀檢查

Vital Signs:
T: 36.5°C, P: 98 bpm, R: 20/min, BP: 158/92 mmHg, SpO2: 96% (Room Air)

Physical Examination (PE):
• General: 急性病容，冒冷汗
• HEENT: 無異常
• Heart: 心律規則，無雜音，S1/S2 正常
• Lungs: 雙側呼吸音清晰，無囉音或哮鳴音
• Abdomen: 柔軟，無壓痛
• Extremities: 無水腫，脈搏對稱，無 JVD

Laboratory Data:
• Troponin-I: 2.8 ng/mL ↑ (ref <0.04)
• CK-MB: 45 U/L ↑ (ref <25)
• CBC: WBC 11,200, Hb 14.8, Plt 238k — 正常範圍
• BMP: BUN 18, Cr 1.0, Na 140, K 4.2 — 正常範圍
• PT/INR: 12.5 sec / 1.05

EKG:
Sinus rhythm, rate 98. ST-segment elevation in leads II, III, aVF with reciprocal ST depression in I, aVL.
→ 判讀：Acute inferior STEMI

[Assessment] 臨床評估

Primary Diagnosis:
急性下壁 ST 段上升型心肌梗塞 (Acute inferior STEMI, ICD-10: I21.19)

Differential Diagnosis:
1. 主動脈剝離 (Aortic dissection) — 但無撕裂性背痛、雙側血壓差異，暫不考慮
2. 肺栓塞 (Pulmonary embolism) — 但無低血氧、D-dimer 未升高，暫不考慮
3. 急性心包膜炎 (Acute pericarditis) — EKG 變化侷限於下壁導程，不符合瀰漫性變化

[Plan] 診療計畫

Diagnostic:
• Serial Troponin-I q6h
• Serial EKG
• Echocardiography within 24 hours
• NPO for potential procedure

Therapeutic:
1. 緊急心導管檢查合併 primary PCI
2. Aspirin 300mg + Clopidogrel 600mg loading dose（雙抗血小板治療）
3. Heparin drip per ACS protocol
4. Morphine 2mg IV PRN for pain
5. Cardiology consultation — Dr. 周

Educational:
• 向病患及家屬說明心導管手術流程、風險及預後
• 術後需長期服用雙抗血小板藥物（至少 12 個月）
• 生活型態調整衛教（戒菸、低鹽低脂飲食、規律運動）` },

  { type: 'admission', format: 'soap', patientId: 'mp2', content: `[Subjective] 主觀陳述

Chief Complaint (CC):
漸進性呼吸困難加劇 5 天，合併咳嗽有痰。

History of Present Illness (HPI):
55 歲女性，已知 COPD (GOLD stage III) 病史。5 天前開始出現活動性呼吸困難加劇，過去 24 小時明顯惡化。自述痰量增加，呈黃綠色膿痰，有主觀發燒感。否認咳血、胸痛或端坐呼吸。上次急性發作為 4 個月前住院 5 天。

Past Medical History (PMH):
• COPD 確診 8 年，每年 2-3 次急性發作
• 曾吸菸 30 pack-years，3 年前戒菸
• 無糖尿病、高血壓

Current Medications:
Tiotropium 18mcg QD, Budesonide/Formoterol 160/4.5mcg BID, Salbutamol MDI PRN

Allergy: NKDA

[Objective] 客觀檢查

Vital Signs:
T: 37.8°C, P: 105 bpm, R: 28/min, BP: 132/78 mmHg, SpO2: 88% (Room Air)

Physical Examination (PE):
• General: 呼吸急促，使用輔助呼吸肌
• Lungs: 雙側瀰漫性呼氣期哮鳴音，呼氣期延長，基底呼吸音減弱
• Heart: 心跳過速，規則，無雜音
• Extremities: 無發紺，無水腫

Laboratory Data:
• CBC: WBC 13,500 ↑, Hb 13.2, Plt 245k
• CRP: 8.2 mg/dL ↑ (ref <0.5)
• Procalcitonin: 0.35 ng/mL

ABG (Room Air):
pH 7.32 ↓, pCO2 52 ↑, pO2 58 ↓, HCO3 26
→ 判讀：Acute on chronic respiratory acidosis with hypoxemia

Imaging:
CXR: 雙側肺部過度充氣，橫膈扁平，無局部浸潤或肋膜積水

[Assessment] 臨床評估

Primary Diagnosis:
COPD 急性發作 (Anthonisen Type I — 呼吸困難加劇 + 痰量增加 + 痰轉膿性)

Secondary Diagnosis:
急性慢性呼吸衰竭 (Acute on chronic respiratory failure)

Differential Diagnosis:
1. 肺炎 (Pneumonia) — CXR 無局部浸潤，但不排除早期，持續追蹤
2. 心臟衰竭急性發作 — 無端坐呼吸、JVD、水腫，暫不考慮

[Plan] 診療計畫

Diagnostic:
• 痰液培養及藥敏試驗（已送檢）
• 2 小時後覆驗 ABG
• 如惡化考慮 CT chest

Therapeutic:
1. O2 via nasal cannula, titrate SpO2 88-92%（COPD 病人避免過度給氧）
2. Nebulized Salbutamol 2.5mg + Ipratropium 0.5mg q4h
3. Methylprednisolone 40mg IV q12h × 5 days
4. Levofloxacin 750mg IV QD × 7 days
5. BiPAP standby（若 ABG 持續惡化即啟用）
6. Chest physiotherapy BID

Educational:
• 向病患說明 COPD 急性發作原因與預防方式
• 衛教正確吸入劑使用技巧
• 強調戒菸維持與流感/肺炎鏈球菌疫苗接種` },

  { type: 'admission', format: 'soap', patientId: 'mp3', content: `[Subjective] 主觀陳述

Chief Complaint (CC):
噁心、嘔吐及腹痛持續 2 天。

History of Present Illness (HPI):
42 歲男性，已知 Type 2 DM 5 年（控制不佳，上次 HbA1c 10.2%）。2 天前開始出現進行性噁心、嘔吐（>10 次）、瀰漫性腹痛及全身無力。自述因經濟困難，過去 2 週未施打胰島素。近 1 個月有多尿、多渴及體重減輕 3 公斤。

Past Medical History (PMH):
• T2DM × 5 年，使用 Metformin 1000mg BID + Glargine 20U HS（自述停用 2 週）
• 高血壓，使用 Losartan 50mg QD
• 無手術史

Social History: 自營業者，無固定收入，自述因經濟困難停藥

Allergy: NKDA

[Objective] 客觀檢查

Vital Signs:
T: 36.8°C, P: 115 bpm ↑, R: 32/min ↑ (Kussmaul breathing), BP: 102/68 mmHg ↓, SpO2: 99% RA

Physical Examination (PE):
• General: 嗜睡（GCS E3V4M6=13），口腔黏膜乾燥，呼氣有水果味（fruity breath）
• Abdomen: 瀰漫性壓痛，無反彈痛，腸音減弱
• Skin: 皮膚彈性差（poor turgor），四肢溫暖

Laboratory Data:
• Glucose: 485 mg/dL ↑↑
• Serum Ketones: Strongly positive ↑↑
• VBG: pH 7.18 ↓↓, pCO2 18 ↓, HCO3 8 ↓↓
• Anion Gap: 24 ↑ (ref 8-12)
• BUN/Cr: 32/1.4 ↑ (prerenal AKI)
• Na: 128 ↓ (corrected Na 134), K: 5.8 ↑
• WBC: 15,800 ↑ (stress response)
• HbA1c: 10.2% ↑↑
• Urinalysis: Glucose 4+, Ketones 3+, SG 1.035 ↑

[Assessment] 臨床評估

Primary Diagnosis:
糖尿病酮酸血症 (Diabetic Ketoacidosis, DKA) — 中度 (pH 7.18, AG 24)

Secondary Diagnoses:
1. 腎前性急性腎損傷 (Prerenal AKI) — Cr 1.4, BUN/Cr ratio >20
2. 高血鉀症 (Hyperkalemia, K 5.8) — DKA 致酸中毒引起鉀外移
3. Type 2 DM 控制不佳 — 停藥導致

Differential Diagnosis:
1. 糖尿病高滲透壓狀態 (HHS) — 但有明顯酮體及酸中毒，符合 DKA
2. 敗血症 (Sepsis) — WBC 升高可能為壓力反應，需追蹤

[Plan] 診療計畫

Diagnostic:
• Hourly glucose monitoring
• BMP q4h (追蹤 K, AG, pH)
• Repeat ABG in 4 hours — close anion gap
• Continuous telemetry（高血鉀心律監測）

Therapeutic:
1. NS 1L bolus → 250 mL/hr，glucose <250 時轉 D5 0.45% NS
2. Regular insulin 0.1 U/kg/hr IV drip
3. 鉀離子補充 protocol: K >5.2 暫不補充，K <5.0 加 20mEq/L KCl
4. 持續監測 I/O（尿量目標 >0.5 mL/kg/hr）

Educational:
• 向病患說明 DKA 成因及停藥風險
• 社工介入：評估藥物補助方案
• 出院前安排完整糖尿病衛教（胰島素注射、低血糖辨識、生病日管理）` },

  // Discharge SOAP
  { type: 'discharge', format: 'soap', patientId: 'mp1', content: `[Subjective] 主觀陳述

出院時主訴：
病患自述胸痛已完全緩解，活動時無不適，對出院後照護事項已充分理解。

住院期間病程摘要（病患陳述）：
「手術後胸口就不痛了，這幾天慢慢可以走動，沒有覺得喘或不舒服。」

[Objective] 客觀檢查

住院期間關鍵數據變化：
• Troponin-I: 2.8 → 28.5 (peak D2) → 15.2 → 4.8 → 1.2 (持續下降)
• EKG: Inferior STEMI → ST resolution after PCI → Stable sinus rhythm at discharge
• Echo (D4): LVEF 50%, inferior wall hypokinesis
• Vital Signs (出院日): BP 128/76, HR 72, SpO2 98% RA — 穩定

處置紀錄：
• 2026-03-18: Emergent PCI — DES to mid-RCA, TIMI 3 flow restored
• Post-PCI: CCU monitoring → transfer to ward D2
• Guideline-directed medical therapy initiated D3
• Telemetry: No arrhythmic events throughout hospitalization
• Ambulating independently by D5

出院用藥：
1. Aspirin 100mg QD（終身）
2. Ticagrelor 90mg BID（× 12 個月）
3. Atorvastatin 80mg HS
4. Metoprolol 25mg BID
5. Ramipril 2.5mg QD
6. Amlodipine 5mg QD（原有用藥）
7. NTG 0.6mg SL PRN chest pain

[Assessment] 臨床評估

出院診斷：
Acute inferior STEMI, s/p primary PCI with DES to RCA — 恢復良好

出院狀態：
• 心臟功能穩定恢復中（LVEF 50%）
• 活動耐受度良好，可自行行走及如廁
• 無出血併發症
• LDL 142 — 需持續高劑量 Statin 控制

[Plan] 診療計畫

Follow-up:
1. 心臟科回診：2 週後（李文哲醫師門診）
2. 心臟復健門診：已安排
3. Lipid panel + BMP recheck：4 週後
4. Repeat Echo：3 個月後

Educational:
• DAPT 絕對不可自行停藥（支架血栓風險）
• 胸痛時 NTG 使用方式（含 1 顆等 5 分鐘，最多 3 顆，未緩解立即就醫）
• 飲食：低鹽低油，地中海飲食
• 活動：前 2 週避免搬 >5 kg 重物，漸進增加活動` },

  // Weekly SOAP
  { type: 'weekly', format: 'soap', patientId: 'mp1', content: `[Subjective] 主觀陳述

本週病患自述：
「手術後胸口就不痛了，這幾天慢慢可以走路，沒有覺得喘。護士教我怎麼吃藥，我都有記住。」
病患對於出院後需長期服藥表示理解，情緒穩定，配合度佳。

[Objective] 客觀檢查

本週關鍵檢查與數據趨勢：

Vital Signs 趨勢 (03/18-03/24):
• BP: 158/92 → 142/85 → 135/80 → 128/76 (穩定下降)
• HR: 98 → 82 → 75 → 72 (Beta-blocker 效果)
• SpO2: 96% → 98% RA (穩定)

Lab 趨勢:
• Troponin-I: 2.8 → 28.5 (peak) → 15.2 → 4.8 → 1.2 (持續下降 ✓)
• CK-MB: 45 → 185 (peak) → 92 → 28 (正常化 ✓)
• LDL: 142 mg/dL（目標 <55，Atorvastatin 80mg 持續中）

Key Events:
• D1 (03/18): Emergent PCI — DES to RCA, TIMI 3 flow
• D2 (03/19): Peak troponin, 血行穩定，轉出 CCU
• D3 (03/20): 開始 GDMT (DAPT + Statin + BB + ACEi)
• D4 (03/21): Echo LVEF 50%, inferior hypokinesis
• D5 (03/22): 開始下床活動，耐受良好
• D6-7 (03/23-24): 穩定進步，準備出院

目前用藥：
Aspirin 100mg QD, Ticagrelor 90mg BID, Atorvastatin 80mg HS, Metoprolol 25mg BID, Ramipril 2.5mg QD

[Assessment] 臨床評估

整體評估：
Acute inferior STEMI s/p primary PCI — 恢復順利，無併發症
• 心肌酵素持續下降，心律穩定
• LVEF 50% 為中等程度影響，需長期追蹤
• 活動耐受度逐日改善
• 藥物耐受良好，無低血壓或出血

[Plan] 下週計畫

1. 預計 03/24 出院
2. 安排心臟復健門診
3. 2 週後心臟科回診
4. 4 週後覆驗 Lipid panel
5. 出院衛教重點：DAPT 用藥遵從性、胸痛處置、飲食與活動指引` },
]

export function getMedicalWritingDraft(type: string, patientId: string, format: string = 'standard'): string {
  const draft = MOCK_MEDICAL_WRITING_DRAFTS.find(d => d.type === type && d.patientId === patientId && d.format === format)
  if (draft) return draft.content
  // fallback: 如果找不到指定格式，嘗試 standard
  const fallback = MOCK_MEDICAL_WRITING_DRAFTS.find(d => d.type === type && d.patientId === patientId && d.format === 'standard')
  return fallback?.content ?? '目前無此病人的草稿資料，請選擇其他病人或類型。'
}

export const OUTPUT_FORMAT_OPTIONS = [
  { label: 'Standard（標準格式）', value: 'standard' },
  { label: 'SOAP（主觀/客觀/評估/計畫）', value: 'soap' },
]

// --- HIS 原始資料（餵給 AI 生成的來源資料）---

export interface HisSourceData {
  patientId: string
  sections: { title: string; source: string; items: { label: string; value: string }[] }[]
}

export const MOCK_HIS_SOURCE_DATA: HisSourceData[] = [
  {
    patientId: 'mp1',
    sections: [
      { title: '基本資料', source: 'HIS 病患主檔', items: [
        { label: '姓名', value: '王建民' }, { label: '病歷號', value: 'A2025001' },
        { label: '身分證號', value: 'A12345****' }, { label: '出生日期', value: '1958-05-12' },
        { label: '性別', value: '男' }, { label: '血型', value: 'O+' },
        { label: '聯絡電話', value: '0912-***-888' }, { label: '緊急聯絡人', value: '王太太 (配偶)' },
      ]},
      { title: '門急診紀錄', source: 'EMR 急診系統', items: [
        { label: '到院時間', value: '2026-03-18 14:22' }, { label: '到院方式', value: '救護車' },
        { label: '檢傷分級', value: 'Level 2 (緊急)' }, { label: '主訴', value: 'Chest pain, sudden onset 3 hours ago' },
        { label: 'GCS', value: 'E4V5M6 = 15' }, { label: 'Pain Scale', value: '7/10 NRS' },
      ]},
      { title: '生命徵象', source: 'HIS 護理站系統', items: [
        { label: 'BP', value: '158/92 mmHg' }, { label: 'HR', value: '98 bpm' },
        { label: 'RR', value: '20 /min' }, { label: 'BT', value: '36.5°C' },
        { label: 'SpO2', value: '96% (Room Air)' },
      ]},
      { title: '檢驗報告', source: 'LIS 檢驗系統', items: [
        { label: 'Troponin-I', value: '2.8 ng/mL ↑ (ref <0.04)' },
        { label: 'CK-MB', value: '45 U/L ↑ (ref <25)' },
        { label: 'WBC', value: '11,200 /μL' }, { label: 'Hb', value: '14.8 g/dL' },
        { label: 'Plt', value: '238,000 /μL' }, { label: 'BUN', value: '18 mg/dL' },
        { label: 'Cr', value: '1.0 mg/dL' }, { label: 'Na', value: '140 mEq/L' },
        { label: 'K', value: '4.2 mEq/L' }, { label: 'Glucose', value: '128 mg/dL' },
        { label: 'PT/INR', value: '12.5 sec / 1.05' },
      ]},
      { title: '心電圖報告', source: 'EKG 系統', items: [
        { label: '報告時間', value: '2026-03-18 14:35' },
        { label: '判讀', value: 'Sinus rhythm, rate 98, ST elevation in II, III, aVF, reciprocal ST depression in I, aVL' },
        { label: '結論', value: 'Acute inferior STEMI' },
      ]},
      { title: '過去病史', source: 'HIS 病史系統', items: [
        { label: '慢性病', value: 'Hypertension × 10 years' },
        { label: '目前用藥', value: 'Amlodipine 5mg QD' },
        { label: '過敏史', value: 'NKDA' }, { label: '手術史', value: '無' },
        { label: '家族史', value: '父親有高血壓病史' },
      ]},
    ],
  },
  {
    patientId: 'mp2',
    sections: [
      { title: '基本資料', source: 'HIS 病患主檔', items: [
        { label: '姓名', value: '林美珍' }, { label: '病歷號', value: 'A2025002' },
        { label: '身分證號', value: 'F22876****' }, { label: '出生日期', value: '1971-09-03' },
        { label: '性別', value: '女' }, { label: '血型', value: 'A+' },
      ]},
      { title: '門急診紀錄', source: 'EMR 急診系統', items: [
        { label: '到院時間', value: '2026-03-20 08:45' }, { label: '到院方式', value: '步行' },
        { label: '檢傷分級', value: 'Level 3 (緊急)' },
        { label: '主訴', value: 'Worsening dyspnea × 5 days, productive cough with purulent sputum' },
      ]},
      { title: '生命徵象', source: 'HIS 護理站系統', items: [
        { label: 'BP', value: '132/78 mmHg' }, { label: 'HR', value: '105 bpm' },
        { label: 'RR', value: '28 /min' }, { label: 'BT', value: '37.8°C' },
        { label: 'SpO2', value: '88% (Room Air)' },
      ]},
      { title: '檢驗報告', source: 'LIS 檢驗系統', items: [
        { label: 'WBC', value: '13,500 /μL ↑' }, { label: 'Hb', value: '13.2 g/dL' },
        { label: 'CRP', value: '8.2 mg/dL ↑ (ref <0.5)' },
        { label: 'Procalcitonin', value: '0.35 ng/mL' },
      ]},
      { title: '血液氣體分析', source: 'LIS 檢驗系統 (ABG)', items: [
        { label: 'pH', value: '7.32 ↓' }, { label: 'pCO2', value: '52 mmHg ↑' },
        { label: 'pO2', value: '58 mmHg ↓' }, { label: 'HCO3', value: '26 mEq/L' },
        { label: '判讀', value: 'Acute on chronic respiratory acidosis with hypoxemia' },
      ]},
      { title: '影像報告', source: 'PACS/RIS 系統', items: [
        { label: 'CXR 報告時間', value: '2026-03-20 09:15' },
        { label: 'CXR 結果', value: 'Bilateral hyperinflation, flattened diaphragm, no focal consolidation or pleural effusion' },
      ]},
      { title: '過去病史與用藥', source: 'HIS 病史系統', items: [
        { label: '慢性病', value: 'COPD GOLD III (FEV1 35%), diagnosed 8 yrs ago' },
        { label: '吸菸史', value: '30 pack-years, quit 3 years ago' },
        { label: '用藥', value: 'Tiotropium 18mcg QD, Budesonide/Formoterol 160/4.5mcg BID, Salbutamol PRN' },
        { label: '過敏史', value: 'NKDA' },
        { label: '上次住院', value: '2025-11-15 (COPD AE, 住院 5 天)' },
      ]},
    ],
  },
  {
    patientId: 'mp3',
    sections: [
      { title: '基本資料', source: 'HIS 病患主檔', items: [
        { label: '姓名', value: '張志豪' }, { label: '病歷號', value: 'A2025003' },
        { label: '身分證號', value: 'B15523****' }, { label: '出生日期', value: '1984-02-28' },
        { label: '性別', value: '男' }, { label: '血型', value: 'B+' },
      ]},
      { title: '門急診紀錄', source: 'EMR 急診系統', items: [
        { label: '到院時間', value: '2026-03-22 03:10' }, { label: '到院方式', value: '家屬送來' },
        { label: '檢傷分級', value: 'Level 2 (緊急)' },
        { label: '主訴', value: 'Nausea, vomiting >10 episodes, abdominal pain × 2 days' },
        { label: 'GCS', value: 'E3V4M6 = 13 (lethargic)' },
      ]},
      { title: '生命徵象', source: 'HIS 護理站系統', items: [
        { label: 'BP', value: '102/68 mmHg ↓' }, { label: 'HR', value: '115 bpm ↑' },
        { label: 'RR', value: '32 /min ↑ (Kussmaul)' }, { label: 'BT', value: '36.8°C' },
        { label: 'SpO2', value: '99% (Room Air)' },
      ]},
      { title: '檢驗報告', source: 'LIS 檢驗系統', items: [
        { label: 'Glucose', value: '485 mg/dL ↑↑' },
        { label: 'Serum Ketones', value: 'Strongly positive ↑↑' },
        { label: 'BUN', value: '32 mg/dL ↑' }, { label: 'Cr', value: '1.4 mg/dL ↑' },
        { label: 'Na', value: '128 mEq/L ↓ (corrected 134)' },
        { label: 'K', value: '5.8 mEq/L ↑' }, { label: 'Cl', value: '96 mEq/L' },
        { label: 'Anion Gap', value: '24 ↑ (ref 8-12)' },
        { label: 'WBC', value: '15,800 /μL ↑ (stress response)' },
        { label: 'HbA1c', value: '10.2% ↑↑ (上次 2025-12)' },
      ]},
      { title: '血液氣體分析', source: 'LIS 檢驗系統 (VBG)', items: [
        { label: 'pH', value: '7.18 ↓↓' }, { label: 'pCO2', value: '18 mmHg ↓' },
        { label: 'HCO3', value: '8 mEq/L ↓↓' },
        { label: '判讀', value: 'High anion gap metabolic acidosis with respiratory compensation' },
      ]},
      { title: '尿液分析', source: 'LIS 檢驗系統', items: [
        { label: 'Glucose', value: '4+ ↑↑' }, { label: 'Ketones', value: '3+ ↑↑' },
        { label: 'Specific gravity', value: '1.035 ↑' },
      ]},
      { title: '過去病史與用藥', source: 'HIS 病史系統', items: [
        { label: '慢性病', value: 'T2DM × 5 years (poorly controlled), HTN' },
        { label: '用藥', value: 'Metformin 1000mg BID, Glargine 20U HS (自述停用 2 週), Losartan 50mg QD' },
        { label: '過敏史', value: 'NKDA' },
        { label: '社會史', value: '自營業者，無固定收入，自述因經濟困難停藥' },
      ]},
    ],
  },
]

export function getHisSourceData(patientId: string): HisSourceData | undefined {
  return MOCK_HIS_SOURCE_DATA.find(d => d.patientId === patientId)
}

// ===== 生成式護理紀錄 AI — Mock 資料 =====

export const NURSING_FORMAT_OPTIONS = [
  { label: 'ISBAR（識別/狀態/背景/評估/建議）', value: 'isbar' },
  { label: 'DART（資料/行動/反應/教導）', value: 'dart' },
  { label: 'Focus DAR（焦點/資料/行動/反應）', value: 'focus-dar' },
  { label: 'SOAPIE（主觀/客觀/評估/計畫/介入/評價）', value: 'soapie' },
  { label: 'Narrative（敘述式）', value: 'narrative' },
]

export interface NursingWritingDraft {
  type: string
  format: string
  patientId: string
  content: string
}

export const MOCK_NURSING_WRITING_DRAFTS: NursingWritingDraft[] = [
  // ── mp1 王建民 (AMI) ──
  { type: 'admission-nursing', format: 'isbar', patientId: 'mp1', content: `【入院護理評估】ISBAR 格式

I — Identify（識別）
病患姓名：王建民　　病歷號：A2025001
年齡/性別：68歲/男　　床號：5A-12
入院日期：2026-03-18　　主治醫師：李文哲

S — Situation（狀態）
因急性胸痛 3 小時由急診入院，診斷為急性下壁心肌梗塞 (Inferior STEMI)。
目前意識清楚 (GCS E4V5M6 = 15)，主訴胸口悶痛改善中 NRS 3/10（PCI 術後）。
生命徵象：BP 132/78 mmHg, HR 72 bpm, RR 18, BT 36.5°C, SpO2 98% (RA)。

B — Background（背景）
過去病史：高血壓 10 年，規則服用 Amlodipine 5mg QD。
過敏史：NKDA
手術史：2026-03-18 急診 PCI with stent to RCA
家族史：父親 — 心肌梗塞病史

C — Assessment（評估）
1. 意識狀態：清醒，定向力完整
2. 活動功能：Barthel Index 70 分（需協助沐浴、上下樓）
3. 跌��風險：Morse Fall Scale 45 分（中度風險）
4. 壓傷風險：Braden Scale 18 分（輕度風險）
5. 疼痛評估：NRS 3/10（胸口悶痛）
6. 管路：左手 PIV 20G (03/18 置入)、Foley 16Fr (03/18)
7. 皮膚完整性：完整，無壓傷
8. 營養篩檢：BMI 26.2，無營養不良風險

R — Recommendation（建議）
1. 持續心電圖監測，注意 ST 段變化
2. 依醫囑給予 Dual antiplatelet therapy (DAPT)
3. 臥床休息 24 小時，之後漸進式活動
4. 低鈉低脂飲食
5. ���痛評估 Q4H，NRS ≥ 4 通知醫師
6. 跌倒預防措施：床欄上升、呼叫鈴置於手邊
7. 安排心臟復健衛教` },

  { type: 'narrative-nursing', format: 'isbar', patientId: 'mp1', content: `【敘述性護理紀錄】ISBAR 格式

I — Identify（識別）
病患：王建民，68歲男性，A2025001，5A-12 床
日期：2026-03-19 08:00　　記錄護理師：張雅芳

S — Situation（狀態���
病患今晨主訴昨夜睡眠品質尚可，偶有胸悶感但較入院時改善，NRS 2/10。
今晨生命徵象穩定：BP 128/76, HR 68, SpO2 99% (RA)。
晨間進食半碗稀飯，食慾普通。

B — Background（背景）
03/18 急診 PCI with stent to RCA，術後第一天。
目前使用 DAPT (Aspirin + Clopidogrel)、Atorvastatin、Metoprolol。
昨日 Troponin-I 追蹤 2.8 ng/mL（較前日 8.5 下降中）。

A — Assessment（評估）
1. 胸痛症狀持續改善中
2. PCI 穿刺部位（右橈動脈）無紅腫、滲血
3. 可在床邊坐起，未出現頭暈或胸悶加劇
4. 排尿順暢，Foley 引流清澈尿液約 1200ml/day
5. 情緒穩定，家屬陪��中

R — Recommendation（建議）
1. 繼續監測心電圖至 PCI 術後 48 小時
2. 今日可嘗試在協助下下床活動
3. 預計明日移除 Foley catheter
4. 進行心臟復健第一階段衛教` },

  { type: 'shift-handoff', format: 'isbar', patientId: 'mp1', content: `【交班護理紀錄】ISBAR 格式

I — Identify（識別）
病患：王建民，68歲/男，A2025001，5A-12 床
交班時間：2026-03-19 小夜班 → 大夜班
交班護理師：李佳蓉 → 王小芬

S — Situation（狀態）
小夜班期間病患生命徵象穩定，無胸痛發作。
20:00 NRS 1/10，21:00 已入睡。
I/O 本班：進 800ml / 出 650ml（Foley 引流）。
22:00 最後一次生命徵象：BP 126/72, HR 65, SpO2 99%。

B — Background（背景）
Dx: Inferior STEMI s/p PCI with stent to RCA (03/18)
目前 DAPT + Statin + β-blocker 治療中。
左手 PIV 20G 通暢，Foley 16Fr 引流正常。

A — Assessment（評估）
1. 心臟狀態穩定，無再發胸痛
2. 穿刺部位乾燥無滲血
3. 下肢無水腫
4. 睡眠品質改善中
5. 明日預計：移除 Foley、開始下床活動、Troponin 追蹤

R — Recommendation（建議）
1. 大夜��繼續心電圖監測
2. 03:00 給予 Metoprolol 25mg PO（已備藥）
3. 注意夜間胸悶/呼吸困難主訴
4. 晨間 06:00 抽血 Troponin-I, CBC, BMP` },

  { type: 'inter-unit-transfer', format: 'isbar', patientId: 'mp1', content: `【單位間交班紀錄】ISBAR 格式

I — Identify（識別）
病患：王建民，68歲/男，A2025001
轉出單位：CCU (5A-12) → 轉入單位：一般病房 (6A-03)
轉送日期：2026-03-21 14:00
轉出護理師：張雅芳　　接收護理師：陳美玲

S — Situation（狀態）
病患 03/18 因 Inferior STEMI 急診入院，同日 PCI with stent to RCA。
目前 PCI 術後第 3 天，生命徵象穩定 48 小時以上。
意識清楚，可自行下床活動，無胸痛主訴 (NRS 0/10)。
BP 124/74, HR 66, SpO2 99% (RA)。

B — Background（背景）
PMH: HTN × 10 yr
Allergy: NKDA
目前用藥：Aspirin 100mg QD, Clopidogrel 75mg QD, Atorvastatin 40mg HS,
　　　　　Metoprolol 25mg BID, Amlodipine 5mg QD
Troponin-I trend: 8.5 → 2.8 → 0.6 ng/mL（持續下降）

A — Assessment（評估）
1. 管路：左手 PIV 20G (03/18, 通暢)，Foley 已移除 (03/20)
2. 活動：可自行如廁、走廊步行 200m 無不適
3. 飲食：低鈉低脂飲食，進食量約 8 成
4. 排泄：自解小便正常，大便 03/20 解 1 次
5. 傷口：橈動脈穿刺處已癒合
6. 護理問題：急性疼痛（已改善）、活動功能障礙（已改善）
7. 跌倒風險：Morse 30 分（低風險）

R — Recommendation（建議）
1. 轉入一般病房繼續 DAPT 治療
2. 每日監測生命徵象 QID
3. 漸進式增加活動量（心臟復健第二階段）
4. 預計住院 5-7 天，安排出院衛教
5. 注意再發性胸痛，若 NRS ≥ 3 通知醫師` },

  { type: 'discharge-nursing', format: 'isbar', patientId: 'mp1', content: `【出院護理摘要】ISBAR 格式

I — Identify（識別）
病患：王建民，68歲/男，A2025001
住院日期：2026-03-18 ～ 2026-03-25（共 7 天）
出院診斷：Acute inferior STEMI s/p PCI with stent to RCA

S — Situation（狀態）
病患出院時意識清楚，生命徵象穩定。
BP 122/72, HR 64, BT 36.4°C, SpO2 99%。
無胸痛 (NRS 0/10)，可自行步行活動，日常生活自理。

B — Background（背景）
住院經過：03/18 急診 PCI with stent → CCU 監測 3 天 → 轉一般病房。
Troponin-I 高峰 8.5 ng/mL，出院前 0.2 ng/mL。
住院期間無併發症（無心律不整、心衰竭、出血）。

A — Assessment（評估）
1. 出院帶藥：Aspirin 100mg QD, Clopidogrel 75mg QD (需服用至少 12 個月),
   Atorvastatin 40mg HS, Metoprolol 25mg BID, Amlodipine 5mg QD
2. 管路：全數移除，傷口癒合良好
3. 活動能力：Barthel Index 100 分（完全獨立）
4. 衛教完成度：心臟復健衛教 ✓、用藥指導 ✓、飲食衛教 ✓、緊急就醫衛教 ✓
5. 家庭支持：太太全��陪同，理解照護要點

R — Recommendation（建議）
1. 返診：03/31 心臟內科門診（李文哲醫師）
2. 持續服用 DAPT，勿自行停藥
3. 規律低強度運動（每日步行 30 分鐘）
4. 低鈉低脂飲食，戒菸
5. 緊急就醫警示：胸痛 > 15 分鐘、呼吸困難、冒冷汗、意識改變
6. 心臟復健門診預約：04/02` },

  // ── mp2 林美珍 (COPD) ──
  { type: 'admission-nursing', format: 'isbar', patientId: 'mp2', content: `【入院護理評估】ISBAR 格式

I — Identify（識別）
病患姓名：林美珍　　病歷號：A2025002
年齡/性別：55歲/女　　床號：6B-03
入院日期：2026-03-20　　主治醫師：張惠雯

S — Situation（狀態）
因呼吸困難加劇伴咳嗽濃痰 3 天由急診入院，診斷 COPD acute exacerbation。
目前使用 O2 nasal cannula 3L/min，SpO2 92%。
意識清楚，端坐呼吸，呼吸費力伴哮鳴音。
BP 148/88, HR 98, RR 26, BT 37.8°C。

B — Background（背景）
PMH: COPD GOLD Stage III × 8 年、HTN、30 pack-year 吸菸史（已戒 2 年）
用藥：Tiotropium inhaler QD, Budesonide/Formoterol BID, Amlodipine 5mg QD
過敏：Penicillin（皮���）
近期：1 週前感冒症狀，未就醫，3 天前呼吸困難加劇

A — Assessment（評估）
1. 呼吸型態：費力、使用輔助肌、RR 26
2. Barthel Index: 55 分（需中度協助）
3. Morse Fall Scale: 55 分（高風險）
4. Braden Scale: 16 分（中度風險）
5. 痰液：黃綠色濃稠痰，咳出困難
6. 管路：右手 PIV 22G
7. 營養：BMI 21.5，食慾差

R — Recommendation（建議）
1. 持續 O2 監測，維持 SpO2 88-92%（避免高流量氧氣）
2. 依醫囑給予 Nebulizer Q6H + IV Methylprednisolone
3. 鼓勵有效咳嗽技巧、噘嘴呼吸
4. 抬高床頭 45-60 度
5. 跌倒高風險：黃色手圈、床欄上升、防滑鞋
6. I/O 記錄，鼓勵飲水 1500ml/day` },

  { type: 'narrative-nursing', format: 'isbar', patientId: 'mp2', content: `【敘述性護理紀錄】ISBAR 格式

I — Identify（識別）
病患：林美珍，55歲女性，A2025002，6B-03 床
日期：2026-03-21 14:00　　記錄護理師：王小芬

S — Situation（狀態）
入院第 2 天，呼吸困難較昨日改善。O2 降至 2L/min, SpO2 93%。
仍有間歇性咳嗽，痰量減少且顏色轉為淡黃。
今日可在床邊坐起進食，食慾略改善。

B — Background（背景）
昨日 CXR 顯示肺部過度充氣，無新浸潤。
目前 Levofloxacin IV Day 2 + Methylprednisolone tapering。
ABG (03/20): pH 7.35, pCO2 52, pO2 68, HCO3 28。

A — Assessment（評估）
1. 呼吸音：雙側散在性哮鳴音減少，右下葉仍有粗囉音
2. 咳痰能力改善，可自行咳出
3. RR 22（較昨日 26 改善）
4. 活動耐受力仍低，如廁需協助

R — Recommendation（建議）
1. 繼續 Nebulizer 治療及胸腔物理治療
2. 明日追蹤 ABG
3. 評估是否可降 O2 至 1L/min 或改 Room Air trial` },

  { type: 'shift-handoff', format: 'isbar', patientId: 'mp2', content: `【交班護理紀錄】ISBAR 格式

I — Identify（識別）
病患：林美珍，55歲/女，A2025002，6B-03 床
交班時間：2026-03-21 白班 → 小夜班

S — Situation（狀態）
COPD AE 入院 Day 2，呼吸狀況持續改善中。
O2 2L/min, SpO2 93-94%。RR 20-22。
白班 I/O：進 1200ml / 出 900ml。
14:00 Nebulizer 已執行，痰液淡黃少量。

B — Background（背景）
Levofloxacin 750mg IV QD (Day 2), Methylprednisolone 40mg IV Q12H。
右手 PIV 22G 通暢，無紅腫。

A — Assessment（評估）
1. 呼吸改善中，哮鳴音減少
2. 可床邊坐起用餐，如廁需輪椅
3. 18:00 有 Nebulizer 需執行
4. 明晨預計抽 ABG

R — Recommendation（建議）
1. 小夜班 18:00 Nebulizer + chest PT
2. 睡前注意呼吸型態，SpO2 < 88% 通知醫師
3. 鼓勵飲水，目標 1500ml/day` },

  { type: 'inter-unit-transfer', format: 'isbar', patientId: 'mp2', content: `【單位間交班紀錄】ISBAR 格式

I — Identify（識別）
病患：林美珍，55歲/女，A2025002
轉出：胸腔內科 6B-03 → 轉入：呼吸照護中心 RCC-05
轉送日期：2026-03-22 10:00

S — Situation（狀態）
COPD AE 入院 Day 3，因呼吸狀況未如預期改善需轉呼吸照護中心。
ABG (03/22 06:00): pH 7.32, pCO2 58, pO2 62 on O2 3L/min。
RR 24, SpO2 90%, 呼吸費力加劇。

B — Background（背景）
Levofloxacin Day 3, Methylprednisolone tapering 中。
Allergy: Penicillin。右手 PIV 22G。

A — Assessment（評估）
1. 呼吸型態惡���，考慮 NIV (BiPAP) 介入
2. Barthel Index 45 分
3. 護理問題：氣體交換障礙、活動功能障礙、清除呼吸道功能失效
4. 情緒焦慮，需心理支持

R — Recommendation（建議）
1. 轉入後立即評估 NIV 需求
2. 密切監測 ABG Q6H
3. 加強胸腔物理治療
4. 家屬已告知轉床，女兒下午會來探視` },

  { type: 'discharge-nursing', format: 'isbar', patientId: 'mp2', content: `【出院護理摘要】ISBAR 格式

I — Identify（識別）
病患：林美珍，55歲/女，A2025002
住院日期：2026-03-20 ～ 2026-03-28（共 8 天）
出院診斷：COPD with acute exacerbation

S — Situation（狀態）
出院時呼吸平順，Room Air SpO2 93%。
RR 18, BP 132/80, HR 78。無發燒。
可自行步行活動，日常生活大致自理。

B — Background（背景）
住院經過：急性發作 → 抗生素 + 類固醇治療 → RCC 使用 BiPAP 2 天 → 改善後轉回一般病房。

A — Assessment（評估）
1. 出院帶藥：Tiotropium inhaler, Budesonide/Formoterol BID, Prednisolone taper, Amlodipine 5mg
2. 吸入器使用技巧：示範正確 ✓
3. 衛教完成：COPD 自我管理 ✓、感染預防 ✓、��吸運動 ✓、緊急就醫 ✓
4. Barthel Index: 90 分

R — Recommendation（建議）
1. 返診 04/03 胸腔內科
2. 每日噘嘴呼吸練習 + 腹式呼吸
3. 流感疫苗接種（04 月安排）
4. 出現痰量增加、發燒、呼吸困難加劇 → 立即就醫` },

  // ── mp3 張志豪 (DKA) ──
  { type: 'admission-nursing', format: 'isbar', patientId: 'mp3', content: `【入院護理評估】ISBAR 格式

I — Identify（識別）
病患姓名：張志豪　　病歷號：A2025003
年齡/性別：42歲/男　　床號：3C-08
入院日期：2026-03-22　　主治醫師：陳淑芬

S — Situation（狀態）
因噁心嘔吐、腹痛及呼吸急促 1 天由急診入院，診斷 DKA。
到院血糖 580 mg/dL, pH 7.18, ketone (+++)。
目前 Insulin drip 中，意識清楚但倦怠。
BP 108/68, HR 110, RR 28 (Kussmaul), BT 36.8°C, SpO2 98%。

B — Background（背景）
PMH: T2DM × 5 年 (poorly controlled, 自述停藥 2 週因經濟困難), HTN
用藥（原）：Metformin 1000mg BID, Glargine 20U HS, Losartan 50mg QD
過敏：NKDA

A — Assessment（評估）
1. 脫水徵象：皮膚帳篷現象(+)、口腔乾燥、尿量偏少
2. Barthel Index: 60 分
3. Morse Fall Scale: 50 分（高風險）
4. Braden Scale: 17 分（輕度風險）
5. 管路：右手 PIV 18G, Foley 16Fr
6. ���糖 Q1H 監測中
7. 營養：NPO 中，待醫囑恢復飲食

R — Recommendation（建議）
1. 嚴密 I/O 監測，目標補液 4-6L/24hr
2. 血糖 Q1H + 血鉀 Q2H 追蹤
3. Insulin drip titration per protocol
4. pH > 7.3 + 血糖 < 250 後轉 SC insulin
5. 跌倒高風險措施
6. 社工轉介評估（經濟困難導致停藥）` },

  { type: 'narrative-nursing', format: 'isbar', patientId: 'mp3', content: `【敘述性護理紀錄】ISBAR 格式

I — Identify（識別）
病患：張志豪，42歲男性，A2025003，3C-08 床
日期：2026-03-23 08:00　　記錄護理師：李佳蓉

S — Situation（狀態）
DKA 入院 Day 2，代謝狀況明顯改善。
06:00 ABG: pH 7.34, HCO3 20。血糖 198 mg/dL（趨勢下降）。
Insulin drip 已於 04:00 ���止，轉為 SC Glargine 22U HS + Sliding scale。
噁心感消退，今晨開始進食清流質。

B — Background（背景）
昨日 24hr I/O: 進 5200ml (IV 4500 + PO 700) / 出 4100ml。
K+ 由入院 5.8 降至 4.2 mEq/L（已停 KCl 補充）。

A — Assessment（評估）
1. 意識精神改善，可自行翻身坐起
2. 脫水改善：皮膚彈性恢復，口腔黏膜濕潤
3. 仍有輕微腹部不適，無壓痛反彈痛
4. Foley 引流 > 0.5ml/kg/hr
5. 情緒低落，表達經濟壓力

R — Recommendation（建議）
1. 血糖改為 AC/PC + HS 監測
2. 逐步恢復飲食：清流質 → 半流質 → 糖尿病飲食
3. 社工已排定 03/24 訪視
4. 開始糖尿病自我管理衛教` },

  { type: 'shift-handoff', format: 'isbar', patientId: 'mp3', content: `【交班護理紀錄】ISBAR 格式

I — Identify（識別）
病患：張志豪，42歲/男，A2025003，3C-08 床
交班時間：2026-03-23 白班 → 小夜班

S — Situation（狀態）
DKA 入院 Day 2，已脫離 Insulin drip，改 SC insulin。
白班血糖：AC 198 → PC2h 245 → 午 AC 176。
進食清流質約 500ml，無噁心嘔吐。
I/O 白班：進 2100ml / 出 1800ml。

B — Background（背景）
SC Glargine 22U HS + Lispro sliding scale。
右手 PIV 18G 通暢，NS 1000ml Q8H running。
Foley 16Fr 引流正常。K+ 4.2（穩定）。

A — Assessment（評估）
1. 代謝狀況改善中
2. 活動力改善，可在協助下如廁
3. 情緒有改善，願意與護理師討論
4. 明日預計：移除 Foley、開始糖尿病飲食

R — Recommendation（建議）
1. 小夜班 17:30 晚 AC 血糖監測
2. HS Glargine 22U (21:00 給予)
3. 鼓勵飲水，記錄 I/O
4. 注意低血糖症狀（血糖 < 70 通知醫師）` },

  { type: 'inter-unit-transfer', format: 'isbar', patientId: 'mp3', content: `【單位間交班紀錄】ISBAR 格式

I — Identify（識別）
病患：張志豪，42歲/男，A2025003
轉出：內科加護病房 ICU-3C-08 → 轉入：一般內科 7A-02
轉送日期：2026-03-24 10:00

S — Situation（狀態）
DKA 入院 Day 3，代謝已穩定。
pH 7.38, 血糖 AC 162, K+ 4.0。
SC insulin 控制良好，已恢復糖尿病飲食。
BP 122/76, HR 82, RR 16, SpO2 99%。

B — Background（背景）
目前用藥：Glargine 22U HS, Lispro sliding scale, Metformin 500mg BID (今日開始),
Losartan 50mg QD。
右手 PIV 18G，Foley 已移除 (03/24 06:00)。

A — Assessment（評估）
1. 可自行下床活動、如廁
2. Barthel Index 90 分
3. 護理問題：血糖控制不穩定（改善中）、知識缺���/糖尿病自我管理
4. 社工已介入評估，協助健保重大傷病卡申請

R — Recommendation（建議）
1. 繼續血糖 QID 監測 (AC 三餐 + HS)
2. 糖尿病衛教持續中（飲食、運動、胰島素注射、低血糖處理）
3. 社工追蹤中，預計 03/25 完成補助評估
4. 預計住院 7 天，安排 HbA1c 追蹤` },

  { type: 'discharge-nursing', format: 'isbar', patientId: 'mp3', content: `【出院護理摘要】ISBAR 格式

I — Identify（識別）
病患：張志豪，42歲/男，A2025003
住院日期：2026-03-22 ～ 2026-03-29（共 7 天）
出院診斷：T2DM with DKA

S — Situation（狀態）
出院時血糖穩定，AC 128-165 mg/dL。
意識清楚，可完全自理日常生活。
BP 120/74, HR 76, BT 36.5°C。

B — Background（背景）
住院經過：DKA → Insulin drip → SC insulin → 口服藥+胰島素併用。
社工介入：已完成重大傷病卡申請，協助藥費補助。

A — Assessment（評估）
1. 出院帶藥：Glargine 20U HS, Metformin 1000mg BID, Losartan 50mg QD
2. 胰島素注射技術：病患回覆示教正確 ✓
3. 血糖自我監測：使用血糖機示範正確 ✓
4. 衛教完成：飲食 ✓、運動 ✓、低血糖處理 ✓、足部照護 ✓、緊急就醫 ✓
5. Barthel Index: 100 分

R — Recommendation（建議）
1. 返診 04/05 新陳代謝科（陳淑芬醫師）
2. 每日血糖監測 AC breakfast + HS
3. 規律飲食及運動
4. 低血糖處理：隨身攜帶糖果，血糖 < 70 立即補充 15g 醣類
5. 社工持續追蹤經濟補助進度` },

  // ── 額外格式範例 ──
  { type: 'shift-handoff', format: 'dart', patientId: 'mp1', content: `【交班護理紀錄】DART 格式

D — Data（資料）
日期：2026-03-19 小夜班交班
病患：王建民，68歲/男，5A-12 床，Dx: Inferior STEMI s/p PCI (03/18)
生命徵象 22:00：BP 126/72, HR 65, RR 16, SpO2 99% (RA)
疼痛：NRS 1/10（胸口微悶）
I/O 本班：進 800ml / 出 650ml (Foley)
管路：左手 PIV 20G 通暢、Foley 16Fr 正常引流

A — Action（行動）
1. 20:00 Metoprolol 25mg PO given
2. 20:30 執行心電圖監測記錄，結果穩定
3. 21:00 協助晚間口腔清潔及舒適臥位
4. 22:00 執行生命徵象評估

R — Response（反應）
1. 病患全班無胸痛發作
2. 心電圖無 ST 段異常變化
3. 21:00 入睡，睡眠品質佳
4. 穿刺部位乾燥無滲血

T — Teaching（教導）
1. 衛教病患夜間如有胸悶/呼吸困難立即按呼叫鈴
2. 提醒明日晨間 06:00 需空腹抽血
3. 說明明日將開始下床活動計畫` },

  { type: 'narrative-nursing', format: 'focus-dar', patientId: 'mp2', content: `【敘述性護理紀錄】Focus DAR 格式

日期：2026-03-21 14:00
病患：林美珍，55歲/女，6B-03 床

Focus（焦點）：氣體交換障礙 / 呼吸道清除功能失效

D — Data（資料）
- 入院 Day 2，COPD AE，O2 2L/min NC
- SpO2 93%, RR 22
- 雙側散在性哮鳴音，右下葉粗囉音
- 痰液淡黃少量，較昨日改善
- 病患主訴「今天比較不喘了」
- 可在床邊坐起進食

A — Action（行動）
1. 14:00 執行 Nebulizer (Combivent) 治療
2. 14:20 執行胸腔叩擊引流（右下葉加強）
3. 指導有效咳嗽技巧：深呼吸 → 用力咳出
4. 協助半坐臥位（床頭抬高 45 度）
5. 鼓勵飲水 200ml

R — Response（反應）
1. Nebulizer 後 SpO2 上升至 94%
2. 胸腔叩擊後成功咳出淡黃痰約 5ml
3. 病患表示呼吸較順暢
4. 哮鳴音較叩擊前減少
5. 15:00 RR 20，��吸費力程度減輕` },

  { type: 'admission-nursing', format: 'soapie', patientId: 'mp3', content: `【入院護理評估】SOAPIE 格式

日期：2026-03-22
病患：張志豪，42歲/男，3C-08 床
護理問題：#1 體液容積缺失 #2 血糖控制不穩定

S — Subjective（主觀）
「我已經吐了一整天，肚子很痛，全身沒力氣。」
「因為沒錢買藥，胰島素和血糖藥停了快兩個禮拜。」

O — Objective（客觀）
- V/S: BP 108/68, HR 110, RR 28 (Kussmaul), BT 36.8°C
- 血糖 580 mg/dL, pH 7.18, K+ 5.8, ketone (+++)
- 皮膚帳篷現象(+)，口腔黏膜乾燥
- 尿量入院前 6 小時約 200ml
- 體重 72kg（自述平時 75kg）

A — Assessment（評估）
1. 嚴重脫水合併 DKA
2. 跌倒高風險 (Morse 50)
3. 知識缺失：未理解停藥後果
4. 社經因素影響治療遵從性

P — Plan（計畫）
1. 積極補液 NS 1L/hr × 2hr → 500ml/hr × 4hr → 250ml/hr
2. Insulin drip protocol 啟動
3. 血糖 Q1H + K+ Q2H 監測
4. 嚴密 I/O 記錄
5. 轉介社工評估經濟補助

I — Intervention（介入）
1. 09:00 開始 NS 1000ml/hr IV infusion
2. 09:00 啟動 Insulin drip 0.1U/kg/hr
3. 09:00 Foley 16Fr 置入，記錄 hourly UO
4. 09:30 抽血 CBC, BMP, ABG
5. 10:00 床欄上升、呼叫鈴置手邊、黃色手圈

E — Evaluation（評價）
- 12:00 血糖降至 380 mg/dL（4 小時下降 200）
- 12:00 UO 150ml/2hr（>0.5ml/kg/hr ✓）
- pH 7.22（改善中）
- K+ 4.8（下降中，繼續監測）
- 病患表示腹痛稍緩，NRS 5→3` },

  // ══════════════════════════════════════════════════════════════
  // mp1 — 王建民, 68歲/男, 5A-12床, Dx: Inferior STEMI s/p PCI
  // ══════════════════════════════════════════════════════════════

  // ── mp1 × DART ──

  { type: 'admission-nursing', format: 'dart', patientId: 'mp1', content: `【入院護理評估】DART 格式

D — Data（資料）
日期：2026-03-18
病患：王建民，68歲/男，5A-12 床，Dx: Inferior STEMI s/p PCI
由急診轉入，主訴胸痛約 3 小時，心導管術後返回病房
V/S: BP 118/74, HR 72, RR 18, SpO2 98% (O2 2L NC), BT 36.5°C
疼痛：NRS 3/10（胸口悶痛）
右橈動脈穿刺處 TR Band 加壓中，無滲血
心電圖：ST elevation II, III, aVF（改善中）
過去病史：HTN 10 年、DM 5 年、高血脂
目前用藥：Aspirin, Clopidogrel, Atorvastatin, Metoprolol, Lisinopril

A — Action（行動）
1. 18:00 安排入院，完成入院護理評估
2. 18:00 連接心電圖持續監測
3. 18:10 確認 TR Band 壓迫情形，右手抬高固定
4. 18:15 Aspirin 100mg + Clopidogrel 75mg PO given
5. 18:20 建立左手 PIV 20G，接 NS 500ml KVO
6. 18:30 抽血 Troponin-I, CK-MB, CBC, BMP
7. 19:00 Foley 16Fr 置入

R — Response（反應）
1. 入院後胸痛 NRS 3→2，未再發作劇烈胸痛
2. 心電圖監測無新發心律不整
3. TR Band 穿刺處乾燥無腫脹
4. PIV 通暢，無紅腫滲漏
5. Foley 引流順暢，尿液清澈淡黃

T — Teaching（教導）
1. 衛教絕對臥床休息 24 小時，右手勿用力握拳
2. 說明胸痛時立即按呼叫鈴通知護理師
3. 介紹心電圖監測設備及導線注意事項
4. 衛教 TR Band 約 4 小時後逐步減壓` },

  { type: 'narrative-nursing', format: 'dart', patientId: 'mp1', content: `【敘述性護理紀錄】DART 格式

D — Data（資料）
日期：2026-03-20 08:00
病患：王建民，68歲/男，5A-12 床，Dx: Inferior STEMI s/p PCI (03/18)
入院 Day 3，昨夜睡眠尚可，主訴「今天胸口不太悶了」
V/S 08:00: BP 122/76, HR 68, RR 16, SpO2 99% (RA)
疼痛：NRS 0/10
飲食：低鈉低脂心臟飲食，早餐進食 80%
Lab (03/19): Troponin-I 1.2→0.8 ng/mL (下降中), Cr 1.0, K+ 4.2
I/O (昨日): 進 1500ml / 出 1400ml

A — Action（行動）
1. 08:00 晨間照護：協助盥洗、口腔清潔
2. 08:30 Aspirin 100mg + Clopidogrel 75mg + Atorvastatin 40mg PO given
3. 09:00 Metoprolol 25mg PO given
4. 09:30 協助病患首次下床坐輪椅 30 分鐘
5. 10:00 執行 12-lead ECG

R — Response（反應）
1. 下床活動期間無胸悶、頭暈
2. 活動後 HR 75, BP 128/78，血行動力學穩定
3. ECG 顯示 ST 段回歸基線
4. 病患情緒穩定，主動詢問後續復健計畫
5. 傷口穿刺處已完全止血，局部無瘀斑

T — Teaching（教導）
1. 衛教漸進式活動：坐起→坐輪椅→走廊步行
2. 說明心臟復健運動注意事項
3. 衛教抗血小板藥物需持續服用，勿自行停藥
4. 提醒低鈉低脂飲食原則` },

  // mp1 × shift-handoff × dart already exists (line 2229)

  { type: 'inter-unit-transfer', format: 'dart', patientId: 'mp1', content: `【單位間交班紀錄】DART 格式

D — Data（資料）
日期：2026-03-19 10:00
病患：王建民，68歲/男，由 CCU 轉入 5A-12 床
Dx: Inferior STEMI s/p PCI (03/18)
V/S: BP 120/72, HR 66, RR 16, SpO2 99% (RA)
疼痛：NRS 1/10
意識：清醒 E4V5M6
管路：左手 PIV 20G (03/18)、Foley 16Fr (03/18)
Lab (今晨): Troponin-I 2.4 ng/mL, CK-MB 45, Cr 1.0, K+ 4.0
用藥：DAPT (Aspirin + Clopidogrel), Metoprolol 25mg BID, Atorvastatin 40mg HS
過敏：NKDA

A — Action（行動）
1. 10:00 CCU 護理師完成交班，確認管路及藥物
2. 10:10 連接 5A 病房心電圖 telemetry 監測
3. 10:15 確認床欄上升、呼叫鈴放置手邊
4. 10:20 重新評估 Braden Scale 18 分、Morse 35 分
5. 10:30 通知主治李文哲醫師轉入完成

R — Response（反應）
1. 轉運過程平穩，無胸痛發作
2. 病患適應病房環境，情緒穩定
3. 心電圖監測轉換順利，波形正常
4. 家屬（配偶）陪伴中，已介紹病房環境

T — Teaching（教導）
1. 介紹病房設施、作息時間及會客規範
2. 衛教活動限制：目前可床上翻身，需漸進下床
3. 說明 telemetry 監測重要性，勿自行拔除
4. 提醒有任何不適立即通知護理站` },

  { type: 'discharge-nursing', format: 'dart', patientId: 'mp1', content: `【出院護理摘要】DART 格式

D — Data（資料）
日期：2026-03-25 出院日
病患：王建民，68歲/男，5A-12 床
Dx: Inferior STEMI s/p PCI (03/18)，住院 8 天
出院 V/S: BP 118/72, HR 64, RR 16, SpO2 99% (RA)
Lab (03/24): Troponin-I 0.1 ng/mL, LDL 82, HbA1c 7.2%, Cr 0.9
ECG: NSR, 無 ST 段異常
活動能力：可獨立步行 200 公尺，無胸悶
出院帶藥：Aspirin 100mg QD, Clopidogrel 75mg QD, Atorvastatin 40mg HS, Metoprolol 25mg BID, Lisinopril 5mg QD

A — Action（行動）
1. 完成出院護理指導（藥物、飲食、活動、返診）
2. 確認出院帶藥數量及用法
3. 拔除 PIV，穿刺處覆蓋無菌敷料
4. 協助整理個人物品
5. 安排門診預約：03/31 心臟內科、04/05 新陳代謝科

R — Response（反應）
1. 病患及家屬能正確複述藥物服用時間
2. 病患能說出胸痛時應立即就醫的情況
3. 理解低鈉低脂飲食原則
4. 病患表示「知道要按時吃藥，不敢再亂停了」

T — Teaching（教導）
1. DAPT 需服用至少 12 個月，不可自行停藥
2. 低鈉低脂心臟飲食，每日鈉攝取 < 2g
3. 漸進式運動：步行→快走，避免劇烈運動
4. 返診前一天禁食 12 小時（空腹抽血）
5. 緊急就醫警示：胸痛 > 15 分鐘、呼吸困難、冒冷汗` },

  // ── mp1 × Focus DAR ──

  { type: 'admission-nursing', format: 'focus-dar', patientId: 'mp1', content: `【入院護理評估】Focus DAR 格式

日期：2026-03-18 18:00
病患：王建民，68歲/男，5A-12 床

Focus（焦點）：急性冠心症後心肌灌流異常 / 急性疼痛

D — Data（資料）
- 急診轉入，Inferior STEMI s/p PCI (RCA stent × 1)
- 胸痛 NRS 3/10，悶痛感
- V/S: BP 118/74, HR 72, RR 18, SpO2 98% (O2 2L NC)
- 右橈動脈 TR Band 加壓中
- Troponin-I 5.6 ng/mL, CK-MB 120
- ECG: ST elevation II, III, aVF（術後改善中）
- PMH: HTN, DM, Hyperlipidemia
- 意識清醒 GCS E4V5M6
- Braden 20 分，Morse 30 分

A — Action（行動）
1. 完成入院評估及護理計畫建立
2. 連接持續心電圖監測
3. 建立 PIV 20G (左手)，NS 500ml KVO
4. 給予 DAPT: Aspirin 100mg + Clopidogrel 75mg
5. TR Band 穿刺處照護：每 30 分鐘評估
6. 絕對臥床，床頭抬高 30 度
7. Foley 16Fr 置入，I/O 記錄

R — Response（反應）
1. 入院 2 小時後胸痛 NRS 3→1
2. 心電圖未見新發 arrhythmia
3. 穿刺處無活動性出血
4. 病患配合臥床，情緒穩定
5. 22:00 入睡，睡眠品質可` },

  { type: 'narrative-nursing', format: 'focus-dar', patientId: 'mp1', content: `【敘述性護理紀錄】Focus DAR 格式

日期：2026-03-20 14:00
病患：王建民，68歲/男，5A-12 床

Focus（焦點）：活動耐受力下降 / 心臟復健

D — Data（資料）
- 入院 Day 3，PCI 術後 Day 2
- 晨間已首次下床坐輪椅 30 分鐘無不適
- 午後主訴「想再多走動一下」
- V/S 14:00: BP 124/76, HR 70, RR 16, SpO2 99% (RA)
- 胸痛 NRS 0/10
- ECG telemetry 穩定，NSR

A — Action（行動）
1. 14:00 評估活動前 V/S 基準值
2. 14:10 協助病患床邊站立 5 分鐘
3. 14:15 陪同走廊步行約 50 公尺
4. 14:25 步行後返回床邊休息
5. 14:30 監測活動後 V/S

R — Response（反應）
1. 站立時無頭暈、胸悶
2. 步行過程 HR 70→80，步行後 2 分鐘回復至 72
3. BP 活動後 130/80（較基準微升，可接受）
4. SpO2 維持 98-99%
5. 病患表示「走一走覺得精神比較好」` },

  { type: 'shift-handoff', format: 'focus-dar', patientId: 'mp1', content: `【交班護理紀錄】Focus DAR 格式

日期：2026-03-19 大夜班交班 07:00
病患：王建民，68歲/男，5A-12 床

Focus（焦點）：心肌梗塞術後監測 / 疼痛管理

D — Data（資料）
- PCI 術後 Day 1，CCU 轉入 5A 首夜
- 00:00-06:00 間歇睡眠，02:00 曾醒來如廁
- 02:00 主訴胸口微悶 NRS 2/10，無放射痛
- V/S 06:00: BP 116/70, HR 62, RR 14, SpO2 99% (RA)
- ECG telemetry 全夜 NSR，無 arrhythmia
- I/O 本班：進 300ml / 出 400ml (Foley)
- TR Band 已移除（昨日 22:00），穿刺處乾燥

A — Action（行動）
1. 02:00 評估胸悶情形，NRS 2/10，持續觀察
2. 02:15 確認 ECG 無 ST 段變化
3. 02:30 胸悶自行緩解，NRS 0/10
4. 06:00 晨間 V/S 測量
5. 06:30 抽血 Troponin-I, BMP

R — Response（反應）
1. 02:00 胸悶短暫發作後 30 分鐘內自行緩解
2. 全夜無劇烈胸痛事件
3. 心電圖監測穩定
4. 穿刺處無出血或血腫
5. 晨間精神尚可，可配合護理活動` },

  { type: 'inter-unit-transfer', format: 'focus-dar', patientId: 'mp1', content: `【單位間交班紀錄】Focus DAR 格式

日期：2026-03-19 10:00
病患：王建民，68歲/男，CCU → 5A-12 床

Focus（焦點）：CCU 轉一般病房照護銜接

D — Data（資料）
- Inferior STEMI s/p PCI (03/18 RCA stent × 1)
- CCU 住 1 天，血行動力學穩定可轉出
- V/S: BP 120/72, HR 66, RR 16, SpO2 99% (RA)
- Troponin-I 2.4→1.8 ng/mL（持續下降）
- 疼痛 NRS 1/10
- 管路：PIV 20G (左手)、Foley 16Fr
- DAPT + β-blocker + Statin 持續使用中
- 過敏：NKDA
- ADL 部分依賴（Barthel 70）

A — Action（行動）
1. CCU 護理師當面交班，雙方確認管路及用藥
2. 轉運至 5A 途中持續 SpO2 監測
3. 到達後連接 telemetry 及重新評估 V/S
4. 更新護理計畫及跌倒風險評估
5. 通知主治醫師李文哲轉入完成

R — Response（反應）
1. 轉運過程穩定，無胸痛或血壓波動
2. telemetry 連接順利，心律 NSR
3. 病患表示「換到這裡比較安靜，比較好睡」
4. 家屬了解轉出代表病情改善` },

  { type: 'discharge-nursing', format: 'focus-dar', patientId: 'mp1', content: `【出院護理摘要】Focus DAR 格式

日期：2026-03-25
病患：王建民，68歲/男，5A-12 床

Focus（焦點）：出院準備及自我照護能力

D — Data（資料）
- Inferior STEMI s/p PCI (03/18)，住院 8 天
- 出院 V/S: BP 118/72, HR 64, RR 16, SpO2 99%
- 可獨立步行 200 公尺無胸悶
- Troponin-I 0.1, LDL 82, HbA1c 7.2%
- ECG: NSR，無 ST 異常
- 出院帶藥：Aspirin, Clopidogrel, Atorvastatin, Metoprolol, Lisinopril
- 返診：03/31 心臟內科、04/05 新陳代謝科

A — Action（行動）
1. 完成出院護理指導及藥物衛教
2. 提供書面出院衛教單張
3. 拔除 PIV，評估穿刺處
4. 確認門診預約及轉介心臟復健
5. 通知居家護理轉介

R — Response（反應）
1. 病患正確示範含舌下 NTG 使用時機
2. 家屬能複述返診日期及注意事項
3. 病患表示「回家後會乖乖吃藥，飲食也會注意」
4. PIV 拔除處無紅腫，覆蓋敷料
5. 病患及家屬對出院準備表達信心` },

  // ── mp1 × SOAPIE ──

  { type: 'admission-nursing', format: 'soapie', patientId: 'mp1', content: `【入院護理評估】SOAPIE 格式

日期：2026-03-18
病患：王建民，68歲/男，5A-12 床
護理問題：#1 急性疼痛 #2 心輸出量減少之危險性

S — Subjective（主觀）
「胸口很悶，像被壓住一樣，痛了大概三個小時。」
「做完心導管好多了，但還是有一點不舒服。」

O — Objective（客觀）
- V/S: BP 118/74, HR 72, RR 18, SpO2 98% (O2 2L NC)
- 疼痛 NRS 3/10，胸口悶痛
- ECG: ST elevation II, III, aVF（術後改善中）
- Troponin-I 5.6 ng/mL, CK-MB 120
- 右橈動脈 TR Band 加壓中，無滲血
- 意識清醒，面色略蒼白

A — Assessment（評估）
1. 急性心肌梗塞術後急性疼痛（改善中）
2. 心輸出量減少風險（需持續監測）
3. 出血風險（DAPT + 穿刺處）
4. 焦慮（首次心臟手術）

P — Plan（計畫）
1. 持續心電圖監測，注意 arrhythmia
2. 疼痛評估 Q2H
3. TR Band 加壓處 Q30min 評估
4. 絕對臥床 24 小時
5. I/O 嚴密記錄

I — Intervention（介入）
1. 18:00 連接持續心電圖監測
2. 18:10 確認 TR Band 壓力適當
3. 18:15 給予 DAPT 及 Statin
4. 18:20 建立 PIV，NS KVO
5. 18:30 Foley 置入，開始 I/O 計算

E — Evaluation（評價）
- 20:00 胸痛 NRS 3→2
- 心電圖穩定，無新 arrhythmia
- TR Band 無滲血
- 尿量 200ml/2hr（充足）
- 病患表示「有比剛來好多了」` },

  { type: 'narrative-nursing', format: 'soapie', patientId: 'mp1', content: `【敘述性護理紀錄】SOAPIE 格式

日期：2026-03-21
病患：王建民，68歲/男，5A-12 床
護理問題：#1 活動耐受力下降

S — Subjective（主觀）
「昨天有下床走一小段，覺得還可以，今天想多走一點。」
「不過走太久腳會有點軟。」

O — Objective（客觀）
- 入院 Day 4，PCI 術後 Day 3
- V/S 09:00: BP 120/74, HR 66, RR 16, SpO2 99% (RA)
- 昨日步行 50 公尺無不適
- 心肌酶持續下降 Troponin-I 0.5 ng/mL
- ECG telemetry: NSR
- Barthel Index 85 分

A — Assessment（評估）
1. 活動耐受力漸改善
2. 心肌恢復中，可增加活動量
3. 下肢肌力稍弱（臥床 3 天）

P — Plan（計畫）
1. 漸進增加步行距離至 100 公尺
2. 活動前後監測 V/S
3. 下肢肌力訓練
4. 評估心臟復健轉介時機

I — Intervention（介入）
1. 09:30 活動前基準 V/S 測量
2. 09:40 協助下床，走廊步行 100 公尺
3. 09:55 步行後休息，監測 V/S
4. 10:10 指導床上下肢主動運動
5. 10:30 記錄活動耐受情形

E — Evaluation（評價）
- 步行 100 公尺完成，中途無休息
- HR 66→78→68（3 分鐘恢復）
- 無胸悶、頭暈或呼吸困難
- 病患表示「今天走比較遠，感覺不錯」
- 預計明日增加至 150 公尺` },

  { type: 'shift-handoff', format: 'soapie', patientId: 'mp1', content: `【交班護理紀錄】SOAPIE 格式

日期：2026-03-20 白班交班 15:00
病患：王建民，68歲/男，5A-12 床
護理問題：#1 心肌灌流異常 #2 活動耐受力下降

S — Subjective（主觀）
「今天有下床坐輪椅，感覺還好。」
「胸口都沒有不舒服了。」

O — Objective（客觀）
- PCI 術後 Day 2，入院 Day 3
- V/S 14:00: BP 124/76, HR 70, RR 16, SpO2 99% (RA)
- 疼痛 NRS 0/10
- 下床坐輪椅 30 分鐘＋走廊步行 50 公尺
- I/O 本班：進 800ml / 出 750ml
- Lab: Troponin-I 0.8 (↓), K+ 4.2
- ECG 14:00: NSR，ST 回歸基線

A — Assessment（評估）
1. 胸痛已緩解，心肌酶持續下降
2. 活動耐受力漸改善中
3. 血行動力學穩定

P — Plan（計畫）
1. 繼續漸進活動計畫
2. 明日增加步行距離
3. 持續 telemetry 監測
4. 明日追蹤 lipid panel

I — Intervention（介入）
1. 09:30 協助下床坐輪椅
2. 10:00 執行 12-lead ECG
3. 14:00 陪同走廊步行 50 公尺
4. 按時給予 DAPT + β-blocker + Statin

E — Evaluation（評價）
- 全班無胸痛事件
- 活動後 V/S 穩定
- ECG 改善中
- 病患配合度佳，情緒穩定` },

  { type: 'inter-unit-transfer', format: 'soapie', patientId: 'mp1', content: `【單位間交班紀錄】SOAPIE 格式

日期：2026-03-19 10:00
病患：王建民，68歲/男，CCU → 5A-12 床
護理問題：#1 心輸出量減少之危險性 #2 急性疼痛

S — Subjective（主觀）
「昨天做完心導管後好多了，胸口只剩一點點悶。」
「在加護病房睡不太著，換到普通病房會不會比較好？」

O — Objective（客觀）
- Inferior STEMI s/p PCI (03/18)，CCU 住 1 天
- V/S: BP 120/72, HR 66, RR 16, SpO2 99% (RA)
- NRS 1/10
- Troponin-I 2.4→1.8 ng/mL
- ECG: NSR，ST elevation 改善中
- 管路：PIV 20G (左手)、Foley 16Fr
- Barthel 70 分，Morse 35 分

A — Assessment（評估）
1. 血行動力學穩定，符合轉出條件
2. 心肌酶下降趨勢良好
3. 疼痛控制良好
4. 跌倒中度風險

P — Plan（計畫）
1. 轉至 5A 後持續 telemetry 監測
2. 漸進活動計畫啟動
3. 跌倒預防措施
4. 持續用藥及心臟復健評估

I — Intervention（介入）
1. CCU 護理師對 5A 護理師當面交班
2. 轉運中持續 SpO2 監測
3. 到達 5A 後連接 telemetry
4. 重新評估跌倒風險，執行預防措施
5. 通知主治醫師轉入完成

E — Evaluation（評價）
- 轉運過程穩定，無胸痛
- telemetry 接上後心律穩定
- 病房環境介紹完成
- 病患表示「這裡比較安靜舒服」` },

  { type: 'discharge-nursing', format: 'soapie', patientId: 'mp1', content: `【出院護理摘要】SOAPIE 格式

日期：2026-03-25
病患：王建民，68歲/男，5A-12 床
護理問題：#1 知識缺失（心臟疾病自我照護）

S — Subjective（主觀）
「住院這幾天學了很多，回去會注意飲食和運動。」
「藥要吃多久？可以停嗎？」

O — Objective（客觀）
- STEMI s/p PCI 住院 8 天，病情穩定出院
- V/S: BP 118/72, HR 64, RR 16, SpO2 99%
- 可獨立步行 200 公尺無不適
- Troponin-I 0.1, LDL 82, HbA1c 7.2%
- 出院帶藥 5 種，病患及家屬已完成衛教

A — Assessment（評估）
1. 心臟功能恢復良好
2. 自我照護知識仍需加強（尤其用藥遵從性）
3. 多重慢性病需長期追蹤

P — Plan（計畫）
1. DAPT 至少持續 12 個月
2. 心臟復健門診轉介
3. 慢性病共同照護門診追蹤
4. 居家護理訪視評估

I — Intervention（介入）
1. 逐項說明 5 種出院用藥之作用及副作用
2. 提供出院衛教單張（藥物、飲食、運動、緊急就醫）
3. 示範含舌下 NTG 使用方式
4. 預約返診時間
5. 轉介心臟復健及居家護理

E — Evaluation（評價）
- 病患正確複述各藥物用法
- 可示範 NTG 使用步驟
- 家屬了解緊急就醫情境
- 病患表示「這次嚇到了，一定會好好照顧自己」` },

  // ── mp1 × Narrative ──

  { type: 'admission-nursing', format: 'narrative', patientId: 'mp1', content: `【入院護理評估】Narrative 敘述式

日期：2026-03-18 18:00
病患：王建民，68歲/男，5A-12 床
Dx: Inferior STEMI s/p PCI

病患於今日 15:00 因胸痛約 3 小時由急診入院，經心導管檢查診斷為下壁 ST 段上升型心肌梗塞，已完成右冠狀動脈支架置放術一枚，術後由 CCU 觀察後轉入本病房。

入院時意識清醒 GCS 15 分，主訴胸口仍有悶痛感 NRS 3/10，生命徵象：血壓 118/74 mmHg、心跳 72 次/分、呼吸 18 次/分、血氧 98%（鼻導管 2L/min），體溫 36.5°C。右橈動脈穿刺處以 TR Band 加壓止血中，局部無腫脹及滲血。

過去病史包括高血壓 10 年、糖尿病 5 年及高血脂，目前使用藥物為 Aspirin、Clopidogrel、Atorvastatin、Metoprolol 及 Lisinopril。無藥物過敏史。

護理處置：連接持續心電圖監測，建立左手靜脈留置針 20G 接生理食鹽水維持，予以 Aspirin 100mg 及 Clopidogrel 75mg 口服給藥，置入 Foley 16Fr 開始記錄出入量。評估跌倒風險 Morse 30 分、壓傷風險 Braden 20 分。

衛教病患絕對臥床休息 24 小時，右手避免用力握拳，如有胸痛加劇或呼吸困難立即按呼叫鈴通知。家屬（配偶王太太）陪伴中，已說明目前病情及照護計畫。入院後 2 小時胸痛由 NRS 3 降至 2，心電圖穩定無新發心律不整。` },

  { type: 'narrative-nursing', format: 'narrative', patientId: 'mp1', content: `【敘述性護理紀錄】Narrative 敘述式

日期：2026-03-20 14:00
病患：王建民，68歲/男，5A-12 床
Dx: Inferior STEMI s/p PCI (03/18)

入院第 3 天，PCI 術後第 2 天。病患今日精神良好，主訴胸口無不適，疼痛 NRS 0/10。晨間生命徵象穩定：血壓 122/76、心跳 68、呼吸 16、血氧 99%（已拔除鼻導管）。

上午 09:30 首次協助病患下床坐輪椅，持續 30 分鐘，期間無胸悶或頭暈不適，心跳及血壓變化在正常範圍內。午後 14:10 進一步協助床邊站立及走廊步行約 50 公尺，步行過程中心跳由 70 升至 80 次/分，步行後 2 分鐘恢復至 72 次/分，血壓 130/80，病患表示無任何不適。

今日 12-lead ECG 顯示 ST 段已回歸基線，telemetry 監測全日為正常竇性心律。檢驗數據 Troponin-I 由 1.2 降至 0.8 ng/mL，持續改善中。飲食方面病患已開始低鈉低脂心臟飲食，早餐進食約 80%。

持續衛教漸進式活動原則、心臟復健運動注意事項，以及抗血小板藥物不可自行停用之重要性。病患情緒穩定，主動詢問出院後的復健計畫，配合度良好。` },

  { type: 'shift-handoff', format: 'narrative', patientId: 'mp1', content: `【交班護理紀錄】Narrative 敘述式

日期：2026-03-19 小夜班交班 23:00
病患：王建民，68歲/男，5A-12 床
Dx: Inferior STEMI s/p PCI (03/18)

PCI 術後第 1 天，今日 10:00 由 CCU 轉入 5A 病房。小夜班期間病患整體狀況穩定。生命徵象 22:00 測量：血壓 126/72、心跳 65、呼吸 16、血氧 99%（Room Air），胸痛 NRS 1/10（微悶感）。

本班出入量：進 800ml、出 650ml（Foley 引流）。管路方面左手 PIV 20G 通暢無紅腫，Foley 16Fr 引流順暢尿液清澈。TR Band 已於 22:00 移除，穿刺處乾燥無出血。

藥物給予：20:00 Metoprolol 25mg PO。20:30 執行心電圖監測記錄，結果穩定無 ST 段異常變化。21:00 協助晚間口腔清潔及調整舒適臥位後入睡，睡眠品質佳。

衛教病患夜間如有胸悶或呼吸困難立即按呼叫鈴，提醒明日晨間 06:00 需空腹抽血，並說明明日將開始下床活動計畫。全班無胸痛發作事件。` },

  { type: 'inter-unit-transfer', format: 'narrative', patientId: 'mp1', content: `【單位間交班紀錄】Narrative 敘述式

日期：2026-03-19 10:00
病患：王建民，68歲/男，CCU → 5A-12 床
Dx: Inferior STEMI s/p PCI (03/18)

病患因下壁 ST 段上升型心肌梗塞於 03/18 接受右冠狀動脈支架置放術，術後於 CCU 觀察一天，血行動力學穩定，今日 10:00 轉入 5A 一般病房。

轉入時生命徵象：血壓 120/72、心跳 66、呼吸 16、血氧 99%（Room Air），意識清醒，胸痛 NRS 1/10。今晨檢驗 Troponin-I 2.4 ng/mL（較昨日下降），CK-MB 45。現行用藥包括 DAPT（Aspirin + Clopidogrel）、Metoprolol 25mg BID、Atorvastatin 40mg HS。無藥物過敏。

管路：左手 PIV 20G（03/18 建立）通暢、Foley 16Fr（03/18 置入）引流正常。Braden 18 分、Morse 35 分（中度跌倒風險）。

CCU 護理師與 5A 護理師完成當面交班，確認管路、用藥及醫囑。到達後連接 telemetry 心電圖監測，波形正常。床欄上升、呼叫鈴置於手邊，跌倒預防措施已執行。已通知主治醫師李文哲轉入完成。家屬（配偶）陪伴中，已介紹病房環境及作息時間。病患表示對轉出 CCU 感到放心，適應良好。` },

  { type: 'discharge-nursing', format: 'narrative', patientId: 'mp1', content: `【出院護理摘要】Narrative 敘述式

日期：2026-03-25
病患：王建民，68歲/男，5A-12 床
Dx: Inferior STEMI s/p PCI (03/18)

病患因下壁心肌梗塞住院 8 天，經 PCI 支架置放術及藥物治療後病情穩定，今日准予出院。出院時生命徵象：血壓 118/72、心跳 64、呼吸 16、血氧 99%，活動能力恢復良好，可獨立步行 200 公尺無胸悶不適。

出院檢驗數據：Troponin-I 0.1 ng/mL（已回歸正常）、LDL 82 mg/dL、HbA1c 7.2%、Cr 0.9。心電圖顯示正常竇性心律，無 ST 段異常。

出院帶藥 5 種：Aspirin 100mg QD、Clopidogrel 75mg QD（DAPT 至少持續 12 個月）、Atorvastatin 40mg HS、Metoprolol 25mg BID、Lisinopril 5mg QD。已逐項向病患及家屬說明各藥物之作用、用法及副作用，並示範含舌下 NTG 緊急使用方式。

出院衛教重點包括：低鈉低脂心臟飲食、漸進式運動復健、抗血小板藥物不可自行停用、緊急就醫警示徵兆（胸痛超過 15 分鐘、呼吸困難、冒冷汗）。已安排門診追蹤：03/31 心臟內科（李文哲醫師）、04/05 新陳代謝科。已轉介心臟復健及居家護理。病患及家屬表示理解出院注意事項，有信心執行自我照護。` },

  // ══════════════════════════════════════════════════════════════
  // mp2 — 林美珍, 55歲/女, 6B-03床, Dx: COPD with acute exacerbation
  // ══════════════════════════════════════════════════════════════

  // ── mp2 × DART ──

  { type: 'admission-nursing', format: 'dart', patientId: 'mp2', content: `【入院護理評估】DART 格式

D — Data（資料）
日期：2026-03-20
病患：林美珍，55歲/女，6B-03 床，Dx: COPD with acute exacerbation
由急診入院，主訴呼吸困難加劇 2 天，咳嗽伴黃綠色痰
V/S: BP 138/82, HR 96, RR 26, SpO2 89% (RA), BT 37.8°C
呼吸型態：使用輔助呼吸肌，唇微紫
肺音：雙側散在性哮鳴音及右下葉粗囉音
PMH: COPD 8 年，抽菸史 30 pack-years（已戒 2 年）
目前用藥：Spiriva, Symbicort, Salbutamol PRN
ABG (RA): pH 7.35, PaCO2 52, PaO2 58, HCO3- 28

A — Action（行動）
1. 20:00 入院安置，半坐臥位（床頭抬高 45 度）
2. 20:00 給予 O2 2L/min via NC（注意 COPD 低流量原則）
3. 20:10 Nebulizer (Combivent) 治療
4. 20:15 Methylprednisolone 40mg IV push
5. 20:20 抽血 CBC, CRP, ABG, Sputum C/S
6. 20:30 Levofloxacin 750mg IV drip 開始
7. 21:00 完成入院護理評估

R — Response（反應）
1. O2 使用後 SpO2 上升至 93%
2. Nebulizer 後呼吸較順，RR 24→22
3. 病患表示「噴藥後比較吸得到氣」
4. 哮鳴音稍改善但仍存在
5. 21:30 可平靜說完整句話

T — Teaching（教導）
1. 說明低流量氧氣使用原則及注意事項
2. 衛教噘嘴式呼吸（pursed-lip breathing）
3. 指導呼叫鈴使用，呼吸困難時立即通知
4. 說明痰液留檢方式` },

  { type: 'narrative-nursing', format: 'dart', patientId: 'mp2', content: `【敘述性護理紀錄】DART 格式

D — Data（資料）
日期：2026-03-22 10:00
病患：林美珍，55歲/女，6B-03 床，Dx: COPD AE
入院 Day 3，O2 由 2L 降至 1L/min NC
V/S 10:00: BP 132/78, HR 84, RR 20, SpO2 95% (O2 1L NC)
肺音：哮鳴音明顯減少，右下葉囉音消失
痰液轉為白色少量，易咳出
CRP 12→5.8 (↓)，WBC 11000→8500 (↓)
病患主訴「今天好很多，可以自己走去廁所了」

A — Action（行動）
1. 10:00 Nebulizer (Combivent) QID 持續執行
2. 10:30 Methylprednisolone 由 IV 轉 PO Prednisolone 30mg
3. 11:00 指導吸入器正確使用技巧（MDI + spacer）
4. 11:30 協助病患走廊步行 30 公尺做活動評估
5. 繼續 Levofloxacin 750mg IV QD

R — Response（反應）
1. 步行 30 公尺後 SpO2 維持 93%，RR 22
2. 休息 3 分鐘後 SpO2 回升至 95%
3. 病患能正確示範 MDI + spacer 操作步驟
4. 呼吸費力感明顯改善
5. 食慾改善，午餐進食 70%

T — Teaching（教導）
1. 持續衛教噘嘴式呼吸及腹式呼吸
2. 示範吸入器使用：吐氣→按壓→慢吸→閉氣 10 秒
3. 說明類固醇漸減計畫，勿自行停藥
4. 衛教活動後呼吸困難加劇時應休息` },

  { type: 'shift-handoff', format: 'dart', patientId: 'mp2', content: `【交班護理紀錄】DART 格式

D — Data（資料）
日期：2026-03-21 白班交班 15:00
病患：林美珍，55歲/女，6B-03 床，Dx: COPD AE
入院 Day 2，O2 2L/min NC
V/S 14:00: BP 134/80, HR 88, RR 22, SpO2 93% (O2 2L NC)
肺音：哮鳴音較昨日減少，右下葉仍有粗囉音
痰液淡黃少量
I/O 本班：進 1000ml / 出 800ml
Lab: WBC 11000, CRP 12, Sputum C/S pending
Methylprednisolone 40mg IV Q12H 持續中

A — Action（行動）
1. 08:00 Nebulizer (Combivent) 治療
2. 08:30 Methylprednisolone 40mg IV push
3. 09:00 Levofloxacin 750mg IV drip
4. 10:00 胸腔叩擊引流（右下葉加強）
5. 14:00 Nebulizer (Combivent) 治療
6. 協助半坐臥位，鼓勵飲水

R — Response（反應）
1. Nebulizer 後 SpO2 93→94%
2. 胸腔叩擊後咳出淡黃痰約 5ml
3. 病患主訴「今天比較不喘了」
4. 可在床邊坐起進食
5. RR 較晨間 24→22

T — Teaching（教導）
1. 指導有效咳嗽技巧
2. 衛教充足水分攝取以利痰液排出
3. 說明治療進展及預計恢復時程` },

  { type: 'inter-unit-transfer', format: 'dart', patientId: 'mp2', content: `【單位間交班紀錄】DART 格式

D — Data（資料）
日期：2026-03-20 22:00
病患：林美珍，55歲/女，由急診轉入 6B-03 床
Dx: COPD with acute exacerbation
V/S: BP 136/80, HR 92, RR 24, SpO2 92% (O2 2L NC)
意識清醒，呼吸費力，使用輔助肌
ABG: pH 7.35, PaCO2 52, PaO2 62 (O2 2L)
管路：右手 PIV 22G (急診建立)
急診已給予：Nebulizer × 2, Methylprednisolone 40mg IV, Levofloxacin 750mg IV
PMH: COPD 8 年，HTN
過敏：Penicillin（皮疹）

A — Action（行動）
1. 22:00 急診護理師完成交班
2. 22:10 確認管路及藥物，核對急診用藥紀錄
3. 22:15 安置半坐臥位，床頭 45 度
4. 22:20 連接 SpO2 持續監測
5. 22:30 完成入院護理評估
6. 22:30 通知值班醫師到院評估

R — Response（反應）
1. 轉運過程 SpO2 維持 91-93%
2. 到達病房後呼吸型態改善（半坐臥）
3. 病患表示「躺著比較喘，坐起來好一點」
4. 了解過敏史 Penicillin，目前用藥無衝突

T — Teaching（教導）
1. 介紹病房環境及呼叫鈴使用
2. 說明 O2 使用注意事項，勿自行調整流量
3. 衛教呼吸困難加劇時立即通知
4. 告知家屬探視時間及陪病注意事項` },

  { type: 'discharge-nursing', format: 'dart', patientId: 'mp2', content: `【出院護理摘要】DART 格式

D — Data（資料）
日期：2026-03-27 出院日
病患：林美珍，55歲/女，6B-03 床
Dx: COPD with acute exacerbation，住院 8 天
出院 V/S: BP 128/76, HR 78, RR 18, SpO2 96% (RA)
肺音：少量散在性哮鳴音，無囉音
Lab: CRP 1.2, WBC 7200 (正常)
Sputum C/S: H. influenzae (Levofloxacin sensitive)
FEV1/FVC: 52% (較入院 45% 改善)
可獨立行走 100 公尺，SpO2 維持 93% 以上
出院帶藥：Spiriva 18mcg QD, Symbicort 160/4.5 BID, Salbutamol MDI PRN, Prednisolone 10mg QD ×5天

A — Action（行動）
1. 完成出院護理指導（藥物、吸入器、呼吸訓練）
2. 確認病患能正確操作所有吸入器
3. 提供肺復原運動衛教單
4. 拔除 PIV，評估穿刺處
5. 安排返診：04/03 胸腔內科

R — Response（反應）
1. 病患正確示範 Spiriva HandiHaler 及 Symbicort 操作
2. 能說出 Salbutamol 使用時機及上限次數
3. 理解 Prednisolone 漸減原則
4. 能演示噘嘴式呼吸及腹式呼吸

T — Teaching（教導）
1. 吸入器使用後務必漱口（預防口腔念珠菌）
2. 避免接觸二手菸、空污、粉塵
3. 每年接種流感及肺炎鏈球菌疫苗
4. Salbutamol 一天使用超過 4 次需回診
5. 緊急就醫：呼吸困難加劇、嘴唇發紫、意識改變` },

  // ── mp2 × Focus DAR ──

  { type: 'admission-nursing', format: 'focus-dar', patientId: 'mp2', content: `【入院護理評估】Focus DAR 格式

日期：2026-03-20 20:00
病患：林美珍，55歲/女，6B-03 床

Focus（焦點）：氣體交換障礙 / 呼吸道清除功能失效

D — Data（資料）
- 急診入院，COPD AE，呼吸困難加劇 2 天
- V/S: BP 138/82, HR 96, RR 26, SpO2 89% (RA)
- 使用輔助呼吸肌，唇微紫
- 肺音：雙側哮鳴音、右下葉粗囉音
- 咳嗽伴黃綠色黏稠痰
- ABG: pH 7.35, PaCO2 52, PaO2 58
- PMH: COPD 8 年，30 pack-years 抽菸史（戒菸 2 年）
- BT 37.8°C，疑似感染引發急性惡化

A — Action（行動）
1. 安置半坐臥位（床頭 45 度）
2. 給予 O2 2L/min NC（低流量原則）
3. Nebulizer (Combivent) 治療
4. Methylprednisolone 40mg IV push
5. Levofloxacin 750mg IV drip 開始
6. 抽血及痰液培養送檢
7. 完成入院評估及護理計畫

R — Response（反應）
1. O2 使用後 SpO2 89→93%
2. Nebulizer 後 RR 26→22，呼吸稍順
3. 病患可完整說出短句
4. 半坐臥位後呼吸費力感改善
5. 21:00 痰液成功留檢送出` },

  // mp2 × narrative-nursing × focus-dar already exists (line 2256)

  { type: 'shift-handoff', format: 'focus-dar', patientId: 'mp2', content: `【交班護理紀錄】Focus DAR 格式

日期：2026-03-21 大夜班交班 07:00
病患：林美珍，55歲/女，6B-03 床

Focus（焦點）：呼吸功能維持 / 感染控制

D — Data（資料）
- 入院 Day 2，COPD AE，O2 2L/min NC
- V/S 06:00: BP 130/78, HR 86, RR 22, SpO2 93%
- 夜間咳嗽間歇發作，02:00 及 04:00 各有一次痰多難咳
- 痰液黃色黏稠，量中等
- BT 37.2°C（較昨日 37.8°C 下降）
- 睡眠斷續，約共睡 4 小時
- I/O 本班：進 400ml / 出 350ml

A — Action（行動）
1. 02:00 Nebulizer (Combivent) 治療
2. 02:20 執行胸腔叩擊引流
3. 04:00 協助半坐臥位，鼓勵深呼吸
4. 06:00 Methylprednisolone 40mg IV push
5. 06:30 晨間 V/S 及 SpO2 評估

R — Response（反應）
1. 02:00 Nebulizer 後咳出黃痰約 8ml
2. 叩擊後呼吸音稍改善
3. 04:00 後可再次入睡
4. 體溫下降趨勢，感染指標待追蹤
5. 晨間精神尚可，可配合護理活動` },

  { type: 'inter-unit-transfer', format: 'focus-dar', patientId: 'mp2', content: `【單位間交班紀錄】Focus DAR 格式

日期：2026-03-20 22:00
病患：林美珍，55歲/女，急診 → 6B-03 床

Focus（焦點）：急性呼吸惡化轉入照護銜接

D — Data（資料）
- COPD AE，急診治療後轉入一般病房
- V/S: BP 136/80, HR 92, RR 24, SpO2 92% (O2 2L NC)
- 急診已給予 Nebulizer × 2, Steroid IV, 抗生素
- 管路：右手 PIV 22G
- 過敏：Penicillin（皮疹）
- 意識清醒但呼吸費力
- 家屬（女兒）陪伴

A — Action（行動）
1. 急診護理師完成交班
2. 確認管路通暢及用藥紀錄
3. 安置半坐臥位，SpO2 持續監測
4. 完成入院護理評估
5. 通知值班醫師到院評估

R — Response（反應）
1. 轉運過程 SpO2 維持 91-93%
2. 半坐臥位後呼吸型態改善
3. 病患表示比急診時舒服些
4. 家屬已了解病情及治療計畫` },

  { type: 'discharge-nursing', format: 'focus-dar', patientId: 'mp2', content: `【出院護理摘要】Focus DAR 格式

日期：2026-03-27
病患：林美珍，55歲/女，6B-03 床

Focus（焦點）：出院準備 / 呼吸功能自我管理

D — Data（資料）
- COPD AE 住院 8 天，病情穩定出院
- V/S: BP 128/76, HR 78, RR 18, SpO2 96% (RA)
- 肺音：少量哮鳴音，無囉音
- CRP 1.2, WBC 7200（感染控制）
- FEV1/FVC 52%（改善中）
- 可獨立步行 100 公尺
- 出院帶藥：Spiriva, Symbicort, Salbutamol PRN, Prednisolone 10mg × 5 天

A — Action（行動）
1. 逐項衛教吸入器正確使用
2. 指導噘嘴式呼吸及腹式呼吸
3. 提供肺復原運動衛教單
4. 預約返診 04/03 胸腔內科
5. 說明急性惡化徵兆及緊急就醫時機

R — Response（反應）
1. 正確示範 Spiriva HandiHaler 及 Symbicort 操作
2. 理解 Prednisolone 短期漸減用法
3. 能說出急性惡化需就醫的情況
4. 病患表示「這次住院學到很多呼吸運動」
5. 家屬表示會協助監督用藥` },

  // ── mp2 × SOAPIE ──

  { type: 'admission-nursing', format: 'soapie', patientId: 'mp2', content: `【入院護理評估】SOAPIE 格式

日期：2026-03-20
病患：林美珍，55歲/女，6B-03 床
護理問題：#1 氣體交換障礙 #2 呼吸道清除功能失效

S — Subjective（主觀）
「這兩天越來越喘，痰咳不出來，又黃又稠。」
「之前有在用吸入器，但最近感冒後就一直惡化。」

O — Objective（客觀）
- V/S: BP 138/82, HR 96, RR 26, SpO2 89% (RA), BT 37.8°C
- 使用輔助呼吸肌，唇微紫
- 肺音：雙側哮鳴音、右下葉粗囉音
- ABG: pH 7.35, PaCO2 52, PaO2 58
- 痰液黃綠色黏稠
- 胸部 X 光：雙側肺過度充氣，右下肺野浸潤

A — Assessment（評估）
1. COPD 急性惡化合併下呼吸道感染
2. 第二型呼吸衰竭風險（CO2 滯留）
3. 呼吸道清除功能下降
4. 營養攝取不足（因呼吸困難影響進食）

P — Plan（計畫）
1. 低流量氧氣 O2 2L/min（目標 SpO2 88-92%）
2. 支氣管擴張劑 + 類固醇 + 抗生素
3. 胸腔物理治療促進排痰
4. 監測 ABG 及呼吸型態
5. 半坐臥位維持

I — Intervention（介入）
1. 20:00 O2 2L/min NC 開始
2. 20:10 Nebulizer (Combivent) 治療
3. 20:15 Methylprednisolone 40mg IV
4. 20:30 Levofloxacin 750mg IV drip
5. 半坐臥 45 度，指導噘嘴式呼吸

E — Evaluation（評價）
- 21:00 SpO2 93%, RR 22（改善）
- 病患表示呼吸較順暢
- 可以完整句表達
- 痰液仍黃稠但量減少
- 持續監測，預計明日追蹤 ABG` },

  { type: 'narrative-nursing', format: 'soapie', patientId: 'mp2', content: `【敘述性護理紀錄】SOAPIE 格式

日期：2026-03-22
病患：林美珍，55歲/女，6B-03 床
護理問題：#1 氣體交換障礙（改善中）

S — Subjective（主觀）
「今天呼吸順多了，痰也比較容易咳出來。」
「可以自己去上廁所了，不用叫護理師幫忙。」

O — Objective（客觀）
- 入院 Day 3，O2 由 2L→1L/min NC
- V/S: BP 132/78, HR 84, RR 20, SpO2 95% (O2 1L)
- 肺音：哮鳴音明顯減少，囉音消失
- 痰液轉白色少量，易咳出
- CRP 5.8 (↓), WBC 8500 (↓)
- BT 36.8°C（正常）
- 步行 30 公尺後 SpO2 93%，休息 3 分鐘回升 95%

A — Assessment（評估）
1. 呼吸功能持續改善
2. 感染指標下降
3. 活動耐受力漸恢復
4. 可考慮降階治療

P — Plan（計畫）
1. 類固醇由 IV 轉 PO
2. 嘗試脫離 O2，觀察 SpO2 維持
3. 增加活動量
4. 吸入器技巧教育

I — Intervention（介入）
1. Prednisolone 30mg PO 開始
2. 指導 MDI + spacer 正確使用
3. 協助走廊步行 30 公尺活動評估
4. 持續 Nebulizer QID
5. 鼓勵充足水分攝取

E — Evaluation（評價）
- 步行後呼吸費力感輕微
- 正確示範 MDI + spacer 步驟
- 食慾改善，午餐進食 70%
- 情緒良好，對恢復有信心` },

  { type: 'shift-handoff', format: 'soapie', patientId: 'mp2', content: `【交班護理紀錄】SOAPIE 格式

日期：2026-03-21 小夜班交班 23:00
病患：林美珍，55歲/女，6B-03 床
護理問題：#1 呼吸道清除功能失效 #2 睡眠型態紊亂

S — Subjective（主觀）
「躺下來就開始喘，坐著比較好。」
「痰一直卡在喉嚨，咳不乾淨。」

O — Objective（客觀）
- 入院 Day 2，O2 2L/min NC
- V/S 22:00: BP 132/78, HR 90, RR 22, SpO2 93%
- 小夜班期間咳嗽頻繁，痰黃色黏稠
- 半坐臥位可緩解呼吸費力
- I/O 本班：進 600ml / 出 500ml
- 晚間 Nebulizer 後暫時改善

A — Assessment（評估）
1. 痰液排出仍困難
2. 平躺時呼吸困難加劇
3. 睡眠品質受呼吸症狀影響

P — Plan（計畫）
1. 維持半坐臥位入睡
2. 夜間 PRN Nebulizer
3. 胸腔叩擊促進排痰
4. 夜間 Q4H 評估呼吸

I — Intervention（介入）
1. 20:00 Nebulizer (Combivent)
2. 21:00 胸腔叩擊引流
3. 22:00 調整臥位（床頭 45 度）
4. 鼓勵小口飲水

E — Evaluation（評價）
- 叩擊後咳出黃痰約 5ml
- 半坐臥位後 SpO2 維持 93%
- 22:30 開始入睡但易醒
- 交班時呼吸尚平穩` },

  { type: 'inter-unit-transfer', format: 'soapie', patientId: 'mp2', content: `【單位間交班紀錄】SOAPIE 格式

日期：2026-03-20 22:00
病患：林美珍，55歲/女，急診 → 6B-03 床
護理問題：#1 氣體交換障礙 #2 呼吸道清除功能失效

S — Subjective（主觀）
「在急診噴了兩次藥有好一些，但還是很喘。」
「拜託讓我坐著，躺著真的沒辦法呼吸。」

O — Objective（客觀）
- COPD AE，急診治療後轉入
- V/S: BP 136/80, HR 92, RR 24, SpO2 92% (O2 2L NC)
- 使用輔助呼吸肌，端坐呼吸
- 急診已給予 Nebulizer × 2, Steroid IV, Levofloxacin IV
- 管路：右手 PIV 22G
- 過敏：Penicillin

A — Assessment（評估）
1. 急性呼吸惡化，需持續氧氣支持
2. 感染引發之 COPD 惡化
3. CO2 滯留風險
4. 端坐呼吸影響休息

P — Plan（計畫）
1. 半坐臥位，O2 2L/min 持續
2. 按時 Nebulizer + Steroid + 抗生素
3. SpO2 持續監測
4. 明日追蹤 ABG

I — Intervention（介入）
1. 急診護理師完成交班
2. 安置半坐臥位 45 度
3. 連接 SpO2 持續監測
4. 確認用藥及過敏史
5. 完成入院評估

E — Evaluation（評價）
- 半坐臥後 RR 24→22
- SpO2 維持 92-93%
- 病患表示比急診舒服些
- 病房環境介紹完成` },

  { type: 'discharge-nursing', format: 'soapie', patientId: 'mp2', content: `【出院護理摘要】SOAPIE 格式

日期：2026-03-27
病患：林美珍，55歲/女，6B-03 床
護理問題：#1 知識缺失（COPD 自我管理）

S — Subjective（主觀）
「現在呼吸好多了，走路也不太會喘。」
「吸入器我有學會怎麼用了，回家會按時噴。」

O — Objective（客觀）
- COPD AE 住院 8 天，病情穩定出院
- V/S: BP 128/76, HR 78, RR 18, SpO2 96% (RA)
- FEV1/FVC 52%（改善）
- CRP 1.2, WBC 7200
- 可獨立步行 100 公尺
- 正確示範所有吸入器操作

A — Assessment（評估）
1. 呼吸功能恢復至基準值
2. 感染已控制
3. 吸入器使用技巧掌握良好
4. 需長期呼吸復健

P — Plan（計畫）
1. 門診追蹤 04/03 胸腔內科
2. Prednisolone 漸減 5 天
3. 長期維持 Spiriva + Symbicort
4. 年度疫苗接種

I — Intervention（介入）
1. 逐項衛教出院帶藥
2. 確認吸入器操作正確
3. 提供肺復原運動衛教單
4. 說明急性惡化警示徵兆
5. 安排返診及轉介肺復原

E — Evaluation（評價）
- 病患複述用藥正確
- 能說出需緊急就醫的 3 種情況
- 示範噘嘴式呼吸正確
- 家屬（女兒）了解照護重點
- 出院準備完善` },

  // ── mp2 × Narrative ──

  { type: 'admission-nursing', format: 'narrative', patientId: 'mp2', content: `【入院護理評估】Narrative 敘述式

日期：2026-03-20 20:00
病患：林美珍，55歲/女，6B-03 床
Dx: COPD with acute exacerbation

病患因呼吸困難加劇 2 天、咳嗽伴黃綠色黏稠痰，由急診入院。過去病史為 COPD 8 年，有 30 pack-years 抽菸史，已戒菸 2 年，平時使用 Spiriva 及 Symbicort 維持治療。此次疑似上呼吸道感染誘發急性惡化。

入院時意識清醒但呼吸費力，使用輔助呼吸肌，唇色微紫。生命徵象：血壓 138/82、心跳 96、呼吸 26 次/分、血氧 89%（Room Air）、體溫 37.8°C。肺部聽診雙側散在性哮鳴音、右下葉粗囉音。動脈血液氣體分析：pH 7.35、PaCO2 52、PaO2 58，呈現第二型呼吸衰竭傾向。藥物過敏：Penicillin（皮疹）。

護理處置：立即安置半坐臥位（床頭抬高 45 度），給予氧氣 2L/min 鼻導管（遵循 COPD 低流量原則），執行 Nebulizer Combivent 治療，靜脈注射 Methylprednisolone 40mg 及 Levofloxacin 750mg。抽血送檢 CBC、CRP 及痰液培養。

治療 1 小時後血氧上升至 93%，呼吸次數降至 22，病患表示呼吸稍順。衛教噘嘴式呼吸技巧，指導呼吸困難加劇時立即通知護理師。` },

  { type: 'narrative-nursing', format: 'narrative', patientId: 'mp2', content: `【敘述性護理紀錄】Narrative 敘述式

日期：2026-03-22 10:00
病患：林美珍，55歲/女，6B-03 床
Dx: COPD with acute exacerbation

入院第 3 天，病患呼吸狀況持續改善中。今日氧氣已由 2L 降至 1L/min 鼻導管，生命徵象穩定：血壓 132/78、心跳 84、呼吸 20 次/分、血氧 95%。肺部聽診哮鳴音明顯減少，右下葉囉音已消失。痰液轉為白色少量，病患可自行咳出。

檢驗數據改善中：CRP 由 12 降至 5.8、WBC 由 11000 降至 8500，體溫恢復正常 36.8°C。類固醇由靜脈注射轉為口服 Prednisolone 30mg，抗生素 Levofloxacin 750mg IV 持續使用。

今日指導病患正確使用 MDI + spacer 吸入器，教導操作步驟：先吐氣→按壓藥罐→慢慢深吸→閉氣 10 秒。病患經 3 次練習後能正確示範。協助走廊步行 30 公尺做活動評估，步行後血氧維持 93%，休息 3 分鐘回升至 95%，無明顯呼吸費力。

病患主訴「今天好很多，可以自己走去廁所了」，食慾改善，午餐進食約 70%。持續衛教噘嘴式呼吸及腹式呼吸，強調吸入器使用後漱口之重要性。` },

  { type: 'shift-handoff', format: 'narrative', patientId: 'mp2', content: `【交班護理紀錄】Narrative 敘述式

日期：2026-03-21 白班交班 15:00
病患：林美珍，55歲/女，6B-03 床
Dx: COPD with acute exacerbation

入院第 2 天白班紀錄。病患持續使用 O2 2L/min 鼻導管，生命徵象 14:00 測量：血壓 134/80、心跳 88、呼吸 22 次/分、血氧 93%。肺音較昨日改善，哮鳴音減少但右下葉仍有粗囉音，痰液淡黃少量。

本班藥物給予包含：Nebulizer Combivent 08:00 及 14:00 各一次、Methylprednisolone 40mg IV 08:30、Levofloxacin 750mg IV drip 09:00。10:00 執行胸腔叩擊引流以右下葉加強，叩擊後病患咳出淡黃痰約 5ml。病患主訴「今天比較不喘了」，可在床邊坐起進食。

出入量本班：進 1000ml、出 800ml。檢驗報告 WBC 11000、CRP 12，痰液培養 pending。體溫 37.2°C 較昨日 37.8°C 下降。衛教有效咳嗽技巧及充足水分攝取之重要性。整體呼吸狀況較昨日改善中。` },

  { type: 'inter-unit-transfer', format: 'narrative', patientId: 'mp2', content: `【單位間交班紀錄】Narrative 敘述式

日期：2026-03-20 22:00
病患：林美珍，55歲/女，急診 → 6B-03 床
Dx: COPD with acute exacerbation

病患因 COPD 急性惡化於急診治療後轉入 6B 一般病房。急診期間已給予 Nebulizer Combivent 兩次、Methylprednisolone 40mg IV 及 Levofloxacin 750mg IV。

轉入時生命徵象：血壓 136/80、心跳 92、呼吸 24 次/分、血氧 92%（O2 2L/min NC）。意識清醒，仍有呼吸費力情形，使用輔助呼吸肌，偏好端坐呼吸。管路：右手 PIV 22G（急診建立）通暢。藥物過敏：Penicillin（皮疹），目前用藥未含 Penicillin 類抗生素。

急診護理師完成交班，確認管路及用藥紀錄無誤。安置半坐臥位（床頭 45 度），連接 SpO2 持續監測，完成入院護理評估及護理計畫建立。通知值班醫師到院評估。

病患表示「坐起來比較能呼吸」，半坐臥位後呼吸次數由 24 降至 22。家屬（女兒）陪伴中，已介紹病房環境及探視規範，說明氧氣使用注意事項及呼吸困難加劇時之處理方式。` },

  { type: 'discharge-nursing', format: 'narrative', patientId: 'mp2', content: `【出院護理摘要】Narrative 敘述式

日期：2026-03-27
病患：林美珍，55歲/女，6B-03 床
Dx: COPD with acute exacerbation

病患因 COPD 急性惡化住院 8 天，經支氣管擴張劑、類固醇及抗生素治療後病情穩定出院。出院時生命徵象：血壓 128/76、心跳 78、呼吸 18 次/分、血氧 96%（Room Air），肺音僅少量散在性哮鳴音，無囉音。檢驗 CRP 1.2、WBC 7200，感染已控制。痰液培養結果為 H. influenzae（對 Levofloxacin 敏感）。肺功能 FEV1/FVC 52%，較入院時 45% 改善。

出院帶藥包含：Spiriva 18mcg QD、Symbicort 160/4.5 BID、Salbutamol MDI PRN、Prednisolone 10mg QD 短期漸減 5 天。已逐項衛教各藥物用法，病患能正確示範 Spiriva HandiHaler 及 Symbicort 吸入器操作，了解使用後需漱口預防口腔念珠菌。

出院衛教重點：噘嘴式呼吸及腹式呼吸技巧、避免接觸二手菸及空污、每年接種流感及肺炎鏈球菌疫苗、Salbutamol 每日使用超過 4 次需回診。急性惡化警示：呼吸困難加劇、嘴唇發紫、意識改變需立即就醫。已安排 04/03 胸腔內科（張惠雯醫師）回診，並轉介肺復原計畫。` },

  // ══════════════════════════════════════════════════════════════
  // mp3 — 張志豪, 42歲/男, 3C-08床, Dx: T2DM with DKA
  // ══════════════════════════════════════════════════════════════

  // ── mp3 × DART ──

  { type: 'admission-nursing', format: 'dart', patientId: 'mp3', content: `【入院護理評估】DART 格式

D — Data（資料）
日期：2026-03-22
病患：張志豪，42歲/男，3C-08 床，Dx: T2DM with DKA
急診入院，嘔吐一天、腹痛、全身無力
自述停用胰島素及口服降血糖藥約 2 週（經濟因素）
V/S: BP 108/68, HR 110, RR 28 (Kussmaul), BT 36.8°C
血糖 580 mg/dL, pH 7.18, K+ 5.8, ketone (+++)
皮膚帳篷現象(+)，口腔黏膜乾燥
體重 72kg（平時 75kg，近期體重下降 3kg）
意識清醒但倦怠

A — Action（行動）
1. 09:00 NS 1000ml/hr IV infusion 開始積極補液
2. 09:00 Insulin drip 0.1U/kg/hr 啟動
3. 09:00 Foley 16Fr 置入，hourly UO 記錄
4. 09:30 抽血 CBC, BMP, ABG, ketone
5. 10:00 床欄上升、呼叫鈴置手邊、黃色手圈（跌倒高風險）
6. 血糖 Q1H + K+ Q2H 監測
7. 嚴密 I/O 記錄

R — Response（反應）
1. 12:00 血糖 580→380 mg/dL（4 小時下降 200）
2. UO 150ml/2hr（>0.5ml/kg/hr ✓）
3. pH 7.18→7.22（改善中）
4. K+ 5.8→4.8（需持續監測）
5. 病患表示腹痛稍緩 NRS 5→3

T — Teaching（教導）
1. 說明 DKA 原因及嚴重性
2. 強調胰島素及降血糖藥不可自行停用
3. 衛教低血糖症狀及處理方式
4. 告知社工轉介評估經濟補助` },

  { type: 'narrative-nursing', format: 'dart', patientId: 'mp3', content: `【敘述性護理紀錄】DART 格式

D — Data（資料）
日期：2026-03-24 10:00
病患：張志豪，42歲/男，3C-08 床，Dx: T2DM with DKA
入院 Day 3，DKA 已矯正
V/S: BP 118/72, HR 82, RR 18, SpO2 99% (RA)
血糖 186 mg/dL (AC breakfast)
Lab (03/23): pH 7.38, K+ 4.2, HCO3- 22, ketone (-)
Insulin drip 已於昨日 18:00 轉為 SC insulin
目前用藥：Lantus 18U HS + NovoRapid sliding scale AC
飲食：DM 1800 kcal 飲食，三餐進食 90%
精神改善，可自行下床如廁

A — Action（行動）
1. 10:00 指導血糖自我監測（SMBG）技巧
2. 10:30 示範胰島素注射技術（筆型注射器）
3. 11:00 衛教碳水化合物計算及飲食規劃
4. 11:30 社工訪視，評估經濟補助方案
5. 血糖 AC + HS 監測持續

R — Response（反應）
1. 病患能正確操作血糖機並判讀數值
2. 可示範胰島素注射步驟（部位選擇、消毒、注射角度）
3. 了解飲食中醣類份量概念
4. 社工已確認符合慢性病補助資格
5. 病患表示「這次住院才知道停藥這麼嚴重」

T — Teaching（教導）
1. 胰島素保存：未開封冷藏、開封後室溫 28 天
2. 注射部位輪替原則
3. 低血糖處理：隨身攜帶糖果，血糖 < 70 立即補充 15g 醣類
4. 生病日管理：發燒或嘔吐仍需使用胰島素，勿自行停藥` },

  { type: 'shift-handoff', format: 'dart', patientId: 'mp3', content: `【交班護理紀錄】DART 格式

D — Data（資料）
日期：2026-03-22 小夜班交班 23:00
病患：張志豪，42歲/男，3C-08 床，Dx: T2DM with DKA
入院 Day 1，Insulin drip 持續中
V/S 22:00: BP 112/70, HR 92, RR 22, SpO2 99% (RA)
血糖 Q1H: 16:00 320→18:00 280→20:00 245→22:00 210
pH 7.26 (16:00), K+ 4.5 (16:00)
I/O 本班：進 2500ml (NS 2000 + PO 500) / 出 1800ml (Foley)
腹痛 NRS 2/10（較白班 NRS 3 改善）
Kussmaul 呼吸已減輕

A — Action（行動）
1. Insulin drip 0.1U/kg/hr 持續
2. 16:00 NS 轉為 500ml/hr
3. 18:00 K+ 4.5，加入 KCl 20mEq/L IV
4. 20:00 血糖 245，Insulin drip 調整為 0.05U/kg/hr
5. 22:00 執行 V/S 評估

R — Response（反應）
1. 血糖穩定下降中（目標 150-200 range 轉 SC insulin）
2. 腹痛持續緩解
3. 精神較白班改善，可進食少量
4. 尿量充足（>0.5ml/kg/hr）
5. 呼吸型態漸改善，Kussmaul 減輕

T — Teaching（教導）
1. 說明血糖監測及胰島素治療目的
2. 鼓勵少量多餐嘗試進食
3. 提醒如有噁心嘔吐加劇立即告知` },

  { type: 'inter-unit-transfer', format: 'dart', patientId: 'mp3', content: `【單位間交班紀錄】DART 格式

D — Data（資料）
日期：2026-03-22 09:00
病患：張志豪，42歲/男，由急診轉入 3C-08 床
Dx: T2DM with DKA
V/S: BP 108/68, HR 110, RR 28 (Kussmaul), BT 36.8°C
血糖 580, pH 7.18, K+ 5.8, ketone (+++)
意識：清醒但倦怠
管路：右手 PIV 18G (急診建立)
急診已開始 NS 1L/hr
過去病史：T2DM 10 年，未規則用藥
過敏：NKDA
急診 ABG: pH 7.18, PaCO2 22, PaO2 95, HCO3- 8

A — Action（行動）
1. 急診護理師完成交班
2. 確認 IV route 通暢，維持 NS 1L/hr
3. 啟動 Insulin drip protocol
4. Foley 16Fr 置入
5. 跌倒預防措施（Morse 50 分）
6. 通知主治醫師陳淑芬

R — Response（反應）
1. 轉運過程穩定
2. Insulin drip 順利啟動
3. 病患配合各項處置
4. 家屬（父親）陪伴中，已說明病情

T — Teaching（教導）
1. 說明目前治療目標及監測頻率
2. 衛教不可自行調整點滴速度
3. 告知如有噁心嘔吐加劇需通知
4. 介紹病房環境及呼叫鈴位置` },

  { type: 'discharge-nursing', format: 'dart', patientId: 'mp3', content: `【出院護理摘要】DART 格式

D — Data（資料）
日期：2026-03-29 出院日
病患：張志豪，42歲/男，3C-08 床
Dx: T2DM with DKA，住院 8 天
出院 V/S: BP 120/74, HR 78, RR 16, SpO2 99%
血糖 AC 142 mg/dL, pH 7.40, K+ 4.3, ketone (-)
HbA1c 12.5%（需長期改善）
體重 73kg（補液後恢復）
出院帶藥：Lantus 20U HS, NovoRapid 8-8-8U AC, Metformin 500mg BID
社工已安排慢性病藥費補助

A — Action（行動）
1. 完成出院衛教：胰島素注射、SMBG、飲食、低血糖處理
2. 確認病患正確操作血糖機及胰島素筆
3. 提供 DM 衛教手冊及飲食指南
4. 拔除 PIV 及 Foley
5. 安排返診：04/05 新陳代謝科（陳淑芬醫師）

R — Response（反應）
1. 病患正確示範胰島素注射全步驟
2. 能說出低血糖症狀及處理方式
3. 了解飲食醣類份量及分配原則
4. 病患表示「這次真的學到教訓了，不會再停藥」
5. 社工確認補助資格及申請流程

T — Teaching（教導）
1. 胰島素保存及注射注意事項
2. 每日血糖監測 AC breakfast + HS
3. 低血糖：血糖 < 70 立即補充 15g 醣類
4. 生病日不可自行停用胰島素
5. 足部照護：每日檢視，避免赤腳
6. 返診 04/05 需空腹抽血` },

  // ── mp3 × Focus DAR ──

  { type: 'admission-nursing', format: 'focus-dar', patientId: 'mp3', content: `【入院護理評估】Focus DAR 格式

日期：2026-03-22 09:00
病患：張志豪，42歲/男，3C-08 床

Focus（焦點）：體液容積缺失 / 代謝性酸中毒

D — Data（資料）
- 急診入院，T2DM with DKA
- 嘔吐一天、腹痛 NRS 5/10、全身無力
- 停用胰島素及口服藥約 2 週（經濟因素）
- V/S: BP 108/68, HR 110, RR 28 (Kussmaul), BT 36.8°C
- 血糖 580, pH 7.18, K+ 5.8, ketone (+++)
- 皮膚帳篷現象(+)，口腔黏膜乾燥
- 體重 72kg（平時 75kg）
- 尿量入院前 6 小時約 200ml

A — Action（行動）
1. NS 1000ml/hr IV infusion 積極補液
2. Insulin drip 0.1U/kg/hr 啟動
3. Foley 16Fr 置入，hourly UO 記錄
4. 血糖 Q1H + K+ Q2H + ABG Q4H 監測
5. 床欄上升，跌倒預防（Morse 50）
6. 轉介社工經濟補助評估

R — Response（反應）
1. 4 小時後血糖 580→380 mg/dL
2. UO 150ml/2hr（腎灌流改善）
3. pH 7.18→7.22
4. K+ 5.8→4.8
5. 腹痛 NRS 5→3
6. Kussmaul 呼吸略減輕` },

  { type: 'narrative-nursing', format: 'focus-dar', patientId: 'mp3', content: `【敘述性護理紀錄】Focus DAR 格式

日期：2026-03-24 10:00
病患：張志豪，42歲/男，3C-08 床

Focus（焦點）：知識缺失 / 糖尿病自我管理

D — Data（資料）
- 入院 Day 3，DKA 已矯正
- 血糖 AC 186 mg/dL，pH 7.38，ketone (-)
- Insulin drip 已轉為 SC: Lantus 18U HS + sliding scale
- 精神改善，可自行下床活動
- 病患對胰島素注射及血糖監測無經驗
- 自述「以前都是吃藥控制，沒打過針」

A — Action（行動）
1. 指導 SMBG 血糖自我監測操作
2. 示範胰島素筆型注射器使用
3. 衛教注射部位選擇及輪替
4. 說明碳水化合物計算及飲食規劃
5. 社工訪視評估經濟補助

R — Response（反應）
1. 經指導後能獨立操作血糖機
2. 胰島素注射示範 3 次後可正確執行
3. 了解腹部、大腿注射部位輪替原則
4. 社工確認符合慢性病補助資格
5. 病患表示「打針沒有想像中可怕」` },

  { type: 'shift-handoff', format: 'focus-dar', patientId: 'mp3', content: `【交班護理紀錄】Focus DAR 格式

日期：2026-03-23 白班交班 15:00
病患：張志豪，42歲/男，3C-08 床

Focus（焦點）：血糖控制 / DKA 矯正進度

D — Data（資料）
- 入院 Day 2，Insulin drip 持續中
- V/S 14:00: BP 116/72, HR 86, RR 18, SpO2 99%
- 血糖本班：08:00 230→10:00 200→12:00 185→14:00 178
- ABG 10:00: pH 7.35, K+ 4.3, HCO3- 20, ketone (trace)
- I/O 本班：進 2000ml / 出 1600ml (Foley)
- 腹痛緩解 NRS 1/10
- 已開始少量進食，DM 1800kcal 飲食

A — Action（行動）
1. Insulin drip 0.05U/kg/hr 持續
2. IV fluid NS 250ml/hr
3. 10:00 追蹤 ABG + BMP
4. 12:00 嘗試少量飲食
5. 14:00 血糖 178，準備轉 SC insulin

R — Response（反應）
1. DKA 趨近矯正（pH 7.35, ketone trace）
2. 血糖穩定下降至目標範圍
3. 可耐受口服進食無嘔吐
4. 精神明顯改善，活力增加
5. 預計 18:00 轉為 SC insulin` },

  { type: 'inter-unit-transfer', format: 'focus-dar', patientId: 'mp3', content: `【單位間交班紀錄】Focus DAR 格式

日期：2026-03-22 09:00
病患：張志豪，42歲/男，急診 → 3C-08 床

Focus（焦點）：DKA 急性處置之照護銜接

D — Data（資料）
- T2DM with DKA，急診轉入
- V/S: BP 108/68, HR 110, RR 28, BT 36.8°C
- 血糖 580, pH 7.18, K+ 5.8
- 嚴重脫水，皮膚帳篷現象(+)
- 急診已開始 NS 1L/hr
- 管路：右手 PIV 18G
- 過敏：NKDA

A — Action（行動）
1. 急診護理師完成交班
2. 確認 IV 通暢，維持補液
3. 啟動 Insulin drip protocol
4. Foley 置入，開始 hourly UO
5. 跌倒預防措施執行
6. 通知主治陳淑芬醫師

R — Response（反應）
1. 轉運過程穩定
2. Insulin drip 順利啟動
3. 病患雖虛弱但配合處置
4. 已向家屬說明 DKA 嚴重性及治療計畫` },

  { type: 'discharge-nursing', format: 'focus-dar', patientId: 'mp3', content: `【出院護理摘要】Focus DAR 格式

日期：2026-03-29
病患：張志豪，42歲/男，3C-08 床

Focus（焦點）：出院準備 / 糖尿病自我管理能力

D — Data（資料）
- T2DM with DKA 住院 8 天，DKA 完全矯正
- V/S: BP 120/74, HR 78, RR 16
- 血糖 AC 142, pH 7.40, ketone (-)
- HbA1c 12.5%（基準值，需長期追蹤）
- 可正確操作血糖機及胰島素筆
- 社工已安排慢性病藥費補助
- 出院帶藥：Lantus 20U HS, NovoRapid 8-8-8U AC, Metformin 500mg BID

A — Action（行動）
1. 完成出院衛教全套（注射、SMBG、飲食、低血糖）
2. 提供 DM 衛教手冊
3. 預約 04/05 新陳代謝科返診
4. 社工確認補助申請文件
5. 拔除 PIV 及 Foley

R — Response（反應）
1. 正確示範胰島素注射及血糖監測
2. 能說出低血糖症狀及 15-15 法則
3. 了解飲食醣類分配
4. 病患表示「不會再停藥了，而且有補助就不用擔心藥費」
5. 家屬（父親）了解協助監督重點` },

  // ── mp3 × SOAPIE ──

  // mp3 × admission-nursing × soapie already exists (line 2285)

  { type: 'narrative-nursing', format: 'soapie', patientId: 'mp3', content: `【敘述性護理紀錄】SOAPIE 格式

日期：2026-03-24
病患：張志豪，42歲/男，3C-08 床
護理問題：#1 知識缺失（糖尿病自我管理）

S — Subjective（主觀）
「以前都吃藥控制，第一次要打針，有點緊張。」
「如果有補助的話我就比較不會停藥了。」

O — Objective（客觀）
- 入院 Day 3，DKA 已矯正
- 血糖 AC 186 mg/dL, pH 7.38, ketone (-)
- 已轉 SC insulin: Lantus 18U HS + sliding scale
- 未曾自行注射胰島素經驗
- 精神良好，學習意願高

A — Assessment（評估）
1. 胰島素注射技巧需教育
2. 血糖自我監測技巧需建立
3. 飲食知識不足
4. 經濟因素影響用藥遵從性（社工介入中）

P — Plan（計畫）
1. SMBG 教育及回覆示教
2. 胰島素注射技術訓練
3. DM 飲食衛教
4. 社工協助經濟補助申請

I — Intervention（介入）
1. 10:00 SMBG 操作教學（含採血技巧）
2. 10:30 胰島素筆注射示範及練習
3. 11:00 飲食衛教：醣類份量及食物代換
4. 11:30 社工訪視經濟評估
5. 提供 DM 衛教手冊

E — Evaluation（評價）
- 可獨立操作血糖機並正確判讀
- 胰島素注射經 3 次練習後可正確執行
- 理解注射部位輪替原則
- 社工確認補助資格
- 病患表示「打針沒想像中那麼痛」` },

  { type: 'shift-handoff', format: 'soapie', patientId: 'mp3', content: `【交班護理紀錄】SOAPIE 格式

日期：2026-03-22 白班交班 15:00
病患：張志豪，42歲/男，3C-08 床
護理問題：#1 體液容積缺失 #2 代謝性酸中毒

S — Subjective（主觀）
「肚子比早上好很多了，沒那麼痛。」
「還是覺得很累，想睡覺。」

O — Objective（客觀）
- 入院 Day 1，Insulin drip 0.1U/kg/hr 持續中
- V/S 14:00: BP 114/70, HR 96, RR 24, SpO2 99%
- 血糖本班：09:00 580→11:00 420→13:00 350→15:00 310
- ABG 14:00: pH 7.24, K+ 5.0, HCO3- 14
- I/O 本班：進 3500ml / 出 2200ml (Foley)
- 腹痛 NRS 5→3
- Kussmaul 呼吸略改善

A — Assessment（評估）
1. 血糖穩定下降中
2. 代謝性酸中毒漸改善
3. 補液效果良好，尿量充足
4. 仍有倦怠感（脫水改善中）

P — Plan（計畫）
1. 繼續 Insulin drip
2. IV fluid 調整為 500ml/hr
3. 血糖 Q1H + K+ Q2H 持續
4. 目標血糖 < 300 後調整 Insulin drip rate

I — Intervention（介入）
1. NS 由 1L/hr→500ml/hr (11:00 起)
2. K+ 5.0→加入 KCl 20mEq/L
3. 血糖 Q1H 監測及紀錄
4. ABG Q4H 追蹤
5. 15:00 交班時 V/S 完整評估

E — Evaluation（評價）
- 血糖 6 小時下降 270 mg/dL（速率適當）
- 尿量 >0.5ml/kg/hr
- pH 7.18→7.24（持續改善）
- 腹痛減輕，Kussmaul 呼吸改善` },

  { type: 'inter-unit-transfer', format: 'soapie', patientId: 'mp3', content: `【單位間交班紀錄】SOAPIE 格式

日期：2026-03-22 09:00
病患：張志豪，42歲/男，急診 → 3C-08 床
護理問題：#1 體液容積缺失 #2 代謝性酸中毒

S — Subjective（主觀）
「吐了一整天，肚子很痛。」
「藥停了大概兩個禮拜，因為沒錢買。」

O — Objective（客觀）
- T2DM with DKA，急診轉入
- V/S: BP 108/68, HR 110, RR 28, BT 36.8°C
- 血糖 580, pH 7.18, K+ 5.8, ketone (+++)
- 嚴重脫水：帳篷現象(+)、口腔乾燥
- 急診已開始 NS 1L/hr
- 管路：PIV 18G (右手)
- NKDA

A — Assessment（評估）
1. DKA 需積極治療
2. 嚴重脫水需大量補液
3. 高血鉀需監測（insulin 開始後會下降）
4. 跌倒高風險（虛弱 + 脫水）

P — Plan（計畫）
1. Insulin drip + 積極補液
2. 密集實驗室監測
3. 嚴密 I/O
4. 跌倒預防

I — Intervention（介入）
1. 急診交班完成
2. 維持 NS 1L/hr，啟動 Insulin drip
3. Foley 置入
4. 跌倒預防措施
5. 通知主治醫師

E — Evaluation（評價）
- 轉入過程穩定
- Insulin drip 啟動順利
- Foley 引流順暢
- 跌倒預防到位` },

  { type: 'discharge-nursing', format: 'soapie', patientId: 'mp3', content: `【出院護理摘要】SOAPIE 格式

日期：2026-03-29
病患：張志豪，42歲/男，3C-08 床
護理問題：#1 知識缺失（糖尿病自我照護）#2 治療遵從性障礙

S — Subjective（主觀）
「這次住院學到很多，不會再停藥了。」
「社工說有補助可以申請，這樣藥費就不用擔心了。」

O — Objective（客觀）
- DKA 住院 8 天，完全矯正
- V/S: BP 120/74, HR 78, RR 16
- 血糖 AC 142, pH 7.40, ketone (-)
- HbA1c 12.5%
- 可正確操作 SMBG 及胰島素注射
- 出院帶藥：Lantus 20U HS, NovoRapid 8U AC TID, Metformin 500mg BID
- 社工確認慢性病補助資格

A — Assessment（評估）
1. DKA 已完全矯正
2. 自我管理技巧已建立
3. 經濟障礙已有解決方案
4. 仍需長期追蹤 HbA1c 改善

P — Plan（計畫）
1. 返診 04/05 新陳代謝科
2. 每日 SMBG AC breakfast + HS
3. 慢性病補助持續追蹤
4. 長期 HbA1c 目標 < 7%

I — Intervention（介入）
1. 完成出院衛教全套
2. 提供 DM 衛教手冊
3. 預約返診
4. 確認補助申請文件
5. 拔除 PIV 及 Foley

E — Evaluation（評價）
- 正確示範注射及 SMBG
- 說出低血糖症狀及處理
- 了解生病日管理原則
- 補助申請文件備齊
- 病患及家屬有信心執行照護計畫` },

  // ── mp3 × Narrative ──

  { type: 'admission-nursing', format: 'narrative', patientId: 'mp3', content: `【入院護理評估】Narrative 敘述式

日期：2026-03-22 09:00
病患：張志豪，42歲/男，3C-08 床
Dx: T2DM with DKA

病患因嘔吐一天、腹痛及全身無力由急診入院。自述罹患第二型糖尿病約 10 年，因經濟因素自行停用胰島素及口服降血糖藥約 2 週。入院時意識清醒但明顯倦怠，腹痛 NRS 5/10。

生命徵象：血壓 108/68（低於正常）、心跳 110 次/分（代償性心搏過速）、呼吸 28 次/分呈 Kussmaul 呼吸（代謝性酸中毒代償）、體溫 36.8°C。血糖 580 mg/dL，動脈血液氣體 pH 7.18、K+ 5.8、酮體強陽性（+++），確診糖尿病酮酸中毒。理學檢查皮膚帳篷現象陽性、口腔黏膜乾燥，顯示嚴重脫水。體重 72kg，較平時 75kg 減少 3kg。

護理處置：立即開始生理食鹽水 1000ml/hr 積極補液、啟動 Insulin drip 0.1U/kg/hr、置入 Foley 16Fr 記錄每小時尿量。監測計畫包括血糖每小時、鉀離子每 2 小時、ABG 每 4 小時。執行跌倒預防措施（Morse 50 分高風險）：床欄上升、呼叫鈴置手邊、配戴黃色手圈。轉介社工評估經濟補助。

4 小時後血糖降至 380 mg/dL（下降速率適當）、尿量 150ml/2hr 顯示腎臟灌流改善、pH 上升至 7.22、K+ 降至 4.8。腹痛由 NRS 5 降至 3。病患開始理解停藥的嚴重後果。` },

  { type: 'narrative-nursing', format: 'narrative', patientId: 'mp3', content: `【敘述性護理紀錄】Narrative 敘述式

日期：2026-03-24 10:00
病患：張志豪，42歲/男，3C-08 床
Dx: T2DM with DKA

入院第 3 天，DKA 已成功矯正。今日血糖飯前 186 mg/dL，酸鹼值 pH 7.38，酮體陰性。Insulin drip 已於昨日 18:00 順利轉換為皮下注射：Lantus 18U 睡前 + NovoRapid sliding scale 飯前。生命徵象穩定：血壓 118/72、心跳 82、呼吸 18、血氧 99%。病患精神明顯改善，可自行下床如廁及走動。

今日主要護理重點為糖尿病自我管理衛教。10:00 指導血糖自我監測（SMBG），教導採血技巧及血糖機操作，病患經練習後能獨立操作並正確判讀數值。10:30 示範胰島素筆型注射器使用，包含劑量設定、部位選擇（腹部及大腿前側）、消毒及注射角度，經 3 次練習後可正確執行，病患表示「打針沒有想像中可怕」。11:00 衛教碳水化合物計算及飲食規劃，介紹醣類份量概念及食物代換。

11:30 社工訪視評估，確認病患符合慢性病藥費補助資格，將協助申請相關文件。病患對此感到安心，表示「有補助就不用擔心藥費了，這次住院才知道停藥這麼嚴重」。持續衛教胰島素保存方式及低血糖處理原則。` },

  { type: 'shift-handoff', format: 'narrative', patientId: 'mp3', content: `【交班護理紀錄】Narrative 敘述式

日期：2026-03-22 小夜班交班 23:00
病患：張志豪，42歲/男，3C-08 床
Dx: T2DM with DKA

入院第 1 天小夜班紀錄。Insulin drip 0.1U/kg/hr 持續中，本班血糖每小時監測呈穩定下降趨勢：16:00 血糖 320、18:00 降至 280、20:00 降至 245、22:00 降至 210 mg/dL。16:00 追蹤 ABG：pH 7.26、K+ 4.5（較入院時 5.8 下降，已開始補充 KCl 20mEq/L IV）。

20:00 血糖降至 245，將 Insulin drip 調整為 0.05U/kg/hr。IV fluid 於 16:00 由 1L/hr 調整為 500ml/hr。生命徵象 22:00：血壓 112/70、心跳 92（較入院 110 改善）、呼吸 22 次/分，Kussmaul 呼吸已減輕。

出入量本班：進 2500ml（IV 2000 + PO 500）、出 1800ml（Foley），尿量充足。腹痛由 NRS 3 降至 2。病患表示仍感倦怠想休息，已開始嘗試少量進食流質飲食無嘔吐。持續衛教不可自行調整點滴速度，如有噁心嘔吐加劇需立即告知。` },

  { type: 'inter-unit-transfer', format: 'narrative', patientId: 'mp3', content: `【單位間交班紀錄】Narrative 敘述式

日期：2026-03-22 09:00
病患：張志豪，42歲/男，急診 → 3C-08 床
Dx: T2DM with DKA

病患因糖尿病酮酸中毒由急診轉入 3C 一般病房。急診已開始生理食鹽水 1L/hr 補液。

轉入時生命徵象：血壓 108/68、心跳 110、呼吸 28 次/分呈 Kussmaul 型態、體溫 36.8°C。血糖 580 mg/dL，ABG：pH 7.18、PaCO2 22、PaO2 95、HCO3- 8，K+ 5.8，酮體強陽性。意識清醒但明顯虛弱倦怠，皮膚帳篷現象陽性。管路：右手 PIV 18G（急診建立）通暢。過去病史：T2DM 10 年，未規則用藥。無藥物過敏。

急診護理師完成交班，確認管路及用藥紀錄。維持 NS 1L/hr 補液，立即啟動 Insulin drip 0.1U/kg/hr。置入 Foley 16Fr 開始記錄每小時尿量。執行跌倒預防措施：Morse 評分 50 分高風險，床欄上升、呼叫鈴置手邊、配戴黃色手圈。已通知主治醫師陳淑芬轉入完成。

家屬（父親）陪伴中，已說明 DKA 的嚴重性、目前治療計畫及密集監測必要性。病患虛弱但配合各項處置。` },

  { type: 'discharge-nursing', format: 'narrative', patientId: 'mp3', content: `【出院護理摘要】Narrative 敘述式

日期：2026-03-29
病患：張志豪，42歲/男，3C-08 床
Dx: T2DM with DKA

病患因糖尿病酮酸中毒住院 8 天，經積極補液、胰島素治療及電解質矯正後，DKA 已完全恢復。出院時生命徵象穩定：血壓 120/74、心跳 78、呼吸 16、血氧 99%。血糖飯前 142 mg/dL，pH 7.40，酮體陰性，K+ 4.3。HbA1c 12.5% 作為基準值，需長期追蹤改善。體重恢復至 73kg。

出院帶藥：Lantus 20U 睡前、NovoRapid 8U 三餐飯前、Metformin 500mg 每日兩次。住院期間完成完整糖尿病自我管理衛教，病患能正確操作血糖機進行自我監測、正確示範胰島素筆注射全步驟（包含劑量設定、部位選擇輪替、消毒及注射角度），並了解低血糖症狀辨識及 15-15 法則處理方式。

社工已確認病患符合慢性病藥費補助資格，相關申請文件已備齊。病患表示「這次住院真的學到教訓，不會再因為沒錢就自己停藥」。飲食方面已衛教醣類份量計算及食物代換原則，提供 DM 衛教手冊。

出院衛教重點：每日血糖監測飯前早餐及睡前、生病日不可自行停用胰島素、足部每日檢視避免赤腳、低血糖時隨身糖果補充。返診安排 04/05 新陳代謝科（陳淑芬醫師），需空腹 12 小時抽血。社工持續追蹤經濟補助進度。` },
]

export const MOCK_NURSING_HIS_SOURCE_DATA: HisSourceData[] = [
  {
    patientId: 'mp1',
    sections: [
      { title: '基本資料', source: 'HIS 病患主檔', items: [
        { label: '姓名', value: '王建民' }, { label: '病歷號', value: 'A2025001' },
        { label: '年齡/性別', value: '68歲/男' }, { label: '床號', value: '5A-12' },
        { label: '入院日期', value: '2026-03-18' }, { label: '診斷', value: 'Acute inferior STEMI' },
        { label: '主治醫師', value: '李文哲' }, { label: '主責護理師', value: '張雅芳' },
      ]},
      { title: '護理評估', source: 'NIS 護理評估系統', items: [
        { label: 'ADL (Barthel Index)', value: '70 分（需部分協助）' },
        { label: '跌倒風險 (Morse)', value: '45 分（中度風險）↑' },
        { label: '壓傷風險 (Braden)', value: '18 分（輕度風險）' },
        { label: '意識 (GCS)', value: 'E4V5M6 = 15' },
        { label: '疼痛 (NRS)', value: '3/10（胸口悶痛）' },
        { label: '營養篩檢', value: 'BMI 26.2，MUST 低風險' },
      ]},
      { title: '生命徵象', source: 'HIS 護理站系統', items: [
        { label: 'BP', value: '132/78 mmHg' }, { label: 'HR', value: '72 bpm' },
        { label: 'RR', value: '18 次/分' }, { label: 'BT', value: '36.5°C' },
        { label: 'SpO2', value: '98% (RA)' }, { label: 'Pain', value: 'NRS 3/10' },
      ]},
      { title: '管路評估', source: 'NIS 管路系統', items: [
        { label: 'PIV', value: '左手 20G (03/18 置入)，通暢' },
        { label: 'Foley', value: '16Fr (03/18 置入)，引流清澈' },
        { label: 'EKG Monitor', value: '持續監測中' },
        { label: 'O2', value: '未使用（Room Air）' },
      ]},
      { title: '用藥紀錄', source: 'HIS 藥囑系統', items: [
        { label: 'Aspirin', value: '100mg PO QD (08:00)' },
        { label: 'Clopidogrel', value: '75mg PO QD (08:00)' },
        { label: 'Atorvastatin', value: '40mg PO HS (21:00)' },
        { label: 'Metoprolol', value: '25mg PO BID (08:00, 20:00)' },
        { label: 'Amlodipine', value: '5mg PO QD (08:00)' },
        { label: 'Heparin', value: '5000U SC Q12H (08:00, 20:00)' },
      ]},
      { title: '護理問題', source: 'NIS 護理計畫系統', items: [
        { label: '#1', value: '急性���痛 / 與心肌缺氧有關' },
        { label: '#2', value: '活動功能障礙 / 與臥床休息有關' },
        { label: '#3', value: '焦慮 / 與疾病預後不確定有關' },
        { label: '#4', value: '知識缺失 / 與心血管疾病自我管理有關' },
      ]},
    ],
  },
  {
    patientId: 'mp2',
    sections: [
      { title: '基本資料', source: 'HIS 病患主檔', items: [
        { label: '姓名', value: '林美珍' }, { label: '病歷號', value: 'A2025002' },
        { label: '年齡/性別', value: '55歲/女' }, { label: '床號', value: '6B-03' },
        { label: '入院日期', value: '2026-03-20' }, { label: '診斷', value: 'COPD with acute exacerbation' },
        { label: '主治醫師', value: '張惠雯' }, { label: '主責護理師', value: '王小芬' },
      ]},
      { title: '護理評估', source: 'NIS 護理評估系統', items: [
        { label: 'ADL (Barthel Index)', value: '55 分（需中度協助）↓' },
        { label: '跌倒風險 (Morse)', value: '55 分（高風險）↑' },
        { label: '壓傷風險 (Braden)', value: '16 分（中度風險）↑' },
        { label: '意識 (GCS)', value: 'E4V5M6 = 15' },
        { label: '疼痛 (NRS)', value: '2/10（無明顯疼痛）' },
        { label: '呼��評估', value: '呼吸費力，使用輔助肌，端坐呼吸' },
      ]},
      { title: '生命徵象', source: 'HIS 護理站系統', items: [
        { label: 'BP', value: '148/88 mmHg ↑' }, { label: 'HR', value: '98 bpm ↑' },
        { label: 'RR', value: '26 次/分 ↑' }, { label: 'BT', value: '37.8°C ↑' },
        { label: 'SpO2', value: '92% (O2 3L NC) ↓' }, { label: 'Pain', value: 'NRS 2/10' },
      ]},
      { title: '管路評估', source: 'NIS 管路系統', items: [
        { label: 'PIV', value: '右手 22G (03/20 置入)，通暢' },
        { label: 'O2', value: 'Nasal Cannula 3L/min' },
        { label: 'Nebulizer', value: 'Q6H 使用中' },
      ]},
      { title: '用藥紀錄', source: 'HIS 藥囑系統', items: [
        { label: 'Levofloxacin', value: '750mg IV QD (10:00)' },
        { label: 'Methylprednisolone', value: '40mg IV Q12H (08:00, 20:00)' },
        { label: 'Combivent Neb', value: 'Q6H (06, 12, 18, 24)' },
        { label: 'Tiotropium', value: 'inhaler QD (08:00)' },
        { label: 'Amlodipine', value: '5mg PO QD (08:00)' },
      ]},
      { title: '護理問題', source: 'NIS 護理計畫系統', items: [
        { label: '#1', value: '氣體交換障礙 / 與肺部發炎及支氣管痙攣有關' },
        { label: '#2', value: '清除呼吸道功能失效 / 與痰液黏稠有關' },
        { label: '#3', value: '活動功能障礙 / 與呼吸困難及體力下降有關' },
        { label: '#4', value: '焦慮 / 與呼吸困難及住院有關' },
      ]},
    ],
  },
  {
    patientId: 'mp3',
    sections: [
      { title: '基本資料', source: 'HIS 病患主檔', items: [
        { label: '姓名', value: '張志豪' }, { label: '病歷號', value: 'A2025003' },
        { label: '年齡/性別', value: '42歲/男' }, { label: '床號', value: '3C-08' },
        { label: '入院日期', value: '2026-03-22' }, { label: '診斷', value: 'T2DM with DKA' },
        { label: '主治醫師', value: '陳淑芬' }, { label: '主責護理師', value: '李佳蓉' },
      ]},
      { title: '護理評估', source: 'NIS 護理評估系統', items: [
        { label: 'ADL (Barthel Index)', value: '60 分（需中度協助）↓' },
        { label: '跌倒風險 (Morse)', value: '50 分（高風險）↑' },
        { label: '壓傷風險 (Braden)', value: '17 分（輕度風險）' },
        { label: '意識 (GCS)', value: 'E4V5M6 = 15（倦怠）' },
        { label: '疼痛 (NRS)', value: '5/10（腹痛）↑' },
        { label: '脫水評估', value: '皮膚帳篷(+)、口腔乾燥、眼窩凹陷' },
      ]},
      { title: '生命徵象', source: 'HIS 護理站系統', items: [
        { label: 'BP', value: '108/68 mmHg ↓' }, { label: 'HR', value: '110 bpm ↑' },
        { label: 'RR', value: '28 次/分 (Kussmaul) ↑' }, { label: 'BT', value: '36.8°C' },
        { label: 'SpO2', value: '98% (RA)' }, { label: '血糖', value: '580 mg/dL ↑↑' },
      ]},
      { title: '管路評估', source: 'NIS 管路系統', items: [
        { label: 'PIV', value: '右手 18G (03/22 置入)，Insulin drip running' },
        { label: 'Foley', value: '16Fr (03/22 置入)，hourly UO 記錄中' },
        { label: 'O2', value: '未使用' },
      ]},
      { title: '用藥紀錄', source: 'HIS 藥囑系統', items: [
        { label: 'Regular Insulin', value: 'drip 0.1U/kg/hr (7.2U/hr)' },
        { label: 'Normal Saline', value: '1000ml/hr × 2hr → 500ml/hr' },
        { label: 'KCl', value: '20mEq/L in IV fluid (K+ < 5.0 時給予)' },
        { label: 'Losartan', value: '50mg PO QD (暫停中)' },
      ]},
      { title: '護理問題', source: 'NIS 護理計畫系統', items: [
        { label: '#1', value: '體液容積缺失 / 與滲透性利尿及嘔吐有關' },
        { label: '#2', value: '血糖控制不穩定 / 與胰島素缺乏及停藥有關' },
        { label: '#3', value: '噁心 / 與酮酸中毒有關' },
        { label: '#4', value: '知識缺失 / 與糖尿病自我管理有關' },
        { label: '#5', value: '無效性健康管理 / 與經濟困難導致停藥有關' },
      ]},
    ],
  },
]

export function getNursingWritingDraft(type: string, patientId: string, format: string = 'isbar'): string {
  const draft = MOCK_NURSING_WRITING_DRAFTS.find(d => d.type === type && d.patientId === patientId && d.format === format)
  if (draft) return draft.content
  const fallback = MOCK_NURSING_WRITING_DRAFTS.find(d => d.type === type && d.patientId === patientId)
  return fallback?.content ?? '目前無此病人的護理紀錄草稿資料，請選擇其他病人或類型。'
}

export function getNursingHisSourceData(patientId: string): HisSourceData | undefined {
  return MOCK_NURSING_HIS_SOURCE_DATA.find(d => d.patientId === patientId)
}

// ===== AI 小幫手 — Mock 資料 =====

export interface AiTemplate {
  id: string
  name: string
  scope: 'hospital' | 'department' | 'personal'
  category: 'nursing' | 'emergency' | 'physician' | 'custom'
  description: string
  systemPrompt: string
  isActive: boolean
  isShared: boolean
  shareCode?: string
  forkCount: number
  authorName?: string
  authorDepartment?: string
  authorTitle?: string
  attachments: { id: string; name: string; type: string; isDefault: boolean }[]
  createdAt: string
  createdBy: string
}

export const MOCK_AI_TEMPLATES: AiTemplate[] = [
  {
    id: 'tpl1', name: '護理 — 交班 (ISBAR)', scope: 'hospital', category: 'nursing',
    description: 'ISBAR 交班格式，適用於各科別護理交班',
    systemPrompt: '你是一位專業的護理師，請根據以下病患資料，使用 ISBAR 格式撰寫護理交班內容。\n\nISBAR 格式說明:\n- I (Identity): 病患身份識別\n- S (Situation): 目前狀況\n- B (Background): 背景資料\n- A (Assessment): 評估\n- R (Recommendation): 建議\n\n病患資料:\n{{patient_data}}\n\n補充說明:\n{{additional_info}}',
    isActive: true, isShared: false, forkCount: 0,
    attachments: [
      { id: 'att1', name: '衛教單張 — 疼痛控制', type: 'education_sheet', isDefault: false },
      { id: 'att2', name: '衛教單張 — 傷口照護', type: 'education_sheet', isDefault: true },
    ],
    createdAt: '2026-01-10', createdBy: 'admin',
  },
  {
    id: 'tpl2', name: '護理 — 出院衛教', scope: 'hospital', category: 'nursing',
    description: '出院衛教說明，包含用藥提醒、返診注意事項',
    systemPrompt: '你是一位專業的護理師，請根據以下病患住院期間資料，撰寫出院衛教內容。內容需包含：\n1. 疾病說明（用病人易懂的語言）\n2. 用藥指導（藥名、劑量、頻率、注意事項）\n3. 生活注意事項\n4. 返診時間與地點\n5. 緊急就醫警示症狀\n\n病患資料:\n{{patient_data}}\n\n補充說明:\n{{additional_info}}',
    isActive: true, isShared: false, forkCount: 0,
    attachments: [
      { id: 'att3', name: '出院用藥說明單', type: 'education_sheet', isDefault: true },
    ],
    createdAt: '2026-01-10', createdBy: 'admin',
  },
  {
    id: 'tpl3', name: '急診 — 輪班交班', scope: 'department', category: 'emergency',
    description: '急診科專用輪班交班模板，涵蓋待處理病患摘要',
    systemPrompt: '你是一位急診專科護理師，請根據以下急診病患資料，撰寫輪班交班摘要。格式需包含：\n1. 目前急診待床病患數\n2. 各區域病患概況\n3. 特別注意事項（高風險病患）\n4. 待完成醫囑\n5. 設備/藥品異常回報\n\n病患資料:\n{{patient_data}}\n\n補充說明:\n{{additional_info}}',
    isActive: true, isShared: false, forkCount: 0,
    attachments: [],
    createdAt: '2026-01-12', createdBy: 'admin',
  },
  {
    id: 'tpl4', name: '醫師 — 出院病摘', scope: 'hospital', category: 'physician',
    description: '出院病摘（Discharge Summary）撰寫，含診斷、病程、用藥',
    systemPrompt: '你是一位專業的住院醫師，請根據以下病患住院資料，撰寫完整的出院病摘 (Discharge Summary)。格式需包含：\n1. Discharge Diagnosis\n2. Hospital Course\n3. Discharge Medications\n4. Follow-up Plan\n5. Discharge Condition\n\n病患資料:\n{{patient_data}}\n\n補充說明:\n{{additional_info}}',
    isActive: true, isShared: false, forkCount: 0,
    attachments: [],
    createdAt: '2026-01-11', createdBy: 'admin',
  },
  {
    id: 'tpl5', name: 'ICU 護理交班 (個人)', scope: 'personal', category: 'nursing',
    description: '加護病房專用交班範本，含呼吸器參數、管路管理',
    systemPrompt: '你是一位加護病房護理師，請根據以下 ICU 病患資料，撰寫詳細交班內容。需特別涵蓋：\n1. 意識狀態 (GCS)\n2. 呼吸器設定與參數\n3. 血行動力學監測\n4. 管路管理清單\n5. 輸液/用藥\n6. 本班特殊事件\n7. 待辦事項\n\n病患資料:\n{{patient_data}}\n\n補充說明:\n{{additional_info}}',
    isActive: true, isShared: true, shareCode: 'ICU2026A', forkCount: 28,
    authorName: '王小明', authorDepartment: '內科加護病房', authorTitle: '護理師',
    attachments: [
      { id: 'att4', name: 'ICU 常見衛教', type: 'education_sheet', isDefault: true },
    ],
    createdAt: '2026-01-08', createdBy: 'user_wang',
  },
  {
    id: 'tpl6', name: '急診出院衛教 (自訂)', scope: 'personal', category: 'custom',
    description: '急診病患出院衛教，包含用藥提醒與返診資訊',
    systemPrompt: '你是一位急診護理師，請根據病患的急診就醫資料，撰寫簡明的出院衛教。內容應包含：\n1. 今日就醫原因與處置摘要\n2. 開立藥物與使用方法\n3. 居家照護注意事項\n4. 需立即返診的警示症狀\n5. 回診時間\n\n病患資料:\n{{patient_data}}\n\n補充說明:\n{{additional_info}}',
    isActive: true, isShared: true, shareCode: 'ER2026B', forkCount: 15,
    authorName: '李護理師', authorDepartment: '急診室', authorTitle: '專科護理師',
    attachments: [],
    createdAt: '2026-01-09', createdBy: 'user_lee',
  },
]

// AI 生成結果 mock
const AI_HELPER_RESULTS: Record<string, Record<string, string>> = {
  tpl1: {
    mp1: `【I — Identity 病患識別】
姓名：王建民，68歲男性，病歷號 A2025001，床號 5A-12
主治醫師：李文哲    住院醫師：陳柏宇
入院日期：2026-03-18

【S — Situation 目前狀況】
診斷：Acute inferior STEMI, s/p primary PCI with DES to RCA (2026-03-18)
目前病程 Day 6，生命徵象穩定：BP 128/76, HR 72, SpO2 98% RA
已移除心電監測，可自行下床活動

【B — Background 背景資料】
• 高血壓病史 10 年，規律服用 Amlodipine
• 03/18 急診到院，EKG 顯示 inferior STEMI，緊急 PCI 置放 RCA DES
• Peak Troponin-I 28.5 ng/mL (Day 2)，目前已下降至 1.2
• Echo: LVEF 50%, inferior wall hypokinesis
• 無糖尿病、無藥物過敏 (NKDA)

【A — Assessment 評估】
• 心臟功能穩定恢復中，活動耐受度良好
• DAPT 治療中 (Aspirin + Ticagrelor)，無出血徵象
• LDL 142 mg/dL，高劑量 Statin 治療中
• 情緒穩定，對疾病衛教配合度佳

【R — Recommendation 建議】
• 預計明日 (03/24) 出院，請確認出院藥物備妥
• 衛教重點：DAPT 不可自行停藥、胸痛時舌下含 NTG 並就醫
• 安排心臟復健門診 & 2 週後心臟科回診
• 出院前再確認一次生命徵象與心電圖`,
    mp2: `【I — Identity 病患識別】
姓名：林美珍，55歲女性，病歷號 A2025002，床號 6B-03
主治醫師：張惠雯    住院醫師：黃子軒
入院日期：2026-03-20

【S — Situation 目前狀況】
診斷：COPD acute exacerbation (Anthonisen Type I)
目前病程 Day 7，已脫離氧氣，SpO2 92% RA
活動耐受度改善，今日預計出院

【B — Background 背景資料】
• COPD GOLD III (FEV1 35%), 30 pack-year ex-smoker
• 03/20 入院時 SpO2 88% RA, ABG pH 7.32/pCO2 52
• Day 2 啟用 BiPAP (pCO2 升至 58), Day 4 成功脫離
• 痰培養: H. influenzae, Levofloxacin 敏感
• 上次住院 2025-11 (COPD AE, 5 天)

【A — Assessment 評估】
• 呼吸功能恢復，ABG 穩定 (pH 7.38/pCO2 46)
• 感染指標下降: WBC 7,200, CRP 0.8
• 口服藥物轉換完成，吸入劑使用技巧已覆核

【R — Recommendation 建議】
• 繼續口服 Prednisolone 20mg × 3 天後停藥
• Levofloxacin 口服再 3 天 (共 7 天療程)
• 1 週後胸腔科回診，4 週後安排肺功能檢查
• 加強流感/肺炎鏈球菌疫苗衛教`,
  },
  tpl2: {
    mp1: `出院衛教說明 — 王建民先生

一、您的疾病說明
您這次住院是因為「心肌梗塞」，也就是供應心臟血液的血管（冠狀動脈）發生阻塞。我們已經透過心導管手術，在阻塞的血管中放置了支架，恢復血液流通。

二、用藥指導
1. Aspirin 100mg — 每天 1 顆，早餐後服用（終身服用）
   ⚠️ 不可自行停藥，停藥可能導致支架內血栓
2. Ticagrelor 90mg — 每天 2 顆（早晚各 1），需服用滿 12 個月
   ⚠️ 可能造成輕微出血傾向，刷牙出血或瘀青屬正常
3. Atorvastatin 80mg — 每天 1 顆，睡前服用（降膽固醇）
4. Metoprolol 25mg — 每天 2 顆（早晚各 1），控制心跳
5. Ramipril 2.5mg — 每天 1 顆，保護心臟功能
6. NTG 舌下錠 — 胸痛時使用，含 1 顆等 5 分鐘，最多 3 顆

三、生活注意事項
• 前 2 週避免搬重物（>5 公斤）及劇烈運動
• 逐漸增加活動量，建議每天步行 15-30 分鐘
• 飲食低鹽低油，多蔬果全穀，避免加工食品
• 務必戒菸，限制酒精攝取
• 保持規律作息，避免過度勞累及情緒激動

四、返診資訊
• 心臟科回診：2 週後（李文哲醫師門診）
• 心臟復健：已安排，復健科會另行通知

五、緊急就醫警示
如出現以下症狀，請立即撥打 119 或至急診就醫：
🚨 胸痛持續超過 15 分鐘，含 NTG 3 顆仍未緩解
🚨 突發呼吸困難、冒冷汗
🚨 暈厥或意識改變
🚨 嚴重出血（吐血、黑便、大量血尿）`,
  },
  tpl4: {
    mp3: `Discharge Summary

Patient: 張志豪 (A2025003)
Admission: 2026-03-22 → Discharge: 2026-03-26
Attending: 陳淑芬 MD

Discharge Diagnosis:
1. Diabetic ketoacidosis (DKA), moderate severity — resolved
2. Type 2 diabetes mellitus, poorly controlled (HbA1c 10.2%)
3. Prerenal acute kidney injury — resolved
4. Hyperkalemia — resolved

Hospital Course:
Mr. 張, a 42 y/o male with known T2DM (5 years, poorly controlled), presented with moderate DKA (pH 7.18, glucose 485, AG 24) after 2 weeks of insulin non-compliance due to financial difficulties.

He was managed per DKA protocol with continuous insulin infusion and aggressive IV fluid resuscitation. Anion gap closed within 18 hours. Transitioned to subcutaneous insulin on hospital day 2 with initiation of oral intake. Renal function normalized (Cr 0.9 from 1.4) by day 3 with hydration. Hyperkalemia (K 5.8) resolved with insulin/glucose and hydration without requiring specific potassium-lowering agents.

Social work was consulted and successfully enrolled the patient in a medication assistance program. Comprehensive DM education was provided including insulin injection technique, SMBG, hypoglycemia recognition, sick-day rules, and dietary counseling.

Discharge Medications:
1. Insulin Glargine 24 units SC at bedtime (adjusted from 20U)
2. Insulin Lispro 6 units SC with meals (new)
3. Metformin 1000mg PO BID (continued)
4. Losartan 50mg PO QD (continued)
5. Glucose meter and test strips (provided)

Discharge Condition: Stable, tolerating diet, ambulating independently

Follow-up Plan:
1. Endocrinology clinic in 1 week (Dr. 陳)
2. BMP recheck in 1 week
3. HbA1c recheck in 3 months (target <7%)
4. Social work follow-up for medication assistance program
5. Return to ER if recurrent N/V, abdominal pain, glucose >400, or signs of dehydration`,
  },
}

export function getAiHelperResult(templateId: string, patientId: string): string {
  return AI_HELPER_RESULTS[templateId]?.[patientId]
    ?? `【AI 生成結果】\n\n根據所選模板與病患資料，系統已完成內容生成。\n\n（此為 Demo 展示，實際內容將由 Dify AI 引擎根據 System Prompt 和病患資料即時生成。）\n\n病患：${MOCK_MEDICAL_PATIENTS.find(p => p.id === patientId)?.name ?? '未知'}\n模板：${MOCK_AI_TEMPLATES.find(t => t.id === templateId)?.name ?? '未知'}`
}

// 分享市集
export interface SharedTemplate {
  shareCode: string; name: string; category: string; description: string
  authorName: string; authorDepartment: string; authorTitle: string
  forkCount: number; sharedAt: string; systemPromptPreview: string
}

export const MOCK_SHARED_TEMPLATES: SharedTemplate[] = [
  { shareCode: 'ICU2026A', name: 'ICU 護理交班範本', category: 'nursing', description: '適用於內科加護病房的護理交班，包含呼吸器設定、管路管理、血行動力學監測等 ICU 特殊項目', authorName: '王小明', authorDepartment: '內科加護病房', authorTitle: '護理師', forkCount: 28, sharedAt: '2026-01-08', systemPromptPreview: '你是一位加護病房護理師，請根據以下 ICU 病患資料，撰寫詳細交班內容...' },
  { shareCode: 'ER2026B', name: '急診出院衛教範本', category: 'emergency', description: '急診病患出院衛教，包含用藥提醒、居家照護、返診資訊與緊急警示症狀', authorName: '李護理師', authorDepartment: '急診室', authorTitle: '專科護理師', forkCount: 15, sharedAt: '2026-01-09', systemPromptPreview: '你是一位急診護理師，請根據病患的急診就醫資料，撰寫簡明的出院衛教...' },
  { shareCode: 'SURG01', name: '外科手術前評估', category: 'physician', description: '術前評估範本，涵蓋 ASA 分級、麻醉風險、術前準備事項', authorName: '陳醫師', authorDepartment: '外科部', authorTitle: '主治醫師', forkCount: 22, sharedAt: '2026-01-15', systemPromptPreview: '你是一位外科醫師，請根據病患資料撰寫術前評估報告，包含 ASA 分級...' },
  { shareCode: 'ONCO01', name: '腫瘤科治療摘要', category: 'physician', description: '化療/放療病患的治療摘要，含療程進度、副作用監測、下次療程計畫', authorName: '林醫師', authorDepartment: '腫瘤內科', authorTitle: '主治醫師', forkCount: 18, sharedAt: '2026-01-20', systemPromptPreview: '你是一位腫瘤科醫師，請根據病患的治療紀錄撰寫治療摘要...' },
  { shareCode: 'PEDI01', name: '兒科護理交班', category: 'nursing', description: '兒科病房交班範本，特別注意體重計算劑量、餵食情形、家屬溝通', authorName: '張護理師', authorDepartment: '兒科病房', authorTitle: '護理師', forkCount: 12, sharedAt: '2026-02-01', systemPromptPreview: '你是一位兒科護理師，請根據以下病童資料撰寫交班內容...' },
  { shareCode: 'PSYCH01', name: '精神科評估報告', category: 'physician', description: '精神科初診/住院評估範本，含精神狀態檢查、風險評估', authorName: '黃醫師', authorDepartment: '精神科', authorTitle: '主治醫師', forkCount: 8, sharedAt: '2026-02-10', systemPromptPreview: '你是一位精神科醫師，請根據病患資料撰寫精神科評估報告...' },
  { shareCode: 'REHAB01', name: '復健治療計畫', category: 'custom', description: '復健科治療計畫書，含功能評估、短期/長期目標、治療項目', authorName: '吳治療師', authorDepartment: '復健科', authorTitle: '物理治療師', forkCount: 10, sharedAt: '2026-02-15', systemPromptPreview: '你是一位復健治療師，請根據病患資料撰寫復健治療計畫書...' },
  { shareCode: 'NUTRI01', name: '營養評估與建議', category: 'custom', description: '住院病患營養評估，含 BMI、白蛋白、飲食建議、TPN/EN 評估', authorName: '周營養師', authorDepartment: '營養室', authorTitle: '營養師', forkCount: 6, sharedAt: '2026-03-01', systemPromptPreview: '你是一位臨床營養師，請根據病患的檢驗數據與臨床資料撰寫營養評估...' },
]

// 統計資料
export const MOCK_AI_HELPER_STATS = {
  totalGenerations: 1523,
  uniqueUsers: 45,
  avgDuration: '3.2s',
  totalTokens: '3.45M',
  templateRanking: [
    { name: '護理 — 交班 (ISBAR)', count: 452 },
    { name: '急診 — 輪班交班', count: 318 },
    { name: '醫師 — 出院病摘', count: 285 },
    { name: '護理 — 出院衛教', count: 198 },
    { name: 'ICU 護理交班', count: 142 },
    { name: '急診出院衛教 (自訂)', count: 128 },
  ],
  feedbackAvg: { ui: 4.2, content: 4.5, efficiency: 4.3 },
}

// ===== TWCI 重大傷病 假資料 =====

import { TwciForm, exampleTwciValues } from '../components/Twci/type/twciform'

export interface TwciSavedRecord {
  id: string
  createdAt: string
  createdBy: string
  updatedAt: string
  updatedBy: string
  data: TwciForm
}

export const MOCK_TWCI_SAVED_RECORDS: TwciSavedRecord[] = [
  {
    id: '1',
    createdAt: '2026-03-10 09:00:00',
    createdBy: '王大明',
    updatedAt: '2026-03-10 10:30:00',
    updatedBy: '王大明',
    data: {
      ...exampleTwciValues,
      hosp: { ...exampleTwciValues.hosp, hospId: '1145010010' },
      patient: { ...exampleTwciValues.patient, name: '陳美華', idCard: 'A223456789' },
    } as TwciForm,
  },
  {
    id: '2',
    createdAt: '2026-03-08 14:20:00',
    createdBy: '李小華',
    updatedAt: '2026-03-08 15:45:00',
    updatedBy: '李小華',
    data: {
      ...exampleTwciValues,
      hosp: { ...exampleTwciValues.hosp, hospId: '0401180014', applDate: '2025-08-15' },
      patient: { ...exampleTwciValues.patient, name: '林志明', idCard: 'B112233445', gender: 'male', birthday: '1975-03-20' },
      diagnosis: {
        ...exampleTwciValues.diagnosis,
        icd10cmCode: 'C34.90',
      },
      condition: {
        ...exampleTwciValues.condition,
        clinicalStatus: 'active',
        verificationStatus: 'confirmed',
        severity: '24484000',
      },
    } as TwciForm,
  },
  {
    id: '3',
    createdAt: '2026-03-05 11:00:00',
    createdBy: '張美玲',
    updatedAt: '2026-03-06 09:00:00',
    updatedBy: '張美玲',
    data: {
      ...exampleTwciValues,
      hosp: { ...exampleTwciValues.hosp, hospId: '1501010018', applDate: '2025-09-22' },
      patient: { ...exampleTwciValues.patient, name: '黃淑芬', idCard: 'F298765432', gender: 'female', birthday: '1968-07-10' },
      diagnosis: {
        ...exampleTwciValues.diagnosis,
        icd10cmCode: 'C50.919',
      },
      cancerStage: { cancerStage: '2', assessScore: 'T2N1M0', assessDate: '2025-09-01' },
    } as TwciForm,
  },
]

export const MOCK_TWCI_FHIR_BUNDLE = {
  resourceType: 'Bundle',
  id: 'twci-bundle-example',
  meta: {
    profile: ['https://twcore.mohw.gov.tw/ig/twci/StructureDefinition/Bundle-twci'],
  },
  type: 'document',
  timestamp: '2026-03-10T10:00:00+08:00',
  entry: [
    {
      fullUrl: 'urn:uuid:composition-twci-001',
      resource: {
        resourceType: 'Composition',
        status: 'final',
        type: { coding: [{ system: 'http://loinc.org', code: '11503-0', display: 'Medical records' }] },
        subject: { reference: 'urn:uuid:patient-001' },
        date: '2026-03-10',
        title: 'TWCI 重大傷病申請書',
      },
    },
    {
      fullUrl: 'urn:uuid:patient-001',
      resource: {
        resourceType: 'Patient',
        identifier: [{ system: 'http://www.moi.gov.tw/', value: 'A123456789' }],
        name: [{ text: '王大明' }],
        gender: 'male',
        birthDate: '2001-01-01',
        address: [{ postalCode: '106', text: '台北市大安區信義路三段140號' }],
        telecom: [
          { system: 'phone', value: '0912345678', use: 'mobile' },
          { system: 'email', value: 'a123456@nhi.gov.tw' },
        ],
      },
    },
    {
      fullUrl: 'urn:uuid:condition-001',
      resource: {
        resourceType: 'Condition',
        clinicalStatus: { coding: [{ code: 'remission' }] },
        verificationStatus: { coding: [{ code: 'confirmed' }] },
        severity: { coding: [{ system: 'http://snomed.info/sct', code: '24484000', display: 'Severe' }] },
        code: { coding: [{ system: 'http://hl7.org/fhir/sid/icd-10-cm', code: 'C49.6', display: '軀幹結締組織惡性腫瘤' }] },
        subject: { reference: 'urn:uuid:patient-001' },
        recordedDate: '2024-01-10',
      },
    },
    {
      fullUrl: 'urn:uuid:questionnaire-response-001',
      resource: {
        resourceType: 'QuestionnaireResponse',
        status: 'completed',
        item: [
          { linkId: 'cancerStage', text: '癌症期別', answer: [{ valueString: 'Stage I' }] },
          { linkId: 'oriCancerAjcc', text: 'AJCC分期', answer: [{ valueString: '其他系統分期' }] },
          { linkId: 'cancerStatus', text: '目前癌症狀態', answer: [{ valueString: '緩解中' }] },
        ],
      },
    },
  ],
}

export const TWCI_AI_FIELD_PROMPTS: Record<string, string> = {
  icd10cmCode: `你是重大傷病(TWCI)的 AI 輔助助手。根據以下病人的臨床資訊，建議最可能的 ICD-10-CM 主診斷代碼。

請考量：
1. 病人的臨床表現與病理報告
2. 腫瘤的原發部位與組織型態
3. ICD-10-CM 編碼的精確性
4. 是否符合重大傷病申請條件

請以結構化格式回覆，並標註建議理由。`,

  cancerStage: `你是重大傷病(TWCI)的 AI 輔助助手。根據以下病人的影像報告、病理報告與臨床資訊，建議適當的癌症分期。

請考量：
1. TNM 分期系統（AJCC 第8版）
2. 影像檢查結果（CT/MRI/PET）
3. 病理報告結果
4. 臨床分期與病理分期的區別

請以結構化格式回覆。`,

  cancerStatus: `你是重大傷病(TWCI)的 AI 輔助助手。根據以下病人的治療紀錄與追蹤資料，評估目前的癌症狀態。

請考量：
1. 最近一次影像追蹤結果
2. 腫瘤標記趨勢
3. 治療反應評估（RECIST 標準）
4. 臨床症狀變化

請以結構化格式回覆。`,
}

export function generateTwciAiResponse(fieldKey: string, formData: TwciForm): string {
  const diagCode = formData.diagnosis?.icd10cmCode || '（未填寫）'
  const patientName = formData.patient?.name || '（未填寫）'
  const cancerStageVal = formData.cancerStage?.cancerStage || '（未填寫）'
  const clinicalStatus = formData.condition?.clinicalStatus || '（未填寫）'

  if (fieldKey === 'icd10cmCode') {
    return `## AI 診斷代碼建議

### 案件摘要
- **病患姓名**：${patientName}
- **目前填寫 ICD-10**：${diagCode}
- **臨床狀態**：${clinicalStatus}

---

### 建議主診斷代碼

根據病患的臨床資料分析：

| 優先序 | ICD-10-CM | 疾病名稱 | 建議理由 |
|--------|-----------|---------|---------|
| 1 | ${diagCode !== '（未填寫）' ? diagCode : 'C49.6'} | 軀幹結締組織惡性腫瘤 | 與病理報告一致 |
| 2 | C49.4 | 腹部結締組織惡性腫瘤 | 需確認原發部位 |
| 3 | C49.9 | 結締組織惡性腫瘤，未明示部位 | 若原發部位不明確 |

### 注意事項

- 請確認病理報告中的組織型態
- 若為復發或轉移性腫瘤，應填寫原發部位代碼
- ICD-10-CM 編碼應精確至小數點後一位

> 參考依據：ICD-10-CM 2024版、重大傷病申請作業要點`
  }

  if (fieldKey === 'cancerStage') {
    return `## AI 癌症分期建議

### 案件摘要
- **ICD-10**：${diagCode}
- **目前填寫分期**：Stage ${cancerStageVal}

---

### 分期評估

根據目前資料，建議的 AJCC 分期如下：

**TNM 分期建議**：
- **T (原發腫瘤)**：需依影像與病理報告判定
- **N (淋巴結)**：需確認區域淋巴結狀態
- **M (遠處轉移)**：需確認是否有遠處轉移

### 分期依據核對表

| 檢查項目 | 狀態 | 說明 |
|---------|------|------|
| 病理報告 | ${formData.diagnosis?.examinationReportArray?.[0]?.reportType ? '已填寫' : '未填寫'} | 確認組織學類型 |
| 影像報告 | ${(formData.diagnosis?.imageStudy?.length ?? 0) > 0 ? '已填寫' : '未填寫'} | CT/MRI/PET 結果 |
| 手術紀錄 | 待確認 | 手術發現與切除範圍 |

> 參考依據：AJCC Cancer Staging Manual (8th Edition)`
  }

  if (fieldKey === 'cancerStatus') {
    return `## AI 癌症狀態評估

### 案件摘要
- **ICD-10**：${diagCode}
- **臨床狀態**：${clinicalStatus}
- **分期**：Stage ${cancerStageVal}

---

### 狀態評估建議

根據病患的治療紀錄與追蹤資料：

**目前癌症狀態判定**：

| 評估面向 | 結果 | 說明 |
|---------|------|------|
| 影像追蹤 | ${(formData.diagnosis?.imageStudy?.length ?? 0) > 0 ? '有影像資料' : '尚無影像追蹤'} | 依 RECIST 1.1 標準 |
| 治療反應 | 需評估 | 依治療計畫與反應判定 |
| 臨床症狀 | ${clinicalStatus} | 目前填寫的臨床狀態 |

### 建議

1. 若病患完成根治性治療且無殘餘腫瘤 → **緩解中(4)**
2. 若持續接受治療中 → **治療中(3)**
3. 若影像或腫瘤標記顯示惡化 → **復發(5)** 或 **惡化(6)**

> 參考依據：NCCN Guidelines、重大傷病換發評估準則`
  }

  return `## AI 評估建議

根據目前表單資料，針對「${fieldKey}」欄位的建議：

- **病患**：${patientName}
- **診斷**：${diagCode}
- **分期**：Stage ${cancerStageVal}

請確認所有必要欄位已正確填寫，系統將依據完整資料提供更精確的建議。`
}

// TWCI 案件流程追蹤（不含 CQL 驗證，官方尚未釋出）
const TWCI_STEP_LABELS = ['地端FHIR驗證', '雲端FHIR預檢', '正式申請']

let _twciRunCounter = 0

export function generateTwciMockWorkflowRun(): WorkflowRun {
  _twciRunCounter++
  const ts = _formatNow()
  const steps: WorkflowStep[] = []
  const isOdd = _twciRunCounter % 2 === 1
  if (isOdd) {
    const failIdx = Math.floor(Math.random() * (TWCI_STEP_LABELS.length - 1))
    for (let i = 0; i < TWCI_STEP_LABELS.length; i++) {
      if (i === TWCI_STEP_LABELS.length - 1) { steps.push(_makeStep(TWCI_STEP_LABELS[i], 'pending')); continue }
      if (i < failIdx) { steps.push(_makeStep(TWCI_STEP_LABELS[i], 'success', ts)) }
      else if (i === failIdx) { steps.push(_makeStep(TWCI_STEP_LABELS[i], 'failed', ts)) }
      else { steps.push(_makeStep(TWCI_STEP_LABELS[i], 'pending')) }
    }
  } else {
    for (let i = 0; i < TWCI_STEP_LABELS.length; i++) {
      if (i === TWCI_STEP_LABELS.length - 1) { steps.push(_makeStep(TWCI_STEP_LABELS[i], 'pending')); continue }
      steps.push(_makeStep(TWCI_STEP_LABELS[i], 'success', ts))
    }
  }
  return { id: `twci-run-${_twciRunCounter}`, timestamp: ts, steps }
}

// ===== TWCI 批次打包下載 假資料 =====

export interface TwciBatchCase {
  id: string
  acptNo: string
  hospId: string
  patientName: string
  idCard: string
  icd10cmCode: string
  icd10cmDisplay: string
  applDate: string
  verifiedAt: string
  verifyStatus: 'passed' | 'failed'
  files: TwciBatchFile[]
}

export interface TwciBatchFile {
  type: 'XML' | 'ATT' | 'DCF' | 'EMR'
  fileName: string
  size: string
}

function _batchFiles(hospId: string, caseNo: string, hasAtt: boolean, hasDcf: boolean, hasEmr: boolean): TwciBatchFile[] {
  const files: TwciBatchFile[] = [
    { type: 'XML', fileName: `XML${hospId}_${caseNo}.XML`, size: `${12 + Math.floor(Math.random() * 30)} KB` },
  ]
  if (hasAtt) files.push({ type: 'ATT', fileName: `ATT${hospId}_${caseNo}.CAB`, size: `${200 + Math.floor(Math.random() * 800)} KB` })
  if (hasDcf) files.push({ type: 'DCF', fileName: `DCF${hospId}_${caseNo}.CAB`, size: `${1 + Math.floor(Math.random() * 15)} MB` })
  if (hasEmr) files.push({ type: 'EMR', fileName: `EMR${hospId}_${caseNo}.CAB`, size: `${50 + Math.floor(Math.random() * 200)} KB` })
  return files
}

export const MOCK_TWCI_BATCH_CASES: TwciBatchCase[] = [
  {
    id: 'bc-01', acptNo: '11218800001', hospId: '0131060029',
    patientName: '王大明', idCard: 'A123456789', icd10cmCode: 'C49.6', icd10cmDisplay: '軀幹結締組織惡性腫瘤',
    applDate: '2025-10-22', verifiedAt: '2026-03-20 09:15:30', verifyStatus: 'passed',
    files: _batchFiles('0131060029', '2025102200000001', true, true, true),
  },
  {
    id: 'bc-02', acptNo: '11218800002', hospId: '0131060029',
    patientName: '陳美華', idCard: 'A223456789', icd10cmCode: 'C34.90', icd10cmDisplay: '支氣管和肺惡性腫瘤',
    applDate: '2025-10-23', verifiedAt: '2026-03-20 09:20:15', verifyStatus: 'passed',
    files: _batchFiles('0131060029', '2025102300000002', true, true, false),
  },
  {
    id: 'bc-03', acptNo: '11218800003', hospId: '0131060029',
    patientName: '林志明', idCard: 'B112233445', icd10cmCode: 'C50.919', icd10cmDisplay: '女性乳房惡性腫瘤',
    applDate: '2025-10-24', verifiedAt: '2026-03-20 09:25:00', verifyStatus: 'passed',
    files: _batchFiles('0131060029', '2025102400000003', true, false, true),
  },
  {
    id: 'bc-04', acptNo: '11218800004', hospId: '0131060029',
    patientName: '黃淑芬', idCard: 'F298765432', icd10cmCode: 'C22.0', icd10cmDisplay: '肝細胞癌',
    applDate: '2025-10-25', verifiedAt: '2026-03-20 10:00:45', verifyStatus: 'passed',
    files: _batchFiles('0131060029', '2025102500000004', true, true, true),
  },
  {
    id: 'bc-05', acptNo: '11218800005', hospId: '0131060029',
    patientName: '張家豪', idCard: 'D145678901', icd10cmCode: 'C18.9', icd10cmDisplay: '結腸惡性腫瘤',
    applDate: '2025-10-26', verifiedAt: '2026-03-20 10:10:22', verifyStatus: 'passed',
    files: _batchFiles('0131060029', '2025102600000005', true, false, false),
  },
  {
    id: 'bc-06', acptNo: '11218800006', hospId: '0131060029',
    patientName: '劉怡君', idCard: 'F287654321', icd10cmCode: 'C73', icd10cmDisplay: '甲狀腺惡性腫瘤',
    applDate: '2025-11-01', verifiedAt: '2026-03-20 10:30:18', verifyStatus: 'passed',
    files: _batchFiles('0131060029', '2025110100000006', true, true, false),
  },
  {
    id: 'bc-07', acptNo: '11218800007', hospId: '0131060029',
    patientName: '吳建廷', idCard: 'A234567890', icd10cmCode: 'C61', icd10cmDisplay: '前列腺惡性腫瘤',
    applDate: '2025-11-02', verifiedAt: '2026-03-20 11:05:00', verifyStatus: 'passed',
    files: _batchFiles('0131060029', '2025110200000007', true, true, true),
  },
  {
    id: 'bc-08', acptNo: '11218800008', hospId: '0131060029',
    patientName: '蔡雅婷', idCard: 'F256789012', icd10cmCode: 'C53.9', icd10cmDisplay: '子宮頸惡性腫瘤',
    applDate: '2025-11-05', verifiedAt: '2026-03-20 11:20:33', verifyStatus: 'passed',
    files: _batchFiles('0131060029', '2025110500000008', true, false, true),
  },
  {
    id: 'bc-09', acptNo: '11218800009', hospId: '0131060029',
    patientName: '鄭國華', idCard: 'B223456780', icd10cmCode: 'C16.9', icd10cmDisplay: '胃惡性腫瘤',
    applDate: '2025-11-08', verifiedAt: '2026-03-21 08:45:10', verifyStatus: 'passed',
    files: _batchFiles('0131060029', '2025110800000009', true, true, false),
  },
  {
    id: 'bc-10', acptNo: '11218800010', hospId: '0131060029',
    patientName: '許文龍', idCard: 'E134567890', icd10cmCode: 'C71.9', icd10cmDisplay: '腦惡性腫瘤',
    applDate: '2025-11-10', verifiedAt: '2026-03-21 09:00:55', verifyStatus: 'passed',
    files: _batchFiles('0131060029', '2025111000000010', true, true, true),
  },
  {
    id: 'bc-11', acptNo: '11218800011', hospId: '0131060029',
    patientName: '周美玲', idCard: 'F212345678', icd10cmCode: 'C56.9', icd10cmDisplay: '卵巢惡性腫瘤',
    applDate: '2025-11-12', verifiedAt: '2026-03-21 09:30:00', verifyStatus: 'passed',
    files: _batchFiles('0131060029', '2025111200000011', true, true, true),
  },
  {
    id: 'bc-12', acptNo: '11218800012', hospId: '0131060029',
    patientName: '楊志強', idCard: 'C187654321', icd10cmCode: 'C92.00', icd10cmDisplay: '急性骨髓性白血病',
    applDate: '2025-11-15', verifiedAt: '2026-03-21 10:15:20', verifyStatus: 'passed',
    files: _batchFiles('0131060029', '2025111500000012', true, false, false),
  },
]

export const TWCI_BATCH_BUSINESS_TYPES = [
  { label: 'QB4-重大傷病', value: 'QB4' },
  { label: 'QB4_T-重大傷病測試_FHIR格式', value: 'QB4_T' },
]
