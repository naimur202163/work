import { Box} from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import Moment from "react-moment";


const Wrapper = styled.div`
  .avatar-box2 {
    display: flex;
    align-items: center;
    margin-bottom: 2.3rem;
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    margin-right: 0.5rem;

    .avatar-image2 {
      height: 2.5rem;
      width: auto;
    }

    .png-img2 {
      height: 5.5rem;
      width: auto;
    }

    .custom-image2 {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
    }
  }
  .comment-info {
    width: 100%;
  }
`;
function ReplyUserInfo({ comment }) {
  const printImg = (url) => {
    const image = url;

    if (image && (image.includes(".png") || image.includes(".svg"))) {
      return (
        <img
          className={`${image.includes(".png") ? "png-img2" : "avatar-image2"}`}
          src={image}
          alt="badge"
          width="34px"
          style={{ borderRadius: "50%" }}
        />
      );
    } else {
      return (
        <img
          className="custom-image2"
          src={image}
          alt="badge"
          width="34px"
          style={{ borderRadius: "50%" }}
        />
      );
    }
  };

  return (
    <Wrapper>
      <Box display="flex" mb={2}>
        <Box m={1}>
          <div className="avatar-box">
            {printImg(
              !comment.User?.avatar
                ? comment.User?.badge
                : comment.User?.avatar
            )}
          </div>
        </Box>
        <Box ml={1}>
          <Box display="flex">
            <p style={{ paddingRight: "5px", color: "#AAAAAA" }}>
              {comment.User.username}
            </p>
            <p style={{ color: "#AAAAAA" }}>
              <Moment fromNow>{comment.createdAt}</Moment>
            </p>
          </Box>

          <p style={{ paddingTop: "5px" }}>{comment.text}</p>
        </Box>
      </Box>
    </Wrapper>
  );
}

export default ReplyUserInfo;
