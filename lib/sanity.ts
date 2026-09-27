import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

// Leads and admin accounts live under dotted IDs ("leads.*", "admins.*"),
// which Sanity only serves to authenticated requests, so reads need a
// token. Server-only env var: undefined in the browser, where only urlFor()
// runs. `perspective: "published"` keeps an authenticated client from
// returning drafts, matching what the unauthenticated client used to see.
export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    useCdn: false,
    apiVersion: "2026-07-14",
    token: process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN,
    perspective: "published",
});

export const writeClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN!,
    apiVersion: "2026-07-14",
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
    if (!source || source === "default") return "/placeholder-project.jpg";
    
    // If it's already a full HTTP URL string, return it directly
    if (typeof source === "string" && (source.startsWith("http://") || source.startsWith("https://"))) {
        return source;
    }
    
    try {
        return builder.image(source).url();
    } catch (error) {
        console.error("Error building image URL:", error);
        return "/placeholder-project.jpg";
    }
}
