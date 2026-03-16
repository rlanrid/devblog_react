export const preserveEmptyLines = (content) => {
  if (!content) return "";

  return content
    .split("\n")
    .map(line => line === "" ? "&nbsp;" : line)
    .join("\n");
};