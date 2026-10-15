import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, CheckCircle2 } from 'lucide-react'
import smileBefore from '../assets/smile-before.jpg'
import smileAfter from '../assets/smile-after.jpg'

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100)
    setSliderPosition(percent)
  }, [])

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    updatePosition(e.clientX)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      updatePosition(e.clientX)
    }
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false)
    try {
      ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {
      // Ignored if capture already released
    }
  }

  return (
    <div className="before-after-wrapper">
      {/* Visual Header */}
      <div className="ba-header">
        <span className="ba-tag">Clinical Case 01</span>
        <span className="ba-subtag">Full Aesthetic Smile Restoration</span>
      </div>

      {/* Slider Container with Clip Path */}
      <div
        ref={containerRef}
        className="ba-slider-container"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        role="slider"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
      >
        {/* After Image (Full background layer) */}
        <img
          src={smileAfter}
          alt="Smile after aesthetic porcelain veneers and whitening"
          className="ba-img ba-img-after"
          draggable={false}
        />
        <div className="ba-label ba-label-after">After Treatment</div>

        {/* Before Image (Revealed on left via clip-path) */}
        <img
          src={smileBefore}
          alt="Smile before treatment"
          className="ba-img ba-img-before"
          style={{
            clipPath: `inset(0 calc(100% - ${sliderPosition}%) 0 0)`,
            WebkitClipPath: `inset(0 calc(100% - ${sliderPosition}%) 0 0)`,
          }}
          draggable={false}
        />
        <div
          className="ba-label ba-label-before"
          style={{ opacity: sliderPosition > 15 ? 1 : 0 }}
        >
          Before
        </div>

        {/* Divider line & Circular Draggable Handle */}
        <div
          className="ba-divider-line"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="ba-drag-knob">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Preset Controls & Case Highlights */}
      <div className="ba-footer">
        <div className="ba-btn-group">
          <button
            type="button"
            className={`ba-preset-btn ${sliderPosition >= 95 ? 'active' : ''}`}
            onClick={() => setSliderPosition(100)}
          >
            Show Before
          </button>
          <button
            type="button"
            className={`ba-preset-btn ${sliderPosition > 40 && sliderPosition < 60 ? 'active' : ''}`}
            onClick={() => setSliderPosition(50)}
          >
            50 / 50 Comparison
          </button>
          <button
            type="button"
            className={`ba-preset-btn ${sliderPosition <= 5 ? 'active' : ''}`}
            onClick={() => setSliderPosition(0)}
          >
            Show After
          </button>
        </div>

        <motion.div
          className="ba-metrics"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="metric-chip">
            <Sparkles size={14} className="metric-icon" />
            <span>Sculpted E.max Veneers</span>
          </div>
          <div className="metric-chip">
            <CheckCircle2 size={14} className="metric-icon" />
            <span>Digital Shade Matching: Shade BL1</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
