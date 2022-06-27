import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const FilterContainer = styled.div`
  display: flex;
  padding: 10px;
  min-height: 52px;
  width: -webkit-fill-available;
  justify-items: flex-start;
  white-space: nowrap;

  overflow: auto;
  /* width */
  ::-webkit-scrollbar {
    width: 8px;
    border-radius: 10rem;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #000;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #202020;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(246, 92, 139);
  }
`;
export const SubFilterContainer = styled.div`
  display: flex;
  height: auto;
  width: 100%;
  background: #383838;
  flex-direction: column;
`;

export const LinkContainer = styled.div`
  height: 50px;
  width: 50px;
  margin-right: 1rem;
  padding-top: 10px;
  img {
    height: 2rem;
  }
  span {
    cursor: pointer;
  }
`;

export const StyledParagraph = styled.p`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  justify-content: center;
`;
