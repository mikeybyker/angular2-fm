import { Webpack9Page } from './app.po';

describe('webpack9 App', function() {
  let page: Webpack9Page;

  beforeEach(() => {
    page = new Webpack9Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
