/**
 * description of the component
 */

Vue.component('name', {
    props: {
        qData: Object
    },
    data: function () {
        return { userAnswer: '', userWasCorrect: false }
    },
    computed: {
        qText: function () { return this.qData.question },
        ans: function () { return this.qData.answer },
    },
    methods: {
        checkAnswer: function () {
            let mark = '';
            let blandFB = 'The answer is '+this.ans
            if (true/**test for correct */) {
                this.userWasCorrect = true;
                mark = 'Correct! '
            } else {
                this.userWasCorrect = false;
                mark = 'Wrong! '
            }
            let extra = (this.qData.feedback || blandFB)
            return {status: this.userWasCorrect, mark, extra}
        }
    },
    template: `
        <div>
            <p>{{qText}}</p>
            <input type="text" v-model:value="userAnswer" />
            <button v-on:click="checkAnswer; $emit('user-answered', checkAnswer())" >Check Answer</button>
        </div>
    `
})