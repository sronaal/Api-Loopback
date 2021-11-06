import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Paciente, PacienteRelations, Medico, Cita} from '../models';
import {MedicoRepository} from './medico.repository';
import {CitaRepository} from './cita.repository';

export class PacienteRepository extends DefaultCrudRepository<
  Paciente,
  typeof Paciente.prototype.id,
  PacienteRelations
> {

  public readonly medico: BelongsToAccessor<Medico, typeof Paciente.prototype.id>;

  public readonly citas: HasManyRepositoryFactory<Cita, typeof Paciente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MedicoRepository') protected medicoRepositoryGetter: Getter<MedicoRepository>, @repository.getter('CitaRepository') protected citaRepositoryGetter: Getter<CitaRepository>,
  ) {
    super(Paciente, dataSource);
    this.citas = this.createHasManyRepositoryFactoryFor('citas', citaRepositoryGetter,);
    this.registerInclusionResolver('citas', this.citas.inclusionResolver);
    this.medico = this.createBelongsToAccessorFor('medico', medicoRepositoryGetter,);
    this.registerInclusionResolver('medico', this.medico.inclusionResolver);
  }
}
