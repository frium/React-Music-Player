import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss'
import homeIconUrl from '@/assets/icons/home.svg';
import timeIconUrl from '@/assets/icons/time.svg';
import loveIconUrl from '@/assets/icons/love.svg';
import radiostationIconUrl from '@/assets/icons/radiostation.svg';
import musicIconUrl from '@/assets/icons/music.svg';
interface IProps {
  children?: ReactNode;
}
const LeftNav: FC<IProps> = () => {
  return (
    <div className="left-nav">
      <span className='title'>Music-Palyer</span>
      <NavLink className="link" to="/home">
      <img src={homeIconUrl} alt="" />
      <span>推荐</span>
      </NavLink>
      <NavLink className="link" to="/choiceness">
      <img src={musicIconUrl} alt="" />
      <span>精选</span>
      </NavLink>
      <NavLink className="link" to="/roam">
      <img src={radiostationIconUrl} alt="" />
      <span>漫游</span>
      </NavLink>
      <hr />
      <NavLink className="link" to="/loveMusic">
      <img src={loveIconUrl} alt="" />
      <span>喜欢的音乐</span>
      </NavLink>
      <NavLink className="link" to="/recentPlay">
      <img src={timeIconUrl} alt="" />
      <span>最近播放</span>
      </NavLink>
    </div>
  );
};

export default memo(LeftNav);
