var list = async (req,res)=>{
    res.render('workflow/list',{layout:false})
}
var detail = async (req,res)=>{
    res.render('workflow/detail',{layout:false})
}

var send = async (req,res)=>{
    res.render('workflow/send',{layout:false})
}
module.exports = {
    
    
    list:list,
    detail:detail,
    send:send
   
     
 }