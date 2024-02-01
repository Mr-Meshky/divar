const mobileValidation = (mobile) => {
  const refex = /^(\+98|0)?9\d{9}$/;
  return refex.test(mobile);
};

const adminFormValidation = ({ name, slug, icon }) => {
  return !name || !slug || !icon;
};

const postFormValidation = (form) => {
  let valid = true;
  for (const i in form) {
    valid = valid && !!form[i];
  }
  return !valid;
};

const e2p = (s) => s.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

const p2e = (s) =>
  s.toString().replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

const sp = (number) => {
  const seperatedNumber = number
    .toString()
    .match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
  const joinedNumber = seperatedNumber.join(",");
  return e2p(joinedNumber);
};

export {
  mobileValidation,
  adminFormValidation,
  postFormValidation,
  e2p,
  p2e,
  sp,
};
