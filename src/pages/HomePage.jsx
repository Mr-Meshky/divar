import { useQuery } from "@tanstack/react-query";

import Main from "components/templates/Main";
import Sidebar from "components/templates/Sidebar";
import Loader from "src/components/modules/Loader";

import { getCategory } from "services/admin";
import { getAllPosts } from "services/user";

import styles from './HomePage.module.css';

function HomePage() {
  const { data, isLoading } = useQuery(["post-list"], getAllPosts);
  const { data: dataSide, isLoading: isLoadingSide } = useQuery(
    ["get-categories"],
    getCategory
  );

  return isLoading || isLoadingSide ? (
    <Loader />
  ) : (
    <div className={styles.container}>
      <Sidebar data={dataSide} />
      <Main data={data} />
    </div>
  );
}

export default HomePage;
