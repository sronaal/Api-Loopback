import {Entity, model, property} from '@loopback/repository';

@model()
export class Cita extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  medicoId?: string;

  @property({
    type: 'string',
  })
  pacienteId?: string;

  constructor(data?: Partial<Cita>) {
    super(data);
  }
}

export interface CitaRelations {
  // describe navigational properties here
}

export type CitaWithRelations = Cita & CitaRelations;
