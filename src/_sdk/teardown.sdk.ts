import { AuthService } from "./modules/auth";
import { OrganisationsService } from "./modules/organisations";
import { ProjectsService } from "./modules/projects";
import { QueriesService, type QueriesServiceOptions } from "./modules/queries";
import { SupabaseService } from "./modules/supabase";

export class Teardown {
	private supabase: SupabaseService;
	public queries: QueriesService;

	public auth: AuthService;

	// Models
	public organisations: OrganisationsService;
	public projects: ProjectsService;

	constructor(config: {
		supabase: {
			url: string;
			key: string;
		};
		queries?: QueriesServiceOptions;
	}) {
		this.supabase = new SupabaseService(
			config.supabase.url,
			config.supabase.key,
		);

		this.queries = new QueriesService(config.queries);

		this.auth = new AuthService(this.supabase);
		this.organisations = new OrganisationsService(
			this.queries.client,
			this.supabase,
		);
		this.projects = new ProjectsService(this.queries.client, this.supabase);
	}
}
