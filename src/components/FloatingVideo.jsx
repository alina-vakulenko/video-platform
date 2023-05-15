import { useRef } from "react";

import { toggleFloatingMode } from "../utils/toggleFloatingMode";
import { useHls } from "../hooks/useHls";
import { useVideoSpeedControl } from "../hooks/useVideoSpeedControl";
import { useVideoPosition } from "../hooks/useVideoPosition";

export default function FloatingVideo({ videoUrl }) {
  const videoRef = useRef();
  useHls({ videoUrl, videoRef });

  const { keyUp, keyDown, playbackRate, muted } =
    useVideoSpeedControl(videoRef);

  const [handlePause, handleEnded] = useVideoPosition(videoRef, videoUrl);

  return (
    <>
      <video
        ref={videoRef}
        src={videoUrl}
        type="application/x-mpegURL"
        onPause={handlePause}
        onEnded={handleEnded}
        muted={muted}
        controls
      >
        Your browser doesn't support HTML video
      </video>
      <div>
        <p>
          Press <code>{`Alt + ${keyUp}`}</code> to speed up a video or{" "}
          <code>{`Alt + ${keyDown}`}</code> to slow down.
        </p>
        <div className="d-flex align-items-center justify-content-end">
          {muted && (
            <span className="badge" title="muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-volume-mute"
                viewBox="0 0 16 16"
              >
                <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z" />
              </svg>
            </span>
          )}
          {playbackRate !== 1 && (
            <span className="badge" title="playback rate">
              {playbackRate}
            </span>
          )}
          <span
            className="badge badge_pip"
            title="picture-in-picture mode"
            onClick={(event) => toggleFloatingMode(event, videoRef)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pip"
              viewBox="0 0 16 16"
            >
              <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5v-9zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
              <path d="M8 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-3z" />
            </svg>
          </span>
        </div>
      </div>
    </>
  );
}
