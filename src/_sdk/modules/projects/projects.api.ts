import type { SupabaseClient } from "@supabase/supabase-js";
import type { FunctionArgs, TablesUpdate } from "../supabase/types.ts";
import { Project, ProjectInstance } from "./project.ts";
import { ApiBase } from "../api";
import { Result } from "../types/index.ts";

export type ProjectCreatePayload = FunctionArgs<"create_project">;
export type ProjectUpdatePayload = Pick<
	TablesUpdate<"project">,
	"repo" | "owner" | "working_branch"
>;

export class ProjectApi extends ApiBase {
	async getProjects(organisationId: string) {
		const { data, error } = await this.supabase.client
			.from("project")
			.select("*")
			.eq("organisation_id", organisationId);

		if (error != null) {
			return {
				data: null,
				error,
			};
		}

		if (!data) {
			return {
				data: null,
				error: new Error("Failed to get projects"),
			};
		}

		return {
			data: data.map((project) => new ProjectInstance(project).toJSON()),
			error: null,
		};
	}

	async getProject(projectId: string) {
		const { data, error } = await this.supabase.client
			.from("project")
			.select("*")
			.eq("id", projectId)
			.single();

		if (error != null) {
			return {
				data: null,
				error,
			};
		}

		if (data == null) {
			return {
				data: null,
				error: new Error("Project not found"),
			};
		}

		return {
			data: new ProjectInstance(data).toJSON(),
			error: null,
		};
	}

	async createProject(payload: ProjectCreatePayload) {
		const { data, error } = await this.supabase.client.rpc(
			"create_project",
			payload,
		);

		if (error !== null) {
			return {
				data: null,
				error,
			};
		}

		return this.getProject(data);
	}

	async updateProject(projectId: string, payload: ProjectUpdatePayload) {
		const { data, error } = await this.supabase.client
			.from("project")
			.update(payload)
			.eq("id", projectId)
			.select("*")
			.single();

		if (error !== null) {
			return {
				data: null,
				error,
			};
		}

		if (!data) {
			return {
				data: null,
				error: new Error("Failed to update project"),
			};
		}

		return {
			data: new ProjectInstance(data).toJSON(),
			error: null,
		};
	}

	async deleteProject(projectId: string) {
		const { error } = await this.supabase.client
			.from("project")
			.delete()
			.eq("id", projectId);

		if (error !== null) {
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
