export const toggleFloatingMode = async (event, videoElement, setError) => {
  const toggleButton = event.target;

  toggleButton.disabled = true;
  try {
    if (videoElement !== document.pictureInPictureElement) {
      await videoElement.requestPictureInPicture();
      toggleButton.textContent = "Turn off";
    } else {
      await document.exitPictureInPicture();
      toggleButton.textContent = "Turn on";
    }
  } catch (error) {
    setError(error.message);
  } finally {
    toggleButton.disabled = false;
  }
};
