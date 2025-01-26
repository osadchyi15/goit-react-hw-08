import { useDispatch } from "react-redux";
import css from "./SearchBox.module.css";
import { changeFilter } from "../../redux/filtersSlice";

const SearchBox = () => {
  const dispatch = useDispatch();

  return (
    <label className={css.searchFormLabel}>
      <span className={css.searchFormTitle}>Find contacts by name</span>
      <input
        className={css.contactFormInput}
        type="search"
        name="search"
        placeholder="Enter your request"
        onChange={(e) => dispatch(changeFilter(e.target.value))}
      />
    </label>
  );
};

export default SearchBox;
