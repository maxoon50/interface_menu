
export const mixinEltWithoutChild = {
    data: function () {
        return {
            focused: false,
        }
    },
    methods: {
        isFocus: function () {
            this.focused = true;
        },
        removeFocus: function () {
            this.focused = false;
        }
    }
}
