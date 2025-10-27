export function getDeployDate(): string {
    const date = process.env.VERCEL_BUILD_TIMESTAMP;
    return date
        ? new Date(date).toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" })
        : "Unknown";
}
