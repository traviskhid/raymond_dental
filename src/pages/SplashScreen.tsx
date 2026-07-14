import { motion } from 'framer-motion'
import { HeartPulse } from 'lucide-react'

const SplashScreen = () => {
  return (
    <motion.div
      className="splash-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="splash-icon-wrapper">
        {/* Outer glowing rings */}
        <motion.div
          className="splash-ring-1"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 2, opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
          className="splash-ring-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 2.5, opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, delay: 0.4, repeat: Infinity, ease: "easeOut" }}
        />
        
        {/* Core Icon */}
        <motion.div
          className="splash-icon-core"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 1.5,
          }}
        >
          <HeartPulse size={40} color="#ffffff" />
        </motion.div>
      </div>

      <motion.h1
        className="splash-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        RAYMOND'S<span>DENTAL CLINIC</span>
      </motion.h1>

      {/* Loading bar */}
      <div className="splash-loading-bar-container">
        <motion.div
          className="splash-loading-bar"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  )
}

export default SplashScreen
