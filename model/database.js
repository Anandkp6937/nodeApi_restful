const {Pool}=require('pg');
const pool=new Pool({
  user:'data_icecream_user',
  host:'a.oregon-postgres.render.com',
  database:'data_icecream',
  password:'dcbjcEIRAHbg8FZ996ryJH2usvsZXNV3',
  port:5432,
  ssl: {
    rejectUnauthorized: false
  }
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