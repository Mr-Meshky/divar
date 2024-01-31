import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { addCategory } from "services/admin";

import { adminFormValidation } from "src/helpers/helper";

import styles from "./CategoryForm.module.css";

function CategoryForm() {
  const queryClient = useQueryClient();
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", slug: "", icon: "" });

  const { mutate, isLoading, error, data } = useMutation(addCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-categories");
      setForm({ name: "", slug: "", icon: "" });
      formRef.current.reset();
    },
  });

  const changeHandler = (event) => {
    event.preventDefault();
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (adminFormValidation(form)) {
      toast.warning("لطفا تمامی فیلد هارا پر کنید");
      return;
    }
    mutate(form);
  };

  return (
    <form
      onChange={changeHandler}
      onSubmit={submitHandler}
      className={styles.form}
      ref={formRef}
    >
      <h3>دسته بندی جدید</h3>
      {!!error && <p className={styles.error}>مشکلی پیش آمده است</p>}
      {data?.status === 201 && (
        <p className={styles.success}>دسته بندی با موفقیت اضافه شد</p>
      )}
      <label htmlFor="name">اسم دسته بندی</label>
      <input type="text" name="name" id="name" />
      <label htmlFor="slug">اسلاگ</label>
      <input type="text" name="slug" id="slug" />
      <label htmlFor="icon">آیکون</label>
      <input type="text" name="icon" id="icon" />
      <button type="submit" disabled={isLoading}>
        ایجاد
      </button>
    </form>
  );
}

export default CategoryForm;
