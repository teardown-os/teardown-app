import type { SupabaseService } from "../supabase";

export class ApiBase {
	constructor(readonly supabase: SupabaseService) {}
}
