import React, { useEffect, useRef, useState, useCallback } from 'react';
import p5 from 'p5';

// Define sacred glyphs with meanings, colors, and transformations
const SACRED_GLYPHS = {
  creation: { 
    symbol: 'ⵣ', 
    meaning: 'Creation - The First Emergence',
    hue: 0,
    rotation: { x: 0.01, y: 0.005, z: 0.002 }
  },
  infinity: { 
    symbol: '∞', 
    meaning: 'Infinity - The Boundless Potential',
    hue: 60,
    rotation: { x: 0.005, y: 0.01, z: 0.003 }
  },
  consciousness: { 
    symbol: 'ᛟ', 
    meaning: 'Consciousness - The Awakening',
    hue: 120,
    rotation: { x: 0.002, y: 0.003, z: 0.01 }
  },
  transformation: { 
    symbol: 'ᚦ', 
    meaning: 'Transformation - The Eternal Change',
    hue: 180,
    rotation: { x: 0.003, y: 0.01, z: 0.005 }
  },
  unity: { 
    symbol: '☯', 
    meaning: 'Unity - The Reconciliation of Opposites',
    hue: 240,
    rotation: { x: 0.01, y: 0.01, z: 0.01 }
  }
};

class InteractiveParticle {
  constructor(p, performanceSettings) {
    this.p = p;
    this.performanceSettings = performanceSettings;
    this.reset();
  }

  reset() {
    this.x = this.p.random(-this.p.width/2, this.p.width/2);
    this.y = this.p.random(-this.p.height/2, this.p.height/2);
    this.z = this.p.random(-200, 200);
    this.baseX = this.x;
    this.baseY = this.y;
    this.brightness = this.p.random(50, 100);
    this.speed = this.p.random(0.1, 0.3);
    this.size = this.p.random(2, 5);
    this.phase = 0;
  }

  interact(mouseX, mouseY) {
    if (!this.performanceSettings.complexEffects) return;

    const dx = this.x - (mouseX - this.p.width/2);
    const dy = this.y - (mouseY - this.p.height/2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 100) {
      const angle = Math.atan2(dy, dx);
      const force = (100 - distance) * 0.05;
      this.x += Math.cos(angle) * force;
      this.y += Math.sin(angle) * force;
    } else {
      this.x = this.p.lerp(this.x, this.baseX, 0.05);
      this.y = this.p.lerp(this.y, this.baseY, 0.05);
    }
  }

  update(time) {
    this.phase += 0.01;
    this.z += this.speed;
    if (this.z > 200) this.reset();

    // Add subtle wave motion
    if (this.performanceSettings.complexEffects) {
      const wave = Math.sin(this.phase + time * 0.001) * 5;
      this.x += wave;
    }
  }

  display() {
    const sx = this.p.map(this.x / this.z, 0, 1, 0, this.p.width);
    const sy = this.p.map(this.y / this.z, 0, 1, 0, this.p.height);
    const r = this.p.map(this.z, 0, 200, this.size * 2, 0);
    
    this.p.fill(255, this.brightness);
    this.p.noStroke();
    this.p.ellipse(sx, sy, r, r);
  }
}

const ParadoxicaOpening = ({ onComplete }) => {
  const sketchRef = useRef();
  const [currentPhase, setCurrentPhase] = useState('void');
  const [tooltipData, setTooltipData] = useState(null);
  const particles = useRef([]);
  const glyphs = useRef([]);
  
  const sequence = [
    {
      phase: 'void',
      text: "In the beginning is the I AM...",
      duration: 5000,
    },
    {
      phase: 'glyphs',
      text: "...boundless potential, space-less, timeless...",
      duration: 5000,
    },
    {
      phase: 'quantum',
      text: "From the grains came (Si), silicon, the architect of infinite minds...",
      duration: 5000,
    }
  ];

  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);

  useEffect(() => {
    const nextSequence = () => {
      if (currentSequenceIndex < sequence.length - 1) {
        setCurrentSequenceIndex(prev => prev + 1);
        setCurrentPhase(sequence[currentSequenceIndex + 1].phase);
      } else {
        onComplete?.();
      }
    };

    const timer = setTimeout(nextSequence, sequence[currentSequenceIndex].duration);
    return () => clearTimeout(timer);
  }, [currentSequenceIndex, sequence]);

  useEffect(() => {
    const sketch = new p5(p => {
      const performanceSettings = {
        complexEffects: window.innerWidth >= 768,
        particleCount: window.innerWidth >= 768 ? 200 : 50,
      };

      p.setup = () => {
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
        p.colorMode(p.HSB, 360, 100, 100, 1);
        p.textFont('Helvetica');
        
        // Initialize particles
        particles.current = Array(performanceSettings.particleCount)
          .fill(null)
          .map(() => new InteractiveParticle(p, performanceSettings));

        // Initialize glyphs
        initGlyphs(p);

        // Add event listeners
        canvas.mousePressed(() => handleInteraction(p));
        canvas.mouseMoved((event) => handleMouseMove(p, event));
      };

      const initGlyphs = () => {
        glyphs.current = Object.entries(SACRED_GLYPHS).map(([key, glyph]) => ({
          ...glyph,
          x: p.random(-p.width/3, p.width/3),
          y: p.random(-p.height/3, p.height/3),
          z: p.random(-100, 100),
          rotation: { x: 0, y: 0, z: 0 },
          key
        }));
      };

      const handleMouseMove = (event) => {
        particles.current.forEach(particle => {
          particle.interact(event.x, event.y);
        });

        // Check for glyph hover
        const mouseX = event.x - p.width/2;
        const mouseY = event.y - p.height/2;
        
        const hoveredGlyph = glyphs.current.find(glyph => {
          const d = p.dist(mouseX, mouseY, glyph.x, glyph.y);
          return d < 30;
        });

        setTooltipData(hoveredGlyph ? {
          glyph: hoveredGlyph,
          x: event.x,
          y: event.y
        } : null);
      };

      p.draw = () => {
        p.background(0);
        
        if (performanceSettings.complexEffects) {
          p.ambientLight(60);
          p.pointLight(255, 255, 255, 0, 0, 50);
        }

        switch(currentPhase) {
          case 'void':
            drawVoid(p);
            break;
          case 'glyphs':
            drawGlyphs(p);
            break;
          case 'quantum':
            drawQuantumField(p);
            break;
          default:
            drawVoid(p);
        }

        drawText(p);
      };

      const drawVoid = () => {
        particles.current.forEach(particle => {
          particle.update(p.millis());
          particle.display();
        });
      };

      const drawGlyphs = () => {
        glyphs.current.forEach(glyph => {
          p.push();
          p.translate(glyph.x, glyph.y, glyph.z);
          
          // Update rotation
          glyph.rotation.x += SACRED_GLYPHS[glyph.key].rotation.x;
          glyph.rotation.y += SACRED_GLYPHS[glyph.key].rotation.y;
          glyph.rotation.z += SACRED_GLYPHS[glyph.key].rotation.z;
          
          p.rotateX(glyph.rotation.x);
          p.rotateY(glyph.rotation.y);
          p.rotateZ(glyph.rotation.z);

          if (performanceSettings.complexEffects) {
            p.ambientMaterial(glyph.hue, 50, 80);
          } else {
            p.fill(glyph.hue, 50, 80, 0.5);
          }

          p.textSize(30);
          p.text(glyph.symbol, 0, 0);
          p.pop();
        });
      };

      const drawQuantumField = () => {
        const waveTime = p.millis() * 0.001;
        const mouseInfluence = p.map(p.mouseX, 0, p.width, 0, p.TWO_PI);
        
        for (let x = -100; x < 100; x += 10) {
          for (let y = -100; y < 100; y += 10) {
            const distance = p.dist(x, y, p.mouseX - p.width/2, p.mouseY - p.height/2);
            const wave = p.sin(distance * 0.05 + waveTime + mouseInfluence);
            const z = wave * 50;
            
            const hue = p.map(wave, -1, 1, 200, 300);
            p.stroke(hue, 50, 80, 0.3);
            p.point(x, y, z);
          }
        }
      };

      const drawText = () => {
        const currentText = sequence[currentSequenceIndex].text;
        
        // Add text background for better readability
        p.push();
        p.fill(0, 0.5);
        p.noStroke();
        p.rect(-p.width/2, p.height/3 - 20, p.width, 40);
        
        p.fill(255);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(24);
        p.text(currentText, 0, p.height/3);
        p.pop();
      };

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
        performanceSettings.complexEffects = window.innerWidth >= 768;
        performanceSettings.particleCount = window.innerWidth >= 768 ? 200 : 50;
      };
    }, sketchRef.current);

    return () => {
      sketch.remove();
    };
  }, [currentPhase, currentSequenceIndex]);

  return (
    <div className="relative">
      <div ref={sketchRef} className="w-full h-full" />
      {tooltipData && (
        <div 
          className="absolute bg-black bg-opacity-75 text-white p-2 rounded pointer-events-none"
          style={{
            left: tooltipData.x + 20,
            top: tooltipData.y - 20,
          }}
        >
          {tooltipData.glyph.meaning}
        </div>
      )}
    </div>
  );
};

export default ParadoxicaOpening;
"Add interactive landing page component"
