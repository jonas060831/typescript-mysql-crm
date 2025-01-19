
/*

learning queries: https://www.w3schools.com/mysql/default.asp
user prompt: https://www.npmjs.com/package/@types/prompt-sync#additional-details
for db client library : https://sidorares.github.io/node-mysql2/docs/documentation/typescript-examples
typescript setup : Mr. Ian Terada General Assembly
database connection : Mr. Ian Terada General Assembly & Mr. Joshua Levine of General Assembly
mysql installation (not used): Mr. Matthew Huntington of General Assembly
mysql/promise installation : Mr. Google
*/


import promptSync = require('prompt-sync');
import * as dotenv from 'dotenv'
dotenv.config()
import * as mysql from 'mysql2/promise'
const get_user_input = promptSync()

const questionToUser: Function = (question: string) :string =>  { 
        return get_user_input(`${question}`) 
}

let mainMenu: string
let inMenu: boolean = true
        
        
export const main = async() :Promise<void> => {

        //db
        const  connection:mysql.Connection = await mysql.createConnection({
                host: process.env.MYSQL_HOST,
                user: 'root',
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE,
        })


        const createCompany = async () :Promise<void> => {
                const companyNameToAdd:string = questionToUser("Please Enter Company Name: ")
                const query = 'INSERT INTO companies (name) VALUES (?)'

                const [result] = await connection.execute(query, [companyNameToAdd])
                console.log(`${companyNameToAdd} added successfully!`,)

        }
        const showCompanies = async (): Promise<void> => {

                const query = 'SELECT * FROM companies;'

                const [result]: any = await connection.execute(query)
                result.forEach((company:any) => {
                        console.log(`${company.id} ${company.name}`)
                });
        }
        const editCompany = async () :Promise<void> => {
                await showCompanies()
                
                const companyId: string = questionToUser('Enter Company Id: ')
                
                const newCompanyName: string = questionToUser('Enter New Name: ')

                //w3schools
                const query:string = 'UPDATE companies SET name = (?) WHERE id = (?)'

                const [result] = await connection.execute(query, [newCompanyName, companyId])

                console.log(`${newCompanyName} updated successfully!`,)
        }
        const deleteCompany = async () :Promise<void> => {
                await showCompanies()
                //DELETE FROM table_name WHERE condition; w3schools
                const query: string = "DELETE FROM companies WHERE id = (?);"

                const companyId: string = questionToUser("Enter Company Id: ")
                const [result] = await connection.execute(query, [companyId])

                console.log('Company Successfully Deleted')
        }
        const companySubMenu = async() :Promise<void> => {
                
                let isOnCampanySubMenu: boolean = true
                
                
                while (isOnCampanySubMenu) {
                        console.log('Companies Menu:\n\n1.Add Company\n2.View All Companies\n3.Edit Company\n4.Delete Company\n5.Back to Main menu\n')
                        let companySubMenu:string = questionToUser("Companies Menu[1~5]: ")

                        switch (companySubMenu) {
                                case "1":
                                        
                                        await createCompany()
                                        break;
                                case "2":
                                        console.log('All Companies:')
                                        await showCompanies()
                                        questionToUser("[PRESS ANY KEY TO CONTINUE]")
                                        break;
                                case "3":
                                        
                                        console.log('Edit Company Details:\n')
                                        await editCompany()
                                        break;
                                case "4":
                                        console.log('Delete Company:\n')
                                        await deleteCompany()
                                        break;
                                case "5":
                                        console.log('Go back to main menu')
                                        isOnCampanySubMenu = false
                                        break;
                        
                                default:
                                        console.log('invalid input')
                                        break;
                        }
                }
        }


        const createEmployee = async () :Promise<void> => {
                const employeeNameToAdd: string = questionToUser("Please Enter Employee Name: ")
                const employeeAgeToAdd: string = questionToUser("Please Enter Employee Age: ")
                const employerIdToAdd: string = questionToUser("Please Enter Employer Id: ")

                const sql = 'INSERT INTO employees (name, age, employer_id) VALUES (?, ?, ?)'

                const [result] = await connection.execute(sql, [employeeNameToAdd, employeeAgeToAdd, employerIdToAdd])
                console.log(`${employeeNameToAdd} is saved.`)

        }
        const employeeSubMenu = async () :Promise<void> => {
                let isOnEmployeeSubMenu: boolean = true

                while (isOnEmployeeSubMenu) {
                        console.log('Employees Menu:\n\n1.Add Employee\n2.View All Employees\n3.Edit Employee\n4.Delete Employee\n5.Back to Main menu\n')
                        let employeeSubMenu:string = questionToUser("Employees Menu[1~5]: ")

                        switch (employeeSubMenu) {
                                case "1":
                                        await createEmployee()
                                        break;
                                case "2":
                                        console.log('View All Employees') 
                                        break;
                                case "3":
                                        console.log('Edit Employee') 
                                        break;
                                case "4":
                                        console.log('Delete Employee') 
                                        break;
                                case "5":
                                        console.log("Back to main menu")
                                        isOnEmployeeSubMenu = false
                                        break
                        
                                default:
                                        console.log("invalid input")
                                        break;
                        }
                }

        }

        while (inMenu) {
        
                console.log("Please Select from the options below:\n\n1.Companies\n2.Employees\n3.Exit\n\n")
        
                mainMenu = questionToUser("[1~3]: ")

                switch (mainMenu) {
                        case "1":
                                await companySubMenu()
                                break;
                        case "2":
                                await employeeSubMenu()
                                break;
                        case "3":
                                console.log("Goodbye!")
                                inMenu = false
                                break;
                        default:
                                console.log("invalid input")
                                break;
                } 
        }
        connection.end()
}
main()