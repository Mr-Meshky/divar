import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { checkOtp } from "services/auth";
import { getProfile } from "services/user";
import { setCookie } from "utils/cookie";

import styles from "./CheckOtpForm.module.css";

function CheckOtpForm({ mobile, code, setCode, setStep }) {
  const navigate = useNavigate();
  const { refetch } = useQuery(["profile"], getProfile);
  const input = useRef(null);

  useEffect(() => {
    input.current.focus();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (code.length !== 5) {
      toast.error("کد تایید نامعتبر است");
      return;
    }

    const { response } = await checkOtp(mobile, code);

    if (response) {
      setCookie(response.data);
      refetch();
      navigate("/");
    } else {
      toast.error("کد تایید نادرست است");
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>تایید کد اس‌ام‌اس شده</p>
      <span>کد پیامک شده به شماره «{mobile}» را وارد کنید</span>
      <label htmlFor="input">کد تایید را وارد کنید</label>
      <input
        type="text"
        id="input"
        placeholder="کد تایید"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        ref={input}
      />
      <button type="submit">ورود</button>
      <button onClick={() => setStep(1)} className={styles.backButton}>
        تغیر شماره موبایل
      </button>
    </form>
  );
}

export default CheckOtpForm;
