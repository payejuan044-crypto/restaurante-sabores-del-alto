"use strict";

document.addEventListener("DOMContentLoaded", function () {
    // CREDENCIALES DE ACCESO
    const USUARIO_VALIDO = "admin";
    const PASS_VALIDO = "2468";

    const loginForm = document.getElementById("loginForm");

    // 1. PROTECCIÓN DE RUTAS
    if (!loginForm) {
        const sesionActiva = localStorage.getItem("sesionRestaurante");
        if (sesionActiva !== "activa") {
            window.location.href = "../index.html";
            return;
        }
    }

    // 2. VALIDACIÓN DE LOGIN
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const inputUsuario = document.getElementById("usuario");
            const inputPassword = document.getElementById("password");
            const mensajeError = document.getElementById("mensajeError");

            if (!inputUsuario || !inputPassword || !mensajeError) {
                return;
            }

            const usuario = inputUsuario.value.trim();
            const password = inputPassword.value.trim();

            if (usuario === "" || password === "") {
                mensajeError.textContent = "Error: Todos los campos son obligatorios.";
                return;
            }

            if (usuario === USUARIO_VALIDO && password === PASS_VALIDO) {
                mensajeError.textContent = "";
                localStorage.setItem("sesionRestaurante", "activa");
                window.location.href = "pages/inicio.html";
            } else {
                mensajeError.textContent = "Error: Usuario o contraseña incorrectos.";
            }
        });
    }

    // 3. BOTÓN CERRAR SESIÓN
    const btnSalir = document.getElementById("btnSalir");
    if (btnSalir) {
        btnSalir.addEventListener("click", function () {
            localStorage.removeItem("sesionRestaurante");
            window.location.href = "../index.html";
        });
    }

    // 4. REGISTRO DE RESERVAS
    const formReserva = document.getElementById("formReserva");
    if (formReserva) {
        formReserva.addEventListener("submit", function (e) {
            e.preventDefault();
            const inputCliente = document.getElementById("cliente");
            const inputPersonas = document.getElementById("personas");
            const inputHora = document.getElementById("hora");
            const lista = document.getElementById("listaReservas");

            if (!inputCliente || !inputPersonas || !inputHora || !lista) {
                return;
            }

            const cliente = inputCliente.value.trim();
            const personas = Number(inputPersonas.value);
            const hora = inputHora.value;

            if (cliente === "" || personas <= 0 || hora === "") {
                alert("Por favor, completa todos los datos de la reserva.");
                return;
            }

            const nuevoItem = document.createElement("li");
            const negrita = document.createElement("strong");
            negrita.textContent = cliente;

            nuevoItem.appendChild(negrita);
            nuevoItem.appendChild(document.createTextNode(" - " + personas + " pers. (" + hora + ")"));
            lista.appendChild(nuevoItem);

            formReserva.reset();
        });
    }

    // 5. GESTIÓN DE PEDIDOS EN MENÚ (Sin usar onclick en HTML)
    let total = 0;
    const botonesAgregar = document.querySelectorAll(".btn-agregar");
    const btnCobrar = document.getElementById("btnCobrar");
    const listaPedido = document.getElementById("listaPedido");
    const totalSpan = document.getElementById("totalPedido");

    if (botonesAgregar.length > 0 && listaPedido && totalSpan) {
        botonesAgregar.forEach(function (boton) {
            boton.addEventListener("click", function () {
                const plato = boton.getAttribute("data-plato");
                const precio = Number(boton.getAttribute("data-precio"));

                if (!plato || isNaN(precio)) {
                    return;
                }

                const item = document.createElement("li");
                item.textContent = plato + " - Bs. " + precio.toFixed(2);
                listaPedido.appendChild(item);

                total += precio;
                totalSpan.textContent = total.toFixed(2);
            });
        });
    }

    if (btnCobrar && listaPedido && totalSpan) {
        btnCobrar.addEventListener("click", function () {
            if (total === 0) {
                alert("No hay platos agregados en el pedido actual.");
                return;
            }

            listaPedido.innerHTML = "";
            total = 0;
            totalSpan.textContent = "0.00";
            alert("Pedido cobrado exitosamente y mesa liberada.");
        });
    }
});