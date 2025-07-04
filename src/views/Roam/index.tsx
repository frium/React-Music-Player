import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}
const Roam: FC<IProps> = () => {
  return <div>index</div>;
};

export default memo(Roam);
