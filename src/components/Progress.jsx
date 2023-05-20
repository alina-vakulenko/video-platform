const Progress = ({ progress }) => {
  return (
    <div className="progress w-50">
      <div
        className="progress-bar course-card-progress"
        role="progressbar"
        style={{ width: `${progress.toFixed(0)}%` }}
        aria-valuenow={progress.toFixed(0)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {`${progress.toFixed(0)}%`}
      </div>
    </div>
  );
};

export default Progress;
