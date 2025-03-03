export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	public: {
		Tables: {
			api_key: {
				Row: {
					api_key: string;
					created_at: string;
					entity_id: string;
					entity_type: string;
					id: string;
					updated_at: string;
				};
				Insert: {
					api_key: string;
					created_at?: string;
					entity_id: string;
					entity_type: string;
					id?: string;
					updated_at?: string;
				};
				Update: {
					api_key?: string;
					created_at?: string;
					entity_id?: string;
					entity_type?: string;
					id?: string;
					updated_at?: string;
				};
				Relationships: [];
			};
			appstore_connect_config: {
				Row: {
					app_id: string | null;
					created_at: string;
					id: string;
					issuer_id: string | null;
					private_key: string | null;
					private_key_id: string | null;
					project_id: string;
					status: Database["public"]["Enums"]["config_status"];
				};
				Insert: {
					app_id?: string | null;
					created_at?: string;
					id?: string;
					issuer_id?: string | null;
					private_key?: string | null;
					private_key_id?: string | null;
					project_id: string;
					status?: Database["public"]["Enums"]["config_status"];
				};
				Update: {
					app_id?: string | null;
					created_at?: string;
					id?: string;
					issuer_id?: string | null;
					private_key?: string | null;
					private_key_id?: string | null;
					project_id?: string;
					status?: Database["public"]["Enums"]["config_status"];
				};
				Relationships: [
					{
						foreignKeyName: "ios_config_issuer_id_fkey";
						columns: ["issuer_id"];
						isOneToOne: false;
						referencedRelation: "secrets";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "ios_config_private_key_fkey";
						columns: ["private_key"];
						isOneToOne: false;
						referencedRelation: "secrets";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "ios_config_private_key_id_fkey";
						columns: ["private_key_id"];
						isOneToOne: false;
						referencedRelation: "secrets";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "ios_config_project_id_fkey";
						columns: ["project_id"];
						isOneToOne: false;
						referencedRelation: "project";
						referencedColumns: ["id"];
					},
				];
			};
			bitrise_config: {
				Row: {
					api_token: string | null;
					app_slug: string | null;
					created_at: string;
					id: string;
					project_id: string | null;
					status: Database["public"]["Enums"]["config_status"];
					trigger_token: string | null;
				};
				Insert: {
					api_token?: string | null;
					app_slug?: string | null;
					created_at?: string;
					id?: string;
					project_id?: string | null;
					status?: Database["public"]["Enums"]["config_status"];
					trigger_token?: string | null;
				};
				Update: {
					api_token?: string | null;
					app_slug?: string | null;
					created_at?: string;
					id?: string;
					project_id?: string | null;
					status?: Database["public"]["Enums"]["config_status"];
					trigger_token?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "bitrise_config_api_token_fkey";
						columns: ["api_token"];
						isOneToOne: false;
						referencedRelation: "secrets";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "bitrise_config_app_slug_fkey";
						columns: ["app_slug"];
						isOneToOne: false;
						referencedRelation: "secrets";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "bitrise_config_project_id_fkey";
						columns: ["project_id"];
						isOneToOne: false;
						referencedRelation: "project";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "bitrise_config_trigger_token_fkey";
						columns: ["trigger_token"];
						isOneToOne: false;
						referencedRelation: "secrets";
						referencedColumns: ["id"];
					},
				];
			};
			build: {
				Row: {
					build_number: number;
					commit_sha: string | null;
					created_at: string;
					id: string;
					project_id: string;
					status: Database["public"]["Enums"]["build_status"];
					version_id: string;
				};
				Insert: {
					build_number: number;
					commit_sha?: string | null;
					created_at?: string;
					id?: string;
					project_id: string;
					status?: Database["public"]["Enums"]["build_status"];
					version_id: string;
				};
				Update: {
					build_number?: number;
					commit_sha?: string | null;
					created_at?: string;
					id?: string;
					project_id?: string;
					status?: Database["public"]["Enums"]["build_status"];
					version_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "build_project_id_fkey1";
						columns: ["project_id"];
						isOneToOne: false;
						referencedRelation: "project";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "build_version_id_fkey";
						columns: ["version_id"];
						isOneToOne: false;
						referencedRelation: "version";
						referencedColumns: ["id"];
					},
				];
			};
			build_artifact: {
				Row: {
					arch: string | null;
					build_id: string | null;
					commit_sha: string | null;
					created_at: string;
					file_name: string;
					file_type: string;
					id: string;
					notes: string | null;
					project_id: string;
					signature: string | null;
					status: Database["public"]["Enums"]["build_status"];
					target: string;
					updated_at: string;
				};
				Insert: {
					arch?: string | null;
					build_id?: string | null;
					commit_sha?: string | null;
					created_at?: string;
					file_name: string;
					file_type: string;
					id?: string;
					notes?: string | null;
					project_id: string;
					signature?: string | null;
					status?: Database["public"]["Enums"]["build_status"];
					target: string;
					updated_at?: string;
				};
				Update: {
					arch?: string | null;
					build_id?: string | null;
					commit_sha?: string | null;
					created_at?: string;
					file_name?: string;
					file_type?: string;
					id?: string;
					notes?: string | null;
					project_id?: string;
					signature?: string | null;
					status?: Database["public"]["Enums"]["build_status"];
					target?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "build_artifact_build_id_fkey";
						columns: ["build_id"];
						isOneToOne: false;
						referencedRelation: "build";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "build_project_id_fkey";
						columns: ["project_id"];
						isOneToOne: false;
						referencedRelation: "project";
						referencedColumns: ["id"];
					},
				];
			};
			build_config: {
				Row: {
					created_at: string;
					id: string;
					project_id: string;
					status: Database["public"]["Enums"]["config_status"];
					tag_pattern: string | null;
					tag_pattern_target: string | null;
					updated_at: string;
					workflow_id: string | null;
					workflow_provider: string | null;
				};
				Insert: {
					created_at?: string;
					id?: string;
					project_id: string;
					status?: Database["public"]["Enums"]["config_status"];
					tag_pattern?: string | null;
					tag_pattern_target?: string | null;
					updated_at?: string;
					workflow_id?: string | null;
					workflow_provider?: string | null;
				};
				Update: {
					created_at?: string;
					id?: string;
					project_id?: string;
					status?: Database["public"]["Enums"]["config_status"];
					tag_pattern?: string | null;
					tag_pattern_target?: string | null;
					updated_at?: string;
					workflow_id?: string | null;
					workflow_provider?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "build_config_project_id_fkey";
						columns: ["project_id"];
						isOneToOne: true;
						referencedRelation: "project";
						referencedColumns: ["id"];
					},
				];
			};
			expo_config: {
				Row: {
					app_id: string | null;
					created_at: string;
					id: string;
					issuer_id: string | null;
					private_key: string | null;
					private_key_id: string | null;
					project_id: string;
					status: Database["public"]["Enums"]["config_status"];
				};
				Insert: {
					app_id?: string | null;
					created_at?: string;
					id?: string;
					issuer_id?: string | null;
					private_key?: string | null;
					private_key_id?: string | null;
					project_id: string;
					status?: Database["public"]["Enums"]["config_status"];
				};
				Update: {
					app_id?: string | null;
					created_at?: string;
					id?: string;
					issuer_id?: string | null;
					private_key?: string | null;
					private_key_id?: string | null;
					project_id?: string;
					status?: Database["public"]["Enums"]["config_status"];
				};
				Relationships: [
					{
						foreignKeyName: "expo_config_issuer_id_fkey";
						columns: ["issuer_id"];
						isOneToOne: false;
						referencedRelation: "secrets";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "expo_config_private_key_fkey";
						columns: ["private_key"];
						isOneToOne: false;
						referencedRelation: "secrets";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "expo_config_private_key_id_fkey";
						columns: ["private_key_id"];
						isOneToOne: false;
						referencedRelation: "secrets";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "expo_config_project_id_fkey";
						columns: ["project_id"];
						isOneToOne: false;
						referencedRelation: "project";
						referencedColumns: ["id"];
					},
				];
			};
			feedback: {
				Row: {
					created_at: string;
					feedback: string;
					feedback_type: Database["public"]["Enums"]["feedback_type"];
					follow_up: boolean;
					id: string;
					metadata: Json | null;
					user_id: string | null;
				};
				Insert: {
					created_at?: string;
					feedback: string;
					feedback_type?: Database["public"]["Enums"]["feedback_type"];
					follow_up?: boolean;
					id?: string;
					metadata?: Json | null;
					user_id?: string | null;
				};
				Update: {
					created_at?: string;
					feedback?: string;
					feedback_type?: Database["public"]["Enums"]["feedback_type"];
					follow_up?: boolean;
					id?: string;
					metadata?: Json | null;
					user_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "feedback_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "user";
						referencedColumns: ["id"];
					},
				];
			};
			feedback_upvote: {
				Row: {
					created_at: string;
					feedback_id: string;
					id: string;
					user_id: string;
				};
				Insert: {
					created_at?: string;
					feedback_id: string;
					id?: string;
					user_id: string;
				};
				Update: {
					created_at?: string;
					feedback_id?: string;
					id?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "feedback_upvote_feedback_id_fkey";
						columns: ["feedback_id"];
						isOneToOne: false;
						referencedRelation: "feedback";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "feedback_upvote_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "user";
						referencedColumns: ["id"];
					},
				];
			};
			google_play_config: {
				Row: {
					created_at: string;
					id: string;
					package_name: string | null;
					project_id: string;
					service_account_json: string | null;
					status: Database["public"]["Enums"]["config_status"];
				};
				Insert: {
					created_at?: string;
					id?: string;
					package_name?: string | null;
					project_id: string;
					service_account_json?: string | null;
					status?: Database["public"]["Enums"]["config_status"];
				};
				Update: {
					created_at?: string;
					id?: string;
					package_name?: string | null;
					project_id?: string;
					service_account_json?: string | null;
					status?: Database["public"]["Enums"]["config_status"];
				};
				Relationships: [
					{
						foreignKeyName: "android_config_project_id_fkey";
						columns: ["project_id"];
						isOneToOne: false;
						referencedRelation: "project";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "android_config_service_account_json_fkey";
						columns: ["service_account_json"];
						isOneToOne: false;
						referencedRelation: "secrets";
						referencedColumns: ["id"];
					},
				];
			};
			organisation: {
				Row: {
					created_at: string;
					id: string;
					name: string;
					type: Database["public"]["Enums"]["organisation_type_enum"];
				};
				Insert: {
					created_at?: string;
					id?: string;
					name: string;
					type?: Database["public"]["Enums"]["organisation_type_enum"];
				};
				Update: {
					created_at?: string;
					id?: string;
					name?: string;
					type?: Database["public"]["Enums"]["organisation_type_enum"];
				};
				Relationships: [];
			};
			organisation_role: {
				Row: {
					id: string;
					organisation_id: string;
					role: Database["public"]["Enums"]["organisation_role_enum"];
					status: Database["public"]["Enums"]["organisation_role_status_enum"];
					user_id: string;
				};
				Insert: {
					id?: string;
					organisation_id: string;
					role: Database["public"]["Enums"]["organisation_role_enum"];
					status?: Database["public"]["Enums"]["organisation_role_status_enum"];
					user_id: string;
				};
				Update: {
					id?: string;
					organisation_id?: string;
					role?: Database["public"]["Enums"]["organisation_role_enum"];
					status?: Database["public"]["Enums"]["organisation_role_status_enum"];
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "organisation_role_organisation_id_fkey";
						columns: ["organisation_id"];
						isOneToOne: false;
						referencedRelation: "organisation";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "organisation_role_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "user";
						referencedColumns: ["id"];
					},
				];
			};
			ota_update_config: {
				Row: {
					created_at: string;
					id: string;
					project_id: string;
					status: Database["public"]["Enums"]["config_status"];
					tag_pattern: string | null;
					updated_at: string;
					workflow_id: string | null;
					workflow_provider: string | null;
				};
				Insert: {
					created_at?: string;
					id?: string;
					project_id: string;
					status?: Database["public"]["Enums"]["config_status"];
					tag_pattern?: string | null;
					updated_at?: string;
					workflow_id?: string | null;
					workflow_provider?: string | null;
				};
				Update: {
					created_at?: string;
					id?: string;
					project_id?: string;
					status?: Database["public"]["Enums"]["config_status"];
					tag_pattern?: string | null;
					updated_at?: string;
					workflow_id?: string | null;
					workflow_provider?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "ota_update_config_project_id_fkey";
						columns: ["project_id"];
						isOneToOne: true;
						referencedRelation: "project";
						referencedColumns: ["id"];
					},
				];
			};
			project: {
				Row: {
					created_at: string;
					id: string;
					name: string;
					organisation_id: string;
					owner: string;
					project_type: Database["public"]["Enums"]["project_type_enum"];
					repo: string;
					working_branch: string;
				};
				Insert: {
					created_at?: string;
					id?: string;
					name: string;
					organisation_id: string;
					owner: string;
					project_type: Database["public"]["Enums"]["project_type_enum"];
					repo: string;
					working_branch: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					name?: string;
					organisation_id?: string;
					owner?: string;
					project_type?: Database["public"]["Enums"]["project_type_enum"];
					repo?: string;
					working_branch?: string;
				};
				Relationships: [
					{
						foreignKeyName: "project_organisation_id_fkey";
						columns: ["organisation_id"];
						isOneToOne: false;
						referencedRelation: "organisation";
						referencedColumns: ["id"];
					},
				];
			};
			release_config: {
				Row: {
					created_at: string;
					git_branch_pattern: string | null;
					git_tag_pattern: string | null;
					id: string;
					prepare_version_script_id: string | null;
					prepare_workflow_id: string | null;
					prepare_workflow_provider: string | null;
					project_id: string;
					status: Database["public"]["Enums"]["config_status"];
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					git_branch_pattern?: string | null;
					git_tag_pattern?: string | null;
					id?: string;
					prepare_version_script_id?: string | null;
					prepare_workflow_id?: string | null;
					prepare_workflow_provider?: string | null;
					project_id: string;
					status: Database["public"]["Enums"]["config_status"];
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					git_branch_pattern?: string | null;
					git_tag_pattern?: string | null;
					id?: string;
					prepare_version_script_id?: string | null;
					prepare_workflow_id?: string | null;
					prepare_workflow_provider?: string | null;
					project_id?: string;
					status?: Database["public"]["Enums"]["config_status"];
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "release_config_prepare_version_script_id_fkey";
						columns: ["prepare_version_script_id"];
						isOneToOne: false;
						referencedRelation: "script";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "release_config_project_id_fkey";
						columns: ["project_id"];
						isOneToOne: true;
						referencedRelation: "project";
						referencedColumns: ["id"];
					},
				];
			};
			script: {
				Row: {
					args: string[];
					command: string;
					created_at: string;
					id: string;
					name: string;
					project_id: string;
				};
				Insert: {
					args: string[];
					command: string;
					created_at?: string;
					id?: string;
					name: string;
					project_id?: string;
				};
				Update: {
					args?: string[];
					command?: string;
					created_at?: string;
					id?: string;
					name?: string;
					project_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "script_project_id_fkey";
						columns: ["project_id"];
						isOneToOne: false;
						referencedRelation: "project";
						referencedColumns: ["id"];
					},
				];
			};
			secrets: {
				Row: {
					created_at: string;
					created_by: string;
					entity_id: string;
					entity_type: string;
					id: string;
					name: string;
					secret_id: string;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					created_by: string;
					entity_id: string;
					entity_type: string;
					id?: string;
					name: string;
					secret_id: string;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					created_by?: string;
					entity_id?: string;
					entity_type?: string;
					id?: string;
					name?: string;
					secret_id?: string;
					updated_at?: string;
				};
				Relationships: [];
			};
			tauri_config: {
				Row: {
					created_at: string;
					id: string;
					private_key: string | null;
					private_key_password: string | null;
					project_id: string;
					status: Database["public"]["Enums"]["config_status"];
				};
				Insert: {
					created_at?: string;
					id?: string;
					private_key?: string | null;
					private_key_password?: string | null;
					project_id: string;
					status?: Database["public"]["Enums"]["config_status"];
				};
				Update: {
					created_at?: string;
					id?: string;
					private_key?: string | null;
					private_key_password?: string | null;
					project_id?: string;
					status?: Database["public"]["Enums"]["config_status"];
				};
				Relationships: [
					{
						foreignKeyName: "tauri_config_private_key_fkey";
						columns: ["private_key"];
						isOneToOne: false;
						referencedRelation: "secrets";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "tauri_config_private_key_password_fkey";
						columns: ["private_key_password"];
						isOneToOne: false;
						referencedRelation: "secrets";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "tauri_config_project_id_fkey";
						columns: ["project_id"];
						isOneToOne: false;
						referencedRelation: "project";
						referencedColumns: ["id"];
					},
				];
			};
			user: {
				Row: {
					created_at: string;
					email: string;
					id: string;
					invite_code: string | null;
					name: string;
					status: Database["public"]["Enums"]["user_status"];
					updated_at: string;
					user_code: string;
				};
				Insert: {
					created_at?: string;
					email: string;
					id?: string;
					invite_code?: string | null;
					name: string;
					status?: Database["public"]["Enums"]["user_status"];
					updated_at?: string;
					user_code: string;
				};
				Update: {
					created_at?: string;
					email?: string;
					id?: string;
					invite_code?: string | null;
					name?: string;
					status?: Database["public"]["Enums"]["user_status"];
					updated_at?: string;
					user_code?: string;
				};
				Relationships: [
					{
						foreignKeyName: "user_invite_code_fkey";
						columns: ["invite_code"];
						isOneToOne: false;
						referencedRelation: "user";
						referencedColumns: ["user_code"];
					},
				];
			};
			version: {
				Row: {
					created_at: string;
					id: string;
					major: number;
					minor: number;
					patch: number;
					prerelease: string | null;
					project_id: string;
					status: Database["public"]["Enums"]["version_status"];
				};
				Insert: {
					created_at?: string;
					id?: string;
					major: number;
					minor: number;
					patch: number;
					prerelease?: string | null;
					project_id: string;
					status?: Database["public"]["Enums"]["version_status"];
				};
				Update: {
					created_at?: string;
					id?: string;
					major?: number;
					minor?: number;
					patch?: number;
					prerelease?: string | null;
					project_id?: string;
					status?: Database["public"]["Enums"]["version_status"];
				};
				Relationships: [
					{
						foreignKeyName: "version_project_id_fkey";
						columns: ["project_id"];
						isOneToOne: false;
						referencedRelation: "project";
						referencedColumns: ["id"];
					},
				];
			};
			version_config: {
				Row: {
					created_at: string;
					git_branch_pattern: string | null;
					git_tag_pattern: string | null;
					id: string;
					prepare_workflow_id: string | null;
					prepare_workflow_provider: string | null;
					project_id: string;
					status: Database["public"]["Enums"]["config_status"];
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					git_branch_pattern?: string | null;
					git_tag_pattern?: string | null;
					id?: string;
					prepare_workflow_id?: string | null;
					prepare_workflow_provider?: string | null;
					project_id: string;
					status: Database["public"]["Enums"]["config_status"];
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					git_branch_pattern?: string | null;
					git_tag_pattern?: string | null;
					id?: string;
					prepare_workflow_id?: string | null;
					prepare_workflow_provider?: string | null;
					project_id?: string;
					status?: Database["public"]["Enums"]["config_status"];
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "version_config_project_id_fkey";
						columns: ["project_id"];
						isOneToOne: true;
						referencedRelation: "project";
						referencedColumns: ["id"];
					},
				];
			};
			workflow: {
				Row: {
					created_at: string;
					id: string;
					name: string;
					project_id: string | null;
				};
				Insert: {
					created_at?: string;
					id?: string;
					name: string;
					project_id?: string | null;
				};
				Update: {
					created_at?: string;
					id?: string;
					name?: string;
					project_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "workflow_project_id_fkey";
						columns: ["project_id"];
						isOneToOne: false;
						referencedRelation: "project";
						referencedColumns: ["id"];
					},
				];
			};
			workflow_action: {
				Row: {
					created_at: string;
					id: string;
					project_id: string | null;
					workflow_id: string;
				};
				Insert: {
					created_at?: string;
					id?: string;
					project_id?: string | null;
					workflow_id: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					project_id?: string | null;
					workflow_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "workflow_action_project_id_fkey";
						columns: ["project_id"];
						isOneToOne: false;
						referencedRelation: "project";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "workflow_action_workflow_id_fkey";
						columns: ["workflow_id"];
						isOneToOne: false;
						referencedRelation: "workflow";
						referencedColumns: ["id"];
					},
				];
			};
			workflow_step: {
				Row: {
					created_at: string;
					id: string;
					project_id: string | null;
					workflow_id: string;
				};
				Insert: {
					created_at?: string;
					id?: string;
					project_id?: string | null;
					workflow_id: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					project_id?: string | null;
					workflow_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "workflow_step_project_id_fkey";
						columns: ["project_id"];
						isOneToOne: false;
						referencedRelation: "project";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "workflow_step_workflow_id_fkey";
						columns: ["workflow_id"];
						isOneToOne: false;
						referencedRelation: "workflow";
						referencedColumns: ["id"];
					},
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			accept_organisation_invite: {
				Args: {
					p_organisation_id: string;
				};
				Returns: {
					id: string;
					organisation_id: string;
					role: Database["public"]["Enums"]["organisation_role_enum"];
					status: Database["public"]["Enums"]["organisation_role_status_enum"];
					user_id: string;
				};
			};
			add_organisation_role: {
				Args: {
					v_organisation_id: string;
					v_user_id: string;
					v_role: Database["public"]["Enums"]["organisation_role_enum"];
				};
				Returns: string;
			};
			check_user_role: {
				Args: {
					v_user_id: string;
					v_organisation_id: string;
					required_role: Database["public"]["Enums"]["organisation_role_enum"];
				};
				Returns: boolean;
			};
			create_api_key: {
				Args: {
					p_entity_id: string;
					p_entity_type: string;
				};
				Returns: string;
			};
			create_organisation: {
				Args: {
					p_name: string;
					p_type: Database["public"]["Enums"]["organisation_type_enum"];
				};
				Returns: string;
			};
			create_project: {
				Args: {
					p_name: string;
					p_organisation_id: string;
					p_owner: string;
					p_repo: string;
					p_working_branch: string;
					p_project_type: Database["public"]["Enums"]["project_type_enum"];
				};
				Returns: string;
			};
			create_secret: {
				Args: {
					v_entity_type: string;
					v_entity_id: string;
					v_secret_name: string;
					v_secret_value: string;
				};
				Returns: string;
			};
			delete_organisation: {
				Args: {
					p_organisation_id: string;
				};
				Returns: undefined;
			};
			fetch_secret_by_id: {
				Args: {
					v_secret_id: string;
				};
				Returns: string;
			};
			find_secret: {
				Args: {
					v_entity_type: string;
					v_entity_id: string;
					v_secret_name: string;
				};
				Returns: string;
			};
			generate_user_code: {
				Args: Record<PropertyKey, never>;
				Returns: string;
			};
			get_organisation_members: {
				Args: {
					p_organisation_id: string;
				};
				Returns: Database["public"]["CompositeTypes"]["organisation_member"][];
			};
			get_secret_by_id: {
				Args: {
					v_secret_id: string;
				};
				Returns: string;
			};
			has_project_access: {
				Args: {
					project_id: string;
				};
				Returns: boolean;
			};
			invite_organisation_member_by_code: {
				Args: {
					p_organisation_id: string;
					p_user_code: string;
					p_role: Database["public"]["Enums"]["organisation_role_enum"];
				};
				Returns: string;
			};
			is_owner_or_admin:
				| {
						Args: {
							v_organisation_id: string;
						};
						Returns: boolean;
				  }
				| {
						Args: {
							v_user_id: string;
							v_organisation_id: string;
						};
						Returns: boolean;
				  };
			is_owner_or_admin_of_project: {
				Args: {
					project_id: string;
				};
				Returns: boolean;
			};
			redeem_invite_code: {
				Args: {
					p_code: string;
				};
				Returns: boolean;
			};
			reject_organisation_invite: {
				Args: {
					p_organisation_id: string;
				};
				Returns: {
					id: string;
					organisation_id: string;
					role: Database["public"]["Enums"]["organisation_role_enum"];
					status: Database["public"]["Enums"]["organisation_role_status_enum"];
					user_id: string;
				};
			};
			remove_organisation_member: {
				Args: {
					p_organisation_id: string;
					p_user_id: string;
				};
				Returns: undefined;
			};
			update_organisation: {
				Args: {
					p_organisation_id: string;
					p_name: string;
				};
				Returns: undefined;
			};
			update_organisation_member_role: {
				Args: {
					p_organisation_id: string;
					p_user_id: string;
					p_role: Database["public"]["Enums"]["organisation_role_enum"];
				};
				Returns: Database["public"]["CompositeTypes"]["organisation_member"][];
			};
			update_project: {
				Args: {
					p_project_id: string;
					p_payload: Database["public"]["CompositeTypes"]["project_update_payload"];
				};
				Returns: undefined;
			};
			update_secret: {
				Args: {
					v_secret_id: string;
					v_secret_value: string;
				};
				Returns: string;
			};
			update_secret_by_id: {
				Args: {
					v_secret_id: string;
					v_secret_name: string;
					v_secret_value: string;
				};
				Returns: undefined;
			};
			user_has_access_to_org: {
				Args: {
					v_organisation_id: string;
				};
				Returns: boolean;
			};
			user_has_access_to_project: {
				Args: {
					v_project_id: string;
				};
				Returns: boolean;
			};
		};
		Enums: {
			build_status: "RELEASED" | "PENDING" | "DISABLED";
			config_status: "NOT_CONFIGURED" | "DISABLED" | "ENABLED";
			feedback_type: "BUG" | "FEATURE_REQUEST" | "PRICING" | "OTHER";
			organisation_role_enum:
				| "OWNER"
				| "ADMIN"
				| "DEVELOPER"
				| "PRODUCT"
				| "DATA"
				| "MARKETING";
			organisation_role_status_enum: "ACTIVE" | "PENDING" | "REJECTED";
			organisation_type_enum:
				| "PERSONAL"
				| "BUSINESS"
				| "ENTERPRISE"
				| "START_UP";
			project_type_enum:
				| "TAURI"
				| "REACT_NATIVE"
				| "REACT_NATIVE_EXPO"
				| "ANDROID"
				| "IOS";
			user_status: "PENDING" | "ACTIVE" | "DELETED" | "DISABLED";
			version_status: "LIVE" | "INACTIVE" | "DISABLED" | "DELETED";
		};
		CompositeTypes: {
			organisation_member: {
				user_id: string | null;
				user_name: string | null;
				user_email: string | null;
				organisation_id: string | null;
				role: Database["public"]["Enums"]["organisation_role_enum"] | null;
				status:
					| Database["public"]["Enums"]["organisation_role_status_enum"]
					| null;
			};
			project_update_payload: {
				owner: string | null;
				repo: string | null;
				working_branch: string | null;
			};
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema["Tables"] & PublicSchema["Views"])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
				Database[PublicTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
			Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
				PublicSchema["Views"])
		? (PublicSchema["Tables"] &
				PublicSchema["Views"])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof PublicSchema["Enums"]
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
		? PublicSchema["Enums"][PublicEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof PublicSchema["CompositeTypes"]
		| { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
		? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never;
