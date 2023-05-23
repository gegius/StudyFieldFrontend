import { createEvent, forward } from 'effector';
import { downloadUserTemplateTransportFx } from './download-user-template.transport';

const onDownloadUserTemplate = createEvent<string>();

forward({
  from: onDownloadUserTemplate,
  to: downloadUserTemplateTransportFx
});

export const downloadUsersTemplateApi = {
  downloadUserTemplate: (userId: string) => {
    onDownloadUserTemplate(userId);
  }
};
