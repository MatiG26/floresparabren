import React from "react";
import Sunflower from "./Sunflower";
import SunflowerParticles from "./SunflowerParticles";
import "./Sunflower.css";
import "./SunflowerStem.css";
import "./SunflowerAnimations.css";

const STEM_GROW_DURATION = 1800; // ms
const LEAF_DELAYS = [0.4, 0.55, 0.7, 0.85];
const CENTER_BLOOM_DELAY = 1400; // ms
const PETALS_BLOOM_DELAY = 1700; // ms
const PARTICLES_BLOOM_DELAY = 2100; // ms

const YellowFlower3: React.FC<{
  animateStem?: boolean;
}> = ({
  animateStem = false,
}) => {
  const [stemPercent, setStemPercent] = React.useState(0);
  const [leavesVisible, setLeavesVisible] = React.useState([false, false, false, false]);
  const [centerBloom, setCenterBloom] = React.useState(false);
  const [petalsBloom, setPetalsBloom] = React.useState(false);
  const [particlesShow, setParticlesShow] = React.useState(false);
  // Key para reiniciar partículas
  const [particleKey, setParticleKey] = React.useState(0);

  React.useEffect(() => {
    const timeouts: number[] = [];
    let interval: number | undefined;
    if (animateStem) {
      // Animate stem
      const start = Date.now();
      let frame: number;
      const grow = () => {
        const elapsed = Date.now() - start;
        const percent = Math.min(elapsed / STEM_GROW_DURATION, 1);
        setStemPercent(percent);
        if (percent < 1) frame = requestAnimationFrame(grow);
      };
      grow();
      // Animate leaves sequentially
      LEAF_DELAYS.forEach((delay, i) => {
        timeouts.push(window.setTimeout(() => {
          setLeavesVisible(lv => {
            const arr = [...lv];
            arr[i] = true;
            return arr;
          });
        }, STEM_GROW_DURATION * delay));
      });
      // Center bloom
      timeouts.push(window.setTimeout(() => setCenterBloom(true), CENTER_BLOOM_DELAY));
      // Petals bloom
      timeouts.push(window.setTimeout(() => setPetalsBloom(true), PETALS_BLOOM_DELAY));
      // Particles show
      timeouts.push(window.setTimeout(() => setParticlesShow(true), PARTICLES_BLOOM_DELAY));
      // Loop de partículas mientras la flor está abierta
      interval = window.setInterval(() => {
        setParticleKey(k => k + 1);
      }, 1800);
      return () => {
        timeouts.forEach(clearTimeout);
        cancelAnimationFrame(frame);
        if (interval) window.clearInterval(interval);
      };
    } else {
      setStemPercent(0);
      setLeavesVisible([false, false, false, false]);
      setCenterBloom(false);
      setPetalsBloom(false);
      setParticlesShow(false);
      setParticleKey(0);
    }
  }, [animateStem]);

  return (
    <div
      className="sunflower-single-container sunflower-animated-group"
      style={{
        position: "absolute",
        height: 192,
        width: 130,
        left: "calc(50% + 90px)",
        marginTop: "46.5rem",
        zIndex: 0,
        filter: "brightness(0.97) blur(0.1px)",
        opacity: 0.96,
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
          height: 180 * stemPercent,
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
            className={`sunflower-leaf-anim sunflower-leaf-anim--${i+1}${leavesVisible[i] ? " sunflower-leaf-bloom" : ""}`}
            style={{
              position: "absolute",
              left: i % 2 === 0 ? "100%" : "-60%",
              top: `${80 + i*25}px`,
              width: 32,
              height: 18,
              background: "linear-gradient(90deg, #7bb661 60%, #3e5c13 100%)",
              borderRadius: "60% 40% 60% 40% / 60% 60% 40% 40%",
              opacity: leavesVisible[i] ? 1 : 0,
              transform: leavesVisible[i] ? "scale(1)" : "scale(0.2)",
              transition: `opacity 0.3s ${0.2 + i*0.15}s, transform 0.5s ${0.2 + i*0.15}s`,
              zIndex: 2,
            }}
          />
        ))}
      </div>
      {/* Flor y partículas */}
      <div
        className={`sunflower-flower-anim${centerBloom ? " sunflower-flower-center-bloom" : ""}${petalsBloom ? " sunflower-flower-petals-bloom" : ""}`}
        style={{
          position: "absolute",
          left: "50%",
          zIndex: 1,
          top: -150, // más abajo
          transform: "translateX(-50%)",
        }}
      >
        <Sunflower
          petalCount={20}
          centerSize={80 * 0.8}
          showCenter={centerBloom}
          showPetals={petalsBloom}
        />
        {/* Partículas en loop */}
        {particlesShow && <SunflowerParticles key={particleKey} show={true} />}
      </div>
    </div>
  );
};

export default YellowFlower3;
