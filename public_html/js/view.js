/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
const blogoverview = {
    render(blog) {
        blog.setFormatDates(false);
        console.log("View: render von blogoverview");
        let page = document.getElementById('blogoverview').cloneNode(true);
        page.removeAttribute("id");
        helper.setNavButtonsCurrentBlog(page);
        helper.setDataInfo(page, blog);
        return page;
    }
};


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

const helper = {
    setDataInfo(element, object) {
        let cont = element.innerHTML;
        for (let key in object) {
            let rexp = new RegExp("%" + key, "g");
            cont = cont.replace(rexp, object[key]);
        }
        element.innerHTML = cont;
}};