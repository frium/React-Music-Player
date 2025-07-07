import { getRecommendMusicAPI, searchMusicAPI } from '@/api/music';
import React, { memo, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import RecomendListCard from './components/RecommendListCard';

import './index.scss';

interface IProps {
  children?: ReactNode;
}

const Home: FC<IProps> = () => {
  const [recommendList, setRecommendList] = useState([]);
  useEffect(() => {
    const fetchRecommendMusic = async () => {
      const res = (await getRecommendMusicAPI()) as any;
      console.log('推荐音乐：', res);
      setRecommendList(res.recommend);
    };
    fetchRecommendMusic();
  }, []);

  return (
    <div>
      <h3 className="recommend-list-box-h3">推荐歌单</h3>
      <div className="recommend-list-box">
        {recommendList.map((item, index) => (
          <RecomendListCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default memo(Home);
