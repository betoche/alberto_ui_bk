import { MongoIdPipe } from './mongo-id.pipe';

describe('Pipe: MongoIdPipe', () => {
  let pipe: MongoIdPipe;

  beforeEach(() => {
    pipe = new MongoIdPipe();
  });

  it('providing no value returns no value', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('providing a text with default limit returns correct value', () => {
    expect(pipe.transform('5e4b6471ed4f1fc11a635f89')).toBe('5f89');
  });

  it('providing a text with limit option returns correct value', () => {
    expect(pipe.transform('5e4b6471ed4f1fc11a635f89', 5)).toBe('35f89');
  });
});
