export const formatIsoDate = (isoDate, showTime = false) => {
  const formatMonth = (monthNumber) => {
    const formattedMonth =
      monthNumber < 9 ? `0${monthNumber + 1}` : monthNumber + 1;
    return formattedMonth;
  };

  const formatNumbersBelowTen = (number) => {
    const formattedNumber = number < 10 ? `0${number}` : number;
    return formattedNumber;
  };

  const date = new Date(isoDate);
  const timestampWithoutOffset =
    date.getTime() - date.getTimezoneOffset() * 60 * 1000;
  const dateWithoutOffset = new Date(timestampWithoutOffset);

  const launchDate = `${dateWithoutOffset.getFullYear()}-${formatMonth(
    dateWithoutOffset.getMonth()
  )}-${formatNumbersBelowTen(dateWithoutOffset.getDate())}`;

  const launchTime = `${formatNumbersBelowTen(
    dateWithoutOffset.getHours()
  )}:${formatNumbersBelowTen(dateWithoutOffset.getMinutes())}`;

  if (showTime === true) {
    return `${launchDate} ${launchTime}`;
  } else {
    return launchDate;
  }
};
