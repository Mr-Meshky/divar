import { mobileValidation } from "helpers/helper";
import { sendOtp } from "services/auth";
import { toast } from "react-toastify";

import styles from "./SendOtpForm.module.css";

function SendOtpForm({ mobile, setMobile, setStep }) {
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!mobileValidation(mobile)) {
      toast.warning("لطفا یک شماره موبایل معتبر وارد نمایید.");
      return;
    }

    const { response, error } = await sendOtp(mobile);
    if (response) setStep(2);

    if (error) toast.error(error.response.data.message);
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>ورود به حساب کاربری</p>
      <span>
        برای استفاده از امکانات دیوار، لطفاً شمارهٔ موبایل خود را وارد کنید. کد
        تأیید به این شماره پیامک خواهد شد.
      </span>
      <label htmlFor="input">شمارهٔ موبایل خود را وارد کنید</label>
      <input
        type="text"
        id="input"
        placeholder="شماره موبایل"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <button type="submit">ارسال کد تایید</button>
    </form>
  );
}

export default SendOtpForm;
