export class Company {
        id?: number
        name: string
        constructor(name: string) {
                this.name = name
        }
}

export class Employee {
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