import React, { useContext } from "react"
import styled from "styled-components"
import { GlobalContext } from "../../../context/GlobalContext"
import { BackChatIcon, UserChatIcon } from "../../Icons"
import Message from "./Message"

const ChatDetailsModal = ({close}) => {
    const {showChatDetails} = useContext(GlobalContext)
    return (
        <ChatDetailsModalStyled>
            <div className={`wrapper ${ showChatDetails && "ShowChatDetails"}`}>
                <div className="wrapper__header">
                    <div onClick={close} className="backIcon">
                        <BackChatIcon width={25} />
                    </div>
                    <div className="user-image-name-status">
                        <UserChatIcon width={35} height={35} />
                        <div className="user-name-status">
                            <span className="friend-username">Friend username</span>
                            <span className="friend-status">Active now</span>
                        </div>
                    </div>
                </div>
                <Message />
            </div>
        </ChatDetailsModalStyled>
    )
}

export default ChatDetailsModal

const ChatDetailsModalStyled = styled.div`
    .wrapper {
        min-height: 100vh;
        height: 100vh;
        width: 100%;
        background-color: #1c1c1e;
        position: fixed;
        top: 0;
        left: 0;
        overflow-y: auto;
        z-index: 150;
        opacity: 0;
        transform: translateX(-100%);
        transition: all 1s ease;

        &__header {
        display: flex;
        align-items: center;
        padding: 1rem 5rem;
        border-bottom: 1px solid rgba(112, 112, 112, 0.4);

        .backIcon {
            margin-right: 1rem;
            cursor: pointer;
            display: flex;
            align-items: center;
        }

        .button-save{
            border: 2px solid #FFF;
            border-radius: 20px;
            padding: 0px 18px;
            font-family: 'Montserrat';
            font-size: 14px;
            margin-left : auto;
        }
        }
        &__content {
        height: 100vh;
        }
    }
    .user-image-name-status{
        display : flex;
        margin-left : 25px;
        align-items : center;
    }
    .user-name-status{
        display : grid;
        margin-left : 20px;
    }
    .friend-username{
        font-size : 16px;
        font-family : Montserrat;
    }
    .friend-status{
        font-size : 12px;
        font-family : Montserrat;
    }
    @media screen and (max-width: 600px) {
        .wrapper {
        &__header {
            padding: 0.8rem 2rem;
        }
        }
    }

    @media screen and (max-width: 480px) {
        .wrapper {
        &__header {
            padding: 0.5rem 1.5rem;

            .name {
            font-size: 1rem;
            }
        }
        }
    }
`