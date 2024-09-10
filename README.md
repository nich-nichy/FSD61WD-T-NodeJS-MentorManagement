## NodeJS-MentorManagement 
This API provides endpoints to manage mentor and student management.

Setup:
Clone the Repository and then
```
cd mentor-student-management
```

Install Dependencies:
```
npm install
```

Start the Server:
```
npm start
```
# Postman Collection and documentation regarding Endpoints
```
https://dark-crater-25789.postman.co/workspace/Student-and-mentor-management~1af810b8-92d9-4f63-9c84-2441605e0f75/collection/30932673-64a55ec1-05f8-4fd9-9816-27f244843df0?action=share&creator=30932673
```

# API Endpoints

Creating mentor
Endpoint: POST /classManagement/mentor

Description: Function to create a new mentor.

Request Body:
```
{
    "id": id,
    "name": "mentor name",
    "expertise": "what is his expertise"
}
```

Creating student
Endpoint: POST /classManagement/student

Description: Function to create a new student.

Request Body:
```
{
    "id": id,
    "name": "student name",
    "age": age
}

```

Assign student to mentor:
Endpoint: POST /classManagement/assign-students-to-mentor

Description: This is used to assign students to specific mentor.

Request Body:
```
{
    "mentorId": 2,
    "studentIds": [2]
}
```

Change mentor:
Endpoint: POST /classManagement/change-mentor

Description: This is used to change a mentor for a student.

Request Body:
```
{
    "studentId": 2,
    "newMentorId": 3
}
```

Get all students under a mentor:
Endpoint: GET /classManagement/mentor/:mentorId/students

Description: This is used to get all students under a mentor.

Request Query:
```
    mentorId: 1
```

Get specific students previous mentor:
Endpoint: GET /classManagement/student/:studentId/previous-mentor

Description: This API call is used to get the students previous mentor.

Request Query:
```
    studentId: 1
```


