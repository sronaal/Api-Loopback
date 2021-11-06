import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Medico, MedicoRelations, Paciente} from '../models';
import {PacienteRepository} from './paciente.repository';

export class MedicoRepository extends DefaultCrudRepository<
  Medico,
  typeof Medico.prototype.id,
  MedicoRelations
> {

  public readonly pacientes: HasManyRepositoryFactory<Paciente, typeof Medico.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PacienteRepository') protected pacienteRepositoryGetter: Getter<PacienteRepository>,
  ) {
    super(Medico, dataSource);
    this.pacientes = this.createHasManyRepositoryFactoryFor('pacientes', pacienteRepositoryGetter,);
    this.registerInclusionResolver('pacientes', this.pacientes.inclusionResolver);
  }
}
