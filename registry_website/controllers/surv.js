var index = async(req, res) => {
 
        res.render('surv/dash',{layout:'./layouts/layout1/full-admin3'})
    
   

}
var detail = async(req, res) => {
 
    res.render('surv/detail_note',{layout:'./layouts/layout1/full-admin3'})



}
module.exports = {
    
    
    index:index,
    detail:detail
     
 }