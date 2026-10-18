/* =========================================================
   MEDIA.JS
   FOTOS, VÍDEOS, MÚSICA E MULTIMÉDIA
   IGREJA VIDA DA CRUZ
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", initializeMedia);

function initializeMedia() {

    initializeMediaForm();

    renderMedia();

}


/* =========================================================
   GET MEDIA
   ========================================================= */

function getMedia() {

    return IVC.getStorageData("media");

}


/* =========================================================
   ADD MEDIA
   ========================================================= */

function addMedia(data) {

    const media =
        getMedia();


    const item = {

        id:
            IVC.generateID("media"),

        countryId:
            data.countryId || "",

        provinceId:
            data.provinceId || "",

        districtId:
            data.districtId || "",

        zoneId:
            data.zoneId || "",

        churchId:
            data.churchId || "",

        title:
            data.title.trim(),

        description:
            data.description || "",

        type:
            data.type || "Vídeo",

        category:
            data.category || "Geral",

        platform:
            data.platform || "",

        url:
            data.url || "",

        thumbnail:
            data.thumbnail || "",

        file:
            data.file || "",

        speaker:
            data.speaker || "",

        language:
            data.language || "Português",

        featured:
            data.featured === true ||
            data.featured === "true",

        publishedAt:
            data.publishedAt ||
            IVC.getCurrentDateTime(),

        createdAt:
            IVC.getCurrentDateTime()

    };


    media.push(item);


    IVC.saveStorageData(
        "media",
        media
    );


    IVC.showToast(
        "Conteúdo multimédia adicionado."
    );


    renderMedia();


    return item;

}


/* =========================================================
   FORM
   ========================================================= */

function initializeMediaForm() {

    const form =
        document.querySelector(
            "#mediaForm"
        );

    if (!form) return;


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const formData =
                new FormData(form);


            addMedia({

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

                churchId:
                    formData.get(
                        "churchId"
                    ),

                title:
                    formData.get(
                        "title"
                    ),

                description:
                    formData.get(
                        "description"
                    ),

                type:
                    formData.get(
                        "type"
                    ),

                category:
                    formData.get(
                        "category"
                    ),

                platform:
                    formData.get(
                        "platform"
                    ),

                url:
                    formData.get(
                        "url"
                    ),

                thumbnail:
                    formData.get(
                        "thumbnail"
                    ),

                file:
                    formData.get(
                        "file"
                    ),

                speaker:
                    formData.get(
                        "speaker"
                    ),

                language:
                    formData.get(
                        "language"
                    ),

                featured:
                    formData.get(
                        "featured"
                    )

            });


            form.reset();

        }
    );

}


/* =========================================================
   RENDER MEDIA
   ========================================================= */

function renderMedia() {

    const container =
        document.querySelector(
            "[data-media-list]"
        );

    if (!container) return;


    const media =
        getMedia()
            .sort(
                (a, b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
            );


    if (!media.length) {

        container.innerHTML = `

            <div class="empty-state">

                <div class="empty-state-icon">
                    🎬
                </div>

                <strong>
                    Nenhum conteúdo multimédia.
                </strong>

                <p>
                    Vídeos, músicas e fotografias aparecerão aqui.
                </p>

            </div>

        `;

        return;
    }


    container.innerHTML =
        media.map(item => `

            <article
                class="media-card"
                data-search-item
            >

                <div class="media-thumbnail">

                    ${
                        item.thumbnail

                        ?

                        `<img
                            src="${escapeHTML(
                                item.thumbnail
                            )}"
                            alt="${escapeHTML(
                                item.title
                            )}"
                        >`

                        :

                        `<div class="media-placeholder">
                            ${getMediaIcon(
                                item.type
                            )}
                        </div>`
                    }


                    <span class="media-type">

                        ${escapeHTML(
                            item.type
                        )}

                    </span>

                </div>


                <div class="media-body">

                    <div class="media-platform">

                        ${
                            item.platform
                            ?
                            escapeHTML(
                                item.platform
                            )
                            :
                            "Igreja Vida da Cruz"
                        }

                    </div>


                    <h3>
                        ${escapeHTML(
                            item.title
                        )}
                    </h3>


                    ${
                        item.description
                        ?

                        `<p>
                            ${escapeHTML(
                                item.description
                            )}
                        </p>`

                        :

                        ""
                    }


                    ${
                        item.speaker
                        ?

                        `<span>
                            🎤 ${escapeHTML(
                                item.speaker
                            )}
                        </span>`

                        :

                        ""
                    }


                    <div class="media-actions">

                        ${
                            item.url

                            ?

                            `<a
                                href="${escapeHTML(
                                    item.url
                                )}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="btn btn-primary btn-sm"
                            >
                                ${getMediaButton(
                                    item.type
                                )}
                            </a>`

                            :

                            ""
                        }

                    </div>

                </div>

            </article>

        `).join("");

}


/* =========================================================
   ÍCONE
   ========================================================= */

function getMediaIcon(type) {

    const icons = {

        "Vídeo": "🎬",

        "Música": "🎵",

        "Fotografia": "📸",

        "Pregação": "🎙️",

        "Louvor": "🎤",

        "Estudo Bíblico": "📖",

        "Transmissão": "📺",

        "Podcast": "🎧"

    };


    return icons[type] || "🎬";

}


/* =========================================================
   BOTÃO
   ========================================================= */

function getMediaButton(type) {

    if (type === "Música") {

        return "▶ Ouvir";

    }

    if (type === "Fotografia") {

        return "👁 Ver";

    }

    if (type === "Transmissão") {

        return "📺 Assistir";

    }

    return "▶ Abrir";

}


/* =========================================================
   FILTRAR POR TIPO
   ========================================================= */

function getMediaByType(type) {

    return getMedia()
        .filter(
            item =>
                item.type === type
        );

}


/* =========================================================
   FILTRAR POR PLATAFORMA
   ========================================================= */

function getMediaByPlatform(
    platform
) {

    return getMedia()
        .filter(
            item =>
                item.platform ===
                platform
        );

}


/* =========================================================
   DESTAQUES
   ========================================================= */

function getFeaturedMedia() {

    return getMedia()
        .filter(
            item =>
                item.featured === true
        );

}


/* =========================================================
   ESCAPE
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

window.IVCMedia = {

    getMedia,

    addMedia,

    getMediaByType,

    getMediaByPlatform,

    getFeaturedMedia,

    renderMedia

};