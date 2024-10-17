

# DEMARCHEUR EN LIGNE API

![stack Overflow](https://skyvisionafrica.com/public/assets/logo/sky.png)



Bienvenue sur l'api demarcheur en ligne de l'entreprise [trouvervotremaison.ci](trouvervotremaison.ci). 
Créer par l'entreprise [skyvisionAfrica](https://skyvisionafrica.com/).
Cette api renvoie des donneés en JSON aprés des requettes http par #get ou #post;

### STRUCTURES DES REQUETES 

***pour les utilisateurs***
```
/users/apiv1/[parametre]
```
***pour les administrateurs***

```
/apiv1/[parametre]

```
## ENTITE OU FAIRE DES REQUETES

#### UTILISATEUR
***creer un utilisateur***

```
/users/apiv1/createuser/

POST -Request

Body parameters {
nomUtilisateur

EmailUtilisateur

motdepasseUtilisateur

}







```
***mise a jour utilisateur***
```
/users/apiv1/updateuser/

POST -Request

Body parameters {
utilisateurid [parametre clé]

nomUtilisateur

EmailUtilisateur

motdepasseUtilisateur

}







```
***liste des  utilisateurs***
```
/users/apiv1/listuser/

POST -Request

Body parameters {
Aucun paramettre requis

}








```
***effacer  des  utilisateurs***
```
/apiv1/deleteuser/



POST -Request

Body parameters {

utilisateurid

}



```
### MAISON

***creer une maison***

```
/apiv1/creatmaison/


POST -Request

Body parameters {

   IntituleMaison
   DescriptionMaison
   SuperficieMaison
   TypeMaison
   quartier
   commune
   pays
   lieuMaison
   imageMaison=>(upload image limit 12 )
   idagent [ Agent doit etre crée d'abord pour avoir un id]
   statusMaison








}








```
***mettre à jour une maison***
```
/apiv1/updatemaison/


POST -Request

Body parameters {
maisonid [parametre clé]
   IntituleMaison
   DescriptionMaison
   SuperficieMaison
   TypeMaison
   quartier
   commune
   pays
   lieuMaison
   imageMaison=>(upload image limit 12 )
   idagent[ Agent doit etre crée d'abord pour avoir un id]
   statusMaison








}




```
***mettre à jour le status maison***
```
/apiv1/updatestatusmaison/

POST -Request

Body parameters {

maisonid [parametre clé]
statusMaison
}



```
***listes des  maisons***
```
/apiv1/listmaison/all/


POST -Request

Body parameters {

Aucun parametre requis
}





```
***effacer des  maisons***
```
/apiv1/deletemaison/

POST -Request

Body parameters {

maisonid [parametre clé]

}



```
***liste de maisons par id***
```
/apiv1/listmaison/:id

POST -Request

Body parameters {

id [parametre clé]

}




```
### Agent

***creer un agent***
```
/apiv1/creatagent/





POST -Request

Body parameters {

nomAgent
emailAgent
motdepassAgent

}





   





```
***mis à jour  d'un agent***
```
/apiv1/updateagent/

POST -Request

Body parameters {

agentid [parametre clé]

nomAgent
emailAgent
motdepassAgent


}


```
***listes des  agents***
```
/apiv1/listagent/

POST -Request

Body parameters {

Aucun parametre requis
}




```
***effacer un  agent***
```
/apiv1/deleteagent/

POST -Request

Body parameters {

agentid [parametre clé]
}



```
***authentification  d'un  agent***
```
/apiv1/authagent/

POST -Request

Body parameters {

emailAgent [parametre clé]
motdepassAgent [parametre clé]
}






```



### Location

***creer une location***
```
/apiv1/creatlocation/

POST -Request

Body parameters {

  nomlocataire;
  prenomlocataire;
  contactlocataire;
  idmaison;
  decription;



}


 




```
***liste des locations***
```
/apiv1/listlocation/

POST -Request

Body parameters {

Aucun parametre requis
}


```
***effacer des locations***
```
/apiv1/deletelocation/

POST -Request

Body parameters {

locationid [parametre clé]
}





```
***listes  locations par id***
```
/apiv1/listlocationbyid/

POST -Request

Body parameters {

locationid [parametre clé]
}



```

### Suggestion
***creer une suggestion***

```
/apiv1/creatsuggestion/

POST -Request

Body parameters {


nomutilisateur
prenomutilisateur
contactutilisateur
descriptiondemande






}





```
***liste des suggestions***
```
/apiv1/listsuggestion/




POST -Request

Body parameters {

Aucun parametre requis

}






```
***effacer  des suggestions***
```
/apiv1/deletesuggestion/

POST -Request

Body parameters {

btsuggestionid [parametre clé]

}






```
***lises  des suggestions par id***
```
/apiv1/listsuggestionbyid/

POST -Request

Body parameters {

btsuggestionid [parametre clé]

}




```

### ADMINISTRATEUR

***supprimer administrateur***
```
/apiv1/deleteadmin/




POST -Request

Body parameters {

adminid [parametre clé]

}



```
***liste des administrateurs***
```
/apiv1/listadmin/


POST -Request

Body parameters {

Aucun paramettre requis
}



```
***mis à jour  des administrateurs***
```
/apiv1/updateadmin/


POST -Request

Body parameters {


adminid [parametre clé]
nomAdmin
EmailAdmin
MotdepasseAdmin
typeAdmin



}






```
***authentification administrateur***
```
/apiv1/authadmin/

POST -Request

Body parameters {

EmailAdmin [parametre clé]

MotdepasseAdmin [parametre clé]



}




```
***creer un administrateur***
```
/apiv1/createadmin/

POST -Request

Body parameters {

nomAdmin
EmailAdmin
MotdepasseAdmin
typeAdmin


}





```













