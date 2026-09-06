import { Button } from "./Button";
import { InstagramIcon } from "./icons";

interface InstagramCTAProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function InstagramCTA({
  href,
  children,
  variant = "outline",
  size = "md",
  className,
}: InstagramCTAProps) {
  return (
    <Button href={href} external variant={variant} size={size} className={className}>
      <InstagramIcon />
      {children}
    </Button>
  );
}
