import type { SupabaseClient } from "@supabase/supabase-js";
import {
	type OrganisationMember,
	OrganisationMemberInstance,
} from "./organisation-members";
import { ApiBase } from "../api";

export class OrganisationMemberApi extends ApiBase {
	async getOrganisationMembers(organisationId: string) {
		const { data } = await this.supabase.client
			.rpc("get_organisation_members", {
				p_organisation_id: organisationId,
			})
			.throwOnError();

		if (!data) {
			throw new Error("Failed to get organisation members");
		}

		return data.map((member) =>
			new OrganisationMemberInstance(member).toJSON(),
		);
	}

	async updateMemberRole(
		organisationId: string,
		userId: string,
		role: OrganisationRoleEnum,
	) {
		const { data } = await this.supabase.client
			.rpc("update_organisation_member_role", {
				p_organisation_id: organisationId,
				p_user_id: userId,
				p_role: role,
			})
			.throwOnError()
			.single();

		if (!data) {
			throw new Error("Failed to update member role");
		}

		return new OrganisationMemberInstance(data).toJSON();
	}

	async removeMember(organisationId: string, userId: string) {
		await this.client
			.rpc("remove_organisation_member", {
				p_organisation_id: organisationId,
				p_user_id: userId,
			})
			.throwOnError();
	}

	async inviteMemberByCode(
		organisationId: string,
		userCode: string,
		role: Database["public"]["Enums"]["organisation_role_enum"],
	) {
		await this.client
			.rpc("invite_organisation_member_by_code", {
				p_organisation_id: organisationId,
				p_user_code: userCode,
				p_role: role,
			})
			.throwOnError();
	}

	async acceptInvite(organisationId: string) {
		const { data } = await this.client
			.rpc("accept_organisation_invite", {
				p_organisation_id: organisationId,
			})
			.throwOnError()
			.single();

		if (!data) {
			throw new Error("Failed to accept invite");
		}

		return new OrganisationMemberInstance(data).toJSON();
	}

	async rejectInvite(organisationId: string) {
		const { data } = await this.client
			.rpc("reject_organisation_invite", {
				p_organisation_id: organisationId,
			})
			.throwOnError()
			.single();

		if (!data) {
			throw new Error("Failed to reject invite");
		}

		return new OrganisationMemberInstance(data).toJSON();
	}
}
