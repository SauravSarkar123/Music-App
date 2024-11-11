import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaPlay, FaShareAlt, FaPlus, FaDownload, FaEllipsisV } from "react-icons/fa";

const Topindie = ({ onSongSelect, songs }) => {
  const artists = [
    { name: "Artist 1", image: "/Artist1.jfif" },
    { name: "Artist 2", image: "/Artist2.jfif" },
    { name: "Artist 3", image: "/Artist1.jfif" },
    { name: "Artist 4", image: "/Artist2.jfif" },
    { name: "Artist 5", image: "/Artist1.jfif" },
    { name: "Artist 6", image: "/Artist2.jfif" },
    { name: "Artist 7", image: "/Artist1.jfif" },
    { name: "Artist 8", image: "/Artist2.jfif" },
    { name: "Artist 9", image: "/Artist1.jfif" },
    { name: "Artist 10", image: "/Artist2.jfif" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const artistsPerPage = 5;

  const scrollLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - artistsPerPage);
    }
  };

  const scrollRight = () => {
    if (currentIndex + artistsPerPage < artists.length) {
      setCurrentIndex(currentIndex + artistsPerPage);
    }
  };

  const [songIndex, setSongIndex] = useState(0);
  const [menuIndex, setMenuIndex] = useState(null);

  const scrollSongLeft = () => {
    if (songIndex > 0) {
      setSongIndex(songIndex - artistsPerPage);
    }
  };

  const scrollSongRight = () => {
    if (songIndex + artistsPerPage < songs.length) {
      setSongIndex(songIndex + artistsPerPage);
    }
  };

  const handleClickOutside = () => {
    setMenuIndex(null);
  };

  useEffect(() => {
    if (menuIndex !== null) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuIndex]);

  return (
    <div className="px-6 py-14">
      {/* Top Indie Artists Section */}
      <div className="flex flex-row justify-between items-center">
        <p className="text-2xl font-bold text-white mb-4 text-left pl-3 relative left-20">Top Indie Artists</p>
        <p className="text-red-600 relative right-40 border-b-2 border-red-600 py-1 transition duration-300 ease-in-out hover:text-white hover:bg-red-600 hover:rounded-md px-2 cursor-pointer">
          <span className="mr-1">More</span>
        </p>
      </div>

      <div className="relative flex items-center top-10">
        <button onClick={scrollLeft} disabled={currentIndex === 0}
          className={`text-white bg-gray-700 hover:bg-gray-600 p-2 rounded-full absolute left-4 z-10 transition-transform duration-200 transform ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}`}>
          <FaArrowLeft size={20} />
        </button>

        <div className="scrollable-container flex overflow-hidden space-x-6 px-20 pb-4">
          {artists.slice(currentIndex, currentIndex + artistsPerPage).map((artist, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-52 h-52 rounded-full object-cover mb-2 border-2 border-gray-600 hover:scale-105 transition-transform duration-300"
              />
              <p className="text-white text-sm font-semibold">{artist.name}</p>
            </div>
          ))}
        </div>

        <button onClick={scrollRight} disabled={currentIndex + artistsPerPage >= artists.length}
          className={`text-white bg-gray-700 hover:bg-gray-600 p-2 rounded-full absolute right-4 z-10 transition-transform duration-200 transform ${currentIndex + artistsPerPage >= artists.length ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}`}>
          <FaArrowRight size={20} />
        </button>
      </div>

      {/* Tamil Top 50 Section */}
      <div className="mt-20 px-6">
        <div className='flex items-center justify-between mb-8'>
          <h2 className="text-2xl font-bold text-white mb-4 relative left-20">Tamil Top 50</h2>
          <p className="text-red-600 relative right-40 border-b-2 border-red-600 py-1 transition duration-300 ease-in-out hover:text-white hover:bg-red-600 hover:rounded-md px-2 cursor-pointer">
            <span className="mr-1">More</span>
          </p>
        </div>
        <div className="relative flex items-center">
          <button onClick={scrollSongLeft} disabled={songIndex === 0}
            className={`text-white bg-gray-700 hover:bg-gray-600 p-2 rounded-full absolute left-4 z-10 transition-transform duration-200 transform ${songIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}`}>
            <FaArrowLeft size={20} />
          </button>

          <div className="scrollable-container grid grid-cols-5 gap-6 w-full px-4 sm:px-8 md:px-16 lg:px-24 pb-4">
            {songs.slice(songIndex, songIndex + artistsPerPage).map((song, index) => (
              <div key={index} onClick={() => onSongSelect(songIndex + index)} className="relative group bg-gray-800 p-4 rounded-lg cursor-pointer">
                <img
                  src={song.image}
                  alt={song.title}
                  className="w-full h-40 object-cover rounded-lg transition-transform duration-300 transform group-hover:scale-105"
                />
                <p className="text-white text-sm mt-2 font-semibold">{song.title}</p>
                <p className="text-gray-400 text-xs">{song.artist}</p>

                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaPlay size={30} className="text-white" />
                </div>
                <FaShareAlt
                  className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <FaEllipsisV
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuIndex(menuIndex === (songIndex + index) ? null : (songIndex + index));
                  }}
                  className="absolute bottom-4 right-4 text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                />

                {menuIndex === (songIndex + index) && (
                  <div className="absolute right-0 top-8 bg-gray-800 text-white rounded-md shadow-lg p-3 w-52">
                    <ul>
                      <li className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
                        <FaDownload className="text-lg" />
                        <span>Download</span>
                      </li>
                      <li className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
                        <FaShareAlt className="text-lg" />
                        <span>Share</span>
                      </li>
                      <li className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
                        <FaPlus className="text-lg" />
                        <span>Add to Playlist</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button onClick={scrollSongRight} disabled={songIndex + artistsPerPage >= songs.length}
            className={`text-white bg-gray-700 hover:bg-gray-600 p-2 rounded-full absolute right-4 z-10 transition-transform duration-200 transform ${songIndex + artistsPerPage >= songs.length ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}`}>
            <FaArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topindie;
