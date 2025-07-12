import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lyr: '',
  musicName: '',
  authorName: '',
  volume: 0
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setMusicInfo: (state, action) => {
      const { musicName, authorName } = action.payload;
      state.authorName = authorName;
      state.musicName = musicName;
    },
    setLyc: (state, action) => {
      state.lyr = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
      localStorage.setItem('volume', action.payload);
    }
  }
});

export const { setMusicInfo, setLyc, setVolume } = musicSlice.actions;

export default musicSlice.reducer;
