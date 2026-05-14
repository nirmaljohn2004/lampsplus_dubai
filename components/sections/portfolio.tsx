"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

const featuredProjects = [
  { name: "ADNOC Headquarters", category: "Government", location: "Abu Dhabi", image: "/images/proj_adnoc_1774784409133.webp" },
  { name: "Dubai Cricket Stadium", category: "Sports Venue", location: "Dubai", image: "/images/proj_cricket_1774784549601.webp" },
  { name: "Wafi Mall", category: "Retail & Leisure", location: "Dubai", image: "/images/proj_wafi_1774784593202.webp" },
  { name: "Rove Hotels Group", category: "Hospitality", location: "Dubai", image: "/images/proj_rove.webp" },
  { name: "Expo 2020 Dubai", category: "Global Event", location: "Dubai", image: "/images/proj_expo.webp" },
  { name: "GEMS Schools UAE", category: "Education", location: "Multiple", image: "/images/proj_gems.webp" },
  { name: "Parliament Palace", category: "Government", location: "Abu Dhabi", image: "/images/proj_parliament.webp" },
]

export function PortfolioSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const isHovering = useRef(false)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Scroll-based auto-activation via IntersectionObserver — debounced to avoid rapid flipping
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    rowRefs.current.forEach((el, idx) => {
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isHovering.current) {
            // Clear any pending update and wait 150ms before committing
            if (debounceTimer.current) clearTimeout(debounceTimer.current)
            debounceTimer.current = setTimeout(() => {
              setActiveIndex(idx)
            }, 150)
          }
        },
        { threshold: 0.6 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => {
      observers.forEach((o) => o.disconnect())
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [])

  const handleMouseEnter = (idx: number) => {
    isHovering.current = true
    setActiveIndex(idx)
  }

  const handleMouseLeave = () => {
    isHovering.current = false
  }

  // Clicking the left image panel cycles to next project
  const handleImageClick = () => {
    setActiveIndex((prev) => (prev + 1) % featuredProjects.length)
  }

  const activeProject = featuredProjects[activeIndex]

  return (
    <section 
      id="projects" 
      className="py-24 sm:py-32 bg-[var(--bg-primary)]"
    >
      <div className="max-w-[var(--container-max)] mx-auto px-[var(--section-pad-x)]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <p className="font-sans text-[0.65rem] font-bold tracking-[0.25em] text-[#E000D0] uppercase mb-4">Our Work</p>
            <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] font-normal text-white">
              Selected Projects
            </h2>
            <p className="mt-4 font-sans text-lg text-white/60">
              A curated look at some of our recent installations across the UAE.
            </p>
          </div>
          <a
            href="#contact"
            className="group flex items-center gap-2 font-sans text-sm text-white/80 hover:text-white transition-colors pb-2 border-b border-white/20 hover:border-white self-start md:self-end"
          >
            View Full Portfolio <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>

        {/* Desktop Interactive Layout */}
        <div className="hidden lg:flex gap-20 relative items-start">
          
          {/* Left: Sticky Image — clicking cycles to next */}
          <div 
            className="w-1/2 sticky top-32 h-[70vh] overflow-hidden bg-white/5 rounded-[12px] cursor-pointer group/img"
            onClick={handleImageClick}
            title="Click to see next project"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.name}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image 
                  src={activeProject.image}
                  alt={activeProject.name}
                  className="w-full h-full object-cover"
                  width={800} height={1000}
                  priority
                />
                {/* Click hint overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-3 rounded-full text-white text-sm font-sans font-medium">
                    <ArrowRight className="w-4 h-4" /> Next Project
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Project counter */}
            <div className="absolute bottom-5 right-5 z-10 font-sans text-white/60 text-xs tracking-widest">
              {String(activeIndex + 1).padStart(2, '0')} / {String(featuredProjects.length).padStart(2, '0')}
            </div>
          </div>

          {/* Right: Scrolling Project List */}
          <div 
            className="w-1/2 flex flex-col pb-32"
            onMouseLeave={handleMouseLeave}
          >
            {featuredProjects.map((project, idx) => {
              const isActive = activeIndex === idx
              return (
                <div 
                  key={project.name}
                  ref={(el) => { rowRefs.current[idx] = el }}
                  onMouseEnter={() => handleMouseEnter(idx)}
                  className={`
                    py-10 border-b border-white/10 cursor-pointer group transition-all duration-300
                    ${idx === 0 ? 'border-t' : ''}
                    ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'}
                  `}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-serif text-3xl xl:text-4xl font-normal text-white">
                      {project.name}
                    </h3>
                    <ArrowUpRight className={`w-6 h-6 text-white/40 transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0 -translate-y-0' : 'opacity-0'}`} />
                  </div>
                  <div className="mt-3 flex gap-3 font-sans text-sm text-white/70">
                    <span>{project.category}</span>
                    <span className="opacity-50">—</span>
                    <span>{project.location}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col gap-16">
          {featuredProjects.map((project) => (
            <div key={project.name} className="flex flex-col gap-4">
              <div className="relative aspect-[4/3] bg-white/5 rounded-[8px] overflow-hidden">
                <Image 
                  src={project.image}
                  alt={project.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  width={600} height={450}
                />
              </div>
              <div className="px-1">
                <h3 className="font-serif text-2xl font-normal text-white mb-1">{project.name}</h3>
                <div className="flex items-center gap-2 font-sans text-sm text-white/60">
                  <span>{project.category}</span>
                  <span>—</span>
                  <span>{project.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
