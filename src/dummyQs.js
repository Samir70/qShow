const dummyQs = [
  { qType: 'shortAnswer', question: 'What is 2+1?', answer: 3 },
  { qType: 'multiChoice', question:'What do you call the longest chord in a circle?', answer:'diameter', wrongOptions:['radius', 'tangent', 'line']},
  { qType: 'sort', question:'Sort these decimals into ascending order', answer:[3.1, 3.024, 3.127, 3.14]},
  { qType: 'match', question:'Match the following:', pairs:[ ['London', 'England'], ['Paris', 'France'], ['Brussels', 'Belgium'], ['Athens', 'Greece'] ]},
  { qType: 'classify', question:'Decide where each of these belongs', buckets:['Primes', 'Composite'], items:[ [2, 5, 3, 7, 11], [1, 4, 9, 15] ] },
  { qType: 'multiQ+Choices', qList:['What is 3 x 5?', 'What is 30 - 2?', 'What is 24/4 ?'], answerList:[15, 28, 6]}
]
