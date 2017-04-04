import { AsyncStorage, Platform } from 'react-native';
import RNFS from 'react-native-fs'

// RNFS.ExternalStorageDirectoryPath + "/Android/data/com.nvdb/files/data.json";


const rootPathIOS = RNFS.DocumentDirectoryPath + "/NVDB-storage";
const searchesPathIOS = RNFS.DocumentDirectoryPath + "/NVDB-storage/searches";

const rootPathAndroid = RNFS.ExternalStorageDirectoryPath + "/Android/data/com.nvdb/NVDB-storage";
const searchesPathAndroid = RNFS.ExternalStorageDirectoryPath + "/Android/data/com.nvdb//NVDB-storage/searches";

export default (key) => ({

  initialize() {
    console.log('initializing storage');
    if (Platform.OS === "ios") {
      RNFS.mkdir(rootPathIOS)
      RNFS.mkdir(searchesPathIOS)
    }
    else if (Platform.OS === "android") {
      RNFS.mkdir(rootPathAndroid)
      RNFS.mkdir(searchesPathAndroid)
    }
  },
  load() {
    console.log('loading...')
    if(Platform.OS === "ios"){
      return this.loadFiles(searchesPathIOS)
    }
    else if (Platform.OS == "android"){
      return this.loadFiles(searchesPathAndroid)
    }
  },
  loadFiles(path) {
    console.log('loadFiles')
    var storedSearches = []
    RNFS.readdir(path).then((response)=>{
      for (var i = 0; i < response.length; i++){
        var currentPath = path+'/'+response[i]
        RNFS.readFile(currentPath)
        .then((success) => {
          storedSearches.push(JSON.parse(success) || {})
        })
        .catch((err) => {
          console.error("An error occurred when trying to load file. Path: "+currentPath, err)
        })
      }
    })
    return storedSearches;
  },

  //clean, move body into own function
  saveSearch(roadSearch) {
    console.log('saving...')
    console.log(roadSearch.roadObjects.length)
    const jsonSearch = JSON.stringify(roadSearch);
    console.log(jsonSearch.length)
    if(Platform.OS === "ios"){
      let dataPath = searchesPathIOS+"/"+roadSearch.key+".json";
      console.log(dataPath)
      return RNFS.writeFile(dataPath, jsonSearch)
      .then((success) => {
        console.log("data saved successfully")
      })
      .catch((err) => {
        console.error("An error occurred when saving data.json", err)
      })
    }
    else if (Platform.OS === "android"){
      let dataPath = searchesPathAndroid+"/"+roadSearch.key+".json";
      console.log(dataPath)
      return RNFS.writeFile(dataPath, jsonSearch)
      .then((success) => {
        console.log("data saved successfully")
      })
      .catch((err) => {
        console.error("An error occurred when saving data.json", err)
      })
    }

  },
  clear() {
    if(Platform.OS === "ios"){
      RNFS.unlink(searchesPath)

    }else if (Platform.OS === "android"){

    }

  },

});
