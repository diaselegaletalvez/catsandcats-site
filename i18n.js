/* Cats & Cats — motor de tradução da interface do site (i18n)
   - Suporta data-i18n="chave" (mapa T) E tradução automática pelo texto em
     português (mapa P), inclusive conteúdo gerado dinamicamente (via observer).
   - Para uma página nova: basta incluir <script src="/i18n.js"></script> e
     garantir que as frases dela existam em P. Adicionar idioma = novo bloco. */
(function () {
  var LANGS = [
    { code: 'pt', label: 'Português' }, { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' }, { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' }, { code: 'it', label: 'Italiano' },
    { code: 'ja', label: '日本語' }, { code: 'ko', label: '한국어' },
    { code: 'hi', label: 'हिन्दी' }, { code: 'ru', label: 'Русский' },
    { code: 'tr', label: 'Türkçe' }, { code: 'id', label: 'Bahasa Indonesia' }
  ];

  // ---- Mapa T: para elementos com data-i18n="chave" (usado na landing) ----
  var T = {
    pt:{escolha_mundo:'Escolha seu mundo',mundo_kids:'Mundo Kids',kids_desc:'Quadrinhos coloridos e divertidos pra criançada se aventurar!',entrar:'Entrar',mundo_adulto:'Mundo Adulto',adulto_desc:'Histórias e quadrinhos para leitores adultos.',criar_conta:'Criar conta',ja_tenho_conta:'Já tenho conta',nossa_historia:'Nossa história',suporte:'Suporte',privacidade:'Privacidade',termos:'Termos'},
    en:{escolha_mundo:'Choose your world',mundo_kids:'Kids World',kids_desc:'Colorful, fun comics for kids to adventure with!',entrar:'Enter',mundo_adulto:'Adult World',adulto_desc:'Stories and comics for adult readers.',criar_conta:'Create account',ja_tenho_conta:'I already have an account',nossa_historia:'Our story',suporte:'Support',privacidade:'Privacy',termos:'Terms'},
    es:{escolha_mundo:'Elige tu mundo',mundo_kids:'Mundo Infantil',kids_desc:'¡Cómics coloridos y divertidos para que los niños se aventuren!',entrar:'Entrar',mundo_adulto:'Mundo Adulto',adulto_desc:'Historias y cómics para lectores adultos.',criar_conta:'Crear cuenta',ja_tenho_conta:'Ya tengo cuenta',nossa_historia:'Nuestra historia',suporte:'Soporte',privacidade:'Privacidad',termos:'Términos'},
    fr:{escolha_mundo:'Choisissez votre monde',mundo_kids:'Monde Enfants',kids_desc:'Des BD colorées et amusantes pour l\u2019aventure des enfants !',entrar:'Entrer',mundo_adulto:'Monde Adulte',adulto_desc:'Des histoires et BD pour lecteurs adultes.',criar_conta:'Créer un compte',ja_tenho_conta:'J\u2019ai déjà un compte',nossa_historia:'Notre histoire',suporte:'Assistance',privacidade:'Confidentialité',termos:'Conditions'},
    de:{escolha_mundo:'Wähle deine Welt',mundo_kids:'Kinderwelt',kids_desc:'Bunte, lustige Comics für Kinderabenteuer!',entrar:'Eintreten',mundo_adulto:'Erwachsenenwelt',adulto_desc:'Geschichten und Comics für erwachsene Leser.',criar_conta:'Konto erstellen',ja_tenho_conta:'Ich habe schon ein Konto',nossa_historia:'Unsere Geschichte',suporte:'Support',privacidade:'Datenschutz',termos:'Bedingungen'},
    it:{escolha_mundo:'Scegli il tuo mondo',mundo_kids:'Mondo Bambini',kids_desc:'Fumetti colorati e divertenti per le avventure dei bambini!',entrar:'Entra',mundo_adulto:'Mondo Adulti',adulto_desc:'Storie e fumetti per lettori adulti.',criar_conta:'Crea account',ja_tenho_conta:'Ho già un account',nossa_historia:'La nostra storia',suporte:'Supporto',privacidade:'Privacy',termos:'Termini'},
    ja:{escolha_mundo:'世界を選んでください',mundo_kids:'キッズワールド',kids_desc:'子供が冒険できる、カラフルで楽しいマンガ！',entrar:'入る',mundo_adulto:'大人の世界',adulto_desc:'大人の読者向けの物語とマンガ。',criar_conta:'アカウント作成',ja_tenho_conta:'すでにアカウントを持っています',nossa_historia:'私たちの物語',suporte:'サポート',privacidade:'プライバシー',termos:'利用規約'},
    ko:{escolha_mundo:'당신의 세계를 선택하세요',mundo_kids:'키즈 월드',kids_desc:'아이들이 모험할 수 있는 다채롭고 재미있는 만화!',entrar:'들어가기',mundo_adulto:'성인 월드',adulto_desc:'성인 독자를 위한 이야기와 만화.',criar_conta:'계정 만들기',ja_tenho_conta:'이미 계정이 있어요',nossa_historia:'우리 이야기',suporte:'지원',privacidade:'개인정보',termos:'약관'},
    hi:{escolha_mundo:'अपनी दुनिया चुनें',mundo_kids:'किड्स वर्ल्ड',kids_desc:'बच्चों के रोमांच के लिए रंगीन, मज़ेदार कॉमिक्स!',entrar:'प्रवेश करें',mundo_adulto:'वयस्क दुनिया',adulto_desc:'वयस्क पाठकों के लिए कहानियाँ और कॉमिक्स।',criar_conta:'खाता बनाएँ',ja_tenho_conta:'मेरा पहले से खाता है',nossa_historia:'हमारी कहानी',suporte:'सहायता',privacidade:'गोपनीयता',termos:'शर्तें'},
    ru:{escolha_mundo:'Выберите свой мир',mundo_kids:'Детский мир',kids_desc:'Яркие весёлые комиксы для детских приключений!',entrar:'Войти',mundo_adulto:'Взрослый мир',adulto_desc:'Истории и комиксы для взрослых читателей.',criar_conta:'Создать аккаунт',ja_tenho_conta:'У меня уже есть аккаунт',nossa_historia:'Наша история',suporte:'Поддержка',privacidade:'Конфиденциальность',termos:'Условия'},
    tr:{escolha_mundo:'Dünyanı seç',mundo_kids:'Çocuk Dünyası',kids_desc:'Çocukların maceraları için renkli, eğlenceli çizgi romanlar!',entrar:'Gir',mundo_adulto:'Yetişkin Dünyası',adulto_desc:'Yetişkin okuyucular için hikâyeler ve çizgi romanlar.',criar_conta:'Hesap oluştur',ja_tenho_conta:'Zaten hesabım var',nossa_historia:'Hikâyemiz',suporte:'Destek',privacidade:'Gizlilik',termos:'Şartlar'},
    id:{escolha_mundo:'Pilih duniamu',mundo_kids:'Dunia Anak',kids_desc:'Komik berwarna dan seru untuk petualangan anak-anak!',entrar:'Masuk',mundo_adulto:'Dunia Dewasa',adulto_desc:'Cerita dan komik untuk pembaca dewasa.',criar_conta:'Buat akun',ja_tenho_conta:'Saya sudah punya akun',nossa_historia:'Kisah kami',suporte:'Dukungan',privacidade:'Privasi',termos:'Ketentuan'}
  };

  // ---- Mapa P: tradução automática pelo texto em português ----
  var P = {
    en:{'Início':'Home','Quadrinhos':'Comics','Personagens':'Characters','Promoções':'Deals','Curiosidades':'Fun facts','Contato':'Contact','Veja todos':'See all','Conheça a turma':'Meet the gang','Produtos':'Products','Camisas e mais':'Shirts and more','Ofertas do dia':'Deals of the day','Lançamentos':'New releases','Receba as promoções!':'Get the deals!','Comprar':'Buy','Carregando…':'Loading…','Em breve! Novos quadrinhos kids estão chegando.':'Coming soon! New kids comics are on the way.','Nenhum quadrinho encontrado.':'No comics found.','Não foi possível carregar agora. Tente recarregar a página.':'Couldn\u2019t load right now. Try reloading the page.','Mundo Adulto':'Adult World','Mundo Adulto ›':'Adult World ›','Suporte':'Support','Privacidade':'Privacy','Termos':'Terms','Buscar quadrinhos, personagens, produtos...':'Search comics, characters, products...'},
    es:{'Início':'Inicio','Quadrinhos':'Cómics','Personagens':'Personajes','Promoções':'Ofertas','Curiosidades':'Curiosidades','Contato':'Contacto','Veja todos':'Ver todos','Conheça a turma':'Conoce al grupo','Produtos':'Productos','Camisas e mais':'Camisetas y más','Ofertas do dia':'Ofertas del día','Lançamentos':'Novedades','Receba as promoções!':'¡Recibe las ofertas!','Comprar':'Comprar','Carregando…':'Cargando…','Em breve! Novos quadrinhos kids estão chegando.':'¡Muy pronto! Nuevos cómics infantiles están por llegar.','Nenhum quadrinho encontrado.':'No se encontraron cómics.','Não foi possível carregar agora. Tente recarregar a página.':'No se pudo cargar ahora. Intenta recargar la página.','Mundo Adulto':'Mundo Adulto','Mundo Adulto ›':'Mundo Adulto ›','Suporte':'Soporte','Privacidade':'Privacidad','Termos':'Términos','Buscar quadrinhos, personagens, produtos...':'Buscar cómics, personajes, productos...'},
    fr:{'Início':'Accueil','Quadrinhos':'BD','Personagens':'Personnages','Promoções':'Promotions','Curiosidades':'Le saviez-vous','Contato':'Contact','Veja todos':'Voir tout','Conheça a turma':'Découvrez la bande','Produtos':'Produits','Camisas e mais':'T-shirts et plus','Ofertas do dia':'Offres du jour','Lançamentos':'Nouveautés','Receba as promoções!':'Recevez les promos !','Comprar':'Acheter','Carregando…':'Chargement…','Em breve! Novos quadrinhos kids estão chegando.':'Bientôt ! De nouvelles BD pour enfants arrivent.','Nenhum quadrinho encontrado.':'Aucune BD trouvée.','Não foi possível carregar agora. Tente recarregar a página.':'Impossible de charger pour le moment. Essayez de recharger la page.','Mundo Adulto':'Monde Adulte','Mundo Adulto ›':'Monde Adulte ›','Suporte':'Assistance','Privacidade':'Confidentialité','Termos':'Conditions','Buscar quadrinhos, personagens, produtos...':'Rechercher BD, personnages, produits...'},
    de:{'Início':'Start','Quadrinhos':'Comics','Personagens':'Figuren','Promoções':'Angebote','Curiosidades':'Wissenswertes','Contato':'Kontakt','Veja todos':'Alle ansehen','Conheça a turma':'Lerne die Bande kennen','Produtos':'Produkte','Camisas e mais':'Shirts und mehr','Ofertas do dia':'Angebote des Tages','Lançamentos':'Neuheiten','Receba as promoções!':'Angebote erhalten!','Comprar':'Kaufen','Carregando…':'Lädt…','Em breve! Novos quadrinhos kids estão chegando.':'Bald! Neue Kinder-Comics sind unterwegs.','Nenhum quadrinho encontrado.':'Keine Comics gefunden.','Não foi possível carregar agora. Tente recarregar a página.':'Konnte gerade nicht laden. Bitte Seite neu laden.','Mundo Adulto':'Erwachsenenwelt','Mundo Adulto ›':'Erwachsenenwelt ›','Suporte':'Support','Privacidade':'Datenschutz','Termos':'Bedingungen','Buscar quadrinhos, personagens, produtos...':'Comics, Figuren, Produkte suchen...'},
    it:{'Início':'Home','Quadrinhos':'Fumetti','Personagens':'Personaggi','Promoções':'Offerte','Curiosidades':'Curiosità','Contato':'Contatti','Veja todos':'Vedi tutti','Conheça a turma':'Conosci la banda','Produtos':'Prodotti','Camisas e mais':'Magliette e altro','Ofertas do dia':'Offerte del giorno','Lançamentos':'Novità','Receba as promoções!':'Ricevi le offerte!','Comprar':'Compra','Carregando…':'Caricamento…','Em breve! Novos quadrinhos kids estão chegando.':'Presto! Nuovi fumetti per bambini in arrivo.','Nenhum quadrinho encontrado.':'Nessun fumetto trovato.','Não foi possível carregar agora. Tente recarregar a página.':'Impossibile caricare ora. Prova a ricaricare la pagina.','Mundo Adulto':'Mondo Adulti','Mundo Adulto ›':'Mondo Adulti ›','Suporte':'Supporto','Privacidade':'Privacy','Termos':'Termini','Buscar quadrinhos, personagens, produtos...':'Cerca fumetti, personaggi, prodotti...'},
    ja:{'Início':'ホーム','Quadrinhos':'マンガ','Personagens':'キャラクター','Promoções':'セール','Curiosidades':'豆知識','Contato':'お問い合わせ','Veja todos':'すべて見る','Conheça a turma':'仲間に会おう','Produtos':'商品','Camisas e mais':'シャツなど','Ofertas do dia':'本日のお得','Lançamentos':'新着','Receba as promoções!':'お得情報を受け取ろう！','Comprar':'購入','Carregando…':'読み込み中…','Em breve! Novos quadrinhos kids estão chegando.':'近日公開！新しいキッズマンガが登場します。','Nenhum quadrinho encontrado.':'マンガが見つかりません。','Não foi possível carregar agora. Tente recarregar a página.':'現在読み込めません。ページを再読み込みしてください。','Mundo Adulto':'大人の世界','Mundo Adulto ›':'大人の世界 ›','Suporte':'サポート','Privacidade':'プライバシー','Termos':'利用規約','Buscar quadrinhos, personagens, produtos...':'マンガ、キャラクター、商品を検索...'},
    ko:{'Início':'홈','Quadrinhos':'만화','Personagens':'캐릭터','Promoções':'프로모션','Curiosidades':'재미있는 사실','Contato':'문의','Veja todos':'모두 보기','Conheça a turma':'친구들 만나기','Produtos':'상품','Camisas e mais':'셔츠 외','Ofertas do dia':'오늘의 특가','Lançamentos':'신상품','Receba as promoções!':'프로모션 받기!','Comprar':'구매','Carregando…':'불러오는 중…','Em breve! Novos quadrinhos kids estão chegando.':'곧 출시! 새로운 키즈 만화가 준비 중이에요.','Nenhum quadrinho encontrado.':'만화를 찾을 수 없습니다.','Não foi possível carregar agora. Tente recarregar a página.':'지금 불러올 수 없습니다. 페이지를 새로고침해 보세요.','Mundo Adulto':'성인 월드','Mundo Adulto ›':'성인 월드 ›','Suporte':'지원','Privacidade':'개인정보','Termos':'약관','Buscar quadrinhos, personagens, produtos...':'만화, 캐릭터, 상품 검색...'},
    hi:{'Início':'होम','Quadrinhos':'कॉमिक्स','Personagens':'पात्र','Promoções':'ऑफ़र','Curiosidades':'रोचक तथ्य','Contato':'संपर्क','Veja todos':'सभी देखें','Conheça a turma':'टोली से मिलें','Produtos':'उत्पाद','Camisas e mais':'शर्ट और भी','Ofertas do dia':'आज के ऑफ़र','Lançamentos':'नए रिलीज़','Receba as promoções!':'ऑफ़र पाएँ!','Comprar':'खरीदें','Carregando…':'लोड हो रहा है…','Em breve! Novos quadrinhos kids estão chegando.':'जल्द आ रहा है! नई किड्स कॉमिक्स आने वाली हैं।','Nenhum quadrinho encontrado.':'कोई कॉमिक नहीं मिली।','Não foi possível carregar agora. Tente recarregar a página.':'अभी लोड नहीं हो सका। पेज रीलोड करें।','Mundo Adulto':'वयस्क दुनिया','Mundo Adulto ›':'वयस्क दुनिया ›','Suporte':'सहायता','Privacidade':'गोपनीयता','Termos':'शर्तें','Buscar quadrinhos, personagens, produtos...':'कॉमिक्स, पात्र, उत्पाद खोजें...'},
    ru:{'Início':'Главная','Quadrinhos':'Комиксы','Personagens':'Персонажи','Promoções':'Акции','Curiosidades':'Интересное','Contato':'Контакты','Veja todos':'Все','Conheça a turma':'Знакомьтесь','Produtos':'Товары','Camisas e mais':'Футболки и не только','Ofertas do dia':'Акции дня','Lançamentos':'Новинки','Receba as promoções!':'Получайте акции!','Comprar':'Купить','Carregando…':'Загрузка…','Em breve! Novos quadrinhos kids estão chegando.':'Скоро! Новые детские комиксы уже в пути.','Nenhum quadrinho encontrado.':'Комиксы не найдены.','Não foi possível carregar agora. Tente recarregar a página.':'Не удалось загрузить. Попробуйте обновить страницу.','Mundo Adulto':'Взрослый мир','Mundo Adulto ›':'Взрослый мир ›','Suporte':'Поддержка','Privacidade':'Конфиденциальность','Termos':'Условия','Buscar quadrinhos, personagens, produtos...':'Поиск комиксов, персонажей, товаров...'},
    tr:{'Início':'Ana Sayfa','Quadrinhos':'Çizgi Roman','Personagens':'Karakterler','Promoções':'Kampanyalar','Curiosidades':'İlginç Bilgiler','Contato':'İletişim','Veja todos':'Tümünü gör','Conheça a turma':'Ekiple tanış','Produtos':'Ürünler','Camisas e mais':'Tişört ve dahası','Ofertas do dia':'Günün fırsatları','Lançamentos':'Yeni çıkanlar','Receba as promoções!':'Fırsatları al!','Comprar':'Satın al','Carregando…':'Yükleniyor…','Em breve! Novos quadrinhos kids estão chegando.':'Çok yakında! Yeni çocuk çizgi romanları geliyor.','Nenhum quadrinho encontrado.':'Çizgi roman bulunamadı.','Não foi possível carregar agora. Tente recarregar a página.':'Şu anda yüklenemedi. Sayfayı yenileyin.','Mundo Adulto':'Yetişkin Dünyası','Mundo Adulto ›':'Yetişkin Dünyası ›','Suporte':'Destek','Privacidade':'Gizlilik','Termos':'Şartlar','Buscar quadrinhos, personagens, produtos...':'Çizgi roman, karakter, ürün ara...'},
    id:{'Início':'Beranda','Quadrinhos':'Komik','Personagens':'Karakter','Promoções':'Promo','Curiosidades':'Fakta Seru','Contato':'Kontak','Veja todos':'Lihat semua','Conheça a turma':'Kenali genknya','Produtos':'Produk','Camisas e mais':'Kaus dan lainnya','Ofertas do dia':'Penawaran hari ini','Lançamentos':'Rilis baru','Receba as promoções!':'Dapatkan promonya!','Comprar':'Beli','Carregando…':'Memuat…','Em breve! Novos quadrinhos kids estão chegando.':'Segera hadir! Komik anak baru akan datang.','Nenhum quadrinho encontrado.':'Komik tidak ditemukan.','Não foi possível carregar agora. Tente recarregar a página.':'Tidak dapat memuat sekarang. Coba muat ulang halaman.','Mundo Adulto':'Dunia Dewasa','Mundo Adulto ›':'Dunia Dewasa ›','Suporte':'Dukungan','Privacidade':'Privasi','Termos':'Ketentuan','Buscar quadrinhos, personagens, produtos...':'Cari komik, karakter, produk...'}
  };

  function supported(c){ return c === 'pt' || !!T[c] || !!P[c]; }
  function getLang(){
    try { var s = localStorage.getItem('cc_lang'); if (s && supported(s)) return s; } catch(e){}
    var n = ((navigator.language || navigator.userLanguage || 'pt').slice(0,2)).toLowerCase();
    return supported(n) ? n : 'en';
  }

  var CUR = 'pt';
  function skip(node){
    var p = node.parentNode; if (!p) return true;
    var tag = p.nodeName;
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'OPTION' || tag === 'TEXTAREA') return true;
    if (p.id === 'cc-lang') return true;
    if (p.closest && p.closest('[data-i18n]')) return true; // tratado pelo data-i18n
    return false;
  }
  function translateNode(node){
    if (skip(node)) return;
    if (node.__pt == null) node.__pt = node.nodeValue;
    var raw = node.__pt, key = raw.trim();
    if (!key) return;
    if (CUR === 'pt') { node.nodeValue = raw; return; }
    var dict = P[CUR];
    if (dict && dict[key] != null) {
      var lead = raw.match(/^\s*/)[0], trail = raw.match(/\s*$/)[0];
      node.nodeValue = lead + dict[key] + trail;
    } else { node.nodeValue = raw; }
  }
  function walk(root){
    if (!root) return;
    if (root.nodeType === 3) { translateNode(root); return; }
    if (root.nodeType !== 1) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var n; while ((n = w.nextNode())) translateNode(n);
  }
  function translatePlaceholders(){
    var els = document.querySelectorAll('[placeholder]');
    els.forEach(function(el){
      if (el.__ph == null) el.__ph = el.getAttribute('placeholder');
      var raw = el.__ph || '';
      if (CUR === 'pt') { el.setAttribute('placeholder', raw); return; }
      var dict = P[CUR];
      el.setAttribute('placeholder', (dict && dict[raw] != null) ? dict[raw] : raw);
    });
  }
  function applyDataI18n(){
    var dict = T[CUR] || T.en || {};
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var k = el.getAttribute('data-i18n'); if (dict[k] != null) el.textContent = dict[k];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function(el){
      var k = el.getAttribute('data-i18n-ph'); if (dict[k] != null) el.setAttribute('placeholder', dict[k]);
    });
  }
  function apply(lang){
    CUR = lang;
    applyDataI18n();
    walk(document.body);
    translatePlaceholders();
    document.documentElement.setAttribute('lang', lang);
    try { localStorage.setItem('cc_lang', lang); } catch(e){}
  }

  function buildSelector(){
    var sel = document.getElementById('cc-lang'), floating = false;
    if (!sel){
      sel = document.createElement('select'); sel.id = 'cc-lang';
      sel.style.cssText = 'position:fixed;top:12px;right:12px;z-index:99999;font-family:inherit;font-weight:700;font-size:13px;padding:7px 10px;border-radius:999px;border:2px solid rgba(0,0,0,.12);background:#fff;color:#2B2440;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.12);';
      floating = true;
    }
    sel.innerHTML = '';
    LANGS.forEach(function(l){ var o = document.createElement('option'); o.value = l.code; o.textContent = l.label; sel.appendChild(o); });
    sel.value = getLang();
    sel.addEventListener('change', function(){ apply(sel.value); });
    if (floating) document.body.appendChild(sel);
  }
  function observe(){
    if (!window.MutationObserver) return;
    var obs = new MutationObserver(function(muts){
      muts.forEach(function(m){
        for (var i = 0; i < m.addedNodes.length; i++) walk(m.addedNodes[i]);
      });
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }
  function init(){ buildSelector(); apply(getLang()); observe(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
