import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  className = "",
  variant = "default",
  size = "default",
  children,
  ...props
}) => {
  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-600 text-gray-200 hover:bg-gray-800 hover:text-white",
    secondary: "bg-gray-700 text-white hover:bg-gray-600",
    ghost: "text-gray-300 hover:bg-gray-800 hover:text-white",
    link: "text-blue-500 underline-offset-4 hover:underline",
    destructive: "bg-red-600 text-white hover:bg-red-700"
  };

  const sizeStyles = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-sm",
    lg: "h-12 px-6 text-lg",
    icon: "h-9 w-9 p-0"
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};