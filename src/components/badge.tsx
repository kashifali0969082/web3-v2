import React, { ReactNode } from "react";

interface BadgeProps {
  className?: string;
  variant?: "default" | "secondary" | "outline" | "destructive";
  children: ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ 
  className = "", 
  variant = "default", 
  children 
}) => {
  // These styles are ignored when className contains explicit bg color
  const variantStyles = {
    default: "bg-blue-600 text-white",
    secondary: "bg-gray-600 text-white",
    outline: "border border-gray-600 text-gray-200",
    destructive: "bg-red-600 text-white",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};