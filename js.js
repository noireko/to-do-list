const btnAdd = document.getElementById("btnAgregar");
const sectTareas = document.getElementById("sectTareas");
const tituInput = document.getElementById("tituloInput")
const fechaInput = document.getElementById("fechaInput")
const descInput = document.getElementById("descInput")
const pagAct = document.getElementById("paginaActual");
const btnDel = document.getElementById("btnElim")

let listaTareas = JSON.parse(localStorage.getItem("listaTareas")) || [];

const maxPorHoja = 4;
let currentPage = 0; 

function agregarTarea() {

  if (tituInput.value === "") {
    alert("Debe ingresar un título");
    return
  }

  const tarea = {
    titulo: tituInput.value,
    fecha: fechaInput.value,
    descripcion: descInput.value,
  }

  listaTareas.push(tarea);
  localStorage.setItem("listaTareas", JSON.stringify(listaTareas));

  tituInput.value = "";
  fechaInput.value = "";
  descInput.value = "";

  window.location.href = "tareas.html";
}

const mostrarTarea = () => {
  sectTareas.innerHTML = "";
  const start = currentPage * maxPorHoja;
  const end = start + maxPorHoja;
  const tareasPagina = listaTareas.slice(start, end);
  tareasPagina.forEach((tarea, index) => {
    sectTareas.innerHTML += `
      <div class="tarea-item" id="item-tarea">
        <h2 class="titulo-tarea">${tarea.titulo}</h2>
        <p class="fecha-tarea">${tarea.fecha}</p>
        <p class="des-tarea">${tarea.descripcion}</p>
        <button class="boton-elimtarea activo" id="btnElim" onclick="eliminarTarea(${start + index})">Eliminar</button>
      </div>
    `;
  });
  if (pagAct) {
  pagAct.innerText = currentPage + 1;
}
}

const mostrarBtnDel = () => {
  const botones = document.querySelectorAll(".boton-elimtarea");
  botones.forEach(boton => {
    boton.classList.toggle("activo");
  });
}


if (sectTareas) {
  mostrarTarea();
}


const eliminarTarea = (index) => {
  listaTareas.splice(index, 1);
  localStorage.setItem("listaTareas", JSON.stringify(listaTareas));

  if (currentPage > 0 && currentPage * maxPorHoja >= listaTareas.length) {
    currentPage--;
  }
  mostrarTarea();
}

window.eliminarTarea = eliminarTarea;

btnAdd.addEventListener("click", agregarTarea);

function paginaSiguiente() {
  if ((currentPage + 1) * maxPorHoja < listaTareas.length) {
    currentPage++;
    mostrarTarea();
  }
}

function paginaAnterior() {
  if (currentPage > 0) {
    currentPage--;
    mostrarTarea();
  }
}

window.paginaSiguiente = paginaSiguiente;
window.paginaAnterior = paginaAnterior;

