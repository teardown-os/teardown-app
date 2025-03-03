import { MMKV } from "react-native-mmkv";
import type { SupportedStorage } from "@supabase/supabase-js";

export class SupabaseStorage implements SupportedStorage {
	_store: MMKV | null = null;

	constructor() {
		this._store = new MMKV({
			id: "@teardown/supabase",
		});
	}

	get store() {
		if (this._store == null) {
			throw new Error("Store not initialized");
		}

		return this._store;
	}

	async getItem(key: string) {
		const value = this.store.getString(key);
		return value ?? null;
	}

	async removeItem(key: string) {
		await this.store.delete(key);
	}

	async setItem(key: string, value: string) {
		await this.store.set(key, value);
	}
}
