export const handleVideoDuration = (durationSeconds) => {
  const hours = Math.trunc(durationSeconds / 3600);
  const minutes = Math.trunc(durationSeconds / 60) - hours;
  const seconds = durationSeconds - hours * 3600 - minutes * 60;

  return [hours, minutes, seconds];
};

export const formatVideoDuration = (durationSeconds) => {
  const durationArray = handleVideoDuration(durationSeconds);

  let formatedDuration = " ";
  const measures = ["h", "m", "s"];

  durationArray.forEach((timeElement, index) => {
    if (timeElement > 0) {
      formatedDuration = formatedDuration.concat(
        `${timeElement}${measures[index]} `
      );
    }
  });

  return formatedDuration;
};
