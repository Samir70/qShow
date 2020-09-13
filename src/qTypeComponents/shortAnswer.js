Vue.component('shortAnswer', {
    props: {
        qData: Object
    },
    computed: {
        qText: function () { return this.qData.question },
        ans: function () { return this.qData.answer },
        showButton: function () { return this.qData.question !== '' }
    },
    methods: {
        checkAnswer: function () {

        }
    },
    template: `
        <div>
            <p>{{qText}}</p>
            <button v-on:click="$emit('user-answered')" >Check Answer</button>
        </div>
    `
})