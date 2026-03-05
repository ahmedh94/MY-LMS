import { env } from "@/lib/env"

export function useConstructUrl(key: string): string {
    // The "key" variable is already a full URL (e.g., "https://isbc3byybg.ufs.sh/f/...")
    // because that's what Uploadthing's `ufsUrl` returns and saves to your database.
    // Concatenating it again with https:// and UPLOADTHING_APP_URL breaks the Image component.
    return key;
}