import { SearchIcon } from "../icons/icons";
import styles from "./Search.module.css";

function Search() {
  return (
    <div className={styles.search}>
      <SearchIcon />
      <input type="text" placeholder="Search for your notes" />
    </div>
  );
}

export default Search;
