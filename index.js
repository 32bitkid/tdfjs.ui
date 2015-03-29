;(function(tdf) {
  'use strict';

  if(tdf === undefined) throw "tdfjs not loaded..."

  var DP = Document.prototype,
      ce = DP.createElement.bind(document),
      ct = DP.createTextNode.bind(document);

  var r = ce("div"), s = ce('style');
  r.dataset.passed = 0;

  var id = "tdf-"+Math.random();
  var passedContent = 'attr(data-passed) " Passed"';
  var failedContent = 'attr(data-failed) " Failed"';
  var pendingContent = 'attr(data-pending) " Pending"';

  s.innerHTML =
    '#'+id+'.fail{'+
      'background-color:#f66;'+
      'border-color:red'+
    '}' +
    '#'+id+'{'+
      'position:fixed;'+
      'bottom:0;'+
      'right:0;'+
      'padding:0.5em;'+
      'background-color:white;'+
      'border:1px solid #aaa;'+
      'border-bottom:0;'+
      'font-size:0.8rem;'+
      'font-family:monospace;'+
      'max-width:50vw;'+
      'max-height:20vh;'+
      'overflow:auto;'+
    '}' +
    '#'+id+'::before{'+
      'content:' +
        passedContent +
        ';' +
        'font-weight:bold;'+
    '}' +
    '#'+id+'[data-failed]::before{'+
      'content:' +
        failedContent +
        '" / "' +
        passedContent +
      ';'+
    '}'+
    '#'+id+'[data-pending]::before{'+
      'content:' +
        pendingContent +
        '" / "' +
        passedContent +
      ';'+
    '}'+
    '#'+id+'[data-failed][data-pending]::before{'+
      'content:' +
        failedContent +
        '" / "' +
        pendingContent +
        '" / "' +
        passedContent +
      ';'+
    '}'+
    '#'+id+' h4{'+
      'margin:0.5em 0;'+
      'border-bottom:1px solid #633;'+
    '}'+
    '#'+id+' h4::before{'+
      'content:"\\2717  ";'+
    '}'+
    '#'+id+' ul{'+
      'padding-left: 2em;'+
      'list-style:circle;'+
    '}';

  document.body.appendChild(r);
  document.body.appendChild(s);

  r.setAttribute('id',id);
  r.setAttribute('class', 'tdf-results');

  tdf.on("pending", function() {
    r.dataset.pending = parseInt(r.dataset.pending || 0, 10) + 1;
  });

  tdf.on("pass", function() {
    r.dataset.passed = parseInt(r.dataset.passed || 0, 10) + 1;
    r.dataset.passed = parseInt(r.dataset.pending || 0, 10) - 1;
  });

  tdf.on("fail", function(name, fails) {
    r.dataset.failed = parseInt(r.dataset.failed || 0, 10) + 1;
    r.dataset.pending = parseInt(r.dataset.pending || 0, 10) - 1;

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
