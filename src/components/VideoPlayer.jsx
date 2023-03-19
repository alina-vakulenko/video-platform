import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function VideoPlayer({ videoUrl, ...other }) {
  const playerRef = useRef();

  useEffect(() => {
    const video = playerRef.current;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoUrl;
    } else if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });
    }
  }, [videoUrl]);

  return <video ref={playerRef} {...other} />;
}
