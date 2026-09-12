const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatDate(date: string | Date): string {
  if (typeof date === "string") {
    return dateFormatter.format(new Date(`${date}T00:00:00`));
  }
  return dateFormatter.format(date);
}
