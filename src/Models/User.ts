import Book from 'Models/Book';


class User {
    //Members: 
    private bookList : Book[];
    public username : string; 
    

    //Constructor: 
    constructor (username : string) {
        this.bookList = new Array(); 
        this.username = username; 
    }


    //Add a new book to the User reading list (CREATE): 
    public addBook(title : string, author : string) {
        this.bookList.push(new Book(title, author));
    }


    //Remove a book with a specific title and author from User reading list (DELETE): 
    public removeBook(title : string, author : string) {
        const removedBook = this.bookList.filter((book) => {
            return this.bookMatches(book, title, author) === false; 
        })

        return removedBook; 
    }


    //Retrieve all currently available books (READ): 
    public getBookList () {
        return this.bookList; 
    }


    //Update Book information based on title and author (UPDATE) 
    public updateBookInfo (newTitle : string, newAuthor : string) {
        for (let book of this.bookList) {
            if (this.bookMatches(book, newTitle, newAuthor)) {
                book.title = newTitle; 
                book.author = newAuthor;
            }
        }
    }


    //Transfer a book from one User reading list to another (While retaining book): 
    public transferBook (user : User, title : string, author : string) {
        user.addBook(title, author); 
    }



    //Match a book to a title and author: 
    private bookMatches (book : Book, title : string, author : string) {
        if (book.title === title && book.author === author)
            return true; 
        else 
            return false; 
    }
}

export default User; 