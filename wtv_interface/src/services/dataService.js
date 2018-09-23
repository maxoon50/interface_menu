import {STORE} from "../states/store";

const API_ADRESS = "http://localhost:8005/";
const USERDEFAULT = "Antoine la guez";
class RestResource {

    
    /**
    * Get the users form the API,
    * If the promise is resolved, store the users in the STORE object
    * @returns boolean
     */
    storeUsers(name) {

        if(!name){
            name = USERDEFAULT;
        }
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let myInit = {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        };

        return new Promise((resolve, reject)=>{
            fetch(`${API_ADRESS}user/${name}`, myInit)
                .then(function (response) {
                    return response.json();
                })
                .then((res) => {
                    STORE.userPreferences = res.preferences.keywords;
                    STORE.channelContents = res.preferences.channels;
                    STORE.myContentContents = res.preferences.myContents;
                    STORE.appliContents = res.preferences.apps;
                    STORE.movieContents = res.preferences.films;
                    STORE.extraContents = res.preferences.extras;
                    resolve(res);
                })
                .catch( err =>{
                    reject(err);
                })
        })

    }

    /**
     * Store in global STORE the channels for the channels modal
     * @returns {Promise<any>}
     */
    storeChannels() {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let myInit = {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        };

        return new Promise((resolve, reject)=>{
            fetch(`${API_ADRESS}channels`, myInit)
                .then(function (response) {
                    return response.json();
                })
                .then((res) => {
                    STORE.modalChannelContents = res[0].channels;
                    resolve(true);
                })
                .catch( err =>{
                    reject(err);
                })
        })
    }


    /**
     * Store in global STORE the apps for the apps modal
     * @returns {Promise<any>}
     */
    storeApps() {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let myInit = {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        };

        return new Promise((resolve, reject)=>{
            fetch(`${API_ADRESS}apps`, myInit)
                .then(function (response) {
                    return response.json();
                })
                .then((res) => {
                    STORE.modalAppsContents = res[0].apps;
                    resolve(true);
                })
                .catch( err =>{
                    reject(err);
                })
        })
    }
}

export default new RestResource();