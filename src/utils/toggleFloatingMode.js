import { toast } from "react-toastify";

export const toggleFloatingMode = async (event, videoRef) => {
  const toggleButton = event.target;

  toggleButton.disabled = true;

  try {
    if (videoRef.current !== document.pictureInPictureElement) {
      const video = videoRef.current;
      await video.requestPictureInPicture();
    } else {
      await document.exitPictureInPicture();
    }
  } catch (error) {
    toast.error(error.message);
  } finally {
    toggleButton.disabled = false;
  }
};
