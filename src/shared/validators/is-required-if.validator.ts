import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsRequiredIf(
  property: string,
  value: any,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isRequiredIf',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property, value],
      options: {
        message: `${propertyName} is required when ${property} is equal to ${value}`,
        ...validationOptions,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName, expectedValue] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return relatedValue === expectedValue ? !isEmpty(value) : true;
        },
      },
    });
  };
}

function isEmpty(value: any) {
  return value === null || value === undefined || value === '';
}
