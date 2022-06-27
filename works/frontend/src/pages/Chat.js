import React from 'react'
import styled from 'styled-components'


const Wrapper = styled.div`
    .display-chat{
        display : none;
    }
    .chat-section{
        border-top : 1px solid #28282a;
        border-bottom : 1px solid #28282a;
        font-family : Montserrat;
        font-weight : bold;
        font-size : 20px;
        margin-left:10px;
    }
    .chat-text{
        font-family : Montserrat;
        font-style : italic;
        font-size : 15px;
        margin-left:10px;
    }
    .chat-body-mobile{
        margin : 10px;
        height : 40vh;
    }
    .username{
        font-weight : 500;
        font-size:14px;
    }
    
    .user-tag-section{
        display : flex;
        font-family : Montserrat;
        align-items : center;
    }
    .freeloader-tag{
    
        width : 100px;
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
    .warrior-tag{
        border-radius : 5px;
        width:100px;
       
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
    .message-text-chat{
        color : #F2F2F7;
        font-weight : 200;
    }

    .chat-text-mobile{
        font-family : Montserrat;
        font-style : italic;
        font-size : 10px;
        margin-left: 10px;
    }
    .coop-tag{
        border-radius : 5px;
        width:100px;
        
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
    .send-message-mobile{
        padding: 8px;
        width: 100%;
        background: #48484A;
        border: none;
        color: #FFF;
        font-family : Montserrat;
        border-radius : 5px;
        height: 50px;
    }
    .chat-section-mobile{
        border-top: 1px solid #28282a;
        border-bottom: 1px solid #28282a;
        font-family: Montserrat;
        font-weight: 500;
        font-size: 14px;
        margin-left : 10px;
    }
    .send-message-section-stream {
        position : absolute; 
        bottom : 5%;
        width : 29%;
        margin-left : 10px;
    }
    @media screen and (max-width: 1023px) {
        .display-chat{
            display : block;
        }
        .coop-tag{
            width:70px;
        }
        .freeloader-tag{
            width:70px;
        }
        .warrior-tag{
            width:70px;
        }
        .username-text { 
            width:20%;
        }
        .username{
            font-size : 10px;
        }
        .message-text-chat{
            width : 80%;
            font-size:10px;
        }
    }
    @media screen and (max-width: 425px) {
        .display-chat{
            display : block;
        }
        .coop-tag{
            width:70px;
        }
        .username { 
            font-size : 10px;
        }
        .message-text-chat{
            width : 80%;
            font-size:10px;
        }
    }
    @media screen and (max-width: 768px) {
        .display-chat{
            display : block;
        }
        .coop-tag{
            width:70px;
        }
        .freeloader-tag{
            width:70px;
        }
        .warrior-tag{
            width:70px;
        }
        .username { 
            font-size : 10px;
        }
        .message-text-chat{
            width : 80%;
            font-size:10px;
        }
    }
    @media screen and (max-width: 610px) {
        .username { 
            font-size : 10px;
        }
    }
    @media screen and (max-width: 480px) {
        .coop-tag{
            width:70px;
        }
        .freeloader-tag{
            width:70px;
        }
        .warrior-tag{
            width:70px;
        }
        .username {
            font-size : 10px;
        }
        .message-text-chat{
            width : 80%;
            font-size:10px;
        }
        .send-message-section{
            margin-bottom : 60px;
        }
    }

    @media screen and (max-width: 415px) {
        .coop-tag{
            width:70px;
        }
        .freeloader-tag{
            width:70px;
        }
        .warrior-tag{
            width:70px;
        }
        .username { 
            font-size : 10px;
        }
        .message-text-chat{
            width : 60%;
            font-size:10px;
        }
        .chat-body-mobile{
            height : 25vh;
        }
        .send-message-section{
            margin-bottom : 60px;
        }
    }
   

    @media screen and (max-width: 375px) {
        .coop-tag{
            width:70px;
        }
        .freeloader-tag{
            width:70px;
        }
        .warrior-tag{
            width:70px;
        }
        .username { 
            font-size : 10px;
        }
        .message-text-chat{
            width : 60%;
            font-size:10px;
        }
        .chat-body-mobile{
            height : 30vh;
        }
        .send-message-section{
            margin-bottom : 60px;
        }
    }
`

const Chat = ({componentName}) => {
    return <Wrapper>
        <div className={componentName !== "StreamPage" ? 'display-chat' : ''}>
            {componentName !== "StreamPage" &&
            <>
                <div className='chat-section-mobile'>
                    Chat
                </div>
                <div className='chat-text-mobile'>
                    Welcome to Warriorname Live Class.
                </div>
            </>}
            <div className='chat-body-mobile'>
                <div className='user-tag-section'>
                    <span className='freeloader-tag'>FREELOADER</span>
                    <span className='username'>UserName : <span className='message-text-chat'>text text text text text text </span></span>
                </div>
                <div className='user-tag-section'>
                    <span className='warrior-tag'>WARRIOR</span>
                    <span className='username'>UserName : <span className='message-text-chat'>text text text text text text </span></span>
                </div>
                <div className='user-tag-section'>
                    <span className='coop-tag'>COOP</span>
                    <span className='username'>UserName : <span className='message-text-chat'>text text text text text text </span></span>
                </div>
            </div>
        </div>
         <div className={componentName !== "StreamPage" ? 'display-chat send-message-section' : 'send-message-section send-message-section-stream'}>
            <input type="text" className='send-message-mobile' placeholder='Send a message' />
        </div>
    </Wrapper>
}

export default Chat