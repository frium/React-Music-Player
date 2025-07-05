import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import Seacrh from '../Seacrh';
import PersonalInfo from '../PersonalInfo';
import settingIconUrl from '@/assets/icons/setting.svg';
import './index.scss';

interface IProps {
  children?: ReactNode;
}
const TopNav: FC<IProps> = () => {
  return (
    <div className="top-nav">
      <Seacrh />
      <div className="top-nav-left">
        <PersonalInfo />
        <img className="setting" src={settingIconUrl} alt="" />
      </div>
    </div>
  );
};

export default memo(TopNav);
