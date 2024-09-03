'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postUser = exports.getUser = exports.GetUserById = exports.GetAllUsersPagination = void 0;
var postUser = exports.postUser = "\n        INSERT INTO users\n        (\n            firstname,\n            middlename, \n            lastname, \n            dateofbirth,\n            age,\n            username,\n            password\n        ) \n        VALUES \n        ($1,$2,$3,$4,$5,$6,$7)";
var getUser = exports.getUser = "select id, firstname as \"firstName\", middlename as \"middleName\",lastname as \"lastName\", age,dateofbirth as \"dateOfBirth\", username , password from users where username=$1 order by id desc";
var GetAllUsersPagination = exports.GetAllUsersPagination = "SELECT id,firstname as \"firstName\",middlename as \"middleName\",lastname as \"lastName\",age,dateofbirth as \"dateOfBirth\" FROM users  order by id desc LIMIT $1 OFFSET $2  ";
var GetUserById = exports.GetUserById = "SELECT id,firstname as \"firstName\",middlename as \"middleName\",lastname as \"lastName\",age,dateofbirth as \"dateOfBirth\" FROM users where id=$1";