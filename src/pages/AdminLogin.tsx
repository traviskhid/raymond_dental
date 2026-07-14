import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, Lock, User, ArrowRight } from 'lucide-react'

const AdminLogin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Default credentials for now
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isAdminAuthenticated', 'true')
      navigate('/admin')
    } else {
      setError('Invalid credentials. Try admin/admin.')
    }
  }

  return (
    <div className="login-container">
      {/* Background decorations */}
      <div className="login-bg-decor-1" />
      <div className="login-bg-decor-2" />
      
      <motion.div 
        className="login-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-header">
          <div className="login-icon">
            <Shield size={32} />
          </div>
          <h2>Admin Portal</h2>
          <p>Sign in to manage Raymond's Dental Clinic</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div>
            <label className="login-label" htmlFor="username">
              Username
            </label>
            <div className="login-input-wrapper">
              <div className="login-input-icon">
                <User size={20} />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-input"
                placeholder="admin"
                required
              />
            </div>
          </div>

          <div>
            <label className="login-label" htmlFor="password">
              Password
            </label>
            <div className="login-input-wrapper">
              <div className="login-input-icon">
                <Lock size={20} />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="login-error"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            className="login-button"
          >
            Sign In
            <ArrowRight size={16} />
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default AdminLogin
