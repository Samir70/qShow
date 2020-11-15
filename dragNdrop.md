Learning a lot while trying to get a drap and drop function for my sortQ component.

What I knew:
- shuffle a list with the Fisher-Yates algorithm. (I modified this so that no element is in its original position).
- display a list in Vue using a for loop

for the latter, I used an array of objects with properties: text, id and class
```
<li 
  v-for="item in userAnswer" 
  v-bind:key="item.id" 
  v-bind:class="item.class">{{item}} 
</li>
```
Obviously: when things are completed I will only display item.text rather than the whole item object. But this helps me see what is happening during development.

Then: onto google, where I found loads of options. I settled mainly on [using basic HTML dNd](https://web.dev/drag-and-drop/) and 
a bit of help [fitting it into Vue](https://learnvue.co/2020/01/how-to-add-drag-and-drop-to-your-vuejs-project/) (though the latter has items being dragged from one list to another).

First step was to make the list items draggable and listen for the dragstart event.
```
<li 
  v-for="item in userAnswer" 
  v-bind:key="item.id" 
  v-bind:class="item.class" 
  draggable=true
  v-on:dragstart="onDragstart($event, item)">{{item}}
</li>
```
Then tests things out by doing the minimum: lower the opacity of the dragged element. Here is the relevant method of my Vue component:
```
onDragStart : function (event, item) {
  console.log('started dragging the item with id', item.id)
  event.target.style.opacity = 0.4
}
```
So far so good. But, of course, the dragged item stays with low opacity because we don't listen and respond to dragend. I can confirm I have the id of the item that was dragged by checking the console.

So I listened for dragend, and set opacity back to 1 in the handler for that event.

Then came a really difficult part: dragenter and dragleave. One fires after the other for as long as you hover over another element. So nothing seems to work except to consider that you have left one dropzone when you enter another. So I kept track of the element I had entered, and only updated when event.target was a different element to the last. And so I didn't need to care about dragleave. I also had to make sure that the element involved had a classList -- this always happen.
```
onDragEnter: function (event, item) {
 if (event.target.classList === undefined) {return}
 if (event.target === this.enteredElement) {return}
 if (this.enteredElement !== null) {
   this.enteredElement.classList.remove('dragged-over')
 }
 this.enteredElement = event.target;
 if (item.id !== this.draggedItemID && event.target.classList[0] === 'dropzone') {
   event.target.classList.add('dragged-over');
 }
}
```
Then, even though I wasn't actually going to have a listener to the dragover event, I still needed to following so that the "not allowed" cursor would not be used when hovering over a dropzone.
```
v-on:dragover.prevent=""
```
