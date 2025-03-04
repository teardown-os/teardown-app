import type { Database } from "./generated.types";

export * from "./generated.types";

export type PublicSchema = Database["public"];
export type Functions<
	PublicEnumNameOrOptions extends
		| keyof PublicSchema["Functions"]
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions["schema"]]["Functions"]
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions["schema"]]["Functions"][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema["Functions"]
		? PublicSchema["Functions"][PublicEnumNameOrOptions]
		: never;

export type FunctionArgs<FunctionName extends keyof PublicSchema["Functions"]> =
	Functions<FunctionName>["Args"];
