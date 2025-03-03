import * as Supabase from "@supabase/supabase-js";
import { SupabaseStorage } from "./supabase.storage";
import type { Database } from "./generated.types";

export class SupabaseService {
	private _client: Supabase.SupabaseClient<Database>;

	constructor(supabaseUrl: string, supabaseKey: string) {
		this._client = new Supabase.SupabaseClient<Database>(
			supabaseUrl,
			supabaseKey,
			{
				auth: {
					storage: new SupabaseStorage(),
					persistSession: true,
					// flowType: "pkce",
					storageKey: "teardown-supabase",
				},
				global: {
					// fetch: (...argss) => fetch(...argss),
				},
			},
		);
	}

	get client() {
		return this._client;
	}
}
