"use client";

import gsap from "gsap";

if (typeof window !== "undefined") {
  gsap.config({ nullTargetWarn: false });
}

export { gsap };
export default gsap;
