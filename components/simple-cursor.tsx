"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function SimpleCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    // Función para actualizar la posición del cursor
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    // Eventos para detectar clics y hover en enlaces
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleLinkEnter = () => setLinkHovered(true);
    const handleLinkLeave = () => setLinkHovered(false);

    // Ocultar el cursor cuando sale de la ventana
    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    // Agregar event listeners
    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Agregar event listeners a enlaces y botones
    const interactiveElements = document.querySelectorAll(
      "a, button, [role='button']"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleLinkEnter);
      el.addEventListener("mouseleave", handleLinkLeave);
    });

    // Limpiar event listeners
    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkEnter);
        el.removeEventListener("mouseleave", handleLinkLeave);
      });
    };
  }, []);

  // Determinar el tamaño y color del cursor
  const cursorSize = linkHovered ? 40 : 20;
  const cursorColor = isDark ? "rgba(255, 0, 0, 0.5)" : "rgba(255, 0, 0, 0.5)";
  const cursorBorder = clicked
    ? "2px solid rgba(255, 0, 0, 1)"
    : "2px solid rgba(255, 0, 0, 0.5)";
  const opacity = visible ? 1 : 0;

  return (
    <>
      <style jsx global>{`
        body {
          cursor: none;
        }
        a,
        button,
        [role="button"] {
          cursor: none;
        }
      `}</style>
      <div
        className="fixed top-0 left-0 z-50 rounded-full pointer-events-none hidden md:block"
        style={{
          transform: `translate(${position.x - cursorSize / 2}px, ${
            position.y - cursorSize / 2
          }px)`,
          width: `${cursorSize}px`,
          height: `${cursorSize}px`,
          backgroundColor: clicked
            ? "rgba(255, 0, 0, 0.2)"
            : "rgba(255, 0, 0, 0.1)",
          border: cursorBorder,
          opacity,
          transition:
            "width 0.2s, height 0.2s, background-color 0.2s, border 0.2s, opacity 0.2s",
        }}
      />
      <div
        className="fixed top-0 left-0 z-50 rounded-full pointer-events-none hidden md:block"
        style={{
          transform: `translate(${position.x - 2}px, ${position.y - 2}px)`,
          width: "4px",
          height: "4px",
          backgroundColor: cursorColor,
          opacity,
        }}
      />
    </>
  );
}
