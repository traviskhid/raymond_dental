import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Maximize2,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Camera,
  Layers,
  CheckCircle2,
} from 'lucide-react'

import clinicOperatory from '../assets/clinic-operatory.jpg'
import clinicLounge from '../assets/clinic-lounge.jpg'
import clinicScanner from '../assets/clinic-scanner.jpg'

interface MediaItem {
  id: string
  title: string
  category: 'suites' | 'technology' | 'lounge' | 'video'
  type: 'image' | 'video'
  src: string
  tag: string
  description: string
  features: string[]
}

const mediaItems: MediaItem[] = [
  {
    id: 'operatory-1',
    title: 'Presidential Treatment Suite',
    category: 'suites',
    type: 'image',
    src: clinicOperatory,
    tag: 'Surgical & Cosmetic Suite',
    description:
      'Ergonomic Italian leather patient chairs, ultra-low noise dental delivery units, and floor-to-ceiling garden views designed to alleviate dental anxiety.',
    features: ['Panoramic ambient lighting', 'Ceiling entertainment displays', 'Sterile airflow HEPA system'],
  },
  {
    id: 'scanner-1',
    title: '3D Intraoral Digital Mapping',
    category: 'technology',
    type: 'image',
    src: clinicScanner,
    tag: 'Next-Gen Diagnostics',
    description:
      'Eliminating conventional silicone putty impressions with 20-micron digital optical laser scans for perfect porcelain veneer and crown precision.',
    features: ['Instant 3D smile visualization', 'Zero gag reflex impressions', 'Same-day digital lab milling'],
  },
  {
    id: 'lounge-1',
    title: 'Serenity Reception & Lounge',
    category: 'lounge',
    type: 'image',
    src: clinicLounge,
    tag: 'Patient Experience',
    description:
      'Curated hospitality environment featuring Italian bouclé seating, ambient architectural fluted acoustics, and warm hospitality concierge service.',
    features: ['Bespoke organic herbal refreshments', 'Acoustically isolated private booths', 'Dedicated patient concierge'],
  },
]

export default function MediaGallery() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [isPlayingVideo, setIsPlayingVideo] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const filteredItems =
    activeCategory === 'all'
      ? mediaItems
      : mediaItems.filter((item) => item.category === activeCategory)

  return (
    <section className="section-card media-section" id="media-gallery">
      <div className="section-heading">
        <p className="eyebrow">Virtual Tour & Visual Archive</p>
        <h2>Experience our state-of-the-art dental facility.</h2>
        <p className="section-copy" style={{ margin: '8px auto 0', maxWidth: '640px' }}>
          Explore our clinical suites, advanced 3D scanning equipment, and peaceful patient environments crafted for unparalleled comfort.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="media-filter-bar">
        {[
          { key: 'all', label: 'All Spaces', icon: Layers },
          { key: 'suites', label: 'Operatory Suites', icon: Camera },
          { key: 'technology', label: '3D Technology', icon: Sparkles },
          { key: 'lounge', label: 'Serenity Lounge', icon: Camera },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeCategory === tab.key
          return (
            <button
              key={tab.key}
              type="button"
              className={`media-filter-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveCategory(tab.key)}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Media Grid */}
      <motion.div layout className="media-grid">
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              className="media-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              onClick={() => setSelectedItem(item)}
            >
              <div className="media-thumbnail-wrapper">
                <img src={item.src} alt={item.title} className="media-thumbnail" />
                <div className="media-overlay">
                  <span className="media-zoom-btn">
                    <Maximize2 size={18} />
                  </span>
                  <div className="media-badge">{item.tag}</div>
                </div>
              </div>
              <div className="media-caption">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <div className="media-tags">
                  {item.features.slice(0, 2).map((feat, idx) => (
                    <span key={idx} className="tag-chip">
                      <CheckCircle2 size={12} /> {feat}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Interactive Video Showcase Card */}
      <div className="video-showcase-container">
        <div className="video-player-card">
          <div className="video-viewport">
            <img
              src={clinicOperatory}
              alt="Virtual Clinic Video Tour Preview"
              className={`video-preview-bg ${isPlayingVideo ? 'playing-glow' : ''}`}
            />
            <div className="video-overlay-gradient"></div>

            {/* Video Controls overlay */}
            <div className="video-center-cta">
              <button
                type="button"
                className={`video-play-btn ${isPlayingVideo ? 'is-playing' : ''}`}
                onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                aria-label={isPlayingVideo ? 'Pause Video' : 'Play Video'}
              >
                {isPlayingVideo ? <Pause size={28} /> : <Play size={28} style={{ marginLeft: 3 }} />}
              </button>
              <div className="video-cta-text">
                <span className="live-badge">
                  <span className="live-dot"></span>
                  4K ULTRA HD
                </span>
                <h3>Raymond's Dental Clinic • Architectural & Clinical Walkthrough</h3>
                <p>Take an immersive 3-minute video journey through our practice philosophy and treatment flow.</p>
              </div>
            </div>

            {/* Bottom Playback HUD Bar */}
            <div className="video-hud">
              <div className="video-progress-bar">
                <div
                  className="video-progress-fill"
                  style={{ width: isPlayingVideo ? '65%' : '0%' }}
                ></div>
              </div>
              <div className="video-hud-actions">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    type="button"
                    className="hud-icon-btn"
                    onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                  >
                    {isPlayingVideo ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <button
                    type="button"
                    className="hud-icon-btn"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <span className="hud-time">{isPlayingVideo ? '01:48 / 02:45' : '00:00 / 02:45'}</span>
                </div>
                <span className="hud-tag">High-Precision Micro-Dentistry</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="lightbox-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="lightbox-close"
                onClick={() => setSelectedItem(null)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="lightbox-media-container">
                <img
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  className="lightbox-full-image"
                />
              </div>

              <div className="lightbox-details">
                <div className="lightbox-eyebrow">{selectedItem.tag}</div>
                <h3>{selectedItem.title}</h3>
                <p>{selectedItem.description}</p>

                <div className="lightbox-features">
                  <h4>Facility Standards & Features:</h4>
                  <ul>
                    {selectedItem.features.map((feat, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={16} color="var(--color-accent-dark)" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
