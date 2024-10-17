const {role} = require("../models/class_api_intern/role");
const { data_default_role } = require("../settings/default");
function check_role (){
let class_role = new role()
data_default_role.map(async elt=>{
    let data = await class_role.read({Intitule_role:elt.Intitule})
    if(data.length==0){
        let date = new Date()
    let val = await class_role.create({
        
        Intitule_role :elt.Intitule,
        TypeStruct:elt.Type,
        Default:true,
        Date_creation : date,
        Date_modification : date,
        Datesystem : date,






    })
   
    }
})
}
module.exports={
    check_role:check_role
}