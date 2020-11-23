/**
 * returns a shuffled version of argument, which is left unchanged
 * uses Fisher-Yates algorithm, modified so no element is in its original place
 * @param {*} arr 
 */
const shuffle = arr => {
    let out = [...arr];
    for (let i = out.length - 1; i > 0; i--) {
        let j = i;
        while (j === i) {
            j = Math.floor(Math.random() * (i + 1)); // number 0..i
        }
        [out[i], out[j]] = [out[j], out[i]]
    }
    return out
}

const WRONG = "sortq-li wrong-pos";
const RIGHT = "sortq-li right-pos";
const NEUTRAL = "sortq-li neutral-pos";

/**
 * This display will display a short question / description of what to do
 * Then it will have a column of options which can be rearranged into the correct order
 * There is a give-hint option. When this is set to true:
 * -- rows are highlighted in green to indicate that they are correct from the top
 * -- rows are highlighted in amber to indicate that they are in the wrong position.
 * 
 * When the answer is checked it is marked and an object passed as part of the event
 * The object contains:
 * status: boolean for user was correct
 * mark: first bit of feedback, eg: 'correct', 'wrong!'
 * extra: something like confirmation of the answer.
 * 
 */

Vue.component('sortQ', {
    props: {
        qData: Object
    },
    data: function () {
        return {
            userWasCorrect: false,
            draggedItemID: null, droppedOnID: null,
            enteredElement: null,
            userAnswer: shuffle(
                this.qData.answer.map((x, i) => {
                    return {
                        text: x, id: i, class: this.qData.giveHint ? WRONG : NEUTRAL
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
            let noMistakes = true;
            this.userAnswer.forEach((r, i) => {
                if (r.id !== i) { noMistakes = false }
            })
            if (noMistakes) {
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
        updateUserAnswer: function () {
            console.log('updating the user answer classes')
            this.userAnswer.forEach((row, i) => {
                row.class = row.id === i ? RIGHT : WRONG;
                if (!this.qData.giveHint) {row.class = NEUTRAL}
            })
        }
    },
    template: `
        <div>
            <p>{{qText}}</p>
            <draggable v-model="userAnswer" v-on:end="updateUserAnswer" >
                <div
                    v-for="item in userAnswer" 
                    v-bind:key="item.id" 
                    v-bind:class="item.class">{{item.text}} 
                </div>
            </draggable>
            <button v-on:click="checkAnswer; $emit('user-answered', checkAnswer())" >Check Answer</button>
        </div>
    `
})