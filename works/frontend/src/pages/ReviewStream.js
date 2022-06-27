
import { Box, Button, Modal, Typography } from "@material-ui/core"
import React, { useState } from "react"
import styled from "styled-components"
import { PauseIcon, ShareIcon, UserIcon } from "../components/Icons"

const ReviewStreamStyled = styled.div`
    margin : 3%;
    .review-text{
        justify-content : center;
        display : flex;
        font-size : 16px;
        font-family : Montserrat;
        font-weight : 500;
        color : #F2F2F7;
    }
    .background-section-review{
        background: #2C2C2E;
        border-radius: 15px;
        margin: 15px;
    }
    .user-section-review {
        display : flex;
        width: 100%;
        margin-left: 5%;
        align-items : center;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .username-section-review{
        margin-left : 15px;
    }
    .description-review{
        font-family: Montserrat;
        font-size: 14px;
        color : #AEAEB2;
    }
    .video-section {
        justify-content : center;
        display : flex;
    }
    .video-review{
        background : #2C2C2E;
        height : 50vh;
        width : 50%;
        border-radius : 15px;
    }
    .pause-icon {
        position : absolute;
        top : 50%;
        left : 50%;
    }
    .live-class-section {
        margin-top :15px;
        justify-content : center;
        display : flex;
    }
    .live-class-text{
        background : #2C2C2E;
        border : none;
        width : 50%;
        padding : 15px;
        border-radius : 10px;
        color : #F2F2F7;
        font-family : Montserrat;
        font-size : 14px;
    }
    .button-section {
        justify-content : center;
        display : flex;
        margin-top : 15px;
    }
    .button-disable {
        background: #8E8E93;
        color: #F2F2F7;
        font-family: Montserrat;
        font-size: 14px;
        padding: 10px 20px;
        margin-right : 10px;
        border-radius: 10px;
    }
    .button-save {
        background : linear-gradient(29deg,rgb(249,154,45),rgb(246,92,139) 71%);
        color: #F2F2F7;
        font-family: Montserrat;
        font-size: 14px;
        padding: 10px 25px;
        border-radius: 10px;
    }
    .share-icon{
        margin-left : 15px;
        background : #2C2C2E;
        width: 45px;
        padding: 8px;
        height: 47px;
        justify-content: center;
        display: flex;
        border-radius: 10px;
    }
    .close-modal-section{
        justify-content : end;
        display : flex;
    }
    @media screen and (max-width: 500px) {
        .button-section {
            margin-bottom: 25%;
        }
    }

    @media screen and (max-width: 414px) {
        .button-section {
            margin-bottom: 25%;
        }
    }

    @media screen and (max-width: 375px) {
        .button-section {
            margin-bottom: 33%;
        }
    }
`
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    border: '2px solid #000',
    background : '',
    boxShadow: 24,
    p: 4,
  };

const ReviewStream = (props) => {
    const [channelName,setChannelName] = useState(props.name)
    return (
        <>
            <Modal
                open={props.handleOpenModal}
                onClose={props.handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ReviewStreamStyled>
                        <div className="close-modal-section">
                            <img
                                onClick={props.handleCloseModal}
                                className="closeModel"
                                src="/assets/utils/close.svg"
                                alt="close model"
                                width={30}
                            />
                        </div>
                        <div className="review-text">Review Live Classes</div>
                        <div className="background-section-review">
                            <div className="user-section-review">
                                <UserIcon width={45} height={45} />
                                <div className="username-section-review">
                                    <div className="username-text-review">Warrior Name</div>
                                    <div className="description-review">is about to start a live class in category</div>
                                </div>
                            </div>
                        </div>
                        <div className="video-section">
                            <div className="video-review">

                            </div>
                            <div className="pause-icon">
                                <PauseIcon width={45} height={40} />
                            </div>
                        </div>
                        <div className="live-class-section">
                            <input name="liveclass" className="live-class-text" value={channelName} />
                            
                        </div>
                        <div className="button-section">
                            <Button className="button-disable">Discard</Button>
                            <Button className="button-save">Save</Button>
                            <div className="share-icon">
                                <ShareIcon width={30} />
                            </div>
                        </div>
                    </ReviewStreamStyled>
                </Box>
            </Modal>
            
        </>
    )
}

export default ReviewStream