const axios = require("axios");
const detectintersection = require("./Intersection_old")
  .detecterIntersectionsProjets;

var maps_projet = async (req, res) => {
  const auth = await axios.post(
    "https://api.national.skyvisionafrica.com/national/auth/login",
    {
      username: "roger.doffou@skyvisionafrica.com",
      password: "JRy4U39",
    }
  );

  var token = auth.data.access_token;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const list_projet = await axios.post(
    "https://api.national.skyvisionafrica.com/national/programme/query",
    {
      page: 1,
      size: 108,
    },
    config
  );

  //console.log(JSON.parse(list_projet.data.data[list_projet.data.data.length-1].polygoneProjet))

  var polygoneProjet = JSON.parse(
    list_projet.data.data[list_projet.data.data.length - 1].polygoneProjet
  );
  // console.log(list_projet.data.data)
  //console.log(polygoneProjet[1].Polygone);

  const list_projet_intersection = await axios.post(
    "http://localhost:3005/maps/getprojetIntersection"
  );

  console.log("Liste des intersections");
  console.log(list_projet_intersection.data);

  res.render("maps", {
    list_projet_intersection: list_projet_intersection.data,
  });
};

var list_projets = async (req, res) => {
  console.log("J'arrive ici");
  const auth = await axios.post(
    "https://api.national.skyvisionafrica.com/national/auth/login",
    {
      username: "roger.doffou@skyvisionafrica.com",
      password: "JRy4U39",
    }
  );

  var token = auth.data.access_token;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const list_projet = await axios.post(
    "https://api.national.skyvisionafrica.com/national/programme/query",
    {
      page: 1,
      size: 800,
    },
    config
  );

  res.send(list_projet.data.data);

  /*res.json({
        projet:list_projet.data.data
    })
    */
};

var search_projets = async (req, res) => {
  console.log("J'arrive ici");
  const auth = await axios.post(
    "https://api.national.skyvisionafrica.com/national/auth/login",
    {
      username: "roger.doffou@skyvisionafrica.com",
      password: "JRy4U39",
    }
  );

  var token = auth.data.access_token;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const list_projet = await axios.post(
    "https://api.national.skyvisionafrica.com/national/programme/query",
    {
      page: 1,
      size: 800,
    },
    config
  );

  console.log(req.body.term);

  console.log(list_projet.data.data);
  // Replace with the search term you want to use
  const filteredData = filterData(list_projet.data.data, req.body.term);
  console.log(filteredData);
  res.send(filteredData);

  /*res.json({
          projet:list_projet.data.data
      })
      */
};

function filterData(data, searchTerm) {
  const searchRegex = new RegExp(searchTerm, "i");
  return data.filter((item) => {
    return (
      searchRegex.test(item.title) ||
      item.company.some((company) => searchRegex.test(company.name))
    );
  });
}

// Fonction pour détecter l'intersection entre deux polygones
function detecterIntersection(polygone1, polygone2) {
  // Fonction pour obtenir les segments d'un polygone à partir de ses coordonnées
  function getSegments(polygone) {
    let segments = [];
    for (let i = 0; i < polygone.length; i++) {
      let point1 = polygone[i];
      let point2 = polygone[(i + 1) % polygone.length];
      segments.push([point1, point2]);
    }
    return segments;
  }

  // Fonction pour vérifier l'intersection de deux segments
  function doSegmentsIntersect(segment1, segment2) {
    // Fonctions auxiliaires
    function orientation(p, q, r) {
      let val =
        (q.longitude - p.longitude) * (r.latitude - q.latitude) -
        (q.latitude - p.latitude) * (r.longitude - q.longitude);
      if (val === 0) return 0; // collinéaires
      return val > 0 ? 1 : 2; // horaire ou anti-horaire
    }

    function onSegment(p, q, r) {
      if (
        q.longitude <= Math.max(p.longitude, r.longitude) &&
        q.longitude >= Math.min(p.longitude, r.longitude) &&
        q.latitude <= Math.max(p.latitude, r.latitude) &&
        q.latitude >= Math.min(p.latitude, r.latitude)
      ) {
        return true;
      }
      return false;
    }

    let [p1, p2] = segment1;
    let [q1, q2] = segment2;

    let o1 = orientation(p1, p2, q1);
    let o2 = orientation(p1, p2, q2);
    let o3 = orientation(q1, q2, p1);
    let o4 = orientation(q1, q2, p2);

    if (o1 !== o2 && o3 !== o4) return true;
    if (o1 === 0 && onSegment(p1, q1, p2)) return true;
    if (o2 === 0 && onSegment(p1, q2, p2)) return true;
    if (o3 === 0 && onSegment(q1, p1, q2)) return true;
    if (o4 === 0 && onSegment(q1, p2, q2)) return true;

    return false;
  }

  // Obtenir les segments de chaque polygone
  let segments1 = getSegments(polygone1);
  let segments2 = getSegments(polygone2);

  // Vérifier l'intersection de chaque segment de polygone1 avec chaque segment de polygone2
  for (let segment1 of segments1) {
    for (let segment2 of segments2) {
      if (doSegmentsIntersect(segment1, segment2)) {
        return true; // Il y a intersection
      }
    }
  }

  return false; // Aucune intersection détectée
}

// Exemple d'utilisation avec une liste de projets
let listeProjets = [
  {
    programmeId: "001",
    title: "Projet 1",
    polygoneProjet: [
      { latitude: 5.585945599, longitude: 7.0669651 },
      { latitude: 8.831122799, longitude: 7.1724673 },
      { latitude: 10.38301, longitude: 11.206567 },
    ],
  },
  {
    programmeId: "002",
    title: "Projet 2",
    polygoneProjet: [
      { latitude: 6.0, longitude: 7.5 },
      { latitude: 9.0, longitude: 7.5 },
      { latitude: 9.0, longitude: 12.0 },
    ],
  },
  // Ajouter d'autres projets similaires
];

// Fonction pour détecter les intersections entre les projets
function detecterIntersectionsProjets(listeProjets) {
  let projetsAvecIntersections = [];

  // Parcourir tous les projets dans la liste
  for (let i = 0; i < listeProjets.length; i++) {
    let projet1 = listeProjets[i];
    let polygone1 = projet1.polygoneProjet;

    // Vérifier si le projet a un polygone défini
    if (polygone1) {
      // Parcourir les autres projets pour trouver des intersections
      for (let j = i + 1; j < listeProjets.length; j++) {
        let projet2 = listeProjets[j];
        let polygone2 = projet2.polygoneProjet;

        // Vérifier si l'autre projet a aussi un polygone défini
        if (polygone2) {
          // Détecter l'intersection entre les polygones
          if (detecterIntersection(polygone1, polygone2)) {
            // Ajouter les projets à la liste des projets avec intersections
            projetsAvecIntersections.push(projet1, projet2);
          }
        }
      }
    }
  }

  return projetsAvecIntersections;
}

// Appel de la fonction pour détecter les intersections entre les projets
let projetsAvecIntersections = detecterIntersectionsProjets(listeProjets);

// Affichage des projets avec intersections
console.log("Projets avec intersections :", projetsAvecIntersections);

var getprojetIntersection = async (req, res) => {
  const auth = await axios.post(
    "https://api.national.skyvisionafrica.com/national/auth/login",
    {
      username: "roger.doffou@skyvisionafrica.com",
      password: "JRy4U39",
    }
  );

  var token = auth.data.access_token;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const list_projet = await axios.post(
    "https://api.national.skyvisionafrica.com/national/programme/query",
    {
      page: 1,
      size: 108,
    },
    config
  );

  let intersection = detectintersection(list_projet.data.data);
  console.table(intersection);

  res.json(intersection);

  //Faire passer les projets dans le systeme de gestion des intersections
};

module.exports = {
  maps_projet: maps_projet,
  list_projets: list_projets,
  search_projets: search_projets,
  getprojetIntersection: getprojetIntersection,
};
