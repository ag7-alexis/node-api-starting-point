// src/db/schemas/index.ts

// ce fichier sert simplement à regrouper l'ensemble
// des schémas définis dans src/db/schemas
// et les exporter dans un seul et même object

import pub from './pub';
import barathon from './barathon';

export default { pub, barathon };