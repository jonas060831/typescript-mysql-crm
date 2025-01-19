
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


//classes
class Company {
        id?: number
        name: string
        constructor(name: string) {
                this.name = name
        }
}

class Employee {
        id?: number
        name: string
        age : number
        employer_id: number

        constructor(name: string, age: number, employer_id: number) {
                this.name = name
                this.age = age
                this.employer_id = employer_id
        }
}
        
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

                const newCompany = new Company(companyNameToAdd)
                
                const [result] = await connection.execute(query, [newCompany.name])
                console.log(`${companyNameToAdd} added successfully!`)
                questionToUser("[PRESS ANY KEY TO CONTINUE]")

        }
        const showCompanies = async (): Promise<void> => {

                const query = 'SELECT * FROM companies;'

                const [companies]: [mysql.RowDataPacket[], mysql.FieldPacket[]] = await connection.execute(query)
                companies.forEach(company => {
                        console.log(`${company.id} ${company.name}`)
                });
                
        }
        const editCompany = async () :Promise<void> => {
                await showCompanies()
                
                const companyId: string = questionToUser('Enter Company Id: ')
                
                const newCompanyName: string = questionToUser('Enter New Name: ')

                const query:string = 'UPDATE companies SET name = (?) WHERE id = (?)'

                const updatedCompany = new Company(newCompanyName)

                const [result] : [mysql.RowDataPacket[], mysql.FieldPacket[]] = await connection.execute(query, [updatedCompany.name, companyId])
                console.log(`${updatedCompany.name} updated successfully!`)
                questionToUser("[PRESS ANY KEY TO CONTINUE]")
        }
        const deleteCompany = async () :Promise<void> => {
                await showCompanies()
                //DELETE FROM table_name WHERE condition; w3schools
                const query: string = "DELETE FROM companies WHERE id = (?);"

                const companyId: string = questionToUser("Enter Company Id: ")
                const [result] : [mysql.RowDataPacket[], mysql.FieldPacket[]] = await connection.execute(query, [companyId])

                console.log('Company Successfully Deleted')
                questionToUser("[PRESS ANY KEY TO CONTINUE]")
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

                const newEmployee: Employee = new Employee(employeeNameToAdd, parseInt(employeeAgeToAdd), parseInt(employerIdToAdd))

                const sql = 'INSERT INTO employees (name, age, employer_id) VALUES (?, ?, ?)'

                const [result] = await connection.execute(sql, [newEmployee.name, newEmployee.age, newEmployee.employer_id])
                console.log(`${newEmployee.name} is saved.`)
                questionToUser("[PRESS ANY KEY TO CONTINUE]")
        }

        const showEmployees = async () :Promise<void> => {

                const sql = 'SELECT * FROM employees;'

                const [employees] :[mysql.RowDataPacket[], mysql.FieldPacket[]] = await connection.execute(sql)

                employees.forEach(employee => {
                        console.log(`${employee.id} ${employee.name}`)
                })

        }       
        
        const showEmployeesByCompany = async () :Promise<void> => {

                console.log('View Employees via Company: ')
                await showCompanies()
                
                const selectedCompanyId = questionToUser("Please Enter Company Id: ")

                const sql: string = 'SELECT * FROM employees WHERE employer_id = (?)'
                
                const [employees] :[mysql.RowDataPacket[], mysql.FieldPacket[]] = await connection.execute(sql, [selectedCompanyId])
                

                const sql2:string = 'SELECT name FROM companies WHERE id = (?)'
                
                //mysql.QueryResult, mysql.QueryResult any for now
                const [[company]] :[mysql.RowDataPacket[], mysql.FieldPacket[]] = await connection.execute(sql2, [selectedCompanyId])
                
                if(employees.length === 0) {
                        console.log(`\nNO Employee Record found for ${company.name}\n`)
                } else {
                        console.log(`${company.name} employees:`)
                        employees.forEach((employee) => {
                                console.log(`${employee.id}. ${employee.name} ${employee.age}`)
                        })
                }
        }
        const editEmployee = async () :Promise<void> => {

                console.log('Edit Employee Information:\n')
                await showEmployees()

                const employeeId = questionToUser('Enter User Id #: ')
                const employeeName = questionToUser('Enter New Name: ')
                const employeeAge = questionToUser('Enter New Age: ')
                const companyId = questionToUser('Enter Company Id: ')

                const updatedEmployee: Employee = new Employee(employeeName, employeeAge, companyId)

                const sql = 'UPDATE employees SET name = (?), age = (?), employer_id = (?) WHERE id = (?)'

                const [[editedEmployee]]: [mysql.RowDataPacket[], mysql.FieldPacket[]] = await connection.execute(sql, [updatedEmployee.name, updatedEmployee.age, updatedEmployee.employer_id, employeeId])

                console.log(`Employee Data update!`)
                questionToUser("[PRESS ANY KEY TO CONTINUE]")

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
                                        await showEmployeesByCompany()
                                        questionToUser("[PRESS ANY KEY TO CONTINUE]")
                                        break;
                                case "3":
                                        await editEmployee()
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