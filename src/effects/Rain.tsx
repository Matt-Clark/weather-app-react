import { useRef, useEffect } from 'react';
import useWindowSize from '../hooks/useWindowSize';

import { type Period } from '../Types';

import './Rain.css';

interface RainProps {
  period: Period;
}

interface Drop {
  x: number;
  y: number;
  l: number;
  xs: number;
  ys: number;
}

export default function Rain({
  period = 'none'
}: RainProps ){
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    // based on https://codepen.io/arickle/pen/XKjMZY
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if(!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if(canvas.getContext) {
      let ctx = canvas.getContext('2d');

      if(ctx) {
        const w = canvas.width;
        const h = canvas.height;
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';
        
        let init = [];
        const maxParts = 500;
        for(let a = 0; a < maxParts; a++) {
          init.push({
            x: Math.random() * w,
            y: Math.random() * h,
            l: Math.random() * 1.3,
            xs: -4 + Math.random() * 4 + 2,
            ys: Math.random() * 10 + 25
          })
        }
        
        let particles: Drop[] = [];
        for(let b = 0; b < maxParts; b++) {
          particles[b] = init[b];
        }
        
        function draw() {
          if(ctx){
            ctx.clearRect(0, 0, w, h);
            for(let c = 0; c < particles.length; c++) {
              let p = particles[c];
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
              ctx.stroke();
            }
            move();
          }
        }
        
        function move() {
          for(let b = 0; b < particles.length; b++) {
            let p = particles[b];
            p.x += p.xs;
            p.y += p.ys;

            if(p.x > w || p.y > h) {
              p.x = Math.random() * w;
              p.y = -20;
            }
          }
        }
        
        const intervalId = setInterval(draw, 30);
        return () => clearInterval(intervalId);
      } 
    }
  }, [windowSize]);

  return (
    <canvas 
      id="RainEffect" 
      className={`rain-${period}`}
      ref={canvasRef}
    ></canvas>
  );
}