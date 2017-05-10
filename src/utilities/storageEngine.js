import { AsyncStorage, Platform } from 'react-native';
import RNFS from 'react-native-fs';
import { isAndroid } from './utils';

// RNFS.ExternalStorageDirectoryPath + "/Android/data/com.vegar/files/data.json";

const pathType = {
	ROOT: '/',
	SEARCHES: '/searches/',
	ROADS: '/roads/',
}

const rootPathIOS = RNFS.DocumentDirectoryPath + "/NVDB-storage";
const rootPathAndroid = RNFS.ExternalStorageDirectoryPath + "/Android/data/com.vegar/files";

export default (key) => ({

	initialize() {
		console.log('initializing storage');
		RNFS.mkdir(this.rootPath());
		RNFS.mkdir(this.searchesPath());
		RNFS.mkdir(this.roadsPath());
	},

	getSettings(callback) {
		const defaultSettings = {darkMode: false};
		const settingsPath = this.rootPath() + '/settings.json';
		RNFS.readFile(settingsPath).then(value => {
			console.log("Settings loaded")
			callback(JSON.parse(value), false);
		}).catch(err => {
			console.log("Defaults set");
			this.writeFile(settingsPath, JSON.stringify(defaultSettings));
			callback(defaultSettings, true);
		})
	},

	clearSettings() {
		RNFS.unlink(this.rootPath() + '/settings.json').then(success => {
			this.setAndGetSettings();
		}).catch(err => console.log(err));
	},

	load(progress) {
		console.log('loading...')
		return this.loadFiles(this.searchesPath(), progress);
	},

	loadFiles(path, progress) {
		var storedSearches = []
		var successLength = 0;
		progress(0);

		RNFS.readdir(path).then(response => {
			if(response.length == 0) progress(1);

			for (var i = 0; i < response.length; i++) {
				var currentPath = path + response[i]
				RNFS.readFile(currentPath)
				.then((success) => {
					successLength += 1;
					console.log(JSON.parse(success));
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

	loadRoads(progress) {
		return this.loadFiles(this.roadsPath(), progress);
	},

	loadRoadsFile(id, callback) {
		RNFS.readFile(this.roadsPath() + id + ".json").then(response => {
			callback({success: true, value: JSON.parse(response)});
		}).catch((err) => {
			callback({success: false, value: err});
		})
	},

	// Loads the report data from VegAR(AR) and adds all of the roadObjects to the report object with the given key;
	loadReport(reportKey) {
		console.log("Loading report " + reportKey);
		return new Promise((resolve, reject) => {
			RNFS.readFile(rootPathAndroid + "/report.json")
			.then((reportSuccess) => {
				var reportData = JSON.parse(reportSuccess);
				RNFS.readFile(searchesPath() + reportKey + ".json")
				.then((dataSuccess) => {
					var searchData = JSON.parse(dataSuccess);
					for (var i = 0; i < reportData.reportObjects.length; i++) {
						console.log(reportData.reportObjects[i]);
						searchData.report.push(reportData.reportObjects[i] || {});
					}
					this.writeFile(searchesPath() + reportKey + ".json", JSON.stringify(searchData))
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

	saveRoads(id, roads) {
		return this.writeFile(this.getPath(pathType.ROADS, id), JSON.stringify(roads));
	},

	//clean, move body into own function
	saveSearch(roadSearch) {
		console.log('saving...')
		return this.writeFile(this.getPath(pathType.SEARCHES, roadSearch.key), JSON.stringify(roadSearch));
	},

	writeFile(dataPath, json) {
		return RNFS.writeFile(dataPath, json)
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
		return this.rootPath() + pathType.SEARCHES;
	},

	roadsPath() {
		return this.rootPath() + pathType.ROADS;
	},

	getPath(type, key) {
		return this.rootPath() + type + key + '.json';
	},
});
