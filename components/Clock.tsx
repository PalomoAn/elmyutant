"use client";

import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
        setTime(new Date().toLocaleTimeString( "en-US", { hour: "2-digit", minute: "2-digit" }));
    };

    tick(); // Initialize the time immediately
    const interval = setInterval(tick, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return <span className="clock">{time}</span>;
    };