import '@testing-library/jest-dom';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
  removeItem: jest.fn()
};
global.localStorage = localStorageMock;

// Mock CustomEvent
global.CustomEvent = class extends Event {
  detail: any;
  
  constructor(type: string, options?: CustomEventInit) {
    super(type);
    this.detail = options?.detail;
  }

  initCustomEvent(type: string, bubbles?: boolean, cancelable?: boolean, detail?: any): void {
    this.detail = detail;
  }
};
