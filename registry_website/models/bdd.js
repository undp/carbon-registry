const bdd_cat = require("../bdd/bdd").Categorie
const bdd_file= require("../bdd/bdd").File

class categorie
{
    constructor (){

    }

   async create(data){
        try {
            const content = new bdd_cat(data)
            const element =await content.save();
             
            return element;
        } catch (error) {
            throw new Error(error);
    }
   }
   async read(data){
        try {
         
            const element = await  bdd_cat.find(
                data
            );
            return element;
        } catch (error) {
            throw new Error(error);
        }
   }
   async update(id,data){
    try {
        const element = await bdd_cat.findByIdAndUpdate(id, data, { new: true });
        return element;
    } catch (error) {
        throw error;
    }
   
   }
   async delete(id){
    try {
        const deletedElement = await bdd_cat.findByIdAndDelete(id);
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
class file
{
    constructor (){

    }

   async create(data){
        try {
            const content = new bdd_file(data)
            const element =await content.save();
             
            return element;
        } catch (error) {
            throw new Error(error);
    }
   }
   async read(data){
        try {
         
            const element = await  bdd_file.find(
                data
            );
            return element;
        } catch (error) {
            throw new Error(error);
        }
   }
   async update(id,data){
    try {
        const element = await bdd_file.findByIdAndUpdate(id, data, { new: true });
        return element;
    } catch (error) {
        throw error;
    }
   
   }
   async delete(id){
    try {
        const deletedElement = await bdd_file.findByIdAndDelete(id);
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
categorie:categorie,
file:file

}