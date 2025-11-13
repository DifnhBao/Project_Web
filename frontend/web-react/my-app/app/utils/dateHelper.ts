export const formatDateForInput = (dateString?: string | null): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const local = new Date(date.getTime() + 7 * 60 * 60 * 1000); // GMT+7
  return local.toISOString().split("T")[0];
};
