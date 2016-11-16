import { Angular2FmPage } from './app.po';

describe('angular2-fm App', function() {
  let page: Angular2FmPage;

  beforeEach(() => {
    page = new Angular2FmPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
