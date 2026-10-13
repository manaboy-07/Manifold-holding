"use client";
import React from "react";
import Image from "next/image";
function Mes() {
  return (
    <Image
      src={"/public/logos/meslogo.png"}
      width={60}
      height={60}
      alt="Manifold Computers logo"
    />
  );
}

export default Mes;
