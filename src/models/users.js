const pool = require('../database')

const getAll = ()=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM users',(err,rows)=>{
            if (err)reject(err)
            resolve(rows);
        });
    });
};

//registro de usuario 
const insert =({email,password,name,username})=>{
    return new Promise((resolve,reject)=>{
        pool.query('INSERT INTO users (email,password,name,username) VALUES($1,$2,$3,$4)',[email,password,name,username],(err,
            result)=>{
                if (err)reject(err)
                if (result){
                    resolve(result)
                };
            });
    });
};
//obtener usuarios por su email

const getByEmail =(pEmail)=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM users WHERE email = $1',[pEmail],(err,rows)=>{
            if (err) reject(err)
            resolve(rows.rows[0])
        });
    });
};

const getById =(pId)=>{
    return new Promise((resolve,reject) =>{
        pool.query('SELECT * FROM users WERHE id =$1',[pId], (err,rows)=>{
            if(err)reject(err)
            resolve(rows)
        });
    });
} 



module.exports = {
    getById,
    getAll, 
    insert,
    getByEmail
};