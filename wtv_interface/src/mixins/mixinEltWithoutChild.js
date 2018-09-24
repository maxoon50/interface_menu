import {EventBus} from "../main";

export const mixinEltWithoutChild = {
    data: function () {
        return {
            focused: false,
        }
    },
    methods: {
        isFocus: function () {
            EventBus.$emit("changeBackground", this.content.img);
            this.focused = true;
        },
        removeFocus: function () {
            this.focused = false;
        }
    }
}
