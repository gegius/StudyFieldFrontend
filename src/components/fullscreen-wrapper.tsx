import React, { JSX } from 'react';

type TFullscreenWrapper = {
  children: JSX.Element
}

export const FullscreenWrapper = ({ children }: TFullscreenWrapper) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      {children}
    </div>
  );
};
