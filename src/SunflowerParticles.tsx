import React from "react";
import "./SunflowerParticles.css";

interface SunflowerParticlesProps {
  show: boolean;
}

const SunflowerParticles: React.FC<SunflowerParticlesProps> = ({ show }) => {
  if (!show) return null;
  return (
    <div className="sunflower-particles">
      {[...Array(9)].map((_, i) => (
        <div key={i} className={`sunflower-particle sunflower-particle--${i + 1}`}></div>
      ))}
    </div>
  );
};

export default SunflowerParticles;
