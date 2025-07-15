import './App.css';
import React, { useState, useEffect } from 'react';
import clevertap from 'clevertap-web-sdk';

// Initialize CleverTap
clevertap.init('886-85W-7Z7Z', 'eu1');

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
    clevertap.privacy.push({ useIP: true });
    console.log('Privacy settings updated in CleverTap');

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

  // ✅ Moved to button click for Safari: user gesture required
  const handlePushPermission = () => {
    clevertap.notifications.push({
      apnsWebPushId: "web.com.example.domain", // 🔁 Replace with your Website Push ID
      apnsWebPushServiceUrl: "https://yourdomain.com/pushPackage", // 🔁 Replace with your Safari push package URL
      titleText: "Would you like to receive Push Notifications?",
      bodyText: "We promise to only send you relevant content and updates",
      okButtonText: "Sign me up!",
      rejectButtonText: "No thanks",
      okButtonColor: "#F28046",
      serviceWorkerPath: "/service-worker.js" // ✅ Replace if you're using a different service worker
    });

    console.log("Notification prompt triggered from button click");
  };

  const handleLogin = () => {
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
    clevertap.profile.push({
      Site: {
        "Customer Type": customerType,
        "Preferred Language": preferredLanguage
      }
    });
    console.log('Profile data pushed to CleverTap');
  };

  const handleCustomEvent = () => {
    clevertap.event.push('ItemPurchased React', {
      itemName: customProp1,
      itemCategory: customProp2,
      purchasePrice: customProp3
    });
    console.log('Custom event pushed to CleverTap');
  };

  const handleChargedEvent = () => {
    const chargedID = new Date().getTime();
    clevertap.event.push("Charged", {
      "Amount": 300,
      "TechStack": "React Web",
      "Payment mode": "Credit Card",
      "Charged ID": chargedID,
      "Items": [
        { "Category": "Books", "Book name": "The Millionaire next door", "Quantity": 1 },
        { "Category": "Books", "Book name": "Achieving inner zen", "Quantity": 1 },
        { "Category": "Books", "Book name": "Chuck it, let's do it", "Quantity": 5 }
      ]
    });
    console.log('Charged event pushed to CleverTap', chargedID);
  };

  // 🔍 Debug logs
  console.log("Inbox Message Count: ", clevertap.getInboxMessageCount());
  console.log("All Inbox Messages: ", clevertap.getAllInboxMessages());
  console.log("Mark All Inbox Messages as Read: ", clevertap.markReadAllInboxMessage());

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My CleverTap React Web</h1>

        <div>
          <h2>Trigger OnUserLogin Function</h2>
          <input type="text" placeholder="Identity" value={identity} onChange={(e) => setIdentity(e.target.value)} />
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <button onClick={handleLogin} style={buttonStyle}>Login</button>
        </div>

        <div>
          <h2>Update User Profile Properties</h2>
          <input type="text" placeholder="Customer Type" value={customerType} onChange={(e) => setCustomerType(e.target.value)} />
          <input type="text" placeholder="Preferred Language" value={preferredLanguage} onChange={(e) => setPreferredLanguage(e.target.value)} />
          <button onClick={handleProfilePush} style={buttonStyle}>Update Profile</button>
        </div>

        <div>
          <h2>Trigger Custom Event</h2>
          <input type="text" placeholder="Item Name" value={customProp1} onChange={(e) => setCustomProp1(e.target.value)} />
          <input type="text" placeholder="Item Category" value={customProp2} onChange={(e) => setCustomProp2(e.target.value)} />
          <input type="text" placeholder="Purchase Price" value={customProp3} onChange={(e) => setCustomProp3(e.target.value)} />
          <button onClick={handleCustomEvent} style={buttonStyle}>Trigger Event</button>
        </div>

        <div>
          <h2>Trigger Charged Event</h2>
          <button onClick={handleChargedEvent} style={buttonStyle}>Trigger Charged Event</button>
        </div>

        <div>
          <h2>Enable Push Notifications</h2>
          <button onClick={handlePushPermission} style={{ ...buttonStyle, backgroundColor: 'green' }}>
            Enable Push
          </button>
        </div>
      </header>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: 'red',
  color: 'white',
  padding: '5px',
  borderRadius: '5px',
  marginTop: '8px'
};

export default App;