import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  initialDatetime?: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialDatetime }) => {
  initialDatetime ??= new Date();
  const [datetime, setDatetime] = useState(initialDatetime);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(initialDatetime));
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (datetime && isRunning) {
      interval = setInterval(() => {
        setTimeLeft(getTimeLeft(datetime));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [datetime, isRunning]);

  const handleDatetimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDatetime = new Date(event.target.value);
    setDatetime(newDatetime);
    setTimeLeft(getTimeLeft(newDatetime));
  };

  const handleStartClick = () => {
    setIsRunning(true);
  };

  const handleStopClick = () => {
    setIsRunning(false);
  };

  return (
    <div>
      <div>
        <div>{timeLeft.days} days</div>
        <div>{timeLeft.hours} hours</div>
        <div>{timeLeft.minutes} minutes</div>
        <div>{timeLeft.seconds} seconds</div>
      </div>
      <div>
        <label htmlFor="datetime-input">Countdown end time:</label>
        <input
          type="datetime-local"
          id="datetime-input"
          value={datetime.toISOString().slice(0, -8)}
          onChange={handleDatetimeChange}
        />
      </div>
      <div>
        {!isRunning && (
          <button onClick={handleStartClick}>Click To Start Countdown</button>
        )}
        {isRunning && (
          <button onClick={handleStopClick}>Click To Stop Countdown</button>
        )}
      </div>
    </div>
  );
};

const getTimeLeft = (datetime: Date) => {
  const timeLeft = datetime.getTime() - new Date().getTime();
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return { days, hours, minutes, seconds };
};

export default CountdownTimer;
