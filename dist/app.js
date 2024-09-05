import app from './src/app.js'; // Import the default export
import { EventEmitter } from 'events';
EventEmitter.defaultMaxListeners = 15; // Set the maximum number of listeners