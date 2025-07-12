import React, { memo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import './index.scss';
import playIconUrl from '@/assets/icons/play.svg';
import soundIconUrl from '@/assets/icons/sound.svg';
import suspendIconUrl from '@/assets/icons/suspend.svg';
import playlistMusicIconUrl from '@/assets/icons/playlistMusic.svg';
import lyricIconUrl from '@/assets/icons/lyric.svg';
import nextMusicIconUrl from '@/assets/icons/nextMusic.svg';
interface IProps {
  children?: ReactNode;
}
const BottomPlayer: FC<IProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  return (
    <div className="bottom-player">
      <div className="bottom-player-left">
        <img className="music-img player-img" src="" alt="" />
        <div className="music-detail">
          <span className="music-name">歌曲名称</span>
          <span className="ar-name">- 歌手名称</span>
        </div>
      </div>
      <div className="bottom-player-middle">
        <div className="play-top">
          <img
            className="last-music-img player-img"
            src={nextMusicIconUrl}
            alt=""
          />
          <img
            className="play-img"
            src={isPlaying ? suspendIconUrl : playIconUrl}
            alt=""
            onClick={togglePlay}
          />
          <img className="player-img" src={nextMusicIconUrl} alt="" />
        </div>
        <div className="play-bottom">
          <span className="time">03:12</span>
          <div className="strip"></div>
          <span className="time">03:12</span>
        </div>
      </div>
      <div className="bottom-player-right">
        <img className="player-img" src={lyricIconUrl} alt="" />
        <img className="player-img" src={soundIconUrl} alt="" />
        <img className="player-img" src={playlistMusicIconUrl} alt="" />
      </div>
    </div>
  );
};

export default memo(BottomPlayer);
