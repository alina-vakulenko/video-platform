// speed up => Alt + . with step = "step"
// speed down => Alt + , with step = "step"
// video is muted when playbackRate value is higher than "mutedMax" and lower than "mutedMin"
// playbackRate value can be set within "minRate" and "maxRate"
export const controlVideoSpeed =
  (
    videoElement,
    minRate = 0.25,
    maxRate = 5,
    step = 0.25,
    mutedMin = 0.25,
    mutedMax = 2.5
  ) =>
  (event) => {
    const speedUpPressed = event.altKey && event.key === ".";
    const speedDownPressed = event.altKey && event.key === ",";

    if (speedUpPressed) {
      if (videoElement.playbackRate <= maxRate - step) {
        videoElement.playbackRate += step;
      }

      videoElement.muted = shouldBeMuted(
        videoElement.playbackRate,
        mutedMin,
        mutedMax
      );
    }

    if (speedDownPressed) {
      if (videoElement.playbackRate >= minRate + step) {
        videoElement.playbackRate -= step;
      }

      videoElement.muted = shouldBeMuted(
        videoElement.playbackRate,
        mutedMin,
        mutedMax
      );
    }
  };

const shouldBeMuted = (playbackRate, min, max) => {
  return playbackRate <= min || playbackRate >= max;
};
