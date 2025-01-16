import { cn } from "@/utils";

type CardProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export default function Card({
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "border border-slate-100",
        "rounded",
        "bg-slate-900",
        "hover:bg-slate-800",
        "transition duration-200 ease-in-out",
        "block",
        "h-full w-full",
        props.className
      )}
    >
      {children}
    </div>
  );
}
