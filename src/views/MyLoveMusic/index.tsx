import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}
const MyLoveMusic: FC<IProps> = () => {
  return <div>index</div>;
};

export default memo(MyLoveMusic);
