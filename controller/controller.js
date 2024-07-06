const {pool}=require('../model/database');
//to get all data
function getAlldata(req,res){
    res.writeHead(200,{'Content-Type':'application/json'});
    pool.query(`SELECT * FROM data`,(err,data)=>{
    errorCheck(err);
     let icecream=JSON.stringify(data.rows);
     res.end(icecream);
    })
}
//invalid request
function invalidRequest(req,res){
    res.writeHead(404,{'Content-Type':'application/json'});
    res.end(JSON.stringify({message:"invalid request"}));
}
//get individual icecream
function individualIcecream(req,res,id){
    pool.query(`SELECT * FROM data WHERE id=$1`,[id],(err,data)=>{
        errorCheck(err);
        if(data.rows !=''){
            res.writeHead(200,{'Content-Type':'application/json'});
            let item=JSON.stringify(data.rows);
            res.end(item);
        }
        else{
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:"No such icecream "}))
        }
    })
}
//err validation function
function errorCheck(err){
    if(err){
        throw err
    }
}
// post data
function addIcecreamToDb(req,res,info){
    let {name,description,price,rating,available}=info;
    pool.query(`INSERT INTO data (name, description, price, rating, available)
         VALUES($1,$2,$3,$4,$5) RETURNING *`,
         [name,description,price,rating,available],(err,data)=>{
            errorCheck(err);
            let postedData=JSON.stringify(data.rows)
            console.log('Data posted sucessfully');
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(postedData);
         })
}
//custom body parser
 async function bodyParserCustom(req){
        return new Promise((resolve, reject) => {
            let body= '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
    
            req.on('end', () => {
                try {
                    req.body = JSON.parse(body);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    //modify the data in the datatbase
    function modifyTheData(req,res,info){
    pool.query(`UPDATE data SET  available=$1 WHERE id=$2 RETURNING *`,[req.body.available,info],(err,data)=>{
    errorCheck(err) //logs err if any
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({message:"Updated database sucessfully.."}));
 })
    }
    //custom params (mocking express's req.params)
    function customParams(req){
        return new Promise((resolve,reject)=>{
            try {
                let id=req.url.split('/')[4];
                req.params=id;
                resolve()
            } catch (error) {
                reject(err)
            }
        })
    }
    // deleting a item from database
    function removeIcecream(req,res){
        pool.query(`DELETE FROM data WHERE id=$1 RETURNING *`,[req.params],(err,data)=>{
            errorCheck(err);
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:"Deleted item from database sucessfully"}));
        })
    }
module.exports={
    getAlldata,
    invalidRequest,
    individualIcecream,
    bodyParserCustom,
    addIcecreamToDb,
    modifyTheData,
    customParams,
    removeIcecream
}
