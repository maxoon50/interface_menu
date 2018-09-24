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
    var that = this;
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

                    that.getYouTubeVideos(res.preferences.keywords);
                    resolve(res);
                })
                .catch( err =>{
                    reject(err);
                })
        })

    }

    /**
     * Store in global STORE the videos get according to the user preferences (keywords), 
     * sorted from highest to lowest number of views. 
     * @returns {Promise<any>}
     */
    getYouTubeVideos(preferencesUser) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let myInit = {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        };
        // on reset toujours l'extracontent à 0, si le user change
        STORE.extraContents = [];
        for(const pref of preferencesUser){
            fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&q='+pref+'&type=video&maxResults=1&order=viewCount&key=AIzaSyBGnQO5k02QBDTuMX-gmuVEiKA7_kfosOk', myInit)
                .then(function(response) {
                    return response.json()
                })
                .then(function(res) {
                    STORE.extraContents.push(
                        {
                            _id: res.items[0].id.videoId, 
                            videoId: res.items[0].id.videoId, 
                            img: res.items[0].snippet.thumbnails.high.url,
                            title: res.items[0].snippet.title
                        }
                    );
                    console.log(STORE.extraContents)
                    return STORE.extraContents; 
                })
        }
        
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