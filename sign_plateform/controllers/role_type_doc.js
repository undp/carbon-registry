const {role_type_doc }= require("../models/class_api_intern/role_type_doc");
const { role } = require("../models/class_api_intern/role");
const { type_doc } = require("../models/class_api_intern/type_doc");
const { isNotEmpty, generateauthenticateToken, isObjectsuccess, verifierID } = require("../models/function_intern/function");

const class_test = new role_type_doc()
const class_role = new role()
const class_type_doc = new type_doc()
var create_test = async(req,res)=>{

    if(isNotEmpty(req.body.IdType,req.body.IdRole) ){
        // res.status(403).json({ message: 'Empty Token' })
        if(verifierID(req.body.IdRole) && verifierID(req.body.IdType) ){

       
              
                let check1 = false
                let check2 = false
                let check3 = false
                let data_role = await class_role.read({_id:req.body.IdRole})
        
                let data_type = await class_type_doc.read({_id:req.body.IdType})
              
                let data_role_type = await class_test.read({IdRole:req.body.IdRole,IdType:req.body.IdType})
                if(data_role.length===0){
                    check1 =true
               
                    res.status(401).json({status:401, message: 'Role error' })
                }
                if(data_type.length===0 && !check1 ){
                    check2 =true
                   
                    res.status(402).json({status:402, message: 'Type doc error' })
                }
                if(data_role_type!=0 && !check2 ){
                    check3 =true
                   
                    res.status(402).json({status:402, message: 'Already created' })
                }
                if(!check2 && !check1 && !check3){
                    let date = new Date()
                    let val = await class_test.create({
                        
                      
                        IdType : req.body.IdType,
                        IdRole : req.body.IdRole,
                       
                        Date_creation : date,
                        Date_modification : date,
                        Datesystem : date,
            
            
            
            
            
                    })
                    
                    isObjectsuccess(val._id)?res.status(200).json({status:200, message: 'Success',data:val }):res.status(404).json({status:404, message: 'Error system' });
                }
            
            }else{
                res.status(401).json({status:401, message: 'Id error' })
            }
    }else{
        res.status(401).json({status:401, message: 'Empty data' })
    }
    
   
}
var read_test = async(req,res)=>{

    if(isNotEmpty(req.body._id) && verifierID(req.body._id) ){
       
        let val = await class_test.read(req.body)
     
      
        isObjectsuccess(val)?res.status(200).json({status:200, message: 'Success',data:val }):res.status(404).json({status:404, message: 'Error system' })
    }else{
        if(req.body._id===undefined){
            let val = await class_test.read(req.body)
     
      
            isObjectsuccess(val)?res.status(200).json({status:200, message: 'Success',data:val }):res.status(404).json({status:404, message: 'Error system' })
        }else{
            res.status(405).json({status:405, message: 'Error Id' })
        }
        
    }
}
var update_test = async(req,res)=>{
    if(isNotEmpty(req.body._id) && verifierID(req.body._id)){
       
    
        let val = await class_test.update(req.body._id,req.body)

        console.log(val)
       val?res.status(200).json({status:200, message: 'Success' }):res.status(404).json({status:404, message: 'Error system' })
        
    }else{
        res.status(401).json({status:401, message: 'Empty data' })
    }
}
var delete_test = async(req,res)=>{
    console.log(req.body)
    if(isNotEmpty(req.body._id) && verifierID(req.body._id) ){
       
    
        let val = await class_test.delete(req.body._id)
       val?res.status(200).json({status:200, message: 'Success' }):res.status(404).json({status:404, message: 'Error system' })
        
    }else{
        res.status(401).json({status:401, message: 'Empty data' })
    }
}
module.exports={
    create_test:create_test,
    read_test:read_test,
    update_test:update_test,
    delete_test:delete_test,
}