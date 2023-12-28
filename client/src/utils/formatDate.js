export const formatIsoDate = (isoDate) => {
  const date = new Date(isoDate);
  const options = { day: "numeric", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
