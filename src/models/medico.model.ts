import {Entity, model, property, hasMany} from '@loopback/repository';
import {Paciente} from './paciente.model';
import {Cita} from './cita.model';

@model()
export class Medico extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Cedula: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  Consultorio: number;

  @hasMany(() => Paciente)
  pacientes: Paciente[];

  @hasMany(() => Cita)
  citas: Cita[];

  constructor(data?: Partial<Medico>) {
    super(data);
  }
}

export interface MedicoRelations {
  // describe navigational properties here
}

export type MedicoWithRelations = Medico & MedicoRelations;
