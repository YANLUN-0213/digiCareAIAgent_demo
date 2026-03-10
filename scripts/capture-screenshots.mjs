import { chromium } from 'playwright'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const imgDir = path.resolve(__dirname, '../docs/images')
const BASE = 'http://localhost:3005/digiCareAIAgent_demo/'

async function main() {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()

  const go = (hash) => page.goto(`${BASE}#/${hash}`, { waitUntil: 'networkidle' })
  const shot = (name) => page.screenshot({ path: path.join(imgDir, name), fullPage: true })
  const wait = (ms) => page.waitForTimeout(ms)

  // ── Agent Dashboard ──
  console.log('1/14 agent-dashboard')
  await go('agent/dashboard')
  await wait(500)
  await shot('agent-dashboard.png')

  // ── Agent Execution ──
  console.log('2/14 agent-execution')
  await go('agent/execution')
  await wait(500)
  await shot('agent-execution.png')

  // ── Agent Execution Detail ──
  console.log('3/14 agent-execution-detail')
  const detailBtn = page.locator('.p-datatable-tbody tr').first().locator('button').first()
  await detailBtn.click()
  await wait(500)
  await shot('agent-execution-detail.png')
  // close dialog
  const closeBtn = page.locator('.p-dialog-header-icon').first()
  if (await closeBtn.isVisible()) await closeBtn.click()

  // ── Agent Skills - My Skills ──
  console.log('4/14 agent-skills-my')
  await go('agent/skills')
  await wait(500)
  await shot('agent-skills-my.png')

  // ── Agent Skills - Public ──
  console.log('5/14 agent-skills-public')
  const tabs = page.locator('.p-tabview-nav li')
  await tabs.nth(1).click()
  await wait(500)
  await shot('agent-skills-public.png')

  // ── Agent Skills - Shared ──
  console.log('6/14 agent-skills-shared')
  await tabs.nth(2).click()
  await wait(500)
  await shot('agent-skills-shared.png')

  // ── Agent Settings ──
  console.log('7/14 agent-settings')
  await go('agent/settings')
  await wait(500)
  await shot('agent-settings.png')

  // ── TWPAS Form ──
  console.log('8/14 twpas-form')
  await go('fhir/twpas')
  await wait(800)
  await shot('twpas-form.png')

  // ── TWPAS Toolbar ──
  console.log('9/14 twpas-toolbar')
  // Scroll to bottom to show toolbar
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await wait(500)
  await page.screenshot({ path: path.join(imgDir, 'twpas-toolbar.png') })

  // ── TWPAS Old Case Dialog ──
  console.log('10/14 twpas-old-case')
  // Click 查詢舊案清單 button
  const oldCaseBtn = page.locator('button', { hasText: '查詢舊案清單' })
  await oldCaseBtn.click()
  await wait(500)
  await page.screenshot({ path: path.join(imgDir, 'twpas-old-case.png'), fullPage: true })
  // Close dialog
  const closeDlg = page.locator('.p-dialog-header-icon').first()
  if (await closeDlg.isVisible()) await closeDlg.click()
  await wait(300)

  // ── Load example data for remaining screenshots ──
  console.log('Loading example data...')
  const exampleBtn = page.locator('button', { hasText: '帶入範例資料' })
  await exampleBtn.scrollIntoViewIfNeeded()
  await exampleBtn.click()
  await wait(800)

  // ── TWPAS AI Helper Button ──
  console.log('11/14 twpas-ai-helper-btn')
  // Click diagnosis tab (疾病資訊 - 4th tab, index 3)
  const twpasTabs = page.locator('.p-tabview-nav li')
  await twpasTabs.nth(3).click()
  await wait(500)
  await page.screenshot({ path: path.join(imgDir, 'twpas-ai-helper-btn.png'), fullPage: true })

  // ── TWPAS AI Sidebar ──
  console.log('12/14 twpas-ai-sidebar')
  const aiBtn = page.locator('.ai-helper-btn').first()
  await aiBtn.scrollIntoViewIfNeeded()
  await aiBtn.click()
  // Wait for streaming to finish (the mock streams ~600 chars at 2 chars/10ms = ~3s)
  await wait(5000)
  await page.screenshot({ path: path.join(imgDir, 'twpas-ai-sidebar.png'), fullPage: true })
  // Close sidebar
  const sidebarClose = page.locator('.p-sidebar-close').first()
  if (await sidebarClose.isVisible()) await sidebarClose.click()
  await wait(300)

  // ── TWPAS FHIR Bundle Dialog ──
  console.log('13/14 twpas-fhir-bundle')
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await wait(300)
  const fhirBtn = page.locator('button', { hasText: '產生FHIR格式且驗證' })
  await fhirBtn.click()
  await wait(500)
  await page.screenshot({ path: path.join(imgDir, 'twpas-fhir-bundle.png'), fullPage: true })
  const closeFhir = page.locator('.p-dialog-header-icon').first()
  if (await closeFhir.isVisible()) await closeFhir.click()
  await wait(300)

  // ── TWPAS Download Dialog ──
  console.log('14/14 twpas-download')
  const dlBtn = page.locator('button', { hasText: '下載檔案' })
  await dlBtn.scrollIntoViewIfNeeded()
  await dlBtn.click()
  await wait(500)
  await page.screenshot({ path: path.join(imgDir, 'twpas-download.png'), fullPage: true })

  await browser.close()
  console.log('Done! 14 screenshots saved to docs/images/')
}

main().catch(e => { console.error(e); process.exit(1) })
