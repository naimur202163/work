import React, { useState, useContext } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { GlobalContext } from "../../../context/GlobalContext";

const FriendOptions = ({
  options,
  className,
  setShowDisconnectConfirmation,
  setSelectedWarriorId,
  setSelectedCollaboratorId,
  warriorId,
  collaboratorId,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { setShowEditClipModel } = useContext(GlobalContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const itemClickHandler = (optionItem) => {
    if (optionItem.text === "Disconnect") {
      setSelectedWarriorId(warriorId);
      setSelectedCollaboratorId(collaboratorId);
      setShowDisconnectConfirmation(true);
      handleClose();
    } else {
      return;
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <div
        className={className}
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
              style={{ alignItems: "center", display: "flex" }}
              onClick={() => itemClickHandler(item)}
            >
              {!item.icon ? (
                <i className="fa fa-share-alt" aria-hidden="true"></i>
              ) : (
                item.icon
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

export default FriendOptions;
