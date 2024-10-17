import { BaseEntity } from './baseEntity';

export class IdeaNote implements BaseEntity {
  logo?: string;
  denomination?: string;
  ref_note_idee?: string;
  Statut?: string;
  date_soumission?: string;
}
