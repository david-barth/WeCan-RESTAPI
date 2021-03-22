# WeCan-RESTAPI

# Book CRUD REST API:  WeCan Technical Assignment submission. 

A RESTful API that follows an MVC architecture, which allows users to add / edit / remove books from their own book lists or to transfer books between each other.  No actual database is used, but a "UserBank" object instance is used globally in runtime to store and manage users.  Consequently, no data persistence exists when the runtime is terminated and the user list will refresh. Developed using TypeScript and Node/ExpressJS. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


### Setting up the development environment: 

1.  To pull the project from the repo, use: 

```
git clone https://github.com/david-barth/WeCan-RESTAPI
```

2.  In the root of the local repo clone, use: 

```
npm install
```

(OPTIONAL):  If a production build is desired, create a "dist" directory with: 

```
mkdir build 
```

and then run the command : 

```
npm run build
```


3. To run the development server, run: 

```
npm run dev
```


## Models: 

1. UserBank: Stores users in an array of User objects, acting as a defacto database. 

```
Members: 

users : User[]
```

2. User: Stores books in an array of Book objects. Contains CRUD methods for manipulating book objects in the book list
 
```
Members: 

bookList : Book[];
username : string; 
```
 
 
3. Book: Contains author and titles of real world books: 

```
Members: 

title : string; 
author : string; 
```


## Routes: 

A.  Create a new book: 

```
POST: '/user/:username/transferBook'
```

B. Retrieve the current book list of the user: 

```
GET: '/user/:username/getBooks'
```

C. Edit the title or author of the book: 

```
PATCH: '/user/:username/editBook'
```

D. Delete a book from the user's book list: 

```
DELETE: '/user/:username/deleteBook'
```

E. Create a new user and add them to the UserBank: 

```
POST: '/user/:newUsername'
```


F. Copy / transfer a book from one user's book list to the book list of another user: 

```
GET: '/user/:username/transferBook'
```
