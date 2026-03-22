import React from "react";
import "./AnimatedFlower.css";

interface AnimatedFlowerProps {
  type?: 1 | 2 | 3;
  style?: React.CSSProperties;
}

const leavesCount = { 1: 6, 2: 4, 3: 4 };

const AnimatedFlower: React.FC<AnimatedFlowerProps> = ({ type = 1, style = {} }) => (
  <div className={`flower flower--${type}`} style={style}>
    <div className={`flower__leafs flower__leafs--${type}`}>
      {[1,2,3,4].map(i => (
        <div key={i} className={`flower__leaf flower__leaf--${i}`}></div>
      ))}
      <div className="flower__white-circle"></div>
      {[1,2,3,4,5,6,7,8].map(i => (
        <div key={i} className={`flower__light flower__light--${i}`}></div>
      ))}
    </div>
    <div className="flower__line">
      {Array.from({length: leavesCount[type]}, (_,i) => (
        <div key={i} className={`flower__line__leaf flower__line__leaf--${i+1}`}></div>
      ))}
    </div>
  </div>
);

export default AnimatedFlower;
