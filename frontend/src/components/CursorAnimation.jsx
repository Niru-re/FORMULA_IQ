import React, { useState, useEffect } from 'react';

const CursorAnimation = () => {
    const [particles, setParticles] = useState([]);
    const characters = ['✨', '🫧', '🧴', '🧴', '🧴', '💧', '🌸', '☀️', '❄️', '🌧️'];

    useEffect(() => {
        const handleInteraction = (e) => {
            const x = e.clientX || (e.touches && e.touches[0].clientX);
            const y = e.clientY || (e.touches && e.touches[0].clientY);
            
            if (!x || !y) return;

            const newParticle = {
                id: Date.now(),
                x,
                y,
                char: characters[Math.floor(Math.random() * characters.length)],
                size: Math.random() * 20 + 10,
                angle: Math.random() * Math.PI * 2,
                velocity: Math.random() * 2 + 1
            };

            setParticles(prev => [...prev.slice(-15), newParticle]);
        };

        window.addEventListener('mousemove', handleInteraction);
        window.addEventListener('click', handleInteraction);
        window.addEventListener('touchstart', handleInteraction);

        return () => {
            window.removeEventListener('mousemove', handleInteraction);
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setParticles(prev => prev.filter(p => Date.now() - p.id < 1000));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="cursor-animation-layer">
            {particles.map(p => (
                <span 
                    key={p.id} 
                    className="particle"
                    style={{
                        left: p.x,
                        top: p.y,
                        fontSize: `${p.size}px`,
                        '--angle': `${p.angle}rad`,
                        '--velocity': `${p.velocity}`
                    }}
                >
                    {p.char}
                </span>
            ))}
            <style>{`
                .cursor-animation-layer {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 9999;
                    overflow: hidden;
                }
                .particle {
                    position: absolute;
                    user-select: none;
                    animation: float-out 1s forwards ease-out;
                    opacity: 1;
                }
                @keyframes float-out {
                    to {
                        transform: translate(calc(cos(var(--angle)) * 50px * var(--velocity)), 
                                         calc(sin(var(--angle)) * 50px * var(--velocity)));
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
};

export default CursorAnimation;
