const {Pool}=require('pg');
const pool=new Pool({
    user:'postgres',
    host:'localhost',
    database:'icecream',
    password:'anand1010',
    port:5432,
});
pool.connect((err)=>{
    if(err){
     throw err
    }
    else{
      console.log('database connected');
    }
    });
module.exports={pool}