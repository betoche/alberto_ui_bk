import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelativeTimePipe } from './relative-time.pipe';
import { ExcerptPipe } from "./excerpt.pipe";
import { GetValueByKeyPipe } from './get-value-by-key.pipe';
import { MongoIdPipe } from './mongo-id.pipe';
import { FilterConditionsPipe } from './filter-conditions.pipe';

const pipes = [
  RelativeTimePipe,
  ExcerptPipe,
  GetValueByKeyPipe,
  MongoIdPipe,
  FilterConditionsPipe
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: pipes,
  exports: pipes
})
export class SharedPipesModule {}