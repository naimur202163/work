import React from "react";
import styled from "styled-components";
import OptionMenu from "../pages/OptionMenu";
// import VideoCardOverlay from "./VideoCardOverlay/VideoCardOverlay";

const LiveClassesCard = () => {
  // const [showVideo, setShowVideo] = useState(false);
  // let timeout;

  return (
    <>
    <LiveClassesCardStyled
     
    >
      <div>
        <img
          src="https://images.news18.com/ibnlive/uploads/2021/06/1624044810_yoga-day-history.jpg?im=Resize,width=360,aspect=fit,type=normal?im=Resize,width=320,aspect=fit,type=normal"
          alt=""
          className="thumbnail"
        />
        <div className="live-badge">LIVE</div>
        <div className="view-badge">0000 Viewers</div>
      </div>
      
    </LiveClassesCardStyled>
    <LiveClassesDescStyled>
    <div><OptionMenu/></div>
    <div className="video-title">Name having a class about category in location</div>

    </LiveClassesDescStyled>
  </>
  );
};

export default LiveClassesCard;

const LiveClassesDescStyled = styled.div`
    margin : 10px;
    font-family : Montserrat;
    margin-left: 17px;
  
`

const LiveClassesCardStyled = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 0.5rem;
  position: relative;
  margin: 0 auto;

 

  .live-badge {
    font-family: Montserrat;
    position: absolute;
    top: 6%;
    padding: 3px 15px 3px 15px;
    z-index: 98;
    border-radius : 10px;
    left:5%;
    background: linear-gradient(
      29deg,
      rgb(249, 154, 45),
      rgb(246, 92, 139) 71%
    ) !important;
    box-shadow: -1px 2px 3px rgba(0, 0, 0, 0.3);
    clip-path: polygon(0 0, 100% 0%, 100% 100%, 0 100%, 0% 50%);
    transition: all 0.3s ease;

    p {
      font-size: 0.7rem;
      text-transform: capitalize;
      font-weight: 300;
      letter-spacing: 0.1px;
      margin: 0;
      padding: 0;
      transition: all 0.2s ease;

      span {
        font-weight: bold;
      }
    } 
  }
  .view-badge{
    font-family:Montserrat;
    position: absolute;
    bottom: 20px;
    padding: 3px 15px 3px 15px;
    z-index: 98;
    border-radius : 10px;
    left:5%;
    background: #181818;
    box-shadow: -1px 2px 3px rgba(0, 0, 0, 0.3);
    clip-path: polygon(0 0, 100% 0%, 100% 100%, 0 100%, 0% 50%);
    transition: all 0.3s ease;
  }
  .thumbnail {
    width: 100%;
    height : 40vh;
    border-radius : 20px;
    background-size: cover;
    background-position: center;
    object-fit: cover;
    z-index: -1;
    padding: 10px;
    outline: none;
  }
  .video-title{
    text-align : left;
    font-family : Montserrat;
    text-align : left;
  }
  @media screen and (max-width: 530px) {
    .thumbnail {
      height : 30vh;
    }
    .live-badge{
      font-size : 10px;
    }
    .view-badge{
      font-size : 10px;
    }
    .video-title{
      font-size : 10px;
    }
  }
  @media screen and (max-width : 768px){
    .live-badge{
      font-size : 10px;
    }
    .view-badge{
      font-size : 10px;
    }
    .video-title{
      font-size : 10px;
    }
  }

  
`;
