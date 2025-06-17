export const getUploadStatus = (uploadedImages, index: number) => {
  const uploadedImg = uploadedImages[index];
  if (!uploadedImg) return null;

  if (uploadedImg.uploading) {
    return "uploading";
  } else if (uploadedImg.url) {
    return "success";
  } else if (uploadedImg.error) {
    return "error";
  }
  return null;
};
