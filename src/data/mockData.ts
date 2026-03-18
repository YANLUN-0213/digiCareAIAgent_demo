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
import { exampleTwpasValues } from '@/components/Twpas/type/twpasform'

export interface TwpasSavedRecord {
  id: string
  createdAt: string
  createdBy: string
  updatedAt: string
  updatedBy: string
  data: TwpasForm
}

export const MOCK_TWPAS_SAVED_RECORDS: TwpasSavedRecord[] = [
  {
    id: '1',
    createdAt: '2026-03-08 09:30:00',
    createdBy: '王大明',
    updatedAt: '2026-03-08 10:15:00',
    updatedBy: '王大明',
    data: {
      ...exampleTwpasValues,
      hosp: { ...exampleTwpasValues.hosp, hospId: '1555455555' },
      patient: { ...exampleTwpasValues.patient, name: '陳美華', idCard: 'A223456789' },
    } as TwpasForm,
  },
  {
    id: '2',
    createdAt: '2026-03-07 14:20:00',
    createdBy: '李小華',
    updatedAt: '2026-03-07 15:00:00',
    updatedBy: '李小華',
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
    createdAt: '2026-03-05 11:00:00',
    createdBy: '張美玲',
    updatedAt: '2026-03-06 08:30:00',
    updatedBy: '張美玲',
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
    profile: ['https://twcore.mohw.gov.tw/ig/twpas/StructureDefinition/Bundle-twpas'],
  },
  type: 'document',
  timestamp: '2026-03-10T10:00:00+08:00',
  entry: [
    {
      fullUrl: 'urn:uuid:composition-twpas-001',
      resource: {
        resourceType: 'Composition',
        status: 'final',
        type: { coding: [{ system: 'http://loinc.org', code: '11503-0', display: 'Medical records' }] },
        subject: { reference: 'urn:uuid:patient-001' },
        date: '2026-03-10',
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
        code: { coding: [{ system: 'http://hl7.org/fhir/sid/icd-10-cm', code: 'C34.1', display: '惡性腫瘤-右上肺葉' }] },
        subject: { reference: 'urn:uuid:patient-001' },
        onsetDateTime: '2026-02-20',
      },
    },
    {
      fullUrl: 'urn:uuid:medication-request-001',
      resource: {
        resourceType: 'MedicationRequest',
        status: 'active',
        intent: 'order',
        medicationCodeableConcept: { coding: [{ system: 'https://www.nhi.gov.tw/', code: 'KC00935209', display: 'Osimertinib (Tagrisso) 80mg' }] },
        subject: { reference: 'urn:uuid:patient-001' },
        dosageInstruction: [{ text: '80mg QD PO' }],
      },
    },
  ],
}

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
  let stopped = false
  for (let i = 0; i < STEP_LABELS.length; i++) {
    if (stopped) { steps.push(_makeStep(STEP_LABELS[i], 'pending')); continue }
    // 最後一步（正式申請）不自動執行，保持 pending 等使用者手動上傳
    if (i === STEP_LABELS.length - 1) { steps.push(_makeStep(STEP_LABELS[i], 'pending')); continue }
    const pass = Math.random() < 0.7
    if (pass) { steps.push(_makeStep(STEP_LABELS[i], 'success', ts)) }
    else { steps.push(_makeStep(STEP_LABELS[i], 'failed', ts)); stopped = true }
  }
  return { id: `run-${_runCounter}`, timestamp: ts, steps }
}
