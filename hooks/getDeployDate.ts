export function getDeployDate(): string {
    const date = process.env.NEXT_PUBLIC_LAST_DEPLOYED_AT;
    return date
        ? new Date(date).toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" })
        : "Unknown";
}
