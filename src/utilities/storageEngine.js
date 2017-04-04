import { AsyncStorage } from 'react-native';

export default (key) => ({
    load() {
      console.log('loading...')
        return AsyncStorage.getItem(key)
            .then((jsonState) => JSON.parse(jsonState) || {});
    },

    //jsonState is the entire state
    //could split parts of state into separate files
    //logikk for inndeling av state i separate filer skal skje her
    save(state) {
      console.log('saving...')
        const jsonState = JSON.stringify(state);
        return AsyncStorage.setItem(key, jsonState, (error)=>{
          console.log('saved. Error: '+error)
        });
    },
    clear() {
      console.log('clearing store')
      AsyncStorage.clear((error)=>{
        console.log('clearing. Error:'+error)
      });
    }
});
