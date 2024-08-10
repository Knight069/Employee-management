# Micro HRMS Application

## Introduction

Micro HRMS (Human Resource Management System) is a web application designed to automate the attendance management process for small to medium-sized companies. It reduces manual involvement by providing functionalities for both superusers (admins) and employees. The application features attendance marking, leave management, and attendance reporting.

## Features

### Superuser (Admin) Features:
- Add, edit, delete employees
- View attendance records of all employees
- Approve or disapprove employee leave requests

### Employee Features:
- Login using assigned ID and password
- Mark attendance (login and logout)
- Apply for leave (up to one year in advance)
- View personal attendance records

### Business Logic for Attendance:
- Logout before 5 hours: Absent
- Logout between 5 and 9 hours: Half-day
- Logout between 9 and 10 hours: Present
- Logout after 10 hours: Over-time

## Technology Stack
- **Frontend:** ReactJS, Bootstrap/Tailwind CSS
- **Backend:** MongoDB

## Screens and Features:
- **Registration Screen:** For employee registration with fields for name, email, password, department, designation, employee code, and office timings.
- **Login Screen:** Common for both Admin and Employees.
- **Admin Dashboard:** Add/edit/delete employees, approve/disapprove leaves, print attendance reports.
- **Employee Dashboard:** Mark login/logout, apply for leave, print self-attendance report.
- **Calendar Integration:** Google Calendar-like interface to display attendance.

## Project Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation Steps

1. **Clone the Repository**
    ```bash
    git clone https://github.com/knight069/Employee-management.git
    cd Employee-management
    ```

2. **Install Frontend Dependencies**
    ```bash
    cd frontend
    npm install
    ```

3. **Install Backend Dependencies**
    ```bash
    cd ../backend
    npm install
    ```

<!-- 4. **Setup Environment Variables**
    Create a `.env` file in the `server` directory with the following content:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ``` -->

5. **Run the Backend Server**
    ```bash
    node index.js
    ```

6. **Run the Frontend Application**
    ```bash
    cd ../frontend
    npm run dev
    ```

7. **Access the Application**
    Open your browser and navigate to `http://localhost:5173`.

## Directory Structure
micro-hrms/
├── frontend/ # ReactJS Frontend
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── App.jsx
│ └── main.jsx
├── backend/ # Node.js Backend
│ ├── routes/
│ ├── config.js
│ ├── middleware.js
│ ├── index.js
│ └── db.js
├── README.md
└── Dockerfile


## Design Decisions
- **ReactJS** was chosen for the frontend due to its component-based architecture, which allows for efficient and reusable UI components.
- **Bootstrap/Tailwind CSS** was used for rapid and responsive UI development.
- **MongoDB** was selected as the database for its flexibility and scalability in handling various data types.

## Challenges Faced
- **ACL Implementation:** Ensuring proper access control for different user roles was a key challenge, which was addressed by implementing middleware to check user roles and permissions.
- **Attendance Business Logic:** Implementing the attendance marking rules required careful handling of edge cases and proper testing to ensure accuracy.
- **Calendar Integration:** Creating a Google Calendar-like interface for attendance display required integrating third-party libraries and customizing them to fit the application's requirements.

## Future Improvements
- Adding notifications for leave approval/rejection.
- Implementing role-based dashboards with more detailed analytics.
- Enhancing the user interface for better usability and aesthetics.

## Video Demonstration
(Optional but recommended) - A short video demonstrating the application's functionality can be found [here](link_to_video).

## Contributing
We welcome contributions to enhance the functionality and user experience of this application. Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
