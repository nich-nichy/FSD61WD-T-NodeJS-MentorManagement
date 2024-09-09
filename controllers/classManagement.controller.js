const Mentor = require('../models/mentor.model');
const Student = require('../models/student.model');

// Function to get data from the database
const getData = async (idProp, mode) => {
    console.log(idProp);
    let res;
    if (mode === "mentor") {
        res = await Mentor.findOne({ id: idProp })
        console.log(res);
        if (!res) {
            return { message: "No previous mentor found" };
        } else {
            return { mentorId: res.id, mentorName: res.name };
        }
    } else if (mode === "student") {
        res = await Promise.all(
            idProp.map(async (id) => {
                try {
                    const student = await Student.findOne({ id: id });
                    if (!student) {
                        return { studentId: id, message: "Student not found" };
                    } else {
                        return { studentId: student.id, studentName: student.name };
                    }
                } catch (error) {
                    console.error(`Error fetching student with id ${id}`, error);
                    return { studentId: id, message: "Error fetching student" };
                }
            })
        );
    }
    return res;
};

// Controller functions
// Function to create a new mentor
exports.createMentor = async (req, res) => {
    try {
        const { id, name, expertise } = req.body;
        const mentor = new Mentor({ id, name, expertise });
        await mentor.save();
        res.status(200).json({ message: "Mentor created", mentor });
    } catch (error) {
        res.status(500).json({ message: "Error creating mentor", error: error.message });
    }
};

//  Function to create a new student
exports.createStudent = async (req, res) => {
    try {
        const { id, name, age } = req.body;
        const student = new Student({ id, name, age });
        await student.save();
        res.status(200).json({ message: "Student created", student });
    } catch (error) {
        res.status(500).json({ message: "Error creating student", error: error.message });
    }
};

// Function to assign a students to a mentor
exports.assignStudentsToMentor = async (req, res) => {
    try {
        const { mentorId, studentIds } = req.body;
        const mentor = await Mentor.findOne({ id: mentorId });
        if (!mentor) {
            return res.status(404).json({ message: "Mentor not found" });
        }
        const students = await Student.find({ id: { $in: studentIds }, mentor: null });
        if (students.length === 0) {
            return res.status(400).json({ message: "No students available for assigning" });
        }
        mentor.students.push(...studentIds);
        await mentor.save();
        await Student.updateMany(
            { id: { $in: studentIds } },
            { $set: { mentor: mentor.id } }
        );
        res.status(200).json({ message: "Students assigned to mentor", mentor });
    } catch (error) {
        res.status(500).json({ message: "Error assigning students to mentor", error: error.message });
    }
};

// Function to change the mentor of a student
exports.changeMentorForStudent = async (req, res) => {
    try {
        const { studentId, newMentorId } = req.body;
        const newMentor = await Mentor.findOne({ id: newMentorId });
        if (!newMentor) {
            return res.status(404).json({ message: "New mentor not found" });
        }
        const student = await Student.findOne({ id: studentId });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        if (student.mentor) {
            await Mentor.updateOne(
                { id: student.mentor },
                { $pull: { students: studentId } }
            );
        }
        student.previousMentor = student.mentor;
        student.mentor = newMentorId;
        await student.save();
        newMentor.students.push(student.id);
        await newMentor.save();
        res.status(200).json({
            message: "Mentor changed for student", studentData: {
                id: student.id,
                name: student.name,
                assignedTo: {
                    id: newMentor.id,
                    name: newMentor.name,
                    expertise: newMentor.expertise
                }
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error changing mentor", error: error.message });
    }
};

// Function to get all students on a specific mentor
exports.getStudentsForMentor = async (req, res) => {
    try {
        const { mentorId } = req.params;
        let id = Number(mentorId);
        const mentor = await Mentor.findOne({ id: id });
        if (!mentor) {
            return res.status(404).json({ message: "Mentor not found" });
        }
        const studentsForMentor = await getData(mentor.students, 'student');
        console.log(studentsForMentor);
        res.status(200).json({ students: studentsForMentor });
    } catch (error) {
        res.status(500).json({ message: "Error fetching students for mentor", error: error.message });
    }
};

// Function to get the previous mentor of a student
exports.getPreviousMentorForStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const id = Number(studentId);
        const student = await Student.findOne({ id: id });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        const previousMentor = await getData(student.previousMentor, 'mentor');
        res.status(200).json({ previousMentor: previousMentor });
    } catch (error) {
        res.status(500).json({ message: "Error fetching previous mentor", error: error.message });
    }
};


