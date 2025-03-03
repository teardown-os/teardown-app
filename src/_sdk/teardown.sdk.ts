import { AuthService } from "./modules/auth";
import { SupabaseService } from "./modules/supabase";

export class Teardown {
	private supabase: SupabaseService;
	public auth: AuthService;

	constructor(config: {
		supabase: {
			url: string;
			key: string;
		};
	}) {
		this.supabase = new SupabaseService(
			config.supabase.url,
			config.supabase.key,
		);
		this.auth = new AuthService(this.supabase);
	}
}
