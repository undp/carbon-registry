const bdd_test = require("../../bdd/bdd").Documents


class document
{
    constructor (){

    }

   async create(data){
        try {
            const content = new bdd_test(data)
            const element =await content.save();
             
            return element;
        } catch (error) {
            throw new Error(error);
    }
   }
   async read(data){
        try {
         
            const element = await  bdd_test.find(
                data
            );
            return element;
        } catch (error) {
            throw new Error(error);
        }
   }
   async update(id,data){
    try {
        const element = await bdd_test.findByIdAndUpdate(id, data, { new: true });
        return element;
    } catch (error) {
        throw error;
    }
   
   }
   async delete(id){
    try {
        const deletedElement = await bdd_test.findByIdAndDelete(id);
        if (deletedElement) {
            // L'élément a été trouvé et supprimé avec succès
            return true;
        } else {
            // Aucun élément correspondant à l'ID n'a été trouvé
            return false;
        }
    } catch (error) {
        throw error;
    }
   }
}

module.exports ={
    document:document
};