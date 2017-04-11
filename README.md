# NodeOfLife
## A nodejs socket.io web browser game

### Updates
- Created shapes.js in which very easily we import a new shape at the main grid
- Removed color for now to save speed in broadcast and calculations

### Description
NodeOfLife is a nodejs application that utiliases the Game of Life algorithm implemented in nodejs and broadcasted using socket.io

### How to run
1) Load terminal
2) node server.js
3) Open index.html
4) Wait a couple of seconds and you should be able to see the signal

### Technical Choices
1) Chosen nodejs as I enjoy working with JS back end and front-end
2) Socket.io to broadcast the array of the pixels
3) Using Bootstrap CSS for front-end

### Tradeoffs
- UPDATE: removed the color for now until I find a way to make it faster as it took a lot of speed and resources.

Thinking ways to make the whole thing faster including compressing the table in a way or limiting the
amount of data sent. Perhaps also good idea to find a better way to send the colors.

### Links to other projects