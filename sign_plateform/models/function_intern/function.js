const { JWT_SECRET, JWT_Token_duration, api_origin,site_verif_doc, link_evaluation } = require("../../settings/default");
const { v4: uuidv4 } = require('uuid');
const PDFDocument = require("pdfkit");
const jwt = require('jsonwebtoken');
const fs = require("fs");
const QRCode = require('qrcode');
const c_document = require("../class_api_intern/document").document;

function isNotEmpty(...variables) {
    for (let variable of variables) {
        // Vérifie si la variable est définie et qu'elle n'est pas égale à null ou undefined
        if (variable != null && variable !== undefined) {
            // Si la variable est un objet, vérifie sa longueur (s'il s'agit d'un tableau ou d'une chaîne de caractères)
            if (typeof variable === 'object' && Object.keys(variable).length === 0) {
                return false;
            }
            // Si la variable est une chaîne de caractères, vérifie sa longueur
            if (typeof variable === 'string' && variable.trim().length === 0) {
                return false;
            }
            // Si la variable est un nombre, un booléen, etc., elle est considérée comme non vide
            continue; // Passe à la prochaine variable
        }
        // Si la variable n'est pas définie ou qu'elle est nulle, elle est considérée comme vide
        return false;
    }
    // Si toutes les variables sont non vides, renvoie true
    return true;
}
function isObjectsuccess(variable){
    if (typeof variable === 'object') {
        if( Object.keys(variable).length === 0){
            return true;
        }
        if(variable.length==0 || variable.length!=0){
            return true;
        }
       
    }
   
    return false
}
function setDefaultIfEmpty(variable) {
    // Vérifie si la variable est définie et qu'elle n'est pas égale à null ou undefined
    if (variable != null && variable !== undefined) {
        // Si la variable est une chaîne de caractères vide, retourne une chaîne vide
        if (typeof variable === 'string' && variable.trim().length === 0) {
            return "";
        }
        // Si la variable est un objet/array vide, retourne une chaîne vide
        if (typeof variable === 'object' && Object.keys(variable).length === 0) {
            return "";
        }
        // Si la variable n'est pas vide, retourne la variable telle quelle
        return variable;
    }
    // Si la variable est nulle ou indéfinie, retourne une chaîne vide
    return "";
}
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({status:401, message: 'Token Empty' });
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ stauts:403,message: 'Token Error' });
      req.user = user;
      next();
    });
  }
function generateauthenticateToken (data){
    
    return jwt.sign(data, JWT_SECRET, { expiresIn: JWT_Token_duration });
    
}
function generatecode(size){
    let code = '';
    for (let i = 0; i < size; i++) {
        code += Math.floor(Math.random() * 10); // génère un chiffre aléatoire entre 0 et 9 et l'ajoute au code
    }
    return code;
}
function verifierID(id) {
    // Expression régulière pour vérifier si l'ID est une chaîne hexadécimale de 24 caractères
    const regex = /^[0-9a-fA-F]{24}$/;
    return regex.test(id);
}
async function generate_identify_code(types,coderef){
    let code
    switch (types) {
        case "approbation_letter":
            code="RCCI-APL-"+coderef
            break;
        case "autorisation_letter":
            code="RCCI-AUL-"+coderef
            break;
        case "objection_letter":
            code="RCCI-OBL-"+coderef
            break;
        case "eligibilite_letter":
            code="RCCI-ELL-"+coderef
            break;
    }
    return code
}
async function formatCode(code) {
    // Convertir le code en chaîne de caractères
    let codeStr = code.toString();

    // Déterminer la longueur cible basée sur la longueur actuelle
    let targetLength;
    if (codeStr.length <= 6) {
        targetLength = 6;
    } else if (codeStr.length <= 8) {
        targetLength = 8;
    } else {
        targetLength = 12;
    }

    // Ajouter des zéros devant jusqu'à atteindre la longueur cible
    while (codeStr.length < targetLength) {
        codeStr = '0' + codeStr;
    }

    return codeStr;
}
async function generateRandomCode(length = 12) {
    // Initialiser une variable pour le code aléatoire
    let randomCode = '';
    load=true
    while (load) {
        for (let i = 0; i < length; i++) {
            // Ajouter un chiffre aléatoire entre 0 et 9
            randomCode += Math.floor(Math.random() * 10).toString();
        }
    
        let class_document = new c_document()
        let list = await class_document.read({Immat:"IDRC"+randomCode})
        if(list.length==0){
            load=false
        }
    }
    // Ajouter des chiffres aléatoires jusqu'à atteindre la longueur désirée
   
    return "IDRC"+randomCode;
}
async function generate_global_code(types){
    let class_document = new c_document()
    let list = await class_document.read()
    let code
    console.log(list.length)
            if(list.length==0){
                
                code=1
            }else{
                let arr =list.slice(-1)[0]
                code = parseInt(arr.Numero_de_validation) +1
            }
            code=await formatCode(code )
            let op_code= await generate_identify_code(types,code)
            let random = await generateRandomCode(12)
            return {code:code,otp:op_code,random:random}
}
function addFooter(doc,site,code) {
    const range = doc.bufferedPageRange();
    console.log(range.count)
    console.log(range.start)
    for (let i = range.start; i < range.start + range.count; i++) {
        console.log(i)
      doc.switchToPage(i);
     
      const bottom = doc.page.height - 40;
      
    //   doc.text(`Page ${i + 1} fof ${range.count}`, 
    //               50, 
    //               doc.page.height - 40, 
    //               { height : 25, width : 100});
      doc.fillColor('#F77F00').rect(250, doc.page.height - 60,50,10).fill();
      doc.fillColor('#009E60').rect(320, doc.page.height - 60,50,10).fill();
      doc.fillColor('#009E60').rect(10, doc.page.height - 40,150,20).fill();
      doc.fontSize(7) 
      doc.font("./publics/fonts/Inter-Bold.otf").text(`Document généré électroniquement par le bureau du marché carbone`, 
      170, 
      doc.page.height - 40, 
      { height : 50, width : 125});

      doc.font("./publics/fonts/Inter-Bold.otf").text(`Contrôlez l\'authenticité de ce document sur ${site} avec la référence ci-contre :`, 
      310, 
      doc.page.height - 40, 
      { height : 50, width : 125});
      doc.fillColor('#009E60').rect(460, doc.page.height - 40,150,20).fill();
      doc.fontSize(10) 
      doc.fillColor('#FFFFFF').font("./publics/fonts/Inter-Bold.otf").text(`${code}`, 
      470, 
      doc.page.height - 35, 
      { height : 50, width : 125});
    //   doc.text(`Page ${i + 1} of ${range.count}`, 
    //               400, 
    //               doc.page.height - 40, 
    //               { height : 25, width : 100});

    // doc.text(`Page ${i + 1} of ${range.count}`, 
    //               50, 
    //               doc.page.height - 20, 
    //               { height : 25, width : 100});
    //   doc.text(`Page ${i + 1} of ${range.count}`, 
    //               400, 
    //               doc.page.height - 20, 
    //               { height : 25, width : 100});
      // Draw left footer box
    //   doc.fillColor('#A0522D').rect(40, bottom, 10, 10).fill();
    //   doc.fillColor('black').fontSize(8).text('Document signé et horodaté électroniquement par la Direction Générale des Impôts', 70, bottom);
      
    //   // Draw right footer box
    //   doc.fillColor('#008000').rect(400, bottom, 10, 10).fill();
    //   doc.fillColor('black').fontSize(8).text('Contrôlez l\'authenticité de ce document sur https://e-impots.gouv.ci avec la référence ci-contre :', 420, bottom, { width: 150 });
    //   doc.fontSize(8).text('LIAS321110291081', 420, bottom + 10, { width: 150 });
    }
}
function addFooter_eng(doc,site,code) {
    const range = doc.bufferedPageRange();
    
    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      const bottom = doc.page.height - 40;
      
    //   doc.text(`Page ${i + 1} fof ${range.count}`, 
    //               50, 
    //               doc.page.height - 40, 
    //               { height : 25, width : 100});
      doc.fillColor('#F77F00').rect(250, doc.page.height - 60,50,10).fill();
      doc.fillColor('#009E60').rect(320, doc.page.height - 60,50,10).fill();
      doc.fillColor('#009E60').rect(10, doc.page.height - 40,150,20).fill();
      doc.fontSize(7) 
      doc.font("./publics/fonts/Inter-Bold.otf").text(`Document generated electronically by the carbon market office`, 
      170, 
      doc.page.height - 40, 
      { height : 50, width : 125});

      doc.font("./publics/fonts/Inter-Bold.otf").text(`Check the authenticity of this document on ${site} with the reference opposite:`, 
      310, 
      doc.page.height - 40, 
      { height : 50, width : 125});
      doc.fillColor('#009E60').rect(460, doc.page.height - 40,150,20).fill();
      doc.fontSize(10) 
      doc.fillColor('#FFFFFF').font("./publics/fonts/Inter-Bold.otf").text(`${code}`, 
      470, 
      doc.page.height - 35, 
      { height : 50, width : 125});
    //   doc.text(`Page ${i + 1} of ${range.count}`, 
    //               400, 
    //               doc.page.height - 40, 
    //               { height : 25, width : 100});

    // doc.text(`Page ${i + 1} of ${range.count}`, 
    //               50, 
    //               doc.page.height - 20, 
    //               { height : 25, width : 100});
    //   doc.text(`Page ${i + 1} of ${range.count}`, 
    //               400, 
    //               doc.page.height - 20, 
    //               { height : 25, width : 100});
      // Draw left footer box
    //   doc.fillColor('#A0522D').rect(40, bottom, 10, 10).fill();
    //   doc.fillColor('black').fontSize(8).text('Document signé et horodaté électroniquement par la Direction Générale des Impôts', 70, bottom);
      
    //   // Draw right footer box
    //   doc.fillColor('#008000').rect(400, bottom, 10, 10).fill();
    //   doc.fillColor('black').fontSize(8).text('Contrôlez l\'authenticité de ce document sur https://e-impots.gouv.ci avec la référence ci-contre :', 420, bottom, { width: 150 });
    //   doc.fontSize(8).text('LIAS321110291081', 420, bottom + 10, { width: 150 });
    }
}

async function generateLetter_approbation(programmeId, programmeName, authorisedCompanyName, orgs, submissionDate,random,refNo) {
    const uniqueID = uuidv4();
    const country ="Côte d'Ivoire"
    const minister = "M." 
    const ministry = "Ministère de l'environnement " 
    const filepath = "./generate/approbation/"+`LETTER_OF_APPROBATION_${uniqueID}_${programmeId}.pdf` 
    const to_send = api_origin +`/approbation/LETTER_OF_APPROBATION_${uniqueID}_${programmeId}.pdf` 
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
    const date = new Date().toLocaleDateString('fr-FR', options)

    const url =  link_evaluation+random;
    const qrCodeImage = await QRCode.toDataURL(url);
    const doc =  new PDFDocument({bufferPages: true})
    let orgName = orgs
  
    const stream = fs.createWriteStream(filepath) 
    doc.pipe(stream) 
    doc.fontSize(11) 


       
    // Add header
    doc.image("./publics/images/logo.png",50,30, {
      fit: [150, 50],
    

    });
    doc.image(qrCodeImage ,450,20, {
        fit: [150, 100],
       
      });

      doc.moveDown();
      doc.fontSize(10);
    doc.text(`République de ${country}`,{
        align: "center",
    });
    doc.text(`Union - Discipline - Travail`, {
        align: "center",

      });

      doc.moveDown();
    doc.text("Ministère de l'Environnement", {
        align: "center",
       
      });
  
    doc.text("et de la transition Ecologique",{
        align: "center",
         
        });


 
    doc.moveDown();
  
    doc.fontSize(12);
  
  
   
      doc.moveDown();
    doc.text("Bureau du marché carbone Côte D'Ivoire", {
      align: "center",
      margin: [20, 0, 20, 0],
    });
   
    doc.moveDown();
    doc.text(`Réf. : ${refNo}`, {
        align: "left",
        margin: [20, 0, 20, 0],
      });
    doc.text(`Abidjan, le ${date}`, {
      align: "right",
      margin: [20, 0, 20, 0],
    });

    
    doc.moveDown();

  
    doc.fontSize(9);
    doc.font("./publics/fonts/Inter-Bold.otf").text(`\n\nOBJET : LETTRE D'APPROBATION POUR L'INSCRIPTION AU REGISTRE CARBONE`, {
        underline: true,
    }).moveDown();
    
    doc.font("./publics/fonts/Inter-Regular.otf");
    
    const paragraphs = [
        `Madame, Monsieur,\n\nPar la présente, nous avons le plaisir de vous informer que ${authorisedCompanyName}, en sa qualité d'autorité désignée du ${ministry}, approuve l'inscription de ${orgName} au registre carbone national de ${country}.`,
    
        `Cette approbation fait suite à une évaluation détaillée de votre projet intitulé ${programmeName}, soumis le ${submissionDate}, conformément aux critères établis par les réglementations en vigueur et les standards internationaux relatifs aux marchés carbone. Le projet répond pleinement aux exigences de durabilité environnementale et sociale, et nous reconnaissons son potentiel à contribuer de manière significative à la réduction des émissions de gaz à effet de serre et à la promotion du développement durable dans notre pays.`,
    
        `À cet effet, nous vous confirmons que :
        \n(a) ${orgName} est dûment autorisé à opérer dans le cadre du marché carbone de ${country}.
        \n(b) Les crédits carbones générés par ${orgName} seront éligibles à être enregistrés et échangés sur le registre carbone de ${country}.
        \n(c) L'autorité compétente surveillera la mise en œuvre du projet et la vérification des réductions d'émissions conformément aux protocoles définis.`,
    
        `Nous tenons à féliciter ${orgName} pour son engagement envers la protection de l'environnement et la lutte contre le changement climatique. Nous sommes convaincus que ce projet contribuera positivement à nos objectifs nationaux de réduction des émissions et à nos engagements internationaux dans le cadre de l'Accord de Paris.`,
    
        `Nous restons à votre disposition pour toute information complémentaire ou assistance nécessaire dans la poursuite de vos efforts.`,
    ];
    
    paragraphs.forEach((paragraph) => {
        doc
            .list([paragraph], {
                bulletRadius: 2, // Rayon des puces
                bulletIndent: 20, // Indentation des puces
                textIndent: 15, // Indentation du texte après les puces
                listType: "",
            })
            .moveDown(); 
    });
    doc.fontSize(10);
    doc.text(`\n\nVeuillez agréer, Madame, Monsieur, l'expression de nos salutations distinguées.`, {
        align: "left",
    });
    
    doc.text(`\n\n signature`, {
        align: "left",
    });
    
    doc.text(`${minister}`, {
        align: "left",
    });
    
    doc.text(`Ministre de l'environnement`, {
        align: "left",
    });
    
    doc.text(`${ministry}`, {
        align: "left",
    });
    // const range = doc.bufferedPageRange();

    // for( let i = range.start; i <  (range.start + range.count); i++) {

    // doc.switchToPage(i);
    // doc.text(`Page ${i + 1} of ${range.count}`, 
    //             200, 
    //             doc.page.height - 40, 
    //             { height : 25, width : 100});
    // }
    addFooter(doc,site_verif_doc,random)
    doc.end();
    
   
 
//    const url = await this.fileHandler.uploadFile("documents/" + filepath, content) 
 return to_send
}
async function generateLetter_approbation_eng(programmeId, programmeName, authorisedCompanyName, orgs, submissionDate,random,refNo) {
    const uniqueID = uuidv4();
    const country ="Côte d'Ivoire"
    const minister = "M." 
    const ministry = "Minister de l'environnement " 
    const filepath = "./generate/approbation/"+`LETTER_OF_APPROBATION_${uniqueID}_${programmeId}.pdf` 
    const to_send = api_origin +`/approbation/LETTER_OF_APPROBATION_${uniqueID}_${programmeId}.pdf` 
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
    const date = new Date().toLocaleDateString('fr-FR', options)

    const url =  link_evaluation+random;
    const qrCodeImage = await QRCode.toDataURL(url);
    const doc = new PDFDocument() 
    let orgName = orgs
  
    const stream = fs.createWriteStream(filepath) 
    doc.pipe(stream) 
    doc.fontSize(11) 


       
    // Add header
doc.image("./publics/images/logo.png", 50, 30, {
    fit: [150, 50],
});
doc.image(qrCodeImage, 450, 20, {
    fit: [150, 100],
});

doc.moveDown();
doc.fontSize(10);
doc.text(`Republic of ${country}`, {
    align: "center",
});
doc.text(`Union - Discipline - Labor`, {
    align: "center",
});

doc.moveDown();
doc.text("Ministry of Environment", {
    align: "center",
});

doc.text("and Ecological Transition", {
    align: "center",
});

doc.moveDown();

doc.fontSize(12);

doc.moveDown();
doc.text("Carbon Market Office Côte D'Ivoire", {
    align: "center",
    margin: [20, 0, 20, 0],
});

doc.moveDown();
doc.text(`Ref: ${refNo}`, {
    align: "left",
    margin: [20, 0, 20, 0],
});
doc.text(`Abidjan, ${date}`, {
    align: "right",
    margin: [20, 0, 20, 0],
});

doc.moveDown();

doc.fontSize(9);
doc.font("./publics/fonts/Inter-Bold.otf").text(`\n\nSUBJECT: APPROVAL LETTER FOR CARBON REGISTRY ENROLLMENT`, {
    underline: true,
}).moveDown();

doc.font("./publics/fonts/Inter-Regular.otf");

const paragraphs = [
    `Dear Sir/Madam,\n\nWe are pleased to inform you that ${authorisedCompanyName}, in its capacity as the designated authority of ${ministry}, approves the enrollment of ${orgName} in the national carbon registry of ${country}.`,

    `This approval follows a detailed evaluation of your project titled ${programmeName}, submitted on ${submissionDate}, in accordance with the criteria established by current regulations and international standards related to carbon markets. The project fully meets environmental and social sustainability requirements, and we recognize its potential to significantly contribute to greenhouse gas emission reductions and the promotion of sustainable development in our country.`,

    `To this end, we confirm that:
    \n(a) ${orgName} is duly authorized to operate within the carbon market framework of ${country}.
    \n(b) The carbon credits generated by ${orgName} will be eligible for registration and trading on the carbon registry of ${country}.
    \n(c) The competent authority will oversee the implementation of the project and the verification of emission reductions in accordance with defined protocols.`,

    `We would like to congratulate ${orgName} for its commitment to environmental protection and the fight against climate change. We are confident that this project will positively contribute to our national emission reduction goals and our international commitments under the Paris Agreement.`,

    `We remain at your disposal for any additional information or assistance you may need in pursuing your efforts.`,
];

paragraphs.forEach((paragraph) => {
    doc
        .list([paragraph], {
            bulletRadius: 2, // Radius of the bullet points
            bulletIndent: 20, // Indentation of the bullet points
            textIndent: 15, // Indentation of the text after the bullet points
            listType: "",
        })
        .moveDown(); 
});

doc.fontSize(10);
doc.text(`\n\nPlease accept, Sir/Madam, the assurances of our highest consideration.`, {
    align: "left",
});

doc.text(`\n\nSignature`, {
    align: "left",
});

doc.text(`${minister}`, {
    align: "left",
});

doc.text(`Minister of Environment`, {
    align: "left",
});

doc.text(`${ministry}`, {
    align: "left",
});
addFooter_eng(doc,site_verif_doc,random)
doc.end();

    
   
 
//    const url = await this.fileHandler.uploadFile("documents/" + filepath, content) 
 return to_send
}
async function generateLetter_objection_eng(refNo,ministry,minister,orgs, programmeName, programmeId,random) {
    const uniqueID = uuidv4();
    const country ="Côte d'Ivoire"
  
 const url =  link_evaluation+random;
    const qrCodeImage = await QRCode.toDataURL(url);
    const to_send = api_origin +`/objection/NO_OBJECTION_LETTER_${uniqueID}_${programmeId}.pdf`
    const ministerWithDesignation = "Carbon register market"
        const capital = "Abidjan"

        const filepath = `NO_OBJECTION_LETTER_${uniqueID}_${programmeId}.pdf`

        const date = new Date().toDateString();
        let orgName;
        orgs.map((elt,index)=>{
        if (index >0) {
          
               
                orgName += ' and ' + elt
           
            
        } else {
            orgName =elt
        }})
        // Create a document
        const doc = new PDFDocument();
        const stream = fs.createWriteStream("./generate/objection/"+ filepath);
        doc.pipe(stream);
        // Add header
        doc.image("./publics/images/logo.png",50,30, {
            fit: [150, 50],
        
    
        });
        doc.image(qrCodeImage ,450,20, {
            fit: [150, 100],
            
            });
    
            doc.fontSize(10);
            doc.text(`République de ${country}`,{
                align: "center",
            });
            doc.text(`Union - Discipline - Travail`, {
                align: "center",
        
              });
        
              doc.moveDown();
            doc.text("Ministère de l'Environnement", {
                align: "center",
               
              });
          
            doc.text("et de la transition Ecologique",{
                align: "center",
                 
                });
              doc.moveDown();
        doc
        .fontSize(8)
        .text(capital + ', ' + date, {
            align: 'right'
        });
    
        doc.fontSize(9);
        doc
        .font('./publics/fonts/Inter-Bold.otf')
        .text(`ref: ${refNo}`);
        doc.moveDown();
        doc.moveDown();
        doc
        .font('./publics/fonts/Inter-Bold.otf')
        .text(`\n\nRe: Programme Design Document by ${orgName} regarding ${programmeName}`);
    
        
        doc
        .text('\n\nNo Objection Letter', {
            align: 'center'
        });
    
        doc.fontSize(9).font('./publics/fonts/Inter-Regular.otf');
    
        doc.text(`\nTo Whom It May Concern,\n\nWe refer to the programme titled ${programmeName} in ${country} as included in the funding proposal submitted by ${orgName} to us on ${date}.\n\nThe undersigned is the duly authorized representative of the ${ministry} of Government of ${country}.\n\nPursuant to the regulations for Article 6.2 of the Paris Agreement in ${country}, the content of which we acknowledge to have reviewed, we hereby confirm no conflict with these regulations and communicate our no-objection to the programme as included in the funding proposal.`)
        
        doc
        .text(`\n\nBy communicating our no-objection, it is implied that:\n\n`);
    
        doc
        .text(`(a) The government of ${country} has no-objection to the programme as included in the carbon credit proposal;\n\n(b) The programme as described in the proposal is in conformity with the national priorities, strategies and plans for internationally transferable mitigation outcomes of ${country};\n\n(c) In accordance with the ${country}'s environmental and social safeguards, the programme as included in the funding proposal is in conformity with relevant national laws and regulations.\n\n(d) This letter does not prejudicate later authorization for transfer.`);
    
        doc.text(`\n\nWe confirm that our national process for ascertaining no-objection to the programme as included in the proposal has been duly followed.\n\nWe confirm that our no-objection applies to all projects or activities to be implemented within the scope of the programme.\n\nWe acknowledge that this letter will be made publicly available on the Carbon Transparency website, registered under ${programmeId}.`)
    
        doc.text(`\n\nSincerely,\n${ministerWithDesignation}\nGovernment of ${country}`)
        // Finalize PDF file
        addFooter_eng(doc,site_verif_doc,random)
        doc.end();

        // const content = await new Promise<string>(resolve => {
        //     stream.on("finish", function() {
        //         const contents = fs.readFileSync('./generate/objection/' + filepath, {encoding: 'base64'})
        //         resolve(contents);
        //     });
        // });
        // const url = await this.fileHandler.uploadFile('generate/objection' + filepath, content)
        // console.log('PDF generate end', 'generate/' + filepath)
        return to_send;
}
async function generateLetter_objection(refNo,ministry,minister,orgs, programmeName, programmeId,random) {
    const uniqueID = uuidv4();
    const country ="Côte d'Ivoire"
  
 const url =  link_evaluation+random;
    const qrCodeImage = await QRCode.toDataURL(url);
    const to_send = api_origin +`/objection/NO_OBJECTION_LETTER_${uniqueID}_${programmeId}.pdf`
    const ministerWithDesignation = "Carbon register market"
        const capital = "Abidjan"

        const filepath = `NO_OBJECTION_LETTER_${uniqueID}_${programmeId}.pdf`

        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          };
        const date = new Date().toLocaleDateString('fr-FR', options)
        let orgName;
        orgs.map((elt,index)=>{
        if (index >0) {
          
               
                orgName += ' & ' + elt
           
            
        } else {
            orgName =elt
        }})
        // Create a document
        const doc = new PDFDocument();
        const stream = fs.createWriteStream("./generate/objection/"+ filepath);
        doc.pipe(stream);
        // Add header
        doc.image("./publics/images/logo.png",50,30, {
            fit: [150, 50],
        
    
        });
        doc.image(qrCodeImage ,450,20, {
            fit: [150, 100],
            
            });
          
            doc.fontSize(10);
          doc.text(`République de ${country}`,{
              align: "center",
          });
          doc.text(`Union - Discipline - Travail`, {
              align: "center",
      
            });
      
            doc.moveDown();
          doc.text("Ministère de l'Environnement", {
              align: "center",
             
            });
        
          doc.text("et de la transition Ecologique",{
              align: "center",
               
              });
            doc.moveDown();
           
            
       doc
    .fontSize(8)
    .text(capital + ', ' + date, {
        align: 'right'
    });

doc.fontSize(9);
doc
    .font('./publics/fonts/Inter-Bold.otf')
    .text(`ref: ${refNo}`);
doc.moveDown();
doc.moveDown();
doc
    .font('./publics/fonts/Inter-Bold.otf')
    .text(`\n\nObjet : Document de conception du programme par ${orgName} concernant ${programmeName}`);

doc
    .text('\n\nLettre de Non-Objection', {
        align: 'center'
    });

doc.fontSize(9).font('./publics/fonts/Inter-Regular.otf');

doc.text(`\nÀ qui de droit,\n\nNous faisons référence au programme intitulé ${programmeName} en ${country} tel qu'inclus dans la proposition de financement soumise par ${orgName} le ${date}.\n\nLe signataire ci-dessous est le représentant dûment autorisé du ${ministry} du Gouvernement de ${country}.\n\nConformément aux réglementations de l'Article 6.2 de l'Accord de Paris en ${country}, dont nous reconnaissons avoir examiné le contenu, nous confirmons par la présente qu'il n'y a aucun conflit avec ces réglementations et nous communiquons notre non-objection au programme tel qu'inclus dans la proposition de financement.`);

doc
    .text(`\n\nEn communiquant notre non-objection, il est sous-entendu que:\n\n`);

doc
    .text(`(a) Le gouvernement de ${country} n'a aucune objection au programme tel qu'inclus dans la proposition de crédits carbone;\n\n(b) Le programme tel que décrit dans la proposition est conforme aux priorités, stratégies et plans nationaux pour des résultats d'atténuation transférables internationalement de ${country};\n\n(c) Conformément aux sauvegardes environnementales et sociales de ${country}, le programme tel qu'inclus dans la proposition de financement est conforme aux lois et réglementations nationales pertinentes.\n\n(d) Cette lettre ne préjuge pas d'une autorisation ultérieure de transfert.`);

doc.text(`\n\nNous confirmons que notre processus national pour vérifier la non-objection au programme tel qu'inclus dans la proposition a été dûment suivi.\n\nNous confirmons que notre non-objection s'applique à tous les projets ou activités à mettre en œuvre dans le cadre du programme.\n\nNous reconnaissons que cette lettre sera rendue publique sur le site Web de Transparence Carbone, enregistrée sous ${programmeId}.`);

doc.text(`\n\nCordialement,\n${ministerWithDesignation}\nGouvernement de ${country}`);
// Finaliser le fichier PDF
addFooter(doc,site_verif_doc,random)
doc.end();

        // const content = await new Promise<string>(resolve => {
        //     stream.on("finish", function() {
        //         const contents = fs.readFileSync('./generate/objection/' + filepath, {encoding: 'base64'})
        //         resolve(contents);
        //     });
        // });
        // const url = await this.fileHandler.uploadFile('generate/objection' + filepath, content)
        // console.log('PDF generate end', 'generate/' + filepath)
        return to_send;
}
async function generateLetter_eligibilite_eng(refNo,programmeId, programmeName, sectoralMinistry, orgName, orgAddress, requestMonth, requestYear,random) {
    const uniqueID = uuidv4();
    const to_send = api_origin +`/eligibilite/RESPONSE_FOR_LETTER_OF_INTENT_${uniqueID}_${programmeId}.pdf` 
    const filepath = `RESPONSE_FOR_LETTER_OF_INTENT_${uniqueID}_${programmeId}.pdf`;
    const country = "Côte d'Ivoire";
    const minister = "Ministre";
    const ministry = "Ministère de l'environnement";
    const contactEmailForQuestions = "minister@gouv.ci";
    const date = new Date().toDateString();
    const url =  link_evaluation+random;
    const qrCodeImage = await QRCode.toDataURL(url);
    const capital = "Abidjan"

    const doc = new PDFDocument();
    const stream = fs.createWriteStream("./generate/eligibilite/" + filepath);
    doc.pipe(stream);
// Add header
doc.image("./publics/images/logo.png",50,30, {
    fit: [150, 50],
  

  });
  doc.image(qrCodeImage ,450,20, {
      fit: [150, 100],
     
    });

    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.fontSize(11);

    doc.text(refNo, {
        align: "left",
        continued: true,
    });

    doc
    .text(capital + ', ' + date, {
        align: 'right'
    }).moveDown();

    doc.text(orgAddress, {
        align: "left",
    });

    doc.font("./publics/fonts/Inter-Bold.otf").text(`\n\nRE: LETTER OF INTENT ${programmeName}`, {
        underline: true,
    }).moveDown();


    doc.font("./publics/fonts/Inter-Regular.otf");

    const paragraphs = [
        `The Ministry of Environment, Forestry and Tourism takes note of your proposed ${programmeName} contained in your letter dated ${requestMonth}, ${requestYear} on the above subject matter. The project intends to reduce emissions.`,

        `By this letter, the Ministry of Environment, Forestry and Tourism can confirm that the proposed project aligns with ${country}'s Nationally Determined Contributions (NDC) and Sustainable Development Goals priorities.`,

        `Therefore, the Ministry of Environment, Forestry and Tourism stands ready for future collaboration with ${orgName} in the project development phase to generate mitigation outcomes towards Article 6.2 or Voluntary Carbon Markets.`,

        `Note that the Ministry of Environment, Forestry and Tourism has the mandate, as the designated national body, to oversee the technical arrangements of the carbon market instruments under Article 6.2 of the Paris Agreement.`,

        `Furthermore, kindly note that in developing the ${programmeName} for the carbon market, you will be requested to show evidence of your engagements with the ${sectoralMinistry} to meet regulatory requirements for the project.`,

        `Contact us through ${contactEmailForQuestions} for any clarifications.`,
    ];

    paragraphs.forEach((paragraph) => {
        doc
            .list([paragraph], {
                bulletRadius: 2, // Radius of the bullet points
                bulletIndent: 20, // Indentation of the bullet points
                textIndent: 15, // Indentation of the text after the bullet points
                listType: "bullet",
            })
            .moveDown(); 
    });

    doc.text(`\n\nThank you.`, {
        align: "left",
    });

    doc.text(`\n\nYours Faithfully,`, {
        align: "left",
    });

    doc.text(`${minister}`, {
        align: "left",
    });
    addFooter_eng(doc,site_verif_doc,random)
    doc.end();

    // const content = await new Promise<string>((resolve) => {
    //     stream.on("finish", function () {
    //         const contents = fs.readFileSync("/tmp/" + filepath, {
    //             encoding: "base64",
    //         });
    //         resolve(contents);
    //     });
    // });
    // const url = await this.fileHandler.uploadFile(
    //     "documents/" + filepath,
    //     content
    // );

    return to_send
}
async function generateLetter_eligibilite(refNo,programmeId, programmeName, sectoralMinistry, orgName, orgAddress, requestMonth, requestYear,random) {
    const uniqueID = uuidv4();
    const to_send = api_origin +`/eligibilite/RESPONSE_FOR_LETTER_OF_INTENT_${uniqueID}_${programmeId}.pdf` 
    const filepath = `RESPONSE_FOR_LETTER_OF_INTENT_${uniqueID}_${programmeId}.pdf`;
    const country = "Côte d'Ivoire";
    const minister = "Ministre";
    const ministry = "Ministère de l'environnement";
    const contactEmailForQuestions = "minister@gouv.ci";
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
    const date = new Date().toLocaleDateString('fr-FR', options)
    const url =  link_evaluation+random;
    const qrCodeImage = await QRCode.toDataURL(url);
    const capital = "Abidjan"

    const doc = new PDFDocument();
    const stream = fs.createWriteStream("./generate/eligibilite/" + filepath);
    doc.pipe(stream);
// Add header
doc.image("./publics/images/logo.png",50,30, {
    fit: [150, 50],
  

  });
  doc.image(qrCodeImage ,450,20, {
      fit: [150, 100],
     
    });

    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.fontSize(11);

    doc.text(refNo, {
        align: "left",
        continued: true,
    });

    doc
    .text(capital + ', ' + date, {
        align: 'right'
    }).moveDown();

    doc.text(orgAddress, {
        align: "left",
    });

    doc.font("./publics/fonts/Inter-Bold.otf").text(`\n\nOBJET : LETTRE D'ELIGIBILITE ${programmeName}`, {
        underline: true,
    }).moveDown();
    
    doc.font("./publics/fonts/Inter-Regular.otf");
    
    const paragraphs = [
        `Le Ministère de l'Environnement prend note de votre proposition ${programmeName} contenue dans votre lettre datée de ${requestMonth}, ${requestYear} sur le sujet ci-dessus. Le projet vise à réduire les émissions.`,
    
        `Par cette lettre, Le Ministère de l'Environnement peut confirmer que le projet proposé s'aligne avec les Contributions Déterminées au niveau National (CDN) et les priorités des Objectifs de Développement Durable de ${country}.`,
    
        `Par conséquent, Le Ministère de l'Environnement se tient prêt pour une future collaboration avec ${orgName} dans la phase de développement du projet afin de générer des résultats d'atténuation pour l'Article 6.2 ou les Marchés Volontaires de Carbone.`,
    
        `Veuillez noter que Le Ministère de l'Environnement a le mandat, en tant qu'organe national désigné, de superviser les arrangements techniques des instruments du marché du carbone en vertu de l'Article 6.2 de l'Accord de Paris.`,
    
        `De plus, veuillez noter que dans le développement de ${programmeName} pour le marché du carbone, il vous sera demandé de fournir des preuves de vos engagements avec le ${sectoralMinistry} pour répondre aux exigences réglementaires du projet.`,
    
        `Contactez-nous via ${contactEmailForQuestions} pour toute clarification.`,
    ];
    
    paragraphs.forEach((paragraph) => {
        doc
            .list([paragraph], {
                bulletRadius: 2, // Rayon des puces
                bulletIndent: 20, // Indentation des puces
                textIndent: 15, // Indentation du texte après les puces
                listType: "bullet",
            })
            .moveDown(); 
    });
    
    doc.text(`\n\nMerci.`, {
        align: "left",
    });
    
    doc.text(`\n\nCordialement,`, {
        align: "left",
    });
    
    doc.text(`${minister}`, {
        align: "left",
    });
    addFooter(doc,site_verif_doc,random)
    doc.end();
    

    // const content = await new Promise<string>((resolve) => {
    //     stream.on("finish", function () {
    //         const contents = fs.readFileSync("/tmp/" + filepath, {
    //             encoding: "base64",
    //         });
    //         resolve(contents);
    //     });
    // });
    // const url = await this.fileHandler.uploadFile(
    //     "documents/" + filepath,
    //     content
    // );

    return to_send
}
async function generateLetter_autorisation(refNo,ministry,minister,programmeId, programmeName, authorisedCompanyName, orgName, designDocUrl, methodologyDocUrl,random) {
    const uniqueID = uuidv4();
    const country ="Côte d'Ivoire"

    const filepath = "./generate/authorisation/"+`LETTER_OF_AUTHORISATION_${uniqueID}_${programmeId}.pdf` 
    const to_send = api_origin +`/authorisation/LETTER_OF_AUTHORISATION_${uniqueID}_${programmeId}.pdf` 
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
    const date = new Date().toLocaleDateString('fr-FR', options)
    const url =  link_evaluation+random;
    const qrCodeImage = await QRCode.toDataURL(url);
    const doc = new PDFDocument() 
 
    const stream = fs.createWriteStream(filepath) 
    doc.pipe(stream) 
    doc.fontSize(11) 


       
    // Add header
    doc.image("./publics/images/logo.png",50,30, {
      fit: [150, 50],
    

    });
    doc.image(qrCodeImage ,450,20, {
        fit: [150, 100],
       
      });

      doc.moveDown();
      doc.fontSize(10);
    doc.text(`République de ${country}`,{
        align: "center",
    });
    doc.text(`Union - Discipline - Travail`, {
        align: "center",

      });

      doc.moveDown();
    doc.text("Ministère de l'Environnement", {
        align: "center",
       
      });
  
    doc.text("et de la transition Ecologique",{
        align: "center",
         
        });


 
    doc.moveDown();
  
    doc.fontSize(12);
  
  
   
      doc.moveDown();
    doc.text(authorisedCompanyName+" "+country, {
      align: "center",
      margin: [20, 0, 20, 0],
    });
   
    doc.moveDown();
  
    doc.text(`Abidjan, le ${date}`, {
      align: "right",
      margin: [20, 0, 20, 0],
    });
    doc.moveDown();
    doc.text(`Réf. : ${refNo}`, {
      align: "left",
      margin: [20, 0, 20, 0],
    });
    doc.moveDown();

    // doc.text(refNo, {
    //     align: "left",
    //     continued: true,
    // }) 
    // doc.text(date, {
    //     align: "right",
    // }) 
    doc.font("./publics/fonts/Inter-Bold.otf").text(`\n\nLettre d’autorisation de ${programmeName}`, {
        align: "left",
    }) 
    doc.font("./publics/fonts/Inter-Bold.otf").text("\n\nMandat d’autorisation", {
        underline: true,
    }) 
    doc.font("./publics/fonts/Inter-Regular.otf") 
    doc.text(`\n\n 1.  ${authorisedCompanyName} est le ministère du gouvernement responsable du changement climatique dans ${country}.`, {
        indent: 15,
    }) 
    doc.text(`\n\n 2. le gouvernement a mandaté ${authorisedCompanyName} pour superviser ${country}La participation de la Commission à l’approche coopérative de l’article 6.2 au titre de l’Accord de Paris et des décisions pertinentes adoptées conformément à la Convention-cadre des Nations Unies sur les changements climatiques (CCNUCC), en particulier la décision 2/CMA3.`, {
        indent: 15,
    }) 
    doc.text(`\n\n 3. Le ministère de l’Environnement, des Forêts et du Tourisme est également l’autorité compétente désignée pour « Accord de coopération entre ${orgName} et ${country} en vue de la mise en œuvre de l’Accord de Paris (ci-après dénommé Accord de coopération avec ${orgName}).`, {
        indent: 15,
    }) 
    doc
        .font("./publics/fonts/Inter-Bold.otf")
        .text("\n\nConditions préalables à l’autorisation ", {
        underline: true,
    }) 
    doc.font("./publics/fonts/Inter-Regular.otf") 
    doc.text(`\n\n 4. ${orgName}, en tant que participant autorisé à l’activité d’atténuation pour le « ${programmeName}» (ci-après appelé l’activité d’atténuation telle que définie dans l’accord de coopération avec ${orgName}) :`, {
        indent: 15,
    }) 
    doc.text(`\n\n 4.1 Ayant satisfait à toutes les conditions préalables pour autoriser les résultats d’atténuation pour les transferts internationaux et leurs cas d’utilisation ultérieurs, comme indiqué dans le cadre du marché international du carbone de ${country} et `, {
        indent: 15,
    }) 
    doc.text(`\n\n 4.2 Après avoir examiné les recommandations techniques du groupe de travail sur le marché du carbone de ${country} sur le ${programmeName}`, {
        indent: 15,
    }) 
    doc.font("./publics/fonts/Inter-Bold.otf").text("\n\nDéclaration d’autorisation", {
        underline: true,
    }) 
    doc.font("./publics/fonts/Inter-Regular.otf") 
    doc.text(`\n\n 5.  ${authorisedCompanyName} accorde par la présente l’autorisation officielle des résultats d’atténuation transférés à l’échelle internationale (ITMO) qui sont générés à partir de la mise en œuvre du “${programmeName}” sur la base des informations présentées dans `, {
        indent: 15,
        continued: true,
    }) 
    doc.fillColor("blue").text("Annex [x]", {
        link: designDocUrl,
        underline: true,
        continued: true,
    }) 
    doc.fillColor("black").text(`, la méthodologie de `, {
        indent: 15,
        continued: true,
        underline: false,
    }) 
    doc.fillColor("blue").text("Annex [y]", {
        link: methodologyDocUrl,
        underline: true,
        continued: true,
    }) 
    doc
        .fillColor("black")
        .text(`, et conformément à l’article 6.3 de l’Accord de Paris et à l’Accord de coopération avec ${orgName}".`, {
        indent: 15,
        underline: false,
    }) 
    doc
        .font("./publics/fonts/Inter-Bold.otf")
        .text("\n\nRépercussions de l’autorisation ", {
        underline: true,
    }) 
    doc.font("./publics/fonts/Inter-Regular.otf") 
    doc.text(`\n\n 6. Par cette lettre, la ${country} confirme que : `, {
        indent: 15,
    }) 
    doc.text(`\n\n a. Il a ratifié l’Accord de Paris en avril 2016 et maintient son dernier CDN sur le registre provisoire des CDN en vertu de l’article 4, paragraphe 12 de l’Accord de Paris.`, {
        indent: 30,
    }) 
    doc.text(`\n\n b. Sa participation à l’article 6, paragraphe 2, l’approche coopérative de l’Accord de Paris avec le ${orgName} comme Partie destinataire, est volontaire. `, {
        indent: 30,
    }) 
    doc.text(`\n\n c. Son engagement à transférer le nombre de résultats d’atténuation émis découlant de la mise en œuvre du « ${programmeName} » N’EMPÊCHERA PAS la ${country} d’atteindre l’objectif de CDN 2030. `, {
        indent: 30,
    }) 
    doc.text(`\n\n 7. La présente lettre constitue une autorisation de ${country}, telle que définie par les orientations sur les approches coopératives visées à l’article 6, paragraphe 2, de l’Accord de Paris (Décision 2/CMA.3) et le cadre international du marché du carbone de ${country} pour l’activité d’atténuation, avec ce qui suit : `, {
        indent: 15,
    }) 
    doc.text(`\n\n a. Les ITMO générés à l’égard des mesures d’atténuation ou représentant des mesures d’atténuation à partir de 2021, couvrant la période de mise en œuvre des CDN jusqu’en 2030.  `, {
        indent: 30,
    }) 
    doc.text(`\n\n b. Les ITMO générés à partir de l’activité d’atténuation autorisée ne seront pas utilisés par la ${country} pour démontrer la réalisation de son propre CDN  `, {
        indent: 30,
    }) 
    doc.text(`\n\n c. MLes résultats de l’activité d’atténuation autorisée seront comptabilisés dans le registre de ${country}, et le transfert et l’utilisation des ITMO sont conformes aux orientations et aux décisions pertinentes de la CMA. `, {
        indent: 30,
    }) 
    doc.text(`\n\n Cette lettre n’implique pas ou ne fournit pas un engagement de la part du ${country} soutenir ou financer l’activité d’atténuation autorisée si des parties ont des exigences légales ou environnementales pour la construction et l’exploitation de l’activité d’atténuation qui ne sont pas remplies et que l’activité d’atténuation, par conséquent, ne peut pas aller de l’avant. `, {
        indent: 15,
    }) 
    doc.moveDown(3) 
    doc.font("./publics/fonts/Inter-Bold.otf").text("\n\nConfirmations", {
        underline: true,
    }) 
    doc.font("./publics/fonts/Inter-Regular.otf") 
    doc.text(`\n\n 9. La ${country} s’engage à transférer le montant des ITMO autorisés, vérifiés et examinés positivement de cette activité d’atténuation en vertu de l’accord de coopération avec ${orgName}, signé le ${date}.`, {
        indent: 15,
    }) 
    doc.text(`\n\n 10. Dans la présente lettre, la ${country} confirme qu’il respecte toutes les exigences de l’Accord de Paris ainsi que de l’Accord de coopération avec le ${orgName}, y compris la déclaration, la prévention de la double comptabilisation et de la double réclamation, et l’exécution des rajustements correspondants. `, {
        indent: 15,
    }) 
    doc.text(`\n\n 11. Par la présente lettre, la ${country} s’engage à appliquer les ajustements correspondants (approche comptable cible sur un an en calculant les transferts annuels moyens d’ITMO sur la période 2021-2030), conformément aux orientations sur les approches coopératives visées à l’article 6, le paragraphe 2 de l’Accord de Paris (décision 2/CMA.3) et les décisions futures pertinentes de la CMA, de manière transparente, exacte, complète, comparable et cohérente. `, {
        indent: 15,
    }) 
    doc.text(`\n\nCoordialement,\nL'Honorable ${minister}\nMinistre du \n${ministry}\ndu Gouvernement de la  ${country}`) 
    doc.font("./publics/fonts/Inter-Bold.otf").text("\n\n Appendices", {
        underline: true,
    }) 
    doc.moveDown(2) 
    doc.fillColor("blue").text("Annex [x]: document de conception", {
        link: designDocUrl,
        underline: true,
        indent: 15,
    }) 
    doc.fillColor("blue").text("Annex [y]: document méthodologique", {
        link: methodologyDocUrl,
        underline: true,
        indent: 15,
    }) 

    addFooter(doc,site_verif_doc,random)
    doc.end() 
    
//    const url = await this.fileHandler.uploadFile("documents/" + filepath, content) 
 return to_send
}
async function generateLetter_autorisation_eng(refNo,ministry,minister,programmeId, programmeName, authorisedCompanyName, orgName, designDocUrl, methodologyDocUrl,random) {
    const uniqueID = uuidv4();
    const country ="Côte d'Ivoire"

    const filepath = "./generate/authorisation/"+`LETTER_OF_AUTHORISATION_${uniqueID}_${programmeId}.pdf` 
    const to_send = api_origin +`/authorisation/LETTER_OF_AUTHORISATION_${uniqueID}_${programmeId}.pdf` 
    const date = new Date().toDateString() 
   
    const url =  link_evaluation+random;
    const qrCodeImage = await QRCode.toDataURL(url);
    const doc = new PDFDocument() 
 
    const stream = fs.createWriteStream(filepath) 
    doc.pipe(stream) 
    doc.fontSize(11) 


       
    // Add header
    doc.image("./publics/images/logo.png",50,30, {
      fit: [150, 50],
    

    });
    doc.image(qrCodeImage ,450,20, {
        fit: [150, 100],
       
      });

      doc.moveDown();
      doc.fontSize(10);
    doc.text(`République de ${country}`,{
        align: "center",
    });
    doc.text(`Union - Discipline - Travail`, {
        align: "center",

      });

      doc.moveDown();
    doc.text("Ministère de l'Environnement", {
        align: "center",
       
      });
  
    doc.text("et de la transition Ecologique",{
        align: "center",
         
        });


 
    doc.moveDown();
  
    doc.fontSize(12);
  
  
   
      doc.moveDown();
    doc.text("Bureau du marché carbone Côte D'Ivoire", {
      align: "center",
      margin: [20, 0, 20, 0],
    });
   
    doc.moveDown();
  
    doc.text(`Abidjan, le ${date}`, {
      align: "right",
      margin: [20, 0, 20, 0],
    });
    doc.moveDown();
    doc.text(`Réf. : ${refNo}`, {
      align: "left",
      margin: [20, 0, 20, 0],
    });
    doc.moveDown();

    doc.text(refNo, {
        align: "left",
        continued: true,
    }) 
    doc.text(date, {
        align: "right",
    }) 
    doc.font("./publics/fonts/Inter-Bold.otf").text(`\n\nLetter of Authorisation of ${programmeName}`, {
        align: "left",
    }) 
    doc.font("./publics/fonts/Inter-Bold.otf").text("\n\nMandate For Authorisation", {
        underline: true,
    }) 
    doc.font("./publics/fonts/Inter-Regular.otf") 
    doc.text(`\n\n 1. The ${authorisedCompanyName} is the Government’s Ministry responsible for climate change in ${country}.`, {
        indent: 15,
    }) 
    doc.text(`\n\n 2. The Government has mandated ${authorisedCompanyName} to oversee ${country}'s participation in Article 6.2 cooperative approach under the Paris Agreement and the relevant decisions adopted according to the United Nations Framework Convention on Climate Change (UNFCCC), particularly, Decision 2/CMA3.`, {
        indent: 15,
    }) 
    doc.text(`\n\n 3. The Ministry of Environment, Forestry and Tourism is also the designated competent authority for implementing the “Cooperation Agreement between the ${orgName} and the ${country} towards the implementation of the Paris Agreement (hereinafter referred to as the Cooperation Agreement with ${orgName}).`, {
        indent: 15,
    }) 
    doc
        .font("./publics/fonts/Inter-Bold.otf")
        .text("\n\nPre-conditions for Authorisation ", {
        underline: true,
    }) 
    doc.font("./publics/fonts/Inter-Regular.otf") 
    doc.text(`\n\n 4. The ${orgName}, as the authorised mitigation activity participant for the “${programmeName}” (hereinafter referred to as the Mitigation Activity as defined in the Cooperation Agreement with ${orgName}):`, {
        indent: 15,
    }) 
    doc.text(`\n\n 4.1 Having satisfied all the pre-conditions for authorising mitigation outcomes for international transfers and their subsequent use cases as set out in ${country}'s international carbon market framework and `, {
        indent: 15,
    }) 
    doc.text(`\n\n 4.2 Having considered the technical recommendations from ${country}'s carbon market task force on the ${programmeName}`, {
        indent: 15,
    }) 
    doc.font("./publics/fonts/Inter-Bold.otf").text("\n\nAuthorisation Statement", {
        underline: true,
    }) 
    doc.font("./publics/fonts/Inter-Regular.otf") 
    doc.text(`\n\n 5. The ${authorisedCompanyName} hereby grants formal Authorisation of the Internationally Transferred Mitigation Outcomes (ITMOs) that are generated from implementing the “${programmeName}” based on the information outlined in `, {
        indent: 15,
        continued: true,
    }) 
    doc.fillColor("blue").text("Annex [x]", {
        link: designDocUrl,
        underline: true,
        continued: true,
    }) 
    doc.fillColor("black").text(`, the methodology in `, {
        indent: 15,
        continued: true,
        underline: false,
    }) 
    doc.fillColor("blue").text("Annex [y]", {
        link: methodologyDocUrl,
        underline: true,
        continued: true,
    }) 
    doc
        .fillColor("black")
        .text(`, and per the Article 6.3 of the Paris Agreement and the Cooperation Agreement with ${orgName}".`, {
        indent: 15,
        underline: false,
    }) 
    doc
        .font("./publics/fonts/Inter-Bold.otf")
        .text("\n\nImplications of Authorisation ", {
        underline: true,
    }) 
    doc.font("./publics/fonts/Inter-Regular.otf") 
    doc.text(`\n\n 6. By this letter, the ${country} confirms that: `, {
        indent: 15,
    }) 
    doc.text(`\n\n a. It ratified the Paris Agreement on April 2016 and maintains its latest NDC on the interim NDC registry under Article 4, paragraph 12 of the Paris Agreement.`, {
        indent: 30,
    }) 
    doc.text(`\n\n b. Its participation in Article 6, paragraph 2, the cooperative approach of the Paris Agreement with the ${orgName} as the receiving Party, is voluntary. `, {
        indent: 30,
    }) 
    doc.text(`\n\n c. Its commitment to transfer the number of issued mitigation outcomes arising from the implementation of the “${programmeName}” shall NOT prevent ${country} from achieving the 2030 NDC target. `, {
        indent: 30,
    }) 
    doc.text(`\n\n 7. This letter constitutes ${country} authorisation, as defined per the guidance on cooperative approaches referred to in Article 6, paragraph 2, of the Paris Agreement (Decision 2/CMA.3) and ${country}'s International Carbon Market Framework for the Mitigation Activity, with the following: `, {
        indent: 15,
    }) 
    doc.text(`\n\n a. ITMOs generated in respect of or representing mitigation from 2021 onward, spanning through the NDC implementation period up to 2030.  `, {
        indent: 30,
    }) 
    doc.text(`\n\n b. ITMOs generated from the Authorised mitigation activity will not be used by the ${country} to demonstrate the achievement of its own NDC  `, {
        indent: 30,
    }) 
    doc.text(`\n\n c. Mitigation Outcomes from the Authorised mitigation activity will be recognised into ${country}'s registry, and the transfer and use of ITMOs are consistent with the guidance and relevant decisions of the CMA. `, {
        indent: 30,
    }) 
    doc.text(`\n\n 8. This letter does not imply or provide a commitment on the part of the ${country} to support or fund the authorised mitigation activity if any parties have legal or environmental requirements for the construction and operation of the mitigation activity not fulfilled and the mitigation activity, therefore, is unable to proceed. `, {
        indent: 15,
    }) 
    doc.moveDown(3) 
    doc.font("./publics/fonts/Inter-Bold.otf").text("\n\nConfirmations", {
        underline: true,
    }) 
    doc.font("./publics/fonts/Inter-Regular.otf") 
    doc.text(`\n\n 9. The ${country} commits to transfer the amount of authorised, verified and positively examined ITMOs from this mitigation activity under the Cooperation Agreement with ${orgName}, signed on ${date}.`, {
        indent: 15,
    }) 
    doc.text(`\n\n 10. Through this letter, the ${country} confirms to follow all requirements of the Paris Agreement as well as the Cooperation Agreement with ${orgName}, including reporting, preventing double-counting and double-claiming, and undertaking Corresponding Adjustments. `, {
        indent: 15,
    }) 
    doc.text(`\n\n 11. By this letter, the ${country} commits to apply corresponding adjustments (single-year target accounting approach by calculating average annual ITMOs transfers over 2021-2030), consistently with the guidance on cooperative approaches referred to in Article 6, paragraph 2, of the Paris Agreement (Decision 2/CMA.3) and relevant future decisions of the CMA, in a transparent, accurate, complete, comparable, and consistent manner. `, {
        indent: 15,
    }) 
    doc.text(`\n\nSincerely,\nHonorable ${minister}\nMinister\n${ministry}\nGovernment of ${country}`) 
    doc.font("./publics/fonts/Inter-Bold.otf").text("\n\n Appendices", {
        underline: true,
    }) 
    doc.moveDown(2) 
    doc.fillColor("blue").text("Annex [x]: Design Document", {
        link: designDocUrl,
        underline: true,
        indent: 15,
    }) 
    doc.fillColor("blue").text("Annex [y]: Methodology Document", {
        link: methodologyDocUrl,
        underline: true,
        indent: 15,
    }) 
    addFooter_eng(doc,site_verif_doc,random)
    doc.end() 
    
//    const url = await this.fileHandler.uploadFile("documents/" + filepath, content) 
 return to_send
}



async function generateLetter_approbation_sign(programmeId, programmeName, authorisedCompanyName, orgs, submissionDate,random,refNo,new_data) {
    const uniqueID = uuidv4();
    const country ="Côte d'Ivoire"
    const minister = "M." 
    const ministry = "Ministère de l'environnement " 
    const filepath = "./generate/sign/"+`LETTER_OF_APPROBATION_${uniqueID}_${programmeId}.pdf` 
    const to_send = api_origin +`/sign/LETTER_OF_APPROBATION_${uniqueID}_${programmeId}.pdf` 
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
    const date = new Date().toLocaleDateString('fr-FR', options)

    const url =  link_evaluation+random;
    const qrCodeImage = await QRCode.toDataURL(url);
    const doc =  new PDFDocument({bufferPages: true})
    let orgName = orgs
  
    const stream = fs.createWriteStream(filepath) 
    doc.pipe(stream) 
    doc.fontSize(11) 


       
    // Add header
    doc.image("./publics/images/logo.png",50,30, {
      fit: [150, 50],
    

    });
    doc.image(qrCodeImage ,450,20, {
        fit: [150, 100],
       
      });

      doc.moveDown();
      doc.fontSize(10);
    doc.text(`République de ${country}`,{
        align: "center",
    });
    doc.text(`Union - Discipline - Travail`, {
        align: "center",

      });

      doc.moveDown();
    doc.text("Ministère de l'Environnement", {
        align: "center",
       
      });
  
    doc.text("et de la transition Ecologique",{
        align: "center",
         
        });


 
    doc.moveDown();
  
    doc.fontSize(10);
  
  
   
      doc.moveDown();
    doc.text("Bureau du marché carbone Côte D'Ivoire", {
      align: "center",
      margin: [20, 0, 20, 0],
    });
   
    doc.moveDown();
    doc.text(`Réf. : ${refNo}`, {
        align: "left",
        margin: [20, 0, 20, 0],
      });
    doc.text(`Abidjan, le ${date}`, {
      align: "right",
      margin: [20, 0, 20, 0],
    });

    
    doc.moveDown();

  
    doc.fontSize(9);
    doc.font("./publics/fonts/Inter-Bold.otf").text(`\n\nOBJET : LETTRE D'APPROBATION POUR L'INSCRIPTION AU REGISTRE CARBONE`, {
        underline: true,
    }).moveDown();
    
    doc.font("./publics/fonts/Inter-Regular.otf");
    
    const paragraphs = [
        `Madame, Monsieur,\n\nPar la présente, nous avons le plaisir de vous informer que ${authorisedCompanyName}, en sa qualité d'autorité désignée du ${ministry}, approuve l'inscription de ${orgName} au registre carbone national de ${country}.`,
    
        `Cette approbation fait suite à une évaluation détaillée de votre projet intitulé ${programmeName}, soumis le ${submissionDate}, conformément aux critères établis par les réglementations en vigueur et les standards internationaux relatifs aux marchés carbone. Le projet répond pleinement aux exigences de durabilité environnementale et sociale, et nous reconnaissons son potentiel à contribuer de manière significative à la réduction des émissions de gaz à effet de serre et à la promotion du développement durable dans notre pays.`,
    
        `À cet effet, nous vous confirmons que :
        \n(a) ${orgName} est dûment autorisé à opérer dans le cadre du marché carbone de ${country}.
        \n(b) Les crédits carbones générés par ${orgName} seront éligibles à être enregistrés et échangés sur le registre carbone de ${country}.
        \n(c) L'autorité compétente surveillera la mise en œuvre du projet et la vérification des réductions d'émissions conformément aux protocoles définis.`,
    
        `Nous tenons à féliciter ${orgName} pour son engagement envers la protection de l'environnement et la lutte contre le changement climatique. Nous sommes convaincus que ce projet contribuera positivement à nos objectifs nationaux de réduction des émissions et à nos engagements internationaux dans le cadre de l'Accord de Paris.`,
    
        `Nous restons à votre disposition pour toute information complémentaire ou assistance nécessaire dans la poursuite de vos efforts.`,
    ];
    
    paragraphs.forEach((paragraph) => {
        doc
            .list([paragraph], {
                bulletRadius: 2, // Rayon des puces
                bulletIndent: 20, // Indentation des puces
                textIndent: 15, // Indentation du texte après les puces
                listType: "",
            })
            .moveDown(); 
    });
    doc.fontSize(10);
    doc.text(`\n\nVeuillez agréer, Madame, Monsieur, l'expression de nos salutations distinguées.`, {
        align: "left",
    });
    
    doc.text(`\n\n signature`, {
        align: "left",
    });
    
    doc.text(`${minister}`, {
        align: "left",
    });
    
    doc.text(`Ministre de l'environnement`, {
        align: "left",
    });
    
    doc.text(`${ministry}`, {
        align: "left",
    });
    doc.image(new_data.signature ,450,640, {
        fit: [125, 75],
       
      });
    // const range = doc.bufferedPageRange();

    // for( let i = range.start; i <  (range.start + range.count); i++) {

    // doc.switchToPage(i);
    // doc.text(`Page ${i + 1} of ${range.count}`, 
    //             200, 
    //             doc.page.height - 40, 
    //             { height : 25, width : 100});
    // }
    addFooter(doc,site_verif_doc,random)
    doc.end();
    
   
 
//    const url = await this.fileHandler.uploadFile("documents/" + filepath, content) 
 return to_send
}
async function generateLetter_approbation_eng_sign(programmeId, programmeName, authorisedCompanyName, orgs, submissionDate,random,refNo,new_data) {
    const uniqueID = uuidv4();
    const country ="Côte d'Ivoire"
    const minister = "M." 
    const ministry = "Minister de l'environnement " 
    const filepath = "./generate/sign/"+`LETTER_OF_APPROBATION_${uniqueID}_${programmeId}.pdf` 
    const to_send = api_origin +`/sign/LETTER_OF_APPROBATION_${uniqueID}_${programmeId}.pdf` 
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
    const date = new Date().toLocaleDateString('fr-FR', options)

    const url =  link_evaluation+random;
    const qrCodeImage = await QRCode.toDataURL(url);
    const doc = new PDFDocument() 
    let orgName = orgs
  
    const stream = fs.createWriteStream(filepath) 
    doc.pipe(stream) 
    doc.fontSize(11) 


       
    // Add header
doc.image("./publics/images/logo.png", 50, 30, {
    fit: [150, 50],
});
doc.image(qrCodeImage, 450, 20, {
    fit: [150, 100],
});

doc.moveDown();
doc.fontSize(10);
doc.text(`Republic of ${country}`, {
    align: "center",
});
doc.text(`Union - Discipline - Labor`, {
    align: "center",
});

doc.moveDown();
doc.text("Ministry of Environment", {
    align: "center",
});

doc.text("and Ecological Transition", {
    align: "center",
});

doc.moveDown();

doc.fontSize(10);

doc.moveDown();
doc.text("Carbon Market Office Côte D'Ivoire", {
    align: "center",
    margin: [20, 0, 20, 0],
});

doc.moveDown();
doc.text(`Ref: ${refNo}`, {
    align: "left",
    margin: [20, 0, 20, 0],
});
doc.text(`Abidjan, ${date}`, {
    align: "right",
    margin: [20, 0, 20, 0],
});

doc.moveDown();

doc.fontSize(9);
doc.font("./publics/fonts/Inter-Bold.otf").text(`\n\nSUBJECT: APPROVAL LETTER FOR CARBON REGISTRY ENROLLMENT`, {
    underline: true,
}).moveDown();

doc.font("./publics/fonts/Inter-Regular.otf");

const paragraphs = [
    `Dear Sir/Madam,\n\nWe are pleased to inform you that ${authorisedCompanyName}, in its capacity as the designated authority of ${ministry}, approves the enrollment of ${orgName} in the national carbon registry of ${country}.`,

    `This approval follows a detailed evaluation of your project titled ${programmeName}, submitted on ${submissionDate}, in accordance with the criteria established by current regulations and international standards related to carbon markets. The project fully meets environmental and social sustainability requirements, and we recognize its potential to significantly contribute to greenhouse gas emission reductions and the promotion of sustainable development in our country.`,

    `To this end, we confirm that:
    \n(a) ${orgName} is duly authorized to operate within the carbon market framework of ${country}.
    \n(b) The carbon credits generated by ${orgName} will be eligible for registration and trading on the carbon registry of ${country}.
    \n(c) The competent authority will oversee the implementation of the project and the verification of emission reductions in accordance with defined protocols.`,

    `We would like to congratulate ${orgName} for its commitment to environmental protection and the fight against climate change. We are confident that this project will positively contribute to our national emission reduction goals and our international commitments under the Paris Agreement.`,

    `We remain at your disposal for any additional information or assistance you may need in pursuing your efforts.`,
];

paragraphs.forEach((paragraph) => {
    doc
        .list([paragraph], {
            bulletRadius: 2, // Radius of the bullet points
            bulletIndent: 20, // Indentation of the bullet points
            textIndent: 15, // Indentation of the text after the bullet points
            listType: "",
        })
        .moveDown(); 
});

doc.fontSize(10);
doc.text(`\n\nPlease accept, Sir/Madam, the assurances of our highest consideration.`, {
    align: "left",
});

doc.text(`\n\nSignature`, {
    align: "left",
});

doc.text(`${minister}`, {
    align: "left",
});

doc.text(`Minister of Environment`, {
    align: "left",
});

doc.text(`${ministry}`, {
    align: "left",
});
doc.image(new_data.signature ,450,640, {
    fit: [125, 75],
   
  });
addFooter_eng(doc,site_verif_doc,random)
doc.end();

    
   
 
//    const url = await this.fileHandler.uploadFile("documents/" + filepath, content) 
 return to_send
}

async function generateLetter_objection_eng_sign(refNo,ministry,minister,orgs, programmeName, programmeId,random,new_data) {
    const uniqueID = uuidv4();
    const country ="Côte d'Ivoire"
  
 const url =  link_evaluation+random;
    const qrCodeImage = await QRCode.toDataURL(url);
    const to_send = api_origin +`/objection/NO_OBJECTION_LETTER_${uniqueID}_${programmeId}.pdf`
    const ministerWithDesignation = "Carbon register market"
        const capital = "Abidjan"

        const filepath = `NO_OBJECTION_LETTER_${uniqueID}_${programmeId}.pdf`

        const date = new Date().toDateString();
        let orgName;
        orgs.map((elt,index)=>{
        if (index >0) {
          
               
                orgName += ' and ' + elt
           
            
        } else {
            orgName =elt
        }})
        // Create a document
        const doc = new PDFDocument();
        const stream = fs.createWriteStream("./generate/objection/"+ filepath);
        doc.pipe(stream);
        // Add header
        doc.image("./publics/images/logo.png",50,30, {
            fit: [150, 50],
        
    
        });
        doc.image(qrCodeImage ,450,20, {
            fit: [150, 100],
            
            });
    
            doc.fontSize(10);
            doc.text(`République de ${country}`,{
                align: "center",
            });
            doc.text(`Union - Discipline - Travail`, {
                align: "center",
        
              });
        
              doc.moveDown();
            doc.text("Ministère de l'Environnement", {
                align: "center",
               
              });
          
            doc.text("et de la transition Ecologique",{
                align: "center",
                 
                });
              doc.moveDown();
        doc
        .fontSize(8)
        .text(capital + ', ' + date, {
            align: 'right'
        });
    
        doc.fontSize(9);
        doc
        .font('./publics/fonts/Inter-Bold.otf')
        .text(`ref: ${refNo}`);
        doc.moveDown();
        doc.moveDown();
        doc
        .font('./publics/fonts/Inter-Bold.otf')
        .text(`\n\nRe: Programme Design Document by ${orgName} regarding ${programmeName}`);
    
        
        doc
        .text('\n\nNo Objection Letter', {
            align: 'center'
        });
    
        doc.fontSize(9).font('./publics/fonts/Inter-Regular.otf');
    
        doc.text(`\nTo Whom It May Concern,\n\nWe refer to the programme titled ${programmeName} in ${country} as included in the funding proposal submitted by ${orgName} to us on ${date}.\n\nThe undersigned is the duly authorized representative of the ${ministry} of Government of ${country}.\n\nPursuant to the regulations for Article 6.2 of the Paris Agreement in ${country}, the content of which we acknowledge to have reviewed, we hereby confirm no conflict with these regulations and communicate our no-objection to the programme as included in the funding proposal.`)
        
        doc
        .text(`\n\nBy communicating our no-objection, it is implied that:\n\n`);
    
        doc
        .text(`(a) The government of ${country} has no-objection to the programme as included in the carbon credit proposal;\n\n(b) The programme as described in the proposal is in conformity with the national priorities, strategies and plans for internationally transferable mitigation outcomes of ${country};\n\n(c) In accordance with the ${country}'s environmental and social safeguards, the programme as included in the funding proposal is in conformity with relevant national laws and regulations.\n\n(d) This letter does not prejudicate later authorization for transfer.`);
    
        doc.text(`\n\nWe confirm that our national process for ascertaining no-objection to the programme as included in the proposal has been duly followed.\n\nWe confirm that our no-objection applies to all projects or activities to be implemented within the scope of the programme.\n\nWe acknowledge that this letter will be made publicly available on the Carbon Transparency website, registered under ${programmeId}.`)
    
        doc.text(`\n\nSincerely,\n${ministerWithDesignation}\nGovernment of ${country}`)
        // Finalize PDF file
        doc.image(new_data.signature ,450,640, {
            fit: [125, 75],
           
          });
        addFooter_eng(doc,site_verif_doc,random)
        doc.end();

        // const content = await new Promise<string>(resolve => {
        //     stream.on("finish", function() {
        //         const contents = fs.readFileSync('./generate/objection/' + filepath, {encoding: 'base64'})
        //         resolve(contents);
        //     });
        // });
        // const url = await this.fileHandler.uploadFile('generate/objection' + filepath, content)
        // console.log('PDF generate end', 'generate/' + filepath)
        return to_send;
}
async function generateLetter_objection_sign(refNo,ministry,minister,orgs, programmeName, programmeId,random,new_data) {
    const uniqueID = uuidv4();
    const country ="Côte d'Ivoire"
  
 const url =  link_evaluation+random;
    const qrCodeImage = await QRCode.toDataURL(url);
    const to_send = api_origin +`/objection/NO_OBJECTION_LETTER_${uniqueID}_${programmeId}.pdf`
    const ministerWithDesignation = "Carbon register market"
        const capital = "Abidjan"

        const filepath = `NO_OBJECTION_LETTER_${uniqueID}_${programmeId}.pdf`

        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          };
        const date = new Date().toLocaleDateString('fr-FR', options)
        let orgName;
        orgs.map((elt,index)=>{
        if (index >0) {
          
               
                orgName += ' & ' + elt
           
            
        } else {
            orgName =elt
        }})
        // Create a document
        const doc = new PDFDocument();
        const stream = fs.createWriteStream("./generate/objection/"+ filepath);
        doc.pipe(stream);
        // Add header
        doc.image("./publics/images/logo.png",50,30, {
            fit: [150, 50],
        
    
        });
        doc.image(qrCodeImage ,450,20, {
            fit: [150, 100],
            
            });
          
            doc.fontSize(10);
          doc.text(`République de ${country}`,{
              align: "center",
          });
          doc.text(`Union - Discipline - Travail`, {
              align: "center",
      
            });
      
            doc.moveDown();
          doc.text("Ministère de l'Environnement", {
              align: "center",
             
            });
        
          doc.text("et de la transition Ecologique",{
              align: "center",
               
              });
            doc.moveDown();
           
            
       doc
    .fontSize(8)
    .text(capital + ', ' + date, {
        align: 'right'
    });

doc.fontSize(9);
doc
    .font('./publics/fonts/Inter-Bold.otf')
    .text(`ref: ${refNo}`);
doc.moveDown();
doc.moveDown();
doc
    .font('./publics/fonts/Inter-Bold.otf')
    .text(`\n\nObjet : Document de conception du programme par ${orgName} concernant ${programmeName}`);

doc
    .text('\n\nLettre de Non-Objection', {
        align: 'center'
    });

doc.fontSize(9).font('./publics/fonts/Inter-Regular.otf');

doc.text(`\nÀ qui de droit,\n\nNous faisons référence au programme intitulé ${programmeName} en ${country} tel qu'inclus dans la proposition de financement soumise par ${orgName} le ${date}.\n\nLe signataire ci-dessous est le représentant dûment autorisé du ${ministry} du Gouvernement de ${country}.\n\nConformément aux réglementations de l'Article 6.2 de l'Accord de Paris en ${country}, dont nous reconnaissons avoir examiné le contenu, nous confirmons par la présente qu'il n'y a aucun conflit avec ces réglementations et nous communiquons notre non-objection au programme tel qu'inclus dans la proposition de financement.`);

doc
    .text(`\n\nEn communiquant notre non-objection, il est sous-entendu que:\n\n`);

doc
    .text(`(a) Le gouvernement de ${country} n'a aucune objection au programme tel qu'inclus dans la proposition de crédits carbone;\n\n(b) Le programme tel que décrit dans la proposition est conforme aux priorités, stratégies et plans nationaux pour des résultats d'atténuation transférables internationalement de ${country};\n\n(c) Conformément aux sauvegardes environnementales et sociales de ${country}, le programme tel qu'inclus dans la proposition de financement est conforme aux lois et réglementations nationales pertinentes.\n\n(d) Cette lettre ne préjuge pas d'une autorisation ultérieure de transfert.`);

doc.text(`\n\nNous confirmons que notre processus national pour vérifier la non-objection au programme tel qu'inclus dans la proposition a été dûment suivi.\n\nNous confirmons que notre non-objection s'applique à tous les projets ou activités à mettre en œuvre dans le cadre du programme.\n\nNous reconnaissons que cette lettre sera rendue publique sur le site Web de Transparence Carbone, enregistrée sous ${programmeId}.`);

doc.text(`\n\nCordialement,\n${ministerWithDesignation}\nGouvernement de ${country}`);
// Finaliser le fichier PDF
doc.image(new_data.signature ,450,640, {
    fit: [125, 75],
   
  });
addFooter(doc,site_verif_doc,random)
doc.end();

        // const content = await new Promise<string>(resolve => {
        //     stream.on("finish", function() {
        //         const contents = fs.readFileSync('./generate/objection/' + filepath, {encoding: 'base64'})
        //         resolve(contents);
        //     });
        // });
        // const url = await this.fileHandler.uploadFile('generate/objection' + filepath, content)
        // console.log('PDF generate end', 'generate/' + filepath)
        return to_send;
}
async function generateLetter_eligibilite_eng_sign(refNo,programmeId, programmeName, sectoralMinistry, orgName, orgAddress, requestMonth, requestYear,random,new_data) {
    const uniqueID = uuidv4();
    const to_send = api_origin +`/eligibilite/RESPONSE_FOR_LETTER_OF_INTENT_${uniqueID}_${programmeId}.pdf` 
    const filepath = `RESPONSE_FOR_LETTER_OF_INTENT_${uniqueID}_${programmeId}.pdf`;
    const country = "Côte d'Ivoire";
    const minister = "Ministre";
    const ministry = "Ministère de l'environnement";
    const contactEmailForQuestions = "minister@gouv.ci";
    const date = new Date().toDateString();
    const url =  link_evaluation+random;
    const qrCodeImage = await QRCode.toDataURL(url);
    const capital = "Abidjan"

    const doc = new PDFDocument();
    const stream = fs.createWriteStream("./generate/eligibilite/" + filepath);
    doc.pipe(stream);
// Add header
doc.image("./publics/images/logo.png",50,30, {
    fit: [150, 50],
  

  });
  doc.image(qrCodeImage ,450,20, {
      fit: [150, 100],
     
    });

    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.fontSize(11);

    doc.text(refNo, {
        align: "left",
        continued: true,
    });

    doc
    .text(capital + ', ' + date, {
        align: 'right'
    }).moveDown();

    doc.text(orgAddress, {
        align: "left",
    });

    doc.font("./publics/fonts/Inter-Bold.otf").text(`\n\nRE: LETTER OF INTENT ${programmeName}`, {
        underline: true,
    }).moveDown();


    doc.font("./publics/fonts/Inter-Regular.otf");

    const paragraphs = [
        `The Ministry of Environment, Forestry and Tourism takes note of your proposed ${programmeName} contained in your letter dated ${requestMonth}, ${requestYear} on the above subject matter. The project intends to reduce emissions.`,

        `By this letter, the Ministry of Environment, Forestry and Tourism can confirm that the proposed project aligns with ${country}'s Nationally Determined Contributions (NDC) and Sustainable Development Goals priorities.`,

        `Therefore, the Ministry of Environment, Forestry and Tourism stands ready for future collaboration with ${orgName} in the project development phase to generate mitigation outcomes towards Article 6.2 or Voluntary Carbon Markets.`,

        `Note that the Ministry of Environment, Forestry and Tourism has the mandate, as the designated national body, to oversee the technical arrangements of the carbon market instruments under Article 6.2 of the Paris Agreement.`,

        `Furthermore, kindly note that in developing the ${programmeName} for the carbon market, you will be requested to show evidence of your engagements with the ${sectoralMinistry} to meet regulatory requirements for the project.`,

        `Contact us through ${contactEmailForQuestions} for any clarifications.`,
    ];

    paragraphs.forEach((paragraph) => {
        doc
            .list([paragraph], {
                bulletRadius: 2, // Radius of the bullet points
                bulletIndent: 20, // Indentation of the bullet points
                textIndent: 15, // Indentation of the text after the bullet points
                listType: "bullet",
            })
            .moveDown(); 
    });

    doc.text(`\n\nThank you.`, {
        align: "left",
    });

    doc.text(`\n\nYours Faithfully,`, {
        align: "left",
    });

    doc.text(`${minister}`, {
        align: "left",
    });
    doc.image(new_data.signature ,450,640, {
        fit: [125, 75],
       
      });
    addFooter_eng(doc,site_verif_doc,random)
    doc.end();

    // const content = await new Promise<string>((resolve) => {
    //     stream.on("finish", function () {
    //         const contents = fs.readFileSync("/tmp/" + filepath, {
    //             encoding: "base64",
    //         });
    //         resolve(contents);
    //     });
    // });
    // const url = await this.fileHandler.uploadFile(
    //     "documents/" + filepath,
    //     content
    // );

    return to_send
}
async function generateLetter_eligibilite_sign(refNo,programmeId, programmeName, sectoralMinistry, orgName, orgAddress, requestMonth, requestYear,random,new_data) {
    const uniqueID = uuidv4();
    const to_send = api_origin +`/eligibilite/RESPONSE_FOR_LETTER_OF_INTENT_${uniqueID}_${programmeId}.pdf` 
    const filepath = `RESPONSE_FOR_LETTER_OF_INTENT_${uniqueID}_${programmeId}.pdf`;
    const country = "Côte d'Ivoire";
    const minister = "Ministre";
    const ministry = "Ministère de l'environnement";
    const contactEmailForQuestions = "minister@gouv.ci";
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
    const date = new Date().toLocaleDateString('fr-FR', options)
    const url =  link_evaluation+random;
    const qrCodeImage = await QRCode.toDataURL(url);
    const capital = "Abidjan"

    const doc = new PDFDocument();
    const stream = fs.createWriteStream("./generate/eligibilite/" + filepath);
    doc.pipe(stream);
// Add header
doc.image("./publics/images/logo.png",50,30, {
    fit: [150, 50],
  

  });
  doc.image(qrCodeImage ,450,20, {
      fit: [150, 100],
     
    });

    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.fontSize(11);

    doc.text(refNo, {
        align: "left",
        continued: true,
    });

    doc
    .text(capital + ', ' + date, {
        align: 'right'
    }).moveDown();

    doc.text(orgAddress, {
        align: "left",
    });

    doc.font("./publics/fonts/Inter-Bold.otf").text(`\n\nOBJET : LETTRE D'ELIGIBILITE ${programmeName}`, {
        underline: true,
    }).moveDown();
    
    doc.font("./publics/fonts/Inter-Regular.otf");
    
    const paragraphs = [
        `Le Ministère de l'Environnement prend note de votre proposition ${programmeName} contenue dans votre lettre datée de ${requestMonth}, ${requestYear} sur le sujet ci-dessus. Le projet vise à réduire les émissions.`,
    
        `Par cette lettre, Le Ministère de l'Environnement peut confirmer que le projet proposé s'aligne avec les Contributions Déterminées au niveau National (CDN) et les priorités des Objectifs de Développement Durable de ${country}.`,
    
        `Par conséquent, Le Ministère de l'Environnement se tient prêt pour une future collaboration avec ${orgName} dans la phase de développement du projet afin de générer des résultats d'atténuation pour l'Article 6.2 ou les Marchés Volontaires de Carbone.`,
    
        `Veuillez noter que Le Ministère de l'Environnement a le mandat, en tant qu'organe national désigné, de superviser les arrangements techniques des instruments du marché du carbone en vertu de l'Article 6.2 de l'Accord de Paris.`,
    
        `De plus, veuillez noter que dans le développement de ${programmeName} pour le marché du carbone, il vous sera demandé de fournir des preuves de vos engagements avec le ${sectoralMinistry} pour répondre aux exigences réglementaires du projet.`,
    
        `Contactez-nous via ${contactEmailForQuestions} pour toute clarification.`,
    ];
    
    paragraphs.forEach((paragraph) => {
        doc
            .list([paragraph], {
                bulletRadius: 2, // Rayon des puces
                bulletIndent: 20, // Indentation des puces
                textIndent: 15, // Indentation du texte après les puces
                listType: "bullet",
            })
            .moveDown(); 
    });
    
    doc.text(`\n\nMerci.`, {
        align: "left",
    });
    
    doc.text(`\n\nCordialement,`, {
        align: "left",
    });
    
    doc.text(`${minister}`, {
        align: "left",
    });
    doc.image(new_data.signature ,450,640, {
        fit: [125, 75],
       
      });
    addFooter(doc,site_verif_doc,random)
    doc.end();
    

    // const content = await new Promise<string>((resolve) => {
    //     stream.on("finish", function () {
    //         const contents = fs.readFileSync("/tmp/" + filepath, {
    //             encoding: "base64",
    //         });
    //         resolve(contents);
    //     });
    // });
    // const url = await this.fileHandler.uploadFile(
    //     "documents/" + filepath,
    //     content
    // );

    return to_send
}
async function generateLetter_autorisation_sign(refNo,ministry,minister,programmeId, programmeName, authorisedCompanyName, orgName, designDocUrl, methodologyDocUrl,random,new_data) {
    const uniqueID = uuidv4();
    const country ="Côte d'Ivoire"

    const filepath = "./generate/authorisation/"+`LETTER_OF_AUTHORISATION_${uniqueID}_${programmeId}.pdf` 
    const to_send = api_origin +`/authorisation/LETTER_OF_AUTHORISATION_${uniqueID}_${programmeId}.pdf` 
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
    const date = new Date().toLocaleDateString('fr-FR', options)
    const url =  link_evaluation+random;
    const qrCodeImage = await QRCode.toDataURL(url);
    const doc = new PDFDocument() 
 
    const stream = fs.createWriteStream(filepath) 
    doc.pipe(stream) 
    doc.fontSize(11) 


       
    // Add header
    doc.image("./publics/images/logo.png",50,30, {
      fit: [150, 50],
    

    });
    doc.image(qrCodeImage ,450,20, {
        fit: [150, 100],
       
      });

      doc.moveDown();
      doc.fontSize(10);
    doc.text(`République de ${country}`,{
        align: "center",
    });
    doc.text(`Union - Discipline - Travail`, {
        align: "center",

      });

      doc.moveDown();
    doc.text("Ministère de l'Environnement", {
        align: "center",
       
      });
  
    doc.text("et de la transition Ecologique",{
        align: "center",
         
        });


 
    doc.moveDown();
  
    doc.fontSize(12);
  
  
   
      doc.moveDown();
    doc.text(authorisedCompanyName+" "+country, {
      align: "center",
      margin: [20, 0, 20, 0],
    });
   
    doc.moveDown();
  
    doc.text(`Abidjan, le ${date}`, {
      align: "right",
      margin: [20, 0, 20, 0],
    });
    doc.moveDown();
    doc.text(`Réf. : ${refNo}`, {
      align: "left",
      margin: [20, 0, 20, 0],
    });
    doc.moveDown();

    // doc.text(refNo, {
    //     align: "left",
    //     continued: true,
    // }) 
    // doc.text(date, {
    //     align: "right",
    // }) 
    doc.font("./publics/fonts/Inter-Bold.otf").text(`\n\nLettre d’autorisation de ${programmeName}`, {
        align: "left",
    }) 
    doc.font("./publics/fonts/Inter-Bold.otf").text("\n\nMandat d’autorisation", {
        underline: true,
    }) 
    doc.font("./publics/fonts/Inter-Regular.otf") 
    doc.text(`\n\n 1.  ${authorisedCompanyName} est le ministère du gouvernement responsable du changement climatique dans ${country}.`, {
        indent: 15,
    }) 
    doc.text(`\n\n 2. le gouvernement a mandaté ${authorisedCompanyName} pour superviser ${country}La participation de la Commission à l’approche coopérative de l’article 6.2 au titre de l’Accord de Paris et des décisions pertinentes adoptées conformément à la Convention-cadre des Nations Unies sur les changements climatiques (CCNUCC), en particulier la décision 2/CMA3.`, {
        indent: 15,
    }) 
    doc.text(`\n\n 3. Le ministère de l’Environnement, des Forêts et du Tourisme est également l’autorité compétente désignée pour « Accord de coopération entre ${orgName} et ${country} en vue de la mise en œuvre de l’Accord de Paris (ci-après dénommé Accord de coopération avec ${orgName}).`, {
        indent: 15,
    }) 
    doc
        .font("./publics/fonts/Inter-Bold.otf")
        .text("\n\nConditions préalables à l’autorisation ", {
        underline: true,
    }) 
    doc.font("./publics/fonts/Inter-Regular.otf") 
    doc.text(`\n\n 4. ${orgName}, en tant que participant autorisé à l’activité d’atténuation pour le « ${programmeName}» (ci-après appelé l’activité d’atténuation telle que définie dans l’accord de coopération avec ${orgName}) :`, {
        indent: 15,
    }) 
    doc.text(`\n\n 4.1 Ayant satisfait à toutes les conditions préalables pour autoriser les résultats d’atténuation pour les transferts internationaux et leurs cas d’utilisation ultérieurs, comme indiqué dans le cadre du marché international du carbone de ${country} et `, {
        indent: 15,
    }) 
    doc.text(`\n\n 4.2 Après avoir examiné les recommandations techniques du groupe de travail sur le marché du carbone de ${country} sur le ${programmeName}`, {
        indent: 15,
    }) 
    doc.font("./publics/fonts/Inter-Bold.otf").text("\n\nDéclaration d’autorisation", {
        underline: true,
    }) 
    doc.font("./publics/fonts/Inter-Regular.otf") 
    doc.text(`\n\n 5.  ${authorisedCompanyName} accorde par la présente l’autorisation officielle des résultats d’atténuation transférés à l’échelle internationale (ITMO) qui sont générés à partir de la mise en œuvre du “${programmeName}” sur la base des informations présentées dans `, {
        indent: 15,
        continued: true,
    }) 
    doc.fillColor("blue").text("Annex [x]", {
        link: designDocUrl,
        underline: true,
        continued: true,
    }) 
    doc.fillColor("black").text(`, la méthodologie de `, {
        indent: 15,
        continued: true,
        underline: false,
    }) 
    doc.fillColor("blue").text("Annex [y]", {
        link: methodologyDocUrl,
        underline: true,
        continued: true,
    }) 
    doc
        .fillColor("black")
        .text(`, et conformément à l’article 6.3 de l’Accord de Paris et à l’Accord de coopération avec ${orgName}".`, {
        indent: 15,
        underline: false,
    }) 
    doc
        .font("./publics/fonts/Inter-Bold.otf")
        .text("\n\nRépercussions de l’autorisation ", {
        underline: true,
    }) 
    doc.font("./publics/fonts/Inter-Regular.otf") 
    doc.text(`\n\n 6. Par cette lettre, la ${country} confirme que : `, {
        indent: 15,
    }) 
    doc.text(`\n\n a. Il a ratifié l’Accord de Paris en avril 2016 et maintient son dernier CDN sur le registre provisoire des CDN en vertu de l’article 4, paragraphe 12 de l’Accord de Paris.`, {
        indent: 30,
    }) 
    doc.text(`\n\n b. Sa participation à l’article 6, paragraphe 2, l’approche coopérative de l’Accord de Paris avec le ${orgName} comme Partie destinataire, est volontaire. `, {
        indent: 30,
    }) 
    doc.text(`\n\n c. Son engagement à transférer le nombre de résultats d’atténuation émis découlant de la mise en œuvre du « ${programmeName} » N’EMPÊCHERA PAS la ${country} d’atteindre l’objectif de CDN 2030. `, {
        indent: 30,
    }) 
    doc.text(`\n\n 7. La présente lettre constitue une autorisation de ${country}, telle que définie par les orientations sur les approches coopératives visées à l’article 6, paragraphe 2, de l’Accord de Paris (Décision 2/CMA.3) et le cadre international du marché du carbone de ${country} pour l’activité d’atténuation, avec ce qui suit : `, {
        indent: 15,
    }) 
    doc.text(`\n\n a. Les ITMO générés à l’égard des mesures d’atténuation ou représentant des mesures d’atténuation à partir de 2021, couvrant la période de mise en œuvre des CDN jusqu’en 2030.  `, {
        indent: 30,
    }) 
    doc.text(`\n\n b. Les ITMO générés à partir de l’activité d’atténuation autorisée ne seront pas utilisés par la ${country} pour démontrer la réalisation de son propre CDN  `, {
        indent: 30,
    }) 
    doc.text(`\n\n c. MLes résultats de l’activité d’atténuation autorisée seront comptabilisés dans le registre de ${country}, et le transfert et l’utilisation des ITMO sont conformes aux orientations et aux décisions pertinentes de la CMA. `, {
        indent: 30,
    }) 
    doc.text(`\n\n Cette lettre n’implique pas ou ne fournit pas un engagement de la part du ${country} soutenir ou financer l’activité d’atténuation autorisée si des parties ont des exigences légales ou environnementales pour la construction et l’exploitation de l’activité d’atténuation qui ne sont pas remplies et que l’activité d’atténuation, par conséquent, ne peut pas aller de l’avant. `, {
        indent: 15,
    }) 
    doc.moveDown(3) 
    doc.font("./publics/fonts/Inter-Bold.otf").text("\n\nConfirmations", {
        underline: true,
    }) 
    doc.font("./publics/fonts/Inter-Regular.otf") 
    doc.text(`\n\n 9. La ${country} s’engage à transférer le montant des ITMO autorisés, vérifiés et examinés positivement de cette activité d’atténuation en vertu de l’accord de coopération avec ${orgName}, signé le ${date}.`, {
        indent: 15,
    }) 
    doc.text(`\n\n 10. Dans la présente lettre, la ${country} confirme qu’il respecte toutes les exigences de l’Accord de Paris ainsi que de l’Accord de coopération avec le ${orgName}, y compris la déclaration, la prévention de la double comptabilisation et de la double réclamation, et l’exécution des rajustements correspondants. `, {
        indent: 15,
    }) 
    doc.text(`\n\n 11. Par la présente lettre, la ${country} s’engage à appliquer les ajustements correspondants (approche comptable cible sur un an en calculant les transferts annuels moyens d’ITMO sur la période 2021-2030), conformément aux orientations sur les approches coopératives visées à l’article 6, le paragraphe 2 de l’Accord de Paris (décision 2/CMA.3) et les décisions futures pertinentes de la CMA, de manière transparente, exacte, complète, comparable et cohérente. `, {
        indent: 15,
    }) 
    doc.text(`\n\nCoordialement,\nL'Honorable ${minister}\nMinistre du \n${ministry}\ndu Gouvernement de la  ${country}`) 
    doc.font("./publics/fonts/Inter-Bold.otf").text("\n\n Appendices", {
        underline: true,
    }) 
    doc.moveDown(2) 
    doc.fillColor("blue").text("Annex [x]: document de conception", {
        link: designDocUrl,
        underline: true,
        indent: 15,
    }) 
    doc.fillColor("blue").text("Annex [y]: document méthodologique", {
        link: methodologyDocUrl,
        underline: true,
        indent: 15,
    }) 
    doc.image(new_data.signature ,450,640, {
        fit: [125, 75],
       
      });
    addFooter(doc,site_verif_doc,random)
    doc.end() 
    
//    const url = await this.fileHandler.uploadFile("documents/" + filepath, content) 
 return to_send
}
async function generateLetter_autorisation_eng_sign(refNo,ministry,minister,programmeId, programmeName, authorisedCompanyName, orgName, designDocUrl, methodologyDocUrl,random,new_data) {
    const uniqueID = uuidv4();
    const country ="Côte d'Ivoire"

    const filepath = "./generate/authorisation/"+`LETTER_OF_AUTHORISATION_${uniqueID}_${programmeId}.pdf` 
    const to_send = api_origin +`/authorisation/LETTER_OF_AUTHORISATION_${uniqueID}_${programmeId}.pdf` 
    const date = new Date().toDateString() 
   
    const url =  link_evaluation+random;
    const qrCodeImage = await QRCode.toDataURL(url);
    const doc = new PDFDocument() 
 
    const stream = fs.createWriteStream(filepath) 
    doc.pipe(stream) 
    doc.fontSize(11) 


       
    // Add header
    doc.image("./publics/images/logo.png",50,30, {
      fit: [150, 50],
    

    });
    doc.image(qrCodeImage ,450,20, {
        fit: [150, 100],
       
      });

      doc.moveDown();
      doc.fontSize(10);
    doc.text(`République de ${country}`,{
        align: "center",
    });
    doc.text(`Union - Discipline - Travail`, {
        align: "center",

      });

      doc.moveDown();
    doc.text("Ministère de l'Environnement", {
        align: "center",
       
      });
  
    doc.text("et de la transition Ecologique",{
        align: "center",
         
        });


 
    doc.moveDown();
  
    doc.fontSize(12);
  
  
   
      doc.moveDown();
    doc.text("Bureau du marché carbone Côte D'Ivoire", {
      align: "center",
      margin: [20, 0, 20, 0],
    });
   
    doc.moveDown();
  
    doc.text(`Abidjan, le ${date}`, {
      align: "right",
      margin: [20, 0, 20, 0],
    });
    doc.moveDown();
    doc.text(`Réf. : ${refNo}`, {
      align: "left",
      margin: [20, 0, 20, 0],
    });
    doc.moveDown();

    doc.text(refNo, {
        align: "left",
        continued: true,
    }) 
    doc.text(date, {
        align: "right",
    }) 
    doc.font("./publics/fonts/Inter-Bold.otf").text(`\n\nLetter of Authorisation of ${programmeName}`, {
        align: "left",
    }) 
    doc.font("./publics/fonts/Inter-Bold.otf").text("\n\nMandate For Authorisation", {
        underline: true,
    }) 
    doc.font("./publics/fonts/Inter-Regular.otf") 
    doc.text(`\n\n 1. The ${authorisedCompanyName} is the Government’s Ministry responsible for climate change in ${country}.`, {
        indent: 15,
    }) 
    doc.text(`\n\n 2. The Government has mandated ${authorisedCompanyName} to oversee ${country}'s participation in Article 6.2 cooperative approach under the Paris Agreement and the relevant decisions adopted according to the United Nations Framework Convention on Climate Change (UNFCCC), particularly, Decision 2/CMA3.`, {
        indent: 15,
    }) 
    doc.text(`\n\n 3. The Ministry of Environment, Forestry and Tourism is also the designated competent authority for implementing the “Cooperation Agreement between the ${orgName} and the ${country} towards the implementation of the Paris Agreement (hereinafter referred to as the Cooperation Agreement with ${orgName}).`, {
        indent: 15,
    }) 
    doc
        .font("./publics/fonts/Inter-Bold.otf")
        .text("\n\nPre-conditions for Authorisation ", {
        underline: true,
    }) 
    doc.font("./publics/fonts/Inter-Regular.otf") 
    doc.text(`\n\n 4. The ${orgName}, as the authorised mitigation activity participant for the “${programmeName}” (hereinafter referred to as the Mitigation Activity as defined in the Cooperation Agreement with ${orgName}):`, {
        indent: 15,
    }) 
    doc.text(`\n\n 4.1 Having satisfied all the pre-conditions for authorising mitigation outcomes for international transfers and their subsequent use cases as set out in ${country}'s international carbon market framework and `, {
        indent: 15,
    }) 
    doc.text(`\n\n 4.2 Having considered the technical recommendations from ${country}'s carbon market task force on the ${programmeName}`, {
        indent: 15,
    }) 
    doc.font("./publics/fonts/Inter-Bold.otf").text("\n\nAuthorisation Statement", {
        underline: true,
    }) 
    doc.font("./publics/fonts/Inter-Regular.otf") 
    doc.text(`\n\n 5. The ${authorisedCompanyName} hereby grants formal Authorisation of the Internationally Transferred Mitigation Outcomes (ITMOs) that are generated from implementing the “${programmeName}” based on the information outlined in `, {
        indent: 15,
        continued: true,
    }) 
    doc.fillColor("blue").text("Annex [x]", {
        link: designDocUrl,
        underline: true,
        continued: true,
    }) 
    doc.fillColor("black").text(`, the methodology in `, {
        indent: 15,
        continued: true,
        underline: false,
    }) 
    doc.fillColor("blue").text("Annex [y]", {
        link: methodologyDocUrl,
        underline: true,
        continued: true,
    }) 
    doc
        .fillColor("black")
        .text(`, and per the Article 6.3 of the Paris Agreement and the Cooperation Agreement with ${orgName}".`, {
        indent: 15,
        underline: false,
    }) 
    doc
        .font("./publics/fonts/Inter-Bold.otf")
        .text("\n\nImplications of Authorisation ", {
        underline: true,
    }) 
    doc.font("./publics/fonts/Inter-Regular.otf") 
    doc.text(`\n\n 6. By this letter, the ${country} confirms that: `, {
        indent: 15,
    }) 
    doc.text(`\n\n a. It ratified the Paris Agreement on April 2016 and maintains its latest NDC on the interim NDC registry under Article 4, paragraph 12 of the Paris Agreement.`, {
        indent: 30,
    }) 
    doc.text(`\n\n b. Its participation in Article 6, paragraph 2, the cooperative approach of the Paris Agreement with the ${orgName} as the receiving Party, is voluntary. `, {
        indent: 30,
    }) 
    doc.text(`\n\n c. Its commitment to transfer the number of issued mitigation outcomes arising from the implementation of the “${programmeName}” shall NOT prevent ${country} from achieving the 2030 NDC target. `, {
        indent: 30,
    }) 
    doc.text(`\n\n 7. This letter constitutes ${country} authorisation, as defined per the guidance on cooperative approaches referred to in Article 6, paragraph 2, of the Paris Agreement (Decision 2/CMA.3) and ${country}'s International Carbon Market Framework for the Mitigation Activity, with the following: `, {
        indent: 15,
    }) 
    doc.text(`\n\n a. ITMOs generated in respect of or representing mitigation from 2021 onward, spanning through the NDC implementation period up to 2030.  `, {
        indent: 30,
    }) 
    doc.text(`\n\n b. ITMOs generated from the Authorised mitigation activity will not be used by the ${country} to demonstrate the achievement of its own NDC  `, {
        indent: 30,
    }) 
    doc.text(`\n\n c. Mitigation Outcomes from the Authorised mitigation activity will be recognised into ${country}'s registry, and the transfer and use of ITMOs are consistent with the guidance and relevant decisions of the CMA. `, {
        indent: 30,
    }) 
    doc.text(`\n\n 8. This letter does not imply or provide a commitment on the part of the ${country} to support or fund the authorised mitigation activity if any parties have legal or environmental requirements for the construction and operation of the mitigation activity not fulfilled and the mitigation activity, therefore, is unable to proceed. `, {
        indent: 15,
    }) 
    doc.moveDown(3) 
    doc.font("./publics/fonts/Inter-Bold.otf").text("\n\nConfirmations", {
        underline: true,
    }) 
    doc.font("./publics/fonts/Inter-Regular.otf") 
    doc.text(`\n\n 9. The ${country} commits to transfer the amount of authorised, verified and positively examined ITMOs from this mitigation activity under the Cooperation Agreement with ${orgName}, signed on ${date}.`, {
        indent: 15,
    }) 
    doc.text(`\n\n 10. Through this letter, the ${country} confirms to follow all requirements of the Paris Agreement as well as the Cooperation Agreement with ${orgName}, including reporting, preventing double-counting and double-claiming, and undertaking Corresponding Adjustments. `, {
        indent: 15,
    }) 
    doc.text(`\n\n 11. By this letter, the ${country} commits to apply corresponding adjustments (single-year target accounting approach by calculating average annual ITMOs transfers over 2021-2030), consistently with the guidance on cooperative approaches referred to in Article 6, paragraph 2, of the Paris Agreement (Decision 2/CMA.3) and relevant future decisions of the CMA, in a transparent, accurate, complete, comparable, and consistent manner. `, {
        indent: 15,
    }) 
    doc.text(`\n\nSincerely,\nHonorable ${minister}\nMinister\n${ministry}\nGovernment of ${country}`) 
    doc.font("./publics/fonts/Inter-Bold.otf").text("\n\n Appendices", {
        underline: true,
    }) 
    doc.moveDown(2) 
    doc.fillColor("blue").text("Annex [x]: Design Document", {
        link: designDocUrl,
        underline: true,
        indent: 15,
    }) 
    doc.fillColor("blue").text("Annex [y]: Methodology Document", {
        link: methodologyDocUrl,
        underline: true,
        indent: 15,
    }) 
    doc.image(new_data.signature ,450,640, {
        fit: [125, 75],
       
      });
    addFooter_eng(doc,site_verif_doc,random)
    doc.end() 
    
//    const url = await this.fileHandler.uploadFile("documents/" + filepath, content) 
 return to_send
}
module.exports={
    isNotEmpty:isNotEmpty,
    setDefaultIfEmpty:setDefaultIfEmpty,
    authenticateToken:authenticateToken,
    isObjectsuccess:isObjectsuccess,
    generateauthenticateToken:generateauthenticateToken,
    verifierID:verifierID,
    generatecode:generatecode,
    generate_identify_code:generate_identify_code,
    generate_global_code:generate_global_code,
    generateRandomCode:generateRandomCode,
    generateLetter_approbation:generateLetter_approbation,
    generateLetter_approbation_eng:generateLetter_approbation_eng,
    generateLetter_objection:generateLetter_objection,
    generateLetter_objection_eng:generateLetter_objection_eng,
    generateLetter_eligibilite:generateLetter_eligibilite,
    generateLetter_eligibilite_eng:generateLetter_eligibilite_eng,
    generateLetter_autorisation:generateLetter_autorisation,
    generateLetter_autorisation_eng:generateLetter_autorisation_eng,


    generateLetter_approbation_sign:generateLetter_approbation_sign,
    generateLetter_approbation_eng_sign:generateLetter_approbation_eng_sign,
    generateLetter_objection_sign:generateLetter_objection_sign,
    generateLetter_objection_eng_sign:generateLetter_objection_eng_sign,
    generateLetter_eligibilite_sign:generateLetter_eligibilite_sign,
    generateLetter_eligibilite_eng_sign:generateLetter_eligibilite_eng_sign,
    generateLetter_autorisation_sign:generateLetter_autorisation_sign,
    generateLetter_autorisation_eng_sign:generateLetter_autorisation_eng_sign,

}