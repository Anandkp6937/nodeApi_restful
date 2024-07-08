const {Pool}=require('pg');
const pool=new Pool({
    user:data_icecream_user,
    host:process.env.host ,
    database:process.env.database, 
    password:process.env.password ,
    port:5432,
    ssl: {
      rejectUnauthorized: false
    }
});
pool.connect((err)=>{
    if(err){
      console.log(err);
     throw err
    }
    else{
      console.log('database connected');
    }
    });
module.exports={pool}