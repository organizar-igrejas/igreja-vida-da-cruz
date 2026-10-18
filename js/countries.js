/* =========================================================
   COUNTRIES.JS
   SISTEMA GEOGRÁFICO DA IGREJA
   ========================================================= */

"use strict";


document.addEventListener(
    "DOMContentLoaded",
    initializeCountries
);


function initializeCountries() {

    initializeCountryForms();

    renderCountries();

    renderProvinces();

    renderDistricts();

    renderZones();

}


/* =========================================================
   PAÍSES
   ========================================================= */

function getCountries() {

    return IVC.getStorageData(
        "countries"
    );

}


function addCountry(data) {

    const countries =
        getCountries();


    const country = {

        id:
            IVC.generateID("country"),

        name:
            data.name.trim(),

        code:
            data.code
                ? data.code.trim().toUpperCase()
                : "",

        language:
            data.language || "Português",

        description:
            data.description || "",

        flag:
            data.flag || "",

        createdAt:
            IVC.getCurrentDateTime()

    };


    countries.push(country);


    IVC.saveStorageData(
        "countries",
        countries
    );


    IVC.showToast(
        "País adicionado com sucesso."
    );


    renderCountries();

    return country;

}


/* =========================================================
   PROVÍNCIAS
   ========================================================= */

function getProvinces() {

    return IVC.getStorageData(
        "provinces"
    );

}


function addProvince(data) {

    const provinces =
        getProvinces();


    const province = {

        id:
            IVC.generateID("province"),

        countryId:
            data.countryId,

        name:
            data.name.trim(),

        description:
            data.description || "",

        createdAt:
            IVC.getCurrentDateTime()

    };


    provinces.push(province);


    IVC.saveStorageData(
        "provinces",
        provinces
    );


    IVC.showToast(
        "Província adicionada."
    );


    renderProvinces();

    return province;

}


/* =========================================================
   DISTRITOS
   ========================================================= */

function getDistricts() {

    return IVC.getStorageData(
        "districts"
    );

}


function addDistrict(data) {

    const districts =
        getDistricts();


    const district = {

        id:
            IVC.generateID("district"),

        countryId:
            data.countryId,

        provinceId:
            data.provinceId,

        name:
            data.name.trim(),

        description:
            data.description || "",

        createdAt:
            IVC.getCurrentDateTime()

    };


    districts.push(district);


    IVC.saveStorageData(
        "districts",
        districts
    );


    IVC.showToast(
        "Distrito adicionado."
    );


    renderDistricts();

    return district;

}


/* =========================================================
   ZONAS
   ========================================================= */

function getZones() {

    return IVC.getStorageData(
        "zones"
    );

}


function addZone(data) {

    const zones =
        getZones();


    const zone = {

        id:
            IVC.generateID("zone"),

        countryId:
            data.countryId,

        provinceId:
            data.provinceId,

        districtId:
            data.districtId,

        name:
            data.name.trim(),

        location:
            data.location || "",

        description:
            data.description || "",

        image:
            data.image || "",

        createdAt:
            IVC.getCurrentDateTime()

    };


    zones.push(zone);


    IVC.saveStorageData(
        "zones",
        zones
    );


    IVC.showToast(
        "Zona adicionada com sucesso."
    );


    renderZones();

    return zone;

}


/* =========================================================
   FORMULÁRIOS
   ========================================================= */

function initializeCountryForms() {

    const countryForm =
        document.querySelector(
            "#countryForm"
        );


    if (countryForm) {

        countryForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const formData =
                    new FormData(countryForm);


                addCountry({

                    name:
                        formData.get("name"),

                    code:
                        formData.get("code"),

                    language:
                        formData.get("language"),

                    description:
                        formData.get(
                            "description"
                        ),

                    flag:
                        formData.get("flag")

                });


                countryForm.reset();

            }
        );

    }


    const provinceForm =
        document.querySelector(
            "#provinceForm"
        );


    if (provinceForm) {

        provinceForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const formData =
                    new FormData(
                        provinceForm
                    );


                addProvince({

                    countryId:
                        formData.get(
                            "countryId"
                        ),

                    name:
                        formData.get("name"),

                    description:
                        formData.get(
                            "description"
                        )

                });


                provinceForm.reset();

            }
        );

    }


    const districtForm =
        document.querySelector(
            "#districtForm"
        );


    if (districtForm) {

        districtForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const formData =
                    new FormData(
                        districtForm
                    );


                addDistrict({

                    countryId:
                        formData.get(
                            "countryId"
                        ),

                    provinceId:
                        formData.get(
                            "provinceId"
                        ),

                    name:
                        formData.get("name"),

                    description:
                        formData.get(
                            "description"
                        )

                });


                districtForm.reset();

            }
        );

    }


    const zoneForm =
        document.querySelector(
            "#zoneForm"
        );


    if (zoneForm) {

        zoneForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const formData =
                    new FormData(zoneForm);


                addZone({

                    countryId:
                        formData.get(
                            "countryId"
                        ),

                    provinceId:
                        formData.get(
                            "provinceId"
                        ),

                    districtId:
                        formData.get(
                            "districtId"
                        ),

                    name:
                        formData.get("name"),

                    location:
                        formData.get(
                            "location"
                        ),

                    description:
                        formData.get(
                            "description"
                        ),

                    image:
                        formData.get("image")

                });


                zoneForm.reset();

            }
        );

    }

}


/* =========================================================
   RENDER COUNTRIES
   ========================================================= */

function renderCountries() {

    const container =
        document.querySelector(
            "[data-countries-list]"
        );


    if (!container) return;


    const countries =
        getCountries();


    if (!countries.length) {

        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🌍</div>
                <strong>Nenhum país cadastrado.</strong>
                <p>Adicione Malawi ou Moçambique.</p>
            </div>
        `;

        return;

    }


    container.innerHTML =
        countries.map(country => `

            <article
                class="card"
                data-search-item
            >

                <div class="card-body">

                    <span class="badge badge-red">
                        ${country.code}
                    </span>

                    <h3>
                        ${country.flag || "🌍"}
                        ${escapeHTML(country.name)}
                    </h3>

                    <p class="text-muted">
                        ${escapeHTML(
                            country.language
                        )}
                    </p>

                    <button
                        class="btn btn-primary btn-sm"
                        onclick="selectCountry('${country.id}')"
                    >
                        Abrir país
                    </button>

                </div>

            </article>

        `).join("");

}


/* =========================================================
   RENDER PROVINCES
   ========================================================= */

function renderProvinces() {

    const container =
        document.querySelector(
            "[data-provinces-list]"
        );


    if (!container) return;


    const provinces =
        getProvinces();


    container.innerHTML =
        provinces.map(province => {

            const country =
                getCountries()
                    .find(
                        item =>
                            item.id ===
                            province.countryId
                    );


            return `

                <article
                    class="card"
                    data-search-item
                >

                    <div class="card-body">

                        <span class="badge badge-dark">
                            ${country
                                ? escapeHTML(
                                    country.name
                                  )
                                : "País"}
                        </span>

                        <h3>
                            ${escapeHTML(
                                province.name
                            )}
                        </h3>

                        <p class="text-muted">
                            ${escapeHTML(
                                province.description
                                || ""
                            )}
                        </p>

                    </div>

                </article>

            `;

        }).join("");

}


/* =========================================================
   RENDER DISTRICTS
   ========================================================= */

function renderDistricts() {

    const container =
        document.querySelector(
            "[data-districts-list]"
        );


    if (!container) return;


    const districts =
        getDistricts();


    container.innerHTML =
        districts.map(district => `

            <article
                class="card"
                data-search-item
            >

                <div class="card-body">

                    <span class="badge badge-red">
                        Distrito
                    </span>

                    <h3>
                        ${escapeHTML(
                            district.name
                        )}
                    </h3>

                    <p class="text-muted">
                        ${escapeHTML(
                            district.description
                            || ""
                        )}
                    </p>

                </div>

            </article>

        `).join("");

}


/* =========================================================
   RENDER ZONES
   ========================================================= */

function renderZones() {

    const container =
        document.querySelector(
            "[data-zones-list]"
        );


    if (!container) return;


    const zones =
        getZones();


    container.innerHTML =
        zones.map(zone => `

            <article
                class="card"
                data-search-item
            >

                <div class="card-body">

                    <span class="badge badge-red">
                        Zona
                    </span>

                    <h3>
                        ${escapeHTML(
                            zone.name
                        )}
                    </h3>

                    <p class="text-muted">
                        📍 ${escapeHTML(
                            zone.location || ""
                        )}
                    </p>

                    <button
                        class="btn btn-dark btn-sm"
                        onclick="openZone('${zone.id}')"
                    >
                        Ver igrejas
                    </button>

                </div>

            </article>

        `).join("");

}


/* =========================================================
   SELECCIONAR PAÍS
   ========================================================= */

function selectCountry(countryId) {

    localStorage.setItem(
        "ivc_selected_country",
        countryId
    );


    window.location.href =
        "pais.html?id=" +
        encodeURIComponent(countryId);

}


/* =========================================================
   ABRIR ZONA
   ========================================================= */

function openZone(zoneId) {

    localStorage.setItem(
        "ivc_selected_zone",
        zoneId
    );


    window.location.href =
        "zona.html?id=" +
        encodeURIComponent(zoneId);

}


/* =========================================================
   ESCAPAR HTML
   ========================================================= */

function escapeHTML(value) {

    if (value === null ||
        value === undefined) {

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
   API GLOBAL
   ========================================================= */

window.IVCCountries = {

    getCountries,

    addCountry,

    getProvinces,

    addProvince,

    getDistricts,

    addDistrict,

    getZones,

    addZone,

    renderCountries,

    renderProvinces,

    renderDistricts,

    renderZones

};