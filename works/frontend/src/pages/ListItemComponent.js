import {
  List,
  ListItem,
  ListItemSecondaryAction,
  Popover,
  Typography,
} from "@material-ui/core";
import RootRef from "@material-ui/core/RootRef";
import Button from "@mui/material/Button";
import React, { Component } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { DeleteCircle, MoveElement } from "../components/Icons";
import addIcon from "../components/icons/add.png";

const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    primary: `item ${k}`,
    secondary: k % 2 === 0 ? `Whatever for ${k}` : undefined,
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  ...draggableStyle,

  ...(isDragging && {
    position: "absolute",
    bottom: 0,
    right: 0,
    top: 0,
  }),
});

const getListStyle = (isDraggingOver) => ({});

class ListItemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(10),
      anchorEl: null,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }

  render() {
    const open = Boolean(this.state.anchorEl);
    const id = open ? "simple-popover" : undefined;
    return (
      <ListItemStyled>
        <List style={getListStyle()}>
          <ListItem>
            <div className="list-items ">
              <Button>
                <MoveElement width={20} />
              </Button>
              <div className="align-div">
                <div className="characters-thumb tagline-box">
                  <div className="text">
                    <div className="seris-tiny-box">
                      <div className="ichon-div">
                        <img className="plus-ichon" src={addIcon} alt="" />{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={this.handleClick}
              >
                <DeleteCircle width={35} />
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={this.state.anchorEl}
                onClose={this.handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Typography
                  sx={{ p: 1 }}
                  style={{ alignItems: "center", display: "flex" }}
                >
                  <Button
                    style={{
                      color: "#000",
                      textTransform: "inherit",
                      fontSize: "16px",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Add{" "}
                  </Button>
                </Typography>
                <Typography
                  sx={{ p: 1 }}
                  style={{ alignItems: "center", display: "flex" }}
                >
                  <Button
                    style={{
                      color: "#000",
                      textTransform: "inherit",
                      fontSize: "16px",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Remove{" "}
                  </Button>
                </Typography>
              </Popover>
            </div>

            <ListItemSecondaryAction></ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <div className="list-items ">
              <Button>
                <MoveElement width={20} />
              </Button>
              <div className="align-div">
                <div className="characters-thumb tagline-box">
                  <div className="text">
                    Tagline Tagline Tagline Tagline Tagline Tagline Tagline
                    Tagline Tagline Tagline Tagline Tagline
                  </div>
                </div>
              </div>

              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={this.handleClick}
              >
                <DeleteCircle width={35} />
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={this.state.anchorEl}
                onClose={this.handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Typography
                  sx={{ p: 1 }}
                  style={{ alignItems: "center", display: "flex" }}
                >
                  <Button
                    style={{
                      color: "#000",
                      textTransform: "inherit",
                      fontSize: "16px",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Add{" "}
                  </Button>
                </Typography>
                <Typography
                  sx={{ p: 1 }}
                  style={{ alignItems: "center", display: "flex" }}
                >
                  <Button
                    style={{
                      color: "#000",
                      textTransform: "inherit",
                      fontSize: "16px",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Remove{" "}
                  </Button>
                </Typography>
              </Popover>
            </div>

            <ListItemSecondaryAction></ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <div className="list-items ">
              <Button>
                <MoveElement width={20} />
              </Button>
              <div className="align-div">
                <div className="characters-thumb tagline-box">
                  <div className="text">
                    Bio text example, Bio text example, Bio text example, Bio
                    text example, Bio text example, Bio text example, Bio text
                    example, Bio text example, Bio text example, Bio text
                    example, Bio text example, Bio text example, Bio text
                    example, Bio text example, Bio text example, Bio text
                    example, Bio text example, Bio text example, Bio text
                    example, Bio text example, Bio text example, Bio text
                    example.
                  </div>
                </div>
              </div>

              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={this.handleClick}
              >
                <DeleteCircle width={35} />
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={this.state.anchorEl}
                onClose={this.handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Typography
                  sx={{ p: 1 }}
                  style={{ alignItems: "center", display: "flex" }}
                >
                  <Button
                    style={{
                      color: "#000",
                      textTransform: "inherit",
                      fontSize: "16px",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Add{" "}
                  </Button>
                </Typography>
                <Typography
                  sx={{ p: 1 }}
                  style={{ alignItems: "center", display: "flex" }}
                >
                  <Button
                    style={{
                      color: "#000",
                      textTransform: "inherit",
                      fontSize: "16px",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Remove{" "}
                  </Button>
                </Typography>
              </Popover>
            </div>

            <ListItemSecondaryAction></ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <div className="list-items ">
              <Button>
                <MoveElement width={20} />
              </Button>
              <div className="align-div">
                <div className="characters-thumb tagline-box">
                  <div className="text">
                    <div className="seris-tiny-box">
                      <div className="ichon-div">
                        <img className="plus-ichon" src={addIcon} alt="" />{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={this.handleClick}
              >
                <DeleteCircle width={35} />
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={this.state.anchorEl}
                onClose={this.handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Typography
                  sx={{ p: 1 }}
                  style={{ alignItems: "center", display: "flex" }}
                >
                  <Button
                    style={{
                      color: "#000",
                      textTransform: "inherit",
                      fontSize: "16px",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Add{" "}
                  </Button>
                </Typography>
                <Typography
                  sx={{ p: 1 }}
                  style={{ alignItems: "center", display: "flex" }}
                >
                  <Button
                    style={{
                      color: "#000",
                      textTransform: "inherit",
                      fontSize: "16px",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Remove{" "}
                  </Button>
                </Typography>
              </Popover>
            </div>

            <ListItemSecondaryAction></ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <div className="list-items ">
              <Button>
                <MoveElement width={20} />
              </Button>
              <div className="align-div">
                <div className="characters-thumb tagline-box">
                  <div className="text">
                    <div className="seris-tiny-box">
                      <div className="ichon-div">
                        <img className="plus-ichon" src={addIcon} alt="" />{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={this.handleClick}
              >
                <DeleteCircle width={35} />
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={this.state.anchorEl}
                onClose={this.handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Typography
                  sx={{ p: 1 }}
                  style={{ alignItems: "center", display: "flex" }}
                >
                  <Button
                    style={{
                      color: "#000",
                      textTransform: "inherit",
                      fontSize: "16px",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Add{" "}
                  </Button>
                </Typography>
                <Typography
                  sx={{ p: 1 }}
                  style={{ alignItems: "center", display: "flex" }}
                >
                  <Button
                    style={{
                      color: "#000",
                      textTransform: "inherit",
                      fontSize: "16px",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Remove{" "}
                  </Button>
                </Typography>
              </Popover>
            </div>

            <ListItemSecondaryAction></ListItemSecondaryAction>
          </ListItem>
        </List>
      </ListItemStyled>
    );
  }
}

export default ListItemComponent;

const ListItemStyled = styled.div`
  .icon-box-container {
    display: flex;
    align-items: center;
    margin: 10px;
  }
  .tagline-box {
    background: #3a3a3c;
    height: auto;
    margin: 10px;
    border-radius: 10px;
    width: 100%;
  }
  .align-div {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .text {
    font-family: Montserrat;
    margin: 2%;
    font-size: 14px;
  }
  .list-items {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .characters {
    list-style: none;
    padding-left: 0;
  }
  .seris-tiny-box {
    height: 88px;
    width: 157px;
    background: #2c2c2e;
  }
  .plus-ichon {
    height: 20px;
    width: 20px;
    margin-left: 7.25rem;
    margin-top: 3.5rem;
  }
`;
