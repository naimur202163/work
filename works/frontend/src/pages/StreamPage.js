import { Button, Popover, Typography } from "@material-ui/core"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import styled from "styled-components"
import { ChatIcon, ChatIconDisable, MinimizeIcon, OpenMenuIcon, RaiseHandIcon } from "../components/Icons"
import Player from "../components/Player"
import config from "../config/config"
import Chat from "./Chat"
import ReviewStream from "./ReviewStream"

const StreamPageStyled = styled.div`
    display: grid;
    grid-template-columns: 70% 1fr;
    width: 95%;
    margin: 0 auto;

    .chat-section { 
        margin-top : 10px;
    }
    .chat-title {
        border-bottom : 1px solid #2C2C2E;
        font-family: Montserrat;
        font-size: 16px;
        padding: 10px;
        align-items: center;
        justify-content: end;
        display: flex;
    }
    .chat{
        margin : 0px 10px;
        color: #FFF;
        font-family: Montserrat;
        text-transform: none;
        font-size: 18px;
    }
    .welcome-text {
        font-family: Montserrat;
        font-size: 14px;
        font-weight: 200;
        font-style: italic;
        color: #F2F2F7;
        margin-left : 15px;
    }
    .chat-options{
        background : #1C1C1E;
    }
    .chat-options-text { 
        color : #FFF;
    }
`

const StreamPage = (props) =>{
    const [channelData,setChannelData] = useState([])
    const [openModal,setOpenModal] = useState(false)

    const handleOpenModal = () => setOpenModal(true)
    const handleCloseModal = () => setOpenModal(false)
    const [name,setName] = useState('')
    
    useEffect(async ()=>{
        const roomname = new URL(window.location.href)
       setName(roomname.searchParams.get('room'))
    },[])

    
    
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const stopStream = async () => {
        const channelArn = {
            "channelArn" : channelData.message.channel.arn
        }
        handleOpenModal()
        const stopstream = await axios.post(`${config.REACT_APP_BACKEND_URL}livestream/stopStream`,channelArn)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        openModal  ?
             <ReviewStream name={name} handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} /> :
        
        <StreamPageStyled>
            <Player componentName={'StreamPage'} data={props} channelName={name} stopStream={stopStream}></Player>
            <div className="chat-section">
                <div className="chat-title">
                    <Button aria-describedby={id}  onClick={handleClick}>
                        <ChatIcon width={25} />
                        <span className="chat">Chat</span>
                        <MinimizeIcon width={15} />
                    </Button>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <Typography sx={{ p: 2 }}  style={{background:'#1C1C1E',fontFamily : 'Montserrat',fontWeight:500,padding:'15px'}} >
                            <div>
                                <Button>
                                    <ChatIcon width={25} /><span style={{color : '#F2F2F7',marginLeft:'10px',textTransform:'none'}}>Full Chat</span>
                                    <div style={{marginLeft : '30px'}}>
                                        <OpenMenuIcon width={20} />
                                    </div>
                                </Button>
                            </div>
                        </Typography>
                        <Typography sx={{ p: 1 }} style={{background:'#1C1C1E',fontFamily : 'Montserrat',fontWeight:500,padding:'15px'}} >
                            <Button><RaiseHandIcon width={25} /><span style={{color : '#8E8E93',marginLeft:'10px',textTransform:'none'}}>Raise hand only</span></Button>
                        </Typography>
                        <Typography sx={{ p: 1 }} style={{background:'#1C1C1E',fontFamily : 'Montserrat',fontWeight:500,textTransform:'none',padding:'15px'}} >
                            <Button><ChatIconDisable width={25} /><span style={{color : '#8E8E93',marginLeft:'10px',textTransform:'none'}}>Disable</span></Button>
                        </Typography>
                    </Popover>
                </div>
                <div className="welcome-text">Welcome to Warriorname Live Class!</div>
               <Chat componentName="StreamPage" />
            </div>
            
        </StreamPageStyled>
    )
}

export default StreamPage