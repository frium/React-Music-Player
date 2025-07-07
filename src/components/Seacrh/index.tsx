import React, { memo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import searchIconUrl from '@/assets/icons/search.svg';
import './index.scss';
import { searchMusicAPI } from '@/api/music';

interface IProps {
  children?: ReactNode;
}
const Seacrch: FC<IProps> = () => {
  const [inputValue, setInputValue] = useState('');
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    console.log('输入的内容:', inputValue); // 打印输入的内容
    //获取用户信息
    const res = (await searchMusicAPI(inputValue)) as any;
    console.log(res.result);
  };
  return (
    <div className="search">
      <img src={searchIconUrl} alt="搜索图标" />
      <input
        type="text"
        placeholder="搜索感兴趣的音乐~"
        className="search-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default memo(Seacrch);
