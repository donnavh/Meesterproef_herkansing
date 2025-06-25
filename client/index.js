import './index.css';

/* ====================================
   📱 MOBILE MENU LOGICA
==================================== */
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.mobileMenuLink');
  const menu = document.querySelector('.mobileMenu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
  }
});

/* ====================================
   🔵 ANIMATIE: PERSONEN DOTS
==================================== */
document.addEventListener('DOMContentLoaded', () => {
  const peopleList = document.querySelector('.people');

  if (peopleList) {
    const totalDots = 500; // Minder dan 2800 voor performance
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('div');
      dot.classList.add('person-dot');
      dot.style.animationDelay = `${i * 0.01}s`;
      fragment.appendChild(dot);
    }

    peopleList.appendChild(fragment);
  }
});

/* ====================================
   🔢 TELLER: Aantal mensen
==================================== */
document.addEventListener('DOMContentLoaded', () => {
  const countEl = document.getElementById('count');
  const total = 2800;
  const duration = 3000;
  const stepTime = Math.floor(duration / total);
  let current = 0;

  if (countEl) {
    const counter = setInterval(() => {
      current++;
      countEl.textContent = current.toLocaleString('nl-NL');
      if (current >= total) clearInterval(counter);
    }, stepTime);
  }
});

/* ====================================
   🌷 BLOEMEN TOEVOEGEN
==================================== */
const bloemList = document.querySelector('.bloem-lijst');
const bloemen = document.querySelectorAll('.bloem');
const totalFlowerImages = 5;

function getRandomBloem() {
  const randomImageNum = Math.floor(Math.random() * totalFlowerImages) + 1;
  return {
    src: `/images/bloemen/${randomImageNum}.png`,
    alt: `bloem ${randomImageNum}`
  };
}

function addSpecificBloem(imageSrc, altText) {
  const randomLeft = Math.floor(Math.random() * 85) + 1;
  const randomWidth = Math.floor(Math.random() * 31) + 90;

  const bloemHTML = `
    <li style="position: absolute; left: ${randomLeft}%; width: ${randomWidth}px;">
      <img src="${imageSrc}" alt="${altText}" style="width: 100%" />
    </li>`;

  bloemList?.insertAdjacentHTML('beforeend', bloemHTML);
}

if (bloemList) {
  const aantalBloemen = window.numberOfRoses || 0;

  for (let i = 0; i < aantalBloemen; i++) {
    const bloem = getRandomBloem();
    addSpecificBloem(bloem.src, bloem.alt);
  }
}

bloemen.forEach(bloem => {
  bloem.addEventListener('click', async () => {
    const imageSrc = bloem.getAttribute('src');
    const altText = bloem.getAttribute('alt');

    addSpecificBloem(imageSrc, altText); // UI update

    try {
      const response = await fetch('/legbloem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageSrc })
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const json = await response.json();
      console.log('Bloem succesvol gepost:', json);
    } catch (error) {
      console.error('Fout bij POST bloem:', error.message);
    }
  });
});

/* ====================================
   🧭 STRAATFILTER GEBRUIKEN
==================================== */
const straatSelect = document.querySelector('#straatSelect');
const muur = document.getElementById('muur');

if (straatSelect && muur) {
  straatSelect.addEventListener('change', () => {
    const geselecteerdeStraat = straatSelect.value.trim();
    muur.innerHTML = '';

    if (!geselecteerdeStraat) {
      muur.innerHTML = '<p>Kies een straat om verhalen te bekijken.</p>';
      return;
    }

    const gefilterdeVerhalen = allVerhalen.filter(
      item => item.verhaal.straat === geselecteerdeStraat
    );

    if (gefilterdeVerhalen.length === 0) {
      muur.innerHTML = '<p>Geen verhalen gevonden voor deze straat.</p>';
      return;
    }

    gefilterdeVerhalen.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('verhaal-kaart');
      div.innerHTML = `
        <div class="huisnummer-bord">${item.verhaal.huisnummer || 'Onbekend'}</div>
        <p class="verhaal-naam">${item.verhaal.naam}</p>
        <a href="/verhalen/${item.verhaal.id}">Bekijk dit verhaal</a>
      `;
      muur.appendChild(div);
    });
  });
}

/* ====================================
   👪 FAMILIE SLIDER
==================================== */
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".familySlider ul");
  const leftButton = document.querySelector(".familySlider__button--left");
  const rightButton = document.querySelector(".familySlider__button--right");
  const scrollAmount = 300;

  if (slider && leftButton) {
    leftButton.addEventListener("click", () => {
      slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
  }

  if (slider && rightButton) {
    rightButton.addEventListener("click", () => {
      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  }
});

/* ====================================
   🏠 HUISJES ANIMATIE BIJ SCROLL
==================================== */
document.addEventListener("DOMContentLoaded", () => {
  const housjes = document.querySelectorAll(".housjesContainer img");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    housjes.forEach(huisje => {
      const speed = huisje.getAttribute("data-speed") || 1;
      const translateY = -scrollY * speed * 0.1;
      huisje.style.transform = `translateY(${translateY}px)`;
      huisje.style.opacity = 1 - scrollY / 500;
    });
  });
});

/* ====================================
   📍 TIMELINE-SCROLL EFFECT
==================================== */
const timeline = document.querySelector(".timeline ul");
const items = document.querySelectorAll(".timeline li");
const greyLine = document.querySelector(".default-line");
const lineToDraw = document.querySelector(".draw-line");

if (timeline && lineToDraw && greyLine) {
  window.addEventListener("scroll", () => {
    const redLineHeight = lineToDraw.offsetHeight;
    const greyLineHeight = greyLine.offsetHeight;
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight / 2;
    const timelineOffset = document.querySelector(".timeline").offsetTop;

    if (scrollY >= timelineOffset - windowHeight) {
      let newHeight = scrollY - timelineOffset + windowHeight;
      if (newHeight <= greyLineHeight) {
        lineToDraw.style.height = `${newHeight + 20}px`;
      }
    }

    const lineBottom = lineToDraw.getBoundingClientRect().top + scrollY + lineToDraw.offsetHeight;

    items.forEach(item => {
      const itemTop = item.getBoundingClientRect().top + scrollY;
      item.classList.toggle('in-view', lineBottom > itemTop);
    });
  });
}

/* ====================================
   🔎 ZOEKFILTER OP FAMILIENAMEN
==================================== */
document.addEventListener('DOMContentLoaded', () => {
  const zoekInput = document.getElementById('zoekInput');
  const familieKaarten = document.querySelectorAll('.familie-kaart');

  if (!zoekInput || !familieKaarten.length) return;

  zoekInput.addEventListener('input', () => {
    const zoekterm = zoekInput.value.toLowerCase();

    familieKaarten.forEach(kaart => {
      const naam = kaart.getAttribute('data-naam').toLowerCase();
      kaart.style.display = naam.includes(zoekterm) ? '' : 'none';
    });
  });
});
