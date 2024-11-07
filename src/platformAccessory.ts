import { Service, PlatformAccessory, CharacteristicValue } from 'homebridge';
import { ExampleHomebridgePlatform } from './platform';
import axios from 'axios';

export class ExamplePlatformAccessory {
  private service: Service;

  constructor(
    private readonly platform: ExampleHomebridgePlatform,
    private readonly accessory: PlatformAccessory,
  ) {
    this.service = this.accessory.getService(this.platform.Service.Switch) || this.accessory.addService(this.platform.Service.Switch);

    this.service.setCharacteristic(this.platform.Characteristic.Name, accessory.context.device.exampleDisplayName);

    this.service.getCharacteristic(this.platform.Characteristic.On)
      .onSet(this.setOn.bind(this));
  }

  async setOn(value: CharacteristicValue) {
    const isOn = value as boolean;
    const url = `http://${this.accessory.context.device.ipAddress}/led/${isOn ? 'on' : 'off'}`;
    try {
      await axios.get(url);
      this.platform.log.debug(`Set LED to ${isOn ? 'ON' : 'OFF'}`);
    } catch (error) {
      this.platform.log.error('Error setting LED state:', error);
    }
  }
}
