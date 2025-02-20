const timeToMs = time => {
  const parts = time.split(':');
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const seconds = parseInt(parts[2], 10);

  return (hours * 60 * 60 + minutes * 60 + seconds) * 1000;
};

export default timeToMs;
