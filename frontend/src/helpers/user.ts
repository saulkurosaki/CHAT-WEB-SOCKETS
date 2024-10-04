export const handleGetInitials = (name) => {
  if (!name) return ""; // Asegúrate de manejar el caso donde el nombre es undefined o vacío
  const names = name.split(" ");
  return names.map((n) => n.charAt(0).toUpperCase()).join("");
};
