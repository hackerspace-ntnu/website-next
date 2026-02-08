import 'server-only';
import { EventEmitter } from 'node:events';

// This fixes hot reload issue in dev mode.
const globalEventEmitter = globalThis as unknown as {
  __eventEmitter?: EventEmitter;
};

// Akin to a singleton.
if (!globalEventEmitter.__eventEmitter) {
  globalEventEmitter.__eventEmitter = new EventEmitter();
}

export const eventEmitter = globalEventEmitter.__eventEmitter;
