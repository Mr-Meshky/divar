const mobileValidation = (mobile) => {
  const refex = /^(\+98|0)?9\d{9}$/;
  return refex.test(mobile);
};

const adminFormValidation = ({ name, slug, icon }) => {
  return !name || !slug || !icon;
};

export { mobileValidation, adminFormValidation };
