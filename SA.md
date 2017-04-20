# Self-Assessment
## Architecture - B
Pretty clean seperation between front end and back end. The front end is also split in Model View Controller.
The back-end is split and modulized to a gol object which holds the main code. Also the shapes files is used also in the front-end and back-end as a common object which helps a lot to write DRY code.

## Communication - B
The architecture is explained in the README and there are comments along the code to help a new developer orient into this. 

## Code Quality - B
The code is easy to maintain as it is broken into modules that can be treated seperately. For example if we want to enter more features to the User class is very easy to do so and then use the changes in the client.js

## Functionality - B
The code does what is supposed to do with EXTRA functionality such as the terminal. Also the initial goal was to have a sync rate of 20ms or 10ms and used a mixture of runnign the script on the server but also at the client at the same time and syncing once every 1 second to make sure the grid is aligned.

## Security - A
Nothing that I can think of. DOS attacks?

## Testing Skills - C
I could have done better but as a start is pretty ok. Testing the basic functions of the gol.js object

## UX/UI - B
An easy to use UI with extra information such as the termimal and information about the user's id and color. Easy to use.

## Scalability - B
Pretty easy to scale up. Just pick up the object you want to expand-scale and it should easilly done as the code is modular and built this way.

## Production-readiness - A
The code is easilly deployable by just running a nodejs server and running an index.html file.
Also there is the demo at: http://labs.skoumas.com/nodeoflife/
