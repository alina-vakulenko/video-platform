import React, { useState, useEffect, useRef } from "react";
import Hls from "hls.js";

import { controlVideoSpeed } from "../utils/controlVideoSpeed";
import { toggleFloatingMode } from "../utils/toggleFloatingMode";

export default function FloatingVideo({
  videoUrl,
  duration,
  startPosition,
  lessonId,
  ...other
}) {
  const videoRef = useRef();
  const [error, setError] = useState("");

  const captureVideoPosition = (lessonId, time) => () => {
    localStorage.setItem(lessonId, JSON.stringify({ currentPosition: time }));
  };

  const handlePlaying = (event) => {
    event.target.onloadstart = captureVideoPosition(
      lessonId,
      event.target.currentTime
    );
    event.target.onpause = captureVideoPosition(
      lessonId,
      event.target.currentTime
    );
    window.onunload = captureVideoPosition(lessonId, event.target.currentTime);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoUrl;
    } else if (Hls.isSupported()) {
      const config = {
        autoStartLoad: false,
      };
      const hls = new Hls(config);
      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        hls.startLoad(startPosition);
      });
      hls.loadSource(videoUrl);
      hls.attachMedia(video);
    }

    window.addEventListener("keydown", controlVideoSpeed(video));
    video.addEventListener("playing", handlePlaying);

    return () => {
      window.removeEventListener("keydown", controlVideoSpeed(video));
      video.removeEventListener("playing", handlePlaying);
    };
  }, [videoUrl, startPosition]);

  return (
    <>
      <video
        ref={videoRef}
        src={videoUrl}
        type="application/x-mpegURL"
        controls
        {...other}
      >
        Your browser doesn't support HTML video
      </video>
      {error ? (
        <span>{error}</span>
      ) : (
        <div>
          <p>
            Press <code>Alt + .</code> to speed up a video by 25% or{" "}
            <code>Alt + ,</code> to slow down a video by 25%. Hold the hotkey
            down to max out to 5.0x, or min out the speed at 0.25x.
          </p>
          <div className="d-flex align-items-center justify-content-end">
            <h6 className="m-0">Picture-in-picture mode</h6>
            <button
              onClick={(event) =>
                toggleFloatingMode(event, videoRef.current, setError)
              }
              className="btn btn-sm btn-outline-dark ms-2"
            >
              Turn on
            </button>
          </div>
        </div>
      )}
    </>
  );
}
