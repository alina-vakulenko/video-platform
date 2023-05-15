/* 
Control video playback rate with custom shortcuts Alt + [key]

Speed up => Alt + [keyUp] with step = "step"
Speed down => Alt + [keyDown] with step = "step"
Set limits for playback rate with "minRate" and "maxRate"
Control when to mute video with "mutedMax" and "mutedMin"
*/

import { useEffect, useState } from "react";

export const useVideoSpeedControl = (
  videoRef,
  controls = {
    keyUp: ".",
    keyDown: ",",
    minRate: 0.25,
    maxRate: 4,
    step: 0.25,
    mutedMin: 0.5,
    mutedMax: 2.25,
  }
) => {
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!videoRef.current) {
        return;
      }

      const video = videoRef.current;
      const { keyUp, keyDown, minRate, maxRate, step } = controls;

      const keyUpPressed = event.altKey && event.key === keyUp;
      const keyDownPressed = event.altKey && event.key === keyDown;

      if (keyUpPressed) {
        video.playbackRate = Math.min(video.playbackRate + step, maxRate);
        setPlaybackRate(video.playbackRate);
      }

      if (keyDownPressed) {
        video.playbackRate = Math.max(video.playbackRate - step, minRate);
        setPlaybackRate(video.playbackRate);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef]);

  useEffect(() => {
    const { mutedMin, mutedMax } = controls;
    if (playbackRate <= mutedMin || playbackRate >= mutedMax) {
      setMuted(true);
    } else setMuted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playbackRate]);

  return { ...controls, playbackRate, muted };
};
