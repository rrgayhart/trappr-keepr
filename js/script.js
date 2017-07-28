(function () {
  autoGenerateTestData();

  function imageThumbnailTemplate(alt, url, color) {
    var classList = 'class=\"image-thumbnail-container\"';
    var dataAttributes = 'data-color=\n"' + color + '\"';
    var altText =  'alt=\"' + alt + '\"';
    var urlText = 'src=\"' + url + '\"';
    return '<div ' + classList + ' ' + dataAttributes + '>' +
             '<img ' + altText + ' ' + urlText + '>' +
           '</div>';
  }

  function prependThumbnailContainer(htmlString) {
    var grid = document.getElementById('image-grid-container');
    grid.insertAdjacentHTML('afterbegin', htmlString);
  }

  function autoGenerateTestData() {
    for (var i = 0; i <= 11; i++) {
      var url = 'http://placehold.it/200x200';
      // if (i === 4) { url = 'http://placehold.it/200x200'; } Use to test unusual sizes
      var color = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
      var image = imageThumbnailTemplate('placeholder image', url, color);
      prependThumbnailContainer(image);
    }
  }
})();
