/**
 * description of the component
 */

Vue.component('matchQ', {
    props: {
        qData: Object
    },
    data: function () {
        return { userAnswer: '', userWasCorrect: false }
    },
    computed: {
        qText: function () { return this.qData.question },
        pairs: function () { 
            let out = {}
            for (let [a, b] of this.qData.pairs) {
                out[a] = b; out[b] = a;
            }
            console.log(out)
            return out
        },
        cards: function () {
            let out = [];
            for (let [a, b] of this.qData.pairs) {
                out.push(a); out.push(b)
            }
            console.log(out)
            return shuffle(out).map((x, i) => {
                return {
                    text: x, id: i, class: 'mcq-option'
                }
            })
        }
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
            <div id="match-cards">
                <div
                v-for="item in cards" 
                v-bind:key="item.id" 
                v-bind:class="item.class"
                v-on:click="updateUserAnswer(item.text)">{{item.text}} 
        </div>
            </div>
            <button v-on:click="checkAnswer; $emit('user-answered', checkAnswer())" >Check Answer</button>
        </div>
    `
})