(function () {
  if (window.trapprKeeprTestExport) { return exportTestedFunction(); }

  pullData();

  function pullData() {
    var endpoint = 'https://api.giphy.com/v1/gifs/trending?api_key=b2022454c8fb4b95affb8f7d8513156e&limit=52&rating=PG';
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var responseBody = JSON.parse(xhr.response);
        populateThumbnails(responseBody);
      }
    };

    xhr.ontimeout = function (e) {
      fallbackToSampleData(e);
    };

    xhr.onerror = function (e) {
      fallbackToSampleData(e);
    };

    xhr.open('GET', endpoint, true);
    xhr.send();
  }

  function fallbackToSampleData(e) {
    console.error(e); // eslint-disable-line no-console
    populateThumbnails(window.sampleData);
  }

  function populateThumbnails(responseBody) {
    var data = responseBody.data;
    for (var i = 0; i < data.length; ++i) {
      var thumbnailEl = prepareThumbnailData(data[i]);
      prependThumbnailContainer(thumbnailEl);
    }
  }

  function prepareThumbnailData(imgData) {
    var colorCode = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    var stillUrl = imgData.images.fixed_height_still.url;
    var caption = formatAlt(imgData.slug);
    var lightboxUrl = imgData.images.original.url;

    return imageThumbnailTemplate(caption, stillUrl, lightboxUrl, colorCode);
  }

  function imageThumbnailTemplate(alt, url, lightboxUrl, color) {
    var classList = 'class=\"image-thumbnail-container\"';
    var dataAttributes = 'data-color=\n"' + color + '\"' + 'data-original=\n"' + lightboxUrl + '\"';
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
    var formattedAltText = 'Thumbnail: ' + splitSlug[0];
    return formattedAltText;
  }

  function exportTestedFunction() {
    window.trapprKeeprTestExport = {
      prepareThumbnailData: prepareThumbnailData
    };
  }
})();
