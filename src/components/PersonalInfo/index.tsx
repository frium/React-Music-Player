import React, { memo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { Popover } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import offIconUrl from '@/assets/icons/off.svg';
import createTimeIconUrl from '@/assets/icons/createTime.svg';
import genderIconUrl from '@/assets/icons/gender.svg';
import { clearToken, setToken, setUserInfo } from '@/store/modules/user';
import './index.scss';
import {
  getUserEventAPI,
  getUserFollowedsAPI,
  getUserFollowsAPI,
  getUserInfoAPI
} from '@/api/user';

interface IProps {
  children?: ReactNode;
}

const PersonalInfo: FC<IProps> = () => {
  // 从 Redux store 获取 token
  const username = useAppSelector((state) => state.user.username);
  const avatar = useAppSelector((state) => state.user.avatar);
  const createTime = useAppSelector((state) => state.user.createTime);
  const gender = useAppSelector((state) => state.user.gender);
  const eventsNum = useAppSelector((state) => state.user.eventsNum);
  const followsNum = useAppSelector((state) => state.user.followsNum);
  const followedsNum = useAppSelector((state) => state.user.followedsNum);
  const [inputValue, setInputValue] = useState('');
  const [popoverOpen, setPopoverOpen] = useState(false);
  const dispatch = useAppDispatch();
  // 登录后的弹出内容
  const loggedInContent = (
    <div className="content">
      <div className="top">
        <div className="num-box">
          <span className="num">{eventsNum}</span>
          <span className="des">动态</span>
        </div>
        <div className="num-box">
          <span className="num">{followsNum}</span>
          <span className="des">关注</span>
        </div>
        <div className="num-box">
          <span className="num">{followedsNum}</span>
          <span className="des">粉丝</span>
        </div>
      </div>
      <hr />
      <div className="info-out-box">
        <img src={genderIconUrl} alt="" />
        <span>性别</span>
        <span className="right-span">{gender}</span>
      </div>
      <div className="info-out-box">
        <img src={createTimeIconUrl} alt="" />
        <span>创建时间</span>
        <span className="right-span">{createTime}</span>
      </div>
      <button className="info-out-box">
        <img src={offIconUrl} alt="" />
        退出登录
      </button>
    </div>
  );

  const formatDate = (timestamp: number): string => {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    })
      .format(new Date(timestamp))
      .replace(/\//g, '.');
  };
  interface FollowData {
    follow: Array<Object>;
  }

  interface FollowedData {
    size: number;
  }

  interface EventData {
    size: number;
  }
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    setInputValue('');
    setPopoverOpen(false);
    setToken(inputValue);
    //获取用户信息
    const res = (await getUserInfoAPI()) as any;
    console.log(res.profile);
    if (!res.profile) {
      console.log('用户cookie输入错误');
      clearToken();
      return;
    }
    const userId = res.profile;
    //获取粉丝 关注 动态 数量
    const [followsRes, followedsRes, eventsRes] = await Promise.all([
      getUserFollowsAPI(userId),
      getUserFollowedsAPI(userId),
      getUserEventAPI(userId)
    ]);

    const followsNum: FollowData = followsRes as any;
    const followedsNum: FollowedData = followedsRes as any;
    const eventsNum: EventData = eventsRes as any;
    dispatch(
      setUserInfo({
        token: inputValue,
        username: res.profile.usename,
        createTime: formatDate(res.profile.createTime),
        avatar: res.profile.avatarUrl,
        gender: res.profile.gender === 1 ? '男' : '女',
        followsNum: followsNum.follow.length,
        followedsNum: followedsNum.size,
        eventsNum: eventsNum.size
      })
    );
  };
  // 未登录时的弹出内容
  const loginPromptContent = (
    <div className="content">
      <input
        className="login-cookie-input"
        type="text"
        placeholder="请输入用户cookie~"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );

  return (
    <div>
      {username ? (
        <Popover content={loggedInContent} trigger="click" color="#2d2d38">
          <div className="user-info">
            <img className="avatar" src={avatar} alt="" />
            <span>{username}</span>
          </div>
        </Popover>
      ) : (
        <Popover
          content={loginPromptContent}
          trigger="click"
          color="#2d2d38"
          open={popoverOpen}
          onOpenChange={(open) => setPopoverOpen(open)}
        >
          <div className="login-text">
            <span>请登录</span>
          </div>
        </Popover>
      )}
    </div>
  );
};

export default memo(PersonalInfo);
