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
    id: 'medical-ai',
    title: '生成式醫療紀錄 AI',
    icon: 'pi pi-pen-to-square',
    children: [
      { id: 'teaching-record', title: '教學病歷', icon: 'pi pi-book', path: '/medical-ai/teaching' },
      { id: 'medical-writing', title: '病歷寫作', icon: 'pi pi-file-edit', path: '/medical-ai/writing' },
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
  patientId: string
  content: string
}

export const MOCK_MEDICAL_WRITING_DRAFTS: MedicalWritingDraft[] = [
  // Admission Notes
  { type: 'admission', patientId: 'mp1', content: `Admission Note

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
  { type: 'admission', patientId: 'mp2', content: `Admission Note

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
  { type: 'admission', patientId: 'mp3', content: `Admission Note

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
  { type: 'discharge', patientId: 'mp1', content: `Discharge Summary

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
  { type: 'discharge', patientId: 'mp2', content: `Discharge Summary

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
  { type: 'discharge', patientId: 'mp3', content: `Discharge Summary

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
  { type: 'weekly', patientId: 'mp1', content: `Weekly Summary (2026-03-18 ~ 2026-03-24)

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
  { type: 'weekly', patientId: 'mp2', content: `Weekly Summary (2026-03-20 ~ 2026-03-27)

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
  { type: 'weekly', patientId: 'mp3', content: `Weekly Summary (2026-03-22 ~ 2026-03-26)

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
]

export function getMedicalWritingDraft(type: string, patientId: string): string {
  const draft = MOCK_MEDICAL_WRITING_DRAFTS.find(d => d.type === type && d.patientId === patientId)
  return draft?.content ?? '目前無此病人的草稿資料，請選擇其他病人或類型。'
}

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
