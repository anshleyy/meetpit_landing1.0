"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, Environment } from "@react-three/drei"
import { Suspense, useRef, useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Play,
  Mic,
  Brain,
  CheckCircle,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Chrome,
  Slack,
  FileText,
  Users,
  Zap,
  BarChart3,
  Upload,
  Lightbulb,
  Share2,
  RefreshCw,
} from "lucide-react"
import { motion } from "framer-motion"

// Enhanced 3D Background Component with more prominent elements
function Background3D() {
  const meshRef = useRef()
  const particlesRef = useRef()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Create particle network with more particles
  const particleCount = 80
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < particleCount; i++) {
      temp.push({
        position: [(Math.random() - 0.5) * 25, (Math.random() - 0.5) * 25, (Math.random() - 0.5) * 25],
        scale: Math.random() * 0.8 + 0.3,
        speed: Math.random() * 0.03 + 0.01,
      })
    }
    return temp
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.position.x = mousePosition.x * 0.8
      meshRef.current.position.y = mousePosition.y * 0.5
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.08
      particlesRef.current.position.x = mousePosition.x * 0.3
      particlesRef.current.position.y = mousePosition.y * 0.2
    }
  })

  return (
    <>
      <Environment preset="dawn" />
      <ambientLight intensity={0.8} />
      <pointLight position={[15, 15, 15]} intensity={1.5} color="#8FBC8F" />
      <pointLight position={[-15, -15, -15]} intensity={1.2} color="#DDA0DD" />
      <pointLight position={[0, 20, 0]} intensity={1} color="#F5DEB3" />

      {/* Enhanced Neural Network Particles */}
      <group ref={particlesRef}>
        {particles.map((particle, index) => (
          <Float key={index} speed={particle.speed * 12} rotationIntensity={0.3} floatIntensity={0.4}>
            <mesh position={particle.position} scale={particle.scale}>
              <sphereGeometry args={[0.12, 20, 20]} />
              <meshStandardMaterial
                color="#8FBC8F"
                transparent
                opacity={0.8}
                emissive="#8FBC8F"
                emissiveIntensity={0.3}
                metalness={0.2}
                roughness={0.3}
              />
            </mesh>
          </Float>
        ))}
      </group>

      {/* Enhanced Audio Waveform Rings */}
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.6}>
        <mesh ref={meshRef} position={[4, 3, -6]} rotation={[0.6, 0.6, 0]}>
          <torusGeometry args={[2.5, 0.15, 20, 120]} />
          <meshStandardMaterial
            color="#8FBC8F"
            transparent
            opacity={0.6}
            emissive="#8FBC8F"
            emissiveIntensity={0.2}
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.4}>
        <mesh position={[-4, -2, -4]} rotation={[0.3, 1, 0.2]}>
          <torusGeometry args={[2, 0.12, 20, 120]} />
          <meshStandardMaterial
            color="#DDA0DD"
            transparent
            opacity={0.7}
            emissive="#DDA0DD"
            emissiveIntensity={0.2}
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>
      </Float>

      <Float speed={2.2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 4, -10]} rotation={[0.4, 0.4, 0.4]}>
          <torusGeometry args={[1.5, 0.1, 20, 120]} />
          <meshStandardMaterial
            color="#F5DEB3"
            transparent
            opacity={0.5}
            emissive="#F5DEB3"
            emissiveIntensity={0.15}
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>
      </Float>

      {/* Additional geometric shapes for more visual interest */}
      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh position={[6, -3, -8]} rotation={[0.2, 0.2, 0.2]}>
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial
            color="#8FBC8F"
            transparent
            opacity={0.4}
            emissive="#8FBC8F"
            emissiveIntensity={0.1}
            wireframe
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.4}>
        <mesh position={[-5, 4, -7]} rotation={[0.3, 0.3, 0.3]}>
          <icosahedronGeometry args={[0.8]} />
          <meshStandardMaterial
            color="#DDA0DD"
            transparent
            opacity={0.3}
            emissive="#DDA0DD"
            emissiveIntensity={0.1}
            wireframe
          />
        </mesh>
      </Float>

      {/* Enhanced Connection Lines */}
      <group>
        {particles.slice(0, 30).map((particle, index) => {
          const nextParticle = particles[(index + 1) % 30]
          return (
            <line key={`line-${index}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([...particle.position, ...nextParticle.position])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#8FBC8F" transparent opacity={0.3} />
            </line>
          )
        })}
      </group>
    </>
  )
}

// Hero Section Component with left-right layout
function HeroSection() {
  const [showDemo, setShowDemo] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-sage-50 via-cream-100 to-blush-100">
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <Suspense fallback={null}>
            <Background3D />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-sage-600 via-sage-500 to-blush-500 bg-clip-text text-transparent">
              MeetPit.ai —
            </h1>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-sage-600">
              Where Meetings Turn into Momentum
            </h2>

            <p className="text-lg md:text-xl text-brown-600 mb-8 max-w-xl">
              Record, Summarize, and Sync with Slack, Notion & GitHub in One Click. Transform your meetings into
              actionable insights with AI-powered automation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-sage-600 to-blush-500 hover:from-sage-700 hover:to-blush-600 text-white px-8 py-3 shadow-lg"
              >
                <Chrome className="mr-2 h-5 w-5" />
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-brown-400 text-brown-700 hover:bg-brown-50 px-8 py-3"
                onClick={() => setShowDemo(true)}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </motion.div>

          {/* Right Side - Meeting Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative max-w-lg w-full">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-sage-200 shadow-2xl">
                {/* Browser Header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="flex-1 bg-gray-100 rounded px-2 py-1 text-xs text-gray-600 ml-3">
                    meet.google.com/abc-defg-hij
                  </div>
                </div>

                {/* Meeting Interface */}
                <div className="bg-gray-900 rounded-lg p-3 mb-3">
                  {/* Participants Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {[1, 2, 3, 4].map((participant) => (
                      <motion.div
                        key={participant}
                        className="bg-gray-800 rounded-lg p-2 relative"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + participant * 0.1, duration: 0.5 }}
                      >
                        <motion.div
                          className="w-8 h-8 bg-gradient-to-br from-sage-400 to-blush-400 rounded-full mx-auto mb-1 flex items-center justify-center text-white text-xs font-semibold"
                          animate={{
                            scale: participant <= 2 ? [1, 1.1, 1] : 1,
                            boxShadow:
                              participant <= 2
                                ? [
                                    "0 0 0 0 rgba(143, 188, 143, 0.7)",
                                    "0 0 0 10px rgba(143, 188, 143, 0)",
                                    "0 0 0 0 rgba(143, 188, 143, 0)",
                                  ]
                                : "0 0 0 0 rgba(143, 188, 143, 0)",
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: participant * 0.3,
                          }}
                        >
                          {String.fromCharCode(64 + participant)}
                        </motion.div>
                        <div className="text-white text-xs text-center">User {participant}</div>
                        {participant <= 2 && (
                          <motion.div
                            className="absolute bottom-1 right-1 w-2 h-2 bg-green-400 rounded-full"
                            animate={{
                              opacity: [0.5, 1, 0.5],
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              repeat: Number.POSITIVE_INFINITY,
                              duration: 2,
                              delay: participant * 0.3,
                            }}
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Meeting Controls */}
                  <div className="flex justify-center items-center gap-3 mb-3">
                    <motion.button
                      className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Mic className="h-4 w-4 text-white" />
                    </motion.button>
                    <motion.button
                      className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(239, 68, 68, 0.7)",
                          "0 0 0 8px rgba(239, 68, 68, 0)",
                          "0 0 0 0 rgba(239, 68, 68, 0)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <div className="w-3 h-3 bg-white rounded-sm"></div>
                    </motion.button>
                    <motion.button
                      className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Users className="h-4 w-4 text-white" />
                    </motion.button>
                  </div>
                </div>

                {/* MeetPit Extension Popup */}
                <motion.div
                  className="bg-gradient-to-r from-sage-100 to-blush-100 rounded-lg p-3 border border-sage-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-5 h-5 bg-gradient-to-r from-sage-500 to-blush-400 rounded flex items-center justify-center"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <span className="text-white text-xs font-bold">M</span>
                      </motion.div>
                      <span className="font-semibold text-brown-800 text-sm">MeetPit.ai Extension</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <motion.div
                        className="w-1.5 h-1.5 bg-green-400 rounded-full"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      />
                      <span className="text-xs text-brown-600">Recording</span>
                    </div>
                  </div>

                  {/* Enhanced Audio Waveform */}
                  <div className="flex items-center justify-center gap-1 mb-3">
                    {[...Array(15)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-0.5 bg-gradient-to-t from-sage-500 to-blush-400 rounded-full"
                        animate={{
                          height: [6, 20, 6],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 1.5,
                          delay: i * 0.08,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>

                  {/* Action Items */}
                  <div className="space-y-2 mb-3">
                    <motion.div
                      className="bg-white/80 rounded px-2 py-1 text-xs flex items-center gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5, duration: 0.5 }}
                    >
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-brown-700">AI Summary</span>
                    </motion.div>
                    <motion.div
                      className="bg-white/80 rounded px-2 py-1 text-xs flex items-center gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.7, duration: 0.5 }}
                    >
                      <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                      <span className="text-brown-700">Action Items</span>
                    </motion.div>
                  </div>

                  <motion.div
                    className="text-center"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <p className="text-xs text-brown-700 mb-1">AI is processing your meeting...</p>
                    <div className="flex justify-center gap-1 items-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <Brain className="h-3 w-3 text-blush-500" />
                      </motion.div>
                      <span className="text-xs text-brown-600">Whisper + Gemini</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-4xl w-full mx-4">
            <Button
              variant="ghost"
              size="sm"
              className="absolute -top-12 right-0 text-white hover:bg-white/20"
              onClick={() => setShowDemo(false)}
            >
              ✕
            </Button>
            <video controls autoPlay className="w-full rounded-lg" src="/demo-video.mp4">
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </section>
  )
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-amber-600" />,
      title: "Instant Summaries",
      description: "Whisper → Gemini summarizes in seconds",
      bgColor: "bg-gradient-to-br from-cream-200 to-amber-100",
      textColor: "text-brown-800",
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-sage-600" />,
      title: "Action Item Sync",
      description: "Auto-create Notion tasks with assignees & due dates",
      bgColor: "bg-gradient-to-br from-sage-200 to-sage-100",
      textColor: "text-brown-800",
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Daily Standups",
      description: "Auto-pull GitHub & Notion, post team updates to Slack",
      bgColor: "bg-gradient-to-br from-blue-100 to-blue-50",
      textColor: "text-brown-800",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-blush-600" />,
      title: "Unified Workflow UI",
      description: "Chrome extension: Meeting & Standup tabs, real-time sync",
      bgColor: "bg-gradient-to-br from-blush-200 to-blush-100",
      textColor: "text-brown-800",
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-cream-50 to-sage-50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-sage-600 to-blush-500 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-brown-600 max-w-2xl mx-auto">
            Everything you need to transform your meetings into actionable insights
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card
                className={`${feature.bgColor} border-sage-200 hover:border-sage-300 transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className={`text-xl font-semibold mb-3 ${feature.textColor}`}>{feature.title}</h3>
                  <p className="text-brown-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Enhanced How It Works Section
function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Record or Upload",
      description: "Use our Chrome extension to record meetings or upload audio files directly.",
      icon: <Upload className="h-6 w-6" />,
      mainIcon: <Mic className="h-8 w-8" />,
      bgColor: "bg-gradient-to-br from-blue-100 to-blue-50",
      iconBg: "bg-blue-500",
    },
    {
      number: "02",
      title: "AI Transcribes & Summarizes",
      description: "Whisper transcribes audio while Gemini creates intelligent summaries and action items.",
      icon: <Brain className="h-6 w-6" />,
      mainIcon: <Lightbulb className="h-8 w-8" />,
      bgColor: "bg-gradient-to-br from-yellow-100 to-yellow-50",
      iconBg: "bg-yellow-500",
    },
    {
      number: "03",
      title: "Publish & Sync",
      description: "Automatically post summaries to Slack and create organized tasks in Notion.",
      icon: <Slack className="h-6 w-6" />,
      mainIcon: <Share2 className="h-8 w-8" />,
      bgColor: "bg-gradient-to-br from-green-100 to-green-50",
      iconBg: "bg-green-500",
    },
    {
      number: "04",
      title: "Automated Standup",
      description: "Unified agent pulls from GitHub & Notion, summarizes with Gemini, and posts team updates to Slack.",
      icon: <Github className="h-6 w-6" />,
      mainIcon: <RefreshCw className="h-8 w-8" />,
      bgColor: "bg-gradient-to-br from-purple-100 to-purple-50",
      iconBg: "bg-purple-500",
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-sage-50 to-blush-50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-sage-600 to-blush-500 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-brown-600 max-w-2xl mx-auto">
            Simple, automated workflow that saves hours every week
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <Card
                className={`${step.bgColor} border-sage-200 shadow-lg hover:shadow-xl transition-all duration-500 group`}
              >
                <CardContent className="p-6 text-center relative overflow-hidden">
                  {/* Background Icon */}
                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <div className="text-4xl">{step.mainIcon}</div>
                  </div>

                  {/* Small Icon */}
                  <div
                    className={`w-10 h-10 ${step.iconBg} rounded-full flex items-center justify-center mb-4 mx-auto text-white shadow-lg`}
                  >
                    {step.icon}
                  </div>

                  {/* Step Number */}
                  <motion.div
                    className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-sage-500 to-blush-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.number}
                  </motion.div>

                  <h3 className="text-xl font-semibold mb-3 text-brown-800">{step.title}</h3>
                  <p className="text-brown-600 text-sm leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>

              {/* Enhanced Arrow with Animation */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <motion.div
                    initial={{ opacity: 0.5, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.3 + 0.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      repeatDelay: 2,
                    }}
                    className="flex items-center"
                  >
                    <div className="w-8 h-0.5 bg-gradient-to-r from-sage-400 to-blush-300 rounded-full"></div>
                    <ArrowRight className="h-5 w-5 text-sage-500 ml-1" />
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Enhanced Architecture Section
function ArchitectureSection() {
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 4)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const architectureNodes = [
    {
      id: "extension",
      title: "Chrome Extension",
      subtitle: "Meeting Capture & Upload",
      icon: <Chrome className="h-8 w-8 text-white" />,
      gradient: "from-sage-400 to-brown-400",
      position: { row: 1, col: 1 },
    },
    {
      id: "api",
      title: "Summarization & Dispatch Engine",
      subtitle: "FastAPI + Gemini",
      icon: (
        <div className="h-8 w-8 bg-white rounded flex items-center justify-center">
          <span className="text-xs font-bold text-sage-600">API</span>
        </div>
      ),
      gradient: "from-sage-500 to-sage-400",
      position: { row: 1, col: 2 },
    },
    {
      id: "ai",
      title: "Whisper | Gemini",
      subtitle: "Transcription & Summarization (Gemini)",
      icon: (
        <div className="flex gap-1">
          <div className="w-4 h-4 bg-sage-300 rounded text-xs flex items-center justify-center text-sage-800 font-bold">
            AI
          </div>
          <div className="w-4 h-4 bg-blush-300 rounded text-xs flex items-center justify-center text-blush-800 font-bold">
            ML
          </div>
        </div>
      ),
      gradient: "from-blush-400 to-sage-400",
      position: { row: 1, col: 3 },
    },
    {
      id: "standup",
      title: "Auto Standup Agent",
      subtitle: "Progress Aggregator (Gemini)",
      icon: <RefreshCw className="h-8 w-8 text-white" />,
      gradient: "from-purple-400 to-purple-200",
      position: { row: 2, col: 2 },
    },
    {
      id: "notion",
      title: "Notion DB",
      subtitle: "Task Management",
      icon: <FileText className="h-8 w-8 text-white" />,
      gradient: "from-brown-400 to-blush-400",
      position: { row: 2, col: 1 },
    },
    {
      id: "slack",
      title: "Slack",
      subtitle: "Team Communication",
      icon: <Slack className="h-8 w-8 text-white" />,
      gradient: "from-sage-500 to-sage-400",
      position: { row: 2, col: 3 },
    },
    {
      id: "github",
      title: "GitHub",
      subtitle: "Code Repository",
      icon: <Github className="h-8 w-8 text-white" />,
      gradient: "from-gray-600 to-gray-500",
      position: { row: 3, col: 2 },
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-blush-50 to-cream-50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-sage-600 to-blush-500 bg-clip-text text-transparent">
            System Architecture
          </h2>
          <p className="text-xl text-brown-600 max-w-2xl mx-auto">
            A robust, scalable system designed for seamless integration and reliability.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Architecture Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Top Row */}
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {architectureNodes
                .filter((node) => node.position.row === 1)
                .map((node, index) => (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="relative"
                  >
                    <Card className="bg-white/90 backdrop-blur-sm border-sage-200 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6 text-center">
                        <div
                          className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${node.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                        >
                          {node.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-brown-800 mb-2">{node.title}</h3>
                        <p className="text-sm text-brown-600">{node.subtitle}</p>
                      </CardContent>
                    </Card>

                    {/* Horizontal Arrows */}
                    {index < 2 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                        <motion.div
                          initial={{ opacity: 0.3 }}
                          animate={{
                            opacity: animationStep >= index ? 1 : 0.3,
                            scale: animationStep >= index ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <ArrowRight className="h-6 w-6 text-sage-500" />
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                ))}
            </div>

            {/* Vertical Arrow */}
            <div className="md:col-span-3 flex justify-center mb-8">
              <motion.div
                initial={{ opacity: 0.3 }}
                animate={{
                  opacity: animationStep >= 2 ? 1 : 0.3,
                  y: animationStep >= 2 ? [0, 10, 0] : 0,
                }}
                transition={{
                  duration: 0.5,
                  repeat: animationStep >= 2 ? Number.POSITIVE_INFINITY : 0,
                  repeatDelay: 1,
                }}
              >
                <div className="w-0.5 h-12 bg-gradient-to-b from-sage-400 to-blush-400 rounded-full"></div>
                <div className="flex justify-center mt-2">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-sage-400"></div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Row */}
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
              {architectureNodes
                .filter((node) => node.position.row === 2)
                .map((node, index) => (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: (index + 3) * 0.2 }}
                  >
                    <Card className="bg-white/90 backdrop-blur-sm border-sage-200 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6 text-center">
                        <div
                          className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${node.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                        >
                          {node.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-brown-800 mb-2">{node.title}</h3>
                        <p className="text-sm text-brown-600">{node.subtitle}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Enhanced Seamless Integrations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-12 border border-sage-200"
          >
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-sage-600 to-blush-500 bg-clip-text text-transparent">
              Seamless Integrations
            </h3>
            <p className="text-lg text-brown-600 mb-8 max-w-2xl mx-auto">
              Connect with the tools your team already loves and uses every day.
            </p>
            <div className="flex justify-center items-center gap-12">
              <motion.div whileHover={{ scale: 1.1, y: -5 }} className="text-center group">
                <div className="w-20 h-20 bg-gray-600 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-green-500 transition-all duration-300 shadow-lg">
                  <span className="text-white text-2xl font-bold">#</span>
                </div>
                <p className="font-semibold text-brown-800">Slack</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, y: -5 }} className="text-center group">
                <div className="w-20 h-20 bg-gray-600 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-blue-500 transition-all duration-300 shadow-lg">
                  <span className="text-white text-2xl font-bold">N</span>
                </div>
                <p className="font-semibold text-brown-800">Notion</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, y: -5 }} className="text-center group">
                <div className="w-20 h-20 bg-gray-600 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-gray-800 transition-all duration-300 shadow-lg">
                  <Github className="h-10 w-10 text-white" />
                </div>
                <p className="font-semibold text-brown-800">GitHub</p>
              </motion.div>
            </div>

            {/* Integration Flow */}
            <div className="mt-12 p-6 bg-sage-50 rounded-xl border border-sage-200">
              <h4 className="text-lg font-semibold text-brown-800 mb-4">Integration Flow</h4>
              <div className="flex items-center justify-center gap-4 text-sm text-brown-600">
                <span className="px-3 py-1 bg-blue-100 rounded-full">Notion Tasks</span>
                <ArrowRight className="h-4 w-4" />
                <span className="px-3 py-1 bg-gray-100 rounded-full">GitHub Issues</span>
                <ArrowRight className="h-4 w-4" />
                <span className="px-3 py-1 bg-green-100 rounded-full">Slack Updates</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12 px-4 bg-gradient-to-b from-cream-50 to-brown-100 border-t border-sage-200">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-sage-600 to-blush-500 bg-clip-text text-transparent mb-2">
              MeetPit.ai
            </h3>
            <p className="text-brown-600">Where Meetings Turn into Momentum</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="text-brown-600 hover:text-brown-800 transition-colors font-medium">
              Docs
            </a>
            <a href="#" className="text-brown-600 hover:text-brown-800 transition-colors font-medium">
              GitHub
            </a>
            <a href="#" className="text-brown-600 hover:text-brown-800 transition-colors font-medium">
              Contact
            </a>
            <a href="#" className="text-brown-600 hover:text-brown-800 transition-colors font-medium">
              Privacy Policy
            </a>
          </div>

          <div className="flex gap-4">
            <Button variant="ghost" size="sm" className="text-brown-600 hover:text-brown-800 hover:bg-sage-100">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-brown-600 hover:text-brown-800 hover:bg-sage-100">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-brown-600 hover:text-brown-800 hover:bg-sage-100">
              <Github className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-sage-200 text-center text-brown-500">
          <p>&copy; 2024 MeetPit.ai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Main Page Component
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ArchitectureSection />
      <Footer />
    </div>
  )
}
