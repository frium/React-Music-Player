import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import './index.scss';
interface IProps {
  children?: ReactNode;
  data: {
    id: string;
    name: string;
    ar: Array<{ name: string }>;
    al: { picUrl: string };
  };
}
const RecommendSong: FC<IProps> = ({ data }) => {
  return (
    <div className="recommend-song">
      <img className="song-img" src={data.al.picUrl} alt="" />
      <div>
        <h4 className="song-name">{data.name}</h4>
        <span className="ar-name">{data.ar[0].name}</span>
      </div>
    </div>
  );
};

export default memo(RecommendSong);
