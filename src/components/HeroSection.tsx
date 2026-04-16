import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Database, Zap, Server, BarChart3 } from "lucide-react";
import { ThreeDCard } from "./3d/ThreeDCard";
import { ThreeDIcon } from "./3d/ThreeDIcon";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Decorative 3D Elements */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-teal/10 rounded-full blur-[100px] animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-10 gap-12 items-center relative z-10">
        {/* Left 70% */}
        <motion.div
          initial={{ opacity: 0, x: -60, rotateY: -10 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="lg:col-span-7 space-y-8"
          style={{ perspective: 1200 }}
        >
          <div className="flex items-center gap-4 mb-2">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
            >
              <ThreeDIcon icon={Database} size={28} color="hsl(var(--primary))" />
            </motion.div>
            <div className="h-px w-16 bg-gradient-to-r from-primary to-transparent" />
            <span className="text-sm tracking-[0.4em] text-primary uppercase font-heading font-medium">
              Data Systems Architect
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-black leading-[0.85] tracking-tighter">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="gradient-text inline-block"
            >
              Sowjanya
            </motion.span>
            <br />
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-foreground inline-block"
            >
              Allam
            </motion.span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="max-w-2xl text-muted-foreground font-body text-lg md:text-xl leading-relaxed border-l-2 border-primary/20 pl-6"
          >
            Engineering robust data ecosystems using <span className="text-foreground font-semibold">Azure & SnowFlake</span>. 
            Transforming raw data into high-velocity insights through specialized <span className="text-primary italic">Lakehouse architectures</span>.
          </motion.p>

          <div className="flex flex-wrap gap-6 pt-4">
            <motion.a
              whileHover={{ scale: 1.05, translateZ: 20 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
              className="px-8 py-4 rounded-xl gradient-bg text-accent-foreground font-heading text-base font-bold transition-all shadow-xl hover:shadow-primary/20 flex items-center gap-3 group"
            >
              <ThreeDIcon icon={Server} size={18} color="white" className="group-hover:rotate-12 transition-transform" />
              Explore Infrastructure
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, translateZ: 20 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf"
              download
              className="px-8 py-4 rounded-xl border-2 border-primary/20 text-primary font-heading text-base font-bold hover:bg-primary/5 transition-all flex items-center gap-3"
            >
              <ThreeDIcon icon={Download} size={18} color="hsl(var(--primary))" />
              Get Resume
            </motion.a>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-border/10 mt-10">
            {[
              { label: "Years in Data", value: "4+", icon: Zap, color: "hsl(var(--primary))" },
              { label: "Data Scaled", value: "4TB+", icon: BarChart3, color: "hsl(var(--electric))" },
              { label: "Stability Rate", value: "99.9%", icon: Database, color: "hsl(var(--teal))" },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + (i * 0.1) }}
                className="flex items-center gap-4 group"
              >
                <div className="p-3 rounded-lg bg-secondary/30 group-hover:bg-primary/10 transition-colors">
                  <ThreeDIcon icon={stat.icon} size={24} color={stat.color} />
                </div>
                <div>
                  <p className="text-3xl font-heading font-black tracking-tight">{stat.value}</p>
                  <p className="text-xs text-muted-foreground font-body uppercase tracking-widest">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="pt-10 flex justify-center lg:justify-start"
          >
            <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center">
              <ArrowDown size={18} className="text-primary" />
            </div>
          </motion.div>
        </motion.div>

        {/* Right 30% - Profile image */}
        <div className="lg:col-span-3 relative hidden lg:flex items-center justify-center">
          <ThreeDCard className="w-full aspect-[4/5]">
            <div className="relative h-full w-full rounded-2xl overflow-hidden border-2 border-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-secondary/20 backdrop-blur-sm">
              <img
                src="/image.png"
                alt="Sowjanya Allam - Profile"
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              
              {/* Floating ID badge */}
              <div 
                className="absolute bottom-6 left-6 right-6 p-4 glass rounded-xl border border-white/10 shadow-2xl"
                style={{ transform: "translateZ(30px)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-heading font-bold">Status</p>
                    <p className="text-sm font-heading font-bold">Open for Innovation</p>
                  </div>
                </div>
              </div>
            </div>
          </ThreeDCard>
          
          {/* Background decoration */}
          <div className="absolute -top-10 -right-10 w-40 h-40 border-t-2 border-r-2 border-primary/10 rounded-tr-3xl -z-10" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 border-b-2 border-l-2 border-primary/10 rounded-bl-3xl -z-10" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

