"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface AvatarNodeProps {
  image: string;
  name: string;
  isActive: boolean;
  onClick: () => void;
  position: { x: number; y: number };
}

export const AvatarNode: React.FC<AvatarNodeProps> = ({
  image,
  name,
  isActive,
  onClick,
  position,
}) => {
  return (
    <motion.button
      onClick={onClick}
      className="absolute z-20 group"
      initial={false}
      animate={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        scale: isActive ? 1.2 : 0.85,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      style={{
        transform: "translate(-50%, -50%)",
      }}
      aria-label={`View testimonial from ${name}`}
      aria-pressed={isActive}
    >
      <div className="relative">
        {/* Glow effect for active avatar */}
        {isActive && (
          <motion.div
            layoutId="active-glow"
            className="absolute -inset-4 bg-brand-500/20 rounded-full blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Ring for active avatar */}
        {isActive && (
          <motion.div
            layoutId="active-ring"
            className="absolute -inset-2 border-2 border-brand-500 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Avatar Image */}
        <div
          className={`
            w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 transition-all duration-300
            ${isActive ? "border-brand-500 shadow-xl" : "border-white shadow-md group-hover:border-brand-100"}
          `}
        >
          <Image
            src={image}
            alt={name}
            width={80}
            height={80}
            className={`w-full h-full object-cover transition-all duration-300 ${!isActive ? "grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100" : ""}`}
          />
        </div>
      </div>
    </motion.button>
  );
};
