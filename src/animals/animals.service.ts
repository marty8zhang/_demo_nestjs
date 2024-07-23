import { Injectable } from '@nestjs/common';

@Injectable()
export class AnimalsService {
  generateName(): string {
    const names = ['Tom', 'Jerry', 'Donald'];

    return names[Math.floor(Math.random() * names.length)];
  }
}
