import { useState, useRef, useEffect } from 'react'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Dropdown } from 'primereact/dropdown'
import { Badge } from 'primereact/badge'
import { MOCK_CHAT_HISTORY, MOCK_KNOWLEDGE_BASES, ChatMessage } from '@/data/mockData'
import PageHeader from '@/components/PageHeader'

const FAKE_RESPONSES: Record<string, { content: string; sources: { doc: string; page: number; section: string }[] }> = {
  default: {
    content: '感謝您的提問。根據目前知識庫中的資料，以下是相關說明：\n\n依據相關法規規定，您所詢問的事項需依個案情況判斷。建議您可進一步參閱相關法規條文，或洽詢本中心承辦人員以獲得更詳細的資訊。\n\n如有其他問題，歡迎隨時提出。',
    sources: [{ doc: '醫療器材管理法', page: 1, section: '總則' }],
  },
  '展延': {
    content: '依據「醫療器材管理法」第27條規定：\n\n**醫療器材許可證有效期間為5年，期滿仍須繼續製造或輸入者，應於有效期間屆滿前6個月內，申請展延。**\n\n展延申請應檢附以下文件：\n1. 展延申請書\n2. 原許可證正本\n3. 品質管理系統符合性證明\n4. 展延審查費繳費證明\n\n每次展延期間為5年。逾期未申請展延者，原許可證失效。',
    sources: [{ doc: '醫療器材管理法', page: 18, section: '第27條' }],
  },
  '臨床': {
    content: '依據「醫療器材管理法」第37條規定：\n\n**醫療器材臨床試驗，應由試驗委託者擬定計畫書，連同相關資料，向中央主管機關申請核准後，始得進行。**\n\n臨床試驗應注意事項：\n1. 需經人體試驗倫理審查委員會（IRB）審查通過\n2. 試驗計畫書應載明試驗目的、方法、預計收案人數等\n3. 試驗期間如發生嚴重不良事件，應即時通報\n4. 第三等級高風險醫材原則上需檢附臨床試驗報告\n\n建議洽詢本中心醫療器材組了解詳細申請流程。',
    sources: [{ doc: '醫療器材管理法', page: 25, section: '第37條' }, { doc: '醫療器材臨床試驗管理辦法', page: 3, section: '第4條' }],
  },
  '規費': {
    content: '依據「醫療器材查驗登記費用標準」，各等級醫療器材查驗登記審查費如下：\n\n| 等級 | 審查費（新臺幣） |\n|------|------------------|\n| 第一等級 | 10,000 元 |\n| 第二等級 | 32,000 元 |\n| 第三等級 | 80,000 元 |\n\n**其他費用項目：**\n- 變更登記：5,000 ~ 20,000 元（依變更項目）\n- 展延登記：8,000 元\n- 臨床試驗審查費：50,000 元\n\n以上費用如有調整，以最新公告為準。',
    sources: [{ doc: '醫療器材查驗登記費用標準', page: 2, section: '第3條' }],
  },
}

const findResponse = (input: string) => {
  for (const [keyword, resp] of Object.entries(FAKE_RESPONSES)) {
    if (keyword !== 'default' && input.includes(keyword)) return resp
  }
  return FAKE_RESPONSES.default
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT_HISTORY)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [selectedKB, setSelectedKB] = useState('1')
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!input.trim() || isTyping) return

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toLocaleString('zh-TW'),
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const resp = findResponse(userMsg.content)
      const assistantMsg: ChatMessage = {
        id: String(Date.now() + 1),
        role: 'assistant',
        content: resp.content,
        sources: resp.sources,
        timestamp: new Date().toLocaleString('zh-TW'),
      }
      setMessages(prev => [...prev, assistantMsg])
      setIsTyping(false)
    }, 1200)
  }

  const handleClear = () => {
    setMessages([])
  }

  const kbOptions = MOCK_KNOWLEDGE_BASES.filter(kb => kb.status === 'active').map(kb => ({ name: kb.name, code: kb.id }))

  return (
    <div className="content-inner">
      <PageHeader funcName="AI 小助手" />

      <div className="grid">
        {/* 聊天區 */}
        <div className="col-12 lg:col-8">
          <Card className="card chat-card">
            {/* 訊息列表 */}
            <div className="chat-messages">
              {messages.length === 0 && (
                <div className="flex flex-column align-items-center justify-content-center" style={{ height: '100%', color: '#999' }}>
                  <i className="pi pi-comments text-6xl mb-3" />
                  <p>請輸入您的問題，AI 小助手將為您解答</p>
                </div>
              )}
              {messages.map(msg => (
                <div key={msg.id} className={`flex mb-3 ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                  <div style={{
                    maxWidth: '80%',
                    padding: '12px 16px',
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    backgroundColor: msg.role === 'user' ? 'var(--primary_color)' : '#f1f5f9',
                    color: msg.role === 'user' ? '#fff' : '#333',
                    fontSize: 14,
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                  }}>
                    {msg.content}
                    {msg.sources && msg.sources.length > 0 && (
                      <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(0,0,0,0.1)', fontSize: 12, color: '#666' }}>
                        <i className="pi pi-link mr-1" style={{ fontSize: 11 }} />
                        參考來源：
                        {msg.sources.map((s, i) => (
                          <span key={i}>
                            {i > 0 && '、'}
                            <strong>{s.doc}</strong> {s.section} (p.{s.page})
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-content-start mb-3">
                  <div style={{ padding: '12px 16px', borderRadius: '16px 16px 16px 4px', backgroundColor: '#f1f5f9', color: '#999', fontSize: 14 }}>
                    <i className="pi pi-spin pi-spinner mr-2" />AI 正在思考中...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* 輸入區 */}
            <div className="flex gap-2 align-items-end">
              <InputTextarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
                placeholder="請輸入您的問題...（Enter 送出，Shift+Enter 換行）"
                autoResize
                rows={2}
                className="flex-1"
                disabled={isTyping}
              />
              <div className="flex flex-column gap-1">
                <Button icon="pi pi-send" onClick={handleSend} disabled={!input.trim() || isTyping} style={{ width: 42, height: 42 }} />
                <Button icon="pi pi-trash" className="p-button-outlined p-button-secondary" onClick={handleClear} style={{ width: 42, height: 42 }} tooltip="清除對話" />
              </div>
            </div>
          </Card>
        </div>

        {/* 設定面板 */}
        <div className="col-12 lg:col-4">
          <Card className="card" title="查詢設定">
            <div className="flex flex-column gap-3">
              <div>
                <label className="block mb-1 font-semibold text-sm">知識庫選擇</label>
                <Dropdown value={selectedKB} options={kbOptions} optionLabel="name" optionValue="code" className="w-full" onChange={e => setSelectedKB(e.value)} />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-sm">目前模型</label>
                <div className="flex align-items-center gap-2">
                  <Badge value="GPT-OSS 20B" severity="info" />
                  <span className="text-sm text-500">地端推論</span>
                </div>
              </div>
              <div>
                <label className="block mb-1 font-semibold text-sm">Temperature</label>
                <span className="text-sm">0.1（低隨機性）</span>
              </div>
            </div>
          </Card>

          <Card className="card mt-3" title="快速提問">
            <div className="flex flex-column gap-2">
              {['醫療器材查驗登記需要哪些文件？', '第二等級醫材的規費是多少？', '如何申請展延？', '臨床試驗的申請流程？'].map((q, i) => (
                <Button key={i} label={q} className="p-button-outlined p-button-sm text-left w-full" style={{ justifyContent: 'flex-start', whiteSpace: 'normal', textAlign: 'left' }}
                  onClick={() => { setInput(q) }}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AIAssistant
