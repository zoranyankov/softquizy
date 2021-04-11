# Have Fun and test yourself with Sofquizy React App

A JavaScript application built with React. It offers Guest and User page views. You can test yourself with slide quizzes generated from your own questions or choose a quiz from external REST-API named TRIVIA.

Own quiz questions are stored in Node.js Back-end with Mongo DB – Express and Mongoose are used.

[Go to Trivia](https://opentdb.com/)

[Try Softquizy (live demo)](http://davidra.co/react-quiz/)

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
|    └── Register
└─── User
     ├── Quizes page
     |   ├── Local Quiz (test)
     |   ├── External Quiz (test from Trivia)
     |   ├── Create question
     |   └── Choose external Quiz
     ├── Profile
     |   ├── Questions
     |   |   ├── Edit question
     |   |   └── Delete question
     |   └── Results
     └── Logout
```

Guest page
----------

Not logged users can see the three main local categories – available from Express server (Mongo database). When you click on category - application redirects to Register page where you can either Register or Login (if you already have an account).


![alt text](https://res.cloudinary.com/softquizy/image/upload/c_scale,w_600/v1618060032/GuestPage_ppysym.png)


User page
---------

Logged in users can see actual Categories (only 3 at this time) - only which have at least one question in them. In case of no question in a category – this category is not shown. If in database there is no questions at all – user is notified and pleased to create some. 


![alt text](https://res.cloudinary.com/softquizy/image/upload/c_scale,w_600/v1618059650/UserPage_fgvedj.png)


By choosing the category a Quiz (test) with 5 (when there is more than 5) random Question are rendered for a try.

After each quiz (test) a result table is shown with detailed information for every question - respectively correct answer, user answer, status of user answer and total points.

Logged in users has also access to a Profile page which has an options to shows a list with Results of tried quizzes or a list with created form surrent user Questions. Every Result or Question in the list has creaton (completion date/time) and is expandable. Every Question has also Edit and Delete buttons for managing the current Question.


![alt text](https://res.cloudinary.com/softquizy/image/upload/c_scale,w_600/v1618059654/ProfilePage_cejqo5.png)


When user wants to try some additional and more complex quizzes – he can choose from external REST-API endpoint (called Trivia) by choosing category and difficulty level. A random quiz with 10 questions is fetched from Trivia and rendered to User for a try. Result from external quizzes are also saved in Mongo database and appear in user’s profile page.

Logged in users can create own questions for one of the 3 available categories, which will be added to the chosen category. 


![alt text](https://res.cloudinary.com/softquizy/image/upload/c_scale,w_600/v1618059659/CreatePage_t8hkzt.png)



Notes
---------

For design and styling of the page are used Material UI and custom component styling as well. 
For more Info about used Material UI components follow the links:
     
* [CssBaseline](https://material-ui.com/components/css-baseline/)
* [Button](https://material-ui.com/components/buttons/)
* [Accordion](https://material-ui.com/components/accordion/)
* [Table](https://material-ui.com/components/tables/)
* [Icons](https://material-ui.com/components/material-icons/)

Warning: StrictMode is disabled, because of compatibility issues with material ui accordion component!

All images used in the application are stored via claud-base platform for image and video managing service called Claudinary. More info at the link below:

[Claudinary](https://cloudinary.com/)


