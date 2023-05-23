import { createStore } from 'effector';

export const $token = createStore<string | null>(null);
