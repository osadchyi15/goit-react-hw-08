import { useDispatch, useSelector } from "react-redux";

import EmptyPhoneBookCard from "../EmptyPhoneBookCard/EmptyPhoneBookCard";
import FullPhoneBookCard from "../FullPhoneBookCard/FullPhoneBookCard";

import { changeFilter } from "../../redux/filters/slice";
import { selectFilters } from "../../redux/filters/selectors";
import { selectFilteredContacts } from "../../redux/contacts/selectors";

const SearchBox = () => {
  const dispatch = useDispatch();
  const value = useSelector(selectFilters);
  const contacts = useSelector(selectFilteredContacts);

  return (
    <div className=" flex flex-col justify-between">
      <div className="fieldset mb-8 w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend text-xl">Search contact</legend>
        <label className="input border-teal-400 hover:outline-teal-400 focus:outline-teal-400">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            name="search"
            value={value}
            placeholder="Enter your request"
            onChange={(e) => {
              dispatch(changeFilter(e.target.value));
            }}
          />
        </label>
      </div>
      {contacts?.length === 0 ? <EmptyPhoneBookCard /> : <FullPhoneBookCard />}
    </div>
  );
};

export default SearchBox;
