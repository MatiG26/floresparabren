import React from "react";
import "./AnimatedGrass.css";

// Más hojas, más densidad, menor altura y variedad de verdes
const GRASS_BLADE_COUNT = 60;
const GRASS_COLORS = [
  "#7ed957", "#4e8c2b", "#00b815", "#6fcf97", "#3e5c13", "#a8e063"
];

const realGrassBlades = Array.from({ length: GRASS_BLADE_COUNT }, (_, i) => {
  const left = `${(i * 1.6 + Math.random() * 1.2)}vw`;
  const delay = `${0.1 + Math.random() * 0.8}s`;
  const angle = `${-12 + Math.random() * 24}deg`;
  const height = `${18 + Math.random() * 18}px`;
  const color = GRASS_COLORS[Math.floor(Math.random() * GRASS_COLORS.length)];
  const width = `${2.5 + Math.random() * 2.5}px`;
  return (
    <div
      key={i}
      className="real-grass-blade short-beauty"
      style={{
        left,
        height,
        width,
        background: `linear-gradient(to top, ${color} 60%, #eaffd0 100%)`,
        '--delay': delay,
        '--angle': angle,
        opacity: 0.92 + Math.random() * 0.08,
        borderRadius: '0 0 8px 8px',
        boxShadow: '0 2px 6px 0 #3e5c1320',
      } as React.CSSProperties}
    />
  );
});

const AnimatedGrass: React.FC = () => (
  <div className="growing-grass short-grass">
    {realGrassBlades}
  </div>
);

export default AnimatedGrass;
