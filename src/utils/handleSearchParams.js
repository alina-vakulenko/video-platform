export const trimSearchParams = (key, searchParams) => {
  const params = new URLSearchParams(searchParams);
  params.delete(key);
  return params;
};

export const updateSearchParams = (key, value, searchParams) => {
  const params = new URLSearchParams(searchParams);
  params.set(key, value);
  return params;
};
