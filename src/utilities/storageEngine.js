import { AsyncStorage } from 'react-native';

export default (key) => ({
    load() {
      console.log('loading...')
        return AsyncStorage.getItem(key)
            .then((jsonState) => JSON.parse(jsonState) || {});
    },

    save(state) {
      console.log('saving...')
        const jsonState = JSON.stringify(state);
        return AsyncStorage.setItem(key, jsonState);
    },
    clear() {
      console.log('clearing store')
      AsyncStorage.clear((error)=>{
        console.log('clearing. Error:'+error)
      });
    }
});
