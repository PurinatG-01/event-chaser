import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge";

const card = cva("transition-all duration-300 text-white rounded-lg p-4 active:opacity-70 focus:opacity-70 duration-300 ", {
  variants: {
    variant: {
      primary: "bg-primary",
      secondary: "bg-secondary-content",
    },
    hover: {
      bounce: "hover:translate-y-[-0.5rem]",
      scale: "hover:scale-[1.1]",
    },
  },
  defaultVariants: {
    variant: "primary",
    hover: "bounce",
  },
})

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof card> {}

export const Card: React.FC<CardProps> = ({
  className,
  variant,
  hover,
  ...props
}) => <div className={twMerge(card({ variant, hover, className }))} {...props} />
