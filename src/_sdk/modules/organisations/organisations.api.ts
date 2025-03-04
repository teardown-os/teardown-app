import { ApiBase } from "../api";
import type { FunctionArgs } from "../supabase";
import { OrganisationInstance } from "./organisation";

export type OrganisationCreatePayload = FunctionArgs<"create_organisation">;
export type OrganisationUpdatePayload = FunctionArgs<"update_organisation">;

export class OrganisationsApi extends ApiBase {
	async getOrganisationRoles() {
		const { data: userData, error: userError } =
			await this.supabase.client.auth.getUser();

		if (userError != null) {
			return {
				data: null,
				error: userError,
			};
		}

		const userId = userData.user.id;

		const { data, error } = await this.supabase.client
			.from("organisation_role")
			.select("*")
			.eq("user_id", userId)
			.in("status", ["PENDING", "ACTIVE"]);

		if (error != null) {
			return {
				data: null,
				error,
			};
		}

		if (!data) {
			return {
				data: null,
				error: new Error("Failed to get organisation roles"),
			};
		}

		return {
			data,
			error: null,
		};
	}

	async getOrganisationRole(organisationId: string) {
		const { data: userData, error: userError } =
			await this.supabase.client.auth.getUser();

		if (userError != null) {
			return {
				data: null,
				error: userError,
			};
		}

		const userId = userData.user.id;

		const { data, error } = await this.supabase.client
			.from("organisation_role")
			.select("*")
			.eq("user_id", userId)
			.eq("organisation_id", organisationId)
			.single();

		if (error != null) {
			return {
				data: null,
				error,
			};
		}

		if (!data) {
			return {
				data: null,
				error: new Error("Failed to get organisation role"),
			};
		}

		return {
			data,
			error: null,
		};
	}

	async getOrganisations() {
		const rolesResult = await this.getOrganisationRoles();
		if (rolesResult.error) {
			return {
				data: null,
				error: rolesResult.error,
			};
		}

		const organisationIds = rolesResult.data.map(
			(role) => role.organisation_id,
		);

		const { data, error } = await this.supabase.client
			.from("organisation")
			.select("*")
			.in("id", organisationIds);

		if (error != null) {
			return {
				data: null,
				error,
			};
		}

		if (!data) {
			return {
				data: null,
				error: new Error("Failed to get organisations"),
			};
		}

		try {
			const organisations = rolesResult.data.map((role) => {
				const organisation = data.find(
					(org) => org.id === role.organisation_id,
				);
				if (!organisation) {
					throw new Error("Organisation not found");
				}

				return new OrganisationInstance(organisation, role).toJSON();
			});

			return {
				data: organisations,
				error: null,
			};
		} catch (error) {
			return {
				data: null,
				error:
					error instanceof Error
						? error
						: new Error("Failed to process organisations"),
			};
		}
	}

	async getOrganisation(organisationId: string) {
		const { data, error } = await this.supabase.client
			.from("organisation")
			.select("*")
			.eq("id", organisationId)
			.single();

		if (error != null) {
			return {
				data: null,
				error,
			};
		}

		if (!data) {
			return {
				data: null,
				error: new Error("Organisation not found"),
			};
		}

		const roleResult = await this.getOrganisationRole(organisationId);
		if (roleResult.error) {
			return {
				data: null,
				error: roleResult.error,
			};
		}

		return {
			data: new OrganisationInstance(data, roleResult.data).toJSON(),
			error: null,
		};
	}

	async createOrganisation(payload: OrganisationCreatePayload) {
		const { data, error } = await this.supabase.client.rpc(
			"create_organisation",
			payload,
		);

		if (error != null) {
			return {
				data: null,
				error,
			};
		}

		return this.getOrganisation(data);
	}

	async updateOrganisation(payload: OrganisationUpdatePayload) {
		const { error } = await this.supabase.client.rpc(
			"update_organisation",
			payload,
		);

		if (error != null) {
			return {
				data: null,
				error,
			};
		}

		const result = await this.getOrganisation(payload.p_organisation_id);
		if (result.error) {
			return {
				data: null,
				error: new Error("Failed to get updated organisation"),
			};
		}

		return result;
	}

	async deleteOrganisation(organisationId: string) {
		const { error } = await this.supabase.client.rpc("delete_organisation", {
			p_organisation_id: organisationId,
		});

		if (error != null) {
			return {
				data: null,
				error,
			};
		}

		return {
			data: true,
			error: null,
		};
	}
}
