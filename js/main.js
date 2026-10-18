/* =========================================================
   IGREJA VIDA DA CRUZ
   THE CROSS LIFE CHURCH

   MAIN.JS
   Funções globais do sistema
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    initializeChurchSystem();

});


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

function initializeChurchSystem() {

    initializeStorage();

    initializeCurrentYear();

    initializeGlobalButtons();

    initializeMobileMenu();

    initializeSearch();

}


/* =========================================================
   LOCAL STORAGE
   ========================================================= */

function initializeStorage() {

    const defaultData = {

        countries: [],

        provinces: [],

        districts: [],

        zones: [],

        churches: [],

        members: [],

        administrators: [],

        leaders: [],

        departments: [],

        events: [],

        news: [],

        media: []

    };


    Object.keys(defaultData).forEach(key => {

        if (!localStorage.getItem(`ivc_${key}`)) {

            localStorage.setItem(
                `ivc_${key}`,
                JSON.stringify(defaultData[key])
            );

        }

    });

}


/* =========================================================
   STORAGE HELPERS
   ========================================================= */

function getStorageData(key) {

    try {

        return JSON.parse(
            localStorage.getItem(`ivc_${key}`)
        ) || [];

    } catch (error) {

        console.error(
            `Erro ao carregar ${key}:`,
            error
        );

        return [];

    }

}


function saveStorageData(key, data) {

    localStorage.setItem(
        `ivc_${key}`,
        JSON.stringify(data)
    );

}


/* =========================================================
   ID ÚNICO
   ========================================================= */

function generateID(prefix = "id") {

    return `${prefix}_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 9)}`;

}


/* =========================================================
   DATA ACTUAL
   ========================================================= */

function getCurrentDate() {

    return new Date()
        .toISOString()
        .split("T")[0];

}


function getCurrentDateTime() {

    return new Date().toISOString();

}


/* =========================================================
   ANO AUTOMÁTICO
   ========================================================= */

function initializeCurrentYear() {

    const year =
        new Date().getFullYear();

    document
        .querySelectorAll("[data-current-year]")
        .forEach(element => {

            element.textContent = year;

        });

}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(
    message,
    type = "success"
) {

    let container =
        document.querySelector(".toast-container");


    if (!container) {

        container =
            document.createElement("div");

        container.className =
            "toast-container";

        container.style.cssText = `
            position:fixed;
            right:20px;
            bottom:20px;
            z-index:99999;
            display:flex;
            flex-direction:column;
            gap:10px;
        `;

        document.body.appendChild(container);

    }


    const toast =
        document.createElement("div");

    toast.className =
        `toast toast-${type}`;

    const colors = {

        success: "#16834a",
        error: "#d71920",
        warning: "#c27a00",
        info: "#222"

    };


    toast.style.cssText = `
        min-width:280px;
        max-width:420px;
        padding:14px 18px;
        color:white;
        background:${colors[type] || colors.info};
        border-radius:10px;
        box-shadow:0 10px 35px rgba(0,0,0,.18);
        font-size:13px;
        font-weight:700;
        animation:ivcToastIn .3s ease;
    `;


    toast.textContent =
        message;


    container.appendChild(toast);


    setTimeout(() => {

        toast.style.opacity = "0";

        toast.style.transform =
            "translateY(10px)";

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 3500);

}


/* =========================================================
   CONFIRMAÇÃO
   ========================================================= */

function confirmAction(message) {

    return window.confirm(message);

}


/* =========================================================
   BOTÕES GLOBAIS
   ========================================================= */

function initializeGlobalButtons() {

    document
        .querySelectorAll("[data-back]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => window.history.back()
            );

        });


    document
        .querySelectorAll("[data-print]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => window.print()
            );

        });

}


/* =========================================================
   MENU MOBILE
   ========================================================= */

function initializeMobileMenu() {

    const toggle =
        document.querySelector("[data-mobile-menu]");

    const menu =
        document.querySelector("[data-mobile-menu-target]");


    if (!toggle || !menu) {

        return;

    }


    toggle.addEventListener(
        "click",
        () => {

            menu.classList.toggle("open");

            toggle.classList.toggle("active");

        }
    );

}


/* =========================================================
   PESQUISA GLOBAL
   ========================================================= */

function initializeSearch() {

    document
        .querySelectorAll("[data-global-search]")
        .forEach(input => {

            input.addEventListener(
                "input",
                event => {

                    const query =
                        event.target.value
                            .toLowerCase()
                            .trim();

                    document
                        .querySelectorAll(
                            "[data-search-item]"
                        )
                        .forEach(item => {

                            const text =
                                item.textContent
                                    .toLowerCase();

                            item.style.display =
                                !query ||
                                text.includes(query)
                                    ? ""
                                    : "none";

                        });

                }
            );

        });

}


/* =========================================================
   MODAL
   ========================================================= */

function openModal(id) {

    const modal =
        document.getElementById(id);

    if (!modal) return;

    modal.classList.add("active");

    document.body.classList.add(
        "modal-open"
    );

}


function closeModal(id) {

    const modal =
        document.getElementById(id);

    if (!modal) return;

    modal.classList.remove("active");

    document.body.classList.remove(
        "modal-open"
    );

}


document.addEventListener(
    "click",
    event => {

        if (
            event.target.matches(
                "[data-modal-close]"
            )
        ) {

            const modal =
                event.target.closest(".modal");

            if (modal) {

                modal.classList.remove(
                    "active"
                );

            }

        }

    }
);


/* =========================================================
   EXPORTAÇÃO GLOBAL
   ========================================================= */

window.IVC = {

    getStorageData,

    saveStorageData,

    generateID,

    getCurrentDate,

    getCurrentDateTime,

    showToast,

    confirmAction,

    openModal,

    closeModal

};