import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import type { OrganisationMember } from "./organisation-members";
import type { OrganisationMemberApi } from "./organisation-members.api";
import type { Database } from "../supabase";

export class OrganisationMemberQueries extends QueryKeyGenerator {
	constructor(
		teardown: TeardownSDK,
		private readonly api: OrganisationMemberApi,
	) {
		super(teardown, "organisation-members");
	}

	organisationMembersQueryOptions(organisationId: string | null) {
		return queryOptions({
			enabled: organisationId != null,
			queryKey: this.keyGen("members", organisationId),
			queryFn: async () => {
				if (organisationId == null) {
					throw new Error("Organisation ID is required");
				}

				return this.api.getOrganisationMembers(organisationId);
			},
		});
	}

	useOrganisationMembers(organisationId: string | null) {
		return useQuery(this.organisationMembersQueryOptions(organisationId));
	}

	getOrganisationMembers(organisationId: string | null) {
		return this.teardown.queryClient.fetchQuery(
			this.organisationMembersQueryOptions(organisationId),
		);
	}

	useUpdateMemberRoleMutation() {
		return useMutation({
			mutationFn: async ({
				organisationId,
				userId,
				role,
			}: {
				organisationId: string;
				userId: string;
				role: Exclude<OrganisationMember["role"], "UNKNOWN">;
			}) => {
				return this.api.updateMemberRole(organisationId, userId, role);
			},
			onSuccess: async (_, { organisationId }) => {
				await this.refresh();
			},
		});
	}

	useRemoveMemberMutation() {
		return useMutation({
			mutationFn: async ({
				organisationId,
				userId,
			}: {
				organisationId: string;
				userId: string;
			}) => {
				return this.api.removeMember(organisationId, userId);
			},
			onSuccess: async (_, { organisationId }) => {
				await this.refresh();
			},
		});
	}

	useInviteMemberByCodeMutation() {
		return useMutation({
			mutationFn: async ({
				organisationId,
				userCode,
				role,
			}: {
				organisationId: string;
				userCode: string;
				role: Database["public"]["Enums"]["organisation_role_enum"];
			}) => {
				return this.api.inviteMemberByCode(organisationId, userCode, role);
			},
			onSuccess: async (_, { organisationId }) => {
				await this.refresh();
				await this.teardown.supabase.organisation.queries.refresh();
			},
		});
	}

	useAcceptInviteMutation() {
		return useMutation({
			mutationFn: async ({
				organisationId,
			}: {
				organisationId: string;
			}) => {
				return this.api.acceptInvite(organisationId);
			},
			onSuccess: async () => {
				await this.refresh();
				await this.teardown.supabase.organisation.queries.refresh();
			},
		});
	}

	useRejectInviteMutation() {
		return useMutation({
			mutationFn: async ({
				organisationId,
			}: {
				organisationId: string;
			}) => {
				return this.api.rejectInvite(organisationId);
			},
			onSuccess: async () => {
				await this.refresh();
				await this.teardown.supabase.organisation.queries.refresh();
			},
		});
	}
}
