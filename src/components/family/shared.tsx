export type Relationship =
  | "Mum"
  | "Dad"
  | "Brother"
  | "Sister"
  | "Wife"
  | "Husband"
  | "Paddy mi"
  | "Babe"
  | "Grandma"
  | "Grandpa"
  | "Aunt"
  | "Uncle"
  | "Niece"
  | "Nephew"
  | "In-law"
  | "Kid"
  | "Other";

export interface FamilyMember {
  id: string;
  name: string;
  relationship: Relationship;
}

export interface BillOption {
  label: string;
  tiers: { name: string; amount: number }[];
}

export interface CustomBill {
  name: string;
  amount: number;
}

export interface MemberBills {
  [billLabel: string]: number;
}

export interface MemberBillState {
  bills: MemberBills;
  custom: CustomBill[];
}

export const AVATAR_COLORS = [
  "#E96D1F",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#10B981",
  "#F59E0B",
];

export const RELATIONSHIPS: Relationship[] = [
  "Mum",
  "Dad",
  "Brother",
  "Sister",
  "Wife",
  "Husband",
  "Paddy mi",
  "Babe",
  "Grandma",
  "Grandpa",
  "Aunt",
  "Uncle",
  "Niece",
  "Nephew",
  "In-law",
  "Kid",
  "Other",
];

export function formatNaira(amount: number): string {
  return "₦" + amount.toLocaleString("en-NG");
}

export function Avatar({
  name,
  index,
  size = "md",
}: {
  name: string;
  index: number;
  size?: "sm" | "md" | "lg";
}) {
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };
  return (
    <div
      className={`${sizes[size]} flex shrink-0 items-center justify-center rounded-full font-outfit font-semibold text-white`}
      style={{ backgroundColor: color }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
            i <= step ? "bg-[#E96D1F]" : "bg-[#E5E7EB]"
          }`}
        />
      ))}
    </div>
  );
}
