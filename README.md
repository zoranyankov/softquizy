# Have Fun and test yourself with Sofquizy React App

A JavaScript application built with React. It offers Guest and User page views. You can test yourself with slide quizzes generated from your own questions or choose a quiz from external REST-API named TRIVIA.

Own quiz questions are stored in Node.js Back-end with Mongo DB – Express and Mongoose are used.

[Go to Trivia](https://opentdb.com/)

[Try Softquizy](http://davidra.co/react-quiz/)

Getting Started
---------------

```shell
$ git clone https://github.com/davidrayoussef/react-quiz.git

For client side
$ cd client
$ npm install
$ npm start

For server side
$ cd server
$ npm install
$ npm start

```

App Structure
-------------

```
QuizApp
├───Guest
|    ├── Quizes page
|    ├── Login
|    |   └── Question
|    |       └── Answer
|    └── Register
└─── User
     ├── Quizes page
     ├── Profile
     |   ├── Questions
     |   └── Results
     ├── Create question
     ├── Choose external Quiz
     └── Logout
```

Guest page
----------

Not logged users can see the three main local categories – available from Mongoose database. When you click on category - application redirects to Login page where you can either Login or Register (if you still do not have an account.

User page
---------
Logged in users can see actual Categories (only 3 at this time) that have at least one question in them. In case of no question in a category – this category is not shown. If in database there is no questions at all – user is notified and pleased to create some. 

After each quiz result page is shown with all correct answers, status of user answer and total points.

Logged in users has also a Profile page which shows a list with Results of tried quizzes.

When user wants to try some additional quizzes – he can choose from external REST-API by choosing category and difficulty level. A random quiz with 10 questions is fetched from Trivia and showed to User for a try. Result from external quizzes are also saved and shown in user’s profile page.

Logged in users can create own questions for one of the 3 available categories, which will be added to the chosen category. 

