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
  Paciente,
  Cita,
} from '../models';
import {PacienteRepository} from '../repositories';

export class PacienteCitaController {
  constructor(
    @repository(PacienteRepository) protected pacienteRepository: PacienteRepository,
  ) { }

  @get('/pacientes/{id}/citas', {
    responses: {
      '200': {
        description: 'Array of Paciente has many Cita',
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
    return this.pacienteRepository.citas(id).find(filter);
  }

  @post('/pacientes/{id}/citas', {
    responses: {
      '200': {
        description: 'Paciente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cita)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Paciente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cita, {
            title: 'NewCitaInPaciente',
            exclude: ['id'],
            optional: ['pacienteId']
          }),
        },
      },
    }) cita: Omit<Cita, 'id'>,
  ): Promise<Cita> {
    return this.pacienteRepository.citas(id).create(cita);
  }

  @patch('/pacientes/{id}/citas', {
    responses: {
      '200': {
        description: 'Paciente.Cita PATCH success count',
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
    return this.pacienteRepository.citas(id).patch(cita, where);
  }

  @del('/pacientes/{id}/citas', {
    responses: {
      '200': {
        description: 'Paciente.Cita DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cita)) where?: Where<Cita>,
  ): Promise<Count> {
    return this.pacienteRepository.citas(id).delete(where);
  }
}
