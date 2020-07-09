import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({ name: 'filerConditions' })
export class FilterConditionsPipe implements PipeTransform {
  transform(rows: any = [], value: string = '', columns: any = [], options: any = {}) {
    if(!value || value == '-' || !columns){
      return rows;
    }

    let filteredRows = [];
    value = (value || '').toLowerCase();
    if(!Array.isArray(columns)){
      columns = [columns];
    }

    rows = _.filter(rows, row => {
      let flag = false;
      _.each(columns || [], column => {
        if(options['isContain']){
          if( (row[column] || '').toLowerCase().indexOf(value) != -1){ flag = true }
        }else{
          if( (row[column] || '').toLowerCase() == value){ flag = true }
        }
      });
      return flag;
    });

    return rows;
  }
}
