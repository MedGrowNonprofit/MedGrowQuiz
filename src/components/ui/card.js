import React from 'react';

export function Card({ children, className }) {
  return (
    <div className={`rounded-lg border border-gray-300 shadow-lg ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div className="p-4">{children}</div>;
}
