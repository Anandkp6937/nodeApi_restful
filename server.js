const http=require('node:http');
const PORT=process.env.PORT || 8008;
const {getAlldata,invalidRequest,individualIcecream,bodyParserCustom,addIcecreamToDb,modifyTheData,customParams,removeIcecream}=require('./controller/controller');

const server=http.createServer(async(req,res)=>{
    if(req.url==='/api/icecreams' && req.method=='GET'){
        getAlldata(req,res);
    }
    else if (req.url.match(/\/api\/icecream\/([0-9]+)/) && req.method=='GET'){
        let id=req.url.split('/')[3];
        individualIcecream(req,res,id);
    }
    else if(req.url==='/api/icecream' && req.method==='POST'){
        await bodyParserCustom(req);
        let info=req.body;
        addIcecreamToDb(req,res,info);
        console.log(req.body);
    }
    else if(req.url.match(/\/api\/icecream\/available\/([0-9]+)/) && req.method==='PUT'){
        await bodyParserCustom(req);
       await customParams(req);
        let info=req.params;
        modifyTheData(req,res,info);
    }
    else if(req.url.match(/\/api\/icecream\/delete\/([0-9]+)/) && req.method==="DELETE"){
        await customParams(req);
        removeIcecream(req,res);
    }
    else{
        invalidRequest(req,res);
    }

})
server.listen(PORT,()=>{
    console.log(`server started on port:${PORT}`);
})