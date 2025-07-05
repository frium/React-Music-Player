import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import searchIconUrl from '@/assets/icons/search.svg';
import './index.scss';
interface IProps {
  children?: ReactNode;
}
const Seacrch: FC<IProps> = () => {
  return (
    <div className="search">
      <img src={searchIconUrl} alt="搜索图标" />
      <input
        type="text"
        placeholder="搜索感兴趣的音乐~"
        className="search-input"
      />
    </div>
  );
};

export default memo(Seacrch);
