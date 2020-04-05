import { AppPage } from './app.po';
import { browser, logging, $$ } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should drag and drop', () => {
    page.navigateTo();

    let listBeforeDrag = $$('.cdk-drop-list > .item').getId();

    // Drag and drop: switch first and last element
    page.dragAndDropTest();
    // TODO: Should empty list throw an error? Also, a list with a single element will not test drag and drop properly, should we let it pass?

    // Optional, just to see the actual drag and drop
    browser.sleep(2000);

    let listAfterDrag = $$('.cdk-drop-list > .item').getId();

    expect(listBeforeDrag).not.toEqual(listAfterDrag);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
