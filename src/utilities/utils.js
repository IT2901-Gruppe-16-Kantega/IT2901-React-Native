import userDefaults from 'react-native-user-defaults'
import { Platform } from 'react-native';

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

  if(platform === "ios") {
    userDefaults.set("currentRoadSearch", data, "group.vegar", (err, data) => {
      if(!err) callback(arURL);
      else alert(err);
    });
  } else if (platform === "android") {
    // Save data.json
    let dataPath = RNFS.ExternalStorageDirectoryPath + "/Android/data/com.vegar/files/data.json";
    RNFS.writeFile(dataPath, data, "utf8")
    .then((success) => callback(arURL)).catch((err) => alert(err))
    // TODO Save roads.json here
    //let roadsPath = RNFS.ExternalDirectoryPath + "/roads.json";
  } else {
    console.log("Not ios or android")
  }
}

export {parseGeometry, randomColor, AR, isAndroid, isIOS};
