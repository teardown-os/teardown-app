import type { QueryClient } from "@tanstack/react-query";
import type { SupabaseService } from "../supabase/index.ts";
import { OrganisationMemberApi } from "./organisation-members.api";
import { OrganisationMemberQueries } from "./organisation-members.queries";
export class OrganisationMemberService {
	readonly api: OrganisationMemberApi;
	readonly queries: OrganisationMemberQueries;

	constructor(queryClient: QueryClient, supabase: SupabaseService) {
		this.api = new OrganisationMemberApi(supabase);
		this.queries = new OrganisationMemberQueries(queryClient, this.api);
	}
}
