export const generatePropertyUrl = (id: string, title: string) => {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `/properties/details/${id}/${slug}`;
};
