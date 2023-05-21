const Progress = ({ progress }) => {
  return (
    <div className="progress w-100">
      <div
        className="progress-bar course-progress"
        role="progressbar"
        style={{ width: `${progress.toFixed(2)}%` }}
        aria-valuenow={progress.toFixed(2)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {`${progress.toFixed(0)}%`}
      </div>
    </div>
  );
};

export default Progress;
