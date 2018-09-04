import Vue from 'vue'
export const myFilmState =new Vue({
    data: {
        contents:[

            {
                'title': 'Daredevil',
                'img': 'daredevil.jpg',
                'id': 125
            },
            {
                'title': 'L\'invasion des profanateurs de sépulture',
                'img': 'invasion.jpg',
                'id': 124
            },
            {
                'title': 'Jackie Brown',
                'img': 'jackie.jpg',
                'id': 126
            },

        ]
    },
    watch:{

    }
})