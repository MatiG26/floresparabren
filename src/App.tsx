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
  const [stem2, setStem2] = React.useState(false);
  const [stem3, setStem3] = React.useState(false);
  const [showTitle, setShowTitle] = React.useState(false);

  // Estado para overlay de bienvenida y audio
  const [showWelcome, setShowWelcome] = React.useState(true);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  // Firma
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [hasSignature, setHasSignature] = React.useState(false);

  // Funciones para dibujar en el canvas
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
  };
  const endDrawing = () => {
    setIsDrawing(false);
  };
  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    let x, y;
    if (e.type === "touchmove") {
      const touch = (e as React.TouchEvent).touches[0];
      const rect = canvasRef.current.getBoundingClientRect();
      x = touch.clientX - rect.left;
      y = touch.clientY - rect.top;
    } else {
      const mouse = e as React.MouseEvent;
      x = mouse.nativeEvent.offsetX;
      y = mouse.nativeEvent.offsetY;
    }
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#ffe066";
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    setHasSignature(true);
  };
  const clearSignature = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    setHasSignature(false);
  };

  const handleAccept = () => {
    setShowWelcome(false);
    setTimeout(() => setStem1(true), 1000);
    setTimeout(() => setStem2(true), 1300);
    setTimeout(() => setStem3(true), 1600);
    setTimeout(() => setShowTitle(true), 2600);
    // Reproducir audio
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div style={{ position: "relative", width: "100vw", minHeight: "100vh", overflow: "hidden" }}>
      {/* Overlay de bienvenida con firma, fondo sólido y diseño mejorado */}
      {showWelcome && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "linear-gradient(135deg, #ffe066 0%, #ffd6e0 100%)",
            zIndex: 99999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#333",
            boxShadow: "0 0 0 100vw #ffe066, 0 0 0 200vw #ffd6e0"
          }}
        >
          <div style={{
            background: "#fffbe6",
            borderRadius: 18,
            boxShadow: "0 8px 32px #0002",
            padding: 32,
            minWidth: 340,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "2px solid #ffe066"
          }}>
            <h1 style={{ fontSize: "2.1rem", marginBottom: 8, color: "#e67e22", fontWeight: 700, textAlign: "center" }}>¡Entrega especial!</h1>
           
            <p style={{ fontSize: "1rem", marginBottom: 18, color: "#333", textAlign: "center" }}>
              Firma para aceptar la entrega de este regalo 🌻<br/>
              <span style={{ fontSize: "0.95rem", color: "#888" }}>(¡Puedes borrar y volver a firmar!)</span>
            </p>
            <canvas
              ref={canvasRef}
              width={320}
              height={120}
              style={{
                background: "#fff",
                borderRadius: 10,
                boxShadow: "0 2px 12px #0003",
                border: "2px solid #ffe066",
                marginBottom: 12,
                touchAction: "none",
                cursor: "crosshair"
              }}
              onMouseDown={startDrawing}
              onMouseUp={endDrawing}
              onMouseOut={endDrawing}
              onMouseMove={draw}
              onTouchStart={startDrawing}
              onTouchEnd={endDrawing}
              onTouchCancel={endDrawing}
              onTouchMove={draw}
            />
            <div style={{ marginBottom: 18, width: "100%", display: "flex", justifyContent: "center" }}>
              <button onClick={clearSignature} style={{ padding: "0.4em 1.2em", borderRadius: 8, border: "none", background: "#ffe066", color: "#333", fontWeight: 500, cursor: "pointer", boxShadow: "0 1px 6px #0001" }}>Borrar</button>
            </div>
            <button
              onClick={handleAccept}
              disabled={!hasSignature}
              style={{
                fontSize: "1.2rem",
                padding: "0.7em 2em",
                borderRadius: 12,
                border: "none",
                background: hasSignature ? "#e67e22" : "#ccc",
                color: hasSignature ? "#fffbe6" : "#888",
                fontWeight: 700,
                cursor: hasSignature ? "pointer" : "not-allowed",
                boxShadow: hasSignature ? "0 2px 12px #e67e2240" : "none",
                transition: "background 0.2s, color 0.2s"
              }}
            >
              Aceptar entrega
            </button>
          </div>
        </div>
      )}
      {/* Audio oculto */}
      <audio ref={audioRef} src="/floricienta.mp3" loop />
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
