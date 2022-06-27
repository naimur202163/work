import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Checkbox, Select, FormControl } from "@material-ui/core";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "#121212",
    color: "white",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  groupHeader: {
    fontSize: "18px",
    marginLeft: "34px",
    color: "gray",
  },
  vidLengthText: {
    fontSize: "small",
    color: "red",
    padding: "0 2rem",
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  getContentAnchorEl: null,
  MenuListProps: {
    disablePadding: true,
  },

  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      paddingTop: 0,
      paddingBottom: 0,
      position: "absolute",
      top: 0,
    },
  },
};
const MultiSelectWrapper = styled.div`
  color: #000;
  background-color: #000;
  .MuiOutlinedInput-input {
    padding: 6.5px 2px;
  }
`;

export default function VideoCategory({
  videoCategories,
  selectedCategory,
  setSelectedCategory,
  defaultCategories,
}) {
  const classes = useStyles();
  const [mainCategories, setMainCategories] = React.useState([]);
  const [currentCategory, setCurrentCategory] = React.useState(null);
  const [categories, setCategories] = React.useState([]);
  const [currentActiveItemId, setCurrentActiveItemId] = React.useState(null);
  // const [hideText, setHideText] = React.useState(true);
  const hideText = true;

  React.useEffect(() => {
    if (videoCategories && videoCategories.length) {
      let categoryNamesList = [];
      let categs = videoCategories;
      categs.forEach((vc) => {
        vc["isSelected"] = false;
        if (defaultCategories.length) {
          defaultCategories.forEach((dc) => {
            if (dc.videoCategoryId === vc.id) {
              vc["isSelected"] = true;
            }
          });
        }
        vc.subCategOne.forEach((sco) => {
          sco.subCategTwo.forEach((sct) => {
            sct["isSelected"] = false;
            if (defaultCategories.length) {
              defaultCategories.forEach((dc) => {
                if (dc.subCategTwoId === sct.id) {
                  sct["isSelected"] = true;
                  categoryNamesList.push(sct.name);
                }
              });
            }
          });
        });
      });
      setMainCategories(categs);
      const uniqCategoryNames = [...new Set(categoryNamesList)];
      setCategories(uniqCategoryNames);
    }
  }, [videoCategories, defaultCategories]);
  const handleClick = (cat) => {
    if (currentCategory && currentCategory.id === cat.id) {
      setCurrentCategory(null);
    } else {
      setCurrentCategory(cat);
    }
  };

  const handleCheck = (
    checked,
    mainCat,
    sbCatOne,
    subCatTwo,
    allowOnlyOneSubCat
  ) => {
    try {
      let updatedMainCat = [...mainCategories];
      updatedMainCat.forEach((mc) => {
        mc.subCategOne.forEach((sbo) => {
          sbo.subCategTwo.forEach((sbc) => {
            if (sbc.id === subCatTwo.id) {
              sbc.isSelected = checked;
            }
          });
        });
      });
      setMainCategories(updatedMainCat);

      if (checked) {
        if (allowOnlyOneSubCat) {
          setCurrentActiveItemId(subCatTwo.id);
        }
        let updatedCategory = [...categories];
        updatedCategory.push(subCatTwo.name);
        setCategories(updatedCategory);

        setSelectedCategory([
          ...selectedCategory,
          {
            videoCategoryId: mainCat.id,
            subCategOneId: sbCatOne.id,
            subCategTwoId: subCatTwo.id,
          },
        ]);
      } else {
        if (allowOnlyOneSubCat) {
          setCurrentActiveItemId(null);
        }
        debugger;
        let updatedCategory = [...categories];
        updatedCategory = categories.filter((item) => item !== subCatTwo.name);
        setCategories(updatedCategory);

        let selectedCateg =
          selectedCategory.length &&
          selectedCategory.filter((sc) => {
            return sc.subCategTwoId !== subCatTwo.id;
          });
        setSelectedCategory(selectedCateg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <FormControl style={{ width: "100%" }}>
        <MultiSelectWrapper style={{ backgroundColor: "transparent" }}>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            displayEmpty
            disableUnderline
            value={categories}
            onChange={() => null}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Select Category</em>;
              }
              return selected.join(", ");
            }}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
            style={{
              color: "#f2f2f7",
              backgroundColor: "#3a3a3c",
              width: "100%",
              borderRadius: ".5rem",
              border: "none",
              outline: "none",
              fontSize: "1rem",
              fontWeight: 400,
              transition: "all .5s ease",
              fontFamily: "Montserrat, sans-serif",
              border: "3px solid transparent",
              padding: ".5rem 1rem",
            }}
          >
            <List
              className={classes.root}
              disableFocusRipple
              disablePadding
              disableRipple
            >
              {mainCategories &&
                mainCategories.map((cat, index) => {
                  return (
                    <React.Fragment key={index}>
                      <ListItem
                        onClick={() => handleClick(cat)}
                        disableFocusRipple
                      >
                        <ListItemText primary={cat.name} />
                        {currentCategory && currentCategory.id === cat.id ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </ListItem>
                      <Collapse
                        in={currentCategory && currentCategory.id === cat.id}
                        timeout="auto"
                      >
                        <List component="div" disablePadding>
                          {cat.subCategOne
                            .filter((sbc) => sbc.subCategType !== 1)
                            .map((sbOne) => {
                              return (
                                <>
                                  <h4 className={classes.groupHeader}>
                                    {sbOne.name}
                                  </h4>
                                  {hideText ||
                                    (sbOne.allowOnlyOneSubCat && (
                                      <p className={classes.vidLengthText}>
                                        Only 1 option is allowed to be selected
                                        in this category. Please deselect all
                                        and choose again.
                                      </p>
                                    ))}

                                  <List component="div" disablePadding>
                                    {sbOne &&
                                      sbOne.subCategTwo.map((sbTwo) => {
                                        if (sbTwo.allowOne) {
                                          return null;
                                        }
                                        return (
                                          <ListItem
                                            className={classes.nested}
                                            disableFocusRipple
                                            disableGutters
                                            disablePadding
                                          >
                                            <Checkbox
                                              edge="start"
                                              disableFocusRipple
                                              checked={sbTwo.isSelected}
                                              name="checkboxCategory"
                                              style={{
                                                color:
                                                  sbOne.allowOnlyOneSubCat &&
                                                  currentActiveItemId !==
                                                    null &&
                                                  currentActiveItemId !==
                                                    sbTwo.id
                                                    ? "gray"
                                                    : "white",
                                                transform: "scale(0.8)",
                                              }}
                                              // tabIndex={-1}
                                              disabled={
                                                sbOne.allowOnlyOneSubCat &&
                                                currentActiveItemId !== null &&
                                                currentActiveItemId !== sbTwo.id
                                              }
                                              disableRipple
                                              onChange={(e) =>
                                                handleCheck(
                                                  !sbTwo.isSelected,
                                                  cat,
                                                  sbOne,
                                                  sbTwo,
                                                  sbOne.allowOnlyOneSubCat
                                                )
                                              }
                                            />
                                            <ListItemText
                                              primary={`${sbTwo.name}`}
                                              style={{
                                                color:
                                                  sbOne.allowOnlyOneSubCat &&
                                                  currentActiveItemId !==
                                                    null &&
                                                  currentActiveItemId !==
                                                    sbTwo.id
                                                    ? "gray"
                                                    : "white",
                                              }}
                                            />
                                          </ListItem>
                                        );
                                      })}
                                  </List>
                                </>
                              );
                            })}
                        </List>
                      </Collapse>
                    </React.Fragment>
                  );
                })}
            </List>
          </Select>
        </MultiSelectWrapper>
      </FormControl>
    </div>
  );
}
