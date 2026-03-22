import React from "react";
import AnimatedGrass from "./AnimatedGrass";
import Sunflower from "./YellowFlower";
import YellowFlower2 from "./YellowFlower2";
import YellowFlower3 from "./YellowFlower3";
import AnimatedTitleWithParticles from "./AnimatedTitleWithParticles";
import FloatingHearts from "./FloatingHearts";
import "./App.css";

function App() {
  // Overlay
  const [fadeOverlay, setFadeOverlay] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => setFadeOverlay(false), 900);
  }, []);

  // Estados para animar cada parte de la flor principal
  const [stem1, setStem1] = React.useState(false);
  // const [leaves1, setLeaves1] = React.useState(false);
  // const [center1, setCenter1] = React.useState(false);
  // const [petals1, setPetals1] = React.useState(false);
  // Estados para las otras flores
  const [stem2, setStem2] = React.useState(false);
  // const [center2, setCenter2] = React.useState(false);
  // const [petals2, setPetals2] = React.useState(false);
  const [stem3, setStem3] = React.useState(false);
  const [showTitle, setShowTitle] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => setStem1(true), 1000);
    // setTimeout(() => setLeaves1(true), 1400);
    // setTimeout(() => setCenter1(true), 1800);
    // setTimeout(() => setPetals1(true), 2100);
    setTimeout(() => setStem2(true), 1300);
    // setTimeout(() => setCenter2(true), 2100);
    // setTimeout(() => setPetals2(true), 2400);
    setTimeout(() => setStem3(true), 1600);
    setTimeout(() => setShowTitle(true), 2600);
  }, []);

  return (
    <div style={{ position: "relative", width: "100vw", minHeight: "100vh", overflow: "hidden" }}>
      <FloatingHearts />
      {showTitle && <AnimatedTitleWithParticles />}
      {/* Overlay negro animado */}
      <div className={`fade-black-overlay${fadeOverlay ? " fade-in" : " fade-out"}`}></div>
      {/* Grass SIEMPRE visible */}
      <div style={{ pointerEvents: "none" }}><AnimatedGrass /></div>
      {/* Girasoles animados originales */}
      <Sunflower animateStem={stem1} />
      <YellowFlower2 animateStem={stem2} />
      <YellowFlower3 animateStem={stem3} />
    </div>
  );
}

export default App;
