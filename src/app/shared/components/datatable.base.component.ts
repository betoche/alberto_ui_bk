import * as _ from 'lodash';

export class DatatableBaseComponent{
  public datatableMessages: any;
  public rows: any = [];
  public pageLimit: number = 25;

  constructor(){
    this.loadDatatableMessages();
  }

  private loadDatatableMessages(){
    if(!this.datatableMessages){
      this.datatableMessages = require("app/shared/datatable/messages/es.json");
    }

    return this.datatableMessages;
  }

  public addRow(row){
    this.rows.unshift(row);
    this.rows = [...this.rows];
  }

  public updateRow(row){
    let index = _.findIndex(this.rows, { id: row.id });
    this.rows[index] = row;
    this.rows = [...this.rows];
  }

  public removeRow(row){
    _.remove(this.rows, { id: row.id });
    this.rows = [...this.rows];
  }

  public getRowClass(row){
    return `row-${row.id}`;
  }
}
