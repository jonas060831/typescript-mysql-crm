"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = exports.Company = void 0;
var Company = /** @class */ (function () {
    function Company(name) {
        this.name = name;
    }
    return Company;
}());
exports.Company = Company;
var Employee = /** @class */ (function () {
    function Employee(name, age, employer_id) {
        this.name = name;
        this.age = age;
        this.employer_id = employer_id;
    }
    return Employee;
}());
exports.Employee = Employee;
