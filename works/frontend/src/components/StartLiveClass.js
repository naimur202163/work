import React from 'react';
import styled from "styled-components";
import { CloseIcon, ReverseCameraIcon, ShareIconSvg, WriteIcon } from './Icons';
import VideoCategory from './VideoCategory';

const StartLiveClass = ({ closeModal }) => {
    return (
        <StartLiveClassStyled>
            <div className="main">
                <span onClick={closeModal}>
                    <CloseIcon width="18px" height="18px" stroke="#F2F2F7" stokeWidth="1px" fill="#F2F2F7" />
                </span>
                <p>Live Class setup</p>
                <ReverseCameraIcon />
            </div>
            <div className="user">
                <div className="avatar">

                </div>
                <div>
                    <p>Warrior name</p>
                    <span>is about to start a live class in category</span>
                </div>
            </div>
            <div className="class-details">
                <input type="text" className="title" name="" placeholder="Title your Live Class" id="" />
                <div className='write'>
                    <WriteIcon />
                </div>
                <br />
                <VideoCategory />
            </div>
            <div className="goLive">
                <button>Go live</button>
                <div>
                    <div className="shareIconBx">
                        <ShareIconSvg />
                    </div>
                </div>
            </div>
        </StartLiveClassStyled>
    )
}

export default StartLiveClass;

const StartLiveClassStyled = styled.div`
    background: #2C2C2E;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: flex-end;
    padding-bottom: 42px;
    .main{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 367px;
        margin-bottom: 200px;
    }
    .user{
        width: 367px;
        background: #1C1C1E;
        padding: 4px 0 8px;
        display: flex;
        align-items: center;
        border-radius: 5px;
        div{
            display: flex;
            flex-direction: column;
        }
        p{
            font-size: 10px;
            line-height: 13px;
            color: #F2F2F7;
        }
        span{
            font-size: 8px;
            line-height: 10px;
            color: #AEAEB2;
        }
        .avatar{
            background: #F9903D;
            height: 28px;
            width: 28px;
            margin-left: 30px;
            margin-right: 7px;
            border-radius: 50%;
        }
    }
    .class-details{
        position: relative;
        .write{
            position: absolute;
            right: 14px;
            top: 16px;
        }
        .title{
            background: #1C1C1E;
            border-radius: 5px;
            margin-top: 7px;
            margin-bottom: 7px;
            font-size: 10px;
            border: none;
            color: #8E8E93;
        }
        .title, .category, option{
            padding: 14px;
            width: 307px;
        }
        .category, option{
            background: #1C1C1E;
            border: none;
            color: #8E8E93;
        }
    }
    .goLive{
        display: flex;
        align-items: center;
        margin-top: 15px;
        button{
            background-image: linear-gradient(123deg, #F9903D, #F75B8C);
            padding: 14px 0;
            width: 92px;
            text-align: center;
            font-size: 10px;
            color: #F2F2F7;
            margin-right: 13px;
            border-radius: 20px;
            border: none;
            outline: none;
        }
        .shareIconBx{
            background: #1C1C1E;
            border-radius: 7px;
            padding: 5px 6px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
`;