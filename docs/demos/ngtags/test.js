describe('ngtags', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  it('should show form by `edit` button click and close by `cancel`', function() {
    var s = '[ng-controller="NgTagsCtrl"] ';

    //edit button initially shown, form initially hidden
    expect(element(s+'form > div[editable-tags-input]:visible').count()).toBe(1);
    expect(element(s+'.buttons > button:visible').count()).toBe(1);
    expect(element(s+'.buttons > span:visible').count()).toBe(0);

    //show form
    element(s+'form > div > button').click();
    //second click to test that controls not duplicated!
    element(s+'form > div > button').click();
    //also click outside to check blur = ignore
    element('body').click();

    //form shown in disabled state (loading)
    expect(element(s+'form > div[editable-tags-input]:visible').count()).toBe(0);
    expect(element(s+'.buttons > button:visible').count()).toBe(0);

    sleep(delay);

    //also click outside to check blur = ignore
    element('body').click();

    //form enabled when data loaded
    expect(element(s+'form > div[editable-ui-select]:visible').count()).toBe(0);
    expect(element(s+'.buttons > button:visible').count()).toBe(0);
    expect(element(s+'.buttons > span button:enabled').count()).toBe(2);

    //click cancel
    element(s+'form > div > span button[type="button"]').click();

    //form closed
    expect(element(s+'form > div[editable-tags-input]:visible').count()).toBe(1);
    expect(element(s+'form > div[editable-tags-input]:visible').text()).toMatch('[{"text":"Tag1"},{"text":"Tag2"},{"text":"Tag3"}]');
    expect(element(s+'.buttons > button:visible').count()).toBe(1);
    expect(element(s+'.buttons > span:visible').count()).toBe(0);
  });

  it('should show form and save new values', function() {
    var s = '[ng-controller="NgTagsCtrl"] ';

    //show form
    element(s+'form > div > button').click();

    sleep(delay);

    //select a value
    element(s+' input[type="text"]').click();
    input('newTag.text').enter('Tag');
    sleep(delay);
    sleep(delay);
    element(s+'.suggestion-item').click();

    //click submit
    element(s+'span button[type="submit"]').click();
    //second click to check that it works correctly
    element(s+'span button[type="submit"]').click();

    //saving
    expect(element(s+'form > div:eq(0) .editable-error:visible').count()).toBe(0);

    sleep(delay);

    //form closed, new values shown
    expect(element(s+'form > div[editable-tags-input]:visible').count()).toBe(1);
    expect(element(s+'form > div[editable-tags-input]:visible').text()).toMatch('[{"text":"Tag1"},{"text":"Tag2"},{"text":"Tag3"},{"text":"Tag4"}]');
    expect(element(s+'.buttons > button:visible').count()).toBe(1);
    expect(element(s+'.buttons > span:visible').count()).toBe(0);
  });

  it('should show form and cancel new values', function() {
      var s = '[ng-controller="NgTagsCtrl"] ';

      //show form
      element(s+'form > div > button').click();

      sleep(delay);

      //select a value
      element(s+' input[type="text"]').click();
      input('newTag.text').enter('Tag');
      sleep(delay);
      sleep(delay);
      element(s+'.suggestion-item').click();

      //click cancel
      element(s+'button[ng-click="ngTagsForm.$cancel()"]').click();

      //form closed, new values shown
      expect(element(s+' form > div[editable-tags-input]:visible').count()).toBe(1);
      //expect(element(s+' form > div[editable-tags-input]:visible').text()).toMatch('[{"text":"Tag1"},{"text":"Tag2"},{"text":"Tag3"}]');
      element(s+' form > div[editable-tags-input]:visible').query(function(elements, done) {
          expect(element(s+' form > div[editable-tags-input]:visible').text()).toMatch('[{"text":"Tag1"},{"text":"Tag2"},{"text":"Tag3"}]');
          done();
      });
      
      expect(element(s+'.buttons > button:visible').count()).toBe(1);
      expect(element(s+'.buttons > span:visible').count()).toBe(0);
  });
});