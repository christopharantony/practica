# Practica 

A professional network application for job seekers to reach out to potential employers.  

[ List of Modules ](https://docs.google.com/document/d/1_7EbBDLthNxxH4HvrGBEpsTBX81PB2MI/edit?usp=sharing&ouid=105530979048078064266&rtpof=true&sd=true)  
[ API Documentation ](https://docs.google.com/document/d/19h332jI7v8OZB1lHh4J8UVrs1XUtulLW/edit?usp=sharing&ouid=105530979048078064266&rtpof=true&sd=true)  
### Figma Prototype  
[ Interviewee ](https://www.figma.com/proto/RYFLZelOZUUDBzneBEhV2x/Second-Project?node-id=0%3A3&starting-point-node-id=0%3A3&scaling=scale-down&show-proto-sidebar=1)   
[ Interviewer ](https://www.figma.com/proto/RYFLZelOZUUDBzneBEhV2x/Second-Project?node-id=129%3A1770&starting-point-node-id=129%3A1770&scaling=scale-down&show-proto-sidebar=1)  
[ Admin ](https://www.figma.com/proto/RYFLZelOZUUDBzneBEhV2x/Second-Project?node-id=157%3A1116&starting-point-node-id=157%3A1116&scaling=scale-down&show-proto-sidebar=1)   


## Frontend Installation

Use the package manager [npm](https://www.npmjs.com/) to install dependencies.

```bash
cd frontend\ 
npm i
```
## Backend Installation

Install [Node](https://nodejs.org/en/)    (  [Documentation](https://medium.com/devops-with-valentine/how-to-install-node-js-and-npm-on-windows-10-windows-11-139442f90f12) )

Use the package manager [npm](https://www.npmjs.com/) to install dependencies.

```bash
cd backend\ 
npm i
```
Create one file name as ".env" and add the below contents

PORT = 4000                                 //  Port for run the server

JWT_SECRET = "Super Key"                          //  This secret key is private to you which means you will never reveal that to the public or inject inside the JWT token.   

MONGOURL= mongodb://localhost:27017/practica   

( Cloudinary is an end-to-end image- and video-management solution for websites and mobile apps )   

CLOUD_NAME                             //  Cloudinary > Account Details > Cloud name.  
API_KEY                                //  Cloudinary > Account Details > API_KEY.  
API_SECRET                             //  Cloudinary > Account Details > API_SECRET. 


<img width="300" alt="image" src="https://user-images.githubusercontent.com/99424113/187027920-d84a9df4-40f8-4911-a2d0-97ad8f24710a.png">   


## Usage

```js
# change directory to backend
cd backend\  

# start the server
npm start

# change directory to frontend
cd frontend\  

# start the server
npm start


```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
christopharantony@gmail.com 
