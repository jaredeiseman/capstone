import { Capstone2Page } from './app.po';

describe('capstone2 App', function() {
  let page: Capstone2Page;

  beforeEach(() => {
    page = new Capstone2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
