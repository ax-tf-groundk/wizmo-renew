    const fleetData = {
      sclass: {
        photos: [
          { src: '../assets/images/fleet/fleet_s-class_exterior-studio.webp', alt: 'Mercedes-Benz S-Class 외관' },
          { src: '../assets/images/fleet/fleet_s-class_interior-rear.webp', alt: 'Mercedes-Benz S-Class 실내' },
          { src: '../assets/images/fleet/fleet_s-class_trunk-luggage.webp', alt: 'Mercedes-Benz S-Class 트렁크' }
        ],
        cls: 'EXECUTIVE SEDAN',
        name: 'Mercedes-Benz S-Class',
        desc: '최고급 세단의 안락함과 품격을 기반으로 VIP 의전과 주요 내빈 이동에 적합한 프리미엄 차량입니다.',
        pax: '3인',
        bag: '24인치 2개',
        uses: ['VIP 의전', '주요 내빈 이동', '프리미엄 고객 서비스']
      },
      g90: {
        photos: [
          { src: '../assets/images/fleet/fleet_g90_exterior-studio.webp', alt: 'Genesis G90 외관' },
          { src: '../assets/images/fleet/fleet_g90_interior-rear.webp', alt: 'Genesis G90 실내' },
          { src: '../assets/images/fleet/fleet_g90_trunk-luggage.webp', alt: 'Genesis G90 트렁크' }
        ],
        cls: 'EXECUTIVE SEDAN',
        name: 'Genesis G90',
        desc: '넓고 고급스러운 실내 공간을 제공하는 대표 의전 차량으로 VIP 고객과 기업 임원 이동에 적합합니다.',
        pax: '3인',
        bag: '24인치 2~3개',
        uses: ['VIP 고객 이동', '호텔·카지노 의전', '기업 임원 이동']
      },
      g80: {
        photos: [
          { src: '../assets/images/fleet/fleet_g80_exterior-studio.webp', alt: 'Genesis G80 외관' },
          { src: '../assets/images/fleet/fleet_g80_interior-rear.webp', alt: 'Genesis G80 실내' },
          { src: '../assets/images/fleet/fleet_g80_trunk-luggage.webp', alt: 'Genesis G80 트렁크' }
        ],
        cls: 'BUSINESS SEDAN',
        name: 'Genesis G80',
        desc: '비즈니스 이동에 적합한 세단으로 공항 이동, 출장, 법인 고객 이동에 안정적인 승차감을 제공합니다.',
        pax: '3인',
        bag: '24인치 2개',
        uses: ['비즈니스 출장', '공항 이동', '법인 고객 이동']
      },
      carnival: {
        photos: [
          { src: '../assets/images/fleet/fleet_carnival_exterior-studio.webp', alt: 'Kia Carnival 외관' },
          { src: '../assets/images/fleet/fleet_carnival_interior-seats.webp', alt: 'Kia Carnival 실내' },
          { src: '../assets/images/fleet/fleet_carnival_trunk-luggage.webp', alt: 'Kia Carnival 트렁크' }
        ],
        cls: 'PREMIUM VAN',
        name: 'Kia Carnival',
        desc: '넉넉한 탑승 공간과 수하물 적재 공간을 갖춘 차량으로 가족, 의료관광, 소규모 그룹 이동에 적합합니다.',
        pax: '6인',
        bag: '24인치 6개',
        uses: ['소규모 그룹 이동', '의료관광 고객', '호텔 고객 이동']
      },
      staria: {
        photos: [
          { src: '../assets/images/fleet/fleet_staria_exterior-studio.webp', alt: 'Hyundai Staria 외관' },
          { src: '../assets/images/fleet/fleet_staria_interior-seats.webp', alt: 'Hyundai Staria 실내' },
          { src: '../assets/images/fleet/fleet_staria_trunk-luggage.webp', alt: 'Hyundai Staria 트렁크' }
        ],
        cls: 'PREMIUM VAN',
        name: 'Hyundai Staria',
        desc: '여유 있는 실내 공간을 기반으로 공항 셔틀, 기업 셔틀, 중소규모 단체 이동에 활용하기 좋은 승합 차량입니다.',
        pax: '7~9인',
        bag: '7~9개',
        uses: ['공항 셔틀', '기업 셔틀', '중소규모 단체 이동']
      },
      solati: {
        photos: [
          { src: '../assets/images/fleet/fleet_solati_exterior-studio.webp', alt: 'Hyundai Solati 외관' },
          { src: '../assets/images/fleet/fleet_solati_interior-seats.webp', alt: 'Hyundai Solati 실내' },
          { src: '../assets/images/fleet/fleet_solati_trunk-luggage.webp', alt: 'Hyundai Solati 트렁크' }
        ],
        cls: 'GROUP TRANSPORTATION',
        name: 'Hyundai Solati',
        desc: '단체 인원 수송에 적합한 대형 승합 차량으로 MICE, 컨벤션, 행사 이동에 효율적인 운영이 가능합니다.',
        pax: '13인',
        bag: '단체 적재 가능',
        uses: ['MICE 행사', '컨벤션', '단체 수송']
      },
      sprinter: {
        photos: [
          { src: '../assets/images/fleet/fleet_sprinter_exterior-studio.webp', alt: 'Mercedes-Benz Sprinter 외관' },
          { src: '../assets/images/fleet/fleet_sprinter_interior-vip.webp', alt: 'Mercedes-Benz Sprinter 실내' },
          { src: '../assets/images/fleet/fleet_sprinter_trunk-luggage.webp', alt: 'Mercedes-Benz Sprinter 트렁크' }
        ],
        cls: 'PREMIUM GROUP',
        name: 'Mercedes-Benz Sprinter',
        desc: '프리미엄 그룹 이동을 위한 대형 승합 차량으로 VIP 그룹, 호텔·카지노 고객, 프리미엄 셔틀에 적합합니다.',
        pax: '12~15인',
        bag: '대형 적재 가능',
        uses: ['VIP 그룹 이동', '프리미엄 셔틀', '호텔·카지노 전용 서비스']
      }
    };

    function openInquiry() {
      var inquiry = document.getElementById('inquiry');
      if (!inquiry) return;
      inquiry.classList.add('active');
      document.querySelectorAll('[onclick^="showInquiry"]').forEach(function(button){
        button.textContent = '문의 닫기';
      });
      return inquiry;
    }

    function showInquiry(btn) {
      var inquiry = document.getElementById('inquiry');
      if (!inquiry) return;
      var isOpen = inquiry.classList.contains('active');
      if (isOpen) {
        inquiry.classList.remove('active');
        document.querySelectorAll('[onclick^="showInquiry"]').forEach(function(button){
          button.textContent = '문의하기';
        });
        return;
      }
      openInquiry();
      inquiry.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // #inquiry hash로 직접 진입 시 폼 자동 열기 + 첫 필드 포커스
    (function() {
      function autoOpenInquiry() {
        if (location.hash !== '#inquiry') return;
        var inquiry = document.getElementById('inquiry');
        if (!inquiry) return;
        inquiry.classList.add('active');
        setTimeout(function() {
          var first = inquiry.querySelector('input:not([type=hidden]):not([name=_hp]), select, textarea');
          if (first) first.focus();
        }, 300);
      }
      document.addEventListener('DOMContentLoaded', autoOpenInquiry);
      window.addEventListener('hashchange', autoOpenInquiry);
    })();

    // Fleet 갤러리 — 외관·실내·트렁크 캐러셀 (dot · 화살표 · 키보드 ←→).
    // 로드 실패(아직 없는 이미지)한 슬라이드는 자동 제거 → 외관만 표시, 이미지 추가 시 자동 노출.
    function buildFleetGallery(photos) {
      const container = document.getElementById('fleetPhoto');
      container.innerHTML = '';
      const track = document.createElement('div');
      track.className = 'ko-gallery-track';
      container.appendChild(track);

      photos.forEach(function (p) {
        const slide = document.createElement('div');
        slide.className = 'ko-gallery-slide';
        const img = document.createElement('img');
        img.src = p.src;
        img.alt = p.alt;
        // lazy 금지 — 가로 캐러셀은 비활성 슬라이드가 viewport 밖이라 lazy면 영영 로드 안 됨
        img.onerror = function () { slide.remove(); buildControls(); };
        slide.appendChild(img);
        track.appendChild(slide);
      });
      buildControls();

      function buildControls() {
        container.querySelectorAll('.ko-gallery-dots, .ko-gallery-nav').forEach(function (el) { el.remove(); });
        const slides = track.querySelectorAll('.ko-gallery-slide');
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';
        requestAnimationFrame(function () { track.style.transition = ''; });
        container.classList.toggle('is-single', slides.length <= 1);
        if (slides.length <= 1) return;

        let idx = 0;
        const dotsWrap = document.createElement('div');
        dotsWrap.className = 'ko-gallery-dots';
        slides.forEach(function (s, i) {
          const dot = document.createElement('button');
          dot.type = 'button';
          dot.className = 'ko-gallery-dot' + (i === 0 ? ' active' : '');
          dot.setAttribute('aria-label', (i + 1) + '번째 사진');
          dot.addEventListener('click', function () { goTo(i); });
          dotsWrap.appendChild(dot);
        });
        container.appendChild(dotsWrap);
        const dots = dotsWrap.querySelectorAll('.ko-gallery-dot');

        function mkNav(dir) {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = 'ko-gallery-nav ' + dir;
          b.setAttribute('aria-label', dir === 'prev' ? '이전 사진' : '다음 사진');
          const d = dir === 'prev' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6';
          b.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="' + d + '"/></svg>';
          return b;
        }
        const prevBtn = mkNav('prev');
        const nextBtn = mkNav('next');
        prevBtn.addEventListener('click', function () { goTo(idx - 1); });
        nextBtn.addEventListener('click', function () { goTo(idx + 1); });
        container.appendChild(prevBtn);
        container.appendChild(nextBtn);

        function goTo(i) {
          idx = (i + slides.length) % slides.length;
          track.style.transform = 'translateX(-' + (idx * 100) + '%)';
          dots.forEach(function (dd, k) { dd.classList.toggle('active', k === idx); });
        }

        container.setAttribute('tabindex', '0');
        container.onkeydown = function (e) {
          if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(idx - 1); }
          else if (e.key === 'ArrowRight') { e.preventDefault(); goTo(idx + 1); }
        };
      }
    }

    function selectFleet(key, btn) {
      const data = fleetData[key];
      buildFleetGallery(data.photos);
      document.getElementById('fleetClass').textContent = data.cls;
      document.getElementById('fleetName').textContent = data.name;
      document.getElementById('fleetDesc').textContent = data.desc;
      document.getElementById('fleetPax').textContent = data.pax;
      document.getElementById('fleetBag').textContent = data.bag;
      document.getElementById('fleetUse').innerHTML = data.uses.map(function(u){ return '<li>' + u + '</li>'; }).join('');
      document.querySelectorAll('.fleet-selector button').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
    }

    function toggleLang(e, btn) {
      e.stopPropagation();
      var menu = btn.nextElementSibling;
      var willOpen = !menu.classList.contains('is-open');
      menu.classList.toggle('is-open', willOpen);
      btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    }
    document.addEventListener('click', function() {
      // 언어 메뉴만 닫기 (nav hover 드롭다운은 mouseleave로 관리)
      document.querySelectorAll('.lang-wrapper .lang-menu.is-open').forEach(function(m) {
        m.classList.remove('is-open');
        m.previousElementSibling.setAttribute('aria-expanded', 'false');
      });
    });
    // 스크롤 50px 이상 시 언어 메뉴 자동 닫기
    (function() {
      var scrollY0 = 0;
      window.addEventListener('scroll', function() {
        var menu = document.querySelector('.lang-wrapper .lang-menu.is-open');
        if (!menu) { scrollY0 = window.scrollY; return; }
        if (Math.abs(window.scrollY - scrollY0) >= 50) {
          menu.classList.remove('is-open');
          menu.previousElementSibling.setAttribute('aria-expanded', 'false');
        }
      }, { passive: true });
    })();
    function toggleMobileMenu() {
      document.getElementById('mobileMenu').classList.toggle('open');
    }

  // ── 초기화: fleet 갤러리는 해당 페이지(#fleetPhoto)에서만 ──
  document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('fleetPhoto')) {
      buildFleetGallery(fleetData.sclass.photos);
    }
  });

  // ── components.js가 GNB 주입 후 호출: 현재 메뉴 active + EN 링크 매핑 + hover 드롭다운 ──
  window.initKoGnb = function () {
    // Insights nav 드롭다운 — hover
    document.querySelectorAll('.menu-dd').forEach(function(dd) {
      var trigger = dd.querySelector('.menu-dd__trigger');
      var menu    = dd.querySelector('.lang-menu');
      if (!trigger || !menu) return;
      dd.addEventListener('mouseenter', function() {
        // 언어 메뉴 열려있으면 닫기
        document.querySelectorAll('.lang-wrapper .lang-menu.is-open').forEach(function(m) {
          m.classList.remove('is-open');
          m.previousElementSibling.setAttribute('aria-expanded', 'false');
        });
        menu.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      });
      dd.addEventListener('mouseleave', function() {
        menu.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      });
    });

    var path = location.pathname;
    // 홈(/ko/, /ko/index.html)은 active 없음
    var isHome = path === '/ko/' || path === '/ko/index.html' || path === '/ko';
    var page = '';
    if (!isHome) {
      page = 'service';
      if (path.indexOf('/business') >= 0) page = 'business';
      else if (path.indexOf('/fleet') >= 0) page = 'fleet';
      else if (path.indexOf('/technology') >= 0) page = 'technology';
      else if (path.indexOf('/about') >= 0) page = 'about';
      else if (path.indexOf('/blog') >= 0 || path.indexOf('/cases') >= 0) page = 'blog';
    }
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      a.classList.toggle('active', !!page && a.getAttribute('data-nav') === page);
    });
    var enMap = { fleet: '/fleet.html', technology: '/technology.html', about: '/about.html', blog: '/blog' };
    document.querySelectorAll('.lang-en').forEach(function (a) { a.setAttribute('href', enMap[page] || '/'); });
  };

  // ── 문의 폼 전송 (한글) → /api/contact (lang=ko). 영문 키(_hp/_loaded_at 초) 일치 ──
  function showKoResult(el, type, msg) {
    if (!el) return;
    el.hidden = false;
    el.textContent = msg;
    el.className = 'ko-form-result ko-form-result--' + type;
  }
  function initKoContactForm() {
    var form = document.getElementById('ko-contactForm');
    if (!form) return;
    var loadedAt = document.getElementById('ko-contactLoadedAt');
    if (loadedAt) loadedAt.value = Math.floor(Date.now() / 1000);
    var hp = form.querySelector('input[name="_hp"]');
    var btn = document.getElementById('ko-contactSubmitBtn');
    var result = document.getElementById('ko-contactResult');
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var name = form.querySelector('#contact-name').value.trim();
      var company = form.querySelector('#contact-company').value.trim();
      var email = form.querySelector('#contact-email').value.trim();
      var phone = form.querySelector('#contact-phone').value.trim();
      var subject = form.querySelector('#contact-subject').value;
      var message = form.querySelector('#contact-message').value.trim();
      var consent = form.querySelector('#contact-consent');
      if (!name || !email || !subject || !message) { showKoResult(result, 'error', '필수 항목을 모두 입력해 주세요.'); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showKoResult(result, 'error', '올바른 이메일 주소를 입력해 주세요.'); return; }
      if (consent && !consent.checked) { showKoResult(result, 'error', '개인정보 수집·이용 동의가 필요합니다.'); return; }
      btn.disabled = true; var orig = btn.textContent; btn.textContent = '전송 중...';
      try {
        var res = await fetch('/api/contact', {
          method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(Object.assign({ name: name, company: company, email: email, phone: phone, subject: subject, message: message, lang: 'ko', source_url: location.href, referrer: document.referrer || '', _loaded_at: loadedAt ? loadedAt.value : '', _hp: hp ? hp.value : '' }, window.WM_getAttribution ? window.WM_getAttribution() : {}))
        });
        var data = await res.json();
        if (data.success) { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: 'generate_lead', form_type: 'contact', site: 'wizmobility' }); form.reset(); if (loadedAt) loadedAt.value = Math.floor(Date.now() / 1000); showKoResult(result, 'success', '문의가 정상적으로 접수되었습니다. 감사합니다.'); }
        else { showKoResult(result, 'error', (data && data.message) || '전송에 실패했습니다. 다시 시도해 주세요.'); }
      } catch (err) { showKoResult(result, 'error', '네트워크 오류입니다. 다시 시도해 주세요.'); }
      finally { btn.disabled = false; btn.textContent = orig; }
    });
  }
  document.addEventListener('DOMContentLoaded', initKoContactForm);

/* ── 한글 홈(v8) showcase 호버 이미지 전환 + fleet 캐러셀 ── */
(() => {
  function bindShowcase(listSelector, imageSelector) {
    const list = document.querySelector(listSelector);
    const baseImg = document.querySelector(imageSelector);
    if (!list || !baseImg) return;

    // 디졸브 오버레이 — 새 이미지를 베이스 위에서 fade-in
    const overlay = document.createElement('img');
    overlay.className = 'showcase-dissolve-layer';
    baseImg.parentElement.appendChild(overlay);

    const rows = [...list.querySelectorAll('.showcase-row')];
    let dissolveTimer = null;

    const activate = (row) => {
      if (row.classList.contains('active')) return;
      rows.forEach(item => item.classList.remove('active'));
      row.classList.add('active');
      const nextSrc = row.dataset.image;

      if (dissolveTimer) { clearTimeout(dissolveTimer); dissolveTimer = null; }
      // 오버레이 즉시 리셋 (이전 전환 중이었을 경우)
      overlay.style.transition = 'none';
      overlay.style.opacity = '0';

      const preload = new Image();
      preload.onload = () => {
        overlay.src = nextSrc;
        overlay.alt = row.dataset.alt || '';
        // 두 프레임 후 transition 활성화 + fade-in
        requestAnimationFrame(() => {
          overlay.style.transition = '';
          requestAnimationFrame(() => { overlay.style.opacity = '1'; });
        });
        // 전환 완료 후 베이스 이미지 교체 → 오버레이 리셋
        dissolveTimer = setTimeout(() => {
          baseImg.src = nextSrc;
          baseImg.alt = row.dataset.alt || '';
          overlay.style.transition = 'none';
          overlay.style.opacity = '0';
          requestAnimationFrame(() => { overlay.style.transition = ''; });
          dissolveTimer = null;
        }, 500);
      };
      preload.src = nextSrc;
    };

    rows.forEach(row => {
      row.addEventListener('mouseenter', () => activate(row));
      row.addEventListener('focus', () => activate(row));
      row.addEventListener('click', (event) => {
        if (!row.classList.contains('active')) {
          event.preventDefault();
          activate(row);
        }
      });
    });
  }

  bindShowcase('[data-showcase="service"]', '#serviceShowcaseImage');
  bindShowcase('[data-showcase="business"]', '#businessShowcaseImage');

  const viewport = document.querySelector('.fleet-viewport');
  const track = document.querySelector('.fleet-track');
  const prev = document.querySelector('.fleet-prev');
  const next = document.querySelector('.fleet-next');
  if (viewport && track && prev && next) {
    const cards = [...track.children];
    let index = 0;
    const visibleCount = () => window.innerWidth <= 680 ? 1 : (window.innerWidth <= 1000 ? 3 : 5);
    const maxIndex = () => Math.max(0, cards.length - visibleCount());
    const step = () => window.innerWidth <= 680 ? 1 : 2;
    const update = () => {
      index = Math.min(index, maxIndex());
      const card = cards[0];
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      const span = card ? card.getBoundingClientRect().width + gap : 0;
      const raw = index * span;
      const maxOffset = Math.max(0, track.scrollWidth - viewport.clientWidth);
      track.style.transform = `translateX(-${Math.min(raw, maxOffset)}px)`;
      prev.disabled = index <= 0;
      next.disabled = index >= maxIndex();
    };
    prev.addEventListener('click', () => { index = Math.max(0, index - step()); update(); });
    next.addEventListener('click', () => { index = Math.min(maxIndex(), index + step()); update(); });
    window.addEventListener('resize', update);
    update();
  }
})();

/* ── 한글 헤더 hide-on-scroll (모바일: 스크롤 다운 숨김, 위로 올리면 즉시 등장) ──
   헤더는 components.js가 비동기 주입하므로 매 스크롤마다 querySelector로 조회. */
(function initKoHeaderScroll() {
  var lastY = window.scrollY || 0;
  var HIDE_AT = 120, DELTA = 6;
  window.addEventListener('scroll', function () {
    var nav = document.querySelector('header.nav');
    if (!nav) return;
    var y = window.scrollY;
    var mm = document.getElementById('mobileMenu');
    var menuOpen = mm && mm.classList.contains('open');
    if (y <= HIDE_AT || menuOpen) { nav.classList.remove('nav--hidden'); lastY = y; return; }
    var d = y - lastY;
    if (Math.abs(d) >= DELTA) {
      nav.classList.toggle('nav--hidden', d > 0);
      lastY = y;
    }
  }, { passive: true });
})();
