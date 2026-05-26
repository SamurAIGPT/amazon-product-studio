import { FaCoins } from "react-icons/fa";

export function CreditBadge({ credits }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-sm text-xs font-semibold text-zinc-300">
      <FaCoins className="text-yellow-500 text-[10px]" />
      <span>{credits} Credits</span>
    </div>
  );
}
