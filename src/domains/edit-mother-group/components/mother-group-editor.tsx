import { useField } from 'effector-forms';
import { FormEvent } from 'react';
import { useStore } from 'effector-react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import React, { JSX } from 'react';
import { ChildGroupEditor } from './child-group-editor';
import { GroupBaseField } from './group-base-field';
import { editMotherGroupApi } from '../edit-mother-group.service';

export const MotherGroupEditor = (): JSX.Element => {
  const { isTouched: isTouchedCode } = useField(editMotherGroupApi.$newMotherGroup.fields.groupCode);
  const { isTouched: isTouchedName } = useField(editMotherGroupApi.$newMotherGroup.fields.groupName);
  const isValid = useStore(editMotherGroupApi.$newMotherGroup.$isValid);
  const { submit } = editMotherGroupApi.$newMotherGroup;

  const isSubmitDisabled = [isTouchedCode, isTouchedName, isValid].every(Boolean);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submit();
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={onSubmit}>
            <GroupBaseField
              label={'Код группы'}
              placeholder={'Введите код группы'}
              field={editMotherGroupApi.$newMotherGroup.fields.groupCode}
            />
            <GroupBaseField
              label={'Название группы'}
              placeholder={'Введите название группы'}
              field={editMotherGroupApi.$newMotherGroup.fields.groupName}
            />
            <ChildGroupEditor/>
            <hr/>
            <Button
              disabled={!isSubmitDisabled}
              style={{ width: '100%' }}
              variant={'primary'}
              type={'submit'}
            >
              {'Создать группу'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

