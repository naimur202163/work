import React, { useState } from "react"
// import { useSelector } from "react-redux";
import styled from "styled-components"
// import Player from "../components/Player"
// import VideoCardOverlayWithButton from "../components/VideoCardOverlay/VideoCardOverlayWithButton";

import LiveVideo from "./LiveVideo";



const Wrapper = styled.div`
  .livefullscreen{
    display: grid;
    grid-template-columns: 100% 1fr;
    grid-gap: 1rem;
    padding: 1.3rem 0;
    width: 95%;
    margin: 0 auto;
  }
  .removelivefullscreen{
    display: grid;
    grid-template-columns: 70% 1fr;
    grid-gap: 1rem;
    padding: 1.3rem 0;
    width: 95%;
    margin: 0 auto;
  }
  .video-container .video-info {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .overlay-container {
    position: relative;
  }

  .video-overlays {
    position: absolute;
    width: -webkit-fill-available;
    z-index: 1;
  }
  .overlay-button {
    z-index: 23;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .chat-section{
    border-top : 1px solid #28282a;
    border-bottom : 1px solid #28282a;
    font-family : Montserrat;
    font-weight : 400;
    font-size : 20px;
  }
  .chat-text{
      font-family : Montserrat;
      font-style : italic;
      font-size : 15px;
      color : #F2F2F7;
      font-weight : 200;
  }
  .chat-body{
    grid-template-columns: 70% 1fr;
    height : 80%;
    overflow : auto;
  }
  .username-chat{
      font-size:14px;
  }
  .user-tag-section{
      display : flex;
      font-family : Montserrat;
      align-items : center;
  }
  .freeloader-tag-desktop{
    height : 20px;
    width : 150px;
      font-size: 10px;
      border-radius : 5px;
      background: #FFF;
      color: #1C1C1E;
      border: 1px solid rgb(248 139 68);
      letter-spacing: 1.1px;
      margin: 5px;
      text-align : center;
      font-size:10px;
      font-weight : 600;
  }
  .warrior-tag-desktop{
      height : 20px;
      width : 150px;
      border-radius : 5px;
      background: linear-gradient(29deg,rgb(249,154,45),rgb(246,92,139) 71%);
      color: #F2F2F7;
      border: 1px solid rgb(248 139 68);
      letter-spacing: 1.1px;
      margin: 5px;
      text-align : center;
      font-size:10px;
      font-weight : 600;
  }
  .message-text-view{
      font-size:16px;
      width : 80%;
  }
  .coop-tag-desktop{
    height : 20px;
      width : 150px;
      border-radius : 5px;
      background: rgb(249,154,45);
      color: #F2F2F7;
      border: 1px solid rgb(248 139 68);
      letter-spacing: 1.1px;
      margin: 5px;
      text-align : center;
      font-size:10px;
      font-weight : 600;
  }
  .send-message{
      padding: 15px 10px;
      width: 100%;
      background: #48484A;
      border: none;
      color: #FFF;
      font-family : Montserrat;
      border-radius : 10px;
  }
  .user-text-section{
    display : flex;
    align-items : center;
    width : 100%;
  }
  .video-section-color {
    background : #48484A;
  }
  .chat-message{
    font-weight : 200;
  }
  
  @media screen and (max-width: 425px) {
    
    .removelivefullscreen{
      display: grid;
      grid-template-columns: 100% 1fr;
      grid-gap: 1rem;
      padding: 1.3rem 0;
      width: 95%;
      margin: 0 auto;
      
    }
    .freeloader-tag{
      font-size:6px;
    }
    .warrior-tag{
        font-size:6px;
    }
    .coop-tag{
        font-size:6px;
    }
    
    .chat-view{
      display : none;
    }
  }
  @media screen and (max-width: 1023px) {
    .removelivefullscreen{
      display: grid;
      grid-template-columns: 100% 1fr;
      grid-gap: 1rem;
      padding: 1.3rem 0;
      width: 95%;
      margin: 0 auto;
      
    }
    .freeloader-tag{
      font-size:6px;
    }
    .warrior-tag{
        font-size:6px;
    }
    .coop-tag{
        font-size:6px;
    }
    .chat-view{
      display : none;
    }
  }
  
  @media screen and (max-width: 768px) {
    .removelivefullscreen{
      display: grid;
      grid-template-columns: 100% 1fr;
      grid-gap: 1rem;
      padding: 1.3rem 0;
      width: 95%;
      margin: 0 auto;
      
    }
    .freeloader-tag{
      font-size:6px;
    }
    .warrior-tag{
        font-size:6px;
    }
    .coop-tag{
        font-size:6px;
    }
    .chat-body{
      grid-template-columns: 70% 1fr;
      height: 69%;
      overflow: auto;
    }
    .chat-view{
      display : none;
    }
  }
  @media screen and (max-width: 480px) {
    .removelivefullscreen{
      display: grid;
      grid-template-columns: 100% 1fr;
      grid-gap: 1rem;
      padding: 1.3rem 0;
      width: 95%;
      margin: 0 auto;
      
    }
    .freeloader-tag{
      font-size:6px;
    }
    .warrior-tag{
        font-size:6px;
    }
    .coop-tag{
        font-size:6px;
    }
    .chat-view{
      display : none;
    }
  }

  @media screen and (max-width: 414px) {
    .removelivefullscreen{
      display: grid;
      grid-template-columns: 100% 1fr;
      grid-gap: 1rem;
      padding: 1.3rem 0;
      width: 95%;
      margin: 0 auto;
      
    }
    .freeloader-tag{
      font-size:6px;
    }
    .warrior-tag{
        font-size:6px;
    }
    .coop-tag{
        font-size:6px;
    }
    .chat-view{
      display : none;
    }
  }

  @media screen and (max-width: 375px) {
    .removelivefullscreen{
      display: grid;
      grid-template-columns: 100% 1fr;
      grid-gap: 1rem;
      padding: 1.3rem 0;
      width: 95%;
      margin: 0 auto;
    }
    .freeloader-tag{
      font-size:6px;
    }
    .warrior-tag{
        font-size:6px;
    }
    .coop-tag{
        font-size:6px;
    }
    .chat-view{
      display : none;
    }
  }
  
  `

const AttendClass = () =>{
    // const video = useSelector((state) => state.video);
    const [chatDisplay,setChatDisplay] = useState(true)
    const [fullscreen,setFullscreen] = useState(true)

    const handleChat = () => {
      setChatDisplay(!chatDisplay)
    }
    const handleFullScreen = () => {
      setFullscreen(!fullscreen)
    }
    const liveClassesWidth = chatDisplay  ? 'livefullscreen' : 'removelivefullscreen';
    const fullscreenToggle = fullscreen ? ' livefullscreen' : ' removelivefullscreen';
   
    return <>
        <Wrapper >
            <div className={liveClassesWidth + fullscreenToggle}>
              <div className={`video-container ${chatDisplay ? '' : 'video-section-color'}`} >
                  <div className="video">
                  
                      <LiveVideo chat={chatDisplay} handleChat={handleChat} fullscreen={fullscreen} handleFullScreen={handleFullScreen}   />
                  </div>
              </div>
              {chatDisplay && fullscreen  ? '' :<div className="chat-view">
            <div className='chat-section'>
                Chat
            </div>
            <div className='chat-text'>
                Welcome to Warriorname Live Class.
            </div>
            <div className='chat-body'>
                <div className='user-tag-section'>
                    <span className='freeloader-tag-desktop'>FREELOADER</span>
                    <div className="user-text-section"><span className='username-chat'>UserName : <span className="chat-message">Hi</span></span></div>
                </div>
                <div className='user-tag-section'>
                    <span className='warrior-tag-desktop'>WARRIOR</span>
                    <div className="user-text-section"><span className='username-chat'>UserName : <span className="chat-message">text text text text text text </span></span></div>
                </div>
                <div className='user-tag-section'>
                    <span className='coop-tag-desktop'>COOP</span>
                    <div className="user-text-section"><span className='username-chat'>UserName : <span className="chat-message">text text text text text text</span></span></div>
                </div>
                
            </div>
            <div>
                  <input type="text" className='send-message' placeholder='Send a message' /><i className="fa fa-hand-paper-o"/>
                </div>
        </div> }
            </div>
          
        
        </Wrapper>
        
    </>
}

export default AttendClass