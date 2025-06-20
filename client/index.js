import './index.css';

/* Mobile header logica */
const mobileMenuLink = document.querySelector('.mobileMenuLink');

if (mobileMenuLink) {
  mobileMenuLink.addEventListener("click", function () {
    document.querySelector('.mobileMenu').classList.toggle('active');

    const icon = this.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
    } else {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  });
}

/* Homepage mensen animatie */
// const peopleList = document.querySelector('.people');
// const peopleCount = 933;

// if (peopleList) {
//   for (let i = 0; i < peopleCount; i++) {
//     const listItem = document.createElement('li');
//     listItem.innerHTML = `<i class="fa-solid fa-users"></i>`;
//     listItem.style.animationDelay = `${i / 4}s`;
//     peopleList.appendChild(listItem);
//   }
// }

document.addEventListener("DOMContentLoaded", () => {
  const peopleList = document.querySelector('.people');

  if (!peopleList) return;

  const totalPeople = 2800;

  for (let i = 0; i < totalPeople; i++) {
    const li = document.createElement('li');
    li.style.animationDelay = `${i * 0.01}s`; // vertraag elke bol met 0.01s
    peopleList.appendChild(li);
  }
});

// const counter = document.getElementById('count');
// let count = 0;

// const interval = setInterval(() => {
//   if (count >= 2800) {
//     clearInterval(interval);
//     return;
//   }
//   count += 20; // versnel of vertraag dit
//   counter.textContent = count;
// }, 5); // elke 5ms een stap

document.addEventListener('DOMContentLoaded', () => {
  const countEl = document.getElementById('count');
  const total = 2800;
  const duration = 3000; // 3 seconden
  const stepTime = Math.floor(duration / total);

  let current = 0;

  const counter = setInterval(() => {
    current++;
    countEl.textContent = current.toLocaleString('nl-NL');
    if (current >= total) clearInterval(counter);
  }, stepTime);
});



const bloemList = document.querySelector('.bloem-lijst');
const bloemen = document.querySelectorAll('.bloem');
const totalFlowerImages = 5;  // Zet dit bovenaan in je bestand

// Voeg een bloem toe op willekeurige positie gebaseerd op geklikte afbeelding
function addSpecificBloem(imageSrc, altText) {
  console.log('test');

  if (bloemList) {
    const randomLeft = Math.floor(Math.random() * 85) + 1;
    const randomWidth = Math.floor(Math.random() * 31) + 90;

    const bloemHTML = `
      <li style="position: absolute; left: ${randomLeft}%; width: ${randomWidth}px;">
        <img src="${imageSrc}" alt="${altText}" style="width: 100%" />
      </li>`;

    bloemList.insertAdjacentHTML('beforeend', bloemHTML);
  }
}

// POST-verzoek om bloem toe te voegen op de server en in de UI
async function postBloem() {
  const url = "/legbloem";

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const json = await response.json();

    // Voeg bloem toe in UI
    addOneBloem();

  } catch (error) {
    console.error(error.message);
  }
}

bloemen.forEach(bloem => {
  bloem.addEventListener('click', async () => {
    const imageSrc = bloem.getAttribute('src');
    const altText = bloem.getAttribute('alt');

    // Voeg bloem direct toe aan UI
    addSpecificBloem(imageSrc, altText);

    // Stuur ook POST-verzoek naar server
    try {
      const response = await fetch('/legbloem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageSrc }) // eventueel andere data meesturen
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const json = await response.json();
      console.log('Bloem succesvol gepost:', json);

    } catch (error) {
      console.error('Fout bij POST bloem:', error.message);
    }
  });
});

if (bloemList) {
  const aantalBloemen = window.numberOfRoses || 0;

  for (let i = 0; i < aantalBloemen; i++) {
    const bloem = getRandomBloem();
    addSpecificBloem(bloem.src, bloem.alt);
  }
}

function getRandomBloem() {
  const randomImageNum = Math.floor(Math.random() * totalFlowerImages) + 1;
  return {
    src: `/images/bloemen/${randomImageNum}.png`,
    alt: `bloem ${randomImageNum}`
  };
}


// familie slider

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".familySlider ul");
  const leftButton = document.querySelector(".familySlider__button--left");
  const rightButton = document.querySelector(".familySlider__button--right");

  const scrollAmount = 300; // Hoeveel pixels de slider moet scrollen per klik

  if (leftButton) {
    leftButton.addEventListener("click", () => {
      slider.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    });
  }

  if (rightButton) {
    rightButton.addEventListener("click", () => {
      slider.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    });
  }
});



// huisjes bewegeen bij scrollen

document.addEventListener("DOMContentLoaded", () => {
  const housjes = document.querySelectorAll(".housjesContainer img");

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;

    housjes.forEach((huisje) => {
      const speed = huisje.getAttribute("data-speed");
      const translateY = -scrollPosition * speed * 0.1; // Gebruik een negatieve waarde voor naar boven bewegen
      huisje.style.transform = `translateY(${translateY}px)`;
      huisje.style.opacity = 1 - scrollPosition / 500; // Laat de huisjes uitfaden
    });
  });
});


// Timeline Scroll Section

const items = document.querySelectorAll(".timeline li");
const timeline = document.querySelector(".timeline ul");
const greyLine = document.querySelector(".default-line");
const lineToDraw = document.querySelector(".draw-line");

if (lineToDraw) {
  window.addEventListener("scroll", () => {
    const redLineHeight = lineToDraw.offsetHeight;
    const greyLineHeight = greyLine.offsetHeight;
    const windowDistance = window.scrollY;
    const windowHeight = window.innerHeight / 2;
    const timelineDistance = document.querySelector(".timeline").offsetTop;

    if (windowDistance >= timelineDistance - windowHeight) {
      let line = windowDistance - timelineDistance + windowHeight;

      if (line <= greyLineHeight) {
        lineToDraw.style.height = `${line + 20}px`;
      }
    }

    const bottom = lineToDraw.getBoundingClientRect().top + window.scrollY + lineToDraw.offsetHeight;

    items.forEach((item) => {
      const circleTop = item.getBoundingClientRect().top + window.scrollY;


      if (bottom > circleTop) {
        item.classList.add("in-view");
      } else {
        item.classList.remove("in-view");
      }
    });
  });
}

const straatSelect = document.querySelector('#straatSelect');

if (straatSelect) {
  straatSelect.addEventListener('change', () => {
    const geselecteerdeStraat = straatSelect.value.trim();
    muur.innerHTML = ''; // Leegmaken

    console.log('Geselecteerde straat:', geselecteerdeStraat);

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

document.addEventListener('DOMContentLoaded', function () {
  const zoekInput = document.getElementById('zoekInput');
  const familieKaarten = document.querySelectorAll('.familie-kaart');

  if (!zoekInput || !familieKaarten) return;

  zoekInput.addEventListener('input', function () {
    const zoekterm = zoekInput.value.toLowerCase();

    familieKaarten.forEach(kaart => {
      const naam = kaart.getAttribute('data-naam');
      const zichtbaar = naam.includes(zoekterm);
      kaart.style.display = zichtbaar ? '' : 'none';
    });
  });
});

