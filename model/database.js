const {Pool}=require('pg');
const pool=new Pool({
    user:process.env.user,
    host:process.env.host ,
    database:process.env.database, 
    password:process.env.password ,
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