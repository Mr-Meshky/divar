import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { postFormValidation } from "src/helpers/helper";
import { getCategory } from "services/admin";

import { addPost } from "services/post";

import styles from "./AddPost.module.css";

function AddPost() {
  const queryClient = useQueryClient();
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useQuery(["get-categories"], getCategory);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    city: "",
    amount: null,
    images: null,
  });

  const changeHandler = (event) => {
    const name = event.target.name;
    if (name !== "images") {
      setForm({ ...form, [name]: event.target.value });
    } else {
      setForm({ ...form, [name]: event.target.files[0] });
    }
  };

  const addHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    for (let i in form) {
      formData.append(i, form[i]);
    }
    if (postFormValidation(form)) {
      toast.warning("لطفا تمامی فیلدها را پر کنید");
      return;
    }

    setIsLoading(true);
    const result = await addPost(formData);
    setIsLoading(false);

    if (result) {
      queryClient.invalidateQueries("my-post-list");
      formRef.current.reset();
      setForm({
        title: "",
        content: "",
        category: "",
        city: "",
        amount: null,
        images: null,
      });
    }
  };

  return (
    <form onChange={changeHandler} className={styles.form} ref={formRef}>
      <h3>افزودن آگهی</h3>

      <label htmlFor="title">عنوان آگهی</label>
      <input type="text" name="title" id="title" />
      <label htmlFor="content">توضیحات</label>
      <textarea name="content" id="content" />
      <label htmlFor="amount">قیمت</label>
      <input type="number" name="amount" id="amount" />
      <label htmlFor="city">شهر</label>
      <input type="text" name="city" id="city" />
      <label htmlFor="category">دسته بندی</label>
      <select name="category" id="category">
        {data?.data.map((i) => (
          <option key={i._id} value={i._id}>
            {i.name}
          </option>
        ))}
      </select>
      <label htmlFor="images"></label>
      <input
        type="file"
        name="images"
        id="images"
        accept=".jpg, .png, .jpeg,.webp"
      />
      <button onClick={addHandler} disabled={isLoading}>
        ایجاد
      </button>
    </form>
  );
}

export default AddPost;
