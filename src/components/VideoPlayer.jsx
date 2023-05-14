import { useRef } from "react";

import { useHls } from "../hooks/useHls";
import { usePlayOnHover } from "../hooks/usePlayOnHover";

import playIcon from "../assets/play-btn.svg";

export default function VideoPlayer({ videoUrl, poster, ...other }) {
  const videoRef = useRef(null);

  useHls({ videoUrl, videoRef });
  const [handleLoadMetadata, handleMouseEnter, handleMouseLeave, paused] =
    usePlayOnHover(videoRef);

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <video
        ref={videoRef}
        poster={poster}
        onLoadedMetadata={handleLoadMetadata}
        {...other}
      />
      {paused && (
        <img src={playIcon} alt="contains video" className="play-icon" />
      )}
      {paused && !!poster && (
        <img src={poster} alt="Lesson cover" className="card-img" />
      )}
    </div>
  );
}
