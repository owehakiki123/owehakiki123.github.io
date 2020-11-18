var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BAzxf8zYwdyvGSR5WQw-IgENtsgdf68wkP-gwmQ7FOh5GwksdhSAW4E-0bGhitIx7ZmzC8_7Ic8hz9wLzwtiDXo",
   "privateKey": "TGJtFVzbKR1b1kkWeHBO7WU3sGN_oraGjoN-cseJAJo"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fXxj8Yzwhu4:APA91bF32Y2OMTQHJFTKCO3SE7OgQ6v4QFSpn5c4tW0JDykMTPh7qZJiMZmKcDRHImPLKgwe0Y79wJWuHLnrBmOWjls-XrDK-dCskDdoZCNNZ5b4D10d5YM-i6ljKX1tVsxt-5vWdPor",
   "keys": {
       "p256dh": "BG0N6xNFebKrv0uMp6S2f6V3SBbP1gbIhQmkBksOOM0btr4nlGwJxrKlmkQPGJCu+yAwXEy+2q9RUszucAss+YA=",
       "auth": "pVF32QFC+E1BYFMSis37ow=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '160660235605',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
).then ((success)=>{
    console.log(success)
})
.catch ((error)=>{
    console.log(error)
})