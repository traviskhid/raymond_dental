import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import PatientWebsite from './pages/PatientWebsite'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'
import SplashScreen from './pages/SplashScreen'
import AdminLayout from './pages/admin/AdminLayout'
import AdminAppointments from './pages/admin/AdminAppointments'
import AdminPatients from './pages/admin/AdminPatients'
import AdminAnalytics from './pages/admin/AdminAnalytics'
import AdminSearch from './pages/admin/AdminSearch'
import AdminSettings from './pages/admin/AdminSettings'
import './App.css'

function AnimatedRoutes() {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PatientWebsite />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="patients" element={<AdminPatients />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="search" element={<AdminSearch />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Hide splash screen after 2.5 seconds
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2500)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <Router>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" />
        ) : (
          <AnimatedRoutes key="routes" />
        )}
      </AnimatePresence>
    </Router>
  )
}

export default App
