Vue.component('qShow', {
    props: {
        score: Number,
        qNumber: Number, qsInList:Number, // eventually used for a progress bar
        livesLeft: Number,
        questions: Array // of question objects, at least one element 
    },
    template: `
        <div>
            <div><p>Score: {{score}}</p></div>
            <div><p>{{livesLeft}} Lives</p></div>
            <div><p>Progress: {{qNumber}}/{{questions.length}}</p></div>
            <div><p>Q:{{questions[qNumber-1].question}}</p></div>
        </div>
    `
})