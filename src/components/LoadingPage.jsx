import { useMemo, useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';

const LoadingPage = () => {
    const [progress, setProgress] = useState(0);
    const particles = useMemo(() => ([
        { left: '8%', duration: 7.2, delay: 0.2 },
        { left: '22%', duration: 8.4, delay: 1.4 },
        { left: '38%', duration: 6.8, delay: 0.8 },
        { left: '56%', duration: 7.7, delay: 1.9 },
        { left: '73%', duration: 8.8, delay: 0.5 },
        { left: '89%', duration: 6.9, delay: 1.1 },
    ]), []);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) return 100;
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 150);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0a0f1a] overflow-hidden">
            {/* Background Animated Orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Floating Particles Simulation */}
            <div className="absolute inset-0 opacity-30">
                {particles.map((particle, i) => (
                    <Motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-emerald-400 rounded-full"
                        style={{ left: particle.left }}
                        initial={{ y: '100vh' }}
                        animate={{ y: '-10vh' }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: particle.delay
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Animated Icon/Logo */}
                <Motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-6"
                >
                    <div className="relative">
                        <div className="w-16 h-16 border-2 border-emerald-500/30 rounded-full animate-ping absolute inset-0" />
                        <div className="w-16 h-16 border border-emerald-500 rounded-full flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
                            <span className="text-2xl">🌱</span>
                        </div>
                    </div>
                </Motion.div>

                {/* Brand Name with Staggered Animation */}
                <div className="flex overflow-hidden mb-8">
                    <Motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase"
                    >
                        ECO<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">SURVIVE</span>
                    </Motion.h1>
                </div>

                {/* Progress Section */}
                <div className="w-72 md:w-96 group">
                    <div className="flex justify-between mb-2 px-1">
                        <span className="text-[10px] uppercase tracking-[0.4em] text-emerald-500/70 font-bold">System Initialization</span>
                        <span className="text-xs font-mono text-white/80">{Math.round(progress)}%</span>
                    </div>

                    <div className="h-[4px] w-full bg-white/5 rounded-full overflow-hidden backdrop-blur-md border border-white/10 p-[1px]">
                        <Motion.div
                            className="h-full bg-gradient-to-r from-emerald-500 via-green-400 to-cyan-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ type: 'spring', damping: 15 }}
                        />
                    </div>
                </div>

                {/* Dynamic Loading Text */}
                <Motion.p
                    key={Math.floor(progress / 30)}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 text-slate-500 text-[10px] uppercase tracking-[0.2em]"
                >
                    {progress < 30 && "Gathering carbon data..."}
                    {progress >= 30 && progress < 70 && "Optimizing bio-rhythms..."}
                    {progress >= 70 && progress < 100 && "Finalizing ecosystem..."}
                    {progress === 100 && "Ready to survive."}
                </Motion.p>
            </div>

            {/* Glassmorphism Decorative Bar */}
            <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        </div>
    );
};

export default LoadingPage;
