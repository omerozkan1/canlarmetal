import {
  Refrigerator,
  Recycle,
  Trash2,
  Sofa,
  Home,
  Warehouse,
} from "lucide-react";

const map = {
  fridge: Refrigerator,
  scrap: Recycle,
  trash: Trash2,
  sofa: Sofa,
  home: Home,
  warehouse: Warehouse,
} as const;

export type IconKey = keyof typeof map;

export default function ServiceIcon({
  name,
  className = "h-6 w-6",
}: {
  name: IconKey;
  className?: string;
}) {
  const Cmp = map[name] ?? Recycle;
  return <Cmp className={className} strokeWidth={1.8} />;
}
