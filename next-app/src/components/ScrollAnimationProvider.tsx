"use client";


import {useScrollAnimation} from "../hooks/useScrollAnimation";

export default function ScrollAnimationProvider({ containerRef }: { containerRef: React.RefObject<HTMLElement> }) {
  useScrollAnimation(containerRef);

  return null;
}
