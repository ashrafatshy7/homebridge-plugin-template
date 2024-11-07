import type { API } from 'homebridge';

import { ExampleHomebridgePlatform } from './platform.js';
import { PLATFORM_NAME } from './settings.js';

/**
 * This method registers the platform with Homebridge
 */

console.log("ESP32LED Plugin Loaded"); // Debug message


export default (api: API) => {
  api.registerPlatform(PLATFORM_NAME, ExampleHomebridgePlatform);
};
