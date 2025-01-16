import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export default function Card({ children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "border border-slate-100",
        "p-4",
        "rounded",
        "bg-[#0a101f]",
        "block",
        "h-full w-full",
        props.className,
      )}
    >
      {children}
    </div>
  );
}
