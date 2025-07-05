import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { Popover } from 'antd';
import './index.scss';
import offIconUrl from '@/assets/icons/off.svg';
import vipIconUrl from '@/assets/icons/vip.svg';
interface IProps {
  children?: ReactNode;
}

const content = (
  <div className="content">
    <div className="top">
      <div className="num-box">
        <span className="num">2</span>
        <span className="des">动态</span>
      </div>
      <div className="num-box">
        <span className="num">2</span>
        <span className="des">关注</span>
      </div>
      <div className="num-box">
        <span className="num">2</span>
        <span className="des">粉丝</span>
      </div>
    </div>
    <hr />
    <button>
      <img src={vipIconUrl} alt="" /> 我的会员等级
    </button>
    <button>
      <img src={offIconUrl} alt="" />
      退出登录
    </button>
  </div>
);
const PersonalInfo: FC<IProps> = () => {
  return (
    <div>
      <Popover content={content} trigger="click" color="#2d2d38">
        <div className="user-info">
          <img
            className="avatar"
            src="https://static.frium.top/blog/%E4%B8%89%E6%9C%88%E4%B8%83.jpg"
            alt=""
          />
          <span>username</span>
        </div>
      </Popover>
    </div>
  );
};

export default memo(PersonalInfo);
