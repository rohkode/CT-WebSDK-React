import './App.css';
import React, { useState, useEffect } from 'react';
import clevertap from 'clevertap-web-sdk';

//To run on chrome use the command on terminal: npm start

clevertap.init('886-85W-7Z7Z', 'eu1' );

function App() {

  const [identity, setIdentity] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [customProp1, setCustomProp1] = useState('');
  const [customProp2, setCustomProp2] = useState('');
  const [customProp3, setCustomProp3] = useState('');
  const [customerType, setCustomerType] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('');

  useEffect(() => {
    // Set privacy options for CleverTap
    clevertap.privacy.push({ useIP: true });
    console.log('Privacy settings updated in CleverTap');
  
    // Get and set location if geolocation is supported
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          clevertap.getLocation(position.coords.latitude, position.coords.longitude);
          console.log("Location set in CleverTap");
        },
        (error) => console.error("Geolocation error", error)
      );
    }
  }, []);

  const triggerWebPush = () => {
  clevertap.notifications.push({
    apnsWebPushId: "<apple web push id>",
    apnsWebPushServiceUrl: "<safari package service url>",
    titleText: "Would you like to receive Push Notifications?",
    bodyText: "We promise to only send you relevant content and give you updates on your transactions",
    okButtonText: "Sign me up!",
    rejectButtonText: "No thanks",
    okButtonColor: "#F28046",
    // skipDialog: true,
    serviceWorkerPath: "/clevertap_sw.js"
  });

  console.log("Web push notifications configured in CleverTap (on click)");
};


  // Web push notification configuration
  // clevertap.notifications.push({
  //   "apnsWebPushId": "<apple web push id>",
  //   "apnsWebPushServiceUrl": "<safari package service url>",
  //   "titleText": "Would you like to receive Push Notifications?",
  //   "bodyText": "We promise to only send you relevant content and give you updates on your transactions",
  //   "okButtonText": "Sign me up!",
  //   "rejectButtonText": "No thanks",
  //   "okButtonColor": "#F28046",
  //   //"askAgainTimeInSeconds": 2, Optional
  //   "skipDialog": true, // Optional,
  //   "serviceWorkerPath": "/service-worker.js" // path to your custom service worker file
  // });
  // console.log('Web push notifications configured in CleverTap');  
  // console.log('Print Hojaaaa');

// Custom Web Inbox API

console.log("Inbox Message Count: ", clevertap.getInboxMessageCount());
// console.log("Unread Inbox Message Count: ", clevertap.getInboxMessageUnreadCount());
console.log("All Inbox Messages: ", clevertap.getAllInboxMessages());
// console.log("Unread Inbox Messages: ", clevertap.getUnreadInboxMessages());
// // console.log("Inbox Message for ID: ", clevertap.getInboxMessageForId('yourMessageId'));
// // console.log("Delete Inbox Message: ", clevertap.deleteInboxMessage('yourMessageId'));
// // console.log("Mark Read Inbox Message: ", clevertap.markReadInboxMessage('yourMessageId'));
// console.log("Mark All Inbox Messages as Read: ", clevertap.markReadAllInboxMessage());
// console.log('Print Hojaaaa pls');

  const handleLogin = () => {
    // Identify the user
    clevertap.onUserLogin.push({
      Site: {
        Identity: identity,
        Name: name,
        Email: email,
        Phone: phone
      }
    });

    console.log('User identified with CleverTap');
  };

  const handleProfilePush = () => {
    // Push additional profile data
    clevertap.profile.push({
      Site: {
        "Customer Type": customerType,
        "Preferred Language": preferredLanguage
      }
    });

    console.log('Profile data pushed to CleverTap');
  };

  const handleCustomEvent = () => {
    // Track a custom event with properties
    clevertap.event.push('ItemPurchased React', {
      itemName: customProp1,
      itemCategory: customProp2,
      purchasePrice: customProp3
    });

    console.log('Custom event pushed to CleverTap');
  };

  const handleChargedEvent = () => {
    // Push charged event
    // Generate a unique ID for each charged event
    const chargedID = new Date().getTime();
    clevertap.event.push("Charged", {
      "Amount": 300,
      "TechStack": "React Web",
      "Payment mode": "Credit Card",
      "Charged ID": chargedID,
      "Items": [
        {
          "Category": "Books",
          "Book name": "The Millionaire next door",
          "Quantity": 1
        },
        {
          "Category": "Books",
          "Book name": "Achieving inner zen",
          "Quantity": 1
        },
        {
          "Category": "Books",
          "Book name": "Chuck it, let's do it",
          "Quantity": 5
        }
      ]
    });

    console.log('Charged event pushed to CleverTap', chargedID);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My CleverTap React Web</h1>
        <div>
        <h2>Trigger OnUserLogin Function</h2>
          <input
            type="text"
            placeholder="Identity"
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={handleLogin}style={{ backgroundColor: 'red', color: 'white', padding: '5px', borderRadius: '5px' }}>Login</button>
        </div>
        <div>
          <h2>Update User Profile Properties</h2>
          <input
            type="text"
            placeholder="Customer Type"
            value={customerType}
            onChange={(e) => setCustomerType(e.target.value)}
          />
          <input
            type="text"
            placeholder="Preferred Language"
            value={preferredLanguage}
            onChange={(e) => setPreferredLanguage(e.target.value)}
          />
          <button onClick={handleProfilePush}style={{ backgroundColor: 'red', color: 'white', padding: '5px', borderRadius: '5px' }}>Update Profile</button>
        </div>
        <div>
          <h2>Trigger Custom Event</h2>
          <input
            type="text"
            placeholder="Item Name"
            value={customProp1}
            onChange={(e) => setCustomProp1(e.target.value)}
          />
          <input
            type="text"
            placeholder="Item Category"
            value={customProp2}
            onChange={(e) => setCustomProp2(e.target.value)}
          />
          <input
            type="text"
            placeholder="Purchase Price"
            value={customProp3}
            onChange={(e) => setCustomProp3(e.target.value)}
          />
          <button onClick={handleCustomEvent}style={{ backgroundColor: 'red', color: 'white', padding: '5px', borderRadius: '5px' }}>Trigger Event</button>
        </div>
        <div>
          <h2>Trigger Charged Event</h2>
          <button onClick={handleChargedEvent} style={{ backgroundColor: 'red', color: 'white', padding: '5px', borderRadius: '5px' }}>Trigger Charged Event</button>
        </div>
        <div>
          <h2>Trigger Web Push</h2>
          <button 
            onClick={triggerWebPush} 
            style={{ backgroundColor: 'red', color: 'white', padding: '5px', borderRadius: '5px' }}
          >
            Ask Notification Permission
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;