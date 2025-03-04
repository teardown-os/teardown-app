import type { QueryClient } from "@tanstack/react-query";
import type { SupabaseService } from "../supabase/index.ts";
import { OrganisationsApi } from "./organisations.api.ts";
import { OrganisationsQueries } from "./organisations.queries.ts";

export class OrganisationsService {
	api: OrganisationsApi;
	queries: OrganisationsQueries;

	constructor(queryClient: QueryClient, supabase: SupabaseService) {
		this.api = new OrganisationsApi(supabase);
		this.queries = new OrganisationsQueries(queryClient, this.api);
	}
}
