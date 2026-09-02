(function () {
  var root = document.documentElement;

  /* ---------- Theme toggle ---------- */
  var themeBtn = document.getElementById('theme-toggle');
  var storedTheme = localStorage.getItem('site-theme');
  if (storedTheme) root.setAttribute('data-theme', storedTheme);

  function currentTheme() {
    var attr = root.getAttribute('data-theme');
    if (attr) return attr;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function updateThemeBtn() {
    if (!themeBtn) return;
    themeBtn.textContent = currentTheme() === 'dark' ? '☀' : '☾';
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('site-theme', next);
      updateThemeBtn();
    });
  }
  updateThemeBtn();

  /* ---------- Language toggle ---------- */
  var langBtn = document.getElementById('lang-toggle');
  var storedLang = localStorage.getItem('site-lang');
  if (storedLang) root.setAttribute('lang', storedLang);

  function updateLangBtn() {
    if (!langBtn) return;
    langBtn.textContent = root.getAttribute('lang') === 'zh' ? 'EN' : '中文';
  }

  if (langBtn) {
    langBtn.addEventListener('click', function () {
      var next = root.getAttribute('lang') === 'zh' ? 'en' : 'zh';
      root.setAttribute('lang', next);
      localStorage.setItem('site-lang', next);
      updateLangBtn();
      document.title = next === 'zh' ? document.body.dataset.titleZh : document.body.dataset.titleEn;
    });
  }
  updateLangBtn();

  /* ---------- Read more / abstract toggles ---------- */
  document.querySelectorAll('.pub-item').forEach(function (item) {
    var btn = item.querySelector('.read-more-btn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var text = item.querySelector('.read-more-text');
      text.classList.toggle('read-more-text--show');
      var showing = text.classList.contains('read-more-text--show');
      btn.querySelector('.lang-en').textContent = showing ? 'Read Less' : 'Read More';
      btn.querySelector('.lang-zh').textContent = showing ? '收起' : '展开摘要';
    });
  });
})();
