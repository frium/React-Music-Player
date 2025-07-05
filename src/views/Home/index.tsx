import { searchMusicAPI } from '@/api/music';
import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import './index.scss';

interface IProps {
  children?: ReactNode;
}

const Home: FC<IProps> = () => {
  const handleClick = async () => {
    const res = await searchMusicAPI('心拍数');
    console.log(res);
  };

  return (
    <div>
      <div>index</div>
      <button onClick={handleClick}>Click me </button>
    </div>
  );
};

export default memo(Home);
