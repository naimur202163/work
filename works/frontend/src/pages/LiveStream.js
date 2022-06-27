import axios from "axios"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import {Box, Button, TextField} from '@material-ui/core'
import { ShareIcon, UserIcon } from "../components/Icons"
import config from "../config/config"

const LiveStreamStyled = styled.div`
    position: absolute;
    width: 100%;
    bottom: 20px;
    .background-section {
        background: #2C2C2E;
        border-radius: 15px;
        margin-left: 10px;
        margin-right: 10px;
    }
    .user-section {
        display : flex;
        width: 100%;
        margin-left: 5%;
        align-items : center;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .username-section{
        margin-left : 15px;
    }
    .description{
        font-family: Montserrat;
        font-size: 14px;
        color : #AEAEB2;
    }
    .username-text{
        font-family : Montserrat;
        color : #F2F2F7;
        font-weight : 600;
        height : 24px;
    }
    .live-class-title{
        padding: 15px;
        background: #2C2C2E;
        width: 100%;
        border: none;
        border-radius: 10px;
        color : #AEAEB2;
        font-family : Montserrat;
        font-size : 16px;
    }
    .live-class-section {
        margin: 15px 6%;
    }
    .live-class-dropdown {
        margin-top : 15px;
    }
    .button-section{
        justify-content: center;
        display: flex;
    }
    .button{
        background : linear-gradient(29deg,rgb(249,154,45),rgb(246,92,139) 71%);
        border-radius: 25px;
        padding: 0px 20px;
        color: #FFF;
        font-size: 16px;
        font-family: MontSerrat;
        font-weight: 500;
    }
    .share-icon{
        margin-left : 50px;
        background : #2C2C2E;
        width: 45px;
        padding: 8px;
        height: 47px;
        justify-content: center;
        display: flex;
        border-radius: 10px;
    }
    .update-icon{
        position: absolute;
        right: 40px;
        top: 15px;
    }
}
`

const LiveStream = () => {
    const [channelName,setChannelName] = useState('')
    const history = useHistory()

    const handleChangeEvent = (event) => {
        setChannelName(prevState=>{
            return {
                ...prevState,
                [event.target.name] : event.target.value
            }
        })
    }

    const handleOnClick = async () => {
        const CreateChannel = await axios.post(`${config.REACT_APP_BACKEND_URL}livestream/createChannel`,channelName)
        if(CreateChannel.status === 200){

            history.push({
                pathname:`/livestream/stream`,
                search : `?room=${channelName.name}`,
                state : JSON.stringify(CreateChannel.data),
            })
        }
    }

    return (
        <LiveStreamStyled>
            <div className="background-section">
                <div className="user-section">
                    <UserIcon width={45} height={45} />
                    <div className="username-section">
                        <div className="username-text">Warrior Name</div>
                        <div className="description">is about to start a live class in category</div>
                    </div>
                </div>
            </div>
            <div className="live-class-section">
                <div>
                    <input type="text" name="name"  className="live-class-title" onChange={handleChangeEvent} placeholder="Title your Live Class" />
                    {/* <div className=""><i className="fa fa-user "></i></div> */}
                </div>
                <div className="live-class-dropdown">
                    <select className="live-class-title">
                        <option>Select Category...</option>
                    </select>
                </div>
            </div>
            <div className="button-section">
                <Button className="button" onClick={handleOnClick}>Go Live</Button>
                <div className="share-icon">
                    <ShareIcon width={30} />
                </div>
            </div>
            
        </LiveStreamStyled>
    )
}

export default LiveStream