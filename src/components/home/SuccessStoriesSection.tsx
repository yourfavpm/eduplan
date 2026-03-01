"use client";

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Globe, GraduationCap } from 'lucide-react'
import Image from 'next/image'

type Testimonial = {
  id: string
  name: string
  country: string
  image: string
  testimonial: string
  destination: string
  program: string
}

const TEST_DATA: Testimonial[] = [
  {
    id: '1',
    name: 'Adewale Adebayo',
    country: 'Nigeria',
    image: '/images/testimonials/adewale.png',
    testimonial:
      "EduPlan360 guided me from shortlist to visa approval — seamless, professional and caring. I'm now studying at the University of Manchester.",
    destination: 'United Kingdom',
    program: 'MSc Management',
  },
  {
    id: '2',
    name: 'Chioma Okonkwo',
    country: 'Nigeria',
    image: '/images/testimonials/chioma.png',
    testimonial:
      "Their advisors matched me with the perfect program and helped secure my study permit. Highly recommend EduPlan360.",
    destination: 'Canada',
    program: 'BSc Computer Science',
  },
  {
    id: '3',
    name: 'Tunde Bakare',
    country: 'Nigeria',
    image: '/images/testimonials/tunde.png',
    testimonial:
      "Scholarship counselling was thorough and effective. I received an award that made studying in Australia possible.",
    destination: 'Australia',
    program: 'MA International Relations',
  },
  {
    id: '4',
    name: 'Maria Fernandes',
    country: 'Kenya',
    image: '/images/testimonials/maria.png',
    testimonial:
      "From application to arrival, EduPlan360 delivered a premium experience. My advisor was with me every step.",
    destination: 'Canada',
    program: 'MSc Data Science',
  },
]

export function SuccessStoriesSection() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0) // 1 for next, -1 for prev
  const isInteracting = useRef(false)
  const count = TEST_DATA.length

  const handleNext = useCallback(() => {
    setDirection(1)
    setIndex((prev: number) => (prev + 1) % count)
  }, [count])

  const handlePrev = useCallback(() => {
    setDirection(-1)
    setIndex((prev: number) => (prev - 1 + count) % count)
  }, [count])

  // Autoplay functionality
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isInteracting.current) {
        handleNext()
      }
    }, 6000)
    return () => clearInterval(timer)
  }, [handleNext])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNext, handlePrev])

  const active = TEST_DATA[index]

  // Animation variants for the central card
  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
      filter: 'blur(10px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        type: 'spring' as const,
        stiffness: 100,
        damping: 20,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.9,
      filter: 'blur(10px)',
      transition: {
        duration: 0.4,
      },
    }),
  }

  return (
    <section 
      aria-label="Success Stories" 
      className="relative py-24 md:py-32 bg-[#F8FAFC] overflow-hidden"
      onMouseEnter={() => (isInteracting.current = true)}
      onMouseLeave={() => (isInteracting.current = false)}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-brand-50 rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-indigo-50 rounded-full blur-[100px] opacity-60" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
              Success Stories
            </h2>
            <div className="w-20 h-1.5 bg-brand-500 mx-auto rounded-full mb-6" />
            <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto font-medium">
              Real students. Real results. Our community&apos;s journey to international success.
            </p>
          </motion.div>
        </div>

        <div className="relative mx-auto max-w-6xl">
          {/* Circular Path SVG - Desktop Only */}
          <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
            <svg viewBox="0 0 800 800" className="w-full h-full opacity-20">
              <circle
                cx="400"
                cy="400"
                r="350"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="2"
                strokeDasharray="8 12"
              />
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 relative">
            
            {/* Left: Avatar Ring (Mobile/Tablet: Horizontal, Desktop: Circular/Arc) */}
            <div className="order-2 lg:order-1 relative w-full lg:w-[450px] flex justify-center py-8">
              <div className="flex lg:grid lg:grid-cols-2 gap-4 md:gap-8 overflow-x-auto lg:overflow-visible no-scrollbar px-4">
                {TEST_DATA.map((item, i) => {
                  const isActive = i === index
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        setDirection(i > index ? 1 : -1)
                        setIndex(i)
                      }}
                    className={`relative group shrink-0 lg:shrink`}
                      initial={false}
                      animate={{
                        scale: isActive ? 1.1 : 0.95,
                        opacity: isActive ? 1 : 0.6,
                      }}
                      whileHover={{ scale: 1.05, opacity: 1 }}
                    >
                      <div className={`
                        w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden 
                        border-4 transition-all duration-300
                        ${isActive ? 'border-brand-500 shadow-xl' : 'border-white shadow-md'}
                      `}>
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          width={112}
                          height={112}
                          className="w-full h-full object-cover"
                        />
                        {isActive && (
                          <motion.div 
                            layoutId="active-ring"
                            className="absolute -inset-2 border-2 border-brand-500 rounded-[28px] opacity-30"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </div>
                      <div className={`mt-3 lg:hidden text-center transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                        <p className="text-sm font-bold text-slate-900 truncate w-20">{item.name}</p>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Right: Active Card */}
            <div className="order-1 lg:order-2 w-full lg:w-[600px] relative">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={active.id}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 100) handlePrev()
                    else if (info.offset.x < -100) handleNext()
                  }}
                  className="bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 p-8 md:p-12 relative overflow-hidden cursor-grab active:cursor-grabbing"
                >
                  {/* Decorative quote mark */}
                  <Quote className="absolute top-8 right-8 w-24 h-24 text-slate-50 opacity-10 pointer-events-none" />
                  
                  <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                    <div className="relative group">
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-8 border-slate-50 shadow-inner"
                      >
                        <Image 
                          src={active.image} 
                          alt={active.name} 
                          width={160}
                          height={160}
                          className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 transition-all duration-500"
                        />
                      </motion.div>
                      <div className="absolute -bottom-2 -right-2 bg-brand-500 text-white p-2.5 rounded-2xl shadow-lg">
                        <Globe className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="mb-6">
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1 leading-tight">
                          {active.name}
                        </h3>
                        <p className="text-brand-600 font-semibold text-sm flex items-center justify-center md:justify-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                          {active.country}
                        </p>
                      </div>

                      <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                          <Globe className="w-4 h-4 text-emerald-500" />
                          <span>Destination: <span className="text-slate-900">{active.destination}</span></span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                          <GraduationCap className="w-4 h-4 text-indigo-500" />
                          <span>Program: <span className="text-slate-900">{active.program}</span></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-2">
                    <div className="absolute top-0 left-0 w-8 h-0.5 bg-brand-200 rounded-full" />
                    <blockquote className="pt-6 text-slate-600 text-lg md:text-xl leading-relaxed italic font-serif">
                      &ldquo;{active.testimonial}&rdquo;
                    </blockquote>
                  </div>

                  <div className="mt-10 flex items-center justify-between">
                    <div className="flex gap-2">
                      {TEST_DATA.map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-1.5 transition-all duration-300 rounded-full ${i === index ? 'w-8 bg-brand-500' : 'w-2 bg-slate-200'}`}
                        />
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={handlePrev}
                        className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-brand-500 group transition-all"
                        aria-label="Previous story"
                      >
                        <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-brand-500" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center hover:bg-brand-600 transition-all shadow-lg"
                        aria-label="Next story"
                      >
                        <ChevronRight className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
