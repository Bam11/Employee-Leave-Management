# Employee Leave Management System

## Overview

The Employee Leave Management System is a web-based application designed to simplify and manage employee leave requests within an organization.

The system allows employees to request leave, view their leave history and leave balance, while managers can review, approve, or reject requests from employees under their supervision.

Administrators have system-wide access to manage users, assign managers, manage user roles, and oversee leave requests.

The project consists of a frontend application and a backend API that work together to provide a complete leave management workflow.

---

## Features

- User authentication and authorization
- Role-based access control
- Employee leave request submission
- Leave request tracking
- Leave request cancellation
- Leave balance management
- Manager approval and rejection of leave requests
- Admin user management
- Manager assignment
- User role management
- Leave status tracking
- Validation of leave requests
- Prevention of overlapping leave requests
- Automatic leave balance deduction after approval
- Team-based leave request management
- RESTful API integration
- Responsive user interface

---

# User Roles

The system has three main user roles:

### Employee

Employees can:

- Log in to their account.
- Access their personal dashboard.
- Submit leave requests.
- Select a leave type.
- Enter start and end dates.
- Provide a reason for the leave.
- View their own leave requests.
- Filter leave requests by status.
- Track the status of their requests.
- Cancel pending leave requests.
- View their leave balance.
- View allocated, used, and remaining leave days.

### Manager

Managers can:

- Access the manager dashboard.
- View leave requests from employees assigned to them.
- Filter requests by status.
- View leave request details.
- Approve pending leave requests.
- Reject pending leave requests.
- Monitor leave requests from their team.

### Admin

Administrators have system-wide access.

Admins can:

- Access the admin dashboard.
- View all registered users.
- View employee and manager information.
- Assign managers to employees.
- Change user roles.
- View and manage leave requests.
- Approve or reject leave requests.
- Manage users across the system.
- Oversee the overall leave management system.

---

# Frontend

The frontend provides the user interface through which Employees, Managers, and Administrators interact with the system.

The interface is role-based, meaning that users see features and pages according to their assigned role.

## Frontend Features

### Authentication

- Login interface
- User authentication
- Role-based access
- Protected pages and dashboards

### Employee Interface

The Employee dashboard allows employees to:

- View their leave balance.
- Submit leave requests.
- View leave request history.
- Track request status.
- Cancel pending requests.
- View leave information.

### Manager Interface

The Manager dashboard allows managers to:

- View their team's leave requests.
- Filter requests by status.
- View request details.
- Approve requests.
- Reject requests.
- Monitor team leave activity.

### Admin Interface

The Admin dashboard allows administrators to:

- View all users.
- Manage users.
- Assign managers.
- Change user roles.
- View leave requests.
- Approve or reject requests.
- Manage the overall system.

## Frontend Pages

The frontend includes role-specific pages such as:

- Login / Authentication
- Employee Dashboard
- Manager Dashboard
- Admin Dashboard
- Leave Request Page
- Leave Request History
- Leave Balance
- Team Leave Requests
- User Management
- Manager Assignment
- Role Management

---

# Backend

The backend handles the application's business logic, authentication, authorization, API requests, leave management, user management, validation, and database operations.

The backend exposes RESTful API endpoints that allow the frontend to communicate with the system.

---

## Employee API

### Employee Capabilities

Employees can:

- Submit leave requests.
- View their own leave requests.
- Filter their requests by status.
- Cancel pending requests.
- View their leave balances.

| Method | Endpoint                  | Auth     | Purpose                                                                     |
| ------ | ------------------------- | -------- | --------------------------------------------------------------------------- |
| POST   | `/api/leave-requests`     | Any user | Submit a leave request. Body: `leaveType`, `startDate`, `endDate`, `reason` |
| GET    | `/api/leave-requests/me`  | Employee | View own leave requests. Query: `status`, `page`, `limit`                   |
| DELETE | `/api/leave-requests/:id` | Owner    | Cancel a pending request                                                    |
| GET    | `/api/leave-balance/me`   | Employee | View own leave balances including allocated, used, and remaining days       |

---

## Manager API

### Manager Capabilities

Managers can:

- View leave requests from their team.
- Filter requests by status.
- View leave request details.
- Approve pending requests.
- Reject pending requests.

Managers can only approve or reject requests submitted by employees who report directly to them.

| Method | Endpoint                                  | Auth           | Purpose                                                                            |
| ------ | ----------------------------------------- | -------------- | ---------------------------------------------------------------------------------- |
| GET    | `/api/manager/leave-requests`             | Manager, Admin | View own team's requests. Query: `status`, `page`, `limit`                         |
| PUT    | `/api/manager/leave-requests/:id/approve` | Manager, Admin | Approve a pending request and deduct the approved days from the employee's balance |
| PUT    | `/api/manager/leave-requests/:id/reject`  | Manager, Admin | Reject a pending request                                                           |

---

## Admin API

### Admin Capabilities

Administrators have system-wide access and can:

- View all registered users.
- Assign managers to employees.
- Change user roles.
- Manage users.
- Approve or reject leave requests.
- Act on leave requests regardless of the employee's assigned manager.

| Method | Endpoint                              | Auth  | Purpose                                                                |
| ------ | ------------------------------------- | ----- | ---------------------------------------------------------------------- |
| GET    | `/api/admin/users`                    | Admin | List all users                                                         |
| PUT    | `/api/admin/users/:id/assign-manager` | Admin | Assign a manager to an employee. Body: `managerId`                     |
| PUT    | `/api/admin/users/:id/role`           | Admin | Change a user's role. Body: `role` (`employee`, `manager`, or `admin`) |

---

# Frontend and Backend Integration

The frontend communicates with the backend through RESTful API endpoints.

```text
                    USER
                     │
                     ▼
                FRONTEND
                     │
                     │ HTTP Request
                     ▼
                BACKEND API
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
   Business Logic          Authentication
          │                     │
          └──────────┬──────────┘
                     ▼
                 DATABASE
                     │
                     │ Response
                     ▼
                BACKEND API
                     │
                     │ JSON Response
                     ▼
                FRONTEND
                     │
                     ▼

               USER INTERFACE
```
