# NoSQL: Social Network API

## Table of Contents

1. Description
2. Badges
3. Visuals
4. Installation
5. Usage
6. Support
7. Contributing 
8. Authors and acknowledgment
9. License
10. Project status

## 2. Badges

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) ![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)  ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) ![Insomnia](https://img.shields.io/badge/Insomnia-black?style=for-the-badge&logo=insomnia&logoColor=5849BE) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) 

## 3. Visuals

Link to video demo of app:

.......

## 4. Installation

CODE EDITOR TERMINAL:

- npm install i
- optional: npm seed (to populate with randomly generated data)
- npm run watch OR npm run start

API routes:

#### (1) Thoughts:

<ins>localhost:3001/api/thoughts</ins>

- GET all thoughts
- POST a new thought

<ins>localhost:3001/api/thoughts/:thoughtId</ins>

- GET thought by id
- DELETE thought by id
- PUT thought by id

<ins>localhost:3001/api/thoughts/:thoughtId/reactions</ins>

- GET all reactions

<ins>localhost:3001/api/thoughts/:id/reactions/:reactionId</ins>

- DELETE reaction by id
- * this needs to be the reactionId not the _id

#### (2) Users:

<ins>localhost:3001/api/users</ins>

- GET all users
- POST a new user

<ins>localhost:3001/api/users/:userId</ins>

- GET one user by id
- PUT user by id
- DELETE user by id

<ins>localhost:3001/api/users/:userId/friends/:friendId</ins>

## 5. Usage

This is MERN-based code for the back end of a social networking app. It runs on an express server with a MongoDB database containing models for users, thoughts and associated reactions. API routes enable CRUD functionality for users, posts ('thoughts') and comments ('reactions'). It's designed for a site where users can sign up and post 'thoughts', leave 'reactions' to other users thoughts, and add other users as 'friends'.

## 6. Support

For support, users can contact tydamon@hotmail.com. Links to my github and the app repo are also in the footer of the blog.

## 8. Contributing

Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". 
1.	Fork the Project
2.	Create your Feature Branch (git checkout -b feature/NewFeature)
3.	Commit your Changes (git commit -m 'Add some NewFeature')
4.	Push to the Branch (git push origin feature/NewFeature)
5.	Open a Pull Request

## 9. Authors and acknowledgment

The author acknowledges and credits those who have contributed to this project, including:

-	https://git.bootcampcontent.com/Monash-University/MONU-VIRT-FSF-PT-11-2023-U-LOLC
-	Chee Ho Tai
-	Pranita Shrestha
- 

## 10. License

Distributed under the MIT License. See LICENSE.txt for more information.
 
## 11. Project status

This project is completed.
