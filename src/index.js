(() => {
  'use strict';
  const AHI = function () {
    var self = this,

      _css  = '/*gulp-replace-css*/',
      _html = '/*gulp-replace-html*/',

      _domNode, _pi, _im, _in, _cn, _ok, _bs, _ic,

      _iconListener = function () { _im.src = this.value; },
      _reloadPage  = () => window.location.reload(true),
      _addIconLink = () => {
        // if empty alert, else create and add <link>
        if (_in.value === '') {
          alert('Please enter URL');
          return;
        } else {
          const iLink = document.createElement('link');
          iLink.setAttribute('rel', 'apple-touch-icon');
          iLink.setAttribute('href', _in.value);
          document.head.appendChild(iLink);
        }

        _in.remove();
        _bs.remove();

        _pi.innerHTML = 'Now just add through the share button';

        _domNode.classList.add('ahi-t1');
        _ic.classList.add('ahi-t2');
      },

      _prep = () => {
        // preparation to fix view
        const vp = document.querySelector('meta[name=viewport]');
        if(vp !== null) vp.remove();
      },

      _cache = () => {
        _domNode = document.querySelector('.ahi-pop');
        _pi = _domNode.querySelector('p');
        _im = _domNode.querySelector('img');
        _in = _domNode.querySelector('input');
        _cn = _domNode.querySelector('.ahi-cn');
        _ok = _domNode.querySelector('.ahi-ok');
        _bs = _domNode.querySelector('.ahi-btns');
        _ic = _domNode.querySelector('.ahi-icon');
      },

      _bind = () => {
        // set onchange to update icon
        _in.onchange = _iconListener;

        // set onclick for buttons
        _cn.onclick = _reloadPage;
        _ok.onclick = _addIconLink;
      };

    self.create = function () {
      // prep the document;
      _prep();

      // replace meta to fix view for correct scaling across devices
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'viewport');
      meta.setAttribute('content', 'width=device-width, initial-scale=1.0, user-scalable=0');

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
