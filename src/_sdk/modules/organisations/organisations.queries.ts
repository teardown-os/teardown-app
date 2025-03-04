import {
	type QueryClient,
	queryOptions,
	useMutation,
	useQuery,
	type UseQueryOptions,
} from "@tanstack/react-query";
import { QueryKeyGenerator } from "../queries";
import type {
	OrganisationsApi,
	OrganisationCreatePayload,
} from "./organisations.api";
import type { Organisation } from "./organisation";

export class OrganisationsQueries extends QueryKeyGenerator {
	constructor(
		client: QueryClient,
		private readonly api: OrganisationsApi,
	) {
		super(client, "organisation");
	}

	organisationsQueryOptions(
		options?: Omit<UseQueryOptions<Organisation[]>, "queryKey" | "queryFn">,
	) {
		return queryOptions({
			...options,
			queryKey: this.keyGen("organisations"),
			queryFn: async () => {
				const result = await this.api.getOrganisations();
				if (result.error) {
					throw result.error;
				}
				return result.data;
			},
		});
	}

	refreshOrganisations() {
		return this.client.invalidateQueries({
			queryKey: this.keyGen("organisations"),
		});
	}

	useOrganisations(
		options?: Omit<UseQueryOptions<Organisation[]>, "queryKey" | "queryFn">,
	) {
		return useQuery(this.organisationsQueryOptions(options));
	}

	getOrganisations() {
		return this.client.fetchQuery(this.organisationsQueryOptions());
	}

	useCreateOrganisationMutation() {
		return useMutation({
			mutationFn: async (organisationCreate: OrganisationCreatePayload) => {
				const result = await this.api.createOrganisation(organisationCreate);
				if (result.error) {
					throw result.error;
				}
				return result.data;
			},
			onSuccess: async () => {
				await this.refresh();
			},
		});
	}

	organisationQueryOptions(organisationId: string) {
		return queryOptions({
			// staleTime: 1000 * 60 * 60 * 1, // 1 hour
			queryKey: this.keyGen("organisation", organisationId),
			queryFn: async () => {
				const result = await this.api.getOrganisation(organisationId);
				if (result.error) {
					throw result.error;
				}
				return result.data;
			},
		});
	}

	useOrganisation(organisationId: string) {
		return useQuery(this.organisationQueryOptions(organisationId));
	}

	getOrganisation(organisationId: string) {
		return this.client.fetchQuery(
			this.organisationQueryOptions(organisationId),
		);
	}

	useUpdateOrganisationMutation() {
		return useMutation({
			mutationFn: async ({
				organisationId,
				payload,
			}: {
				organisationId: string;
				payload: { name: string };
			}) => {
				const result = await this.api.updateOrganisation({
					p_organisation_id: organisationId,
					p_name: payload.name,
				});
				if (result.error) {
					throw result.error;
				}
				return result.data;
			},
			onSuccess: async () => {
				await this.refresh();
			},
		});
	}

	useDeleteOrganisationMutation() {
		return useMutation({
			mutationFn: async (organisationId: string) => {
				const result = await this.api.deleteOrganisation(organisationId);
				if (result.error) {
					throw result.error;
				}
				return result.data;
			},
			onSuccess: async () => {
				await this.refresh();
			},
		});
	}
}
