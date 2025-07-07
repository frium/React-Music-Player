import React, { memo, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import './index.scss';
import { getMusicListDetailAPI } from '@/api/music';

interface IProps {
  children?: ReactNode;
  data: {
    id: string;
    name: string;
    updateFrequency: string;
  };
}
interface MusicDetail {
  name: string;
  ar: Array<{ name: string }>;
  tns: string;
  al: { picUrl: string };
}

const TopList: FC<IProps> = ({ data }) => {
  const [musicDetailList, setMusicDetailList] = useState<MusicDetail[]>([]);
  useEffect(() => {
    const getMusicListDetail = async () => {
      const res = (await getMusicListDetailAPI(data.id)) as any;
      setMusicDetailList(res.playlist.tracks);
    };
    getMusicListDetail();
  }, []);
  return (
    <div className="top-list">
      <div className="top">
        <span className="title">{data.name}</span>
        <span className="state">{data.updateFrequency}</span>
      </div>
      <div className="bottom">
        <div className="bottom-left">
          <img className="img1" src={musicDetailList[0]?.al.picUrl} alt="" />
          <img className="img2" src={musicDetailList[1]?.al.picUrl} alt="" />
          <img className="img3" src={musicDetailList[2]?.al.picUrl} alt="" />
        </div>
        <ul className="bottom-right">
          <li>
            <span>{'1 ' + musicDetailList[0]?.name}</span>
            {musicDetailList[0]?.tns && (
              <span style={{ color: '#c3b3ac' }}>
                {' - (' + musicDetailList[0].tns + ')'}
              </span>
            )}
            <span style={{ color: '#c3b3ac' }}>
              {' - ' + musicDetailList[0]?.ar[0].name}
            </span>
          </li>
          <li>
            <span>{'2 ' + musicDetailList[1]?.name}</span>
            {musicDetailList[1]?.tns && (
              <span style={{ color: '#c3b3ac' }}>
                {' - (' + musicDetailList[1].tns + ')'}
              </span>
            )}
            <span style={{ color: '#c3b3ac' }}>
              {' - ' + musicDetailList[1]?.ar[0].name}
            </span>
          </li>
          <li>
            <span>{'3 ' + musicDetailList[2]?.name}</span>
            {musicDetailList[2]?.tns && (
              <span style={{ color: '#c3b3ac' }}>
                {' - (' + musicDetailList[2].tns + ')'}
              </span>
            )}
            <span style={{ color: '#c3b3ac' }}>
              {' - ' + musicDetailList[2]?.ar[0].name}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default memo(TopList);
