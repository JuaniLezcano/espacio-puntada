interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={className}>
      {eyebrow && (
        <p className="text-sm font-medium uppercase tracking-wide text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 font-heading text-3xl sm:text-4xl text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-foreground-muted">{description}</p>
      )}
    </div>
  );
}
