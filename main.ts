#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { allStudents, removeAllStudent, RemoveStudent, showCourse, showStatus } from "./functions.js";
import { mainFun } from "./student.js";
const myPin: number = 1234;
export const admin = async () => {
    const answer = await inquirer.prompt([
        {
            name: "person",
            type: "list",
            message: "Select one of these..",
            choices: ["Admin", "Student", "Quit"]
        }
    ])

    if (answer.person === "Admin") {
        const password = await inquirer.prompt([
            { name: "pin", message: "Enter the pin to login..", type: "number" }
        ])
        if (password.pin === myPin) {
            console.log(chalk.yellow(`Successfully logged in as an admin.`))

            const whatDoYouWant = await inquirer.prompt([
                { name: "wish", type: "list", message: "What do you want to do..?", choices: ["Check Student Status", "Remove Student", "Check prices of course",] }
            ])
            if (whatDoYouWant.wish === "Check Student Status") {
                const permission = await inquirer.prompt([
                    {
                        name: "perm",
                        type: "list",
                        message: "Select on of the following...",
                        choices: ["Status of all students.", "Status of any specific student."]
                    }
                ])
                if (permission.perm === "Status of any specific student.") {
                    await showStatus()
                    await admin()
                }
                else if (permission.perm === "Status of all students.") {
                    allStudents()
                    admin()
                }
            }
            if (whatDoYouWant.wish === "Remove Student") {
                const removestd = await inquirer.prompt([
                    {name:"std",
                    type:"list",
                    message:"Select on of these...",
                    choices:["Remove all students","Remove any specific student"]
                }
                ])
                if(removestd.std === "Remove any specific student"){
                await RemoveStudent()
                await admin()}
            else if(removestd.std === "Remove all students" ){
                removeAllStudent()
                await admin()

            }}
            if (whatDoYouWant.wish === "Check prices of course") {
                showCourse()
                await admin()
            }

        } else if (password.pin !== myPin) {
            console.log(chalk.yellow(`Wrong Password`));
            admin()
        }
    } else if (answer.person === "Student") {
        mainFun()
    } else if (answer.person === "Quit") {
        console.log(chalk.yellow(`GoodBye`));
        return null;
    }
}
admin()
