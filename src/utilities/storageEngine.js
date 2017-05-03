import { AsyncStorage, Platform } from 'react-native';
import RNFS from 'react-native-fs';
import { isAndroid } from './utils';

// RNFS.ExternalStorageDirectoryPath + "/Android/data/com.vegar/files/data.json";

const pathType = {
  ROOT: '/',
  SEARCHES: '/searches',
}

const rootPathIOS = RNFS.DocumentDirectoryPath + "/NVDB-storage";
const rootPathAndroid = RNFS.ExternalStorageDirectoryPath + "/Android/data/com.vegar/files";

export default (key) => ({

  initialize() {
    console.log('initializing storage');
    RNFS.mkdir(this.rootPath());
    RNFS.mkdir(this.searchesPath());
  },

  load(progress) {
    console.log('loading...')
    return this.loadFiles(this.searchesPath(), progress);
  },

  loadFiles(path, progress) {
    var storedSearches = []
    var successLength = 0;
    RNFS.readdir(path).then(response => {
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
	  console.log("====================================================")
	  console.log("Loading report " + reportKey);
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
			  }).catch((err) => {
				  console.log("Failed to save report from VegAR(AR)", err);
			  })
		  }).catch((err) => {
			  console.log("Failed to read search data with given key: " + reportKey, err);
		  })
	  }).catch((err) => {
		  console.log("Failed to load report from unity", err)
	  })
	  console.log("====================================================")
  },

  //clean, move body into own function
  saveSearch(roadSearch) {
    console.log('saving...')
    return this.writeFile(this.getPath(pathType.SEARCHES, roadSearch.key), JSON.stringify(roadSearch))
  },

  writeFile(dataPath, jsonSearch) {
    return RNFS.writeFile(dataPath, jsonSearch)
    .then((success) => {
      console.log("data saved successfully")
    })
    .catch((err) => {
      console.error("An error occurred when saving data. Path: " + dataPath, err)
    })
  },

  clear() {
    RNFS.unlink(this.searchesPath());
    this.initialize()
  },

  deleteFile(search) {
    RNFS.unlink(this.getPath(pathType.SEARCHES, search.key))
    .then(() => console.log("file deleted"))
    .catch((err) => console.error("An error occured when deleting: " + err))
  },

  rootPath() {
    return isAndroid() ? rootPathAndroid : rootPathIOS;
  },

  searchesPath() {
    return this.rootPath() + '/searches';
  },

  getPath(type, key) {
    var path = type === pathType.ROOT ? this.rootPath() : this.searchesPath();
    return path + '/' + key + '.json';
  },
});
