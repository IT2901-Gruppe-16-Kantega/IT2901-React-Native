/**
* Utility file containing several different small utility functions
* used throught the application. Each function is implemented individually.
*/

import userDefaults from 'react-native-user-defaults'
import { Platform } from 'react-native';
import RNFS from 'react-native-fs'

const arURL = 'vegar.ar:';

function isAndroid() {
  return Platform.OS === 'android';
}

function isIOS() {
  return Platform.OS === 'ios';
}

function parseGeometry(string) {
  const wkt = string.slice(string.lastIndexOf("(") + 1, -1);
  const wktArray = wkt.split(",")

  objectCoords = [];
  for(var i = 0; i < wktArray.length; i++) {
    const parts = wktArray[i].trim().split(' ');
    const latitude = parseFloat(parts[0]);
    const longitude = parseFloat(parts[1]);

    objectCoords.push({latitude: latitude, longitude: longitude});
  }
  return objectCoords;
}

function randomColor(alpha) {
  var color = 'rgba(';
  for (var i = 0; i < 3; i++) {
    color += Math.random() * 255 + ', ';
  }
  if(alpha) { color += alpha }
  else { color += 1 }
  color += ')'

  return color;
}

function AR(platform, search, callback) {
  const data = JSON.stringify(search);

  if(isIOS()) {
    userDefaults.set("currentRoadSearch", data, "group.vegar", (err, data) => {
      if(!err) callback(arURL);
      else alert(err);
    });
  } else {
    // Save data.json
    let dataPath = RNFS.ExternalStorageDirectoryPath + "/Android/data/com.vegar/files/data.json";
    RNFS.writeFile(dataPath, JSON.stringify(search.key), "utf8")
    .then((success) => callback(arURL)).catch((err) => alert(err))
    // TODO Save roads.json here
    //let roadsPath = RNFS.ExternalDirectoryPath + "/roads.json";
  }
}

function getCurrentPosition(callback) {
  navigator.geolocation.getCurrentPosition((pos) => {
    callback(pos);
  }, (error) => alert(error.message), {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
  );
}

export {parseGeometry, randomColor, AR, isAndroid, isIOS, getCurrentPosition};
