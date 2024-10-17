// Exemple de liste de projets avec leurs polygones
//Tools polygone de test (https://www.keene.edu/campus/maps/tool/)
let listeProjets = [
  {
    programmeId: "001",
    Intitule: "Zone 1",
    polygoneProjet: [
      [
        [-72.2804689, 42.9267461],
        [-72.2794551, 42.9267814],
        [-72.2794229, 42.9271035],
        [-72.2795355, 42.9273863],
        [-72.2796053, 42.927457],
        [-72.2799486, 42.9274649],
        [-72.2803348, 42.9273863],
        [-72.2803992, 42.9272056],
        [-72.2804207, 42.9270132],
        [-72.2804314, 42.9268953],
        [-72.2804582, 42.9267775],
      ],
    ],
  },
  {
    programmeId: "002",
    Intitule: "Angré 4",
    polygoneProjet: [
      [
        [-72.2799075, 42.9275343],
        [-72.2800595, 42.9270668],
        [-72.2792977, 42.9269686],
        [-72.2793245, 42.92755],
        [-72.2798985, 42.9275343],
        [-72.2799075, 42.9275343],
      ],
    ],
  },
  {
    programmeId: "003",
    Intitule: "Angré 3",
    polygoneProjet: [
      [
        [-72.282747, 42.9270865],
        [-72.2827631, 42.9270865],
        [-72.282334, 42.9265876],
        [-72.2822911, 42.9271808],
        [-72.2827524, 42.9270511],
        [-72.2820121, 42.9266701],
        [-72.2820657, 42.9272318],
        [-72.2822696, 42.9271729],
        [-72.282747, 42.9270865],
      ],
    ],
  },
  {
    programmeId: "004",
    Intitule: "Angré 4",
    polygoneProjet: [
      [
        [-72.2806281, 42.9279938],
        [-72.2816581, 42.9281509],
        [-72.2823232, 42.9276678],
        [-72.2819531, 42.9268508],
        [-72.2811806, 42.9266387],
        [-72.2800058, 42.926568],
        [-72.2790724, 42.9266701],
        [-72.2791153, 42.9270629],
        [-72.2792923, 42.9274596],
        [-72.2795659, 42.9276089],
        [-72.280156, 42.927601],
        [-72.2802955, 42.9278171],
        [-72.2804886, 42.9277857],
        [-72.2805744, 42.9279349],
        [-72.280612, 42.927986],
        [-72.2806281, 42.9279938],
      ],
    ],
  },
  // Ajouter d'autres projets avec polygoneProjet
];

// Fonction pour vérifier si deux polygones ont une intersection
function detecterIntersection(polygone1, polygone2) {
  // On vérifie chaque segment du premier polygone
  for (let i = 0; i < polygone1.length; i++) {
    let p1 = polygone1[i];
    let p2 = polygone1[(i + 1) % polygone1.length]; // Le dernier point relie au premier pour fermer le polygone

    // On vérifie chaque segment du deuxième polygone
    for (let j = 0; j < polygone2.length; j++) {
      let q1 = polygone2[j];
      let q2 = polygone2[(j + 1) % polygone2.length]; // Le dernier point relie au premier pour fermer le polygone

      // Vérifier si les segments se croisent
      if (segmentsIntersectent(p1, p2, q1, q2)) {
        return true;
      }
    }
  }

  return false;
}

// Fonction pour vérifier si deux segments se croisent
function segmentsIntersectent(p1, p2, q1, q2) {
  function orientation(p, q, r) {
    let val = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1]);
    if (val === 0) return 0;
    return val > 0 ? 1 : 2;
  }

  function surSegment(p, q, r) {
    return (
      q[0] <= Math.max(p[0], r[0]) &&
      q[0] >= Math.min(p[0], r[0]) &&
      q[1] <= Math.max(p[1], r[1]) &&
      q[1] >= Math.min(p[1], r[1])
    );
  }

  let o1 = orientation(p1, p2, q1);
  let o2 = orientation(p1, p2, q2);
  let o3 = orientation(q1, q2, p1);
  let o4 = orientation(q1, q2, p2);

  if (o1 !== o2 && o3 !== o4) {
    return true;
  }

  if (o1 === 0 && surSegment(p1, q1, p2)) return true;
  if (o2 === 0 && surSegment(p1, q2, p2)) return true;
  if (o3 === 0 && surSegment(q1, p1, q2)) return true;
  if (o4 === 0 && surSegment(q1, p2, q2)) return true;

  return false;
}

// Fonction pour détecter les intersections entre les projets
/*function detecterIntersectionsProjets(listeProjets) {
  let intersections = [];

  for (let i = 0; i < listeProjets.length; i++) {
    let projet1 = listeProjets[i];
    let polygone1 = JSON.parse(projet1.polygoneProjet)[0]; // Assumons un seul polygone par projet

    for (let j = i + 1; j < listeProjets.length; j++) {
      let projet2 = listeProjets[j];
      let polygone2 = JSON.parse(projet2.polygoneProjet)[0]; // Assumons un seul polygone par projet

      if (detecterIntersection(polygone1, polygone2)) {
        intersections.push({
          projet1: projet1.programmeId,
          projet2: projet2.programmeId,
        });
      }
    }
  }

  return intersections;
}
*/
// Appel de la fonction pour détecter les intersections entre les projets
//let intersections = detecterIntersectionsProjets(listeProjets);

// Affichage des projets avec intersections
// Fonction pour détecter les intersections entre les projets

function detecterIntersectionsProjets(listeProjets) {
  let intersections = [];
  let polygone1 = {};
  for (let i = 0; i < listeProjets.length; i++) {
    let projet1 = listeProjets[i];

    if (projet1.polygoneProjet != null) {
      if(JSON.parse(projet1.polygoneProjet)[0]!=undefined){
      polygone1 = JSON.parse(projet1.polygoneProjet)[0].Polygone[0];
      }

      console.table(polygone1);
      //polygone1 = projet1.polygoneProjet[0];
      // console.log(polygone1);
    }
    // Assumons un seul polygone par projet
    let polygone2 = {};
    for (let j = i + 1; j < listeProjets.length; j++) {
      let projet2 = listeProjets[j];
      // Assumons un seul polygone par projet
      if (projet2.polygoneProjet != null) {
         if(JSON.parse(projet2.polygoneProjet)[0]!=undefined){
         polygone2 = JSON.parse(projet2.polygoneProjet)[0].Polygone[0];
        // polygone2 = projet2.polygoneProjet[0];
         }
      }
      if (detecterIntersection(polygone1, polygone2)) {
        intersections.push({
          projet1: projet1,
          projet2: projet2,
        });
      }
    }
  }

  return intersections;
}

//const result = detecterIntersectionsProjets(listeProjets);
//console.log(result);

module.exports = {
  detecterIntersectionsProjets: detecterIntersectionsProjets,
};
