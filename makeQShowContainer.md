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

## style the qShow container
- [ ] Score and lives left should be on the same line, top of the screen
- [ ] Progress bar should show a horizontal graphic and accurately indicate via text how many questions completed
- [ ] The space for a question should have a border with rounded corners
- [ ] There should be a check answer button (the function of this will eventually change depending on state of the app)

## functionality
- [ ] Clicking the check answer button should randomly decide if the answer was correct (for now) and the app should display a notice of right or wrong
- [ ] Correctly answered questions are dropped from the qList
- [ ] Cycle thru the questions until they have all been answered correctly. (Progress bar, score and lives should all update)
- [ ] Running out of lives should end the quiz with a display of final score.

### validate
- [ ] livesLeft should be non-negative
- [ ] qNumber should be between 1 and the number of qs in the array

