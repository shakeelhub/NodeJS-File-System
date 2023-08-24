const express = require("express");
const fs =require("fs");
const app = express();

const PORT = 3000;
app.get("/", function (request, response) {
  response.send("Welcome🙋‍♂️, 🌏 🎊✨🤩");
});

const date_time=()=>{
        const dateObject = new Date();
        // current date
       
        const date = (`0 ${dateObject.getDate()}`).slice(-2);
         
        // current month
        const month = (`0 ${dateObject.getMonth() + 1}`).slice(-2);
         
        // current year
        const year = dateObject.getFullYear();
         
        // current hours
        const hours = dateObject.getHours();
         
        // current minutes
        const minutes = dateObject.getMinutes();
         
        // current seconds
        const seconds = dateObject.getSeconds();
         
        return `Date_${date}_${month}_${year}_Time_${hours}_${minutes}_${seconds}`
}

//! to create time stamp file inside folder.
app.get("/create", function (request, response) {
  response.send({message:"File is created successfully"});
  const date=new Date()
  date_time()
  fs.writeFile(`./store-file-folder/${date_time()}.txt`,`${date}`,(err)=>{
      console.log(err);
    })
});




//! To Retrive all the text file in the particular folder.
app.get("/show",function(request, response){

    fs.readdir('./store-file-folder', async(err,files)=>{
        if(files.length ==0){
            response.status(404).send({message:'No files found, Create and try again!'} )
        }else{
            let arr=[]
            for(let file of files){
                fs.readFile(`./store-file-folder/${file}`,"utf-8",(err,data)=>{
                    if(err){
                        console.log(err)
                    }else{
                        arr.push({[file]:data})
                        if(arr.length ==files.length) response.send(arr)
                    }
                })
            }
        }
    })
})


app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
