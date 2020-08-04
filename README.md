# qShow
A project to display various types of questions in various ways. This first commit is actually me planning what this will look like. The motivation is that I am creating lots of maths questions and either reusing a rather poor one-size-fits-all in maths-elo, or I am making new displays for almost every question in Maths-How2

## Display  object
- [ ] Should take at least one question as an argument, possibly an array
- [ ] Progress bar to know how far through question set
- [ ] score
- [ ] status -- lives lost, maybe?

## Question Types

### Multiple Choice
- [ ] Show one correct answer and upto three wrong answers. 
- [ ] All options should be in the question object, so the display component is not responsible for generating them. 
- [ ] The display should randomise the options so the correct answer is not always in the same position. 
- [ ] There should be an option to ask for confirmation after clicking an answer, or to mark it straight away.
- [ ] Marking should be indicated by colour. Correct goes green, wrong goes red. Consider leaving only the correct answer and the user's answer visible, or raising correct answer to the top.
- [ ] If some of the wrong answers are provided as traps, then consider giving feedback in the question object.

### Put into order
A list is given with a desired order required. Eg: sort these people by date of birth: Mozart, Jesus, Ghandi, Napolean
Ideally: drag and drop would be the option, but click to raise may be a good start.

### Typed answer required
String or number -- the later should have a keypad and no input box, so the display on mobiles doesn't get spolied by the keyboard coming up.
The former should not have a question that is too long, since it should be readable while the mobile keyboard is on.

## The Question Object
- [ ] Contain question and answer -- wrong answers for multiple choice
- [ ] question generator for maths topics, eg: times table
