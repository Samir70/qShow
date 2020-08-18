# Making the qShow container 
This will be an html page with a Vue instance that has the following data
- [ ] score
- [ ] qNumber, to eventually enable a progress bar
- [ ] qList: an array of question objects, with fields: qType, question, answer (this will be extended later)
- [ ] status, eg: livesLeft

## first commits
- [ ] just display a description of what should be in that part of the screen. eg: 'score' 
- [ ] pass dummy data for score and livesLeft
- [ ] pass an array of question objects, the component will eventually display the q-numberth question in that array
- [ ] pass qNumber, which the component will display as text fraction top/qList.length in the space for progress
- [ ] display the qNumberth question in qList

### validate
- [ ] livesLeft should be non-negative
- [ ] qNumber should be between 1 and the number of qs in the array

