/* 
 * 
 /*
 * Adresse über die man auf die Webschnittstelle meines Blogs zugreifen kann:
 */
"use strict";
const model = (function () {
    // Private Variablen
    let loggedIn = false;

    let pathGetBlogs = 'blogger/v3/users/self/blogs';
    let pathBlogs = 'blogger/v3/blogs';
    
    // Private Funktionen 

    // Formatiert den Datum-String in date in zwei mögliche Datum-Strings: 
    // long = false: 24.10.2018
    // long = true: Mittwoch, 24. Oktober 2018, 12:21
    function formatDate(date, long) {
        // Hier kommt Ihr Code hin
        let lokal = "de-DE";
        let newDate = new Date(date);
        if(long){
            var long = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            };
            return newDate.toLocaleString(lokal,long);
        }else{
            var short = {
                day: '2-digit',
                month:'2digit',
                year: 'numeric',
            };
            return newDate.toLocaleString(lokal,short);
        }
    }
    
    // Konstruktoren für Daten-Objekte
    
    //UBG 6.2---->


    function Blog(blogID, blogName, postAmount, published, update, url){
        this.blogId = blogID;
        this.blogName = blogName;
        this.postAmount = postAmount;
        this.published = published;
        this.update = update;
        this.url = url;
    }

    Blog.prototype = {
        constructor: Blog,
        setFormatDates: function(long){
            if(long){
                this.formatPublished = formatDate(this.published, long);
                this.formatUpdated = formatDate(this.updated, long);

            }else{
                this.formatPublished = formatDate(this.published, long);
                this.formatUpdated = formatDate(this.updated, long);
            }
        }
    };


    function Post (postID, blogID, title, published, update, content,comments){
        this.postID = postID;
        this.blogID = blogID;
        this.title = title;
        this.published = published;
        this.update = update;
        this.content = content;
        this.comments = comments;
    }

    Post.prototype = {
        constructor: Blog,
        setFormatDates: function (long) {
            if (long) {
                this.formatPublished = formatDate(this.published, long);
                this.formatUpdated = formatDate(this.updated, long);
            } else {
                this.formatPublished = formatDate(this.published, long);
                this.formatUpdated = formatDate(this.updated, long);
            }
        }
    };

    function Comment (commentID, postID, blogID, author, published, content){
        this.commentID = commentID;
        this.postID = postID;
        this.blogID = blogID;
        this.author = author;
        this.published = published;
        this.content = content;
    }

    Comment.prototype = {
        constructor: Blog,
        setFormatDates: function (long) {
            if (long) {
                this.formatPublished = formatDate(this.published, long);
            } else {
                this.formatPublished = formatDate(this.published, long);
            }
        }
    };
  

    function User(name){
        this.name = name;
    }




    // Oeffentliche Methoden
    return {
        // Setter für loggedIn
        setLoggedIn(b){
            loggedIn = b;
        },
        // Getter für loggedIn
        isLoggedIn(){
            return loggedIn;
        },
        // Liefert den angemeldeten Nutzer mit allen Infos
        getSelf(callback) {
            var request = gapi.client.request({
                'method': 'GET',
                'path': 'blogger/v3/users/self'
            });
            // Execute the API request.
            request.execute((user) => {
                callback(new User(user.name));
            });
        },

        // Liefert alle Blogs des angemeldeten Nutzers
        getAllBlogs(callback) {
            var request = gapi.client.request({
                'method': 'GET',
                'path': pathGetBlogs
            });
            // Execute the API request.
            let blogsArray = [];

            request.execute((result) => {
                if(result.hasOwnProperty("items")){
                    for(let blog of result.items){
                        blogsArray.push(new Blog(blog.id, blog.name, blog.posts.items, blog.published, blog.updated, blog.url))
                    }
                    callback(blogsArray);
                }else {
                    callback(undefined);
                }
            });
        },

        // Liefert den Blog mit der Blog-Id bid
        getBlog(bid, callback) {
            var request = gapi.client.request({
                'method': 'GET',
                'path': pathBlogs + "/" + bid
            });
            // Execute the API request.
            request.execute((result) => {
                let blog = new(result.id, result.name, result.posts.items,result.published, result.updated, result.url);
                callback(blog);
            });
        },

        // Liefert alle Posts zu der  Blog-Id bid
        getAllPostsOfBlog(bid, callback) {
            var request = gapi.client.request({
                'method': 'GET',
                'path': pathBlogs + "/" + bid + '/posts'
            });
            let postsArray = [];
            request.execute((result) => {
                if(result.hasOwnProperty("items")){
                    for (let post of result.items){
                        postsArray.push(new Post(post.id, post.blod.id, post.title, post.published, post.updated, post.content, post.replies.totalItems));
                    }
                    callback(postsArray);
                }else{
                    callback(undefined);    
                }
                
            });
        },

        // Liefert den Post mit der Post-Id pid im Blog mit der Blog-Id bid
        getPost(bid, pid, callback) {
            var request = gapi.client.request({
                'method': 'GET',
                'path': pathBlogs + "/" + bid + '/posts/' + pid
            });

            request.execute((result) => {
                callback(new Post(result.id, result.blog.id, result.title, result.published, result.updated,result.content, result.replies.totalItems));
            });
        },

        // Liefert alle Kommentare zu dem Post mit der Post-Id pid 
        // im Blog mit der Blog-Id bid
        getAllCommentsOfPost(bid, pid, callback) {
            var request = gapi.client.request({
                'method': 'GET',
                'path': pathBlogs + "/" + bid + '/posts/' + pid + "/comments"
            });
            let commentsArray = [];

            request.execute((result) => {
                if(result.hasOwnProperty("items")){
                    for(let comment of result.items){
                        commentsArray.push(new Comment(comment.id, comment.blog.id,comment.post.id, comment.author.username, comment.updated, comment.content)); 
                    }
                    callback(commentsArray);
                }else{
                    callback(undefined);
                }

                
            });
        },
    };
})();



