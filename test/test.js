/* eslint no-undef: 0 */

describe('script', function () {
  var expect = chai.expect;
  var testFunctions = trapprKeeprTestExport;
  var imageThumbnailTemplate = testFunctions.imageThumbnailTemplate;

  describe('imageThumbnailTemplate', function () {
    before(function () {
      this.alt = 'Fancy Image';
      this.url = 'http://www.hooray.com';
      this.color = '5';
      var result = imageThumbnailTemplate(this.alt, this.url, this.color);
      var div = document.createElement('div');
      div.innerHTML = result;
      this.resultEl = div.firstChild;
    });

    it('creates a template for an image thumbnail', function () {
      expect(this.resultEl.tagName).to.eq('DIV');
      expect(this.resultEl.getElementsByTagName('img').length).to.eq(1);
    });

    it('sets the color data attribute', function () {
      expect(this.resultEl.dataset.color).to.eq(this.color);
    });

    it('formats the image data', function () {
      var image = this.resultEl.getElementsByTagName('img')[0];
      expect(image.alt).to.eq(this.alt);
      expect(image.src.includes(this.url)).to.eq(true);
    });
  });
});
