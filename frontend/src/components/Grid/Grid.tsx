import React from 'react';
import gridStyles from './Grid.module.scss';

type GridProps = {
    children: React.ReactNode;
};

export default function Grid({ children }: GridProps) {
  return (
        <div className={gridStyles.main}>
            {children}
        </div>
  );
};