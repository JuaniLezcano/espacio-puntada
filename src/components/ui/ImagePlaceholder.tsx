import clsx from "clsx";

interface ImagePlaceholderProps {
  label: string;
  className?: string;
}

export function ImagePlaceholder({ label, className }: ImagePlaceholderProps) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center bg-accent-soft text-center text-sm text-foreground-muted p-4",
        className
      )}
    >
      {label}
    </div>
  );
}
