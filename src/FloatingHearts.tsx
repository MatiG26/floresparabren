import React from "react";
import "./FloatingHearts.css";

const isMobile = window.innerWidth <= 600;
const HEART_COUNT = isMobile ? 8 : 18;
const COLORS = ["#ff69b4", "#ffb6c1", "#ff85a1", "#ff4fa3", "#ffb3de"];

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = React.useState<{
    left: string;
    size: number;
    duration: number;
    delay: number;
    color: string;
    key: number;
    rotate: number;
  }[]>([]);

  React.useEffect(() => {
    // Generar corazones con posiciones, tamaños y animaciones aleatorias
    const newHearts = Array.from({ length: HEART_COUNT }, () => ({
      left: `${randomBetween(2, 98)}vw`,
      size: randomBetween(18, 38),
      duration: randomBetween(7, 14),
      delay: randomBetween(0, 8),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      key: Math.random(),
      rotate: randomBetween(-30, 30),
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="floating-hearts-container">
      {hearts.map(h => (
        <span
          key={h.key}
          className="floating-heart"
          style={{
            left: h.left,
            width: h.size,
            height: h.size,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            transform: `rotate(${h.rotate}deg)`
          }}
        >
          <svg viewBox="0 0 32 29" width={h.size} height={h.size} style={{ display: "block" }}>
            <path
              d="M23.6,2.6c-2.6,0-4.9,1.7-5.6,4.1C17.3,4.3,15,2.6,12.4,2.6C8.4,2.6,5,6,5,10c0,7.2,11,15.4,11,15.4S27,17.2,27,10C27,6,23.6,2.6,23.6,2.6z"
              fill={h.color}
              stroke="#fff"
              strokeWidth="1.2"
              style={{ filter: "drop-shadow(0 2px 8px #ffb6c1)" }}
            />
          </svg>
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
