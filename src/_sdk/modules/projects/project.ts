import type { Tables, Enums } from "../supabase";

export type Platform =
	| "APP_STORE_CONNECT"
	| "GOOGLE_PLAY_STORE"
	| "TEARDOWN"
	| "EXPO";

export type ProjectType = Enums<"project_type_enum">;

export type Project = Tables<"project"> & {
	platforms: Platform[];
};

export class ProjectInstance {
	constructor(readonly supabaseProject: Tables<"project">) {}

	get platforms(): Platform[] {
		switch (this.supabaseProject.project_type) {
			case "IOS":
				return ["APP_STORE_CONNECT"];
			case "ANDROID":
				return ["GOOGLE_PLAY_STORE"];
			case "REACT_NATIVE":
				return ["APP_STORE_CONNECT", "GOOGLE_PLAY_STORE"]; // TODO add TEARDOWN here
			case "REACT_NATIVE_EXPO":
				return ["EXPO", "APP_STORE_CONNECT", "GOOGLE_PLAY_STORE"];
			case "TAURI":
				return ["TEARDOWN"];
			default:
				return [];
		}
	}

	toJSON(): Project {
		return {
			...this.supabaseProject,
			platforms: this.platforms,
		};
	}
}
