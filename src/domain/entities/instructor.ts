import { randomUUID } from 'node:crypto';

interface InstructorProps {
  name: string;
  id?: string;
}

export class Instructor {
  public id: string;
  public name: string;

  constructor({ name, id }: InstructorProps) {
    this.name = name;
    this.id = id ?? randomUUID();
  }
}
