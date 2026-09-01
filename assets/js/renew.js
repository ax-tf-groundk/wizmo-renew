/* WIZMOBILITY 리뉴얼 — 공통 스크립트 */
(function () {
  'use strict';

  /* 모바일 메뉴 토글 */
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('mobileMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* 현재 페이지 GNB 활성 표시 */
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.menu a[href], .menu-dd__menu a[href]').forEach(function (a) {
    var target = a.getAttribute('href').split('#')[0].replace('./', '');
    if (target && target === here) {
      a.classList.add('is-active');
      var dd = a.closest('.menu-dd');
      if (dd) {
        var trig = dd.querySelector('.menu-dd__trigger');
        if (trig) trig.classList.add('is-active');
        if (a.closest('.menu-dd__menu')) a.classList.add('is-current');
      }
    }
  });

  /* 드롭다운 키보드 접근 — Esc 로 닫기 */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var el = document.activeElement;
    if (el && el.closest('.menu-dd')) el.blur();
  });

  /* 플랫폼 아코디언 — 하나만 열림 */
  document.querySelectorAll('[data-accordion]').forEach(function (group) {
    var panels = Array.prototype.slice.call(group.querySelectorAll('.plat__panel'));
    function open(target) {
      panels.forEach(function (p) {
        var on = p === target;
        p.classList.toggle('is-open', on);
        p.setAttribute('aria-expanded', on ? 'true' : 'false');
      });
    }
    panels.forEach(function (p) {
      p.addEventListener('click', function () { open(p); });
      p.addEventListener('mouseenter', function () {
        if (window.matchMedia('(hover:hover)').matches) open(p);
      });
    });
  });

  /* 가로 캐러셀 — 마우스 드래그 스크롤
     · 터치/펜은 브라우저 기본 스와이프를 그대로 쓴다 (중복 이동 방지)
     · 세로 휠은 가로채지 않는다 → 페이지 스크롤이 막히지 않음
       (가로 이동은 트랙패드 좌우 스와이프 또는 Shift+휠으로 브라우저가 처리) */
  document.querySelectorAll('.rail').forEach(function (rail) {
    var down = false, startX = 0, startScroll = 0, moved = 0;

    rail.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true; moved = 0;
      startX = e.clientX;
      startScroll = rail.scrollLeft;
      rail.setPointerCapture(e.pointerId);
    });

    rail.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 4) rail.classList.add('is-dragging');
      moved = Math.max(moved, Math.abs(dx));
      rail.scrollLeft = startScroll - dx;
    });

    function end(e) {
      if (!down) return;
      down = false;
      try { rail.releasePointerCapture(e.pointerId); } catch (err) {}
      // 드래그였으면 뒤따르는 click(링크 이동) 한 번 무시
      if (moved > 4) {
        rail.addEventListener('click', function block(ev) {
          ev.preventDefault(); ev.stopPropagation();
        }, { capture: true, once: true });
      }
      setTimeout(function () { rail.classList.remove('is-dragging'); }, 0);
    }
    rail.addEventListener('pointerup', end);
    rail.addEventListener('pointercancel', end);
    rail.addEventListener('pointerleave', end);
  });

  /* 이미지 누락 시 자리 표시 (파일명을 화면에 노출해 교체를 돕는다) */
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () {
      var name = (img.getAttribute('src') || '').split('/').pop();
      img.style.background = 'repeating-linear-gradient(45deg,#eae5df 0 12px,#e2dcd5 12px 24px)';
      img.style.minHeight = img.style.minHeight || '200px';
      img.setAttribute('data-missing', name);
      img.alt = '이미지 없음: ' + name;
    }, { once: true });
  });
})();
