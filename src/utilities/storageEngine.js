import { AsyncStorage, Platform } from 'react-native';
import RNFS from 'react-native-fs'

// RNFS.ExternalStorageDirectoryPath + "/Android/data/com.nvdb/files/data.json";


const rootPathIOS = RNFS.DocumentDirectoryPath + "/NVDB-storage";
const searchesPathIOS = RNFS.DocumentDirectoryPath + "/NVDB-storage/searches";

const rootPathAndroid = RNFS.ExternalStorageDirectoryPath + "/Android/data/com.nvdb/NVDB-storage";
const searchesPathAndroid = RNFS.ExternalStorageDirectoryPath + "/Android/data/com.nvdb/NVDB-storage/searches";

export default (key) => ({

  initialize() {
    console.log('initializing storage');
    console.log(rootPathIOS)
    if (Platform.OS === "ios") {
      RNFS.mkdir(rootPathIOS)
      RNFS.mkdir(searchesPathIOS)
    }
    else if (Platform.OS === "android") {
      RNFS.mkdir(rootPathAndroid)
      RNFS.mkdir(searchesPathAndroid)
    }
  },
  load(progress) {
    console.log('loading...')
    if(Platform.OS === "ios") {
      return this.loadFiles(searchesPathIOS, progress)
    }
    else if (Platform.OS == "android") {
      return this.loadFiles(searchesPathAndroid, progress)
    }
  },
  loadFiles(path, progress) {
    console.log('loadFiles')
    var storedSearches = []
    var successLength = 0;
    RNFS.readdir(path).then((response)=>{
      for (var i = 0; i < response.length; i++) {
        var currentPath = path + '/' + response[i]
        RNFS.readFile(currentPath)
        .then((success) => {
          successLength += 1;
          storedSearches.push(JSON.parse(success) || {});
          progress(successLength / response.length)
        })
        .catch((err) => {
          console.error("An error occurred when trying to load file. Path: " + currentPath, err)
        })
      }
    })
    return storedSearches;
  },

  //clean, move body into own function
  saveSearch(roadSearch) {
    console.log('saving...')
    const jsonSearch = JSON.stringify(roadSearch);
    if(Platform.OS === "ios"){
      let dataPath = searchesPathIOS+"/"+roadSearch.key+".json";
      return this.writeFile(dataPath, jsonSearch)
    }
    else if (Platform.OS === "android"){
      let dataPath = searchesPathAndroid+"/"+roadSearch.key+".json";
      console.log(dataPath)
      return this.writeFile(dataPath, jsonSearch)
    }
  },

  writeFile(dataPath, jsonSearch) {
    return RNFS.writeFile(dataPath, jsonSearch)
    .then((success) => {
      console.log("data saved successfully")
    })
    .catch((err) => {
      console.error("An error occurred when saving data. Path: "+dataPath, err)
    })
  },

  clear() {
    if(Platform.OS === "ios"){
      RNFS.unlink(searchesPathIOS)
    }else if (Platform.OS === "android"){
      RNFS.unlink(searchesPathAndroid)
    }
    this.initialize()
  },
  //TODO
  deleteFile(search) {
    console.log(search)

  }
});
