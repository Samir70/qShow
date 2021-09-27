/**
 * description of the component
 */

Vue.component('matchQ', {
    props: {
        qData: Object
    },
    data: function () {
        return {
            firstTile: '', userWasCorrect: false,
            cards: shuffle([].concat(...this.qData.pairs).map((x, i) => {
                return {
                    text: x, id: i, class: 'mcq-option'
                }
            }))
        }
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
        }
    },
    methods: {
        checkAnswer: function () {
            let mark = '';
            let blandFB = 'The answer is ' + this.ans
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
        updateUserAnswer: function (tile) {
            console.log('react to click on', tile)
            if (this.firstTile === '') {
                this.firstTile = tile;
            } else {
                if (this.pairs[tile] === this.firstTile) {
                    console.log(tile, this.firstTile, 'is correct')
                    for (let c of this.cards) {
                        if (c.class === 'mcq-option solved') { continue }
                        c.class = c.text === tile || c.text === this.firstTile ?
                        'mcq-option solved' : 'mcq-option'
                    }
                }
                this.firstTile = ''
                tile = ''
            }
            for (let c of this.cards) {
                if (c.class === 'mcq-option solved') { continue }
                c.class = c.text === tile ? 'mcq-option selected' : 'mcq-option'
            }
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