Here's a sample README.md file for your CT-WebSDK-React project based on the provided code:

```markdown
# CT-WebSDK-React

## Overview
CT-WebSDK-React is a React web application integrated with CleverTap's Web SDK for user analytics and engagement.

## Getting Started
To get started with CT-WebSDK-React, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/RohitKhandka/CT-WebSDK-React.git
   ```
2. Install dependencies:
   ```bash
   cd CT-WebSDK-React
   npm install
   ```
3. Configure CleverTap:
   - Obtain your CleverTap account ID and region-specific CleverTap account endpoint.
   - Update the CleverTap initialization code in `App.js` with your account ID and endpoint.
   - Configure Web push notification settings in the initialization code.

## Usage
Once the project is set up, you can use the following features:

- **User Identification:** Identify users with their identity, name, email, and phone number using the `handleLogin` function.
- **Profile Properties:** Update user profile properties such as customer type and preferred language using the `handleProfilePush` function.
- **Custom Events:** Trigger custom events with properties such as item name, category, and purchase price using the `handleCustomEvent` function.
- **Charged Events:** Trigger charged events with detailed information such as the amount, payment mode, items purchased, etc., using the `handleChargedEvent` function.

## Contributing
Contributions to CT-WebSDK-React are welcome! If you find any issues or have suggestions for improvements, feel free to submit a pull request.
