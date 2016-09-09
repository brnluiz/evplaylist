const zeroFill = (string, length = 2) => {
  let str = string+'';
  while (str.length < length) str = '0' + str;
  return str;
}

export const fromIso = (isoTime) => {
  var match = isoTime.match(/PT(\d+H)?(\d+M)?(\d+S)?/)

  var hours = (parseInt(match[1]) || 0);
  var minutes = (parseInt(match[2]) || 0);
  var seconds = (parseInt(match[3]) || 0);

  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}

export const beautifyYoutube = (isoTime) => {
  let duration = fromIso(isoTime);

  return (
    zeroFill(duration.minutes)
    + ':'
    + zeroFill(duration.seconds)
  );
}
