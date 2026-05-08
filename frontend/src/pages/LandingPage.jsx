import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, UploadCloud, ShieldCheck, Zap } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen pt-20 flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyberpunk-neonPurple/20 rounded-full blur-[120px] -z-10"></div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-display font-extrabold tracking-tight mb-8"
        >
          Reconnect People With Their <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-neonBlue via-cyberpunk-neonPurple to-cyberpunk-accentPink">
            Lost Belongings
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl text-white/70 max-w-2xl mb-12"
        >
          Powered by AI and a next-generation platform. Report lost items or upload found items instantly to our global registry.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Link to="/register" className="btn-neon-blue flex items-center justify-center gap-2 text-lg px-8 py-4">
            <Search className="w-5 h-5" /> Report Lost Item
          </Link>
          <Link to="/register" className="btn-neon-purple flex items-center justify-center gap-2 text-lg px-8 py-4">
            <UploadCloud className="w-5 h-5" /> Upload Found Item
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-black/40 py-24 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Why Choose Us?</h2>
            <div className="w-24 h-1 bg-cyberpunk-neonBlue mx-auto rounded-full shadow-neon-blue"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -10 }} className="glass-panel p-8 text-center border-t-2 border-t-cyberpunk-neonBlue">
              <div className="w-16 h-16 rounded-full bg-cyberpunk-neonBlue/20 flex items-center justify-center mx-auto mb-6 shadow-neon-blue">
                <Zap className="w-8 h-8 text-cyberpunk-neonBlue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-white/60">Our real-time database connects found items with their owners in milliseconds.</p>
            </motion.div>
            
            <motion.div whileHover={{ y: -10 }} className="glass-panel p-8 text-center border-t-2 border-t-cyberpunk-neonPurple">
              <div className="w-16 h-16 rounded-full bg-cyberpunk-neonPurple/20 flex items-center justify-center mx-auto mb-6 shadow-neon-purple">
                <ShieldCheck className="w-8 h-8 text-cyberpunk-neonPurple" />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure & Private</h3>
              <p className="text-white/60">Your data is encrypted. Contact information is only shared securely when a match is verified.</p>
            </motion.div>
            
            <motion.div whileHover={{ y: -10 }} className="glass-panel p-8 text-center border-t-2 border-t-cyberpunk-accentPink">
              <div className="w-16 h-16 rounded-full bg-cyberpunk-accentPink/20 flex items-center justify-center mx-auto mb-6 shadow-neon-pink">
                <Search className="w-8 h-8 text-cyberpunk-accentPink" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Matching</h3>
              <p className="text-white/60">Advanced search algorithms help categorize and filter through items effectively.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
