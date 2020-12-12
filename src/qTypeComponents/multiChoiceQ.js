// Fisher-Yates shuffle algorithm
const shuffleFY = arr => {
    let out = [...arr];
    for (let i = out.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i+1)); // number 0..i
        [out[i], out[j]] = [out[j], out[i]]
    }
    return out
}

/**
 * This will ask the question and provide up to 4 options.
 * Only one option can be the correct answer * 
 */

Vue.component('multiChoiceQ', {
    props: {
        qData: Object
    },
    data: function () {
        return {
            userWasCorrect: false,
            userAnswer:'',
            options: shuffleFY(
                [this.qData.answer, ...this.qData.wrongOptions].map((x, i) => {
                    return {
                        text: x, id: i, class: 'mcq-option'
                    }
                })
            )
        }
    },
    computed: {
        qText: function () { return this.qData.question },
        ans: function () { return this.qData.answer }
    },
    methods: {
        checkAnswer: function () {
            let mark = '';
            let blandFB = 'You had a go!';
            if (this.qData.answer === this.userAnswer) {
                this.userWasCorrect = true;
                mark = 'Correct! '
                blandFB = 'Wow! Way to go!!!';
            } else {
                this.userWasCorrect = false;
                mark = 'Wrong! '
                blandFB = 'Shame! Maybe Next time!';
            }
            let extra = (this.qData.feedback || blandFB)
            return { status: this.userWasCorrect, mark, extra }
        },
        updateUserAnswer: function (a) {
            console.log('received new answer:', a)
            this.userAnswer = a;
            for (let i of this.options) {
                i.class = i.text === a ? 'mcq-option selected' : 'mcq-option'
            }
        }
    },
    template: `
        <div>
            <p>{{qText}}</p>
            <div id="mcq-option-list">
                <div
                    v-for="item in options" 
                    v-bind:key="item.id" 
                    v-bind:class="item.class"
                    v-on:click="updateUserAnswer(item.text)">{{item.text}} 
                </div>
            </div>
            <button v-on:click="checkAnswer; $emit('user-answered', checkAnswer())" >Check Answer</button>
        </div>
    `
})