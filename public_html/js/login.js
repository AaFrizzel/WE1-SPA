/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

(function () {

    var GoogleAuth;
    var SCOPE = 'https://www.googleapis.com/auth/blogger';
    let button = document.getElementById('sign-in-or-out-button');
    
    function handleClientLoad() {
        //console.log("handleClientLoad auf: " + window.location.origin);
        // Load the API's client and auth2 modules.
        // Call the initClient function after the modules load.
        gapi.load('client:auth2', initClient);
    }

    function initClient() {
        //console.log("initClient");
        // Retrieve the discovery document for version 3 of Google Drive API.
        // In practice, your app can retrieve one or more discovery documents.
        var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/blogger/v3/rest';

        // Initialize the gapi.client object, which app uses to make API requests.
        // Get API key and client ID from API Console.
        // 'scope' field specifies space-delimited list of access scopes.
        gapi.client.init({
            'discoveryDocs': [discoveryUrl],
            'clientId': '26901513547-8ae4n8ut9sh5l7839qjsknf4nminls6k.apps.googleusercontent.com',
            'scope': SCOPE
        }).then(function () {
            GoogleAuth = gapi.auth2.getAuthInstance();

            // Listen for sign-in state changes.
            GoogleAuth.isSignedIn.listen(setSigninStatus);

            // Handle initial sign-in state. (Determine if user is already signed in.)
            setSigninStatus();

            // Call handleAuthClick function when user clicks on
            //      "Sign In/Authorize" button.
            if(button) button.addEventListener('click', handleAuthClick);
        });
    }

    function handleAuthClick() {
        
        console.log("button geklickt!");
        if (GoogleAuth.isSignedIn.get()) {
            // User is authorized and has clicked 'Sign out' button.
            GoogleAuth.signOut();
        } else {
            // User is not signed in. Start Google auth flow.
            GoogleAuth.signIn();
        }
    }

    function setSigninStatus(isSignedIn) {
        var user = GoogleAuth.currentUser.get();
        var isAuthorized = user.hasGrantedScopes(SCOPE);
        let div = document.getElementById('auth-status');
        if (isAuthorized) {
            if(button) button.innerHTML = 'Abmelden'; 
            if(div) div.innerHTML = 'Angemeldet bei Google';
            console.log("---------setSigninStatus: Angemeldet---------");
            model.setLoggedIn(true);
            router.navigateToPage(window.location.pathname);
        } else {
            if(button) button.innerHTML = 'Anmelden'; 
            if(div) div.innerHTML = 'Abgemeldet bei Google';
            console.log("---------setSigninStatus: Abgemeldet---------");
            model.setLoggedIn(false);
            router.navigateToPage('/'); 
        }
    }
    
    // After Loading, handleClientLoad is called
    window.addEventListener("load", handleClientLoad);

})();