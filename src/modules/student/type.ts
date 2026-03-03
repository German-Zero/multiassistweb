export interface Student {
  id: number;
  user: {
    id: number;
    name: string;
    lastname: string;
    displayName: string;
    email: string;
  };
  division: {
    id: number;
    letter: string;
    shift: string;
  };
}