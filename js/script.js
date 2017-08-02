(function () {
  if (window.trapprKeeprTestExport) { return exportTestedFunction(); }
  setEventListeners();
  pullData();

  function setEventListeners() {
    document.body.addEventListener('click', handleGridClick, false);
  }

  function handleGridClick(event) {
    var target = event.target;
    if (target.tagName === 'IMG') { target = target.parentElement; }
    if (target.className === 'image-thumbnail-container') { addLightbox(target); }
    if (target.className === 'lightbox' || target.className === 'lightbox-nav-bar') { clearLightbox(); }
    if (target.tagName === 'BUTTON') { navigateImages(target); }
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

  function navigateImages(target) {
    var lightboxEl = document.getElementsByClassName('lightbox')[0];
    var currentId = lightboxEl.dataset.slug;
    var thumbnail = document.getElementById(currentId);
    var buttonClass = target.className;
    var nextThumbnail = getNextImage(buttonClass, thumbnail);
    clearLightbox();
    addLightbox(nextThumbnail);
  }

  function getNextImage(buttonClass, thumbnail) {
    var grid = document.getElementById('image-grid-container');
    if (buttonClass.includes('next')) {
      return thumbnail.nextElementSibling || grid.firstElementChild;
    }
    return thumbnail.previousElementSibling || grid.lastElementChild;
  }

  function fallbackToSampleData(e) {
    console.error(e); // eslint-disable-line no-console
    populateThumbnails(window.sampleData);
  }

  function addLightbox(target) {
    var lightboxString = prepareLightboxData(target);
    document.body.insertAdjacentHTML('afterbegin', lightboxString);
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
    var id = 'id=\"' + d.slug + '\"';
    var dataAttributes = 'data-color=\n"' + d.colorCode + '\"' +
                         'data-original=\n"' + d.lightboxUrl + '\"';
    var altText =  'alt=\"' + d.alt + '\"';
    var urlText = 'src=\"' + d.stillUrl + '\"';
    return '<div ' + id + classList + ' ' + dataAttributes + '>' +
             '<img ' + altText + ' ' + urlText + '>' +
           '</div>';
  }

  function prepareLightboxData(target) {
    var imgData = {
      url: target.dataset.original,
      alt: formatAlt('Gif', target.id),
      slug: target.id
    };
    return lightboxTemplate(imgData);
  }

  function lightboxTemplate(imgData) {
    var classList = 'class=\"lightbox\"';
    var img = lightboxImgTemplate(imgData);
    var dataAttributes = 'data-slug=\n"' + imgData.slug + '\"';
    return '<div ' + classList + dataAttributes + '>'
            + '<div class=\'lightbox-nav-bar\'><button class=\'prev nav\'> < </button>'
            + '<button class=\'next nav\'> > </button></div>'
            + '<h2>'
            + imgData.alt
            + '</h2>'
            + img
            + '</div>';
  }

  function lightboxImgTemplate(imgData) {
    var altText =  'alt=\"' + imgData.alt + '\"';
    var urlText = 'src=\"' + imgData.url + '\"';
    return '<img ' + altText + ' ' + urlText + '>';
  }

  function prependGridContainer(htmlString) {
    var grid = document.getElementById('image-grid-container');
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
