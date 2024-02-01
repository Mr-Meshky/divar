import styles from "./Sidebar.module.css";

function Sidebar({ data }) {
  return (
    <div className={styles.sidebar}>
      <h4>دسته‌بندی ها</h4>
      <ul>
        {data.data.map((category) => (
          <li key={category._id}>
            <img src={`${category.icon}.svg`} alt={category.name} />
            <p>{category.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
