import * as React from "react";
import {
	Pressable,
	type PressableProps,
	type TextProps,
	type LayoutChangeEvent,
} from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "@/assets/icons";

import { cn } from "@/lib/utils";
import { Text, TextClassContext } from "./text";
import { View } from "./view";
import { Spinner } from "./spinner";
import type { FunctionComponent } from "react";

const buttonVariants = cva(
	"flex flex-row gap-2 rounded-xl relative",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground shadow-sm active:bg-primary/90",
				destructive:
					"bg-destructive text-destructive-foreground shadow-sm  active:bg-destructive/90",
				outline:
					"border border-input bg-background shadow-xs active:bg-accent active:text-accent-foreground",
				secondary:
					"bg-secondary text-secondary-foreground shadow-xs active:bg-secondary/80",
				ghost: "active:bg-accent active:text-accent-foreground",
				link: "text-primary underline-offset-4 active:underline",
			},
			size: {
				sm: "h-10 px-3",
				md: "h-14 px-6",
				lg: "h-20 px-8",
				"icon-sm": "h-10 w-10",
				icon: "h-14 w-14",
				"icon-lg": "h-20 w-20",
			},
			layout: {
				fill: "flex items-center justify-center ",
				wrap: "w-auto",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
			layout: "fill",
		},
	},
);

const buttonTextVariants = cva("text-sm font-medium text-center overflow-visible", {
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
			sm: "text-sm",
			md: "text-md",
			lg: "text-lg",
			"icon-sm": "text-sm",
			icon: "text-md",
			"icon-lg": "text-lg",
		},
		layout: {
			fill: "",
			wrap: "w-auto",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "md",
		layout: "fill",
	},
});

const iconVariants = cva("", {
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
		layout: {
			fill: "",
			wrap: "",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "md",
		layout: "fill",
	},
});

export interface ButtonProps
	extends Omit<PressableProps, "children">,
	VariantProps<typeof buttonVariants> {
	isLoading?: boolean;
	start?: React.ReactNode;
	end?: React.ReactNode;
	children?: React.ReactNode;
}

export interface ButtonTextProps
	extends TextProps,
	VariantProps<typeof buttonTextVariants> { }

interface AdornmentProps {
	children: React.ReactNode;
	variant?: VariantProps<typeof buttonVariants>["variant"];
	size?: VariantProps<typeof buttonVariants>["size"];
	layout?: VariantProps<typeof buttonVariants>["layout"];
}

const startAdornmentVariants = cva("flex items-center justify-center", {
	variants: {
		layout: {
			fill: "absolute h-full pl-4 left-0",
			wrap: "relative",
		},
	},
	defaultVariants: {
		layout: "fill",
	},
});

const getIconSize = (
	buttonSize: ButtonProps["size"],
): number => {
	switch (buttonSize) {
		case "sm":
		case "icon-sm":
			return 16;
		case "lg":
		case "icon-lg":
			return 24;
		default:
			return 20;
	}
};

const StartAdornment = React.memo(
	({ children, variant, size, layout }: AdornmentProps) => {
		const child = React.Children.only(children);
		const iconClassName = iconVariants({ variant, size, layout });
		const iconSize = getIconSize(size);

		return (
			<View className={startAdornmentVariants({ layout })}>
				{React.isValidElement(child)
					? React.cloneElement(child, {
						// @ts-ignore
						className: cn(iconClassName, child.props.className),
						size: iconSize,
					})
					: children}
			</View>
		);
	},
);

const endAdornmentVariants = cva("flex items-center justify-center", {
	variants: {
		layout: {
			fill: "absolute h-full pr-4 right-0",
			wrap: "",
		},
	},
	defaultVariants: {
		layout: "fill",
	},
});

const EndAdornment = React.memo(
	({ children, variant, size, layout }: AdornmentProps) => {
		const child = React.Children.only(children);
		const iconClassName = iconVariants({ variant, size, layout });
		const iconSize = getIconSize(size);

		return (
			<View className={endAdornmentVariants({ layout })}>
				{React.isValidElement(child)
					? React.cloneElement(child, {
						// @ts-ignore
						className: cn(iconClassName, child.props.className),
						size: iconSize,
					})
					: children}
			</View>
		);
	},
);

// Updated ButtonText to use the TextClassContext
export const ButtonText: FunctionComponent<ButtonTextProps> = ({
	className,
	variant,
	size,
	style,
	children,
	...props
}) => {
	const contextClassName = React.useContext(TextClassContext);

	return (
		<Text
			className={cn(
				// contextClassName || buttonTextVariants({ variant, size }),
				className,
			)}
			style={style}
			{...props}
		>
			{children}
		</Text>
	);
};

ButtonText.displayName = "ButtonText";

const getSpinnerSize = (
	buttonSize: ButtonProps["size"],
): ButtonProps["size"] => {
	return buttonSize || "md";
};

const getSpinnerVariant = (
	buttonVariant: ButtonProps["variant"],
): ButtonProps["variant"] => {
	return buttonVariant || "default";
};

const Button = React.forwardRef<
	React.ComponentRef<typeof Pressable>,
	ButtonProps
>(
	(
		{
			className,
			variant,
			layout,
			size,
			children,
			isLoading = false,
			start,
			end,
			disabled,
			style,
			...props
		},
		ref,
	) => {
		const isChildrenString = typeof children === "string";
		const isSingleChild =
			React.Children.count(children) === 1 && !isChildrenString;

		const minWidthRef = React.useRef(0);
		const textClassName = buttonTextVariants({ variant, size, layout });
		const iconClassName = iconVariants({ variant, size, layout });

		const onLayout = React.useCallback((event: LayoutChangeEvent) => {
			minWidthRef.current = event.nativeEvent.layout.width;
		}, []);

		const renderContent = () => {
			if (isLoading) {
				return (
					<View className="flex-row items-center justify-center">
						<Spinner
							variant={getSpinnerVariant(variant)}
							size={getSpinnerSize(size)}
						/>
					</View>
				);
			}

			if (isSingleChild) {
				const child = React.Children.only(children);
				if (React.isValidElement(child)) {
					return React.cloneElement(child, {
						// @ts-ignore
						// className: cn(iconClassName, child.props?.className),
					});
				}
				return child;
			}

			return (
				<React.Fragment>
					{start && (
						<StartAdornment variant={variant} size={size} layout={layout}>
							{start}
						</StartAdornment>
					)}
					{isChildrenString ? (
						<ButtonText>{children as string}</ButtonText>
					) : (
						children
					)}
					{end && (
						<EndAdornment variant={variant} size={size} layout={layout}>
							{end}
						</EndAdornment>
					)}
				</React.Fragment>
			);
		};

		return (
			<TextClassContext.Provider value={textClassName}>
				<Pressable
					ref={ref}
					disabled={disabled || isLoading}
					className={cn(
						buttonVariants({ variant, size, className }),
						disabled && "opacity-60",
					)}
					style={
						typeof style === "function"
							? style
							: {
								...(style as object),
								// minWidth: minWidthRef.current || undefined,
							}
					}
					onLayout={onLayout}
					{...props}
				>
					{renderContent()}
				</Pressable>
			</TextClassContext.Provider>
		);
	},
);

Button.displayName = "Button";

export { Button, buttonVariants, buttonTextVariants };
