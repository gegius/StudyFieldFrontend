import { LoadDocumentTemplate } from '../../domains/load-document-template';
import { PageWrapper } from '../../components';
import React, { JSX } from 'react';

export const LoadDocumentTemplatePage = (): JSX.Element => {
  return (
    <PageWrapper>
      <LoadDocumentTemplate/>
    </PageWrapper>
  );
};
