import React from "react";
import "./Sunflower.css";

interface SunflowerProps {
  petalCount?: number;
  petalColor?: string;
  petalGradient?: string;
  petalWidth?: number;
  petalHeight?: number;
  centerSize?: number;
  style?: React.CSSProperties;
  showCenter?: boolean;
  showPetals?: boolean;
}

const DEFAULT_GRADIENT =
  "linear-gradient(180deg, #fffde4 0%, #ffe066 40%, #ffd700 70%, #ffb300 90%, #ffb347 100%)";

const Sunflower: React.FC<SunflowerProps> = ({
  petalCount = 20,
  petalGradient = DEFAULT_GRADIENT,
  petalWidth = 48,
  petalHeight = 110,
  centerSize = 80,
  style = {},
  showCenter = true,
  showPetals = true,
}) => {
  const PETAL_ROTATION = 360 / petalCount;
  return (
    <div className="sunflower-single-flower" style={style}>
      {showPetals &&
        [...Array(petalCount)].map((_, i) => (
          <div
            key={i}
            className="sunflower-single-petal"
            style={{
              width: petalWidth,
              height: petalHeight,
              background: petalGradient,
              border: `1.5px solid #bfa76a`, // borde visible y sutil
              boxShadow: '0 2px 8px 0 #bfa10030',
              transform: `translate(-50%, -50%) rotate(${i * PETAL_ROTATION}deg) scale(1, 1.1)`,
              ...( { ['--petal-rot']: `${i * PETAL_ROTATION}deg` } as Record<string, string|number> ),
            }}
          ></div>
        ))}
      {showCenter && (
        <>
          <div
            className="sunflower-single-center"
            style={{ width: centerSize, height: centerSize }}
          ></div>
          <div
            className="sunflower-single-inner"
            style={{ width: centerSize * 0.45, height: centerSize * 0.45 }}
          ></div>
        </>
      )}
    </div>
  );
};

export default Sunflower;
