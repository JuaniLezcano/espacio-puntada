import clsx from "clsx";

type BadgeTone = "neutral" | "success" | "warning" | "danger";

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-muted text-foreground-muted",
  success: "bg-[#6B8E5A]/15 text-[#4d6640]",
  warning: "bg-[#C97B3D]/15 text-[#8f5527]",
  danger: "bg-[#B5453A]/15 text-[#7e302a]",
};

interface BadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-block rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
