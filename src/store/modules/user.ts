import { createSlice } from '@reduxjs/toolkit';

// 从localStorage初始化状态
const initialState = {
  token: localStorage.getItem('cookie') || null,
  userId: '',
  avatar: '',
  username: '',
  createTime: '',
  gender: '',
  eventsNum: 0,
  followsNum: 0,
  followedsNum: 0
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 用户信息设置器
    setUserInfo: (state, action) => {
      const {
        token,
        avatar,
        username,
        createTime,
        gender,
        userId,
        eventsNum,
        followsNum,
        followedsNum
      } = action.payload;
      if (token !== undefined) {
        state.token = token;
        localStorage.setItem('cookie', token);
      }
      if (avatar !== undefined) state.avatar = avatar;
      if (userId !== undefined) state.userId = userId;
      if (username !== undefined) state.username = username;
      if (createTime !== undefined) state.createTime = createTime;
      if (gender !== undefined) state.gender = gender;
      if (eventsNum !== undefined) state.eventsNum = eventsNum;
      if (followsNum !== undefined) state.followsNum = followsNum;
      if (followedsNum !== undefined) state.followedsNum = followedsNum;
    },

    // 清除用户信息
    clearUserInfo: (state) => {
      state.token = null;
      state.avatar = '';
      state.userId = '';
      state.username = '';
      state.createTime = '';
      state.gender = '';
      state.eventsNum = 0;
      state.followsNum = 0;
      state.followedsNum = 0;
      localStorage.removeItem('cookie');
    },

    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('cookie', action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem('cookie');
    }
  }
});

export const { setUserInfo, clearUserInfo, setToken, clearToken } =
  userSlice.actions;

export default userSlice.reducer;
