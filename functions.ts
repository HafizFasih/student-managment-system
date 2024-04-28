#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let studentFees: number;
let studentId:number = 1000;
interface Student {
    firstName: string;
    lastName: string;
    course: string;
    balance: number;
    studentId: number;
    fees: boolean;
}
// let student1: Student = { firstName: "hamza", lastName: "najam siddique", course: "Metaverse", balance: 10000, studentId: 1001, fees: false }
// let student2: Student = { firstName: "zehra", lastName: "fareed ali", course: "Blockchain Technology", balance: 20000, studentId: 1002, fees: true }

let students: Student[] = []
// students.push(student1, student2)

// Create new student
export const createNewStudent = async () => {

    const data = await inquirer.prompt([
        { name: "firstName", type: "input", message: "Enter your first name..." },
        { name: "lastName", type: "input", message: "Enter your second name..." },
        {
            name: "course", type: "list", message: "Select your course.",
            choices: ["Artificial Intelligence: 5000rs",
                "Metaverse: 4000rs",
                "Blockchain Technology: 8000rs",
                "Digital Marketing: 3000rs",
                "Content Marketing: 3000rs"]
        },
        { name: "balance", type: "number", message: "Enter your balance..." },
        { name: "fees", type: "confirm", message: "Do you want to pay fees?" }
    ])
    const studentStatus = students.find(std => std.firstName.toLowerCase() === data.firstName.toLowerCase() && std.lastName.toLowerCase() === data.lastName.toLowerCase())
    if (studentStatus) {
        console.log(chalk.yellow(`Username is taken.`));
        console.log(chalk.yellow(`Cannot create student.`));
    } else if (!studentStatus) {
        let { firstName, lastName, course, balance, fees } = data
    
        if (fees) {
            if (course === "Artificial Intelligence: 5000rs" && balance > 5000) {
                balance -= 5000
                console.log(chalk.yellow(`Fees paid successfully.`));
            }
            else if (course === "Metaverse: 4000rs" && balance > 5000) {
                balance -= 4000
                console.log(chalk.yellow(`Fees paid successfully.`));
            }
            else if (course === "Blockchain Technology: 8000rs" && balance > 5000) {
                balance -= 8000
                console.log(chalk.yellow(`Fees paid successfully.`));
            }
            else if (course === "Digital Marketing: 3000rs" || course === "Content Marketing: 3000rs" && balance > 5000) {
                balance -= 3000
                console.log(chalk.yellow(`Fees paid successfully.`));
            }
            else {
                console.log(chalk.yellow(`Insufficient balance`));
                fees = false
            }
        }
        studentId++
       
        const studentCreated: Student = {studentId, firstName, lastName, course, balance, fees }
        students.push(studentCreated);

        console.log(chalk.yellow(`Student created successfully.`));
    }
}

// Show status
export const showStatus = async () => {
    const studentName = await inquirer.prompt([
        { name: "firstName", type: "input", message: "Enter your first name..." },
        { name: "lastName", type: "input", message: "Enter your last name..." },
        
    ])
    const studentStatus = students.find(std => std.firstName === studentName.firstName && std.lastName === studentName.lastName)
    if (studentStatus) {
        const studentIndex: number = students.findIndex(fName => fName.firstName === studentName.firstName)
        let { firstName, lastName, course, balance, fees, studentId } = students[studentIndex];
        var Course: string = "dummy";
        if (course === "Artificial Intelligence: 5000rs") { Course = "Artificial Intelligence" }
        else if (course === "Metaverse: 4000rs") { Course = "Metaverse" }
        else if (course === "Blockchain Technology: 8000rs") { Course = "Blockchain Technology" }
        else if (course === "Digital Marketing: 3000rs") { Course = "Digital Marketing" }
        else if (course === "Content Marketing: 3000rs") { Course = "Content Marketing" }
        console.log(chalk.green(`
    Student ID: ${studentId}\n
    FirstName: ${firstName}\n
    LastName: ${lastName}\n
    Balance: ${balance}\n
    Fees Paid?: ${fees === true ? "Yes" : "No"}\n
    Course: ${Course}\n
    `));
    }
    else if (!studentStatus) {
        console.log(chalk.yellow(`Invalid Name`));
        return null;
    }
        
    }


// IS fees paid ?
export const isFeePaid = async () => {
    const answer = await inquirer.prompt([
        { name: "name", type: "input", message: "Enter your first name." },
        { name: "lname", type: "input", message: "Enter your last name." },
        { name: "fees", type: "confirm", message: "Are you sure you want to pay fees..?" }
    ])

    let studentStatus = students.find(std => std.firstName === answer.name && std.lastName === answer.lname)
    if (studentStatus) {
        const studentIndex: number = students.findIndex(fName => fName.firstName === answer.name && fName.lastName === answer.lname)
        if (answer.fees) {
            if (students[studentIndex].fees === true) {
                console.log(chalk.yellow(`Fees already paid.`));
            } else if (students[studentIndex].fees === false) {
                students[studentIndex].fees = true
                if (students[studentIndex].course === "Artificial Intelligence: 5000rs") {
                    studentFees = 5000;
                    students[studentIndex].balance < 5000 ? (console.log(chalk.yellow("Insufficient balance")),students[studentIndex].fees = false) : (console.log(chalk.yellow(`Fees paid successfully.`)), students[studentIndex].balance -= studentFees)

                } else if (students[studentIndex].course === "Metaverse: 4000rs") {
                    studentFees = 4000;
                    students[studentIndex].balance < 4000 ? (console.log(chalk.yellow("Insufficient balance")),students[studentIndex].fees = false) : (console.log(chalk.yellow(`Fees paid successfully.`)), students[studentIndex].balance -= studentFees)
                } else if (students[studentIndex].course === "Digital Matketing: 3000rs") {
                    studentFees = 3000;
                    students[studentIndex].balance < 3000 ? (console.log(chalk.yellow("Insufficient balance")),students[studentIndex].fees = false) : (console.log(chalk.yellow(`Fees paid successfully.`)), students[studentIndex].balance -= studentFees)
                } else if (students[studentIndex].course === "Content Marketing: 3000rs") {
                    studentFees = 4000;
                    students[studentIndex].balance < 4000 ? (console.log(chalk.yellow("Insufficient balance")),students[studentIndex].fees = false) : (console.log(chalk.yellow(`Fees paid successfully.`)), students[studentIndex].balance -= studentFees)
                } else if (students[studentIndex].course === "Blockchain Technology: 8000rs") {
                    studentFees = 8000;
                    students[studentIndex].balance < 8000 ? (console.log(chalk.yellow("Insufficient balance")),students[studentIndex].fees = false) : (console.log(chalk.yellow(`Fees paid successfully.`)), students[studentIndex].balance -= studentFees)
                }
            } else {
                console.log(chalk.yellow(`Insufficient balance`));
                students[studentIndex].fees = false
            }

        } 
        }
    else if (!studentStatus) {
        console.log(chalk.yellow(`Student not found.`));
        return null;
}}
// Deposite Balance
export const depositBalance = async () => {
    const answer = await inquirer.prompt([
        { name: "name", type: "input", message: "Enter your first name." },
        { name: "name1", type: "input", message: "Enter your last name." },
        { name: "balance", type: "number", message: "Enter amount to deposit" }
    ])
    const studentStatus = students.find(std => std.firstName === answer.name && std.lastName === answer.name1)
    if (studentStatus) {
        const studentIndex: number = students.findIndex(fName => fName.firstName === answer.name)
        let newBalance = students[studentIndex].balance += answer.balance
        console.log(chalk.yellow(`Your deposit amount is ${answer.balance}.New balance: ${newBalance}`));
    }else if (!studentStatus){
        console.log(chalk.yellow(`Student not found.`));
    }
}

// Remove student
export const RemoveStudent = async () => {
    const removeStudent = await inquirer.prompt([
        { name: "student", message: "Enter the first name of the student...", type: "input" },
        { name: "student1", message: "Enter the last name of the student...", type: "input" }
    ])
    const studentIndex: number = students.findIndex(fName => fName.firstName === removeStudent.student && fName.lastName === removeStudent.student1)

    if (studentIndex != -1) {
        students.splice(studentIndex, 1)
        console.log(chalk.yellow(`Student successfully removed.`));
    } else {
        console.log(chalk.yellow(`Student not found.`));
    }

}

// Show Cources 
export const showCourse = () => {
    let courses = ["Artificial Intelligence: 5000rs", "Metaverse: 4000rs", "Blockchain Technology: 8000rs",
        "Digital Marketing: 3000rs", "Content Marketing: 3000rs"]
    console.log(`\nHere are the prices of courses...`);
    courses.forEach((element, index) => {
        console.log(`\n${index + 1}.${element}`);

    });console.log(`\n`);
    
}
// Show all students

export const allStudents = () => {
    if(students != null && students.length > 0){
        students.forEach((student,index)=>{
            console.log(chalk.yellow(`STATUS OF STUDENT NO.${index +1}`)); 
            console.log(chalk.green(`
        Student ID: ${student.studentId}\n
        FirstName: ${student.firstName}\n
        LastName: ${student.lastName}\n
        Balance: ${student.balance}\n
        Fees Paid?: ${student.fees === true ? "Yes" : "No"}\n
        Course: ${student.course}\n
        `));
        })
        
    }else{
        console.log(chalk.yellow(`Student not found.`));
        
    
}}

// Remove all students
export const removeAllStudent = () => {
while (students.length > 0){
    const std = students.pop()
    if(std){
    console.log(chalk.yellow(`${std.firstName} ${std.lastName} has been removed successfully.`));
    }
   }}
