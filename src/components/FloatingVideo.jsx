import { useState, useEffect, useRef } from "react";

import { controlVideoSpeed } from "../utils/controlVideoSpeed";
import { toggleFloatingMode } from "../utils/toggleFloatingMode";
import { useHls } from "../hooks/useHls";

export default function FloatingVideo({
  videoUrl,
  duration,
  startPosition,
  lessonId,
  ...other
}) {
  const videoRef = useRef();
  useHls({ videoUrl, videoRef });

  const [error, setError] = useState("");

  useEffect(() => {
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
      window.onunload = captureVideoPosition(
        lessonId,
        event.target.currentTime
      );
    };
    const video = videoRef.current;

    window.addEventListener("keydown", controlVideoSpeed(video));
    video.addEventListener("playing", handlePlaying);

    return () => {
      window.removeEventListener("keydown", controlVideoSpeed(video));
      video.removeEventListener("playing", handlePlaying);
    };
  }, [videoUrl, startPosition, lessonId]);

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
            <button
              type="button"
              onClick={(event) =>
                toggleFloatingMode(event, videoRef.current, setError)
              }
              className="btn btn-sm btn-dark ms-2"
              title="picture-in-picture mode"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                class="bi bi-pip"
                viewBox="0 0 16 16"
              >
                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5v-9zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
                <path d="M8 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-3z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
