export default function slugify(text = "") {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")          // remove quotes
    .replace(/[^a-z0-9]+/g, "-")   // non-alphanum to hyphen
    .replace(/^-+|-+$/g, "");      // trim hyphens
}