# Making the qShow container component
There should be a component which takes the following as props
- [ ] score
- [ ] q-number, qs-in-set to eventually enable a progress bar
- [ ] question object, with fields: qType, question, answer (this will be extended later)
- [ ] status, eg: lives-left

## first commits
- [ ] just display a description of what should be in that part of the screen. eg: 'score' 
- [ ] pass an actual number as the score, which the component will display as text
- [ ] pass an actual number as lives-left, which the component will display as text
- [ ] pass q-number and qs-in-set, which the component will display as test fraction top/bottom
- [ ] pass an array of question objects, the component will display the q-numberth question in that array
