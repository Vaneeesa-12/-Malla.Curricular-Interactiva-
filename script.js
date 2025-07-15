// ========== DATOS ==========
const malla = [
  {
    periodo: "Periodo 1",
    materias: [
      { nombre: "Introducción a la administración ambiental y de los recursos naturales", creditos: 2 },
      { nombre: "Ecología", creditos: 3 },
      { nombre: "Cátedra unadista", creditos: 3 },
      { nombre: "Fundamentos y generalidades de la investigación", creditos: 3 },
      { nombre: "Competencias comunicativas", creditos: 3 },
      { nombre: "Pensamiento lógico y matemático", creditos: 3 }
    ]
  },
  {
    periodo: "Periodo 2",
    materias: [
      { nombre: "Inglés A1", creditos: 3, prerrequisitos: [] },
      { nombre: "Biología ambiental", creditos: 3, prerrequisitos: ["Ecología"] },
      { nombre: "Ética y ciudadanía", creditos: 3 },
      { nombre: "Herramientas digitales para la gestión del conocimiento", creditos: 3, prerrequisitos: ["Fundamentos y generalidades de la investigación"] },
      { nombre: "Pensamiento administrativo", creditos: 3 },
      { nombre: "Cálculo diferencial", creditos: 3, prerrequisitos: ["Pensamiento lógico y matemático"] }
    ]
  },
  {
    periodo: "Periodo 3",
    materias: [
      { nombre: "Inglés A2", creditos: 3, prerrequisitos: ["Inglés A1"] },
      { nombre: "Biodiversidad y servicios ecosistémicos", creditos: 3, prerrequisitos: ["Biología ambiental"] },
      { nombre: "Microbiología ambiental", creditos: 3 },
      { nombre: "Microeconomía", creditos: 3 },
      { nombre: "Contabilidad financiera básica", creditos: 3 },
      { nombre: "Estadística descriptiva aplicada a las ciencias agrarias", creditos: 3, prerrequisitos: ["Cálculo diferencial"] }
    ]
  },
  {
    periodo: "Periodo 4",
    materias: [
      { nombre: "Inglés B1", creditos: 3, prerrequisitos: ["Inglés A2"] },
      { nombre: "Gestión integral de residuos sólidos", creditos: 2 },
      { nombre: "Química ambiental", creditos: 3, prerrequisitos: ["Biodiversidad y servicios ecosistémicos"] },
      { nombre: "Macroeconomía", creditos: 3 },
      { nombre: "Matemáticas financiera", creditos: 3, prerrequisitos: ["Contabilidad financiera básica"] },
      { nombre: "Electiva interdisciplinar básica común", creditos: 3 }
    ]
  },
  {
    periodo: "Periodo 5",
    materias: [
      { nombre: "Inglés B2", creditos: 3, prerrequisitos: ["Inglés B1"] },
      { nombre: "Sistemas de abastecimiento de agua", creditos: 3 },
      { nombre: "Caracterización de contaminación atmosféricos", creditos: 3 },
      { nombre: "Mercadeo e investigación de mercados", creditos: 3 },
      { nombre: "Gerencia estratégica de costos y presupuestos", creditos: 3 },
      { nombre: "Electiva interdisciplinar básica común", creditos: 3 },
      { nombre: "Electiva campo de formación complementario", creditos: 1 }
    ]
  },
  {
    periodo: "Periodo 6",
    materias: [
      { nombre: "Política y legislación ambiental", creditos: 2, prerrequisitos: ["Inglés B2"] },
      { nombre: "Sistemas de tratamiento de aguas residuales", creditos: 3 },
      { nombre: "Epidemiología ambiental", creditos: 3 },
      { nombre: "Gestión de talento humano", creditos: 3 },
      { nombre: "Finanzas corporativas para la toma de decisiones", creditos: 3, prerrequisitos: ["Gerencia estratégica de costos y presupuestos"] },
      { nombre: "Electiva disciplinar común", creditos: 2 },
      { nombre: "Electiva campo de formación complementario", creditos: 2 }
    ]
  },
  {
    periodo: "Periodo 7",
    materias: [
      { nombre: "Selección de tecnologías limpias", creditos: 2 },
      { nombre: "Sistemas de información geográfica", creditos: 3 },
      { nombre: "Salud pública", creditos: 3, prerrequisitos: ["Epidemiología ambiental"] },
      { nombre: "Legislación empresarial", creditos: 3 },
      { nombre: "Gerencia estratégica de las operaciones", creditos: 3 },
      { nombre: "Electiva disciplinar específica", creditos: 3 }
    ]
  },
  {
    periodo: "Periodo 8",
    materias: [
      { nombre: "Sistemas de gestión ambiental empresarial", creditos: 3 },
      { nombre: "Ordenamiento territorial", creditos: 2, prerrequisitos: ["Sistemas de información geográfica"] },
      { nombre: "Saneamiento ambiental urbano y rural", creditos: 3, prerrequisitos: ["Salud pública"] },
      { nombre: "Opción de grado(ambiental)", creditos: 3 },
      { nombre: "Planeación prospectiva y emprendimiento", creditos: 3 },
      { nombre: "Electiva disciplinar específica", creditos: 3 }
    ]
  },
  {
    periodo: "Periodo 9",
    materias: [
      { nombre: "Administración ambiental y de los recursos naturales de", creditos: 2 },
      { nombre: "Valoración económica del ambiente", creditos: 2, prerrequisitos: ["Ordenamiento territorial"] },
      { nombre: "Evaluación de riesgos ambientales", creditos: 3, prerrequisitos: ["Saneamiento ambiental urbano y rural"] },
      { nombre: "Diseño y evaluación Ambiental de proyectos", creditos: 3, prerrequisitos: ["Opción de grado(ambiental)"] },
      { nombre: "Electiva disciplinar específica", creditos: 3 },
      { nombre: "Electiva disciplinar común", creditos: 2 },
      { nombre: "Electiva campo de formación complementario", creditos: 1 }
    ]
  }
];

// ========== CARGAR MALLA ==========
const contenedor = document.getElementById("malla-curricular");
let totalCreditos = 0;
let completados = 0;

document.addEventListener("DOMContentLoaded", () => {
  cargarDesdeLocalStorage();
  renderMalla();
  actualizarProgreso();
  verificarPendientes();
});

// ========== FUNCIONES PRINCIPALES ==========

function renderMalla() {
  contenedor.innerHTML = "";
  totalCreditos = 0;
  completados = 0;

  malla.forEach((bloque, i) => {
    const columna = document.createElement("div");
    columna.className = "periodo";
    const titulo = document.createElement("h2");
    titulo.textContent = bloque.periodo;
    columna.appendChild(titulo);

    bloque.materias.forEach(materia => {
      const div = document.createElement("div");
      div.className = "materia";
      div.textContent = materia.nombre;
      div.setAttribute("data-nombre", materia.nombre);

      // Etiquetas de tipo
      if (materia.nombre.toLowerCase().includes("inglés")) div.classList.add("ingles");
      if (materia.nombre.toLowerCase().includes("electiva")) div.classList.add("electiva");
      if (materia.prerrequisitos) div.classList.add("prerrequisito");

      // Créditos
      const span = document.createElement("span");
      span.className = "credito";
      span.textContent = `${materia.creditos} créditos`;
      div.appendChild(span);

      totalCreditos += materia.creditos;

      // Completadas
      if (localStorage.getItem(materia.nombre) === "true") {
        div.classList.add("tachada");
        completados += materia.creditos;
      }

      // Bloqueo
      if (!requisitosCumplidos(materia)) {
        div.classList.add("bloqueada");
      }

      div.addEventListener("click", () => toggleMateria(div, materia));
      columna.appendChild(div);
    });

    contenedor.appendChild(columna);
  });

  document.getElementById("creditos-totales").textContent = totalCreditos;
  document.getElementById("creditos-completados").textContent = completados;
  document.getElementById("relleno-barra").style.width = `${(completados / totalCreditos) * 100}%`;
}

function toggleMateria(div, materia) {
  if (div.classList.contains("bloqueada")) return;

  const tachada = div.classList.toggle("tachada");
  localStorage.setItem(materia.nombre, tachada);
  renderMalla();
  actualizarProgreso();
  verificarPendientes();
}

function requisitosCumplidos(materia) {
  if (!materia.prerrequisitos) return true;
  return materia.prerrequisitos.every(req => localStorage.getItem(req) === "true");
}

function actualizarProgreso() {
  const completados = [...document.querySelectorAll(".materia.tachada")].reduce((acc, el) => {
    const txt = el.querySelector("span")?.textContent || "";
    const match = txt.match(/\d+/);
    return acc + (match ? parseInt(match[0]) : 0);
  }, 0);

  document.getElementById("creditos-completados").textContent = completados;
  document.getElementById("relleno-barra").style.width = `${(completados / totalCreditos) * 100}%`;
}

function cargarDesdeLocalStorage() {
  malla.forEach(bloque => {
    bloque.materias.forEach(materia => {
      if (!localStorage.getItem(materia.nombre)) {
        localStorage.setItem(materia.nombre, "false");
      }
    });
  });
}

function reiniciarMalla() {
  if (confirm("¿Deseas reiniciar todo el progreso?")) {
    localStorage.clear();
    renderMalla();
    actualizarProgreso();
    verificarPendientes();
  }
}

function verificarPendientes() {
  const pendientes = [];
  malla.forEach((bloque, i) => {
    if (i >= 1) {
      bloque.materias.forEach(materia => {
        if (!localStorage.getItem(materia.nombre) || localStorage.getItem(materia.nombre) === "false") {
          const requisitos = materia.prerrequisitos || [];
          const cumplidos = requisitos.every(req => localStorage.getItem(req) === "true");
          if (!cumplidos) {
            pendientes.push(materia.nombre);
          }
        }
      });
    }
  });

  const lista = document.getElementById("lista-pendientes");
  const cont = document.getElementById("pendientes-container");

  if (pendientes.length > 0) {
    lista.innerHTML = "";
    cont.style.display = "block";
    pendientes.forEach(p => {
      const li = document.createElement("li");
      li.textContent = p;
      lista.appendChild(li);
    });
  } else {
    cont.style.display = "none";
  }
}

function buscarMateria() {
  const input = document.getElementById("buscador").value.toLowerCase();
  const materias = document.querySelectorAll(".materia");

  materias.forEach(m => {
    const nombre = m.getAttribute("data-nombre").toLowerCase();
    m.style.display = nombre.includes(input) ? "flex" : "none";
  });
}

function toggleModo() {
  document.body.classList.toggle("modo-oscuro");
}

function exportarPDF() {
  window.print();
}

function iniciarMalla() {
  document.getElementById("pantalla-bienvenida").style.display = "none";
  document.getElementById("contenido-malla").style.display = "block";
}
