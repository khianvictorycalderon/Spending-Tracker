import React from "react";

// Paragraph text props
interface RegularTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
}

// Heading text props
interface HeadingTextProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

// ===== Base Texts =====

export function BaseText({ children, className, ...props }: RegularTextProps) {
  return (
    <p className={`text-sm md:text-base ${className || ""}`} {...props}>
      {children}
    </p>
  );
}

// ===== Headings =====

export function HeadingText({ children, className, ...props }: HeadingTextProps) {
  return (
    <h2
      className={`text-base md:text-lg lg:text-xl font-bold tracking-tight ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </h2>
  );
}

export function SubHeadingText({ children, className, ...props }: HeadingTextProps) {
  return (
    <h2
      className={`text-lg md:text-xl lg:text-2xl font-semibold ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </h2>
  );
}