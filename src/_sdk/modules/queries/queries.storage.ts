import type { AsyncStorage } from "@tanstack/react-query-persist-client";
import { MMKV } from "react-native-mmkv";

export class QueryStorage implements AsyncStorage {
	store: MMKV;

	constructor() {
		this.store = new MMKV({
			id: "@teardown/queries",
		});
	}

	async getItem(key: string) {
		return this.store.getString(key);
	}

	async removeItem(key: string) {
		await this.store.delete(key);
	}

	async setItem(key: string, value: string) {
		await this.store.set(key, value);
	}
}
