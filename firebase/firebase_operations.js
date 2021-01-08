const fetch = require("node-fetch");
const admin= require('../firebase/firebaseConnection');

fetchip=(ip,reqs,EXP)=>{ // rReturn twice to get back the data 
    fetch((ip+reqs),{
      method: 'GET',
      header:{'Content-Type':'application/json'}
      })
        .then(res=>{
          return res.json()
        }) 
        .then(data=>{
          console.log(EXP)
          console.log(data) 
          if(reqs=="/Start"){
            updateData(data,EXP)
          }
        })
        .catch(error => {
          var msg={
            Run:2,
            Status:"Inactive"
          } 
          updateRef(msg,EXP)
          console.log(EXP+": Error")
        })
  }
  
 updateData = (myData,EXP)=>{ 
    const database = admin.database();
    const EXPData = database.ref('/'+EXP+'_Data');
    EXPData.update(myData,function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log({"message":"Successfully updated data","result":true});
      }
    });
  }
  updateRef = (myData,EXP)=>{ 
    const database = admin.database();
    const EXPRef = database.ref('/'+EXP);
    EXPRef.update(myData,function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log({"message":"Successfully updated Refdata","result":true});
      }
    }); 
  }

  module.exports={
      fetchip,
      updateData,
      updateRef
  }