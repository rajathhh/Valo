"use client";

import { useEffect, useRef } from "react";

interface TicketQRProps {
  bookingId: string;
  pnr: string;
  size?: number;
}

export function TicketQR({ bookingId, pnr, size = 120 }: TicketQRProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const data = `VALO:${bookingId}:${pnr}`;
    const cellSize = Math.floor(size / 21);
    const actualSize = cellSize * 21;
    canvas.width = actualSize;
    canvas.height = actualSize;

    // Generate a deterministic pseudo-QR visual pattern based on bookingId
    const seed = data.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    const rand = (n: number) => {
      const x = Math.sin(seed + n) * 10000;
      return x - Math.floor(x);
    };

    ctx.fillStyle = "rgba(15,15,26,0)";
    ctx.fillRect(0, 0, actualSize, actualSize);

    // Draw QR pattern
    for (let row = 0; row < 21; row++) {
      for (let col = 0; col < 21; col++) {
        const isFinder =
          (row < 7 && col < 7) || (row < 7 && col >= 14) || (row >= 14 && col < 7);
        const isTimingH = row === 6 && col >= 8 && col <= 12;
        const isTimingV = col === 6 && row >= 8 && row <= 12;

        let filled = false;
        if (isFinder) {
          const inBorder = row === 0 || row === 6 || col === 0 || col === 6 || (row >= 14 && (row === 14 || row === 20 || col === 0 || col === 6)) || (col >= 14 && (col === 14 || col === 20 || row === 0 || row === 6));
          const inInner = (row >= 2 && row <= 4 && col >= 2 && col <= 4) || (row >= 2 && row <= 4 && col >= 16 && col <= 18) || (row >= 16 && row <= 18 && col >= 2 && col <= 4);
          filled = inBorder || inInner;
        } else if (isTimingH || isTimingV) {
          filled = (row + col) % 2 === 0;
        } else {
          filled = rand(row * 21 + col) > 0.5;
        }

        ctx.fillStyle = filled ? "rgba(129, 140, 248, 0.9)" : "rgba(15,15,26,0)";
        ctx.fillRect(col * cellSize, row * cellSize, cellSize - 1, cellSize - 1);
      }
    }
  }, [bookingId, pnr, size]);

  return (
    <div
      className="p-3 rounded-2xl flex items-center justify-center"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
    >
      <canvas ref={canvasRef} style={{ imageRendering: "pixelated" }} />
    </div>
  );
}
