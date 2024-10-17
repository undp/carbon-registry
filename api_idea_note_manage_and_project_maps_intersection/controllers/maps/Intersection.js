function polygonsIntersect(polygon1, polygon2) {
  function segmentsIntersect(s1, s2) {
    function orientation(p, q, r) {
      const val = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1]);
      if (val === 0) return 0; // collinear
      return val > 0 ? 1 : 2; // clockwise or counterclockwise
    }

    function onSegment(p, q, r) {
      return (
        q[0] <= Math.max(p[0], r[0]) &&
        q[0] >= Math.min(p[0], r[0]) &&
        q[1] <= Math.max(p[1], r[1]) &&
        q[1] >= Math.min(p[1], r[1])
      );
    }

    const o1 = orientation(s1[0], s1[1], s2[0]);
    const o2 = orientation(s1[0], s1[1], s2[1]);
    const o3 = orientation(s2[0], s2[1], s1[0]);
    const o4 = orientation(s2[0], s2[1], s1[1]);

    if (o1 !== o2 && o3 !== o4) return true;
    if (o1 === 0 && onSegment(s1[0], s2[0], s1[1])) return true;
    if (o2 === 0 && onSegment(s1[0], s2[1], s1[1])) return true;
    if (o3 === 0 && onSegment(s2[0], s1[0], s2[1])) return true;
    if (o4 === 0 && onSegment(s2[0], s1[1], s2[1])) return true;

    return false;
  }

  function checkIntersection(poly1, poly2) {
    for (let i = 0; i < poly1.length - 1; i++) {
      for (let j = 0; j < poly2.length - 1; j++) {
        const seg1 = [poly1[i], poly1[i + 1]];
        const seg2 = [poly2[j], poly2[j + 1]];
        if (segmentsIntersect(seg1, seg2)) {
          return true;
        }
      }
    }
    return false;
  }

  for (let i = 0; i < polygon1.length; i++) {
    for (let j = 0; j < polygon2.length; j++) {
      if (checkIntersection(polygon1[i], polygon2[j])) {
        return true;
      }
    }
  }
  return false;
}

function detectIntersections(listeProjets) {
  const intersections = [];

  for (let i = 0; i < listeProjets.length; i++) {
    for (let j = i + 1; j < listeProjets.length; j++) {
      if (
        polygonsIntersect(
          listeProjets[i].polygoneProjet[0],
          listeProjets[j].polygoneProjet[0]
        )
      ) {
        intersections.push({
          projets: [listeProjets[i], listeProjets[j]],
          intersection: true,
        });
      }
    }
  }
  return intersections;
}

let listeProjets = [
  {
    programmeId: "001",
    Intitule: "Zone 1",
    polygoneProjet: [
      [-5.268436666666665, 7.203006666666666],
      [-5.26844, 7.2030383333333345],
      [-5.268443333333333, 7.203091666666667],
      [-5.268436666666665, 7.203006666666666],
    ],
  },
  {
    programmeId: "002",
    Intitule: "Angré",
    polygoneProjet: [
      [-5.262485, 7.201613333333333],
      [-5.262453333333334, 7.201639999999999],
      [-5.262413333333334, 7.201620000000001],
      // Ajouter d'autres coordonnées...
      [-5.262485, 7.201613333333333],
    ],
  },
  // Ajouter d'autres projets avec polygoneProjet
];

const result = detectIntersections(listeProjets);
console.log(result);
