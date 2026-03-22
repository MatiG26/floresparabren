import React from "react";
import "./SunflowerParticles.css";

const MESSAGE = "Flores amarillas para el amor de mi vida";
const TYPE_SPEED = 60; // ms por letra
const PARTICLE_INTERVAL = 90; // ms

const AnimatedTitleWithParticles: React.FC = () => {
  const [displayed, setDisplayed] = React.useState("");
  const [particleKey, setParticleKey] = React.useState(0);
  const [typing, setTyping] = React.useState(true);

  React.useEffect(() => {
    let i = 0;
    let typingTimeout: number;
    let particleInterval: number; // corregido: let
    function typeNext() {
      if (i < MESSAGE.length) {
        setDisplayed(MESSAGE.slice(0, i + 1));
        i++;
        typingTimeout = window.setTimeout(typeNext, TYPE_SPEED);
      } else {
        setTyping(false);
      }
    }
    typeNext();
    // Lanzar partículas mientras se escribe
    particleInterval = window.setInterval(() => {
      setParticleKey(k => k + 1);
    }, PARTICLE_INTERVAL);
    return () => {
      clearTimeout(typingTimeout);
      clearInterval(particleInterval);
    };
  }, []);

  React.useEffect(() => {
    if (!typing) {
      // Detener partículas cuando termina de escribir
      setTimeout(() => setParticleKey(-1), 800);
    }
  }, [typing]);

  return (
    <div style={{
      position: "absolute",
      top: 200,
      left: 0,
      width: "100vw",
      textAlign: "center",
      zIndex: 100,
      fontFamily: "'Pacifico', cursive, sans-serif",
      fontSize: "2.2rem",
      color: "#ffe066",
      textShadow: "0 2px 8px #a67c2e, 0 0px 32px #fffde4",
      letterSpacing: "1.5px",
      marginTop: "2.2rem",
      userSelect: "none",
      pointerEvents: "none"
    }}>
      {displayed}
      {/* Partículas animadas sobre el texto */}
      {typing && <ParticlesFromText key={particleKey} />}
    </div>
  );
};

// Partículas que aparecen desde el texto
const ParticlesFromText: React.FC = () => {
  const [particles, setParticles] = React.useState<{
    left: string;
    delay: string;
    key: number;
  }[]>([]);

  React.useEffect(() => {
    // Generar 5 partículas con posiciones y delays aleatorios
    const newParticles = Array.from({ length: 5 }, () => ({
      left: `${10 + Math.random() * 80}%`,
      delay: `${Math.random() * 0.3}s`,
      key: Math.random(),
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="sunflower-particles" style={{ top: "2.8rem", left: 0, width: "100%", pointerEvents: "none" }}>
      {particles.map(p => (
        <div
          key={p.key}
          className="sunflower-particle"
          style={{
            left: p.left,
            bottom: "-10px",
            animationDelay: p.delay,
            zIndex: 200,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedTitleWithParticles;
