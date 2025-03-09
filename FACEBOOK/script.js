// Load Facebook SDK
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  
  // Initialize Facebook SDK
  window.fbAsyncInit = function() {
    FB.init({
      appId     : 'YOUR_APP_ID',  // Replace with your Facebook App ID
      cookie    : true,           // Enable cookies to allow the server to access the session
      xfbml     : true,           // Parse social plugins on this webpage
      version   : 'v16.0'         // Use the latest Facebook Graph API version
    });
  
    // Check user login status
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  };
  
  // Callback function to handle login status
  function statusChangeCallback(response) {
    if (response.status === 'connected') {
      console.log('User is logged in and connected to Facebook.');
    } else if (response.status === 'not_authorized') {
      console.log('User is logged into Facebook but not authorized.');
    } else {
      console.log('User is not logged into Facebook.');
    }
  }
  
  // Login function
  function facebookLogin() {
    FB.login(function(response) {
      if (response.authResponse) {
        console.log('Welcome! Fetching your information....');
        FB.api('/me', function(response) {
          console.log('Good to see you, ' + response.name + '.');
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {scope: 'public_profile,email'});
  }
  
  // Logout function
  function facebookLogout() {
    FB.logout(function(response) {
      console.log('User logged out.');
    });
  }
  const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// محاكاة للتحقق من الطلبات من Facebook
app.get('/callback', (req, res) => {
  let VERIFY_TOKEN = "your_verify_token_here";
  // التحقق من صحة الطلب الوارد من Facebook
  if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === VERIFY_TOKEN) {
    console.log("Webhook verified!");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.sendStatus(403); // Unauthorized
  }
});

// الاستماع على المنفذ
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
