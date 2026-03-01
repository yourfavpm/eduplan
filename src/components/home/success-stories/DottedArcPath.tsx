"use client";

import React from "react";

export interface DottedArcPathProps {
  className?: string;
}

export const DottedArcPath: React.FC<DottedArcPathProps> = ({ className }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1000 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full opacity-20"
        preserveAspectRatio="none"
      >
        <path
          d="M0,150 Q500,0 1000,150"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="8 12"
          className="text-brand-500"
        />
      </svg>
    </div>
  );
};
