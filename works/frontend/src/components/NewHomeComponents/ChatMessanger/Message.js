import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import {  BackChatIcon, UserChatIcon } from "../../Icons"


const Message = () => {
    return (
        <MessageStyled>
            <div className="message-section">
                <div className="friend-message-body">
                    <UserChatIcon width={40} height={40} />
                    <div className="message-text">Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text Friend Text </div>
                </div>
                <div className="user-message-body">
                    <div>Your Text</div>
                </div>
            </div>
        </MessageStyled>
    )
}

export default Message

const MessageStyled = styled.div`
    .friend-message-body{
        margin : 2%;
        display : flex;
    }
    .message-text{
        margin-left: 15px;
        background: #3A3A3C;
        padding: 7px 15px;
        width: 70%;
        border-radius: 10px;
        font-family : Montserrat;
    }
    .user-message-body{
        margin-left: auto;
        max-width: 50rem;
        background: #8E8E93;
        text-align: right;
        border-radius: 10px;
        padding: 6px;
        margin-right: 1%;
        padding-right : 15px;
        font-family : Montserrat;
    }
    @media screen and (max-width: 768px) {
        .user-message-body{
            max-width: 25rem;
        }
        .message-section {
            margin-bottom : 40%;
        }
    }
    @media (min-width: 768px) and  (max-width: 1024px) {
        .user-message-body{
            max-width: 30rem;
        }
    }
    @media screen and  (max-width: 415px) {
        .user-message-body{
            max-width: 12rem;
        }
    }
`