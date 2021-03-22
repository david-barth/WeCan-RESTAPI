class Book {
    //Members: 
    public title : string; 
    public author : string; 


    //Constructor: 
    constructor (title : string, author : string) {
        this.title = title; 
        this.author = author; 
    }

    //Check for blank author / book titles:  
    public static validateBook(title : string, author : string) { 
        if (!author || author === "") {
            return {message : "The author is either blank or not entered correctly", code : 422};
        }

        else if (!title || title === "") {
            return {message : "The title is either blank or not entered correctly", code : 422};
        }

        else if ((!author || author === "") && (!title || title === "")) {
            return {message : "Something is wrong with both title and author", code : 422};
        }
    }

    
}


export default Book; 