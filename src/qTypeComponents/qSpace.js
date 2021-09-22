Vue.component('q-space', {
    props: {
        qList: Array,
        // gotCorrect: Number,
        defaultQ: Object
    },
    data: function () {
        return {
            showFeedback: false, moreQs: true,
            feedback: ['Correct!', 'Another message'],
            userWasCorrect: false, livesLeft: 3,
            qToShow: 0, answeredQs: new Set(), gotCorrect: 0
        }
    },
    methods: {
        makeFeedback: function (ans) {
            console.log('makeFeedback was run ', ans)
            this.userWasCorrect = ans.status;
            this.feedback = [ans.mark, ans.extra]
            if (this.userWasCorrect) {
                // this.feedback = "Correct!! "
                this.gotCorrect++
            } else {
                this.livesLeft -= 1;
                // this.feedback = "Wrong!"
                if (this.livesLeft === 0) {
                    this.feedback.push("Out of juice! You got " + this.gotCorrect + " out of " + this.qList.length);
                    this.moreQs = false;
                }
            }
            this.showFeedback = true;
            if (this.gotCorrect === this.qList.length) {
                this.feedback.push("You have answered all the questions!")
                this.moreQs = false;
            }
            this.$emit('got-answer', this.userWasCorrect)
        },
        nextQ: function () {
            if (this.userWasCorrect) {
                this.answeredQs.add(this.qToShow)
            }
            this.userWasCorrect = false;
            this.qToShow++
            if (this.qToShow >= this.qList.length) { this.qToShow = 0 }
            while (this.answeredQs.has(this.qToShow)) {
                this.qToShow++
                if (this.qToShow >= this.qList.length) { this.qToShow = 0 }
            }
            this.showFeedback = false;
        }
    },
    template: `
    <transition name="fade" mode="out-in">
        <div v-if="!showFeedback" id="q-space" key="showQ">
            <short-answer v-if="qList[qToShow].qType === 'shortAnswer'" v-bind:q-data="qList[qToShow]"
                v-on:user-answered="makeFeedback">
            </short-answer>
            <sort-q v-else-if="qList[qToShow].qType === 'sort'" v-bind:q-data="qList[qToShow]"
                v-on:user-answered="makeFeedback">
            </sort-q>
            <multi-choice-q v-else-if="qList[qToShow].qType === 'multiChoice'" v-bind:q-data="qList[qToShow]"
                v-on:user-answered="makeFeedback">
            </multi-choice-q>
            <div v-else>
                <h2>I don't know how to show the qType {{qList[qToShow].qType}}</h2>
                <short-answer v-bind:q-data="defaultQ" v-on:user-answered="makeFeedback"></short-answer>
            </div>
        </div>
        <div v-if="showFeedback" id="feedback-space" key="showFB">
            <p>Q:{{qList[qToShow].question}}</p>
            <p>{{feedback[0]}}</p>
            <p v-if="feedback[1]">{{feedback[1]}}</p>
            <p v-if="feedback[2]">{{feedback[2]}}</p>
            <button v-if="moreQs" v-on:click="nextQ">Next Q</button>
            <p>{{qList.map(q => q.qType)}} on Q {{qToShow}} got {{gotCorrect}}</p>
        </div>
    </transition>
    `
})