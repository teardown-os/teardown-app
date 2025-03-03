import { Teardown } from "./teardown.sdk";

export const teardown = new Teardown({
	supabase: {
		url: "https://api.teardown.dev",
		key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrZ3phaWxsZW9iZmRtbXdsZ29wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcwNzM4MTgsImV4cCI6MjA0MjY0OTgxOH0.LkV1khc74k3IQ1YLYTnYJpavaRVr0p2uJClNolipKUw",
	},
});
