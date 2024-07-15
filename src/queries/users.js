'use strict'

export const postUser = `
        INSERT INTO users
        (
            firstname,
            middlename, 
            lastname, 
            dateofbirth,
            age,
            username,
            password
        ) 
        VALUES 
        ($1,$2,$3,$4,$5,$6,$7)`

export const getUser = `select id, firstname as "firstName", middlename as "middleName",lastname as "lastName", age,dateofbirth as "dateOfBirth", username , password from users where username=$1`

export const GetAllUsersPagination = `SELECT id,firstname as "firstName",middlename as "middleName",lastname as "lastName",age,dateofbirth as "dateOfBirth" FROM users LIMIT $1 OFFSET $2`
