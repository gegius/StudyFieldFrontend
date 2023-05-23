import { useStore } from 'effector-react';
import React, { JSX } from 'react';
import { Button, Form } from 'react-bootstrap';
import { loadDocumentTemplateApi } from './load-document-template.service';

export const LoadDocumentTemplate = (): JSX.Element => {
  const documentTemplate = useStore(loadDocumentTemplateApi.$documentTemplate);

  const handleFileInputChange = (files: FileList | null) => {
    if (!files) return;
    const file = files[0];
    if (!file) return;
    const fileFormData = new FormData();
    fileFormData.append('file', file, file.name);
    loadDocumentTemplateApi.loadDocument(fileFormData);
  };

  return (
    <div className={'container'}>
      <Form>
        <Form.Group
          style={{ display: 'flex', flexDirection: 'column' }}
          controlId={'formFileMultiple'}
        >
          <Button
            variant={'link'}
            onClick={() => document.getElementById('fileInput')!.click()}
          >
            {'Загрузите файл'}
            <input
              type={'file'}
              id={'fileInput'}
              accept={'.doc,.docx'}
              onChange={(event) => handleFileInputChange(event.target.files)}
              style={{ display: 'none' }}
            />
          </Button>
          <Form.Text className={'text-muted'}>
            {'Файл должен быть формата docx или doc.'}
          </Form.Text>
        </Form.Group>
        <Button
          disabled={!documentTemplate}
          onClick={loadDocumentTemplateApi.sendDocument}
          style={{ width: '100%', marginTop: '15px' }}
        >
          {'Отправить'}
        </Button>
      </Form>
    </div>

  );
};
