import React, { type FunctionComponent, type PropsWithChildren } from "react";
import { ActivityIndicator } from "react-native";
import type { UseQueryResult } from "@tanstack/react-query";
import { View } from "./view";
import { Text } from "./text";
import { Spinner } from "./spinner";

export type LoadingProps = PropsWithChildren<{
	id?: string;
	text?: string;
	query?: UseQueryResult<any>;
}>;

export const Loading: FunctionComponent<LoadingProps> = (props) => {
	const { children, text, query } = props;

	return (
		<View className="flex-1 items-center justify-center bg-background">
			<View className="items-center gap-4">
				<Spinner variant="secondary" size="lg" />
				{text && <Text className="mt-2">{text}</Text>}
			</View>
			{children}

			<View className="absolute bottom-0 left-0 right-0 items-center p-4">
				{query?.error != null && (
					<Text className="text-red-500">{query.error.message}</Text>
				)}
			</View>
		</View>
	);
};
