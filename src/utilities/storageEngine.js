import { AsyncStorage, Platform } from 'react-native';
import RNFS from 'react-native-fs'

const rootPath = RNFS.DocumentDirectoryPath + "/NVDB-storage";
const searchesPath = RNFS.DocumentDirectoryPath + "/NVDB-storage/searches";

export default (key) => ({

  initialize() {    // bruk RNFS.exists(filepath: string): Promise<boolean>
    //if os=== etc
    //handle folder allready existing
    console.log('initializing storage');
    RNFS.mkdir(rootPath)
    RNFS.mkdir(searchesPath)

    //create files etc.
  },
  load() {
    console.log('loading...')
    if(Platform.OS === "ios"){
      //create ios path
      return this.loadFiles(searchesPath)

    }
    else if (Platform.OS == "android"){

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

  saveSearch(roadSearch) {
    console.log('saving...')
    console.log(roadSearch.roadObjects.length)
    const jsonSearch = JSON.stringify(roadSearch);
    console.log(jsonSearch.length)
    if(Platform.OS === "ios"){
      let dataPath = searchesPath+"/"+roadSearch.key+".json";
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

    }

  },
  clear() {
    if(Platform.OS === "ios"){
      RNFS.unlink(searchesPath)

    }else if (Platform.OS === "android"){

    }

  },


  /* Methods based on AsyncStorage: */
  loadAS() {
    if(Platform.OS === "ios"){
      console.log("Operating System is ios")
      console.log('loading...')
      return AsyncStorage.getItem(key)
      .then((jsonState) => JSON.parse(jsonState) || {});
    }
    else if (Platform.OS == "android"){

    }

  },
  //jsonState is the entire state
  //could split parts of state into separate files
  //logikk for inndeling av state i separate filer skal skje her
  saveAS() {
    if(Platform.OS === "ios"){
      console.log('saving...')
      const jsonState = JSON.stringify(state);
      return AsyncStorage.setItem(key, jsonState, (error)=>{
        console.log('saved. Error: '+error)
      });
    }else if (Platform.OS === "android"){

    }

  },
  clearAS() {
    if(Platform.OS === "ios"){
      console.log('clearing store')
      AsyncStorage.clear((error)=>{
        console.log('clearing. Error:'+error)
      });
    }else if (Platform.OS === "android"){

    }

  }
});
