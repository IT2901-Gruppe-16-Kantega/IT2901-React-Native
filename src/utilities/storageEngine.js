import { AsyncStorage, Platform } from 'react-native';
import RNFS from 'react-native-fs'

// RNFS.ExternalStorageDirectoryPath + "/Android/data/com.vegar/files/data.json";


const rootPathIOS = RNFS.DocumentDirectoryPath + "/NVDB-storage";
const searchesPathIOS = RNFS.DocumentDirectoryPath + "/NVDB-storage/searches";


const rootPathAndroid = RNFS.ExternalStorageDirectoryPath + "/Android/data/com.vegar/files";
const searchesPathAndroid = RNFS.ExternalStorageDirectoryPath + "/Android/data/com.vegar/files/searches";


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
          progress(successLength / response.length);
        })
        .catch((err) => {
          console.error("An error occurred when trying to load file. Path: " + currentPath, err)
        })
      }
    })
    return storedSearches;
  },
  // Loads the report data from VegAR(AR) and adds all of the roadObjects to the report object with the given key;
  // no console.error in case the id is wrong;
  // TODO Currently only saves the report, but does not reload the storage or affect the storage in memory
  loadReport(reportKey) {
	  console.log("Loading report " + reportKey);
	  return new Promise((resolve, reject) => {
		  RNFS.readFile(rootPathAndroid + "/report.json")
		  .then((reportSuccess) => {
			  var reportData = JSON.parse(reportSuccess);
			  RNFS.readFile(searchesPathAndroid + "/" + reportKey + ".json")
			  .then((dataSuccess) => {
				  var searchData = JSON.parse(dataSuccess);
				  for (var i = 0; i < reportData.reportObjects.length; i++) {
					  console.log(reportData.reportObjects[i]);
					  searchData.report.push(reportData.reportObjects[i] || {});
				  }
				  this.writeFile(searchesPathAndroid + "/" + reportKey + ".json", JSON.stringify(searchData))
				  .then((success) => {
					  console.log("Report loaded from VegAR(AR) and saved successfully");
					  resolve(reportData);
				  }).catch((err) => {
					  console.log("Failed to save report from VegAR(AR)", err);
					  reject(err);
				  })
			  }).catch((err) => {
				  console.log("Failed to read search data with given key: " + reportKey, err);
				  reject(err);
			  })
		  }).catch((err) => {
			  console.log("Failed to load report from unity", err);
			  reject(err);
		  })
	  });
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
  deleteFile(search) {
    if(Platform.OS === "ios"){
      RNFS.unlink(searchesPathIOS+'/'+search.key+'.json')
      .then(() => console.log("file deleted"))
      .catch((err) => console.error("An error occured when deleting: "+err))
    }else if (Platform.OS === "android"){
      RNFS.unlink(searchesPathAndroid+'/'+search.key+'.json')
      .then(() => console.log("file deleted"))
      .catch((err) => console.error("An error occured when deleting: "+err))
    }
  }
});
