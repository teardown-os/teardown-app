import type { SupabaseService } from "../supabase";

export class AuthApi {
	constructor(private supabase: SupabaseService) {}

	async startAutoRefresh() {
		await this.supabase.client.auth.startAutoRefresh();
	}

	async stopAutoRefresh() {
		await this.supabase.client.auth.stopAutoRefresh();
	}

	async getUser() {
		return await this.supabase.client.auth.getUser();
	}

	async sendOtpToEmail(email: string) {
		return this.supabase.client.auth.signInWithOtp({
			email,
		});
	}

	async verifyOtp(email: string, code: string) {
		return this.supabase.client.auth.verifyOtp({
			email,
			token: code,
			type: "email",
		});
	}

	async signInWithEmail(email: string, password: string) {
		return this.supabase.client.auth.signInWithPassword({
			email,
			password,
		});
	}

	async signUpWithEmail(email: string, password: string, name: string) {
		return this.supabase.client.auth.signUp({
			email,
			password,
			options: {
				data: {
					name,
				},
			},
		});
	}

	async signOut() {
		return this.supabase.client.auth.signOut();
	}
}
