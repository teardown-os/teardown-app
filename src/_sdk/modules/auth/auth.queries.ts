import { queryOptions, useQuery } from "@tanstack/react-query";
import type { AuthApi } from "./auth.api.ts";

export class AuthQueries {
	constructor(private readonly api: AuthApi) {}

	userQueryOptions() {
		return queryOptions({
			queryKey: ["user"],
			queryFn: () => this.api.getUser(),
		});
	}

	useUser() {
		return useQuery(this.userQueryOptions());
	}
}
