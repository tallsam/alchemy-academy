# ECDSA Node

Alchemy Academy Solidity Course Week One Project

The goal of the project was to make the front end sign a message, send the message / signature / recovery bit to the backend, and have the backend verify the signature before transferring the tokens.

The application is preloaded with the following accounts:


private key:  02165ef9df244e707bf1d708a55c2c4d51a5e0a94a43bbe4432707644acef768
public key:  0486079460cfc0a0dc36717760a890c4c272f4843324c87599805d63111d35ece7af9c19837ad9bc1b78be5e2f4680db6f8478c18a9388f9b8ebdd9c93c832deea
address:  0xa8e74d5a5fa82e001427df7a6f75321800aaaf7f

private key:  1f6945a43aa4b0e8b895252412074dd2b7f915e723b9584b67898eab3e8cdd17
public key:  04ec4b2acf8893c01f233b464694d68849d894be04e1004ae9fd700bc1a008a16cdd84bf53861db304b55dd45045b11b85e1fba2c99f4f5e314f14c67656d24625
address:  0xe6e490734d59b475597bfe9a9ff966427587b014

private key:  09abe10262851e1f88e87b4bbd55a04532dae5be884a5630c33ceaf3a88660ed
public key:  04e2433896a35f9d9c8f6cbc495fbd44430c4d670c25479e14295325830a8fb87e14b8900ce7638cd47e25547f1322276ebe55ed1f774abbfec9152e013d113e5c
address:  0xac75b25baee72dd852993f587de0f44dbac6c623

Don't use these on mainnet :|

Below is the default readme:

## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.
