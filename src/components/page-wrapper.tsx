import React, { JSX } from 'react';

type TPageWrapper = {
  children: Array<JSX.Element | false> | JSX.Element
}

export const PageWrapper = ({ children }: TPageWrapper): JSX.Element => {
  return (
    <div style={{ height: 'calc(100vh - 56px)', display: 'flex', padding: '25px' }}>
      <div
        style={{
          width: 'min-content',
          height: 'min-content',
          backgroundColor: 'whitesmoke',
          minWidth: '300px',
          margin: 'auto',
          display: 'flex',
          borderRadius: '10px',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            display: 'flex',
            padding: '40px',
            flexDirection: 'column',
            alignItems: 'center',
            width: 'max-content'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
