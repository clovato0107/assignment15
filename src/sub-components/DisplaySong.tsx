type DisplaySongProps = {
  title: String;
  artist: String;
};

export default function DisplaySong({ title, artist }: DisplaySongProps) {
  return (
    <div>
      {title} by {artist}
    </div>
  );
}
