import React from "react";
import "./SunflowerStem.css";

interface SunflowerStemProps {
  height?: number;
  width?: number;
  style?: React.CSSProperties;
}

const SunflowerStem: React.FC<SunflowerStemProps> = ({
  height = 240,
  width = 16,
  style = {},
}) => (
  <div
    className="sunflower-stem-realistic"
    style={{ height, width, ...style }}
  ></div>
);

export default SunflowerStem;
