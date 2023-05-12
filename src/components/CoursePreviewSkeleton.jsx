import React from "react";
import ContentLoader from "react-content-loader";

export default function CoursePreviewSkeleton() {
  return (
    <ContentLoader
      className="card w-100"
      speed={2}
      width={350}
      height={550}
      viewBox="0 0 350 550"
      backgroundColor="#ecebeb"
      foregroundColor="#ecebeb"
    >
      {/* --- Image --------------------------------------------- */}
      <rect x="0" y="0" rx="5" ry="5" width="100%" height="250" />
      {/* --- Title --------------------------------------------- */}
      <rect x="10" y="265" rx="5" ry="5" width="250" height="30" />
      {/* --- Lessons and Rating -------------------------------- */}
      <rect x="10" y="310" rx="5" ry="5" width="95" height="24" />
      <rect x="255" y="310" rx="5" ry="5" width="95" height="24" />
      {/* --- Skills -------------------------------------------- */}
      <rect x="10" y="370" rx="5" ry="5" width="175" height="24" />
      <rect x="50" y="405" rx="5" ry="5" width="250" height="20" />
      <rect x="10" y="405" rx="5" ry="5" width="30" height="20" />
      <rect x="50" y="435" rx="5" ry="5" width="250" height="20" />
      <rect x="10" y="435" rx="5" ry="5" width="30" height="20" />
      <rect x="50" y="465" rx="5" ry="5" width="250" height="20" />
      <rect x="10" y="465" rx="5" ry="5" width="30" height="20" />
      {/* --- Button --------------------------------------------- */}
      <rect x="210" y="550" rx="5" ry="5" width="144" height="35" />
    </ContentLoader>
  );
}