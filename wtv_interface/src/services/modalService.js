import {STORE} from "../states/store";

const API_ADRESS = "http://localhost:8005/";

class ModalService {

    constructor(type) {
        this.eltsToSave = [];
        this.type = type;
        console.log('ok new modal service');
        console.log(this.type)
    }

    addEltToSave(elt) {
        this.eltsToSave.push(elt);
        console.log(this.eltsToSave)
    };

    removeEltToSave(elt) {
        this.eltsToSave.find((elt, index) => {
            this.eltsToSave.splice(index, 1);
        });
        console.log(this.eltsToSave)
    };

    resetEltToSave() {
        this.eltsToSave = [];
        console.log(this.eltsToSave)
    };

    /**
     * Get the users form the API,
     * If the promise is resolved, store the users in the STORE object
     * @returns boolean
     */
    storeUsers(name) {

        if (!name) {
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

        return new Promise((resolve, reject) => {
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
                .catch(err => {
                    reject(err);
                })
        })

    }


}

export default ModalService;