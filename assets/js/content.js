// 인사이트 카테고리 탭 토글 + URL 동기화 + 썸네일 페이드인 + 본문 TOC
(function () {
  // ── 카테고리 탭 ──
  function showCat(cat) {
    document.querySelectorAll('.insights-cat').forEach(function (el) {
      el.hidden = (el.getAttribute('data-cat') !== cat);
    });
    document.querySelectorAll('.insights-tab').forEach(function (t) {
      t.classList.toggle('is-active', t.getAttribute('data-cat') === cat);
    });
  }
  document.querySelectorAll('.insights-tab').forEach(function (tab) {
    tab.addEventListener('click', function (e) {
      e.preventDefault();
      var cat = tab.getAttribute('data-cat');
      showCat(cat);
      var base = location.pathname;
      var url = cat === 'all' ? base : base + '?cat=' + encodeURIComponent(cat);
      history.pushState({ cat: cat }, '', url);
    });
  });
  window.addEventListener('popstate', function () {
    if (!document.querySelector('.insights-cat')) return;
    var p = new URLSearchParams(location.search);
    showCat(p.get('cat') || 'all');
  });

  // ── 썸네일 페이드인 ──
  document.querySelectorAll('img.insights-hero__img, img.content-card__img').forEach(function (img) {
    if (img.complete) img.classList.add('is-loaded');
    else img.addEventListener('load', function () { img.classList.add('is-loaded'); });
  });

  // ── 본문 TOC 앵커: 부드러운 스크롤 + replaceState(뒤로가기 누적 방지) ──
  document.querySelectorAll('.content-toc a[href^="#"], nav.content-toc a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href').slice(1);
      var t = document.getElementById(id);
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', '#' + id);
    });
  });
  window.addEventListener('load', function () {
    if (location.hash) {
      var el = document.getElementById(location.hash.slice(1));
      if (el) el.scrollIntoView({ block: 'start' });
    }
  });
})();
