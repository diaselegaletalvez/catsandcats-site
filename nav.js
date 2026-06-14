/* Cats & Cats - menu padrão reutilizável.
   Como usar: suba este arquivo na raiz do site e adicione, em cada página,
   antes de </body>:  <script src="/nav.js"></script>  */
(function () {
  var css = ''
    + '#cc-nav{position:sticky;top:0;z-index:1000;display:flex;align-items:center;gap:16px;'
    + 'padding:10px 5vw;background:rgba(255,244,224,.96);backdrop-filter:blur(6px);'
    + 'border-bottom:2px solid #e8ddc8;font-family:"Albert Sans",system-ui,sans-serif}'
    + '#cc-nav .cc-logo{font-family:"Fraunces",Georgia,serif;font-weight:700;font-size:20px;'
    + 'color:#FF6B5B;text-decoration:none;white-space:nowrap;display:flex;align-items:center;gap:5px}'
    + '#cc-nav .cc-search{flex:1;max-width:360px;display:flex;align-items:center;gap:8px;'
    + 'background:#fff;border:2px solid #e8ddc8;border-radius:999px;padding:6px 14px}'
    + '#cc-nav .cc-search input{border:none;outline:none;background:transparent;width:100%;'
    + 'font-family:inherit;font-size:14px;color:#1a1a1a}'
    + '#cc-nav .cc-links{display:flex;align-items:center;gap:14px;margin-left:auto}'
    + '#cc-nav .cc-links a{color:#1a1a1a;text-decoration:none;font-weight:600;font-size:14px;white-space:nowrap}'
    + '#cc-nav .cc-links a:hover{color:#FF6B5B}'
    + '#cc-nav .cc-acc{width:38px;height:38px;border-radius:50%;border:2px solid #1a1a1a;'
    + 'display:grid;place-items:center;text-decoration:none;font-size:17px}'
    + '@media(max-width:760px){#cc-nav .cc-search{display:none}#cc-nav .cc-links{gap:10px}'
    + '#cc-nav .cc-links a.cc-hideMob{display:none}}';

  var html = ''
    + '<div id="cc-nav">'
    + '  <a class="cc-logo" href="/">🐾 Cats &amp; Cats</a>'
    + '  <form class="cc-search" onsubmit="location.href=\'/kids/?q=\'+encodeURIComponent(this.q.value);return false;">'
    + '    <span>🔍</span><input name="q" placeholder="Buscar..." />'
    + '  </form>'
    + '  <nav class="cc-links">'
    + '    <a href="/kids/">Kids</a>'
    + '    <a href="/adulto/">Adulto</a>'
    + '    <a class="cc-hideMob" href="/intro">História</a>'
    + '    <a class="cc-hideMob" href="/suporte.html">Suporte</a>'
    + '    <a class="cc-acc" href="/painel" title="Minha conta">👤</a>'
    + '  </nav>'
    + '</div>';

  // garante as fontes
  if (!document.getElementById('cc-fonts')) {
    var l = document.createElement('link');
    l.id = 'cc-fonts'; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Albert+Sans:wght@400;600;700&display=swap';
    document.head.appendChild(l);
  }
  var s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
  document.body.insertAdjacentHTML('afterbegin', html);
})();
