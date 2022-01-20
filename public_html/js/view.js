/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";


const blogOverview = {
    render (blogs){
        //blogs.setFormatDates(false);
        let page = document.getElementById('startseite').cloneNode(true);
        page.removeAttribute("id");
        let ul = page.querySelector("ul");
        let liFC = ul.firstElementChild;
        let li = liFC.cloneNode(true);
        for(let key in blogs){
            
            ul.appendChild(li)
            helper.setDataInfo(ul,blogs[key]);
            
        } 
        return page;
    }
};


const detail = {
    render(post,comments){
        //blog.setFormatDates(true);
        console.log("Rendering DetailPost");
        let page = document.getElementById('detailPost').cloneNode(true);
        page.removeAttribute("id");

        if (comments) {
            let commentsOfPost = document.getElementById('comments').cloneNode(true);
            commentsOfPost.removeAttribute('id');

            let ul = commentsOfPost.querySelector("ul");
            let liTempl = ul.firstElementChild;
            liTempl.remove();

            for (let comment of comments) {
                //comment.setFormatDates(true);

                let li = liTempl.cloneNode(true);
                ul.appendChild(li);
                helper.setDataInfo(li, comment);
            }
            page.appendChild(commentsOfPost);
        }else{
            console.log("No Comment found!");
        }
        helper.setDataInfo(page, post);
        return page;





    }
};

/*
const detail = {
    render(post, comments) {
        post.setFormatDates(true);
        console.log("View: render von detail");
        let detail = document.getElementById('detail').cloneNode(true);
        detail.removeAttribute("id");


        if (comments) {
            let commentsOfPost = document.getElementById('comments').cloneNode(true);
            commentsOfPost.removeAttribute('id');
            let ul = commentsOfPost.querySelector("ul");
            let liTempl = ul.firstElementChild;
            liTempl.remove();
            for (let comment of comments) {
                comment.setFormatDates(true);
                let li = liTempl.cloneNode(true);
                ul.appendChild(li);
                helper.setDataInfo(li, comment);
            }
            detail.appendChild(commentsOfPost);
        } else {
            let noContent = document.getElementById("noContent").cloneNode(true);
            noContent.removeAttribute("id");
            detail.appendChild(noContent);
        }
        helper.setDataInfo(detail, post);
        return detail;
    }
};
*/

const helper = {
    setDataInfo(element, object) {
        let cont = element.innerHTML;
        for (let key in object) {
            let rexp = new RegExp("%" + key, "g");
            cont = cont.replace(rexp, object[key]);
        }
        element.innerHTML = cont;
}};