import React from "react";
import Sunflower from "./Sunflower";
import SunflowerParticles from "./SunflowerParticles";
import "./Sunflower.css";
import "./SunflowerStem.css";
import "./SunflowerAnimations.css";

const STEM_GROW_DURATION = 1800; // ms
const FLOWER_START_AT = 0.7;
const FLOWER_FINISH_AT = 1.0;
const LEAF_DELAYS = [0.4, 0.55, 0.7, 0.85];

interface SunflowerProps {
  animateStem?: boolean;
}

const YellowFlower: React.FC<SunflowerProps> = ({ animateStem = false }) => {
  const [stemPercent, setStemPercent] = React.useState(0);
  // Key para reiniciar partículas
  const [particleKey, setParticleKey] = React.useState(0);
  React.useEffect(() => {
    let frame: number;
    if (animateStem) {
      const start = Date.now();
      const grow = () => {
        const elapsed = Date.now() - start;
        const percent = Math.min(elapsed / STEM_GROW_DURATION, 1);
        setStemPercent(percent);
        if (percent < 1) frame = requestAnimationFrame(grow);
      };
      grow();
      return () => cancelAnimationFrame(frame);
    } else {
      setStemPercent(0);
    }
  }, [animateStem]);

  const showFlower = stemPercent > FLOWER_START_AT;
  const finishFlower = stemPercent >= FLOWER_FINISH_AT;

  // Loop de partículas mientras la flor está abierta
  React.useEffect(() => {
    let interval: number | undefined;
    const isMobile = window.innerWidth <= 600;
    if (finishFlower) {
      setParticleKey(0); // reset al abrir
      interval = window.setInterval(() => {
        setParticleKey(k => k + 1);
      }, isMobile ? 3200 : 1800); // menos partículas en móvil
    }
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [finishFlower]);

  return (
    <div
      className="sunflower-single-container sunflower-animated-group"
      style={{
        position: "relative",
        height: 192,
        width: 130,
        left: "50%",
        transform: "translateX(-50%)",
        marginTop: "45rem",
        zIndex: 2,
      }}
    >
      <div className="sunflower-shadow"></div>
      {/* Tallo animado tipo .flower__line */}
      <div
        className="sunflower-stem-anim"
        style={{
          position: "absolute",
          left: "50%",
          bottom: 45,
          transform: "translateX(-50%)",
          width: 12,
          height: 300 * stemPercent, // Taller than the other two
          background: "linear-gradient(to top, #064600 60%, #00b815 100%)",
          borderRadius: 8,
          transition: animateStem ? undefined : "height 0.8s cubic-bezier(.7,1.7,.5,1)",
          overflow: "visible",
        }}
      >
        {/* Hojas animadas tipo .flower__line__leaf */}
        {[0,1,2,3].map(i => (
          <div
            key={i}
            className={`sunflower-leaf-anim sunflower-leaf-anim--${i+1}`}
            style={{
              position: "absolute",
              left: i % 2 === 0 ? "100%" : "-60%",
              top: `${80 + i*25}px`,
              width: 32,
              height: 18,
              background: "linear-gradient(90deg, #7bb661 60%, #3e5c13 100%)",
              borderRadius: "60% 40% 60% 40% / 60% 60% 40% 40%",
              opacity: stemPercent > LEAF_DELAYS[i] ? 1 : 0,
              transform: stemPercent > LEAF_DELAYS[i] ? "scale(1)" : "scale(0.2)",
              transition: `opacity 0.3s ${0.2 + i*0.15}s, transform 0.5s ${0.2 + i*0.15}s`,
              zIndex: 2,
            }}
          />
        ))}
      </div>
      {/* Hojas grandes en la base del tallo */}
      <div style={{
        position: "absolute",
        left: "50%",
        bottom: 40,
        transform: "translateX(-50%)",
        width: 80,
        height: 40,
        zIndex: 3,
        pointerEvents: "none",
      }}>
        <div style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: 38,
          height: 24,
          background: "linear-gradient(90deg, #7bb661 60%, #3e5c13 100%)",
          borderRadius: "60% 40% 60% 40% / 60% 60% 40% 40%",
          transform: "rotate(-25deg) scale(1.2,1)",
          opacity: 0.92,
          filter: "blur(0.2px)",
        }} />
        <div style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: 38,
          height: 24,
          background: "linear-gradient(90deg, #7bb661 60%, #3e5c13 100%)",
          borderRadius: "60% 40% 60% 40% / 60% 60% 40% 40%",
          transform: "rotate(25deg) scale(1.2,1)",
          opacity: 0.92,
          filter: "blur(0.2px)",
        }} />
      </div>
      {/* Flor y partículas */}
      <div
        className={`sunflower-flower-anim${showFlower ? " sunflower-flower-center-bloom" : ""}${finishFlower ? " sunflower-flower-petals-bloom" : ""}`}
        style={{
          position: "absolute",
          left: "50%",
          zIndex: 1,
          top: -300, // más abajo
          transform: "translateX(-50%)",
        }}
      >
        <Sunflower
          petalCount={20}
          centerSize={80 * 0.8}
          petalWidth={undefined}
          petalHeight={undefined}
          showCenter={showFlower}
          showPetals={finishFlower}
        />
        {/* Partículas en loop */}
        {finishFlower && <SunflowerParticles key={particleKey} show={true} />}
      </div>
    </div>
  );
};

export default YellowFlower;
