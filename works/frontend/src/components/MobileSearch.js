import React from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { BackIcon, SmallSearchIcon } from "./Icons";

const Wrapper = styled.div`
  input.search {
    background: ${(props) => props.theme.black};
    padding: 0.4rem 1rem;
    border: 1px solid ${(props) => props.theme.darkGrey};
    height: 31px;
    color: ${(props) => props.theme.primaryColor};
    margin-left: 8px;
    width: auto;
  }
  .search-icon {
    position: absolute;
    right: 10px;
    top: 4px;
  }
  display: flex;
  align-items: center;
  position: relative;
`;

const MobileSearch = ({ mobileSearchInput, hideSearchBox, className }) => {
  const history = useHistory();
  const searchterm = useInput("");

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      mobileSearchInput(false);
      if (!searchterm.value.trim()) {
        return toast.error("Please enter a search term.");
      }

      history.push(`/results/${searchterm.value}`);
      searchterm.setValue("");
    }
  };

  const search = () => {
    mobileSearchInput(false);
    if (!searchterm.value.trim()) {
      return toast.error("Please enter a search term");
    }

    history.push(`/results/${searchterm.value}`);
    searchterm.setValue("");
  };

  return (
    <>
      <Wrapper className={className}>
        <BackIcon onClick={hideSearchBox} />
        <input
          className="search"
          type="text"
          placeholder="Search"
          value={searchterm.value}
          onKeyDown={handleSearch}
          onChange={searchterm.onChange}
        />
        <SmallSearchIcon className="search-icon" onClick={search} />
      </Wrapper>
    </>
  );
};

export default MobileSearch;
