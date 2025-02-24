export function Video({ source }: { source: string | undefined }) {
  if (!source) {
    return null;
  }

  return (
    <video
      width="320"
      height="240"
      controls
      autoPlay
      playsInline
      muted
      preload="none"
      className="mx-auto my-3 w-10/12 rounded-xl"
    >
      <source src={source} type="video/mp4" />
      <track src={source} kind="subtitles" srcLang="en" label="English" />
      Your browser does not support the video tag.
    </video>
  );
}
