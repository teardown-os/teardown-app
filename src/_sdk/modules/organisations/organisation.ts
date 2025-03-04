import type { Enums, Tables } from "../supabase";

export type OrganisationTypeEnum = Enums<"organisation_type_enum">;
export type SupabaseOrganisation = Tables<"organisation">;
export type OrganisationRole = Tables<"organisation_role">;

export type Organisation = SupabaseOrganisation & {
	role: OrganisationRole;
	isOwnerOrAdmin: boolean;
};

export class OrganisationInstance {
	constructor(
		readonly supabaseOrganisation: SupabaseOrganisation,
		readonly role: OrganisationRole,
	) {}

	isOwnerOrAdmin(): boolean {
		return this.role.role === "OWNER" || this.role.role === "ADMIN";
	}

	toJSON(): Organisation {
		return {
			...this.supabaseOrganisation,
			role: this.role,
			isOwnerOrAdmin: this.isOwnerOrAdmin(),
		};
	}
}
