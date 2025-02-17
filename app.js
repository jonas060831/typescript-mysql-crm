"use strict";
/*

learning queries: https://www.w3schools.com/mysql/default.asp
user prompt: https://www.npmjs.com/package/@types/prompt-sync#additional-details
for db client library : https://sidorares.github.io/node-mysql2/docs/documentation/typescript-examples
typescript setup : Mr. Ian Terada General Assembly
database connection : Mr. Ian Terada General Assembly & Mr. Joshua Levine of General Assembly
mysql installation (not used): Mr. Matthew Huntington of General Assembly
mysql/promise installation : Mr. Google
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var promptSync = require("prompt-sync");
var dotenv = require("dotenv");
dotenv.config();
var mysql = require("mysql2/promise");
var get_user_input = promptSync();
var questionToUser = function (question) {
    return get_user_input("".concat(question));
};
var mainMenu;
var inMenu = true;
//classes
var classes_1 = require("./classes");
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var connection, createCompany, showCompanies, editCompany, deleteCompany, companySubMenu, createEmployee, showEmployees, showEmployeesByCompany, editEmployee, deleteEmployee, employeeSubMenu, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, mysql.createConnection({
                    host: process.env.MYSQL_HOST,
                    user: 'root',
                    password: process.env.MYSQL_PASSWORD,
                    database: process.env.MYSQL_DATABASE,
                })
                //CRUD companies
            ];
            case 1:
                connection = _b.sent();
                createCompany = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var companyNameToAdd, query, newCompany, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                companyNameToAdd = questionToUser("Please Enter Company Name: ");
                                query = 'INSERT INTO companies (name) VALUES (?)';
                                newCompany = new classes_1.Company(companyNameToAdd);
                                return [4 /*yield*/, connection.execute(query, [newCompany.name])];
                            case 1:
                                result = (_a.sent())[0];
                                console.log("".concat(companyNameToAdd, " added successfully!"));
                                questionToUser("[PRESS ANY KEY TO CONTINUE]");
                                console.clear();
                                return [2 /*return*/];
                        }
                    });
                }); };
                showCompanies = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var query, companies;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                query = 'SELECT * FROM companies;';
                                return [4 /*yield*/, connection.execute(query)];
                            case 1:
                                companies = (_a.sent())[0];
                                companies.forEach(function (company) {
                                    console.log("".concat(company.id, " ").concat(company.name));
                                });
                                return [2 /*return*/];
                        }
                    });
                }); };
                editCompany = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var companyId, newCompanyName, query, updatedCompany, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, showCompanies()];
                            case 1:
                                _a.sent();
                                companyId = questionToUser('Enter Company Id: ');
                                newCompanyName = questionToUser('Enter New Name: ');
                                query = 'UPDATE companies SET name = (?) WHERE id = (?)';
                                updatedCompany = new classes_1.Company(newCompanyName);
                                return [4 /*yield*/, connection.execute(query, [updatedCompany.name, companyId])];
                            case 2:
                                result = (_a.sent())[0];
                                console.log("".concat(updatedCompany.name, " updated successfully!"));
                                questionToUser("[PRESS ANY KEY TO CONTINUE]");
                                console.clear();
                                return [2 /*return*/];
                        }
                    });
                }); };
                deleteCompany = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var query, companyId, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, showCompanies()
                                //DELETE FROM table_name WHERE condition; w3schools
                            ];
                            case 1:
                                _a.sent();
                                query = "DELETE FROM companies WHERE id = (?);";
                                companyId = questionToUser("Enter Company Id: ");
                                return [4 /*yield*/, connection.execute(query, [companyId])];
                            case 2:
                                result = (_a.sent())[0];
                                console.log('Company Successfully Deleted');
                                questionToUser("[PRESS ANY KEY TO CONTINUE]");
                                console.clear();
                                return [2 /*return*/];
                        }
                    });
                }); };
                companySubMenu = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var isOnCampanySubMenu, companySubMenu_1, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                isOnCampanySubMenu = true;
                                _b.label = 1;
                            case 1:
                                if (!isOnCampanySubMenu) return [3 /*break*/, 13];
                                console.log('Companies Menu:\n\n1.Add Company\n2.View All Companies\n3.Edit Company\n4.Delete Company\n5.Back to Main menu\n');
                                companySubMenu_1 = questionToUser("Companies Menu[1~5]: ");
                                _a = companySubMenu_1;
                                switch (_a) {
                                    case "1": return [3 /*break*/, 2];
                                    case "2": return [3 /*break*/, 4];
                                    case "3": return [3 /*break*/, 6];
                                    case "4": return [3 /*break*/, 8];
                                    case "5": return [3 /*break*/, 10];
                                }
                                return [3 /*break*/, 11];
                            case 2: return [4 /*yield*/, createCompany()];
                            case 3:
                                _b.sent();
                                return [3 /*break*/, 12];
                            case 4:
                                console.log('All Companies:');
                                return [4 /*yield*/, showCompanies()];
                            case 5:
                                _b.sent();
                                questionToUser("[PRESS ANY KEY TO CONTINUE]");
                                console.clear();
                                return [3 /*break*/, 12];
                            case 6:
                                console.log('Edit Company Details:\n');
                                return [4 /*yield*/, editCompany()];
                            case 7:
                                _b.sent();
                                return [3 /*break*/, 12];
                            case 8:
                                console.log('Delete Company:\n');
                                return [4 /*yield*/, deleteCompany()];
                            case 9:
                                _b.sent();
                                return [3 /*break*/, 12];
                            case 10:
                                console.log('Go back to main menu');
                                isOnCampanySubMenu = false;
                                return [3 /*break*/, 12];
                            case 11:
                                console.log('invalid input');
                                return [3 /*break*/, 12];
                            case 12: return [3 /*break*/, 1];
                            case 13: return [2 /*return*/];
                        }
                    });
                }); };
                createEmployee = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var employeeNameToAdd, employeeAgeToAdd, employerIdToAdd, newEmployee, sql, _;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                employeeNameToAdd = questionToUser("Please Enter Employee Name: ");
                                employeeAgeToAdd = questionToUser("Please Enter Employee Age: ");
                                employerIdToAdd = questionToUser("Please Enter Employer Id: ");
                                newEmployee = new classes_1.Employee(employeeNameToAdd, parseInt(employeeAgeToAdd), parseInt(employerIdToAdd));
                                sql = 'INSERT INTO employees (name, age, employer_id) VALUES (?, ?, ?)';
                                return [4 /*yield*/, connection.execute(sql, [newEmployee.name, newEmployee.age, newEmployee.employer_id])];
                            case 1:
                                _ = (_a.sent())[0];
                                console.log("".concat(newEmployee.name, " is saved."));
                                questionToUser("[PRESS ANY KEY TO CONTINUE]");
                                console.clear();
                                return [2 /*return*/];
                        }
                    });
                }); };
                showEmployees = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var sql, employees;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                sql = 'SELECT * FROM employees;';
                                return [4 /*yield*/, connection.execute(sql)];
                            case 1:
                                employees = (_a.sent())[0];
                                employees.forEach(function (employee) {
                                    console.log("".concat(employee.id, " ").concat(employee.name));
                                });
                                return [2 /*return*/];
                        }
                    });
                }); };
                showEmployeesByCompany = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var selectedCompanyId, sql, employees, sql2, company;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log('View Employees via Company: ');
                                return [4 /*yield*/, showCompanies()];
                            case 1:
                                _a.sent();
                                selectedCompanyId = questionToUser("Please Enter Company Id: ");
                                sql = 'SELECT * FROM employees WHERE employer_id = (?)';
                                return [4 /*yield*/, connection.execute(sql, [selectedCompanyId])];
                            case 2:
                                employees = (_a.sent())[0];
                                sql2 = 'SELECT name FROM companies WHERE id = (?)';
                                return [4 /*yield*/, connection.execute(sql2, [selectedCompanyId])];
                            case 3:
                                company = (_a.sent())[0][0];
                                if (employees.length === 0) {
                                    console.log("\nNO Employee Record found for ".concat(company.name, "\n"));
                                }
                                else {
                                    console.log("".concat(company.name, " employees:"));
                                    employees.forEach(function (employee) {
                                        console.log("".concat(employee.id, ". ").concat(employee.name, " ").concat(employee.age));
                                    });
                                }
                                return [2 /*return*/];
                        }
                    });
                }); };
                editEmployee = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var employeeId, employeeName, employeeAge, companyId, updatedEmployee, sql, _;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log('Edit Employee Information:\n');
                                return [4 /*yield*/, showEmployees()];
                            case 1:
                                _a.sent();
                                employeeId = questionToUser('Enter User Id #: ');
                                employeeName = questionToUser('Enter New Name: ');
                                employeeAge = questionToUser('Enter New Age: ');
                                companyId = questionToUser('Enter Company Id: ');
                                updatedEmployee = new classes_1.Employee(employeeName, employeeAge, companyId);
                                sql = 'UPDATE employees SET name = (?), age = (?), employer_id = (?) WHERE id = (?)';
                                return [4 /*yield*/, connection.execute(sql, [updatedEmployee.name, updatedEmployee.age, updatedEmployee.employer_id, employeeId])];
                            case 2:
                                _ = (_a.sent())[0][0];
                                console.log("Employee Data update!");
                                questionToUser("[PRESS ANY KEY TO CONTINUE]");
                                console.clear();
                                return [2 /*return*/];
                        }
                    });
                }); };
                deleteEmployee = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var employeeIdToDelete, sql, _;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, showEmployees()];
                            case 1:
                                _a.sent();
                                employeeIdToDelete = questionToUser("Enter the Id of employee: ");
                                sql = 'DELETE FROM employees WHERE id = (?)';
                                return [4 /*yield*/, connection.execute(sql, [employeeIdToDelete])];
                            case 2:
                                _ = (_a.sent())[0][0];
                                console.log('Employee Succesfully Deleted');
                                questionToUser("[PRESS ANY KEY TO CONTINUE]");
                                console.clear();
                                return [2 /*return*/];
                        }
                    });
                }); };
                employeeSubMenu = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var isOnEmployeeSubMenu, employeeSubMenu_1, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                isOnEmployeeSubMenu = true;
                                _b.label = 1;
                            case 1:
                                if (!isOnEmployeeSubMenu) return [3 /*break*/, 13];
                                console.log('Employees Menu:\n\n1.Add Employee\n2.View All Employees\n3.Edit Employee\n4.Delete Employee\n5.Back to Main menu\n');
                                employeeSubMenu_1 = questionToUser("Employees Menu[1~5]: ");
                                _a = employeeSubMenu_1;
                                switch (_a) {
                                    case "1": return [3 /*break*/, 2];
                                    case "2": return [3 /*break*/, 4];
                                    case "3": return [3 /*break*/, 6];
                                    case "4": return [3 /*break*/, 8];
                                    case "5": return [3 /*break*/, 10];
                                }
                                return [3 /*break*/, 11];
                            case 2: return [4 /*yield*/, createEmployee()];
                            case 3:
                                _b.sent();
                                return [3 /*break*/, 12];
                            case 4: return [4 /*yield*/, showEmployeesByCompany()];
                            case 5:
                                _b.sent();
                                questionToUser("[PRESS ANY KEY TO CONTINUE]");
                                console.clear();
                                return [3 /*break*/, 12];
                            case 6: return [4 /*yield*/, editEmployee()];
                            case 7:
                                _b.sent();
                                return [3 /*break*/, 12];
                            case 8: return [4 /*yield*/, deleteEmployee()];
                            case 9:
                                _b.sent();
                                return [3 /*break*/, 12];
                            case 10:
                                console.log("Back to main menu");
                                isOnEmployeeSubMenu = false;
                                return [3 /*break*/, 12];
                            case 11:
                                console.log("invalid input");
                                return [3 /*break*/, 12];
                            case 12: return [3 /*break*/, 1];
                            case 13: return [2 /*return*/];
                        }
                    });
                }); };
                _b.label = 2;
            case 2:
                if (!inMenu) return [3 /*break*/, 10];
                console.log("Please Select from the options below:\n\n1.Companies\n2.Employees\n3.Exit\n\n");
                mainMenu = questionToUser("[1~3]: ");
                _a = mainMenu;
                switch (_a) {
                    case "1": return [3 /*break*/, 3];
                    case "2": return [3 /*break*/, 5];
                    case "3": return [3 /*break*/, 7];
                }
                return [3 /*break*/, 8];
            case 3: return [4 /*yield*/, companySubMenu()];
            case 4:
                _b.sent();
                return [3 /*break*/, 9];
            case 5: return [4 /*yield*/, employeeSubMenu()];
            case 6:
                _b.sent();
                return [3 /*break*/, 9];
            case 7:
                console.log("Goodbye!");
                inMenu = false;
                return [3 /*break*/, 9];
            case 8:
                console.log("invalid input");
                return [3 /*break*/, 9];
            case 9: return [3 /*break*/, 2];
            case 10:
                connection.end();
                return [2 /*return*/];
        }
    });
}); };
exports.main = main;
(0, exports.main)();
