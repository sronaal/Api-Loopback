import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Medico,
  Cita,
} from '../models';
import {MedicoRepository} from '../repositories';

export class MedicoCitaController {
  constructor(
    @repository(MedicoRepository) protected medicoRepository: MedicoRepository,
  ) { }

  @get('/medicos/{id}/citas', {
    responses: {
      '200': {
        description: 'Array of Medico has many Cita',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cita)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cita>,
  ): Promise<Cita[]> {
    return this.medicoRepository.citas(id).find(filter);
  }

  @post('/medicos/{id}/citas', {
    responses: {
      '200': {
        description: 'Medico model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cita)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Medico.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cita, {
            title: 'NewCitaInMedico',
            exclude: ['id'],
            optional: ['medicoId']
          }),
        },
      },
    }) cita: Omit<Cita, 'id'>,
  ): Promise<Cita> {
    return this.medicoRepository.citas(id).create(cita);
  }

  @patch('/medicos/{id}/citas', {
    responses: {
      '200': {
        description: 'Medico.Cita PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cita, {partial: true}),
        },
      },
    })
    cita: Partial<Cita>,
    @param.query.object('where', getWhereSchemaFor(Cita)) where?: Where<Cita>,
  ): Promise<Count> {
    return this.medicoRepository.citas(id).patch(cita, where);
  }

  @del('/medicos/{id}/citas', {
    responses: {
      '200': {
        description: 'Medico.Cita DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cita)) where?: Where<Cita>,
  ): Promise<Count> {
    return this.medicoRepository.citas(id).delete(where);
  }
}
