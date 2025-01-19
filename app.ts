import promptSync = require('prompt-sync');
import * as dotenv from 'dotenv'
dotenv.config()
import * as mysql from 'mysql2/promise'
const get_user_input = promptSync()

const questionToUser: Function = (question: string) =>  { 
        return get_user_input(`${question}`) 
}

let mainMenu: string
let inMenu: boolean = true
        
        
const main = async() => {

        //db
        const  connection = await mysql.createConnection({
                host: process.env.MYSQL_HOST,
                user: 'root',
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE,
        })


        const createCompany = async (name: string) :Promise<void> => {

                const query = 'INSERT INTO companies (name) VALUES (?)'

                const [result] = await connection.execute(query, [name])
                console.log(`${name} added successfully!`,)

        }
        const showCompanies = async (): Promise<void> => {

                const query = 'SELECT * FROM companies;'

                const [result]:any = await connection.execute(query)
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

        const companySubMenu = async() => {
                
                let isOnCampanySubMenu = true
                
                
                while (isOnCampanySubMenu) {
                        console.log('Companies Menu:\n\n1.Add Company\n2.View All Companies\n3.Edit Company\n4.Delete Company\n5.Back to Main menu\n')
                        let companySubMenu = questionToUser("Companies Menu[1~4]: ")

                        switch (companySubMenu) {
                                case "1":
                                        const companyNameToAdd = questionToUser("Please Enter Company Name: ")
                                        await createCompany(companyNameToAdd)
                                        break;
                                case "2":
                                        console.log('All Companies:')
                                        await showCompanies()
                                        questionToUser("[PRESS ANY KEY TO CONTINUE]")
                                        break;
                                case "3":
                                        
                                        console.log('Edit Company Details:\n')
                                        await editCompany()
                                        isOnCampanySubMenu = false
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

        while (inMenu) {
        
                console.log("Please Select from the options below:\n\n1.Companies\n2.Employees\n3.Exit\n\n")
        
                mainMenu = questionToUser("[1~3]: ")

                switch (mainMenu) {
                        case "1":
                                await companySubMenu()
                                break;
                        case "2":
                                console.log("you choose employees info")
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