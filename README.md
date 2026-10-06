## Frontend & Backend

The Employee Leave Management System consists of a frontend interface and a backend API that work together to provide a complete leave management workflow.

The frontend provides the user interface for Employees, Managers, and Admins, while the backend handles authentication, authorization, business logic, leave requests, leave balances, user management, and database operations.

---

### Employee

#### Frontend

Employees have access to an employee dashboard where they can:

- View their leave balance.
- Submit a leave request.
- Select a leave type.
- Enter a start date and end date.
- Provide a reason for the leave request.
- View their submitted leave requests.
- View the status of their requests.
- Filter their requests by status.
- Cancel a pending leave request.
- View their allocated, used, and remaining leave days.

#### Backend

The backend provides the following endpoints for employee leave management:

| Method | Endpoint                  | Auth     | Purpose                                                             |
| ------ | ------------------------- | -------- | ------------------------------------------------------------------- |
| POST   | `/api/leave-requests`     | Any user | Submit request. Body: `leaveType`, `startDate`, `endDate`, `reason` |
| GET    | `/api/leave-requests/me`  | Any user | View own requests. Query: `status`, `page`, `limit`                 |
| DELETE | `/api/leave-requests/:id` | Owner    | Cancel a pending request                                            |
| GET    | `/api/leave-balance/me`   | Any user | View own balances (allocated, used, remaining per leave type)       |

---

### Manager

#### Frontend

Managers have access to a manager dashboard where they can:

- View leave requests from employees assigned to them.
- Filter requests by status.
- View leave request details.
- Review pending leave requests.
- Approve leave requests.
- Reject leave requests.
- Monitor leave requests within their team.

#### Backend

The backend provides the following endpoints for manager leave management:

| Method | Endpoint                                  | Auth           | Purpose                                                                                                                       |
| ------ | ----------------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/api/manager/leave-requests`             | Manager, Admin | View own team's requests. Query: `status`, `page`, `limit`                                                                    |
| PUT    | `/api/manager/leave-requests/:id/approve` | Manager, Admin | Approve and deduct the approved leave days from the employee's balance. Only the employee's own manager, or an admin, can act |
| PUT    | `/api/manager/leave-requests/:id/reject`  | Manager, Admin | Reject a pending request. Only the employee's own manager, or an admin, can act                                               |

---

### Admin

#### Frontend

The Admin has access to an administrative dashboard with system-wide management features.

The Admin can:

- View all registered users.
- View employee and manager information.
- Assign a manager to an employee.
- Change a user's role.
- View leave requests across the system.
- Approve or reject leave requests.
- Manage users and their roles.
- Oversee the overall leave management system.

#### Backend

The backend provides the following endpoints for administrative management:

| Method | Endpoint                              | Auth  | Purpose                                                                |
| ------ | ------------------------------------- | ----- | ---------------------------------------------------------------------- |
| GET    | `/api/admin/users`                    | Admin | List all users                                                         |
| PUT    | `/api/admin/users/:id/assign-manager` | Admin | Assign a manager to an employee. Body: `managerId`                     |
| PUT    | `/api/admin/users/:id/role`           | Admin | Change a user's role. Body: `role` (`employee`, `manager`, or `admin`) |

---

## Frontend and Backend Integration

The frontend communicates with the backend through REST API endpoints.

```text
                    USER
                     │
                     ▼
                FRONTEND
                     │
              User Action
                     │
                     ▼
                BACKEND API
                     │
             Authentication
             Authorization
             Validation
             Business Logic
                     │
                     ▼
                 DATABASE
                     │
                     ▼
                BACKEND API
                     │
                JSON Response
                     │
                     ▼
                FRONTEND
                     │
                     ▼
                USER INTERFACE
```
