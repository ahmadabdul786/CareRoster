import { cva } from "class-variance-authority";
import React from "react";

import type { VariantProps } from "class-variance-authority";

const typography = cva("", {
    variants: {
        size: {
            h0: ["text-h0"],
            h1: ["text-h1"],
            h2: ["text-h2"],
            h3: ["text-h3"],
            h4: ["text-h4"],
            h5: ["text-h5"],
            h6: ["text-h6"],
            xl: ["text-xl"],
            lg: ["text-lg"],
            md: ["text-md"],
            sm: ["text-sm"],
        },
        weight: {
            thin: ["font-thin"],
            normal: ["font-regular"],
            medium: ["font-medium"],
            semibold: ["font-semibold"],
            bold: ["font-bold"],
            extrabold: ["font-extrabold"],
        },
    },
    defaultVariants: {
        size: "lg",
        weight: "medium",
    },
});

export interface TypographyProps
    extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof typography> {
    as?: React.ElementType;
}

export const Typography: React.FC<TypographyProps> = ({
    as: Component = "p",
    className = "",
    size,
    weight,
    ...props
}) => {
    return (
        <Component
            className={`${typography({ size, weight })} ${className}`}
            style={{
                fontFamily: 'Poppins, sans-serif',
            }}
            {...props}
        />
    );
};
