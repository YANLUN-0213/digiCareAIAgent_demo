import { createHashRouter, Navigate } from 'react-router-dom'
import MainLayout from '@/layout/MainLayout'
import Dashboard from '@/pages/Dashboard'
import UserManagement from '@/pages/UserManagement'
import RoleManagement from '@/pages/RoleManagement'
import SystemSettings from '@/pages/SystemSettings'
import Logs from '@/pages/Logs'
import AIAssistant from '@/pages/AIAssistant'
import KnowledgeBase from '@/pages/KnowledgeBase'
import PromptModel from '@/pages/PromptModel'
import QualityMonitor from '@/pages/QualityMonitor'
import DriftMonitor from '@/pages/DriftMonitor'
import PlaceholderPage from '@/pages/PlaceholderPage'
import FhirTwpas from '@/pages/FhirTwpas'
import FhirTwci from '@/pages/FhirTwci'
import AgentDashboard from '@/pages/AgentDashboard'
import AgentExecution from '@/pages/AgentExecution'
import AgentSkills from '@/pages/AgentSkills'
import AgentSettings from '@/pages/AgentSettings'
import TeachingRecord from '@/pages/TeachingRecord'
import MedicalWriting from '@/pages/MedicalWriting'
import AiHelper from '@/pages/AiHelper'
import AiTemplates from '@/pages/AiTemplates'
import AiSharedMarket from '@/pages/AiSharedMarket'
import AiStatistics from '@/pages/AiStatistics'
import CaseTracking from '@/pages/CaseTracking'
import IvDripMonitor from '@/pages/IvDripMonitor'
import NursingWriting from '@/pages/NursingWriting'

const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      // 後台管理
      { path: 'system/settings', element: <SystemSettings /> },
      { path: 'system/users', element: <UserManagement /> },
      { path: 'system/sso-accounts', element: <PlaceholderPage funcName="院內SSO帳號維護" /> },
      { path: 'system/roles', element: <RoleManagement /> },
      { path: 'system/functions', element: <PlaceholderPage funcName="功能維護" /> },
      { path: 'logs', element: <Logs /> },
      // AI 治理管理
      { path: 'ai/assistant', element: <AIAssistant /> },
      { path: 'ai/knowledge-base', element: <KnowledgeBase /> },
      { path: 'ai/prompt-model', element: <PromptModel /> },
      { path: 'ai/quality-monitor', element: <QualityMonitor /> },
      { path: 'ai/drift-monitor', element: <DriftMonitor /> },
      // AI Agent
      { path: 'agent/dashboard', element: <AgentDashboard /> },
      { path: 'agent/skills', element: <AgentSkills /> },
      { path: 'agent/execution', element: <AgentExecution /> },
      { path: 'agent/settings', element: <AgentSettings /> },
      // 生成式醫療紀錄 AI
      { path: 'medical-ai/teaching', element: <TeachingRecord /> },
      { path: 'medical-ai/writing', element: <MedicalWriting /> },
      // 生成式護理紀錄 AI
      { path: 'nursing-ai/writing', element: <NursingWriting /> },
      // AI 小幫手
      { path: 'ai-helper/generate', element: <AiHelper /> },
      { path: 'ai-helper/templates', element: <AiTemplates /> },
      { path: 'ai-helper/shared', element: <AiSharedMarket /> },
      { path: 'ai-helper/statistics', element: <AiStatistics /> },
      // FHIR專區
      { path: 'fhir/case-tracking', element: <CaseTracking /> },
      { path: 'fhir/twpas', element: <FhirTwpas /> },
      { path: 'fhir/twci', element: <FhirTwci /> },
      { path: 'fhir/twngs', element: <PlaceholderPage funcName="次世代基因定序檢測TWNGS" /> },
      { path: 'fhir/twiam', element: <PlaceholderPage funcName="流感抗病毒藥劑使用報告TWIAM" /> },
      // TWEMPD FHIR
      { path: 'twempd/ep', element: <PlaceholderPage funcName="電子處方箋TWEMPD-EP" /> },
      { path: 'twempd/ds', element: <PlaceholderPage funcName="調劑單張TWEMPD-DS" /> },
      // 點滴智慧管理
      { path: 'nursing/iv-drip-monitor', element: <IvDripMonitor /> },
      // EMR IG
      { path: 'emr/ep', element: <PlaceholderPage funcName="電子處方簽EMR-EP" /> },
      { path: 'emr/ds', element: <PlaceholderPage funcName="調劑單張EMR-DS" /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])

export default router
