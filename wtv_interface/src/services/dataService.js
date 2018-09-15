import {STORE} from "../states/store";

const API_ADRESS = "http://localhost:8005/";

class RestResource {

    constructor(){

    }
    /*
    * Get the users form the API,
    * and if the promise is resolved, store the users in the STORE object
    * @return boolean
     */
    storeUsers() {

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let myInit = {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        };

        return new Promise((resolve, reject)=>{
            fetch(`${API_ADRESS}users`, myInit)
                .then(function (response) {
                    return response.json();
                })
                .then((res) => {
                    STORE.channelContents = res[0].user.preferences.channels;
                    STORE.myContentContents = res[0].user.preferences.myContents;
                    STORE.appliContents = res[0].user.preferences.apps;
                    STORE.movieContents = res[0].user.preferences.films;
                    STORE.extraContents = res[0].user.preferences.extras;
                    resolve(true);
                })
                .catch( err =>{
                    reject(err);
                })
        })

    }

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
                    console.log(res)
                    STORE.modalChannelContents = res[0].channels;
                    resolve(true);
                })
                .catch( err =>{
                    reject(err);
                })
        })
    }

}

export default new RestResource();