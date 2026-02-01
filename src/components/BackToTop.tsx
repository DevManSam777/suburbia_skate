"use client";

import { useEffect } from "react";

export function BackToTop() {
  useEffect(() => {
    import("@devmansam/back-to-top");
  }, []);

  return (
    <back-to-top
      position="right"
      primary-color="#d9f154"
      background-color="rgba(46, 49, 146, 0.2)"
      border-color="rgba(72, 118, 255, 0.3)"
      box-shadow="0 4px 20px rgba(72, 118, 255, 0.15)"
    ></back-to-top>
  );
}
