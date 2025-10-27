export function getDeployDate(): string {
    const date = process.env.NEXT_PUBLIC_LAST_DEPLOYED_AT;
    return date
        ? new Date(date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "Unknown";
}
