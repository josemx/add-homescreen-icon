(() => {
  'use strict';
  var AHI = function () {
    var self = this,

      _css  = '/*gulp-replace-css*/',
      _html = '/*gulp-replace-html*/',

      _domNode, _pi, _im, _in, _cn, _ok, _bs, _ic,

      _iconListener = function () { _im.src = this.value; },
      _reloadPage  = function () { window.location.reload(true); },
      _addIconLink = function () {
        // if empty alert, else create and add <link>
        if (_in.value === '') {
          alert('Please enter URL');
          return;
        } else {
          var iLink = document.createElement('link');
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

      _prep = function () {
        // preparation to fix view
        var vp = document.querySelector('meta[name=viewport]');
        if(vp !== null) { vp.remove(); }
      },

      _cache = function () {
        _domNode = document.querySelector('.ahi-pop');
        _pi = _domNode.querySelector('p');
        _im = _domNode.querySelector('img');
        _in = _domNode.querySelector('input');
        _cn = _domNode.querySelector('.ahi-cn');
        _ok = _domNode.querySelector('.ahi-ok');
        _bs = _domNode.querySelector('.ahi-btns');
        _ic = _domNode.querySelector('.ahi-icon');
      },

      _bind = function () {
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
      var meta = document.createElement('meta');
      meta.setAttribute('name', 'viewport');
      meta.setAttribute('content', 'width=device-width, initial-scale=1.0, user-scalable=0');

      // create element to hold styles
      var css = document.createElement('style');
      css.setAttribute('class', 'ahi-css');
      css.innerHTML = _css;

      // create element to hold markup
      var div = document.createElement('div');
      div.setAttribute('class', 'ahi-shdw');
      div.innerHTML = _html;

      // append everything to the page
      document.head.appendChild(meta);
      document.head.appendChild(css);
      document.body.appendChild(div);

      // cache elements so there's only on DOM access
      _cache();

      // bind functions to elements
      _bind();
    };
  };

  new AHI().create();
})();
