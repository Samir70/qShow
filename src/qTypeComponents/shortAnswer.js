Vue.component('shortAnswer', {
    props: {
        qData: Object
    },
    data: function () {
        return { userAnswer: '', userWasCorrect: false }
    },
    computed: {
        qText: function () { return this.qData.question },
        ans: function () { return this.qData.answer },
        showButton: function () { return this.qData.question !== '' }
    },
    methods: {
        checkAnswer: function () {
            this.userWasCorrect = Math.random() < 0.5 ? true : false;
            return this.userWasCorrect
        }
    },
    template: `
        <div>
            <p>{{qText}}</p>
            <button v-on:click="checkAnswer; $emit('user-answered', checkAnswer())" >Check Answer</button>
        </div>
    `
})