import React, { useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const Player = ({ video }) => {
  let videoRef;

  useEffect(() => {
    const player = videojs(videoRef);

    player.src({ type: "video/mp4", src: video.url });

    player.on("pause", function () {
      // do stuff when video is paused
    });
    player.on("play", function () {
      // do stuff when video is plaing
    });

    player.on("ended", function () {
      // do stuff when video is ended
    });
    return () => {
      player.dispose();
    };
  }, [video]);

  return (
    <div>
      <div data-vjs-player>
        <video
          controls
          ref={(node) => (videoRef = node)}
          className="video-js vjs-fluid vjs-big-play-centered"
        ></video>
      </div>
    </div>
  );
};

export default Player;
