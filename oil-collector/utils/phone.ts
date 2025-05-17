export const validatePhone = (value: string): number | string => {
  const phoneRegex = /^0[689]\d{8}$/;
  if (!value) {
    return 1;
  } else if (!phoneRegex.test(value)) {
    return 2;
  }
  return "";
};
