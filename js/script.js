(function () {
  if (window.trapprKeeprTestExport) { return exportTestedFunction(); }
  var grid = document.getElementById('image-grid-container');
  setEventListeners();
  pullData();

  function setEventListeners() {
    grid.addEventListener('click', handleGridClick, false);
  }

  function handleGridClick(event) {
    var target = event.target;
    if (target.tagName === 'IMG') { target = target.parentElement; }
    if (target.className === 'image-thumbnail-container') { addLightbox(target); }
    if (target.className === 'lightbox') { clearLightbox(); }
  }

  function pullData() {
    var endpoint = 'https://api.giphy.com/v1/gifs/trending?api_key=b2022454c8fb4b95affb8f7d8513156e&limit=52&rating=PG';
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var responseBody = JSON.parse(xhr.response);
        populateThumbnails(responseBody);
      }
    };
    xhr.ontimeout = fallbackToSampleData;
    xhr.onerror = fallbackToSampleData;
    xhr.open('GET', endpoint, true);
    xhr.send();
  }

  function fallbackToSampleData(e) {
    console.error(e); // eslint-disable-line no-console
    populateThumbnails(window.sampleData);
  }

  function addLightbox(target) {
    var lightboxString = prepareLightboxData(target);
    prependGridContainer(lightboxString);
    document.body.classList.add('lightbox-mode');
  }

  function clearLightbox() {
    document.body.classList.remove('lightbox-mode');
    document.getElementsByClassName('lightbox')[0].remove();
  }

  function populateThumbnails(responseBody) {
    var data = responseBody.data;
    for (var i = 0; i < data.length; ++i) {
      var thumbnailEl = prepareThumbnailData(data[i]);
      prependGridContainer(thumbnailEl);
    }
  }

  function prepareThumbnailData(imgData) {
    var thumbnailData = {
      colorCode: Math.floor(Math.random() * (4 - 1 + 1)) + 1,
      slug: imgData.slug,
      stillUrl: imgData.images.fixed_height_still.url,
      alt: formatAlt('Thumbnail', imgData.slug),
      lightboxUrl: imgData.images.original.url
    };
    return imageThumbnailTemplate(thumbnailData);
  }

  function imageThumbnailTemplate(d) {
    var classList = 'class=\"image-thumbnail-container\"';
    var dataAttributes = 'data-color=\n"' + d.colorCode + '\"' +
                         'data-original=\n"' + d.lightboxUrl + '\"' +
                         'data-slug=\n"' + d.slug + '\"';
    var altText =  'alt=\"' + d.alt + '\"';
    var urlText = 'src=\"' + d.stillUrl + '\"';
    return '<div ' + classList + ' ' + dataAttributes + '>' +
             '<img ' + altText + ' ' + urlText + '>' +
           '</div>';
  }

  function prepareLightboxData(target) {
    var url = target.dataset.original;
    var alt = formatAlt('Gif', target.dataset.slug);
    return lightboxTemplate(url, alt);
  }

  function lightboxTemplate(originalUrl, alt) {
    var classList = 'class=\"lightbox\"';
    var altText =  'alt=\"' + alt + '\"';
    var urlText = 'src=\"' + originalUrl + '\"';
    return '<div ' + classList + '>' + '<img ' + altText + ' ' + urlText + '></div>';
  }

  function prependGridContainer(htmlString) {
    grid.insertAdjacentHTML('afterbegin', htmlString);
  }

  function formatAlt(type, slug) {
    var splitSlug = slug.split(/-[^-]*$/);
    var formattedAltText = type + ': ' + splitSlug[0];
    return formattedAltText;
  }

  function exportTestedFunction() {
    window.trapprKeeprTestExport = {
      prepareThumbnailData: prepareThumbnailData,
      prepareLightboxData: prepareLightboxData
    };
  }
})();
