import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { MENU_ITEMS, MenuItem } from '@/data/mockData'

interface SidebarProps {
  isCollapsed: boolean
  sidebarOpen: boolean
  isMobile: boolean
  onNavigate: () => void
}

const Sidebar = ({ isCollapsed, sidebarOpen, isMobile, onNavigate }: SidebarProps) => {
  const [expandedId, setExpandedId] = useState<string | null>('admin')
  const location = useLocation()

  const toggleMenu = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id))
  }

  const isParentActive = (item: MenuItem) => {
    if (!item.children) return false
    return item.children.some(c => c.path && location.pathname.startsWith(c.path))
  }

  const renderMenuItem = (item: MenuItem) => {
    if (item.children) {
      const isExpanded = expandedId === item.id
      const isActive = isParentActive(item)

      return (
        <div key={item.id} className="nav-section">
          <div
            className={classNames('nav-title', { 'active-parent': !isCollapsed && expandedId === item.id })}
            onClick={() => toggleMenu(item.id)}
          >
            <div className="flex align-items-center">
              <i className={classNames(item.icon, 'section-icon')} />
              <span className="nav-title-text">{item.title}</span>
            </div>
            <i className={classNames('pi nav-chevron', isExpanded ? 'pi-chevron-down' : 'pi-chevron-right')} style={{ fontSize: 12 }} />
          </div>
          <div className={classNames('nav-collapse', { expanded: isExpanded })}>
            <ul className="nav">
              {item.children.map(child => (
                <li key={child.id} className="nav-item">
                  <NavLink
                    to={child.path!}
                    end
                    className={({ isActive }) => classNames('nav-link', { active: isActive })}
                    onClick={onNavigate}
                  >
                    <i className={classNames(child.icon, 'icon')} />
                    <span className="menu-title">{child.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    }

    return (
      <div key={item.id} className="nav-section">
        <ul className="nav" style={{ padding: '4px 8px' }}>
          <li className="nav-item">
            <NavLink
              to={item.path!}
              end
              className={({ isActive }) => classNames('nav-link', { active: isActive })}
              onClick={onNavigate}
            >
              <i className={classNames(item.icon, 'icon')} />
              <span className="menu-title">{item.title}</span>
            </NavLink>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <div className={classNames('sidebar', {
      open: sidebarOpen,
      collapsed: isCollapsed
    })}>
      {MENU_ITEMS.map(renderMenuItem)}
    </div>
  )
}

export default Sidebar
