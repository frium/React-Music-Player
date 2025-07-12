import React, { memo, useEffect, useRef, useState } from 'react';
import type { FC, ReactNode } from 'react';
import './index.scss';
import playIconUrl from '@/assets/icons/play.svg';
import soundIconUrl from '@/assets/icons/sound.svg';
import suspendIconUrl from '@/assets/icons/suspend.svg';
import playlistMusicIconUrl from '@/assets/icons/playlistMusic.svg';
import lyricIconUrl from '@/assets/icons/lyric.svg';
import nextMusicIconUrl from '@/assets/icons/nextMusic.svg';
import { useLocation } from 'react-router-dom';
import { getLyricAPI, getMusicUrlAPI, getSongDetailAPI } from '@/api/music';
import { useAppDispatch } from '@/store/hooks';
import { setLyc } from '@/store/modules/music';
interface IProps {
  children?: ReactNode;
}

const BottomPlayer: FC<IProps> = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lyr, setLyr] = useState('');
  const [musicUrl, setMusicUrl] = useState('');
  const [musicName, setMusicName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [musicImg, setMusicImg] = useState('');
  const [musicId, setMusicId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dispatch = useAppDispatch();

  const location = useLocation();

  // 获取音乐ID
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('musicid');
    setMusicId(id);
  }, [location.search]);

  // 获取音乐URL和歌词
  useEffect(() => {
    if (!musicId) return;
    const fetchMusicData = async () => {
      try {
        const [urlRes, lyricRes, songs] = await Promise.all([
          getMusicUrlAPI(musicId),
          getLyricAPI(musicId),
          getSongDetailAPI(musicId)
        ]);
        setMusicUrl(urlRes.data[0].url);
        if (audioRef.current) {
          audioRef.current.src = urlRes.data[0].url;
        }
        setLyr((lyricRes as any).lrc.lyric);
        setDuration(urlRes.data[0].time);
        const song = (songs as any).songs[0];
        setMusicName(song.name);
        setAuthorName(song.ar[0].name);
        setMusicImg(song.al.picUrl);
        dispatch(setLyc((lyricRes as any).lrc.lyric));
      } catch (error) {
        console.error('获取音乐数据失败:', error);
      }
    };
    fetchMusicData();
  }, [musicId]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime * 1000);
      if (stripRef.current) {
        stripRef.current.style.width =
          ((audio.currentTime * 1000) / duration) * 100 + '%';
      }
    };
    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [duration]);
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setIsPlaying((prev) => {
      const newState = !prev;
      if (newState) {
        audio.play().catch((error) => console.error('播放失败:', error));
        if (imgRef.current) {
          imgRef.current.style.animation = 'spin 60s linear infinite';
          imgRef.current.style.animationPlayState = 'running';
        }
      } else {
        audio.pause();
        if (imgRef.current) {
          imgRef.current.style.animationPlayState = 'paused';
        }
      }
      return newState;
    });
  };

  const formatMilliseconds = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = Math.floor(totalSeconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateProgress(e);
  };

  // 处理鼠标移动事件
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateProgress(e);
  };

  // 处理鼠标抬起事件
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 更新进度
  const updateProgress = (e: React.MouseEvent<HTMLDivElement>) => {
    const strip = e.currentTarget;
    const rect = strip.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = Math.min(Math.max(offsetX / rect.width, 0), 1);

    if (audioRef.current) {
      const newTime = (percentage * duration) / 1000;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime * 1000);
      audioRef.current.play();
      if (imgRef.current) {
        imgRef.current.style.animation = 'spin 60s linear infinite';
        imgRef.current.style.animationPlayState = 'running';
      }
      setIsPlaying(true);
    }

    if (stripRef.current) {
      stripRef.current.style.width = `${percentage * 100}%`;
    }
  };

  // 点击进度条任意位置跳转
  const handleStripClick = (e: React.MouseEvent<HTMLDivElement>) => {
    updateProgress(e);
  };
  return (
    <div className="bottom-player">
      <audio id="audio-element" ref={audioRef} onEnded={togglePlay} />

      <div className="bottom-player-left">
        <img
          ref={imgRef}
          className="music-img player-img"
          src={musicImg}
          alt=""
        />
        <div className="music-detail">
          <span className="music-name">{musicName}</span>
          <span className="ar-name">{' - ' + authorName}</span>
        </div>
      </div>

      <div className="bottom-player-middle">
        <div className="play-top">
          <img
            className="last-music-img player-img"
            src={nextMusicIconUrl}
            alt="上一首"
          />
          <img
            className="play-img"
            src={isPlaying ? suspendIconUrl : playIconUrl}
            alt={isPlaying ? '暂停' : '播放'}
            onClick={togglePlay}
          />
          <img className="player-img" src={nextMusicIconUrl} alt="下一首" />
        </div>
        <div className="play-bottom">
          <span className="time">{formatMilliseconds(currentTime)}</span>
          <div
            className="strip"
            onClick={handleStripClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsDragging(false)}
          >
            <div className="color-strip" ref={stripRef}></div>
          </div>
          <span className="time">{formatMilliseconds(duration)}</span>
        </div>
      </div>

      <div className="bottom-player-right">
        <img className="player-img" src={lyricIconUrl} alt="歌词" />
        <img className="player-img" src={soundIconUrl} alt="音量" />
        <img className="player-img" src={playlistMusicIconUrl} alt="播放列表" />
      </div>
    </div>
  );
};

export default memo(BottomPlayer);
