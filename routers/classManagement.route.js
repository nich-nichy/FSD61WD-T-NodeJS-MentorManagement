const express = require("express");
const router = express.Router();
const { createMentor, assignStudentsToMentor, getStudentsForMentor, createStudent, changeMentorForStudent, getPreviousMentorForStudent } = require("../controllers/classManagement.controller");

router.post('/mentor', createMentor);

router.post('/assign-students-to-mentor', assignStudentsToMentor);

router.get('/mentor/:mentorId/students', getStudentsForMentor);

router.post('/student', createStudent);

router.post('/change-mentor', changeMentorForStudent);

router.get('/student/:studentId/previous-mentor', getPreviousMentorForStudent);


module.exports = router;