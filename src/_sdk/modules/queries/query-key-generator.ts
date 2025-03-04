import type { QueryClient } from "@tanstack/react-query";

export class QueryKeyGenerator {
	public client: QueryClient;

	constructor(
		client: QueryClient,
		private readonly prefix: string,
	) {
		this.client = client;
	}

	get root() {
		return `@teardown/${this.prefix}`;
	}

	keyGen(resource?: string, ...args: any[]) {
		if (resource == null && args.length === 0) {
			return [this.root];
		}

		if (resource == null) {
			return [this.root, ...args];
		}

		return [this.root, resource, ...args];
	}

	refresh(resource?: string) {
		return this.client.invalidateQueries({
			queryKey: this.keyGen(resource),
		});
	}
}
