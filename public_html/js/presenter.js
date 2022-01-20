/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global model, blogoverview, allBlogs, router, allPosts, edit, detail */


"use strict";
const presenter = (function () {
    // Private Variablen und Funktionen
    let init = false;
    let blogId = -1;
    let postId = -1;
    let owner = undefined;
    
    
    function initNav(){
       model.getAllBlogs((blogs) => {
        let page = blogOverview.render(blogs, owner);
        replace('navbar', page);
       });
    };
    

    // Initialisiert die allgemeinen Teile der Seite
    function initPage() {
        console.log("Presenter: Aufruf von initPage()");
                 
        // Nutzer abfragen und Anzeigenamen als owner setzen
        model.getSelf((result) => {
            owner = result;
            console.log(`Presenter: Nutzer*in ${owner.displayName} hat sich angemeldet.`);
        });


        initNav();

        //blogoverview.render
        //detail.render

        // List all blogs for Blogoverview
        model.getAllBlogs((blogs) => {                      
           //let nav = document.getElementById('main-content')

            blogId = blogs[0].blogId;
            model.getAllPostsOfBlog(blogId, (posts) => {
                console.log("--------------- Alle Posts des ersten Blogs --------------- ");
                if (posts.length == 0)
                    return;
                    postId = posts[0].postID;
                model.getAllCommentsOfPost(blogId, postId, (comments) => {
                    let posts = detail.render(postId, comments);    
                    replace('main-content', posts);
 
                    
                
                    console.log("--------------- Alle Comments des zweiten Post --------------- ");
                    if (!comments)
                        return;
                    for (let c of comments) {
                        console.log(c);
                    }
                });
            });
            init = true;
        });
        
        // Das muss später an geeigneter Stelle in Ihren Code hinein.
        init = true;
        //Falls auf Startseite, navigieren zu Uebersicht
        if (window.location.pathname === "/")
            router.navigateToPage('/blogOverview/' + blogId);
    }


    // Sorgt dafür, dass bei einem nicht-angemeldeten Nutzer nur noch der Name der Anwendung
    // und der Login-Button angezeigt wird.
    function loginPage() {
        console.log("Presenter: Aufruf von loginPage()");
        if(owner!== undefined){
            console.log(`Presenter: Nutzer*in ${owner} hat sich abgemeldet.`);
            replace('main-content', undefined);
            replace('navbar', undefined);
        }
        init = false;
        blogId = -1;
        postId = -1;
        owner = undefined;
    }
    
    function replace(id, element){
        let main = document.getElementById(id);
        let content = main.firstElementChild;
        
        if(content){
            content.remove();
        }    
        if(element){
            main.append(element);
        }
    }
    function handleClicks(event){
        //clicks auf a-tags, Elemenete und Buttons,
        // welche in Li-tag eingebunden sind.
        
    }
   


    //Oeffentliche Methoden
    return {
        // Wird vom Router aufgerufen, wenn die Startseite betreten wird
        showStartPage() {
            console.log("Aufruf von presenter.showStartPage()");
            // Wenn vorher noch nichts angezeigt wurde, d.h. beim Einloggen
            if (model.isLoggedIn()) { // Wenn der Nutzer eingeloggt ist
                initPage();
            }
            if (!model.isLoggedIn()) { // Wenn der Nuzter eingelogged war und sich abgemeldet hat
                //Hier wird die Seite ohne Inhalt angezeigt
                loginPage();
            }
        },

        // Wird vom Router aufgerufen, wenn eine Blog-Übersicht angezeigt werden soll
        showBlogOverview(bid) {
           console.log(`Aufruf von presenter.showBlogOverview(${blogId})`); 
        }
    };
})();
