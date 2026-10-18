/* =========================================================
   CHURCHES.JS
   GESTÃO DAS IGREJAS
   ========================================================= */

"use strict";


document.addEventListener(
    "DOMContentLoaded",
    initializeChurches
);


function initializeChurches() {

    initializeChurchForm();

    renderChurches();

}


/* =========================================================
   GET CHURCHES
   ========================================================= */

function getChurches() {

    return IVC.getStorageData(
        "churches"
    );

}


/* =========================================================
   ADD CHURCH
   ========================================================= */

function addChurch(data) {

    const churches =
        getChurches();


    const church = {

        id:
            IVC.generateID("church"),

        countryId:
            data.countryId,

        provinceId:
            data.provinceId,

        districtId:
            data.districtId,

        zoneId:
            data.zoneId,

        name:
            data.name.trim(),

        type:
            data.type || "Igreja Local",

        address:
            data.address || "",

        city:
            data.city || "",

        pastor:
            data.pastor || "",

        phone:
            data.phone || "",

        email:
            data.email || "",

        latitude:
            data.latitude || "",

        longitude:
            data.longitude || "",

        image:
            data.image || "",

        description:
            data.description || "",

        status:
            data.status || "Activa",

        createdAt:
            IVC.getCurrentDateTime()

    };


    churches.push(church);


    IVC.saveStorageData(
        "churches",
        churches
    );


    IVC.showToast(
        "Igreja adicionada com sucesso."
    );


    renderChurches();


    return church;

}


/* =========================================================
   UPDATE CHURCH
   ========================================================= */

function updateChurch(
    churchId,
    updates
) {

    const churches =
        getChurches();


    const index =
        churches.findIndex(
            church =>
                church.id === churchId
        );


    if (index === -1) {

        IVC.showToast(
            "Igreja não encontrada.",
            "error"
        );

        return null;

    }


    churches[index] = {

        ...churches[index],

        ...updates,

        updatedAt:
            IVC.getCurrentDateTime()

    };


    IVC.saveStorageData(
        "churches",
        churches
    );


    IVC.showToast(
        "Igreja actualizada."
    );


    renderChurches();


    return churches[index];

}


/* =========================================================
   DELETE CHURCH
   ========================================================= */

function deleteChurch(churchId) {

    if (
        !IVC.confirmAction(
            "Tem certeza que deseja eliminar esta igreja?"
        )
    ) {

        return;

    }


    const churches =
        getChurches()
            .filter(
                church =>
                    church.id !== churchId
            );


    IVC.saveStorageData(
        "churches",
        churches
    );


    IVC.showToast(
        "Igreja eliminada.",
        "warning"
    );


    renderChurches();

}


/* =========================================================
   FORM
   ========================================================= */

function initializeChurchForm() {

    const form =
        document.querySelector(
            "#churchForm"
        );


    if (!form) return;


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const formData =
                new FormData(form);


            addChurch({

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

                zoneId:
                    formData.get(
                        "zoneId"
                    ),

                name:
                    formData.get("name"),

                type:
                    formData.get("type"),

                address:
                    formData.get(
                        "address"
                    ),

                city:
                    formData.get("city"),

                pastor:
                    formData.get(
                        "pastor"
                    ),

                phone:
                    formData.get("phone"),

                email:
                    formData.get("email"),

                latitude:
                    formData.get(
                        "latitude"
                    ),

                longitude:
                    formData.get(
                        "longitude"
                    ),

                image:
                    formData.get("image"),

                description:
                    formData.get(
                        "description"
                    ),

                status:
                    formData.get("status")

            });


            form.reset();

        }
    );

}


/* =========================================================
   RENDER
   ========================================================= */

function renderChurches() {

    const container =
        document.querySelector(
            "[data-churches-list]"
        );


    if (!container) return;


    const churches =
        getChurches();


    if (!churches.length) {

        container.innerHTML = `

            <div class="empty-state">

                <div class="empty-state-icon">
                    ⛪
                </div>

                <strong>
                    Nenhuma igreja cadastrada.
                </strong>

                <p>
                    Comece por adicionar a primeira igreja.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        churches.map(church => `

            <article
                class="church-card"
                data-search-item
            >

                <div class="church-card-image">

                    ${
                        church.image
                        ?

                        `<img
                            src="${escapeHTML(
                                church.image
                            )}"
                            alt="${escapeHTML(
                                church.name
                            )}"
                        >`

                        :

                        `<div
                            class="church-placeholder"
                        >
                            ⛪
                        </div>`
                    }

                </div>


                <div class="church-card-body">

                    <span class="badge badge-red">
                        ${escapeHTML(
                            church.type
                        )}
                    </span>


                    <h3>
                        ${escapeHTML(
                            church.name
                        )}
                    </h3>


                    <p>

                        📍

                        ${escapeHTML(
                            church.city
                            || church.address
                            || "Localização não definida"
                        )}

                    </p>


                    <p>

                        👤

                        ${escapeHTML(
                            church.pastor
                            || "Pastor não definido"
                        )}

                    </p>


                    <div class="church-card-actions">

                        <button
                            class="btn btn-primary btn-sm"
                            onclick="
                                openChurch(
                                    '${church.id}'
                                )
                            "
                        >
                            Abrir igreja
                        </button>


                        <button
                            class="btn btn-outline btn-sm"
                            onclick="
                                deleteChurch(
                                    '${church.id}'
                                )
                            "
                        >
                            Eliminar
                        </button>

                    </div>

                </div>

            </article>

        `).join("");

}


/* =========================================================
   OPEN CHURCH
   ========================================================= */

function openChurch(churchId) {

    localStorage.setItem(
        "ivc_selected_church",
        churchId
    );


    window.location.href =
        "igreja.html?id=" +
        encodeURIComponent(churchId);

}


/* =========================================================
   GET CHURCH
   ========================================================= */

function getChurchById(churchId) {

    return getChurches()
        .find(
            church =>
                church.id === churchId
        );

}


/* =========================================================
   CHURCHES BY ZONE
   ========================================================= */

function getChurchesByZone(zoneId) {

    return getChurches()
        .filter(
            church =>
                church.zoneId === zoneId
        );

}


/* =========================================================
   HTML ESCAPE
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
   GLOBAL API
   ========================================================= */

window.IVCChurches = {

    getChurches,

    getChurchById,

    getChurchesByZone,

    addChurch,

    updateChurch,

    deleteChurch,

    renderChurches

};