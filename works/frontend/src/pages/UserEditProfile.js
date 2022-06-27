import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import React, { useState } from "react";
import styled from "styled-components";
import { AddFriendIcon, UserIcon } from "../components/Icons";
import ListItemComponent from "./ListItemComponent";


const finalSpaceCharacters = [
    {
      id: 'a',
      content : 'a'
    },
    {
      id: 'b',
      content : 'a'
    },
    {
      id: 'c',
      content : 'a'
    },
    {
        id: 'd',
        content : 'a'
    },
    {
        id: 'e',
        content : 'a'
    },
    {
        id: 'f',
        content : 'a'
    },
    {
        id: 'g',
        content : 'a'
    }
    
  ]



const UserEditProfile = () => {
    const [characters, updateCharacters] = useState(finalSpaceCharacters);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElX,setAnchorElX] = useState(null);
    const open = Boolean(anchorEl);
    const openMenu = Boolean(anchorElX)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClickX = (event) => {
        setAnchorElX(event.currentTarget)
    }
    const handleCloseX = (event) => {
        setAnchorElX(null)
    }
    const handleClose = () => {
        setAnchorEl(null);
    };

    const id = open ? 'simple-popover' : undefined;
    const idX = openMenu ? 'simple-popover' : undefined

    return (
        <UserEditProfileStyled>
            <div className="user-section">
                <div><AddFriendIcon width={35} /><input type="file" className="filecontrol" /></div>
                <div className="user-profile-section">
                    <UserIcon width={100} />
                    <div className="add-user-image">
                    <div><AddFriendIcon width={30} /><input type="file" className="filecontrol-userimage" /></div>
                    </div>
                </div>
            </div>
            <div className="username-tag-section">
                <div className="username-tag">
                    <p className="username-text">User name</p>
                </div>
                <div className="user-tag">
                    <div className="tag-text">WARRIOR</div>
                </div>
            </div>
            <div className="add-new-element" >
                <Button className="add-new-element-icon" id="basic-button" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
                    <AddFriendIcon width={30} />
                    <p className="add-text">Add new element</p>
                </Button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 1 }} style={{alignItems:'center',display:'flex'}}><Button style={{color:'#000',textTransform: 'inherit',fontSize: '16px',fontFamily:'Montserrat'}}>Add Image Element </Button></Typography>
                <Typography sx={{ p: 1 }} style={{alignItems:'center',display:'flex'}}><Button style={{color:'#000',textTransform: 'inherit',fontSize: '16px',fontFamily:'Montserrat'}}>Add Tagline Element </Button></Typography>
                <Typography sx={{ p: 1 }} style={{alignItems:'center',display:'flex'}}><Button style={{color:'#000',textTransform: 'inherit',fontSize: '16px',fontFamily:'Montserrat'}}>Add Bio Text Element </Button></Typography>
                <Typography sx={{ p: 1 }} style={{alignItems:'center',display:'flex'}}><Button style={{color:'#000',textTransform: 'inherit',fontSize: '16px',fontFamily:'Montserrat'}}>Add Video Element </Button></Typography>
            </Popover>
            </div>
            
            <div className="box-section">
                <ListItemComponent />
            </div>
            <div className="add-new-element" >
                <Button className="add-new-element-icon" id="basic-button" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
                    <AddFriendIcon width={30} />
                    <p className="add-text">Add new element</p>
                </Button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 1 }} style={{alignItems:'center',display:'flex'}}><Button style={{color:'#000',textTransform: 'inherit',fontSize: '16px',fontFamily:'Montserrat'}}>Add Image Element </Button></Typography>
                <Typography sx={{ p: 1 }} style={{alignItems:'center',display:'flex'}}><Button style={{color:'#000',textTransform: 'inherit',fontSize: '16px',fontFamily:'Montserrat'}}>Add Tagline Element </Button></Typography>
                <Typography sx={{ p: 1 }} style={{alignItems:'center',display:'flex'}}><Button style={{color:'#000',textTransform: 'inherit',fontSize: '16px',fontFamily:'Montserrat'}}>Add Bio Text Element </Button></Typography>
                <Typography sx={{ p: 1 }} style={{alignItems:'center',display:'flex'}}><Button style={{color:'#000',textTransform: 'inherit',fontSize: '16px',fontFamily:'Montserrat'}}>Add Video Element </Button></Typography>
            </Popover>
            </div>
        </UserEditProfileStyled>
    )
}

export default UserEditProfile

const UserEditProfileStyled = styled.div`
    .filecontrol {
        opacity : 0;
        position : absolute;
        right : 0;
        width : 3%;
    }
    .filecontrol-userimage {
        opacity : 0;
        position : absolute;
        right : 0;
        width : 100%;
    }
    .user-section {
        display: flex;
        width: 100%;
        height: 20vh;
        background-color: #2c2c2e;
        justify-content: end;
        align-items: center;
        justify-content: space-evenly;
        align-items: end;
        flex-direction: column;
        justify-content : end;
        padding: 15px;
    }
    .user-profile-section {
        justify-content: center;
        display: flex;
        position: absolute;
        left: 50%;
        right: 50%;
        top: 22%;
    }
    .add-user-image {
        position: absolute;
        bottom: 12px;
        left: 3px;
    }
    .add-new-element-icon:hover {
        background : #3A3A3C;
    }
    .username-text {
        justify-content: center;
        display: flex;
    }
    .username-tag-section {
       margin-top : 60px;
    }
    .tag-text {
        background: linear-gradient(29deg,rgb(249,154,45),rgb(246,92,139) 71%);
        border-radius: 5px;
        padding: 0px 15px;
        font-weight: 200;
        font-size : 12px;
        color: #F2F2F7;
    }
    .user-tag {
        justify-content : center;
        display : flex;
    }
    .add-icon { 
        position: absolute;
        left: 56%;
        bottom: 16%;
    }
    .video-element {
        background: #2C2C2E;
        height: 20vh;
        width : 60%;
        border-radius: 10px;
    }
    .add-new-element {
        display : flex;
        justify-content : center;
        align-items : center;
        border-radius : 10px;
        padding: 10px;
        font-family : Montserrat;
        margin-top: 1%;
    }
    .add-new-element-icon {      
        font-family : Montserrat;
        text-transform : none;
        font-weught : 200;   
        background: #3A3A3C;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 15px 50px;
        border-radius: 10px;
    }
    .add-text {
        font-size : 16px;
        margin-left : 10px;
        color: #FFF;
    }
    .icon-box-container {
        display : flex;
        align-items: center;
        margin: 10px;
    }
    .tagline-box {
        background: #3A3A3C;
        height: auto;
        margin: 10px;
        border-radius: 10px;
        width : 100%;
    }
    .text {
        font-family: Montserrat;
        margin : 2%;
        font-size : 14px;
    }
    .list-items {
        display : flex;
        align-items : center;
        width : 100%;
    }
    .characters {
        list-style: none;
        padding-left: 0;
    }

    @media screen and (min width: 1445px and max-width: 2560px) {
        .add-icon {
            position: absolute;
            left: 56%;
            bottom: 27%;
        }
    }
    @media screen and (max-width: 1440px) {
        .add-icon {
            position: absolute;
            left: 56%;
            bottom: 12%;
        }
    }
    @media screen and (max-width: 1024px) {
        .add-icon {
            position: absolute;
            left: 54%;
            bottom: 14%;
        }
    }
    @media screen and (max-width: 768px) {
        .text {
            margin : 4%;
        }
        .add-icon {
            position: absolute;
            left: 50%;
            bottom: 16%;
        }
    }
    @media screen and (max-width : 582px) {
        .add-icon {
            position: absolute;
            left: 49%;
            bottom: 18%;
        }
    }
    @media screen and (max-width : 425px) {
        .add-icon {
            position: absolute;
            left: 47%;
            bottom: 20%;
        }
    }
    @media screen and (max-width : 375px) {
        .add-icon {
            position: absolute;
            left: 45%;
            bottom: 21%;
        }
    }
    @media screen and (max-width: 320px) {
        .add-icon {
            position: absolute;
            left: 43%;
            bottom: 21%;
        }
    }   
`

