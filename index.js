;(function(tdf) {
  'use strict';

  if(tdf === undefined) throw "tdfjs not loaded..."

  var DP = Document.prototype,
      ce = DP.createElement.bind(document),
      ct = DP.createTextNode.bind(document);

  var r = ce("div"), s = ce('style');

  s.innerHTML = '.tdf.fail{'+
      'background-color:#f66;'+
      'border-color:red'+
    '}' +
    '.tdf{'+
      'position:absolute;'+
      'bottom:0;'+
      'right:0;'+
      'padding:0.5em;'+
      'background-color:white;'+
      'border:1px solid #aaa;'+
      'border-bottom:0;'+
      'font-size:0.8rem;'+
      'font-family:monospace;'+
      'max-width: 50vw;'+
      'max-height:20vh;'+
      'overflow:auto;'+
    '}' +
    '.tdf::before{'+
      'content: attr(data-passed) ' +
        '" Passed";font-weight:bold;'+
    '}' +
    '.tdf[data-failed]::before{'+
      'content:' +
        'attr(data-failed) " Failed"' +
        '" / "' +
        'attr(data-passed) " Passed"'+
      ';'+
    '}'+
    '.tdf h4{'+
      'margin:0.5em 0;'+
      'border-bottom:1px solid #633;'+
    '}'+
    '.tdf h4::before{'+
      'content:"\\2717  ";'+
    '}'+
    '.tdf ul{'+
      'padding-left: 2em;'+
      'list-style:circle;'+
    '}';

  document.body.appendChild(r);
  document.body.appendChild(s);

  r.setAttribute('class','tdf');

  tdf.on("pass", function() {
    r.dataset.passed = parseInt(r.dataset.passed || 0, 10) + 1;
  });

  tdf.on("fail", function(name, fails) {
    r.dataset.failed = parseInt(r.dataset.failed || 0, 10) + 1;

    var list = ce('ul');
    fails.forEach(function(ex) {
      var item = ce('li');
      item.appendChild(ct(ex.toString()));
      list.appendChild(item);
    });
    var h = ce("h4");
    h.appendChild(ct(name));
    r.appendChild(h)
    r.appendChild(list);

    r.classList.add("fail");
  });

})(this.tdf);
