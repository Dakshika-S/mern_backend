import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const [keyword, setkeyword] = useState();

  const searchHandler = (e) => {
    e.preventDefault(); //wiill disable auto reloading/loading when submitting
    navigate("/search/");
  };
  return (
    <div className="input-group">
      <form>
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </form>
    </div>
  );
}
