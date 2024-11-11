import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp } from 'react-icons/fa';

const MusicPlayer = ({ selectedSongIndex, songs }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleEnded = () => {
    nextSong();
  };

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(true);
  };

  const prevSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [currentSongIndex]);

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  useEffect(() => {
    if (selectedSongIndex !== null && selectedSongIndex !== currentSongIndex) {
      setCurrentSongIndex(selectedSongIndex);
      setIsPlaying(true);
    }
  }, [selectedSongIndex, currentSongIndex]);

  // Update song source only when song index changes, avoiding reset of currentTime
  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.src = songs[currentSongIndex].src; // Set new song source only on song index change
      if (isPlaying) {
        audio.play().catch((error) => console.log("Play error:", error));
      }
    }
  }, [currentSongIndex, songs]);

  // Separate effect for handling play/pause without resetting currentTime
  useEffect(() => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.play().catch((error) => console.log("Play error:", error));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#1F2937] text-white p-5 shadow-lg flex items-center justify-between animate-slide-up border-t border-gray-600">
      <audio ref={audioRef} onEnded={handleEnded} />

      {/* Song Info */}
      <div className="flex flex-col items-start">
        <span className="font-semibold text-lg">{songs[currentSongIndex].title}</span>
        <span className="text-sm text-gray-300">
          {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')} /
          {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
        </span>
      </div>

      {/* Player Controls */}
      <div className="flex items-center space-x-2 relative left-2">
        <button onClick={prevSong} className="hover:bg-blue-800 p-2 rounded-full">
          <FaStepBackward size={22} />
        </button>
        <button onClick={togglePlayPause} className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110">
          {isPlaying ? <FaPause size={22} /> : <FaPlay size={22} />}
        </button>
        <button onClick={nextSong} className="hover:bg-blue-800 p-2 rounded-full">
          <FaStepForward size={22} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="flex-grow mx-4">
        <input
          type="range"
          min="0"
          max="100"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleProgressChange}
          className="w-full h-2 rounded-lg bg-gray-500 accent-blue-600 cursor-pointer"
        />
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-2">
        <FaVolumeUp />
        <input
          type="range"
          min="0"
          max="100"
          value={volume * 100}
          onChange={handleVolumeChange}
          className="cursor-pointer w-24 h-2 rounded-lg bg-gray-500 accent-blue-600"
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
