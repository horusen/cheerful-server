import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function SameValue(property: string, validation?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'confirmed',
      propertyName,
      target: object.constructor,
      constraints: [property],
      options: {
        ...validation,
        message: `${property} should have the same value as ${propertyName}`,
      },
      validator: {
        validate(value: any, arg: ValidationArguments) {
          return arg.object[arg.constraints[0]] === value;
        },
      },
    });
  };
}
