(function () {
  if (window.trapprKeeprTestExport) { return exportTestedFunction(); }

  populateThumbnails(sampleData)

  function populateThumbnails(responseBody) {
     responseBody.data.forEach(function(imgData){
        var thumbnailEl = prepareThumbnailData(imgData);
        prependThumbnailContainer(thumbnailEl)
     })
  }

  function prepareThumbnailData(imgData) {
    var colorCode = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    var stillUrl = imgData.images.fixed_height_still.url;
    var caption = formatAlt(imgData.slug);
    return imageThumbnailTemplate(caption, stillUrl, colorCode);
  }

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

  function formatAlt(slug) {
    var splitSlug = slug.split(/-[^-]*$/);
    var slugText = splitSlug[0]
    var formattedAltText = 'Thumbnail: ' + splitSlug[0];
    return formattedAltText;
  }

  function exportTestedFunction() {
    window.trapprKeeprTestExport = {
      prepareThumbnailData: prepareThumbnailData
    };
  }
})();
