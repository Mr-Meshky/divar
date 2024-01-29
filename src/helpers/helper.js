const mobileValidation = (mobile) => {
  const refex = /^(\+98|0)?9\d{9}$/;
  return refex.test(mobile);
};

export { mobileValidation };
