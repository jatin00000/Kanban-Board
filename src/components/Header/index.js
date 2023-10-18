import { useState} from "react";
import React from "react";
import "./style.css";
import { ReactComponent as FilterIcon } from "../../icons/display_button.svg";
import { ReactComponent as DropIcon } from "../../icons/chevron-down.svg";
export default function Header(props) {
  const [displayDropdown, setDisplayDropdown] = useState(false);

  function ToggleDisplayDropdown() {
    let _state = displayDropdown;
    setDisplayDropdown(!_state);
  }
  function toggleGrouping(e) {
    props.setGrouping(e.target.value);
    localStorage.setItem("kabanaBoardGroup", e.target.value);

    let _state = displayDropdown;
    setDisplayDropdown(!_state);
  }
  function toggleSort(e) {
    props.setSort(e.target.value);
    localStorage.setItem("kabanaBoardSort", e.target.value);

    let _state = displayDropdown;
    setDisplayDropdown(!_state);
  }

  
  
  return (
    <div className="header">
      <button className="displayButton" onClick={ToggleDisplayDropdown}>
        <FilterIcon /> Display <DropIcon />
      </button>
      {displayDropdown && (
        <>
          <div className="choicForm row">
            <div className="column">
              <p className="Qtext">Grouping</p>
              <p className="Qtext">Ordering</p>
            </div>
            <div className="column">
              <p>
                <select
                  defaultValue={props.grouping}
                  onChange={toggleGrouping}
                  className="Mtext"
                >
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </p>

              <p>
                <select
                  defaultValue={props.sort}
                  onChange={toggleSort}
                  className="Mtext"
                >
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
