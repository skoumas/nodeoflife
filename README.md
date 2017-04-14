# NodeOfLife
## A nodejs socket.io web browser game

### Description
NodeOfLife is a nodejs application that utiliases the Game of Life algorithm implemented in nodejs and broadcasted using socket.io

### How to run
1) Load terminal
2) start the server
```js
node server
```
3) Open index.html with a browser
4) Wait a couple of seconds and you should be able to see the grid
5) Click any shape from the top bar
6) Click in the grid to place it

### How it works
First the server starts and creates an empty grid. That grid is loaded with zeros and a color 
that is for now white: #FFFFFF. After that then main loop is activated through a 1 second interval. 
`gol.updateGrid()`. That function updates the grid based on the Game of Life formula.
The grid is then broadcasted using socket.io.
From the client perspective when the browser loads we load a new user using `user = new User` and assign
to that user an id, a color and a symbol. Also we setup up the terminal so we can see some messages
on what is going on. Finally we load the gol class which is responsible for displaying the grid we are 
getting from the socket.io. Everytime we receive a socket.io signal then the drawGrid() function is called.

### Structure
#### Server

	server.js
	server/gol.js
	server/shapes.js

#### Client

	client/client.js
	client/gol.js
	client/terminal.js
	client/user.js


### Technical Choices
Nodejs and socketio for the backend and transmition. Jquery for playing with the DOM, Bootstrap CSS for the basic styling and mix-colors npm package for mixing the colors together. JSlint for beautifing the code and applying a lot of commenting as well.

### Future thoughts
- I would like to make this run on 10ms. Possible if you do syncing between brownser and client. Both run the same code and the server sends a pulse every one second to make sure synchronization happens.
- Thinking ways to make the whole thing faster including compressing the table in a way or limiting the
amount of data sent. Perhaps also good idea to find a better way to send the colors.
- Responsive design
