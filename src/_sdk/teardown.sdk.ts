import { QueryClient } from "@tanstack/react-query";
import { AuthService } from "./modules/auth";
import { OrganisationsService } from "./modules/organisations";
import { SupabaseService } from "./modules/supabase";
import { ProjectsService } from "./modules/projects";

const createQueryClient = () => {
	return new QueryClient({
		defaultOptions: {
			queries: { refetchOnWindowFocus: false },
		},
	});
};

export class Teardown {
	private supabase: SupabaseService;
	public queryClient: QueryClient;

	public auth: AuthService;

	// Models
	public organisations: OrganisationsService;
	public projects: ProjectsService;

	constructor(config: {
		supabase: {
			url: string;
			key: string;
		};
		queryClient?: QueryClient;
	}) {
		this.supabase = new SupabaseService(
			config.supabase.url,
			config.supabase.key,
		);
		this.queryClient = config.queryClient ?? createQueryClient();

		this.auth = new AuthService(this.supabase);
		this.organisations = new OrganisationsService(
			this.queryClient,
			this.supabase,
		);
		this.projects = new ProjectsService(this.queryClient, this.supabase);
	}
}
