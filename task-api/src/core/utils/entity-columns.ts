import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';

/**
 * Lista de colunas para SELECT com alias no nome da propriedade da entidade,
 * para que uma query crua devolva o mesmo formato que o repositório
 * (`created_at` vira `createdAt`).
 */
export function buildSelectClause<T extends ObjectLiteral>(
  dataSource: DataSource,
  entity: EntityTarget<T>,
) {
  return dataSource
    .getMetadata(entity)
    .columns.map(
      (column) => `${column.databaseName} AS "${column.propertyName}"`,
    )
    .join(', ');
}

/**
 * Nome da coluna no banco a partir do nome da propriedade da entidade.
 * Devolve `null` quando a propriedade não existe, o que impede que um nome
 * arbitrário vindo da query string acabe interpolado no SQL.
 */
export function toColumnName<T extends ObjectLiteral>(
  dataSource: DataSource,
  entity: EntityTarget<T>,
  propertyName: string,
) {
  const column = dataSource
    .getMetadata(entity)
    .columns.find((column) => column.propertyName === propertyName);

  return column?.databaseName ?? null;
}
