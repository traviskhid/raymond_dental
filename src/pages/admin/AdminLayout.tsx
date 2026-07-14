import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate, NavLink, Outlet } from 'react-router-dom'
import {
  Activity,
  ArrowLeft,
  CalendarDays,
  HeartPulse,
  LayoutGrid,
  Search,
  Settings,
  Users,
} from 'lucide-react'

const pageVariants: any = {
  initial: { opacity: 0, x: 20 },
  in: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut', staggerChildren: 0.1 } },
  out: { opacity: 0, x: -20, transition: { duration: 0.4, ease: 'easeIn' } },
}

const itemVariants: any = {
  initial: { opacity: 0, y: 10 },
  in: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function AdminLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated')
    if (isAuthenticated !== 'true') {
      navigate('/admin/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated')
    navigate('/admin/login')
  }

  return (
    <motion.div
      className="admin-shell"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      {/* Sidebar */}
      <motion.aside className="admin-sidebar" variants={itemVariants}>
        <div className="brand-mark">
          <span className="brand-icon" style={{ width: '30px', height: '30px', flexShrink: 0 }}>
            <HeartPulse size={16} />
          </span>
          <span>Raymond's Admin</span>
        </div>

        <nav className="admin-nav">
          <Link to="/" className="admin-nav-item" style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', marginBottom: '16px' }}>
            <ArrowLeft size={18} />
            Back to Site
          </Link>
          <NavLink to="/admin" end className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <LayoutGrid size={18} />
            Overview
          </NavLink>
          <NavLink to="/admin/appointments" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <CalendarDays size={18} />
            Appointments
          </NavLink>
          <NavLink to="/admin/patients" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <Users size={18} />
            Patient CRM
          </NavLink>
          <NavLink to="/admin/analytics" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <Activity size={18} />
            Analytics
          </NavLink>
          <NavLink to="/admin/search" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <Search size={18} />
            Search Records
          </NavLink>

          <div style={{ marginTop: 'auto' }}>
            <NavLink to="/admin/settings" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
              <Settings size={18} />
              Settings
            </NavLink>
            <div className="admin-nav-item" onClick={handleLogout} style={{ color: '#c53030', cursor: 'pointer' }}>
              <ArrowLeft size={18} />
              Logout
            </div>
          </div>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className="admin-content">
        <Outlet />
      </main>
    </motion.div>
  )
}
