/* Cats & Cats — motor de tradução da interface do site (i18n)
   Como usar numa página:
   1) Marque os textos com data-i18n="chave" (ou data-i18n-ph="chave" para placeholder).
   2) Inclua <script src="/i18n.js"></script> antes de </body>.
   3) (Opcional) Coloque <select id="cc-lang"></select> onde quiser o seletor;
      se não houver, ele cria um flutuante no canto.
   Para adicionar um idioma novo: basta acrescentar um bloco no objeto T. */
(function () {
  var LANGS = [
    { code: 'pt', label: 'Português' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'it', label: 'Italiano' },
    { code: 'ja', label: '日本語' },
    { code: 'ko', label: '한국어' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'ru', label: 'Русский' },
    { code: 'tr', label: 'Türkçe' },
    { code: 'id', label: 'Bahasa Indonesia' }
  ];

  var T = {
    pt: {
      escolha_mundo: 'Escolha seu mundo', mundo_kids: 'Mundo Kids',
      kids_desc: 'Quadrinhos coloridos e divertidos pra criançada se aventurar!',
      entrar: 'Entrar', mundo_adulto: 'Mundo Adulto',
      adulto_desc: 'Histórias e quadrinhos para leitores adultos.',
      criar_conta: 'Criar conta', ja_tenho_conta: 'Já tenho conta',
      nossa_historia: 'Nossa história', suporte: 'Suporte', privacidade: 'Privacidade', termos: 'Termos'
    },
    en: {
      escolha_mundo: 'Choose your world', mundo_kids: 'Kids World',
      kids_desc: 'Colorful, fun comics for kids to adventure with!',
      entrar: 'Enter', mundo_adulto: 'Adult World',
      adulto_desc: 'Stories and comics for adult readers.',
      criar_conta: 'Create account', ja_tenho_conta: 'I already have an account',
      nossa_historia: 'Our story', suporte: 'Support', privacidade: 'Privacy', termos: 'Terms'
    },
    es: {
      escolha_mundo: 'Elige tu mundo', mundo_kids: 'Mundo Infantil',
      kids_desc: '¡Cómics coloridos y divertidos para que los niños se aventuren!',
      entrar: 'Entrar', mundo_adulto: 'Mundo Adulto',
      adulto_desc: 'Historias y cómics para lectores adultos.',
      criar_conta: 'Crear cuenta', ja_tenho_conta: 'Ya tengo cuenta',
      nossa_historia: 'Nuestra historia', suporte: 'Soporte', privacidade: 'Privacidad', termos: 'Términos'
    },
    fr: {
      escolha_mundo: 'Choisissez votre monde', mundo_kids: 'Monde Enfants',
      kids_desc: 'Des BD colorées et amusantes pour l\u2019aventure des enfants !',
      entrar: 'Entrer', mundo_adulto: 'Monde Adulte',
      adulto_desc: 'Des histoires et BD pour lecteurs adultes.',
      criar_conta: 'Créer un compte', ja_tenho_conta: 'J\u2019ai déjà un compte',
      nossa_historia: 'Notre histoire', suporte: 'Assistance', privacidade: 'Confidentialité', termos: 'Conditions'
    },
    de: {
      escolha_mundo: 'Wähle deine Welt', mundo_kids: 'Kinderwelt',
      kids_desc: 'Bunte, lustige Comics für Kinderabenteuer!',
      entrar: 'Eintreten', mundo_adulto: 'Erwachsenenwelt',
      adulto_desc: 'Geschichten und Comics für erwachsene Leser.',
      criar_conta: 'Konto erstellen', ja_tenho_conta: 'Ich habe schon ein Konto',
      nossa_historia: 'Unsere Geschichte', suporte: 'Support', privacidade: 'Datenschutz', termos: 'Bedingungen'
    },
    it: {
      escolha_mundo: 'Scegli il tuo mondo', mundo_kids: 'Mondo Bambini',
      kids_desc: 'Fumetti colorati e divertenti per le avventure dei bambini!',
      entrar: 'Entra', mundo_adulto: 'Mondo Adulti',
      adulto_desc: 'Storie e fumetti per lettori adulti.',
      criar_conta: 'Crea account', ja_tenho_conta: 'Ho già un account',
      nossa_historia: 'La nostra storia', suporte: 'Supporto', privacidade: 'Privacy', termos: 'Termini'
    },
    ja: {
      escolha_mundo: '世界を選んでください', mundo_kids: 'キッズワールド',
      kids_desc: '子供が冒険できる、カラフルで楽しいマンガ！',
      entrar: '入る', mundo_adulto: '大人の世界',
      adulto_desc: '大人の読者向けの物語とマンガ。',
      criar_conta: 'アカウント作成', ja_tenho_conta: 'すでにアカウントを持っています',
      nossa_historia: '私たちの物語', suporte: 'サポート', privacidade: 'プライバシー', termos: '利用規約'
    },
    ko: {
      escolha_mundo: '당신의 세계를 선택하세요', mundo_kids: '키즈 월드',
      kids_desc: '아이들이 모험할 수 있는 다채롭고 재미있는 만화!',
      entrar: '들어가기', mundo_adulto: '성인 월드',
      adulto_desc: '성인 독자를 위한 이야기와 만화.',
      criar_conta: '계정 만들기', ja_tenho_conta: '이미 계정이 있어요',
      nossa_historia: '우리 이야기', suporte: '지원', privacidade: '개인정보', termos: '약관'
    },
    hi: {
      escolha_mundo: 'अपनी दुनिया चुनें', mundo_kids: 'किड्स वर्ल्ड',
      kids_desc: 'बच्चों के रोमांच के लिए रंगीन, मज़ेदार कॉमिक्स!',
      entrar: 'प्रवेश करें', mundo_adulto: 'वयस्क दुनिया',
      adulto_desc: 'वयस्क पाठकों के लिए कहानियाँ और कॉमिक्स।',
      criar_conta: 'खाता बनाएँ', ja_tenho_conta: 'मेरा पहले से खाता है',
      nossa_historia: 'हमारी कहानी', suporte: 'सहायता', privacidade: 'गोपनीयता', termos: 'शर्तें'
    },
    ru: {
      escolha_mundo: 'Выберите свой мир', mundo_kids: 'Детский мир',
      kids_desc: 'Яркие весёлые комиксы для детских приключений!',
      entrar: 'Войти', mundo_adulto: 'Взрослый мир',
      adulto_desc: 'Истории и комиксы для взрослых читателей.',
      criar_conta: 'Создать аккаунт', ja_tenho_conta: 'У меня уже есть аккаунт',
      nossa_historia: 'Наша история', suporte: 'Поддержка', privacidade: 'Конфиденциальность', termos: 'Условия'
    },
    tr: {
      escolha_mundo: 'Dünyanı seç', mundo_kids: 'Çocuk Dünyası',
      kids_desc: 'Çocukların maceraları için renkli, eğlenceli çizgi romanlar!',
      entrar: 'Gir', mundo_adulto: 'Yetişkin Dünyası',
      adulto_desc: 'Yetişkin okuyucular için hikâyeler ve çizgi romanlar.',
      criar_conta: 'Hesap oluştur', ja_tenho_conta: 'Zaten hesabım var',
      nossa_historia: 'Hikâyemiz', suporte: 'Destek', privacidade: 'Gizlilik', termos: 'Şartlar'
    },
    id: {
      escolha_mundo: 'Pilih duniamu', mundo_kids: 'Dunia Anak',
      kids_desc: 'Komik berwarna dan seru untuk petualangan anak-anak!',
      entrar: 'Masuk', mundo_adulto: 'Dunia Dewasa',
      adulto_desc: 'Cerita dan komik untuk pembaca dewasa.',
      criar_conta: 'Buat akun', ja_tenho_conta: 'Saya sudah punya akun',
      nossa_historia: 'Kisah kami', suporte: 'Dukungan', privacidade: 'Privasi', termos: 'Ketentuan'
    }
  };

  function supported(code) { return !!T[code]; }

  function getLang() {
    try {
      var saved = localStorage.getItem('cc_lang');
      if (saved && supported(saved)) return saved;
    } catch (e) {}
    var nav = ((navigator.language || navigator.userLanguage || 'pt').slice(0, 2)).toLowerCase();
    return supported(nav) ? nav : 'en';
  }

  function apply(lang) {
    var dict = T[lang] || T.en;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (dict[k] != null) el.textContent = dict[k];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-ph');
      if (dict[k] != null) el.setAttribute('placeholder', dict[k]);
    });
    document.documentElement.setAttribute('lang', lang);
    try { localStorage.setItem('cc_lang', lang); } catch (e) {}
  }

  function buildSelector() {
    var sel = document.getElementById('cc-lang');
    var floating = false;
    if (!sel) {
      sel = document.createElement('select');
      sel.id = 'cc-lang';
      sel.style.cssText = 'position:fixed;top:12px;right:12px;z-index:9999;' +
        'font-family:inherit;font-weight:700;font-size:13px;padding:7px 10px;' +
        'border-radius:999px;border:2px solid rgba(0,0,0,.12);background:#fff;' +
        'color:#2B2440;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.12);';
      floating = true;
    }
    sel.innerHTML = '';
    LANGS.forEach(function (l) {
      var o = document.createElement('option');
      o.value = l.code; o.textContent = l.label;
      sel.appendChild(o);
    });
    sel.value = getLang();
    sel.addEventListener('change', function () { apply(sel.value); });
    if (floating) document.body.appendChild(sel);
  }

  function init() { buildSelector(); apply(getLang()); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
