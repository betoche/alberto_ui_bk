import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mongoid' })
export class MongoIdPipe implements PipeTransform {
  transform(text: string, limit: number = 4) {
    return text.slice(-limit);
  }
}
