# Holiday Planner

Holiday Planner is a web application that helps you manage events and holidays. You can create, edit, delete, and view events, as well as print information about them. The application is responsive and can be used on any device.

## Technologies

- React
- TypeScript
- Material UI
- Node.js

## Requirements

- [Node.js](https://nodejs.org/) v18 (recommended to install via nvm)

## Installation & run

1. Clone the project from GitHub:
```
git clone https://github.com/profparedes/holiday-planner.git
```

2. Copy the environment file:

```
cp .env.example .env
```
3. Install dependencies:
```
yarn
```
4. Start the API:
```
yarn start:api
```
5. Start the application:
```
yarn start:api
```

## Features

- **Create**: Create new events with title, description, start date, end date, location, and participants. You can add new participants to the event.

- **Read**: Events are displayed in a card format on the main screen of the application, in a responsive manner.

- **Update**: Events can be updated in any field, including removing participants.

- **Delete**: Events can be deleted, with a confirmation modal before deletion.

- **Printing**: You can print information about any event by clicking the "Print" button on the event card.

---

## Notes

- This application utilizes an internal API for CRUD operations.
- The application code is available on GitHub: https://github.com/profparedes/holiday-planner.git

### Contributing:

Feel free to contribute to the project! Fork the repository on GitHub and submit your pull requests.

### Support:

If you encounter any issues with the application, please open an issue on GitHub: https://support.google.com/webmasters/thread/176251023/outdated-content-removal-invalid-url?hl=en

*Thank you for using Holiday Planner!*
