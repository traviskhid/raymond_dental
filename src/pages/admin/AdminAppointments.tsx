import { motion } from 'framer-motion'

const itemVariants: any = {
  initial: { opacity: 0, y: 10 },
  in: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function AdminAppointments() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <>
      <motion.div className="admin-header" variants={itemVariants} initial="initial" animate="in">
        <div>
          <p style={{ margin: '0 0 6px', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
            {today}
          </p>
          <h1>Appointments</h1>
        </div>
      </motion.div>
      <motion.div className="admin-panel" variants={itemVariants} initial="initial" animate="in">
        <p>Appointments content goes here.</p>
      </motion.div>
    </>
  )
}
