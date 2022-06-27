import { Button } from "@material-ui/core"
import React from "react"
import styled from "styled-components"
import { KarmaIcon, UserIcon } from "../components/Icons"
import Player from "../components/Player"
import Chat from "./Chat"

const Wrapper = styled.div`
    font-family:Montserrat;
    .description-blog{
        display : flex;
        align-items : center;
        margin: 5px;
    }
    .user-section{
        margin-left : 10px;
        display : flex;
        align-items:center;
        width : 70%
    }
    .username{
        font-size:18px;
        font-weight: 500;
    }
    .classes-title{
        font-size:14px;
        font-weight : 100;
    }
    .category{
        font-size:12px;
        font-weight : 100;
    }
    .connect-button{
        padding: 0.4rem 2rem;
        background: linear-gradient(29deg,rgb(249,154,45),rgb(246,92,139) 71%);
        color: #FFF;
        border: 1px solid rgb(248 139 68);
        border-radius: 30px;
        letter-spacing: 1.1px;
        margin:5px;
    }
    .karma-text{
        margin-left : 5px;
    }
    .karma-button{
        padding: 0.4rem 2rem;
        background: #FFF;
        color: #F46A6A;
        border: none;
        border-radius: 30px;
        
        letter-spacing: 1.1px;
        margin:5px;
    }
    .button-section{
        margin-left : auto;
        display : flex;
        
    }
    .classes-info{
        margin-left:10px;
    }
    @media screen and (max-width: 450px) {
        .button-section{
            display : grid;
            margin-left : 20%;
        }
        .connect-button{
            order : 2;
            font-size : 10px;
        }
        .karma-button{
            font-size : 10px;
        }
    }
    @media screen and (max-width: 768px) {
        .button-section{
            display : grid;
            margin-left : 20%;
        }
        .username{
            font-size:12px;
            font-weight: 500;
        }
        .classes-title{
            font-size:10px;
        }
        .category{
            font-size:10px;
        }
    }
    @media screen and (max-width: 1024px) {
        .button-section{
            display : grid;
            margin-left : 20%;
        }
        .connect-button{
            order : 2;
            font-size : 10px;
        }
        .karma-button{
            font-size : 10px;
        }
        .username{
            font-size:12px;
            font-weight: 500;
        }
        .classes-title{
            font-size:10px;
        }
        .category{
            font-size:10px;
        }
    }
    @media screen and (max-width: 768px) {
        .button-section{
            display : grid;
            margin-left : 20%;
        }
        .connect-button{
            order : 2;
            font-size : 10px;
        }
        .karma-button{
            font-size : 10px;
        }
        .username{
            font-size:12px;
            font-weight: 500;
        }
        .classes-title{
            font-size:10px;
        }
        .category{
            font-size:10px;
        }
      }
      
   
`

const LiveVideo = (props) =>{
    
    return (
        <>
        <Wrapper>
            <Player componentName={'LiveVideo'} data={props} />
            <div className="description-blog">
                <div className="user-section">
                    <UserIcon width={50} />
                    <div className="classes-info">
                        <div className="username">Warrior name</div>
                        <div className="classes-title">Live Classes Title</div>
                        <div className="category">Category</div>
                    </div>
                    
                </div>
                <div className="button-section">
                    <Button className="connect-button">Connect</Button>
                    <Button className="karma-button" ><KarmaIcon width={15} /><span className="karma-text">Karma</span></Button>
                </div>
            </div>
        </Wrapper>
        
        <Chat />
        </>
    )
}

export default LiveVideo