import type { AuthChangeEvent } from "@supabase/auth-js/src/lib/types.ts";
import type { Session, Subscription } from "@supabase/supabase-js";
import { EventEmitter } from "eventemitter3";
import type { SupabaseService } from "../supabase";
import { AuthApi } from "./auth.api.ts";
import { AuthQueries } from "./auth.queries.ts";

export type TeardownUserSession = Session & {};

export type AuthEvents = {
	AUTH_STATE_CHANGE: {
		event: AuthChangeEvent;
		session: TeardownUserSession | null;
	};
};

export class AuthService {
	api: AuthApi;
	queries: AuthQueries;
	private emitter = new EventEmitter<AuthEvents>();

	static INSTANCE_SUBSCRIPTION: Subscription | null = null;
	private session: TeardownUserSession | null = null;

	constructor(private supabase: SupabaseService) {
		this.api = new AuthApi(supabase);
		this.queries = new AuthQueries(this.api);

		this.register();
	}

	register() {
		if (AuthService.INSTANCE_SUBSCRIPTION != null) {
			AuthService.INSTANCE_SUBSCRIPTION.unsubscribe();
			AuthService.INSTANCE_SUBSCRIPTION = null;
		}

		const { data } = this.supabase.client.auth.onAuthStateChange(
			(event, session) => this.handleAuthStateChange(event, session),
		);
		AuthService.INSTANCE_SUBSCRIPTION = data.subscription;

		// void this.loadSession();
	}

	setAuthState(event: AuthChangeEvent, session: TeardownUserSession | null) {
		this.session = session;
		this.emitter.emit("AUTH_STATE_CHANGE", {
			event,
			session,
		});
	}

	async handleAuthStateChange(event: AuthChangeEvent, session: Session | null) {
		this.setAuthState(event, session as TeardownUserSession | null);
	}

	onAuthStateChange(callback: (e: AuthEvents["AUTH_STATE_CHANGE"]) => void) {
		this.emitter.on("AUTH_STATE_CHANGE", (e) => callback(e));

		return () => {
			this.emitter.off("AUTH_STATE_CHANGE", callback);
		};
	}

	getSession(): TeardownUserSession | null {
		return this.session;
	}

	async signOut() {
		await this.supabase.client.auth.signOut();
		this.emitter.emit("AUTH_STATE_CHANGE", {
			event: "SIGNED_OUT",
			session: null,
		});
	}
}
