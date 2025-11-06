import { useRef, useEffect } from 'react';
import useWindowSize from '../hooks/useWindowSize';

import { type Period } from '../Types';

import './Snow.css';

interface SnowProps {
  period: Period;
}

interface Flake {
  x: number;
  y: number;
  opacity: number;
  speedX: number;
  speedY: number;
  radius: number;
}

function randomRange(min: number, max: number): number {
  return min + Math.random() * (max - min + 1);
}

export default function Snow({
  period = 'none'
}: SnowProps ){
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    // based on youtube.com/watch?v=50teKYVaQgc
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if(!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if(canvas.getContext) {
      let ctx = canvas.getContext('2d');

      if(ctx) {
        const w = canvas.width;
        const h = canvas.height;
        const particlesOnScreen = 245;
        let particlesArray: Flake[] = [];
        
        function createSnowFlakes() {
          for( let i = 0; i < particlesOnScreen; i++ ){
            particlesArray.push({
              x: Math.random() * w,
              y: Math.random() * h,
              opacity: randomRange(0.3, 0.8),
              speedX: randomRange(-11, 11),
              speedY: randomRange(7, 15),
              radius: randomRange(0.5, 3.2)
            });
          }
        }

        function drawSnowFlakes(){
          if(ctx){
            for( let i = 0; i < particlesArray.length; i++ ){
              let gradient = ctx.createRadialGradient(
                particlesArray[i].x,
                particlesArray[i].y,
                0,
                particlesArray[i].x,
                particlesArray[i].y,
                particlesArray[i].radius,
              );

              gradient.addColorStop(0, "rgba(255, 255, 255, " + particlesArray[i].opacity + ")");
              gradient.addColorStop(0.8, "rgba(210, 236, 242, " + particlesArray[i].opacity + ")");
              gradient.addColorStop(1, "rgba(237, 247, 249, " + particlesArray[i].opacity + ")");

              ctx.beginPath();
              ctx.arc(
                particlesArray[i].x,
                particlesArray[i].y,
                particlesArray[i].radius,
                0,
                Math.PI * 2,
                false
              );

              ctx.fillStyle = gradient;
              ctx.fill();
            }
          }
        }

        function moveSnowFlakes(){
          for( let i = 0; i < particlesArray.length; i++ ){
            particlesArray[i].x += particlesArray[i].speedX;
            particlesArray[i].y += particlesArray[i].speedY;

            if(particlesArray[i].y > h){
              particlesArray[i].x = Math.random() * w * 1.5;
              particlesArray[i].y = -50;
            }
          }
        }

        function updateSnowFall(){
          if(ctx){
            ctx.clearRect(0, 0, w, h);
            drawSnowFlakes();
            moveSnowFlakes();
          }
        }
        
        createSnowFlakes();
        const intervalId = setInterval(updateSnowFall, 50);
        return () => clearInterval(intervalId);
      }
    }
  }, [windowSize]);

  return (
    <canvas 
      id="SnowEffect" 
      className={`snow-${period}`}
      ref={canvasRef}
    ></canvas>
  );
}