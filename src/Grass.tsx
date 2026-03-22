import React from "react";
import "./GrassAnimated.css";

const bladeCount = 9;

const Grass: React.FC<{ animate?: boolean }> = ({ animate = false }) => (
  <div className="grass-strip">
    {[...Array(bladeCount)].map((_, i) => (
      <div
        key={i}
        className={`grass-blade grass-blade--${i + 1}`}
        style={{
          animationPlayState: animate ? "running" : "paused",
        }}
      ></div>
    ))}
  </div>
);

export default Grass;
