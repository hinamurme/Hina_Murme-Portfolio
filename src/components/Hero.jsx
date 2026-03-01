"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentRole, setCurrentRole] = useState(0);
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Typing roles animation
  const roles = [
    "MERN Stack Developer",
    "Full-Stack Web Developer",
    "REST API Specialist",
    "Authentication System Developer",
    "Responsive UI Builder",
    "MongoDB Database Developer"
  ];

  // Role cycling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Initialize floating particles with connections
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const particles = [];
    const colors = ["#FF6B9D", "#4D96FF", "#6BCF7F", "#FFD166", "#A277FF"];

    // Mouse position for particle interaction
    let mouse = { x: null, y: null, radius: 150 };

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.baseSize = this.size;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.density = Math.random() * 30 + 1;
      }

      update() {
        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = dx / distance;
            const directionY = dy / distance;

            this.x -= directionX * force * 2;
            this.y -= directionY * force * 2;
          }
        }

        // Bounce off walls
        if (this.x > canvas.width) {
          this.x = 0;
          this.y = Math.random() * canvas.height;
        } else if (this.x < 0) {
          this.x = canvas.width;
          this.y = Math.random() * canvas.height;
        }
        if (this.y > canvas.height) {
          this.y = 0;
          this.x = Math.random() * canvas.width;
        } else if (this.y < 0) {
          this.y = canvas.height;
          this.x = Math.random() * canvas.width;
        }

        // Natural movement
        this.x += this.speedX;
        this.y += this.speedY;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Create particles
    const particleCount = Math.min(
      60,
      Math.floor((canvas.width * canvas.height) / 10000),
    );
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Draw connections between particles
    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      drawConnections();
      requestAnimationFrame(animate);
    }

    animate();

    // Mouse move handler for canvas
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.x - rect.left;
      mouse.y = e.y - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);
    setIsLoaded(true);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Stats data
  const stats = [
    {
      label: "Internship Experience",
      value: "6 Months",
      icon: "💼",
      color: "text-cyan-400",
    },
    {
      label: "Full-Stack Projects",
      value: "4+",
      icon: "🚀",
      color: "text-purple-400",
    },
    {
      label: "REST APIs Built",
      value: "15+",
      icon: "🔗",
      color: "text-pink-400",
    },
    {
      label: "Core Technologies",
      value: "MERN",
      icon: "⚙️",
      color: "text-green-400",
    },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Animated gradient background with improved effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-cyan-900/20"></div>

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Interactive Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-30" />

      {/* Mouse interaction glow */}
      <motion.div
        className="fixed pointer-events-none z-0"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="w-96 h-96 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Main content with responsive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left Column - Main content (visible on both mobile and desktop) */}
          <div className="lg:col-span-2 space-y-10 lg:space-y-10">
            {/* Tagline with animation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            ></motion.div>

            {/* Hero Title with typing effect */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              ></motion.h1>

              {/* Animated role */}
              <motion.div
                key={currentRole}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-semibold"
              >
                {roles[currentRole]}
              </motion.div>
            </div>

            {/* Profile Image - Mobile Only (after role, before description) */}
            <div className="block lg:hidden">
              <ProfileImage />
            </div>

            {/* Description with modern styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="max-w-2xl"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                Enthusiastic{" "}
                <span className="text-cyan-300 font-semibold">
                  MERN Stack Developer
                </span>{" "}
                with practical experience in developing
                <span className="text-pink-300 font-semibold">
                  {" "}
                  RESTful APIs
                </span>
                , implementing
                <span className="text-purple-300 font-semibold">
                  {" "}
                  JWT authentication
                </span>
                , and building responsive web applications using
                <span className="text-cyan-300 font-semibold">
                  {" "}
                  React.js
                </span>{" "}
                and
                <span className="text-purple-300 font-semibold"> Node.js</span>.
                Looking to leverage my technical skills and internship
                experience to contribute to innovative projects and grow as a
                full-stack developer.
              </p>
            </motion.div>

            {/* CTA Buttons with unique styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.a
                href="/HinaMurme.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold overflow-hidden shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-white/30 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <span className="font-bold">Download Resume</span>
                  <motion.svg
                    className="h-5 w-5"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </motion.svg>
                </div>
              </motion.a>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="#projects"
                  className="group relative px-8 py-4 rounded-xl border-2 border-cyan-400/30 text-cyan-300 font-semibold overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-2">
                    <span className="font-bold">Start a Project</span>
                    <motion.svg
                      className="h-5 w-5"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </motion.svg>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Profile - Desktop Only */}
          <div className="hidden lg:block lg:col-span-1">
            <ProfileImage />
          </div>
        </div>

        {/* Enhanced Stats at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 pt-8 border-t border-gray-800/50"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{stat.icon}</span>
                    <div className="text-xs text-gray-500 group-hover:text-cyan-400 transition-colors">
                      #{index + 1}
                    </div>
                  </div>
                  <div
                    className={`text-3xl md:text-4xl font-bold ${stat.color} mb-1`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
          onClick={() => {
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <div className="text-gray-500 text-sm mb-2 animate-pulse">
            Scroll to explore
          </div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-8 h-14 border-2 border-gray-700 rounded-full flex justify-center p-1 hover:border-cyan-500/50 transition-colors"
          >
            <div className="w-1.5 h-4 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full mt-2"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Profile Image Component (extracted to maintain animations and avoid duplication)
function ProfileImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
      className="relative flex justify-center"
    >
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80">
        {/* Profile image container */}
        <div className="relative w-full h-full lg:right-12 lg:-top-6">
          {/* Decorative shapes */}
          <motion.div
            className="absolute -top-3 -left-3 w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full blur-xl opacity-50"
            animate={{ y: [0, -20, 0], rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-3xl blur-xl opacity-50"
            animate={{ y: [0, 20, 0], rotate: [360, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 0.5 }}
          />

          {/* Main Profile Circle */}
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-xl"></div>

            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl">
              {/* Image with parallax effect */}
              <motion.div
                className="relative w-full h-full"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 10, repeat: Infinity }}
              >
                <Image
                  src="/pic.jpg"
                  alt="Hina Murme"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-transparent to-cyan-500/20"></div>
              </motion.div>
            </div>
          </div>

          {/* Floating Badge 1 */}
          <motion.div
            className="absolute -top-3 -right-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg backdrop-blur-sm"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⚡
              </motion.span>
              Available
            </span>
          </motion.div>

          {/* Floating Badge 2 */}
          <motion.div
            className="absolute -bottom-3 -left-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg backdrop-blur-sm"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          >
            <span className="flex items-center gap-2">🏆 50+ Projects</span>
          </motion.div>
        </div>
      </div>

      {/* Floating code snippet */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1, type: "spring" }}
        className="absolute -bottom-8 -right-8 bg-gray-900/90 backdrop-blur-sm rounded-xl p-4 border border-gray-700 shadow-2xl max-w-xs hidden lg:block"
      >
        <div className="flex items-center gap-2 mb-3">
          <motion.div
            className="w-3 h-3 bg-red-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="w-3 h-3 bg-yellow-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-3 h-3 bg-green-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
          />
        </div>
        <div className="text-xs font-mono">
          <div className="text-cyan-400">// Building the future</div>
          <div className="flex items-center gap-1">
            <span className="text-pink-400">const</span>
            <span className="text-purple-400">innovation</span>
            <span className="text-gray-400">=</span>
            <motion.span
              className="text-green-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              "Code × Design"
            </motion.span>
            <span className="text-yellow-400">;</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}