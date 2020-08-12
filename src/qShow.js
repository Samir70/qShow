Vue.component('qShow', {
    props: {
        score: Number,
        progress: Array, // [completed, total Qs] = completed/totalQs
        livesLeft: Number,
        questions: Array // of question objects, at least one element 
    },
    template: `
        <div>
            <div><p>Score: {{score}}</p></div>
            <div><p>{{livesLeft}} Lives</p></div>
            <div><p>Progress: {{progress[0]}}/{{progress[1]}}</p></div>
            <div><p>Space for the question</p></div>
        </div>
    `
})