"use client";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

export function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 5; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          speed: Math.random() * 0.5 + 0.2,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
      setParticles(newParticles);
    };

    createParticles();

    const animate = () => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          y: particle.y + particle.speed,
          x: particle.x + Math.sin(particle.y * 0.01) * 0.5,
        }))
      );
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}
