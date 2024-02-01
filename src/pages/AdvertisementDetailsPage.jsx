import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Loader from "components/modules/Loader";

import { sp } from "src/helpers/helper";

import { getPostById } from "services/post";

import styles from "./AdvertisementDetailsPage.module.css";

function AdvertisementDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getPostById(id)
      .then((res) => {
        setData(res.data.post);
        setIsLoading(false);
      })
      .catch((error) => navigate("/404"));
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className={styles.wrapper}>
      <img
        src={`${import.meta.env.VITE_BASE_URL}${data.images[0]}`}
        alt={data.options.title}
        className={styles.cover}
      />
      <div>
        <h3>{data.options.title}</h3>
        <div className={styles.info}>
          <hr />
          <p className={styles.descriptions}>{data.options.content}</p>

          <span>
            <img src="/location.svg" alt="Locatin" />
            <p>{data.options.city}</p>
          </span>
          <p>{sp(data.amount)} تومان</p>
        </div>
      </div>
    </div>
  );
}

export default AdvertisementDetailsPage;
