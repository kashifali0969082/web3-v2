import React, { ReactNode } from "react";

interface CardProps {
  className?: string;
  children: ReactNode;
}

export const Card: React.FC<CardProps> = ({ className = "", children }) => {
  return (
    <div className={`rounded-lg border border-gray-700 bg-gray-900 text-white shadow-sm ${className}`}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  className?: string;
  children: ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ className = "", children }) => {
  return <div className={`p-6 pb-3 ${className}`}>{children}</div>;
};

interface CardTitleProps {
  className?: string;
  children: ReactNode;
}

export const CardTitle: React.FC<CardTitleProps> = ({ className = "", children }) => {
  return <h3 className={`text-xl font-semibold ${className}`}>{children}</h3>;
};

interface CardDescriptionProps {
  className?: string;
  children: ReactNode;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ className = "", children }) => {
  return <p className={`text-sm text-gray-400 ${className}`}>{children}</p>;
};

interface CardContentProps {
  className?: string;
  children: ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ className = "", children }) => {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
};

interface CardFooterProps {
  className?: string;
  children: ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({ className = "", children }) => {
  return <div className={`p-6 pt-0 flex items-center ${className}`}>{children}</div>;
};