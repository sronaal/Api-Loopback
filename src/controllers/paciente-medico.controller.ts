import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Paciente,
  Medico,
} from '../models';
import {PacienteRepository} from '../repositories';

export class PacienteMedicoController {
  constructor(
    @repository(PacienteRepository)
    public pacienteRepository: PacienteRepository,
  ) { }

  @get('/pacientes/{id}/medico', {
    responses: {
      '200': {
        description: 'Medico belonging to Paciente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Medico)},
          },
        },
      },
    },
  })
  async getMedico(
    @param.path.string('id') id: typeof Paciente.prototype.id,
  ): Promise<Medico> {
    return this.pacienteRepository.medico(id);
  }
}
