#! /usr/bin/env node
import inquirer from "inquirer";
import { createNewStudent, depositBalance, isFeePaid } from "./functions.js";
import { showStatus } from "./functions.js";
import { admin } from "./main.js";
export const mainFun = async () => {
    let answer = await inquirer.prompt([
        {
            name: "choice",
            type: "list",
            message: "What do you want to do..?",
            choices: ["Create New Student", "View Student Status", "Pay Fees", "Deposit Balance", "Quit"]
        }
    ]);
    if (answer.choice === "Create New Student") {
        await createNewStudent();
        console.log("\n");
        await admin();
    }
    else if (answer.choice === "View Student Status") {
        await showStatus();
        console.log("\n");
        await admin();
    }
    else if (answer.choice === "Pay Fees") {
        await isFeePaid();
        console.log("\n");
        await admin();
    }
    else if (answer.choice === "Deposit Balance") {
        await depositBalance();
        console.log("\n");
        await admin();
    }
    else if (answer.choice === "Quit") {
        console.log(`GoodBye`);
        return null;
    }
};
