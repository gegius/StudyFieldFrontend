import { attach } from 'effector';
import { requestWithTokenFx } from './requests';

export const createGetRequestFx = (resource: string) =>
  attach({
    effect: requestWithTokenFx,
    mapParams: () => ({ data: undefined, method: 'GET', resource, file: undefined }
    )
  });

export const createPostRequestFx = (resource: string) =>
  attach({
    effect: requestWithTokenFx,
    mapParams: (data) => ({ data, method: 'POST', resource, file: undefined }
    )
  });

export const createFilePostRequestFx = (resource: string) =>
  attach({
    effect: requestWithTokenFx,
    mapParams: (file) => ({ data: undefined, method: 'POST', resource, file }
    )
  });

export const createGetRequestWithSearchFx = (resource: string) =>
  attach({
    effect: requestWithTokenFx,
    mapParams: (searchParams: string) => {
      return {
        data: undefined,
        method: 'GET',
        resource: `${resource}/${searchParams}`,
        file: undefined
      };
    }
  });
