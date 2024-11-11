import React, { useState } from "react";
import Header from "../components/header";
import Topindie from "../components/Topindie";
import MusicPlayer from "../components/musicplayer";

const Landing = () => {
  const [selectedSong, setSelectedSong] = useState(null);

  const songs = [
    { title: "Elegant", artist: "Singer A", image: "/Music1.jfif", duration: "3:45", src: "/Songs1.mp3" },
    { title: "Beautiful", artist: "Singer B", image: "/Music2.jfif", duration: "4:10", src: "/Songs2.mp3" },
    { title: "Fantastic", artist: "Singer C", image: "/Music3.jfif", duration: "5:00", src: "/Songs3.mp3" },
    { title: "Gorgeous", artist: "Singer D", image: "/Music1.jfif", duration: "3:30", src: "/Songs1.mp3" },
    { title: "Pathetic", artist: "Singer E", image: "/Music2.jfif", duration: "4:20", src: "/Songs2.mp3" },
    { title: "Song 6", artist: "Singer F", image: "/Music3.jfif", duration: "3:50", src: "/Songs3.mp3" },
    { title: "Song 7", artist: "Singer G", image: "/Music1.jfif", duration: "4:00", src: "/Songs1.mp3" },
    { title: "Song 8", artist: "Singer H", image: "/Music2.jfif", duration: "3:55", src: "/Songs2.mp3" },
    { title: "Song 9", artist: "Singer I", image: "/Music3.jfif", duration: "4:30", src: "/Songs3.mp3" },
    { title: "Song 10", artist: "Singer J", image: "/Music1.jfif", duration: "4:05", src: "/Songs1.mp3" },
  ];

  const handleSongSelection = (songIndex) => {
    setSelectedSong(songIndex);
  };

  return (
    <div className="bg-black min-h-screen relative">
      <Header />
      <div>
        <Topindie onSongSelect={handleSongSelection} songs={songs} />
      </div>
      <div className="fixed bottom-0 left-0 border-violet-600 w-full z-50">
        <MusicPlayer selectedSongIndex={selectedSong} songs={songs} />
      </div>
    </div>
  );
};

export default Landing;
