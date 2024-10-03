export const handleGetInitials = (name?: string) => {
  if (!name) return "J";

  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 3)
    .join("")
    .toUpperCase();
};
