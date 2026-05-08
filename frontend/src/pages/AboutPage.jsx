import React from 'react';
import { motion } from 'framer-motion';
import { Users, Code, Terminal, Cpu } from 'lucide-react';

const AboutPage = () => {
  const developers = ['Ayush', 'Tanvi', 'Aditya', 'Jiya'];

  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center p-4">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyberpunk-neonBlue/10 rounded-full blur-[120px] -z-10"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full"
      >
        <div className="text-center mb-12">
          <h1 className="text-5xl font-display font-extrabold text-white mb-4">About the Project</h1>
          <div className="w-24 h-1 bg-cyberpunk-neonBlue mx-auto rounded-full shadow-neon-blue mb-6"></div>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Lost & Found is a next-generation platform designed to reconnect individuals with their lost belongings using a seamless, secure, and intuitive digital registry.
          </p>
        </div>

        <div className="glass-panel p-8 md:p-12 border-t-4 border-t-cyberpunk-neonPurple">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-cyberpunk-neonPurple/20 rounded-xl shadow-neon-purple">
              <Users className="w-8 h-8 text-cyberpunk-neonPurple" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Meet the Developers</h2>
              <p className="text-white/50 text-sm tracking-widest uppercase mt-1">Core Engineering Team</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {developers.map((name, index) => (
              <motion.div 
                key={name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                whileHover={{ y: -5, borderColor: 'rgba(123, 47, 247, 0.5)' }}
                className="bg-black/40 border border-white/10 rounded-xl p-6 text-center group transition-all"
              >
                <div className="w-16 h-16 mx-auto bg-cyberpunk-bg border-2 border-cyberpunk-neonPurple/30 rounded-full flex items-center justify-center mb-4 group-hover:border-cyberpunk-neonPurple group-hover:shadow-neon-purple transition-all">
                  <Code className="w-6 h-6 text-cyberpunk-neonPurple" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyberpunk-neonPurple transition-colors">{name}</h3>
                <p className="text-xs text-white/40 mt-2 font-mono">Software Engineer</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8 text-white/60">
            <div className="flex gap-4 items-start">
              <Terminal className="w-6 h-6 text-cyberpunk-neonBlue flex-shrink-0 mt-1" />
              <p className="text-sm leading-relaxed">
                Built with modern web technologies including React, Tailwind CSS, Node.js, and MongoDB. The architecture is designed for scalability and real-time responsiveness.
              </p>
            </div>
            <div className="flex gap-4 items-start">
              <Cpu className="w-6 h-6 text-cyberpunk-accentPink flex-shrink-0 mt-1" />
              <p className="text-sm leading-relaxed">
                Our vision is to leverage technology to build trust and community by providing a secure database for logging and recovering critical personal items.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
