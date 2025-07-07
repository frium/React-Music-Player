import { getRecommendMusicAPI, getTopListMusicAPI } from '@/api/music';
import React, { memo, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import RecomendListCard from './components/RecommendListCard';

import './index.scss';
import Toplist from './components/Toplist';

interface IProps {
  children?: ReactNode;
}

const Home: FC<IProps> = () => {
  const [recommendList, setRecommendList] = useState([]);
  const [topList, setTopListList] = useState([]);
  useEffect(() => {
    const getRecommendMusic = async () => {
      const res = (await getRecommendMusicAPI()) as any;
      setRecommendList(res.recommend);
    };
    const getTopMusicList = async () => {
      const res = (await getTopListMusicAPI()) as any;
      console.log('榜单音乐：', res);
      setTopListList(res.list);
    };
    getTopMusicList();
    getRecommendMusic();
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
        {topList.slice(0, 6).map((item, index) => (
          <Toplist key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default memo(Home);
