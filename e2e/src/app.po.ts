import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }

  dragAndDropTest(): Promise<unknown> {
    //fill the list if it has less than 2 elements, so we can properly test drag and drop
    element.all(by.css('.item')).count().then(function(size){
      while (size < 2) {
        element(by.id('add')).click();
        size++;
      }
    });

    // Note: Mouse actions do not work on Chrome with the HTML5 Drag and Drop API due to a known Chromedriver issue
    // source: https://www.protractortest.org/#/api?view=webdriver.WebDriver.prototype.actions
    // source: https://bugs.chromium.org/p/chromedriver/issues/detail?id=841

    // this is the main workaround for Angular Material drag and drop

    let dragElement = element.all(by.css('.cdk-drop-list > .cdk-drag')).first();
    let destination = element.all(by.css('.cdk-drop-list > .cdk-drag')).last();

    return browser.actions().mouseDown(dragElement).perform()
      .then(() => browser.actions().mouseMove(destination).perform())
      .then(() => browser.actions().mouseUp(destination).perform()) as Promise<unknown>;
  }
}
