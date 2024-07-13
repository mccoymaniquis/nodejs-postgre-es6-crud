'use strict'

export const postStudent = `
        INSERT INTO "SampleSchema"."users"  
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
