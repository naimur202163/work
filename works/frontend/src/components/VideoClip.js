import React from "react"
import styled from "styled-components"
import Player from "./Player"
import VideoClipComment from "./VideoClipComment"
import VideoClipDescription from "./VideoClipDescription"
import VideoClipUser from "./VideoClipUser"

const VideoClipStyled = styled.div`
    margin-top : 70px;
`

const VideoClip = () => {
    return (
        <VideoClipStyled>
            <div>
                <Player componentName={'VideoClip'}  />
               
            </div>
            <VideoClipDescription />
            <VideoClipUser />
            <VideoClipComment />
        </VideoClipStyled>
    )
}

export default VideoClip