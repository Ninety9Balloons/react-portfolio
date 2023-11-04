import { createClient } from "@sanity/client";

export const client = createClient({
    projectId: "eb0pdclv",
    dataset: "production",
    apiVersion: "2023-05-03",
});
