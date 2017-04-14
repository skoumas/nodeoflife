# NodeOfLife
## A nodejs socket.io web browser game

### Updates
- Created shapes.js in which very easily we import a new shape at the main grid
- Removed color for now to save speed in broadcast and calculations

### Description
NodeOfLife is a nodejs application that utiliases the Game of Life algorithm implemented in nodejs and broadcasted using socket.io

### How to run
1) Load terminal
2) start the server
```js
node server
```
or
```js
nodejs server
```
3) Open index.html with a browser
4) Wait a couple of seconds and you should be able to see the grid
5) Click any shape from the top bar
6) Click in the grid to place it


### Technical Choices
1) Chosen nodejs as I enjoy working with JS back end and front-end
2) Socket.io to broadcast the array of the pixels
3) Using Bootstrap CSS for front-end

### Future thoughts
I would like to make this run on 10ms. Possible if you do syncing between brownser and client. Both run the same code and the server sends a pulse every one second to make sure synchronization happens.

Thinking ways to make the whole thing faster including compressing the table in a way or limiting the
amount of data sent. Perhaps also good idea to find a better way to send the colors.
