const getFileComponent = (fileUrl) => {
  const fileExtension = fileUrl.split(".").pop();
  switch (fileExtension) {
    case "mp3":
    case "wav":
    case "ogg":
    case "m4a":
      return (
        <audio controls src={fileUrl}>
          Your browser does not support the audio element.
        </audio>
      );
    case "mp4":
    case "webm":
      return (
        <video controls src={fileUrl}>
          Your browser does not support the video element.
        </video>
      );
    case "pdf":
      return (
        <embed
          src={fileUrl}
          type="application/pdf"
          width="100%"
          height="600px"
        />
      );
    default:
      return (
        <a href={fileUrl} download>
          <p className="inline-block px-2 py-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            {fileUrl.replace("http://127.0.0.1:8000/media/audio_files/", "")}
          </p>
        </a>
      );
  }
};

export default getFileComponent;
