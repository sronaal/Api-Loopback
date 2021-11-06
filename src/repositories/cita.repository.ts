import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cita, CitaRelations} from '../models';

export class CitaRepository extends DefaultCrudRepository<
  Cita,
  typeof Cita.prototype.id,
  CitaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Cita, dataSource);
  }
}
