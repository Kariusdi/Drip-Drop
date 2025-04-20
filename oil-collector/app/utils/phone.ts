export const validatePhone = (value: string): string => {
  const phoneRegex = /^0[689]\d{8}$/;
  if (!value) {
    return "โปรดกรอกเบอร์โทรศัพท์";
  } else if (!phoneRegex.test(value)) {
    return "โปรดกรอกเบอร์โทรศัพท์ให้ถูกต้อง";
  }
  return "";
};
