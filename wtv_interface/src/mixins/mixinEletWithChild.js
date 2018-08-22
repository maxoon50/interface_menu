

export const mixinEletWithChild = {
    data: function() {
        return {
            focused: false,
            focus : 0
        }
    },
    methods:{
        isFocus: function () {
            this.focused = true;
            this.getFocus();
        },
        removeFocus: function () {
            this.focused = false;
            this.removeListeners();
            this.lastFocused.removeFocus();
            //remove tous les focus des enfants
        },
        getFocus: function (index) {
            this.focus =  index || 0;
            this.initListeners();
            this.giveFocus();
        },
        
        setFocus: function (pos) {
            if(this.focus <= 0 && pos == -1){
                this.focus = this.$refs.contents.length-1;
            }else if(this.focus == this.$refs.contents.length-1 && pos == 1){
                this.focus = 0;
            }else{
                this.focus += pos;
            }
            this.giveFocus();
        },
        giveFocus: function () {
            // ici on vérifie s'il y a un last focused et on le remove au besoin
            if(this.lastFocused != null){
                this.lastFocused.removeFocus();
            }
            // ici on set le focus sur le nouvel élément (selon le this.focus))
            let eltToFocus = this.$refs.contents[this.focus];
            eltToFocus.isFocus();
            this.lastFocused = eltToFocus;
        },

        initListeners: function () {
            window.addEventListener('keydown', this.listener );
        },
        removeListeners: function() {
            window.removeEventListener('keydown', this.listener);
        },
    }
}