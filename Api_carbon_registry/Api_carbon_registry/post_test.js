const axios = require('axios');
/*
const payload = {

    IdPlanteurStock:'63d98549e595995234a4cbd0',
    IdGroupementStock: '63d907480e9f47048c0d7783',

    Variete:[
            {
                IdVarieteStock: '63d9057f0e9f47048c0d7782',
                NombreDeSacStock: '5',
                QuantiteStock: '3',
                IdQualiteStock: '63d903a00e9f47048c0d7781',
                CoutAcquisitionStock:'5000'
                 
            },     
            
            {
                IdVarieteStock: '63d9057f0e9f47048c0d7782',
                NombreDeSacStock: '15',
                QuantiteStock: '5',
                IdQualiteStock: '63d903a00e9f47048c0d7781',
                CoutAcquisitionStock:'5000'
                 
            }, 
        ]
  }
*/


 var list_mvt=[
  {
    "_id": "651f1e0e3c9f2a6de8b00f5f",
    "IdPlanteur": "648882f7b8096f1c60731862",
    "Datemvt": "5-10-2023 20:35",
    "Status": "actif",
    "manu": "non",
    "Sensmvt": "Entree",
    "IdVariete": "64898b7cb8096f1c60731872",
    "Quantite": "3640",
    "Coutunitaire": "180",
    "Entrepot": " ",
    "Ilot": " ",
    "Datesystem": "2023-10-05T20:35:26.217Z",
    "__v": 0
},
{
    "_id": "651f1ecd3c9f2a6de8b00f61",
    "IdPlanteur": "648882f7b8096f1c60731862",
    "Datemvt": "5-10-2023 20:38",
    "Status": "actif",
    "manu": "non",
    "Sensmvt": "Entree",
    "IdVariete": "64898b7cb8096f1c60731872",
    "Quantite": "2768",
    "Coutunitaire": "170",
    "Entrepot": " ",
    "Ilot": " ",
    "Datesystem": "2023-10-05T20:38:37.682Z",
    "__v": 0
},
{
    "_id": "651f1f233c9f2a6de8b00f63",
    "IdPlanteur": "648882f7b8096f1c60731862",
    "Datemvt": "5-10-2023 20:40",
    "Status": "actif",
    "manu": "non",
    "Sensmvt": "Entree",
    "IdVariete": "64898b7cb8096f1c60731872",
    "Quantite": "3693",
    "Coutunitaire": "175",
    "Entrepot": " ",
    "Ilot": " ",
    "Datesystem": "2023-10-05T20:40:03.585Z",
    "__v": 0
},
{
    "_id": "651f26b23c9f2a6de8b00f65",
    "IdPlanteur": "64e747890b7a0b102e417fda",
    "Originemvt": "RECEP64e747890b7a0b102e417fda51020232112",
    "Datemvt": "5-10-2023 21:12",
    "Status": "actif",
    "manu": "oui",
    "Sensmvt": "Entree",
    "IdVariete": "6489cfebb8096f1c60731877",
    "Quantite": "500",
    "Coutunitaire": "350",
    "Entrepot": "6492bf33b8096f1c60731886",
    "Ilot": "64b554250b7a0b102e417f72",
    "Datesystem": "2023-10-05T21:12:18.977Z",
    "__v": 0
},
{
    "_id": "651f46843c9f2a6de8b00f67",
    "IdPlanteur": "648882f7b8096f1c60731862",
    "Datemvt": "5-10-2023 23:28",
    "Status": "actif",
    "manu": "non",
    "Sensmvt": "Entree",
    "IdVariete": "64898b7cb8096f1c60731872",
    "Quantite": "2000",
    "Coutunitaire": "50",
    "Entrepot": " ",
    "Ilot": " ",
    "Datesystem": "2023-10-05T23:28:04.112Z",
    "__v": 0
},
{
    "_id": "651f48f73c9f2a6de8b00f69",
    "IdPlanteur": "648882f7b8096f1c60731862",
    "Originemvt": "RECEP648882f7b8096f1c6073186251020232338",
    "Datemvt": "5-10-2023 23:38",
    "Status": "actif",
    "manu": "non",
    "Sensmvt": "Entree",
    "IdVariete": "6482761c1cbee308d1f23ed5",
    "Quantite": "0",
    "Coutunitaire": "150",
    "Entrepot": " ",
    "Ilot": " ",
    "Datesystem": "2023-10-05T23:38:31.062Z",
    "__v": 0
},
{
    "_id": "651f49753c9f2a6de8b00f6b",
    "IdPlanteur": "648882f7b8096f1c60731862",
    "Originemvt": "RECEP648882f7b8096f1c6073186251020232340",
    "Datemvt": "5-10-2023 23:40",
    "Status": "actif",
    "manu": "non",
    "Sensmvt": "Entree",
    "IdVariete": "6482761c1cbee308d1f23ed5",
    "Quantite": "0",
    "Coutunitaire": "150",
    "Entrepot": " ",
    "Ilot": " ",
    "Datesystem": "2023-10-05T23:40:37.890Z",
    "__v": 0
},
{
    "_id": "651f49b33c9f2a6de8b00f6d",
    "IdPlanteur": "648882f7b8096f1c60731862",
    "Originemvt": "RECEP648882f7b8096f1c6073186251020232341",
    "Datemvt": "5-10-2023 23:41",
    "Status": "actif",
    "manu": "non",
    "Sensmvt": "Entree",
    "IdVariete": "6482761c1cbee308d1f23ed5",
    "Quantite": "200",
    "Coutunitaire": "150",
    "Entrepot": " ",
    "Ilot": " ",
    "Datesystem": "2023-10-05T23:41:39.824Z",
    "__v": 0
},
{
    "_id": "651f50c13c9f2a6de8b00f6f",
    "IdPlanteur": "648882f7b8096f1c60731862",
    "Originemvt": "RECEP648882f7b8096f1c607318626102023011",
    "Datemvt": "6-10-2023 0:11",
    "Status": "actif",
    "manu": "non",
    "Sensmvt": "Entree",
    "IdVariete": "64830ba91cbee308d1f23eda",
    "Quantite": "1000",
    "Coutunitaire": "200",
    "Entrepot": " ",
    "Ilot": " ",
    "Datesystem": "2023-10-06T00:11:45.200Z",
    "__v": 0
},
{
    "_id": "651f52553c9f2a6de8b00f71",
    "IdPlanteur": "648882f7b8096f1c60731862",
    "Originemvt": "RECEP648882f7b8096f1c607318626102023018",
    "Datemvt": "6-10-2023 0:18",
    "Status": "actif",
    "manu": "non",
    "Sensmvt": "Entree",
    "IdVariete": "6489cd8cb8096f1c60731875",
    "Quantite": "300",
    "Coutunitaire": "150",
    "Entrepot": " ",
    "Ilot": " ",
    "Datesystem": "2023-10-06T00:18:29.649Z",
    "__v": 0
}
]

//https://api.locagri.digi-pme.com

//https://apifonds.locagri.digi-pme.com


axios.post('https://apifonds.locagri.digi-pme.com/users/apiv1/listdemande',{
 

}).then((response)=>{


    console.log(response.data)

})


