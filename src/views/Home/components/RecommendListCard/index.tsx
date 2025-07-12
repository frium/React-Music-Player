import React, { memo, useEffect, useRef, useState } from 'react';
import type { FC, ReactNode } from 'react';
import ColorThief from 'colorthief';
import listenIconUrl from '@/assets/icons/listen.svg';
import './index.scss';

interface IProps {
  children?: ReactNode;
  data: {
    id: number;
    name: string;
    picUrl: string;
    playcount: number;
  };
}
const RecommendListCard: FC<IProps> = ({ data }) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [dominantColor, setDominantColor] = useState<
    [number, number, number] | null
  >(null);
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    img.crossOrigin = 'Anonymous'; // 必须跨域
    img.onload = () => {
      const colorThief = new ColorThief();
      const [r, g, b] = colorThief.getColor(img);
      setDominantColor([Math.abs(r), Math.abs(g), Math.abs(b)]);
    };
  }, [data.picUrl]);

  const bgColor = dominantColor ? `rgb(${dominantColor.join(',')})` : '#cc856e';
  const formatToWan = (num: number): string => {
    if (num < 10000) return num.toString();
    const result = (num / 10000).toFixed(1);
    return `${result}万`;
  };
  return (
    <div className="recommend-list-card" style={{ backgroundColor: bgColor }}>
      <img ref={imgRef} src={data.picUrl} alt="" crossOrigin="anonymous" />
      <span className="bottom-text">{data.name}</span>
      <div className="listen-num-box">
        <img src={listenIconUrl} alt="" />
        <span>{formatToWan(data.playcount)}</span>
      </div>
    </div>
  );
};

export default memo(RecommendListCard);
