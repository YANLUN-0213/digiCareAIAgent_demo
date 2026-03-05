import { useState, useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import classNames from 'classnames'
import Header from './Header'
import Sidebar from './Sidebar'

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])
  return matches
}

const MainLayout = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed')
    return saved === 'true'
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', String(isCollapsed))
  }, [isCollapsed])

  useEffect(() => {
    const wrapper = wrapperRef.current
    const sidebar = wrapper?.querySelector('.sidebar')
    if (!wrapper || !sidebar) return

    const handleMouseEnter = () => {
      if (isCollapsed && !isMobile) {
        wrapper.classList.add('sidebar-hovering')
      }
    }
    const handleMouseLeave = () => {
      wrapper.classList.remove('sidebar-hovering')
    }

    sidebar.addEventListener('mouseenter', handleMouseEnter)
    sidebar.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      sidebar.removeEventListener('mouseenter', handleMouseEnter)
      sidebar.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isCollapsed, isMobile])

  const handleToggle = () => {
    if (isMobile) {
      setSidebarOpen(prev => !prev)
    } else {
      setIsCollapsed(prev => !prev)
    }
  }

  return (
    <>
      <Header isCollapsed={isCollapsed && !isMobile} onToggle={handleToggle} />
      <div
        ref={wrapperRef}
        className={classNames('page-body-wrapper', { collapsed: isCollapsed && !isMobile })}
      >
        {sidebarOpen && <div className="sidebar-overlay visible" onClick={() => setSidebarOpen(false)} />}
        <Sidebar
          isCollapsed={isCollapsed && !isMobile}
          sidebarOpen={sidebarOpen}
          isMobile={isMobile}
          onNavigate={() => setSidebarOpen(false)}
        />
        <Outlet />
      </div>
      <div className="layout-footer-wrapper">
        <footer className="tpi-footer">
          <span>Copyright&copy; TPIsoftware. All Rights Reserved.</span>
          <span>v1.2.6</span>
        </footer>
      </div>
    </>
  )
}

export default MainLayout
