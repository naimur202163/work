import React, { useState, useEffect,useRef } from "react";
import styled from "styled-components";
import ReplyUserInfo from "./ReplyUserInfo";
const Wrapper = styled.div`
  .add-comment {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem !important;
    margin-top: 1rem;
    .add-comment textarea {
      background: inherit;
      border: none;
      border-bottom: 1px solid ${(props) => props.theme.darkGrey};
      color: ${(props) => props.theme.primaryColor};
      width: 100%;
      height: 100%;
    }
  }
`;
function ReplyForm({
  commentId,
  handleAddReply,
  value,
  setValue,
  comments,
  reply,
  viewAllReplies,
}) {
  const [childComments, setChildComments] = useState([]);
  const tempFunction = useRef()
  const imgFunction = () =>{
    if (comments.length) {
      let childComments = comments.filter((c) => c.parent_id === commentId);
      setChildComments(childComments);
    }
  }
  tempFunction.current = imgFunction

  useEffect(() => {
    tempFunction.current()
  }, [comments.length]);
  return (
    <Wrapper>
      {reply && (
        <div className="add-comment">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Add a reply"
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                e.preventDefault();
                if (value.trim().length) {
                  handleAddReply(e, value);
                  setValue("");
                }
              }
            }}
          />
        </div>
      )}
      {viewAllReplies === commentId &&
        childComments.length > 0 &&
        childComments.map((c) => {
          return <ReplyUserInfo comment={c} />;
        })}
    </Wrapper>
  );
}
export default ReplyForm;
