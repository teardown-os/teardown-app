import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "@/assets/icons";
import { cn } from "@/lib/utils";

const spinnerVariants = cva("animate-spin", {
	variants: {
		variant: {
			default: "text-primary-foreground",
			destructive: "text-destructive-foreground",
			outline: "text-foreground",
			secondary: "text-secondary-foreground",
			ghost: "text-foreground",
			link: "text-primary",
		},
		size: {
			sm: "h-4 w-4",
			md: "h-5 w-5",
			lg: "h-6 w-6",
			"icon-sm": "h-4 w-4",
			icon: "h-5 w-5",
			"icon-lg": "h-6 w-6",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "md",
	},
});

export interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
	className?: string;
}

export const Spinner = React.memo(({ variant, size, className }: SpinnerProps) => {
	return (
		<LoaderCircle
			className={cn(spinnerVariants({ variant, size }), className)}
		/>
	);
});

Spinner.displayName = "Spinner";

export { spinnerVariants };
