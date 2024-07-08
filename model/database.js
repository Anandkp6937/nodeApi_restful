const {Pool}=require('pg');
const pool=new Pool({
    user:process.env.user || 'postgres',
    host:process.env.host || 'localhost',
    database:process.env.database || 'icecream',
    password:process.env.password ||'anand1010',
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