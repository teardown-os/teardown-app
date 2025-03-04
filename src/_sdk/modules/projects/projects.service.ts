import type { QueryClient } from "@tanstack/react-query";
import type { SupabaseService } from "../supabase/index.ts";
import { ProjectApi } from "./projects.api.ts";
import { ProjectsQueries } from "./projects.queries.ts";

export class ProjectsService {
	api: ProjectApi;
	queries: ProjectsQueries;

	constructor(queryClient: QueryClient, supabase: SupabaseService) {
		this.api = new ProjectApi(supabase);
		this.queries = new ProjectsQueries(queryClient, this.api);
	}
}
