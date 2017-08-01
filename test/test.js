/* eslint no-undef: 0 */

describe('script', function () {
  var expect = chai.expect;
  var testFunctions = trapprKeeprTestExport;
  var prepareThumbnailData = testFunctions.prepareThumbnailData;

  describe('prepareThumbnailData', function () {
    before(function () {
      this.testData = testTrendingImageData;
      var result = prepareThumbnailData(this.testData);
      var div = document.createElement('div');
      div.innerHTML = result;
      this.resultEl = div.firstChild;
    });

    it('generates a random color code', function () {
      var code = this.resultEl.dataset.color;
      var isValidCode = (code === '1' || code ===  '2' || code === '3' || code === '4' );
      expect(isValidCode).to.eq(true);
    });

    it('creates a template for an image thumbnail', function () {
      expect(this.resultEl.tagName).to.eq('DIV');
      expect(this.resultEl.getElementsByTagName('img').length).to.eq(1);
    });

    it('generates alt text', function () {
      var image = this.resultEl.getElementsByTagName('img')[0];
      var expectedCaption = 'Thumbnail: justin-lol-laughing-michael-jordon';
      expect(image.alt).to.eq(expectedCaption);
    });

    it('generates img src', function () {
      var image = this.resultEl.getElementsByTagName('img')[0];
      var expectedUrl = 'https://media1.giphy.com/media/26FPxFeuN8UA7nqGQ/200_s.gif';
      expect(image.src).to.eq(expectedUrl);
    });
  });
});
