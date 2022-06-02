import { browser } from '$app/env';

const fakeStorage: Storage = {
  length: 0,
  key: () => null,
  clear: () => void 0,
  getItem: () => null,
  removeItem: () => void 0,
  setItem: () => void 0
};

const instance: Storage = browser ? window.localStorage : fakeStorage;

export { instance as LocalStorage };
