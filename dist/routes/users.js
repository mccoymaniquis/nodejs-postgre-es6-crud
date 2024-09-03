'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _users = require("../controllers/users.js");
var _auth = require("../middleware/auth.js");
var _users2 = require("../middleware/users.js");
var router = (0, _express.Router)();

//routers
router.post('/register', _users2.validateCreateUser, _users.createUser); //endpoint will be http://localhost:3000/api/v1/users/register
router.post('/login', _users2.validateLogin, _users.loginUser);
router.post('/check-authentication', _auth.validateToken, _users.checkAuthentication);
router.get('/list', _users2.validatePagination, _auth.validateToken, _auth.getAuthData, _users.GetAllUsersPagination);
router.get('/list/user', _auth.validateToken, _auth.getAuthData, _users.GetUserById);
router.put('/update-user', _users2.validateUpdateUser, _auth.validateToken, _auth.getAuthData, _users.updateUser);
var _default = exports["default"] = router;