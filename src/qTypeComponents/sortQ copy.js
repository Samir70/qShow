// This is the old version, without any draggable code (sortable nor GSAP). 
// But it doesn't work on touch screen devices
// Note that the CSS has also been changed so that the "list items" are just divs and there is no <ol>

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

const WRONG = "dropzone sortq-li wrong-pos";
const RIGHT = "dropzone sortq-li right-pos";
const NEUTRAL = "dropzone sortq-li neutral-pos";

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
 * extra: some thing like confirmation of the answer.
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
            enteredElement: null
        }
    },
    computed: {
        qText: function () { return this.qData.question },
        ans: function () { return this.qData.answer },
        listType: function () {return this.qData.listType},
        userAnswer: function () {
            let classToUse = this.qData.giveHint ? WRONG : NEUTRAL;
            return shuffle(
                this.qData.answer.map((x, i) => { return { text: x, id: i, class: classToUse } })
            )
        }
    },
    methods: {
        checkAnswer: function () {
            let mark = '';
            let blandFB = 'You had a go!';
            let noMistakes = true;
            this.userAnswer.forEach((r, i) => {
                if (r.id !== i) {noMistakes = false}
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
        onDragStart: function (event, item) {
            // console.log('started dragging the item with id', item.id);
            this.draggedItemID = item.id;
            event.target.style.opacity = 0.4;
        },
        onDragEnd: function (event) {
            event.target.style.opacity = 1;
            if (this.enteredElement !== null && this.draggedItemID !== this.droppedOnID) {
                this.enteredElement.classList.remove('dragged-over');
                // console.log('we have dragged', this.draggedItemID, 'onto', this.droppedOnID);
            }
            let from = this.userAnswer.findIndex(x => x.id === this.draggedItemID);
            let to = this.userAnswer.findIndex(x => x.id === this.droppedOnID);
            if (from < to) {
                let temp = this.userAnswer[from];
                for (let i = from; i<to; i++) {
                    this.userAnswer[i] = this.userAnswer[i+1]
                }
                this.userAnswer[to] = temp;
            }
            if (to < from) {
                let temp = this.userAnswer[from];
                for (let i = from; i > to; i--) {
                    this.userAnswer[i] = this.userAnswer[i-1]
                }
                this.userAnswer[to] = temp;
            }
            this.userAnswer.forEach((r, i) => {
                if (r.id === i) {
                    r.class = this.qData.giveHint ? RIGHT : NEUTRAL;
                } else {
                    r.class = this.qData.giveHint ? WRONG : NEUTRAL
                }
            })
            this.draggedItemID = null; this.droppedOnID = null;
            // console.log(this.userAnswer);
            this.$forceUpdate();
        },
        onDragEnter: function (event, item) {
            if (event.target.classList === undefined) { return }
            if (event.target === this.enteredElement) { return }
            if (this.enteredElement !== null) {
                this.enteredElement.classList.remove('dragged-over')
            }
            event.preventDefault();
            this.enteredElement = event.target;
            this.droppedOnID = item.id;
            // console.log('entered another element:', item.id);
            if (item.id !== this.draggedItemID && event.target.classList[0] === 'dropzone') {
                event.target.classList.add('dragged-over');
            }
        }
    },
    template: `
        <div>
            <p>{{qText}}</p>
            <ul id="sortq-list">
                <li 
                    v-for="item in userAnswer" 
                    v-bind:key="item.id" 
                    v-bind:class="item.class" 
                    draggable=true
                    v-on:dragstart="onDragStart($event, item)"
                    v-on:dragend="onDragEnd"
                    v-on:dragenter.prevent="onDragEnter($event, item)"
                    v-on:dragover.prevent="">{{item.text}}
                </li>
            </ul>
            <button v-on:click="checkAnswer; $emit('user-answered', checkAnswer())" >Check Answer</button>
        </div>
    `
})