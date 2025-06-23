// --- ¿SABÍAS QUÉ? --- //
const datosCuriosos = [
  "La luz del Sol tarda 8 minutos y 20 segundos en llegar a la Tierra.",
  "La Vía Láctea contiene entre 100 y 400 mil millones de estrellas.",
  "En Júpiter y Saturno puede llover diamantes debido a la presión atmosférica.",
  "La estrella Betelgeuse en Orión es tan grande que si estuviera en el lugar del Sol, llegaría más allá de la órbita de Marte.",
  "La Estación Espacial Internacional da una vuelta completa a la Tierra cada 90 minutos.",
  "El Telescopio Espacial James Webb puede observar el universo tal como era hace más de 13.000 millones de años.",
  "El Observatorio Vera Rubin estudiará energía oscura y realizará un mapeo profundo del cielo con el proyecto LSST.",
  "Las Pléyades, también conocidas como 'Las Siete Hermanas', son visibles a simple vista y han sido registradas desde la antigüedad.",
  "La galaxia más lejana observada hasta ahora está a más de 13.400 millones de años luz de distancia.",
  "Un agujero negro supermasivo puede tener masas equivalentes a miles de millones de veces la del Sol."
];

const mostrarDatoCurioso = () => {
  const dato = datosCuriosos[Math.floor(Math.random() * datosCuriosos.length)];
  document.getElementById("datoCurioso").innerText = dato;
};

// --- NOTICIAS NASA --- //
const mostrarNoticias = () => {
  const urlNASA = "https://api.rss2json.com/v1/api.json?rss_url=https://www.nasa.gov/rss/dyn/breaking_news.rss";
  fetch(urlNASA)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("noticias-container");
      container.innerHTML = "";
      data.items.slice(0, 5).forEach(noticia => {
        const div = document.createElement("div");
        div.className = "noticia";
        div.innerHTML = `
          <h3>${noticia.title}</h3>
          <p>${noticia.description}</p>
          <a href="${noticia.link}" target="_blank">Leer más</a>
          <br>
          <button onclick="guardarFavorita('${noticia.title.replace(/'/g, "\\'")}')">⭐ Guardar</button>
        `;
        container.appendChild(div);
      });
    });
};

// --- FAVORITAS LOCAL --- //
const guardarFavorita = (titulo) => {
  let favoritas = JSON.parse(localStorage.getItem("favoritas")) || [];
  if (!favoritas.includes(titulo)) {
    favoritas.push(titulo);
    localStorage.setItem("favoritas", JSON.stringify(favoritas));
    alert("¡Noticia guardada!");
  }
};

// --- JWST --- //
const mostrarJWST = () => {
  const urlJWST = "https://api.rss2json.com/v1/api.json?rss_url=https://www.jwst.nasa.gov/rss.xml";
  fetch(urlJWST)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("jwst-container");
      container.innerHTML = "";
      data.items.slice(0, 3).forEach(noticia => {
        const div = document.createElement("div");
        div.className = "noticia";
        div.innerHTML = `
          <h3>${noticia.title}</h3>
          <p>${noticia.description}</p>
          <a href="${noticia.link}" target="_blank">Leer más</a>
        `;
        container.appendChild(div);
      });
    });
};

// --- RUBIN OBSERVATORY (desde su web oficial) --- //
const traducirTexto = async (texto) => {
  const url = "https://api.mymemory.translated.net/get?q=" + encodeURIComponent(texto) + "&langpair=en|es";
  const res = await fetch(url);
  const data = await res.json();
  return data.responseData.translatedText;
};

const mostrarRubinDesdePhys = async () => {
  const url = "https://api.rss2json.com/v1/api.json?rss_url=https://phys.org/rss-feed/space-news/astronomy/";

  try {
    const res = await fetch(url);
    const data = await res.json();
    const container = document.getElementById("rubin-container");
    container.innerHTML = "";

    const noticiasRubin = data.items.filter(item =>
      item.title.toLowerCase().includes("rubin") || item.title.toLowerCase().includes("lsst")
    );

    if (noticiasRubin.length === 0) {
      container.innerHTML = "<p>No hay noticias recientes del Rubin Observatory.</p>";
      return;
    }

    for (let noticia of noticiasRubin.slice(0, 3)) {
      const tituloTraducido = await traducirTexto(noticia.title);
      const div = document.createElement("div");
      div.className = "noticia";
      div.innerHTML = `
        <img src="${noticia.thumbnail || 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Rubin_Observatory_logo.png/600px-Rubin_Observatory_logo.png'}" alt="Imagen Rubin" style="max-width:100%; border-radius:12px; margin-bottom:8px;">
        <h3>${tituloTraducido}</h3>
        <p>${noticia.description}</p>
        <a href="${noticia.link}" target="_blank">🔗 Leer más</a>
        <button onclick="guardarFavorita('${noticia.title}')">⭐ Guardar</button>
      `;
      container.appendChild(div);
    }
  } catch (error) {
    console.error("Error cargando noticias del Rubin:", error);
    document.getElementById("rubin-container").innerHTML =
      "<p>🌌 No fue posible cargar noticias del Rubin Telescope.</p>";
  }
};






// --- CONSTELACIONES --- //
const mostrarConstelaciones = () => {
  const contenedor = document.getElementById("datos-constelaciones");
  contenedor.style.display = "block";
  contenedor.innerHTML = `
    <ul>
      <li><strong>Orión</strong>: visible en el hemisferio norte durante el invierno.</li>
      <li><strong>Cruz del Sur</strong>: visible en el hemisferio sur, usada para orientación.</li>
      <li><strong>Escorpio</strong>: destaca por su forma curva y brillante Antares.</li>
      <li><strong>Pléyades</strong>: cúmulo abierto en Tauro, también llamado "Las Siete Hermanas".</li>
    </ul>
  `;
};

// --- ESA --- //
const mostrarESA = () => {
  const urlESA = "https://api.rss2json.com/v1/api.json?rss_url=https://www.esa.int/rssfeed/Our_Activities/Space_Science";
  fetch(urlESA)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("esa-container");
      container.innerHTML = "";
      data.items.slice(0, 3).forEach(noticia => {
        const div = document.createElement("div");
        div.className = "noticia";
        div.innerHTML = `
          <h3>${noticia.title}</h3>
          <p>${noticia.description}</p>
          <a href="${noticia.link}" target="_blank">Leer más</a>
        `;
        container.appendChild(div);
      });
    });
};

// --- Space.com --- //
const mostrarSpaceCom = () => {
  const url = "https://api.rss2json.com/v1/api.json?rss_url=https://www.space.com/feeds/all";
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("spacecom-container");
      container.innerHTML = "";
      const filtradas = data.items.filter(item =>
        item.title.toLowerCase().includes("astronomy") ||
        item.title.toLowerCase().includes("telescope") ||
        item.title.toLowerCase().includes("space")
      );
      filtradas.slice(0, 3).forEach(noticia => {
        const div = document.createElement("div");
        div.className = "noticia";
        div.innerHTML = `
          <h3>${noticia.title}</h3>
          <p>${noticia.description}</p>
          <a href="${noticia.link}" target="_blank">Leer más</a>
        `;
        container.appendChild(div);
      });
    });
};

// --- HUBBLE --- //
const mostrarHubble = () => {
  const urlHubble = "https://api.rss2json.com/v1/api.json?rss_url=https://hubblesite.org/api/v3/rss/news_release";
  fetch(urlHubble)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("hubble-container");
      container.innerHTML = "";
      data.items.slice(0, 3).forEach(noticia => {
        const div = document.createElement("div");
        div.className = "noticia";
        div.innerHTML = `
          <h3>${noticia.title}</h3>
          <p>${noticia.description}</p>
          <a href="${noticia.link}" target="_blank">Leer más</a>
        `;
        container.appendChild(div);
      });
    });
};

// --- ALMA --- //
const mostrarALMA = () => {
  const urlALMA = "https://api.rss2json.com/v1/api.json?rss_url=https://www.almaobservatory.org/en/feed/";
  fetch(urlALMA)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("alma-container");
      container.innerHTML = "";
      data.items.slice(0, 3).forEach(noticia => {
        const div = document.createElement("div");
        div.className = "noticia";
        div.innerHTML = `
          <h3>${noticia.title}</h3>
          <p>${noticia.description}</p>
          <a href="${noticia.link}" target="_blank">Leer más</a>
        `;
        container.appendChild(div);
      });
    });
};


// --- INICIO --- //
window.onload = () => {
  mostrarDatoCurioso();
  mostrarNoticias();
  mostrarJWST();
  mostrarRubinDesdePhys(); // ← esta función es la nueva
  mostrarESA();
  mostrarSpaceCom();
  mostrarHubble();
  mostrarALMA();
};

