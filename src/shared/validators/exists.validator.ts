import { Inject } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { EntityTarget, getRepository, DataSource } from 'typeorm';
export function Exists(
  entity: EntityTarget<unknown>,
  field: string,
  validations?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    const datasource = Inject(DataSource);
    return registerDecorator({
      name: 'exists',
      propertyName,
      target: object.constructor,
      async: true,
      options: {
        ...validations,
      },
      validator: {
        async validate(value: any, args: ValidationArguments) {
          return !!(await getRepository(entity).findOne({
            [field]: value,
          }));
        },

        defaultMessage(args: ValidationArguments) {
          return `${entity.toString().split(' ')[1]} with ${field} = ${
            args.value
          } doesnt exists`;
        },
      },
    });
  };
}
