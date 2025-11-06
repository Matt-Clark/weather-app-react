import { useRef, useEffect } from 'react';
import useWindowSize from '../hooks/useWindowSize';

import { type Period } from '../Types';

import './Thunder.css';

interface ThunderProps {
  period: Period;
}

function randomRange(min: number, max: number): number {
  return min + Math.random() * (max - min + 1);
}

export default function Thunder({
  period = 'none'
}: ThunderProps ){
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    // based on https://codepen.io/mnald12/pen/RwvbvLq
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if(!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if(canvas.getContext) {
      let ctx = canvas.getContext('2d');

      if(ctx) {
        const w = canvas.width;
        const h = canvas.height;

        // Draw smaller branches ("roots") coming off lightning
        function drawRoot(x: number, y: number, col: string): void {
          if(ctx){
            let sx = x;
            let sy = y;
            let ex = sx + Math.floor(Math.random() * 50) - 15;
            let ey = sy + Math.floor(Math.random() * 30);

            let i = 0;
            let limit = Math.floor(Math.random() * 20); // number of segments

            while (i < limit) {
              ctx.beginPath();
              ctx.strokeStyle = col;
              ctx.lineWidth = 1;
              ctx.moveTo(sx, sy);
              ctx.lineTo(ex, ey);
              ctx.stroke();

              // Update start and end points for next segment
              sx = ex;
              sy = ey;
              ex = sx + Math.floor(Math.random() * 50) - 15;
              ey = sy + Math.floor(Math.random() * 30);
              i++;
            }
          }
        }

        // Draw a lightning strike from random position
        function drawLightning(color: string): void {
          if(ctx){
            // Create a flash effect on the whole canvas
            ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
            ctx.fillRect(0, 0, w, h);

            let sx = randomRange( 20, w - 20 );
            let sy = 0; // start at top of canvas
            let ex = sx + Math.floor(Math.random() * 30) - 15;
            let ey = sy + Math.floor(Math.random() * 30);

            let i = 0;
            let limit = Math.floor(Math.random() * h); // segment count

            while (i < limit) {
              ctx.beginPath();
              ctx.strokeStyle = color;
              ctx.lineWidth = 3;
              ctx.moveTo(sx, sy);
              ctx.lineTo(ex, ey);
              ctx.stroke();

              // Update start and end points
              sx = ex;
              sy = ey;
              ex = sx + Math.floor(Math.random() * 30) - 15;
              ey = sy + Math.floor(Math.random() * 30);

              // Occasionally branch lightning into roots
              let root = Math.floor(Math.random() * 1000);
              if (root < 50) {
                drawRoot(sx, sy, color);
              }
              i++;
            }
          }
        }

        function draw() {
          // Random chance for lightning
          const chance = 0.06; // 6% chance
          if (Math.random() < chance) {
            drawLightning("silver");
          }
        }

        // Main animation loop
        const animate = () => {
          ctx.clearRect(0, 0, w, h);

          // Add a glow effect
          ctx.shadowColor = "aliceblue";
          ctx.shadowBlur = 10;
          
          draw();
        };
        
        const intervalId = setInterval(animate, 70);
        return () => clearInterval(intervalId);
      }
    }
  }, [windowSize]);

  return (
    <canvas 
      id="ThunderEffect" 
      className={`thunder-${period}`}
      ref={canvasRef}
    ></canvas>
  );
}