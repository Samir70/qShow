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
        return { userWasCorrect: false, draggedItemID: -1, enteredElement:null }
    },
    computed: {
        qText: function () { return this.qData.question },
        ans: function () { return this.qData.answer },
        userAnswer: function () {
            return shuffle(
                this.qData.answer.map((x, i) => { return { text: x, id: i, class: WRONG } })
            )
        }
    },
    methods: {
        checkAnswer: function () {
            let mark = '';
            let blandFB = 'The answer is ' + this.ans;
            if (true/**test for correct */) {
                this.userWasCorrect = true;
                mark = 'Correct! '
            } else {
                this.userWasCorrect = false;
                mark = 'Wrong! '
            }
            let extra = (this.qData.feedback || blandFB)
            return { status: this.userWasCorrect, mark, extra }
        },
        onDragStart: function (event, item) {
            console.log('started dragging the item with id', item.id);
            this.draggedItemID = item.id;
            event.target.style.opacity = 0.4;
        },
        DragEnd: function (event, item) {
            event.target.style.opacity = 1;
        },
        onDragEnter: function (event, item) {
            if (event.target.classList === undefined) {return}
            if (event.target === this.enteredElement) {return}
            if (this.enteredElement !== null) {
                this.enteredElement.classList.remove('dragged-over')
            }
            this.enteredElement = event.target;
            // console.log(this.enterCount, 'entered another element:', item.id);
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
                    v-on:dragend="DragEnd($event, item)"
                    v-on:dragenter.self="onDragEnter($event, item)">{{item}}
                </li>
            </ul>
            <button v-on:click="checkAnswer; $emit('user-answered', checkAnswer())" >Check Answer</button>
        </div>
    `
})