import React from "react"
import styled from "styled-components"
import { UserIcon } from "./Icons"

const VideoClipUserStyled = styled.div`
    background : #000;
    .video-clip-user-section {
        padding : 20px;
    }
    .video-user-section {
        position : absolute;
        right : 3%;
    }
    .user-section{
        justify-content : center;
        display : flex;    
    }
    .video-username-section {
        text-align : center;
        font-family : Montserrat;
    }
    .video-username {
        font-weight : 500;
    }
    .tagline-text {
        font-weight : 300;
    }
    .button-connect {
        background : linear-gradient(29deg,rgb(249,154,45),rgb(246,92,139) 71%);
        padding: 10px 20px;
        border-radius: 20px;
        border: none;
        color: #FFF;
        font-family: 'Montserrat';
        font-size: 14px;
        font-weight: 600;
    }
    
    
`

const VideoClipUser = () => {
    return (
        <VideoClipUserStyled>
            <div className="video-clip-user-section">
                <div className="video-user-section">
                        <button className="button-connect">CONNECT</button>
                </div>
                <div className="user-section">
                    <UserIcon width={50} />
                </div>
                <div className="video-username-section">
                    <div className="video-username">Worrior name</div>
                    <div className="tagline-text">Tagline Tagline Tagline Tagline</div>
                    
                </div>
                
            </div>
            
        </VideoClipUserStyled>
    )
}

export default VideoClipUser