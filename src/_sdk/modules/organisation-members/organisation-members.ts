import type { Database, Tables, CompositeTypes } from "../supabase";

export type OrganisationMember = {
	user_id: string;
	user_name: string;
	user_email: string;
	organisation_id: string;
	role: Database["public"]["Enums"]["organisation_role_enum"] | "UNKNOWN";
	status:
		| Database["public"]["Enums"]["organisation_role_status_enum"]
		| "UNKNOWN";
};

export class OrganisationMemberInstance {
	constructor(private readonly data: CompositeTypes<"organisation_member">) {}

	get user_id(): string | null {
		return this.data.user_id ?? null;
	}

	get user_name(): string | null {
		return this.data.user_name ?? null;
	}

	get user_email(): string | null {
		return this.data.user_email ?? null;
	}

	get organisation_id(): string | null {
		return this.data.organisation_id ?? null;
	}

	get role(): Database["public"]["Enums"]["organisation_role_enum"] | null {
		return this.data.role ?? null;
	}

	get status():
		| Database["public"]["Enums"]["organisation_role_status_enum"]
		| null {
		return this.data.status ?? null;
	}

	toJSON(): OrganisationMember {
		return {
			user_id: this.user_id ?? "",
			user_name: this.user_name ?? "",
			user_email: this.user_email ?? "",
			organisation_id: this.organisation_id ?? "",
			role: this.role ?? "UNKNOWN",
			status: this.status ?? "UNKNOWN",
		};
	}
}
