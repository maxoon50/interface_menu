/**
 *
 * @type {{data: function(): {}, methods: {savePref: mixinSavePreferences.methods.savePref, removePref: mixinSavePreferences.methods.removePref}}}
 * Make the link between the card element which want to be save and his modal parent, the controler
 */
export const mixinSavePreferences = {
    data: function () {
        return {
        }
    },
    methods: {
        savePref: function () {
            this.$parent.$parent.storeNewPref(this.content);
        },
        removePref: function () {
            this.$parent.$parent.removePref(this.content);
        }
    }
}
