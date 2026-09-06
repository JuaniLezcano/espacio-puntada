import Link from "next/link";
import clsx from "clsx";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary text-background hover:bg-primary-hover",
  outline: "border border-foreground/30 text-foreground hover:bg-muted",
  ghost: "text-foreground hover:bg-muted",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    external?: boolean;
  };

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if ("href" in props && props.href) {
    const { href, external, ...anchorProps } = props;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...anchorProps}
        />
      );
    }
    return <Link href={href} className={classes} {...anchorProps} />;
  }

  return <button className={classes} {...(props as ButtonAsButton)} />;
}
