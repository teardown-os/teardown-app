import * as React from "react";
import { View, Text } from "react-native";
import {
	Controller,
	useFormContext,
	FormProvider,
	useForm,
} from "react-hook-form";
import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

import { cn } from "@/lib/utils";

const Form = FormProvider;

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
	{} as FormFieldContextValue,
);

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
};

const useFormField = () => {
	const fieldContext = React.useContext(FormFieldContext);
	const itemContext = React.useContext(FormItemContext);
	const { getFieldState, formState } = useFormContext();

	const fieldState = getFieldState(fieldContext.name, formState);

	if (!fieldContext) {
		throw new Error("useFormField should be used within <FormField>");
	}

	const { id } = itemContext;

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	};
};

type FormItemContextValue = {
	id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
	{} as FormItemContextValue,
);

interface FormItemProps extends React.ComponentPropsWithoutRef<typeof View> {
	className?: string;
}

const FormItem = React.forwardRef<View, FormItemProps>(
	({ className, style, ...props }, ref) => {
		const id = React.useId();

		return (
			<FormItemContext.Provider value={{ id }}>
				<View
					ref={ref}
					style={style}
					className={cn("mb-4", className)}
					{...props}
				/>
			</FormItemContext.Provider>
		);
	},
);

FormItem.displayName = "FormItem";

interface FormLabelProps extends React.ComponentPropsWithoutRef<typeof Text> {
	className?: string;
}

const FormLabel = React.forwardRef<Text, FormLabelProps>(
	({ className, style, ...props }, ref) => {
		const { error } = useFormField();

		return (
			<Text
				ref={ref}
				style={style}
				className={cn(
					"text-sm font-medium text-foreground mb-2",
					error && "text-destructive",
					className,
				)}
				{...props}
			/>
		);
	},
);

FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
	React.ReactNode,
	React.PropsWithChildren<{}>
>(({ ...props }, _ref) => {
	const { error } = useFormField();

	return <>{props.children}</>;
});

FormControl.displayName = "FormControl";

interface FormDescriptionProps
	extends React.ComponentPropsWithoutRef<typeof Text> {
	className?: string;
}

const FormDescription = React.forwardRef<Text, FormDescriptionProps>(
	({ className, style, ...props }, ref) => {
		return (
			<Text
				ref={ref}
				style={style}
				className={cn("text-sm text-muted-foreground mt-1 mb-2", className)}
				{...props}
			/>
		);
	},
);

FormDescription.displayName = "FormDescription";

interface FormMessageProps extends React.ComponentPropsWithoutRef<typeof Text> {
	className?: string;
}

const FormMessage = React.forwardRef<Text, FormMessageProps>(
	({ className, children, style, ...props }, ref) => {
		const { error } = useFormField();
		const body = error ? String(error?.message ?? "") : children;

		if (!body) {
			return null;
		}

		return (
			<Text
				ref={ref}
				style={style}
				className={cn("text-sm font-medium text-destructive mt-1", className)}
				{...props}
			>
				{body}
			</Text>
		);
	},
);

FormMessage.displayName = "FormMessage";

export {
	useForm,
	useFormField,
	Form,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
	FormField,
};
