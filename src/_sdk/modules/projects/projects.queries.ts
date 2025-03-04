import {
	type QueryClient,
	queryOptions,
	useMutation,
	useQuery,
} from "@tanstack/react-query";
import type {
	ProjectApi,
	ProjectCreatePayload,
	ProjectUpdatePayload,
} from "./projects.api.ts";
import { QueryKeyGenerator } from "../queries";

export class ProjectsQueries extends QueryKeyGenerator {
	constructor(
		client: QueryClient,
		private readonly api: ProjectApi,
	) {
		super(client, "projects");
	}

	projectsQueryOptions(organisationId: string | null) {
		return queryOptions({
			enabled: organisationId != null,
			queryKey: this.keyGen("projects", organisationId),
			queryFn: async () => {
				if (organisationId == null) {
					throw new Error("Organisation ID is required");
				}

				const result = await this.api.getProjects(organisationId);
				if (result.error) {
					throw result.error;
				}
				return result.data;
			},
		});
	}

	useProjects(organisationId: string | null) {
		return useQuery(this.projectsQueryOptions(organisationId));
	}

	getProjects(organisationId: string | null) {
		return this.client.fetchQuery(this.projectsQueryOptions(organisationId));
	}

	projectQueryOptions(projectId: string) {
		return queryOptions({
			queryKey: this.keyGen("project", projectId),
			queryFn: async () => {
				const result = await this.api.getProject(projectId);
				if (result.error) {
					throw result.error;
				}
				return result.data;
			},
		});
	}

	useProject(projectId: string) {
		return useQuery(this.projectQueryOptions(projectId));
	}

	getProject(projectId: string) {
		return this.client.fetchQuery(this.projectQueryOptions(projectId));
	}

	async isGithubConnected(projectId: string) {
		const result = await this.getProject(projectId);
		return result.owner != null && result.repo != null;
	}

	useCreateProjectMutation() {
		return useMutation({
			mutationFn: async (projectCreate: ProjectCreatePayload) => {
				const result = await this.api.createProject(projectCreate);
				if (result.error) {
					throw result.error;
				}
				return result.data;
			},
			onSuccess: async (_, args) => {
				await this.client.invalidateQueries(
					this.projectsQueryOptions(args.p_organisation_id),
				);
			},
		});
	}

	useUpdateProjectMutation() {
		return useMutation({
			mutationFn: async ({
				projectId,
				payload,
			}: {
				projectId: string;
				payload: ProjectUpdatePayload;
			}) => {
				const result = await this.api.updateProject(projectId, payload);
				if (result.error) {
					throw result.error;
				}
				return result.data;
			},
			onSuccess: async (_, { projectId }) => {
				await this.client.invalidateQueries(
					this.projectQueryOptions(projectId),
				);
			},
		});
	}

	useDeleteProjectMutation() {
		return useMutation({
			mutationFn: async (projectId: string) => {
				const result = await this.api.deleteProject(projectId);
				if (result.error) {
					throw result.error;
				}
				return result.data;
			},
			onSuccess: async () => {
				await this.client.invalidateQueries({
					queryKey: this.keyGen("projects"),
				});
			},
		});
	}
}
