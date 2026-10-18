/* =========================================================
   MAP.JS
   MAPA E LOCALIZAÇÃO DAS IGREJAS
   IGREJA VIDA DA CRUZ
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", initializeMap);

function initializeMap() {

    renderChurchMarkers();

    initializeMapFilters();

}


/* =========================================================
   OBTER IGREJAS COM COORDENADAS
   ========================================================= */

function getMappedChurches() {

    const churches =
        IVC.getStorageData("churches");

    return churches.filter(church =>
        church.latitude !== "" &&
        church.longitude !== "" &&
        church.latitude !== null &&
        church.longitude !== null
    );

}


/* =========================================================
   GOOGLE MAPS
   ========================================================= */

function createGoogleMapsLink(latitude, longitude) {

    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

}


/* =========================================================
   RENDER MAPA
   ========================================================= */

function renderChurchMarkers() {

    const container =
        document.querySelector("[data-map-churches]");

    if (!container) return;

    const churches =
        getMappedChurches();

    if (!churches.length) {

        container.innerHTML = `
            <div class="empty-state">

                <div class="empty-state-icon">
                    📍
                </div>

                <strong>
                    Nenhuma igreja possui localização cadastrada.
                </strong>

                <p>
                    Adicione latitude e longitude ao cadastrar a igreja.
                </p>

            </div>
        `;

        return;
    }


    container.innerHTML = churches.map(church => `

        <article
            class="map-church-card"
            data-search-item
        >

            <div class="map-church-icon">
                ⛪
            </div>

            <div class="map-church-content">

                <span class="badge badge-red">
                    ${escapeHTML(church.type || "Igreja")}
                </span>

                <h3>
                    ${escapeHTML(church.name)}
                </h3>

                <p>
                    📍
                    ${escapeHTML(
                        church.address ||
                        church.city ||
                        "Localização disponível no mapa"
                    )}
                </p>

                <a
                    href="${createGoogleMapsLink(
                        church.latitude,
                        church.longitude
                    )}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-primary btn-sm"
                >
                    Abrir no Google Maps
                </a>

            </div>

        </article>

    `).join("");

}


/* =========================================================
   FILTROS
   ========================================================= */

function initializeMapFilters() {

    const filter =
        document.querySelector("[data-map-filter]");

    if (!filter) return;


    filter.addEventListener("change", event => {

        const value =
            event.target.value;

        const cards =
            document.querySelectorAll(
                "[data-map-church]"
            );

        cards.forEach(card => {

            if (
                !value ||
                card.dataset.country === value
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

}


/* =========================================================
   LOCALIZAÇÃO DE UMA IGREJA
   ========================================================= */

function openChurchLocation(churchId) {

    const churches =
        IVC.getStorageData("churches");

    const church =
        churches.find(
            item => item.id === churchId
        );

    if (!church) {

        IVC.showToast(
            "Igreja não encontrada.",
            "error"
        );

        return;
    }

    if (
        !church.latitude ||
        !church.longitude
    ) {

        IVC.showToast(
            "Esta igreja ainda não possui localização.",
            "warning"
        );

        return;
    }

    window.open(
        createGoogleMapsLink(
            church.latitude,
            church.longitude
        ),
        "_blank"
    );

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   API
   ========================================================= */

window.IVCMap = {

    getMappedChurches,

    createGoogleMapsLink,

    renderChurchMarkers,

    openChurchLocation

};