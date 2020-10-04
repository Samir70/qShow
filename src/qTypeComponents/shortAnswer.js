/**
 * The component displays the question, 
 * an answer box for short text
 * a button to check the answer
 * 
 * When the answer is checked it is marked and an object passed as part of the event
 * The object contains:
 * status: boolean for user was correct
 * mark: first bit of feedback, eg: 'correct', 'wrong!'
 * extra: some thing like confirmation of the answer.
 */

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
            let mark = '';
            let blandFB = 'The answer is '+this.ans
            if (this.userAnswer === '' + this.ans) {
                this.userWasCorrect = true;
                mark = 'Correct! '
            } else {
                this.userWasCorrect = false;
                mark = 'Wrong! '
            }
            let extra = (this.qData.feedback || blandFB)
            // this.userWasCorrect = this.userAnswer === ''+this.ans; //Math.random() < 0.5 ? true : false;
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