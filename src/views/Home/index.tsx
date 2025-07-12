import {
  getRecommendMusicAPI,
  getRecommendSongsAPI,
  getTopListMusicAPI
} from '@/api/music';
import React, { memo, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import RecomendListCard from './components/RecommendListCard';

import './index.scss';
import Toplist from './components/Toplist';
import RecommendSong from './components/RecommendSong';

interface IProps {
  children?: ReactNode;
}

const Home: FC<IProps> = () => {
  const [recommendList, setRecommendList] = useState([]);
  const [topList, setTopListList] = useState([]);
  const [recommendSongs, setRecommendSongsList] = useState([]);
  useEffect(() => {
    const getRecommendMusic = async () => {
      const res = (await getRecommendMusicAPI()) as any;
      setRecommendList(res.recommend);
    };
    const getTopMusicList = async () => {
      const res = (await getTopListMusicAPI()) as any;
      setTopListList(res.list);
    };
    const getRecommendSongs = async () => {
      const res = (await getRecommendSongsAPI()) as any;
      setRecommendSongsList(res.data.dailySongs);
    };
    getTopMusicList();
    getRecommendMusic();
    getRecommendSongs();
  }, []);

  return (
    <div className="home">
      <h3 className="recommend-list-box-h3">推荐歌单</h3>
      <div className="recommend-list-box">
        {recommendList.map((item, index) => (
          <RecomendListCard key={index} data={item} />
        ))}
      </div>
      <h3 className="recommend-list-box-h3">榜单精选</h3>
      <div className="top-list-box">
        {topList?.slice(0, 6)?.map((item, index) => (
          <Toplist key={index} data={item} />
        ))}
      </div>
      <h3 className="recommend-list-box-h3">每日推荐单曲</h3>
      <div className="recommend-song-box">
        {recommendSongs.slice(0, 10).map((item, index) => (
          <RecommendSong key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default memo(Home);
