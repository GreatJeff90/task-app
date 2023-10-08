import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { AuctionService } from '../auction/auction.service'; // Import your auction service

@Injectable() // Make the decorator injectable to use services
export class IsUniqueConstraint {

  constructor(private readonly auctionService: AuctionService) {} // Inject your auction service

  validate(property: string, validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
      registerDecorator({
        name: 'isUnique',
        target: object.constructor,
        propertyName,
        constraints: [property],
        options: validationOptions,
        validator: {
          async validate(value: any, args: ValidationArguments) {
            const [relatedPropertyName] = args.constraints;
            const auctionService = args.object[this.auctionService]; // Access the injected auction service using `this`

            // Query your database using the service to check uniqueness
            const isUnique = await auctionService.isValueUnique(relatedPropertyName, value);

            return isUnique;
          },
        },
      });
    };
  }
}
