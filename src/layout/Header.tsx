import classNames from 'classnames'

interface HeaderProps {
  isCollapsed: boolean
  onToggle: () => void
}

const Header = ({ isCollapsed, onToggle }: HeaderProps) => {
  return (
    <>
      <button
        className={classNames('mobile-menu-button', { collapsed: isCollapsed })}
        onClick={onToggle}
      >
        &#9776;
      </button>
      <header className="header-container">
        <div className="header">
          <div className="container">
            <div className="left-side">
              <div className="logo">
                <img src="/images/logo.png" alt="昕力醫院" style={{ height: 30 }} />
              </div>
            </div>
            <div className="right-side">
              <i className="pi pi-user" style={{ fontSize: 16 }} />
              <span className="user-name">Admin</span>
              <a
                href="#"
                title="登出系統"
                style={{ color: 'var(--primary_color)', fontSize: 14, marginLeft: 8 }}
                onClick={e => e.preventDefault()}
              >
                <i className="pi pi-sign-out" />
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
