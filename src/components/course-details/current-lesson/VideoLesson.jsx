import { useRef } from "react";

import { useHls } from "../../../hooks/useHls";
import { useVideoSpeedControl } from "../../../hooks/useVideoSpeedControl";
import { useVideoPosition } from "../../../hooks/useVideoPosition";
import { toggleFloatingMode } from "../../../utils/toggleFloatingMode";

import { BsPip, BsFillVolumeMuteFill } from "react-icons/bs";

const VideoLesson = ({ courseSlug, lessonId, link }) => {
  const videoRef = useRef();
  const [handlePause, handleEnded] = useVideoPosition(
    videoRef,
    courseSlug,
    lessonId
  );
  useHls({ videoUrl: `https://cors-proxy.fringe.zone/${link}`, videoRef });
  const { keyUp, keyDown, playbackRate, muted } =
    useVideoSpeedControl(videoRef);

  return (
    <>
      <video
        ref={videoRef}
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
        <div className="d-flex align-items-center justify-content-end gap-1">
          {muted && (
            <span className="badgeCustom" title="muted">
              <BsFillVolumeMuteFill />
            </span>
          )}
          {playbackRate !== 1 && (
            <span className="badgeCustom" title="playback rate">
              {playbackRate}
            </span>
          )}
          <span
            className="badgeCustom badge_pip"
            title="picture-in-picture mode"
            onClick={(event) => toggleFloatingMode(event, videoRef)}
          >
            <BsPip />
          </span>
        </div>
      </div>
    </>
  );
};

export default VideoLesson;
