"use strict";
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
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var connection, createCompany, showCompanies, editCompany, companySubMenu, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, mysql.createConnection({
                    host: process.env.MYSQL_HOST,
                    user: 'root',
                    password: process.env.MYSQL_PASSWORD,
                    database: process.env.MYSQL_DATABASE,
                })];
            case 1:
                connection = _b.sent();
                createCompany = function (name) { return __awaiter(void 0, void 0, void 0, function () {
                    var query, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                query = 'INSERT INTO companies (name) VALUES (?)';
                                return [4 /*yield*/, connection.execute(query, [name])];
                            case 1:
                                result = (_a.sent())[0];
                                console.log("".concat(name, " added successfully!"));
                                return [2 /*return*/];
                        }
                    });
                }); };
                showCompanies = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var query, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                query = 'SELECT * FROM companies;';
                                return [4 /*yield*/, connection.execute(query)];
                            case 1:
                                result = (_a.sent())[0];
                                result.forEach(function (company) {
                                    console.log("".concat(company.id, " ").concat(company.name));
                                });
                                return [2 /*return*/];
                        }
                    });
                }); };
                editCompany = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var companyId, newCompanyName, query, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, showCompanies()];
                            case 1:
                                _a.sent();
                                companyId = questionToUser('Enter Company Id:');
                                newCompanyName = questionToUser('Enter New Name: ');
                                query = 'UPDATE companies SET name = (?) WHERE id = (?)';
                                return [4 /*yield*/, connection.execute(query, [newCompanyName, companyId])];
                            case 2:
                                result = (_a.sent())[0];
                                console.log("".concat(newCompanyName, " added successfully!"));
                                return [2 /*return*/];
                        }
                    });
                }); };
                companySubMenu = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var isOnCampanySubMenu, companySubMenu_1, _a, companyNameToAdd;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                isOnCampanySubMenu = true;
                                _b.label = 1;
                            case 1:
                                if (!isOnCampanySubMenu) return [3 /*break*/, 11];
                                console.log('Companies Menu:\n\n1.Add Company\n2.View All Companies\n3.Edit Company\n4.Back to Main menu\n');
                                companySubMenu_1 = questionToUser("Companies Menu[1~3]: ");
                                _a = companySubMenu_1;
                                switch (_a) {
                                    case "1": return [3 /*break*/, 2];
                                    case "2": return [3 /*break*/, 4];
                                    case "3": return [3 /*break*/, 6];
                                    case "4": return [3 /*break*/, 8];
                                }
                                return [3 /*break*/, 9];
                            case 2:
                                companyNameToAdd = questionToUser("Please Enter Company Name: ");
                                return [4 /*yield*/, createCompany(companyNameToAdd)];
                            case 3:
                                _b.sent();
                                return [3 /*break*/, 10];
                            case 4:
                                console.log('All Companies:');
                                return [4 /*yield*/, showCompanies()];
                            case 5:
                                _b.sent();
                                questionToUser("[PRESS ANY KEY TO CONTINUE]");
                                return [3 /*break*/, 10];
                            case 6:
                                console.log('Edit Company Details:\n');
                                return [4 /*yield*/, editCompany()];
                            case 7:
                                _b.sent();
                                isOnCampanySubMenu = false;
                                return [3 /*break*/, 10];
                            case 8:
                                console.log('Go back to main menu');
                                isOnCampanySubMenu = false;
                                return [3 /*break*/, 10];
                            case 9:
                                console.log('invalid input');
                                return [3 /*break*/, 10];
                            case 10: return [3 /*break*/, 1];
                            case 11: return [2 /*return*/];
                        }
                    });
                }); };
                _b.label = 2;
            case 2:
                if (!inMenu) return [3 /*break*/, 9];
                console.log("Please Select from the options below:\n\n1.Companies\n2.Employees\n3.Exit\n\n");
                mainMenu = questionToUser("[1~3]: ");
                _a = mainMenu;
                switch (_a) {
                    case "1": return [3 /*break*/, 3];
                    case "2": return [3 /*break*/, 5];
                    case "3": return [3 /*break*/, 6];
                }
                return [3 /*break*/, 7];
            case 3: return [4 /*yield*/, companySubMenu()];
            case 4:
                _b.sent();
                return [3 /*break*/, 8];
            case 5:
                console.log("you choose employees info");
                return [3 /*break*/, 8];
            case 6:
                console.log("Goodbye!");
                inMenu = false;
                return [3 /*break*/, 8];
            case 7:
                console.log("invalid input");
                return [3 /*break*/, 8];
            case 8: return [3 /*break*/, 2];
            case 9:
                connection.end();
                return [2 /*return*/];
        }
    });
}); };
main();
