const ip="http://192.168.100.203"
const EXP="EXP002"
const fetch = require("node-fetch");
const admin= require("../firebase/firebaseConnection")
const database = admin.database();
const EXPRef = database.ref('/'+EXP);
const EXPData = database.ref('/'+EXP+'_Data');

// usersRef.on('value', snapshot => {
//   var data = snapshot.val();
//   console.log(data);
// });

EXPRef.on('value', snapshot => {
    var data = snapshot.val();
    if (data.Run==1){
     console.log(EXP+": Start");
     fetchip2("/Start")
    }
    else if(data.Run==0){
      console.log(EXP+": Stop");
      fetchip2("/Stop")
    }
    
}); 

fetchip2=(reqs)=>{
  fetch((ip+reqs),{
    method: 'POST',
    header:{'Content-Type':'application/json'}
    })
      .then(res=>{
        return res.json()
      }) 
      .then(data=>{
        console.log(EXP)
        console.log(data) 
        if(reqs=="/Start"){
          updateData(data)
      }
      })
      .catch(error => {
        var data1={
          Run:2
        }
        updateRef(data1)
        console.log(EXP+": Error")
      })
}

updateData =(myData)=>{
    EXPData.update(myData,function(err){
          if(err){
              console.log(err);
          }else{
              console.log({"message":"Successfully updated data","result":true});
          }
    });
}
updateRef = (myData)=>{ 
    EXPRef.update(myData,function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log({"message":"Successfully updated data","result":true});
      }
    }); 
}
// app.get('/setdata', (req, res) => {
//   var data={
//       Data:30,
//       Run:2
//   }
//   usersRef.update(data,function(err){
//       if(err){
//           res.send(err);
//       }else{
//           res.json({"message":"Successfully updated data","result":true});
//       }
//   });

// });

module.exports=EXPRef;
//module.exports.EXPData=EXPData;
