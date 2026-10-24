export const money = (value: number, currency = "USD") =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "NGN" ? 0 : 2,
  }).format(value);
export function businessPath(path = "") {
  if (path === "/signup") return "#release-status";
  if (path.includes("subscriptions")) return "#how-it-works";
  return path ? "#workspace-preview" : "#business-main";
}
