import { TestBed } from '@angular/core/testing';
import { BaseModel } from 'app/shared/models/base.model';

class DummyClass extends BaseModel {
  public id; name; age;
}

describe('BaseModel', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('#assignAttributesFromParams', () => {
    let model = new DummyClass();
    model.assignAttributesFromParams(
      { id: 1, name: 'Brian', age: 40 }, ['id', 'name']
    );

    expect(model.id).toEqual(1);
    expect(model.name).toEqual('Brian');
    expect(model.age).not.toEqual(40);
  })

  it('#buildFrom', () => {
    let data = DummyClass.buildFrom([
      { id: 1, name: 'Brian', age: 40 },
      { id: 2, name: 'Thomas', age: 50 }
    ]);

    expect(data.length).toEqual(2);
    expect(data[0].constructor.name).toEqual('DummyClass');
    expect(data[1].constructor.name).toEqual('DummyClass');
  })
});
