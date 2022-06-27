import React, { useState } from "react";
import styled from "styled-components";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { Checkbox, makeStyles, Menu, MenuItem } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  dropdownPaper: {
    top: "23% !important",
    background: "#383838",
    color: "white",
  },
}));

const SubFilter = ({ mainCategory, handleCheck, currentActiveItemId }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [currentSubFilter, setCurrentSubfilter] = useState(null);

  const handleClick = (event, item) => {
    setCurrentSubfilter(item);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  if (
    mainCategory &&
    mainCategory.subCategOne &&
    mainCategory.subCategOne.length === 0
  ) {
    return <p style={{ textAlign: "center" }}>No sub filters</p>;
  }
  return (
    <>
      <SubContainer>
        {mainCategory &&
          mainCategory.subCategOne &&
          mainCategory.subCategOne.length &&
          mainCategory.subCategOne.map((item, index) => (
            <ItemContainer
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={(e) => handleClick(e, item)}
            >
              <SpanContainer>
                <p>{item.name}</p>
                <span>
                  <KeyboardArrowDownIcon />
                </span>
              </SpanContainer>
              {item.subCategTwo
              .filter(subCat => subCat.isSelected === true)
              .map((subCat, index) => {
                // if (subCat.isSelected) {
                  return (
                    <ChipContainer key={subCat.id + index}>
                      <Chip
                        size="small"
                        label={subCat.name}
                        style={{ margin: "2px" }}
                        onDelete={(e) =>
                          handleCheck(
                            !subCat.isSelected,
                            mainCategory,
                            currentSubFilter,
                            subCat,
                            currentSubFilter.allowOnlyOneSubCat
                          )
                        }
                      />
                    </ChipContainer>
                  );
                // }
              })}
            </ItemContainer>
          ))}
      </SubContainer>

      <Menu
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        classes={{
          paper: classes.dropdownPaper,
        }}
      >
        {currentSubFilter &&
          currentSubFilter.subCategTwo.map((item) => {
            return (
              <MenuItem disableRipple button={false}>
                <Checkbox
                  disabled={
                    currentSubFilter.allowOnlyOneSubCat &&
                    currentActiveItemId !== null &&
                    currentActiveItemId !== item.id
                  }
                  checked={item.isSelected}
                  onChange={(e) =>
                    handleCheck(
                      !item.isSelected,
                      mainCategory,
                      currentSubFilter,
                      item,
                      currentSubFilter.allowOnlyOneSubCat
                    )
                  }
                  style={{
                    color:
                      currentSubFilter.allowOnlyOneSubCat &&
                      currentActiveItemId !== null &&
                      currentActiveItemId !== currentSubFilter.id
                        ? "gray"
                        : "white",
                    transform: "scale(0.8)",
                  }}
                />
                {item.name}
              </MenuItem>
            );
          })}
      </Menu>
    </>
  );
};

export default SubFilter;
const SubContainer = styled.div`
  display: flex;
  background: #383838;
  justify-content: flex-start;
  align-items: baseline;
  max-height: 94px;
  overflow-y: scroll;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 15px;
  font-size: 10px;
  align-items: center;
  flex-direction: column;
  padding: 10px;

  p {
    display: flex;
    color: lightgray;
    font-size: initial;
    cursor: pointer;
    align-items: center;
    justify-content: center;
  }
  span {
    display: flex;
    flex-dirextion: column;
  }
  > .muiChip {
    display: flex;
    jusify-content: center;
    align-items: center;
  }
`;

const ChipContainer = styled.div`

display flex;
display: block !important;
`;
const SpanContainer = styled.div`
  display: flex;
`;

// const ChipWraper = styled.div`
//   display: flex;
//   position: absolute;
// `;
