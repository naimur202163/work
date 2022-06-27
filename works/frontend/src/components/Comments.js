import React, {  useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addComment, clearCommentId } from "../actions";
import useInput from "../hooks/useInput";
import { Avatar, Button } from "@material-ui/core";
import ReplyForm from "./replyform";
const Wrapper = styled.div`
  margin: 1rem 0;

  h3 {
    margin-bottom: 0.8rem;
  }

  .add-comment {
    display: flex;
    align-items: center;
    margin-bottom: 2.3rem;

    .avatar-box {
      height: 2.5rem;
      width: 2.5rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      margin-right: 0.5rem;

      .avatar-image {
        height: 2.5rem;
        width: auto;
      }

      .png-img {
        height: 3.5rem;
        width: auto;
      }

      .custom-image {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
      }
    }
  }

  .add-comment textarea {
    background: inherit;
    border: none;
    border-bottom: 1px solid ${(props) => props.theme.darkGrey};
    color: ${(props) => props.theme.primaryColor};
    width: 100%;
    height: 100%;
    margin-left: 1rem;
  }

  .comment {
    display: flex;
    margin-bottom: 1rem;
    font-size: 0.9rem;

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
        height: 3.2rem;
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
  }
`;

const Comments = ({
  user,
  comments,
  addComment,
  video,
  videoId,
  notificationCommentId,
  clearCommentId,
}) => {
  const [reply, setReply] = useState(false);
  const [viewAllReplies, setViewAllReplies] = useState("");
  const comment = useInput("");
  const [value, setValue] = useState("");
  const [selectedComment, setSelectedComment] = useState("");
  const handleAddComment = (e) => {
    if (e.keyCode === 13) {
      if (!comment.value.trim()) {
        return toast.error("Please write a comment");
      }
      addComment({ videoId, text: comment.value });
      comment.setValue("");
    }
  };

  const handleAddReply = (e, replyText) => {
    const parentId = selectedComment;
    addComment({ videoId, text: replyText, parentId });
    setViewAllReplies(parentId);
    setValue("");
  };

  const commentRedirection = () => {
    setTimeout(() => {
      window.location = `/watch/${videoId}#${notificationCommentId}`;
      window.scrollBy(0, -75);
      clearCommentId();
    }, 100);
  };

  const isPngOrJpg = (url) => {
    const image = url;

    if (image && (image.includes(".png") || image.includes(".svg"))) {
      return (
        <img
          className={`${image.includes(".png") ? "png-img" : "avatar-image"}`}
          src={image}
          alt="badge"
        />
      );
    } else {
      return <img className="custom-image" src={image} alt="badge" />;
    }
  };

  const printImg = (url) => {
    const image = url;
    if (image && (image.includes(".png") || image.includes(".svg"))) {
      return (
        <img
          className={`${image.includes(".png") ? "png-img2" : "avatar-image2"}`}
          src={image}
          alt="badge"
        />
      );
    } else {
      return <img className="custom-image2" src={image} alt="badge" />;
    }
  };

  const getParentComments = (allcomments) => {
    let parentComments = allcomments.filter((c) => c.parent_id === null);
    return parentComments;
  };

  const showDefaultAvatar = () => <Avatar />;

  return (
    <Wrapper>
      {video === videoId &&
        getParentComments(comments)?.length > 0 &&
        notificationCommentId &&
        commentRedirection()}
      <h3>
        {getParentComments(comments)?.length}{" "}
        {getParentComments(comments)?.length > 1 && "comments"}{" "}
        {getParentComments(comments)?.length === 1 && "comment"}{" "}
        {getParentComments(comments)?.length === 0 && "comments"}{" "}
      </h3>

      <div className="add-comment">
        <div className="avatar-box">
          {isPngOrJpg(!user?.avatar ? user?.badge : user?.avatar)}
        </div>

        <textarea
          placeholder="Add a public comment"
          value={comment.value}
          onKeyDown={handleAddComment}
          onChange={comment.onChange}
        />
      </div>

      {getParentComments(comments) &&
        getParentComments(comments).map((comment) => {
          const handleReply = (commentId) => {
            setReply(true);
            setSelectedComment(commentId);
          };

          const handleViewAllReplies = (commentId) => {
            setViewAllReplies(commentId);
            setSelectedComment(commentId);
          };
          return (
            <div key={comment.id} className="comment" id={comment.id}>
              <Link to={`/channel/${comment.User?.username}`}>
                <div className="avatar-box2">
                  {!!comment.User
                    ? printImg(
                        !comment.User?.avatar
                          ? comment.User?.badge
                          : comment.User?.avatar
                      )
                    : showDefaultAvatar()}
                </div>
              </Link>
              <div className="comment-info">
                <p className="secondary">
                  <span>
                    <Link to={`/channel/${comment.User?.username}`}>
                      {comment.User?.username || "User Removed"}
                    </Link>
                  </span>
                  <span style={{ marginLeft: "0.6rem" }}>
                    <Moment fromNow>{comment.createdAt}</Moment>
                  </span>
                </p>
                <p>{comment.text}</p>

                <Button
                  varient="text"
                  color="inherit"
                  onClick={() => handleReply(comment.id)}
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  style={{ fontSize: 12 }}
                >
                  Reply
                </Button>
                <Button
                  onClick={() => handleViewAllReplies(comment.id)}
                  variant="text"
                  color="primary"
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  style={{ fontSize: 12 }}
                >
                  {" "}
                  View All Replies
                </Button>
                {(reply || viewAllReplies) && comment.id === selectedComment && (
                  <ReplyForm
                    setReply={setReply}
                    commentId={comment.id}
                    handleAddReply={handleAddReply}
                    value={value}
                    setValue={setValue}
                    comments={comments}
                    viewAllReplies={viewAllReplies}
                    setViewAllReplies={setViewAllReplies}
                    reply={reply}
                  />
                )}
              </div>
            </div>
          );
        })}
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  comments: state.video.comments,
  video: state.video.id,
  user: state.user,
  notificationCommentId: state.notification.notificationCommentId,
});

export default connect(mapStateToProps, { addComment, clearCommentId })(
  Comments
);
