import { QueryClient } from "@tanstack/react-query";
import { QueryStorage } from "./queries.storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";

export type QueriesServiceOptions = {
	queryClient?: QueryClient;
	storage?: QueryStorage;
};

export class QueriesService {
	private _client: QueryClient;
	private _storage: QueryStorage;

	constructor(options?: QueriesServiceOptions) {
		this._client = options?.queryClient ?? createDefaultQueryClient();
		this._storage = options?.storage ?? createDefaultQueryStorage();

		persistQueryClient({
			queryClient: this._client,
			persister: createPersister(this._storage),
		});
	}

	public get client() {
		return this._client;
	}

	public get storage() {
		return this._storage;
	}
}

const createDefaultQueryClient = () => {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 15 * 1000, // 15 seconds
				// refetchOnWindowFocus: false,
			},
		},
	});
};

const createDefaultQueryStorage = () => {
	return new QueryStorage();
};

const createPersister = (storage: QueryStorage) => {
	return createAsyncStoragePersister({
		storage,
	});
};
