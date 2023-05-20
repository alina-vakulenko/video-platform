import ContentLoader from "react-content-loader";

export default function CoursePreviewSkeleton() {
  return (
    <ContentLoader
      className="card w-100"
      speed={2}
      width={350}
      height={450}
      viewBox="0 0 350 450"
      backgroundColor="#ecebeb"
      foregroundColor="#ecebeb"
    >
      {/* --- Image --------------------------------------------- */}
      <rect x="0" y="0" rx="4 4 0 0" width="100%" height="180" />
      <rect x="0" y="175" rx="0" ry="0" width="100" height="20" />
      {/* --- Title ------------------------------------------ */}
      <rect x="10" y="210" rx="4" width="250" height="25" />
      {/* --- Lessons and Rating -------------------------------- */}
      <rect x="10" y="245" rx="4" width="100" height="15" />
      <rect x="10" y="265" rx="4" width="150" height="15" />
      {/* --- Skills -------------------------------------------- */}
      <rect x="10" y="300" rx="4" width="175" height="20" />
      <rect x="50" y="330" rx="4" width="250" height="15" />
      <rect x="10" y="330" rx="4" width="30" height="15" />
      <rect x="50" y="350" rx="4" width="250" height="15" />
      <rect x="10" y="350" rx="4" width="30" height="15" />
      <rect x="50" y="370" rx="4" width="250" height="15" />
      <rect x="10" y="370" rx="4" width="30" height="15" />
      {/* --- Progress and Button --------------------------------------------- */}
      <rect x="10" y="410" rx="4" width="150" height="12" />
      <rect x="210" y="400" rx="4" width="130" height="30" />
    </ContentLoader>
  );
}
