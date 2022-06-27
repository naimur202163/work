import React, { useEffect, useState, useContext, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { addToHistory} from "../actions";
import { GlobalContext } from "../context/GlobalContext";
import {ChatIcon, ShareIcon,FullscreenIcon, PauseIcon, CloseChatIcon, RemoveFullScreen, MinimizeIcon, StopStream, ReverseCamera, MoreStreamIcon, SettingIcon} from './Icons'

const Wrapper = styled.div`
  .chat-icon{
    position : absolute;
    bottom : 10px;
    right : 70px;
    font-size : 25px;
  }
  .full-screen-icon{
    position: absolute;
    bottom: 10px;
    right: 20px;
    font-size: 25px;
  }
  .share-icon{
    position: absolute;
    top: 20px;
    right: 25px;
    font-size: 25px;
  }
  .pause-icon{
    position : absolute;
    top:50%;
    left:50%;
    font-size:50px;
  }
  .minimize-icon{
    position : absolute;
    top : 10px;
    left : 10px;
  }
  .viewers-badge{
    position: absolute;
    font-size: 16px;
    padding: 15px;
    border-radius: 10px;
    bottom: 21px;
    left: 20px;
    font-family: Montserrat;
    height: 24px;
    width: auto;
    background: #1C1C1E;
  }
  .height-video-stream {
    height : 92vh !important;
  }
  .video-full .video-js.vjs-fluid {
    max-height : unset;
  }
  .fullscreen-icon {
    position: absolute;
    bottom: 10px;
    right: 25px;
  }
  .viewers-badge-stream{
    position: absolute;
    font-size: 16px;
    border-radius: 10px;
    bottom: 5%;
    left: 3%;
    font-family: Montserrat;
    height: 30px;
    width: auto;
    background: #1C1C1E;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 3px;
  }
  .stop-icon{
    position: absolute;
    bottom: 5%;
    left: 35%;

  }
  .reverse-icon {
    position: absolute;
    top: 10%;
    right: 33%;
  }
  .more-icon {
    position: absolute;
    bottom: 5%;
    right: 33%;
  }
  .live-class-title-stream {
    position: absolute;
    top: 10%;
    font-family: 'Montserrat';
    left: 3%;
    color: #F2F2F7;
    font-weight: 500;
    font-size: 16px;
  }
  @media screen and (max-width: 1023px) {
    .chat-icon{
      display : none;
    }
    .height-video{
      height : 300px !important;
    }
    .viewers-badge{
      position: absolute;
      font-size: 8px;
      padding: 15px;
      border-radius: 10px;
      bottom: 21px;
      left: 20px;
      font-family: Montserrat;
      height: 24px;
      width: auto;
      background: #1C1C1E;
    }
    .viewers-badge-stream{
      left : 20px;
      height : 20px;
      font-size : 10px;
    }
    
  }
  @media screen and (max-width: 480px) {
    .chat-icon{
      display : none;
    }
    .height-video{
      height : 270px !important;
    }
    .viewers-badge{
      position: absolute;
      font-size: 8px;
      padding: 15px;
      border-radius: 10px;
      bottom: 21px;
      left: 20px;
      font-family: Montserrat;
      height: 24px;
      width: auto;
      background: #1C1C1E;
    }
    .viewers-badge-stream{
      left : 20px;
      height : 20px;
      font-size : 10px;
    }
  }

  @media screen and (max-width: 414px) {
    .chat-icon{
      display : none;
    }
    .height-video{
      height : 270px !important;
    }
    .viewers-badge{
      position: absolute;
      font-size: 8px;
      padding: 15px;
      border-radius: 10px;
      bottom: 21px;
      left: 20px;
      font-family: Montserrat;
      height: 24px;
      width: auto;
      background: #1C1C1E;
    }
    .viewers-badge-stream{
      left : 20px;
      height : 20px;
      font-size : 10px;
    }
  }

  @media screen and (max-width: 375px) {
    .chat-icon{
      display : none;
    }
    .height-video{
      height : 270px !important;
    }
    .viewers-badge{
      position: absolute;
      font-size: 8px;
      padding: 15px;
      border-radius: 10px;
      bottom: 21px;
      left: 20px;
      font-family: Montserrat;
      height: 24px;
      width: auto;
      background: #1C1C1E;
    }
    .viewers-badge-stream{
      left : 20px;
      height : 20px;
      font-size : 10px;
    }
  }
  @media screen and (max-width: 768px) {
    .chat-icon{
      display : none;
    }
    .height-video{
      height : 270px !important;
    }
    .viewers-badge{
      position: absolute;
      font-size: 8px;
      padding: 15px;
      border-radius: 10px;
      bottom: 21px;
      left: 20px;
      font-family: Montserrat;
      height: 24px;
      width: auto;
      background: #1C1C1E;
    }
    .viewers-badge-stream{
      left : 20px;
      height : 20px;
      font-size : 10px;
    }
  }
`

const Player = ({
  isViewed,
  previewUrl,
  src,
  poster,
  video,
  addToHistory,
  setGiveKarmaParentCallback,
  resumeCallback,
  hideKarmaModel,
  componentName,
  data,
  channelName,
  stopStream,
  handleOpen
}) => {
  
  let videoRef;
  let [currentTime, setCurrentTime] = useState(0);
  
  const TIP_AFTER_TWO_MAX_DURATION = 120; //seconds
  const {
    setSingleVideoFormattedTimestamp,
  } = useContext(GlobalContext);

  const dataFunction = useRef()
  const newdataFunction = () =>{
    if (resumeCallback) {
      videoRef.play();
      setGiveKarmaParentCallback(false, false);
    }
  }
  dataFunction.current = newdataFunction
  useEffect(() => {
    dataFunction.current()
  }, [resumeCallback]);

  useEffect(() => {
    const player = videojs(videoRef);
    const timestamp = player.currentTime();
    var date = new Date(null);
    date.setSeconds(timestamp);
    var result = date.toISOString().substr(11, 8);
    setSingleVideoFormattedTimestamp(result);
  });

  useEffect(() => {
    const player = videojs(videoRef);
    player.pause();
  }, 
  );

  const tempFunction = useRef()
const newdatFunction = () =>{
  const player = videojs(videoRef);
    if (!previewUrl) {
      player.poster(poster);
      player.src(src);
      if (video.isVideoLocked && !video.isTATVideoLocked) {
        player.bigPlayButton.disable();
      }
    } else {
      player.src({ type: "video/mp4", src: previewUrl });
    }
    player.on("timeupdate", function (e) {
      if (video.keyVideoAccess === 3 && video.isTATVideoLocked) {
        let isVideoUnlocked = JSON.parse(
          localStorage.getItem("isTATVideoUnlocked")
        );
        if (
          player.currentTime() >= TIP_AFTER_TWO_MAX_DURATION &&
          video.isTATVideoLocked &&
          !isVideoUnlocked
        ) {
          //time in seconds
          player.pause();
          if (player.currentTime() >= TIP_AFTER_TWO_MAX_DURATION) {
            localStorage.setItem("TwoMinReached", true);
          }
        }
      }
    });

    player.on("seeked", function () {
      if (video.keyVideoAccess === 3 && video.isTATVideoLocked) {
        //only for Tip After Two Videos
        // guard against infinite recursion:
        // user seeks, seeking is fired, currentTime is modified, seeking is fired, current time is modified, ....
        let isVideoUnlocked = JSON.parse(
          localStorage.getItem("isTATVideoUnlocked")
        );
        if (
          player.currentTime() >= TIP_AFTER_TWO_MAX_DURATION &&
          video.isTATVideoLocked &&
          !isVideoUnlocked
        ) {
          var delta = player.currentTime() - currentTime;
          if (Math.abs(delta) > 0.01) {
            player.currentTime(TIP_AFTER_TWO_MAX_DURATION);
          }
        }
      }
    });
    player.on("pause", function () {
      if (this.scrubbing_ === false) {
        setGiveKarmaParentCallback(true, this.ended());
        let isVideoUnlocked = JSON.parse(
          localStorage.getItem("isTATVideoUnlocked")
        );
        if (
          video.keyVideoAccess === 3 &&
          player.currentTime() >= TIP_AFTER_TWO_MAX_DURATION &&
          video.isTATVideoLocked &&
          !isVideoUnlocked
        ) {
          player.currentTime(TIP_AFTER_TWO_MAX_DURATION);
        }
      }
    });
    player.on("play", function () {
      if (this.scrubbing_ === false) {
        let isVideoUnlocked = JSON.parse(
          localStorage.getItem("isTATVideoUnlocked")
        );
        if (isVideoUnlocked === true) {
          player.currentTime(player.currentTime() - 0.1);
        } else {
          if (
            video.keyVideoAccess === 3 &&
            player.currentTime() >= TIP_AFTER_TWO_MAX_DURATION &&
            video.isTATVideoLocked &&
            !isVideoUnlocked
          ) {
            player.currentTime(TIP_AFTER_TWO_MAX_DURATION);
          }
        }
        hideKarmaModel(false);
      }
    });

    player.on("ended", function () {
      if (!isViewed && !previewUrl) {
        addToHistory(video);
      }
      if (video.keyVideoAccess === 3) {
        setCurrentTime(0);
      }
    });
    return () => {
      localStorage.removeItem("isTATVideoUnlocked");
      player.dispose();
    };
}
tempFunction.current = newdatFunction
  useEffect(() => {
    tempFunction.current()
  }, [src, poster, previewUrl, videoRef, isViewed, addToHistory]);

  const tempFunc = useRef()
const newFunc = () =>{
  if (video && video.isVideoLocked === false) {
    const player = videojs(videoRef);
    player.bigPlayButton.enable();
  }
}
tempFunc.current = newFunc
  useEffect(() => {
    tempFunc.current()
  }, [video, video.isVideoLocked]);


  return (
    <Wrapper>
      <div>
        <div data-vjs-player>
          
          {componentName !== "LiveVideo" && componentName !== "StreamPage" && componentName !== "VideoClip" && <video
            controls
            ref={(node) => (videoRef = node)}
            className="video-js vjs-fluid vjs-big-play-centered"
          ></video>}
          {componentName === "StreamPage" && 
            <>
              <div className="video-full">
                <video
                  
                  ref={(node) => (videoRef = node)}
                  className="height-video-stream video-js vjs-fluid vjs-big-play-centered"
                ></video>
                <div className="viewers-badge-stream">
                  0000 viewers
                </div>
                <div className="stop-icon" onClick={stopStream}>
                  
                  <StopStream width={50} />
                </div>
                <div className="reverse-icon">
                  <ReverseCamera width={30} />
                </div>
                <div className="more-icon">
                  <MoreStreamIcon width={7} />
                </div>
                <div className="live-class-title-stream">
                  <span>{channelName}</span>
                </div>
              </div>
            </>
          }
          
          {componentName === "LiveVideo" && 
            <>
              
              <video
                
                ref={(node) => (videoRef = node)}
                className="height-video video-js vjs-fluid vjs-big-play-centered"
              ></video>
              <div className="viewers-badge">
                0000 viewers
              </div>
              <div className="minimize-icon">
                <MinimizeIcon width={30} />
              </div>
              <div className="pause-icon">
                <PauseIcon />
              </div>
              <div className="share-icon">
                <ShareIcon width={30} />
              </div>
              <div className="chat-icon" onClick={data.handleChat}  >
                 {data.chat ? <ChatIcon width={30}/>  : <CloseChatIcon/>}
              </div>
              <div className="full-screen-icon" onClick={data.handleFullScreen} >
                {data.fullscreen? <RemoveFullScreen/>  :  <FullscreenIcon/>}
              </div>
            </>
          }
          {componentName === "VideoClip" &&
          <>
            <video
                
                ref={(node) => (videoRef = node)}
                className=" video-js vjs-fluid vjs-big-play-centered"
              ></video>
              <div className="fullscreen-icon">
                <FullscreenIcon width={30} />
              </div> 
              <div className="minimize-icon">
                <MinimizeIcon width={30} />
              </div>
              <div className="pause-icon">
                <PauseIcon />
              </div>
              <div className="share-icon">
                <SettingIcon width={30} />
              </div>
          </>}
        </div>
      </div>
    </Wrapper>
  );
};

const mapStateToProps = ({ video }) => ({
  poster: video.thumbnail,
  src: video.url,
  isViewed: video.isViewed,
  video: {
    id: video.id,
    title: video.title,
    description: video.description,
    thumbnail: video.thumbnail,
    views: video.views + 1,
    isVideoLocked: video.isVideoLocked,
    keyVideoAccess: video.keyVideoAccess,
    isTATVideoLocked: video.isTATVideoLocked,
    User: {
      id: video.User?.id,
      username: video.User?.username,
      avatar: video.User?.avatar,
    },
  },
});

export default connect(mapStateToProps, { addToHistory })(Player);
