import React, { useState, useContext } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { deletePlaylistById } from "../../../actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../../context/GlobalContext"

const PlaylistOptions = ({
  options,
  setShowType,
  item,
  setSelectedPlaylist,
  
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const { setShowPlaylistModelV2, setShowMyPortal } = useContext(GlobalContext)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const itemClickHandler = (optionItem) => {
    if (optionItem.text === "Edit Playlist") {
      setShowType("UPDATE_FORM");
      setSelectedPlaylist({
        title: item.title,
        desc: item.description,
        id: item.id,
      });
    } else if (optionItem.text === "Delete Playlist") {
      dispatch(deletePlaylistById(item.id));
    } else if (optionItem.text === "View Playlist") {
      history.push(`/playlist/${item.id}`);
      setShowPlaylistModelV2(false);
      setShowMyPortal(false)
      setAnchorEl(null)
    } else {
      return;
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <div
        className="options-menu-right"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        <i className="fa fa-ellipsis-v"></i>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {options &&
          options.length > 0 &&
          options.map((item, i) => (
            <Typography
              sx={{ p: 1 }}
              onClick={() => itemClickHandler(item)}
              style={{ alignItems: "center", display: "flex" }}
            >
              {item.icon ? (
                item.icon
              ) : (
                <i className="fa fa-share-alt" aria-hidden="true"></i>
              )}
              <Button
                style={{
                  color: "#000",
                  textTransform: "inherit",
                  fontSize: "16px",
                  fontFamily: "Montserrat",
                }}
              >
                {item.text}
              </Button>
            </Typography>
          ))}
      </Popover>
    </>
  );
};

export default PlaylistOptions;
