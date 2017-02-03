export default class APIWrapper {
  static baseURL = 'https://www.vegvesen.no/nvdb/api/v2/';

  static constructFetchRequest(id, latitude, longitude, area) {
    const latFloat = parseFloat(latitude)
    const longFloat = parseFloat(longitude)
    const latMin = latFloat - 0.001 * area;
    const latMax = latFloat + 0.001 * area;
    const longMin = longFloat - 0.001 * area;
    const longMax = longFloat + 0.001 * area;

    return request = this.baseURL + 'vegobjekter/' + id + '.json?kartutsnitt=' + longMin + ',' + latMin + ',' + longMax + ',' + latMax + '&srid=4326&inkluder=egenskaper,geometri';
  }

  static async fetchData(id, latitude, longitude, area) {
    const request = this.constructFetchRequest(id, latitude, longitude, area);

    try {
      const response = await fetch(request);
      const data = await response.json();
      return data;
    } catch(error) {
      // handle error
    }
  }

  static async fetchManhole(latitude, longitude, area, callback) {
    this.fetchObjects(83, 1141, latitude, longitude, area, callback, function(signs) {
      callback(signs);
    });
  }

  static async fetchSigns(latitude, longitude, area, callback) {
    this.fetchObjects(96, 5530, latitude, longitude, area, callback, function(signs) {
      callback(signs);
    });
  }

  static async fetchObjects(id, subid, latitude, longitude, area, callback) {
    var objects = [];

    this.fetchData(id, latitude, longitude, area).then(function(data) {
      for(var i = 0; i < data.objekter.length; i++) {
        const object = data.objekter[i];
        const coordinates = this.geometryToCoordinates(object.geometri.wkt);

        var title = 'Ukjent';
        for(var j = 0; j < object.egenskaper.length; j++) {
          const egenskap = object.egenskaper[j];
          if(egenskap.id === subid) {
            title = egenskap.verdi;
          }
        }
        objects.push({id: object.id, coordinates: coordinates, title: title});
      }
      callback(objects);

    }.bind(this));
  }

  static geometryToCoordinates(geometry) {
    const geometryString = geometry.split('(')[1].slice(0, -1);
    const geometryParts = geometryString.split(' ');
    const objLat = parseFloat(geometryParts[0]);
    const objLong = parseFloat(geometryParts[1]);
    return {latitude: objLat, longitude: objLong};
  }
}
