"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

type ButtonVariant =
    | "primary"
    | "secondary"
    | "outline"
    | "ghost";

type ButtonSize =
    | "sm"
    | "md"
    | "lg";

type ButtonProps = {
    title: string;
    onClick?: () => void;
    className?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
};

export default function Button({
    title,
    onClick,
    className,
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    icon,
}: ButtonProps) {

    const variantStyles = {
        primary: `
      bg-gradient-to-r
      from-blue-600
      via-cyan-500
      to-blue-700
      text-white
      hover:shadow-cyan-500/30
    `,

        secondary: `
      bg-gradient-to-r
      from-purple-600
      to-pink-500
      text-white
    `,

        outline: `
      border
      border-white/20
      bg-white/5
      backdrop-blur-xl
      text-white
    `,

        ghost: `
      bg-transparent
      text-white
      hover:bg-white/10
    `,
    };

    const sizeStyles = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    return (
        <motion.button
            whileHover={{
                scale: disabled ? 1 : 1.03,
                y: disabled ? 0 : -2,
            }}
            whileTap={{
                scale: disabled ? 1 : 0.97,
            }}
            transition={{
                duration: 0.2,
            }}
            disabled={disabled || loading}
            onClick={onClick}
            className={cn(
                `
          relative
          overflow-hidden
          rounded-2xl
          font-semibold
          shadow-lg
          transition-all
          duration-300
          flex
          items-center
          justify-center
          gap-2
        `,
                variantStyles[variant],
                sizeStyles[size],
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
        >
            {loading ? (
                <div
                    className="
            h-5
            w-5
            rounded-full
            border-2
            border-white/30
            border-t-white
            animate-spin
          "
                />
            ) : (
                <>
                    {icon}
                    <span>{title}</span>
                </>
            )}

            <div
                className="
          absolute
          inset-0
          opacity-0
          hover:opacity-100
          transition-opacity
          duration-500
          bg-white/10
        "
            />
        </motion.button>
    );
}