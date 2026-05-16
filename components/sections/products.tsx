"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Monitor, Sun, Layers, Car, ArrowRight } from "lucide-react"

const categories = [
  {
    id: "indoor",
    name: "Indoor Displays",
    description: "Ultra-fine pitch screens crafted for high-end retail, corporate, and broadcast environments.",
    products: [
      { name: "HD Fine Pitch LED", image: "/images/prod_1.webp" },
      { name: "Retail & Showroom LED", image: "/images/prod_2.webp" },
      { name: "Front Service Modules", image: "/images/prod_7.webp" },
      { name: "Seamless LCD Video Walls", image: "/images/prod_18.webp" },
    ]
  },
  {
    id: "outdoor",
    name: "Outdoor Solutions",
    description: "Weatherproof displays built to perform flawlessly in extreme climates and direct sunlight.",
    products: [
      { name: "DIP Billboard LED", image: "/images/prod_3.webp" },
      { name: "SMD Outdoor Display", image: "/images/prod_4.webp" },
      { name: "Die-Cast Rental LED", image: "/images/prod_5.webp" },
      { name: "Stadium Perimeter", image: "/images/prod_11.webp" },
    ]
  },
  {
    id: "specialty",
    name: "Specialty Screens",
    description: "Creative shapes, transparent glass, and interactive floors for bespoke structural installations.",
    products: [
      { name: "Transparent Glass LED", image: "/images/prod_10.webp" },
      { name: "Curved & Flexible LED", image: "/images/prod_12.webp" },
      { name: "Interactive Floor LED", image: "/images/prod_8.webp" },
      { name: "Creative Shape Modules", image: "/images/prod_14.webp" },
    ]
  },
  {
    id: "niche",
    name: "Niche Applications",
    description: "RTA-approved and municipality-compliant signage engineered for specialized industry needs.",
    products: [
      { name: "Gas Station Price LED", image: "/images/prod_15.webp" },
      { name: "Taxi Rooftop Display", image: "/images/prod_16.webp" },
      { name: "Traffic & VMS Boards", image: "/images/prod_17.webp" },
      { name: "Poster & Standalone", image: "/images/prod_9.webp" },
    ]
  }
]

export function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" })
  const [activeTab, setActiveTab] = useState(categories[0].id)

  const activeCategory = categories.find(c => c.id === activeTab)!

  return (
    <section 
      ref={sectionRef}
      id="products" 
      className="bg-[#050505] relative overflow-hidden min-h-[100svh] flex flex-col justify-center py-12 lg:py-0"
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E60000] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[var(--container-max)] mx-auto px-[var(--section-pad-x)] relative z-10 w-full">
        
        {/* Massive Typography Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 lg:mb-16"
        >
          <p className="font-sans text-[0.65rem] font-bold tracking-[0.25em] text-[#E60000] uppercase mb-4">
            Our Technologies
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,4vw,4rem)] font-medium text-white leading-[1.05] tracking-tight max-w-4xl">
            Engineered to <span className="text-white/40 italic">captivate.</span>
          </h2>
        </motion.div>

        {/* Interactive Split Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Left: Category Tabs */}
          <div className="lg:w-[40%] flex flex-col w-full">
            {categories.map((category, idx) => {
              const isActive = activeTab === category.id
              return (
                <div key={category.id} className="border-t border-white/10 last:border-b">
                  <button
                    onClick={() => setActiveTab(category.id)}
                    className="w-full text-left py-5 lg:py-6 group"
                  >
                    <div className="flex items-start gap-4 lg:gap-6">
                      <span className={`
                        font-sans text-xs font-bold tracking-widest mt-1.5 transition-colors duration-500
                        ${isActive ? 'text-[#E60000]' : 'text-white/20 group-hover:text-white/50'}
                      `}>
                        0{idx + 1}
                      </span>
                      <div className="flex-1">
                        <h3 className={`
                          font-serif text-[clamp(1.5rem,2.5vw,2.2rem)] font-light leading-tight transition-all duration-500
                          ${isActive ? 'text-white' : 'text-white/30 group-hover:text-white/60'}
                        `}>
                          {category.name}
                        </h3>
                        
                        {/* Expandable Content */}
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4 pb-1">
                                <p className="font-sans text-[0.9rem] text-white/60 leading-relaxed max-w-md">
                                  {category.description}
                                </p>
                                <div className="mt-5">
                                  <a 
                                    href="#contact" 
                                    className="inline-flex items-center gap-2 font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase text-white hover:text-[#E60000] transition-colors"
                                  >
                                    <span className="w-6 h-[1px] bg-current" />
                                    Explore Specs
                                  </a>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </button>
                </div>
              )
            })}
          </div>

          {/* Right: Compact Stunning Gallery */}
          <div className="lg:w-[60%] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98, filter: "blur(2px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.02, filter: "blur(2px)" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-2 gap-4 lg:gap-6"
              >
                {activeCategory.products.map((prod, idx) => (
                  <div 
                    key={prod.name} 
                    className="group flex flex-col gap-3"
                  >
                    <div className="relative aspect-[4/3] rounded-[16px] lg:rounded-[20px] overflow-hidden bg-[#111111] border border-white/5 shadow-2xl">
                      <Image 
                        src={prod.image}
                        alt={prod.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105"
                        width={600} 
                        height={450}
                        loading={idx < 2 ? "eager" : "lazy"}
                      />
                      {/* Elegant dark gradient overlay to frame the image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent opacity-80" />
                    </div>
                    
                    <div className="flex items-center justify-between px-1">
                       <h4 className="font-sans text-[0.95rem] font-medium text-white tracking-wide">
                         {prod.name}
                       </h4>
                       <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[0.16,1,0.3,1]">
                         <ArrowRight className="w-3 h-3 text-white" />
                       </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </section>
  )
}
