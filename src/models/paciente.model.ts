import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Medico} from './medico.model';
import {Cita} from './cita.model';

@model()
export class Paciente extends Entity {
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
    type: 'string',
    required: true,
  })
  Telefono: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaCita: string;

  @belongsTo(() => Medico)
  medicoId: string;

  @hasMany(() => Cita)
  citas: Cita[];

  constructor(data?: Partial<Paciente>) {
    super(data);
  }
}

export interface PacienteRelations {
  // describe navigational properties here
}

export type PacienteWithRelations = Paciente & PacienteRelations;
