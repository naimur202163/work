import React, { useState } from 'react'
import styled from 'styled-components'
import { MinimizeIcon, UserIcon } from './Icons'

const VideoClipCommentStyled = styled.div`
    .comment-text {
        text-align : center;
        font-family : Montserrat;
    }
    .comment-text span {
        font-weight: 600;
        margin-right: 5px;
    }
    .comment-section {
        border-bottom : 1px solid #3A3A3C;
    }
    .add-comment {
        display : flex;
        margin : 10px 25px;
    }
    .add-comment-input { 
        width: 100%;
        background: transparent;
        border: none;
        margin-left : 20px;
        color : #FFF;
        font-family : Montserrat;
    }
    .show-comment {
        margin : 25px;
        align-items: center;
        display: flex;
        border-bottom : 1px solid #3A3A3C;
    }
    .comment-user-section{
        margin-left : 15px;
    }
    .username-usertag {
        display : flex;
        align-items : center;
    }
    .usertag-coop {
        justify-content: center;
        font-family: Montserrat;
        margin-left: 10px;
        background: #F9903D;
        padding: 0px 8px;
        border-radius: 8px;
        font-size: 12px;
        align-items: center;
        display: flex;
        text-transform: uppercase;
        font-weight: 500;
        width : 100px;
    }
    .usertag-warrior {
        justify-content: center;
        font-family: Montserrat;
        margin-left: 10px;
        background: linear-gradient(29deg,rgb(249,154,45),rgb(246,92,139) 71%);
        padding: 0px 8px;
        border-radius: 8px;
        font-size: 12px;
        align-items: center;
        display: flex;
        text-transform: uppercase;
        font-weight: 500;
        width : 100px;
    }
    .usertag-freeloader {
        justify-content: center;
        font-family: Montserrat;
        margin-left: 10px;
        background: #FFF;
        padding: 0px 8px;
        border-radius: 8px;
        font-size: 12px;
        align-items: center;
        display: flex;
        color : #1C1C1E;
        text-transform: uppercase;
        font-weight: 500;
        width : 100px;
    }
    .username-text {
        font-family : Montserrat;
        font-size : 16px;
        font-weight : 500;
        color : #F2F2F7;
    }
    .text {
        font-family : Montserrat;
        font-size : 14px;
        font-weight : 200;
        color : #F2F2F7;
    }
    .minimize-icon {
        position: absolute;
        right: 20px;
    }
    
    @media screen and (max-width: 768px) {
       .usertag-coop {
           font-size : 10px;
       }
       .usertag-warrior {
           font-size : 10px;
       }
       .usertag-freeloader {
           font-size : 10px;
       }
       .username-text {
           font-size : 14px;
       }
    }
`

const VideoClipComment = () => {
    const [toggle,setToggle] = useState(true)

    const handleToggle = () => {
        setToggle(!toggle)
    }

    return (
        <VideoClipCommentStyled>
            <div className='comment-text'>
                <div className='minimize-icon' onClick={handleToggle}>
                    <MinimizeIcon width={15} />
                </div>
                <span>Comments</span> <span>999</span>
                
            </div>
            {toggle && <><div className='comment-section'>
                <div className='add-comment'>
                    <UserIcon width={40} />
                    <input type='text' name='comment' placeholder='Add a comment' className='add-comment-input' />
                </div>    
            </div>
            <div className='show-comment-section'>
                <div className='show-comment'>
                    <UserIcon width={40} />
                    <div className='comment-user-section'>
                        <div className='username-usertag'>
                            <span className='username-text'>UserName</span>
                            <div className='usertag-coop'>coop</div>
                        </div>
                        <p className='text'>text text text text text text text text text text text text</p>
                    </div>
                </div>
                <div className='show-comment'>
                    <UserIcon width={40} />
                    <div className='comment-user-section'>
                        <div className='username-usertag'>
                            <span className='username-text'>UserName</span>
                            <div className='usertag-warrior'>warrior</div>
                        </div>
                        <p className='text'>text text text text text text text text text text text text</p>
                    </div>
                </div>
                <div className='show-comment'>
                    <UserIcon width={40} />
                    <div className='comment-user-section'>
                        <div className='username-usertag'>
                            <span className='username-text'>UserName</span>
                            <div className='usertag-freeloader'>freeloader</div>
                        </div>
                        <p className='text'>text text text text text text text text text text text text</p>
                    </div>
                </div>
            </div></>}
            
        </VideoClipCommentStyled>
    )
}

export default VideoClipComment