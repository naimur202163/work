import React, { useState } from "react"
import styled from "styled-components"
import { AddFriendIcon, KarmaIconWhite, MinimizeIcon, ShareIcon, StreamIcon, UpvoteFillIcon, UpvoteIcon } from "./Icons"

const VideoClipDescStyled = styled.div`
    border-bottom: 1px solid #2C2C2E;
    .title-video { 
        font-family : Montserrat;
        font-size : 16px;
        font-weight : 500;
    }
    .description-section { 
        display : flex;
        width : 100%;
        margin : 10px;
    }
    .description-text {
        margin-left : 15px;
    }

    .viewers-section {
        display : flex;
        font-family : Montserrat;
        align-items : center;
        font-size : 12px;
    }

    .minimize-icon {
        margin-left: auto;
        margin-right : 30px;
    }

    .viewers {
        font-weight : 300;
    }
    .dot-section {
        margin: 0 10px;
    }

    .category {
        font-weight : 500;
    }

    .date-section {
        font-weight : 200;
    }

    .icon-section {
        margin : 10px;
        display : flex;
        font-family: Montserrat;
        font-size: 12px;
    }
    .icon-sizzing {
        margin: 18px;
        text-align : center;
        font-family : Montserrat;
    }

    @media screen and (max-width: 768px) {
        .title-video {
            font-size : 16px;
        }
        .icon-section{
            justify-content : center;
        }
    }
`

const VideoClipDescription = () => {
    const [toggle,setToggle] = useState(true)
    const [like,setLike] = useState(true)

    const handleToggle = () => {
        setToggle(!toggle)
    }
    return (
        <VideoClipDescStyled>
            <div className="description-section">
                <div className="description-text">
                    <div className="title-video">Title of the clip Title of the clip Title of the clip</div>
                    <div className="viewers-section">
                        <p className="viewers">1000 views</p>
                        <p className="dot-section"> · </p>
                        <p className="category">Category</p>
                        <p className="dot-section"> · </p>
                        <p className="date-section">Dd Mm/X days ago/X years ago</p>
                        
                    </div>
                </div>
                <div className="minimize-icon" onClick={handleToggle}>
                    <MinimizeIcon width={15} />
                </div>
            </div>
            {toggle &&<div className="icon-section">
                <div className="icon-sizzing" onClick={() => setLike(!like)}>{like ? <UpvoteIcon width={20} /> : <UpvoteFillIcon width={20} /> }<div>Like/999</div></div>
                <div className="icon-sizzing"><ShareIcon width={30} /><div>Share</div></div>
                <div className="icon-sizzing"><StreamIcon width={35} /><div>Add to Streams</div></div>
                <div className="icon-sizzing"><AddFriendIcon width={36} /><div>Add</div></div>
                <div className="icon-sizzing"><KarmaIconWhite width={30}/><div>Give Karma</div></div>
            </div>}
        </VideoClipDescStyled>
    )
}

export default VideoClipDescription