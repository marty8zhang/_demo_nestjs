import { Injectable } from '@nestjs/common';

@Injectable()
export class AnimalsService {
  generateName(options: {
    genderNeutral: boolean;
    numberOfNames: number;
  }): string {
    const names = ['Tom', 'Jerry', 'Donald'];

    return `You want ${options.numberOfNames} ${options.genderNeutral ? '' : 'non-'}gender neutral name(s) to choose from. But, ${names[Math.floor(Math.random() * names.length)]} is the best!`;
  }
}
