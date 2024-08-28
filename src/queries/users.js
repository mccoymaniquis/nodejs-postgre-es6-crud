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

export const getUser = `select id, firstname as "firstName", middlename as "middleName",lastname as "lastName", age,dateofbirth as "dateOfBirth", username , password from users where username=$1 order by id desc`

export const GetAllUsersPagination = `SELECT id,firstname as "firstName",middlename as "middleName",lastname as "lastName",age,dateofbirth as "dateOfBirth" FROM users  order by id desc LIMIT $1 OFFSET $2  `

export const GetUserById = `SELECT id,firstname as "firstName",middlename as "middleName",lastname as "lastName",age,dateofbirth as "dateOfBirth" FROM users where id=$1`
