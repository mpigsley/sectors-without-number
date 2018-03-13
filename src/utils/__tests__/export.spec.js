import { generateCSV } from '../export';

describe('Export Util', () => {
  describe('generateCSV', () => {
    it('should return a string given an array', () => {
      const csv = generateCSV([[]]);
      expect(typeof csv).toEqual('string');
    });

    it('should return a string that starts with CSV front-matter', () => {
      const csv = generateCSV([[]]);
      expect(csv.indexOf('data:text/csv;charset=utf-8,')).toEqual(0);
    });

    it("shouldn't error if the table is an empty array", () => {
      const csv = generateCSV([]);
      expect(csv).toEqual('data:text/csv;charset=utf-8,');
    });

    it("shouldn't error if the table is undefined", () => {
      const csv = generateCSV();
      expect(csv).toEqual('data:text/csv;charset=utf-8,');
    });

    it('should surround data in double quotes to escape commas in content', () => {
      const test1 = 'test';
      const test2 = 'test,test';
      const test3 = 'test,test,test';
      const csv = generateCSV([[test1, test2, test3]]);
      const contentArray = csv.split('"');
      expect(contentArray[1]).toEqual(test1);
      expect(contentArray[3]).toEqual(test2);
      expect(contentArray[5]).toEqual(test3);
    });

    it('should break table onto multiple lines', () => {
      const csv = generateCSV([['test'], ['test'], ['test']]);
      const splitString = csv.split(/\r?\n/);
      expect(splitString.length).toEqual(4);
    });
  });
});
