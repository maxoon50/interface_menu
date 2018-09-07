import Vue from 'vue'
export const myFilmState =new Vue({
    data: {
        contents:[

            {
                'title': 'Daredevil',
                'img': 'daredevil.jpg',
                'id': 125,
                'url': 'https://www.youtube.com/embed/mGEWftxFX3M'
            },
            {
                'title': 'L\'invasion des profanateurs de sépulture',
                'img': 'invasion.jpg',
                'id': 124,
                'url': 'https://www.youtube.com/embed/0BLt7yDaHdQ'
            },
            {
                'title': 'Jackie Brown',
                'img': 'jackie.jpg',
                'id': 126,
                'url': 'https://www.youtube.com/embed/QlqM2oiD19w'
            },

        ]
    },
    watch:{

    }
})