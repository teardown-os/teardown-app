import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient, focusManager } from "@tanstack/react-query";
import {
	type AsyncStorage,
	persistQueryClient,
} from "@tanstack/react-query-persist-client";
import { MMKV } from "react-native-mmkv";

focusManager.setEventListener((handleFocus) => {
	// let focusListener: UnlistenFn | null = null;
	// let blurListener: UnlistenFn | null = null;

	// const createHandlers = async () => {
	// 	focusListener = await listen<string>("tauri://focus", () => {
	// 		// console.log("REACT QUERY focus");
	// 		handleFocus(true);
	// 	});

	// 	blurListener = await listen<string>("tauri://blur", () => {
	// 		// console.log("REACT QUERY blur-sm");
	// 		handleFocus(false);
	// 	});
	// };

	// void createHandlers();

	return () => {
		// focusListener?.();
		// blurListener?.();
	};
});

export const persister = createAsyncStoragePersister({
	storage,
});

persistQueryClient({
	queryClient,
	persister,
});
