import { useStore } from 'effector-react';
import React, { JSX, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import './alert-notify.css';
import { alertApi } from '../../models/notify';

export const AlertNotify = (): JSX.Element => {
  const alertData = useStore(alertApi.$alertData);
  useEffect(() => {
    if (alertData) {
      const timer = setTimeout(() => {
        alertApi.resetAlert();
        clearTimeout(timer);
      }, 1500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [alertData]);

  if (alertData) {
    return (
      <Alert
        style={{
          position: 'absolute',
          padding: 10,
          top: '56px',
          width: '100%',
          animation: 'slide-down 1s ease',
          borderRadius: 0
        }}
        show={true}
        variant={alertData.type}
      >
        {alertData.message}
      </Alert>
    );
  } else {
    return <></>;
  }
};
