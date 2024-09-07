export const handleGetInitials = (name?: string) => {
  if (!name) return "J";

  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};