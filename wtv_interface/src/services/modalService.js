import {STORE} from "../states/store";

const API_ADRESS = "http://localhost:8005/";

class ModalService {

    constructor(categorie) {
        this.eltsToSave = [];
        this.categorie = categorie;
        this._getUserPrefs();
    }

    addEltToSave(elt) {
        this.eltsToSave.push(elt);
    };

    removeEltToSave(pElt) {
        this.eltsToSave.forEach((elt, index) => {
            // => à revoir id...
               if(elt.img === pElt.img){
                   this.eltsToSave.splice(index, 1);
               }
        });
        console.log(this.eltsToSave)
    };

    /**
     * Make a copy of user preferences according to the category
     * @private
     */
    _getUserPrefs() {
        let elts = STORE[this._getStoreCategory()];
        let copyElts = JSON.parse(JSON.stringify(elts));
        this.eltsToSave.push(...copyElts);
    }

    /**
     *
     * @returns {Promise<User>}
     */
    savePreferences() {
        let myHeaders = new Headers();
        //let user = STORE.objectUser;
        let category = this._getCategorie();

        // ici on ne change pas directement la référence de l'objet, on veut juste le cloner,
        // la référence sera changée (le store), une fois que la db aura fait l'update
        let clone = JSON.parse(JSON.stringify(STORE.objectUser));
        clone.preferences[category] = this.eltsToSave;
        clone.preferences.extras = {};
        myHeaders.append("Content-Type", "application/json");
        let myInit = {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(clone)
        };

        return new Promise((resolve, reject) => {
            fetch(`${API_ADRESS}update`, myInit)
                .then(function (response) {
                    return response.json();
                })
                .then((res) => {
                    let nameAttrStore = this._getStoreCategory(this.categorie);
                    STORE[nameAttrStore] = res.preferences[category];
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                })
        });
    };


    /**
     * @returns {string}
     * @private
     * from the name of the card modal, return the property name which is attibute to the main User object ex User.channels, User.extras ...
     */
    _getCategorie() {
        switch(this.categorie){
            case "ChannelModal":
                return "channels";
                break;
            case "MyContentModal":
                return "myContents";
                break;
            case "AppliModal":
                return "apps";
                break;
            case "ExtraModal":
                return "extras";
                break;
            case "MovieModal":
                return "films";
                break;
        }
    };

    /**
     * @returns {string}
     * @private
     * get the store attribute corresponding to the opened modal
     */
    _getStoreCategory() {
        switch(this.categorie){
            case "ChannelModal":
                return "channelContents";
                break;
            case "MyContentModal":
                return "myContentContents";
                break;
            case "AppliModal":
                return "appliContents";
                break;
            case "ExtraModal":
                return "extraContents";
                break;
            case "MovieModal":
                return "movieContents";
                break;
        }
    }


}

export default ModalService;