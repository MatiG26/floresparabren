import React from "react";
import "./SunflowerLeaves.css";

interface SunflowerLeavesProps {
  animate: boolean;
  leafCount?: number;
}

const SunflowerLeaves: React.FC<SunflowerLeavesProps> = ({ animate, leafCount = 4 }) => {
  return (
    <div className={`sunflower-leaves${animate ? " sunflower-leaves-bloom" : ""}`}>
      {[...Array(leafCount)].map((_, i) => (
        <div key={i} className={`sunflower-leaf sunflower-leaf--${i + 1}`}></div>
      ))}
    </div>
  );
};

export default SunflowerLeaves;
