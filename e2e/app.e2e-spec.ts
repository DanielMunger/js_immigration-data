import { ImmigrationDataPage } from './app.po';

describe('immigration-data App', function() {
  let page: ImmigrationDataPage;

  beforeEach(() => {
    page = new ImmigrationDataPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
