(() => {
  'use strict';
  const AHI = function () {
    let self = this,
      _css = '/*gulp-replace-css*/',
      _html = '/*gulp-replace-html*/',
      _domNode,
      _pi,
      _im,
      _in,
      _cn,
      _ok,
      _bs,
      _ic,
      _up,
      _fr,
      _iconListener = function () {
        _im.src = this.value;
        _im.dataset.url = this.value;
      },
      _reloadPage = () => window.location.reload(),
      _upload = () => {
        console.log('here');
        _fr.click();
      },
      _onUpload = function () {
        const [file] = this.files;
        const reader = new FileReader();

        reader.addEventListener('load', () => {
          _im.src = reader.result;
          _im.dataset.url = reader.result;
        });

        if (file) {
          reader.readAsDataURL(file);
        }
      },
      _addIconLink = () => {
        // if empty alert, else create and add <link>
        if (_im.dataset.url === '') {
          alert('Please enter URL or upload image');
          return;
        } else {
          const iLink = document.createElement('link');
          iLink.setAttribute('rel', 'apple-touch-icon');
          iLink.setAttribute('href', _im.dataset.url);
          document.head.appendChild(iLink);
        }

        _in.remove();
        _bs.remove();
        _up.remove();

        _pi.innerHTML = 'Use Share button to Add to Home Screen';

        _domNode.classList.add('ahi-t1');
        _ic.classList.add('ahi-t2');
      },
      _prep = () => {
        // preparation to fix view
        const vp = document.querySelector('meta[name=viewport]');
        if (vp !== null) vp.remove();

        // remove any current touch icons
        const icons = document.querySelectorAll('link[rel*=apple-touch-icon]');
        icons.forEach((icon) => icon.remove());
      },
      _cache = () => {
        _domNode = document.querySelector('.ahi-pop');
        _pi = _domNode && _domNode.querySelector('p');
        _im = _domNode && _domNode.querySelector('img');
        _in = _domNode && _domNode.querySelector('input');
        _cn = _domNode && _domNode.querySelector('.ahi-cn');
        _ok = _domNode && _domNode.querySelector('.ahi-ok');
        _bs = _domNode && _domNode.querySelector('.ahi-btns');
        _ic = _domNode && _domNode.querySelector('.ahi-icon');
        _up = _domNode && _domNode.querySelector('.ahi-up');
        _fr = _domNode && _domNode.querySelector('.ahi-fr');
      },
      _bind = () => {
        // set onchange to update icon
        _in.onchange = _iconListener;

        _fr.onchange = _onUpload;

        // set onclick for buttons
        _cn.onclick = _reloadPage;
        _ok.onclick = _addIconLink;
        _up.onclick = _upload;
      };

    self.create = () => {
      // prep the document;
      _prep();

      // replace meta to fix view for correct scaling across devices
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'viewport');
      meta.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0, user-scalable=0'
      );

      // create element to hold styles
      const css = document.createElement('style');
      css.setAttribute('id', 'ahi-css');
      css.innerHTML = _css;

      // create element to hold markup
      const div = document.createElement('div');
      div.setAttribute('class', 'ahi-shdw');
      div.innerHTML = _html;

      // append everything to the page
      document.head.appendChild(meta);
      document.head.appendChild(css);
      document.body.appendChild(div);

      // cache elements so there's only one DOM access
      _cache();

      // bind functions to elements
      _bind();
    };
  };

  new AHI().create();
})();
