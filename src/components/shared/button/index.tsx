import { cva } from "class-variance-authority";
import React from "react";

import type { VariantProps } from "class-variance-authority";

const buttonStyles = cva(
    "w-full disabled:!cursor-not-allowed capitalize rounded-xl transition-all duration-200 flex items-center focus:outline-none justify-center font-medium font-[Poppins]",
    {
        variants: {
            variant: {
                primary: [
                    "bg-light-blue text-white hover:bg-light-blue/90 !rounded-full",
                    "disabled:!bg-none disabled:!bg-[#BDBDBD] disabled:text-[#9E9E9E]",
                    "text-[16px] leading-[23px] tracking-[0px]",
                ],
                secondary: [
                    "bg-white text-black border-2 border-primary-dark",
                    "hover:bg-white/90 hover:text-primary-black",
                    "active:bg-black active:border active:border-black active:text-white",
                    "disabled:bg-transparent disabled:text-[#BDBDBD] disabled:border-[#BDBDBD]",
                    "font-semibold",
                ],
                outline: [
                    "bg-transparent text-light-blue border-2 border-light-blue !rounded-full",
                    "hover:bg-light-blue hover:text-white",
                    "active:bg-light-blue/90",
                    "disabled:bg-transparent disabled:text-[#BDBDBD] disabled:border-[#BDBDBD]",
                ],
                danger: [
                    "bg-[#FF3B30] text-white",
                    "hover:bg-[#E6352B]",
                    "active:bg-[#CC2F26]",
                    "disabled:bg-[#BDBDBD] disabled:text-[#9E9E9E]",
                    "font-semibold",
                ],
                ghost: [
                    "bg-transparent text-[#B8975A]",
                    "hover:text-[#9A7D4A]",
                    "active:text-[#8B6E3F]",
                    "disabled:text-[#BDBDBD]",
                    "font-semibold",
                ],
            },
            size: {
                default: ["min-h-[56px]", "px-8", "text-base"],
                sm: ["min-h-[44px]", "px-6", "text-sm"],
                lg: ["min-h-[56px]", "px-10", "text-lg"],
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
    loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    variant,
    size,
    className = "",
    loading = false,
    children,
    ...props
}) => {
    return (
        <button
            className={`cursor-pointer relative w-full ${buttonStyles({
                variant,
                size,
            })} ${className}`}
            {...props}
            disabled={loading || props.disabled}
        >
            {loading ? (
                <span className="w-5 h-5 border-2 rounded-full min-w-5 loader animate-spin border-t-transparent"></span>
            ) : (
                children
            )}
        </button>
    );
};
