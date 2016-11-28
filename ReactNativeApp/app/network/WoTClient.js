import BASE_URL from './host';

const header = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export default class WoTClient {

  constructor(controllerID) {
    this.controllerID = controllerID;
    this.url = BASE_URL + controllerID;
  }

  _createURL(...params) {
    params.unshift(this.url);
    return params.join('/') + '/';
  }

  _toJSON(responseBody) {
    return responseBody.json();
  }

  existsController() {
    return fetch(this._createURL(), {
      method: 'GET',
      headers: header
    })
    .then(this._toJSON);
  }

  getPlants() {
    return fetch(this._createURL('plant'), {
      method: 'GET'
    })
    .then(this._toJSON);
  }

  createPlant(name, pin, position, threshold) {
    return fetch(this._createURL('plant'), {
      method: 'POST',
      headers: header,
      body: JSON.stringify({
        name: name,
        pin: pin,
        position: position,
        moistureThreshold: threshold
      })
    })
    .then(this._toJSON);
  }

  getPlant(plantID) {
    return fetch(this._createURL('plant', plantID), {
      method: 'GET',
      headers: header
    })
    .then(this._toJSON);
  }

  deletePlant(plantID) {
    fetch(this._createURL('plant', plantID), {
      method: 'DELETE'
    });
  }

  getMoistureValues(plantID) {
    return fetch(this._createURL('plant', plantID, 'moisture'), {
      method: 'GET',
      headers: header
    })
    .then(this._toJSON);
  }

  waterPlant(plantID, amount) {
    fetch(this._createURL('plant', plantID, 'water', amount), {
      method: 'POST'
    });
  }
}
