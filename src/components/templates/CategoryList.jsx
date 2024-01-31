import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import Loader from "../modules/Loader";

import { getCategory, deleteCategory } from "services/admin";

import styles from "./CategoryList.module.css";

function CategoryList() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(["get-categories"], getCategory);

  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        data.data.map((category) => (
          <div key={category._id} className={styles.categoty}>
            <span>
              <img src={`/${category.icon}.svg`} alt={category.icon} />
              <h5>{category.name}</h5>
            </span>
            <span>
              <p>Slug: {category.slug}</p>
              <img
                src="/delete.svg"
                alt="Delete"
                className={styles.deleteButton}
                onClick={() =>
                  deleteCategory(category._id).then((res) => {
                    if (res.status === 200) {
                      queryClient.invalidateQueries("get-categories");
                      toast.success("دسته بندی مورد نظر حذف شد");
                    }
                  })
                }
              />
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default CategoryList;
