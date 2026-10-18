/* =========================================================
   SEARCH.JS
   PESQUISA GLOBAL
   IGREJA VIDA DA CRUZ
   ========================================================= */

"use strict";

document.addEventListener(
    "DOMContentLoaded",
    initializeSearch
);


/* =========================================================
   INICIALIZAR PESQUISA
   ========================================================= */

function initializeSearch() {

    const searchInputs =
        document.querySelectorAll(
            "[data-global-search]"
        );


    searchInputs.forEach(input => {

        input.addEventListener(
            "input",
            event => {

                performSearch(
                    event.target.value
                );

            }
        );

    });


    initializeSearchButtons();

}


/* =========================================================
   PESQUISA
   ========================================================= */

function performSearch(query) {

    query =
        query
            .trim()
            .toLowerCase();


    const searchableItems =
        document.querySelectorAll(
            "[data-search-item]"
        );


    searchableItems.forEach(item => {

        const text =
            item.textContent
                .toLowerCase();


        if (
            !query ||
            text.includes(query)
        ) {

            item.style.display = "";

        } else {

            item.style.display =
                "none";

        }

    });


    updateSearchMessage(
        query,
        searchableItems
    );

}


/* =========================================================
   PESQUISA NOS DADOS
   ========================================================= */

function globalDatabaseSearch(query) {

    query =
        query
            .trim()
            .toLowerCase();


    if (!query) {

        return [];

    }


    const collections = [

        {
            key: "countries",
            type: "País",
            title: item => item.name
        },

        {
            key: "provinces",
            type: "Província",
            title: item => item.name
        },

        {
            key: "districts",
            type: "Distrito",
            title: item => item.name
        },

        {
            key: "zones",
            type: "Zona",
            title: item => item.name
        },

        {
            key: "churches",
            type: "Igreja",
            title: item => item.name
        },

        {
            key: "events",
            type: "Evento",
            title: item => item.title
        },

        {
            key: "news",
            type: "Notícia",
            title: item => item.title
        },

        {
            key: "media",
            type: "Media",
            title: item => item.title
        },

        {
            key: "members",
            type: "Membro",
            title: item => item.name
        }

    ];


    const results = [];


    collections.forEach(collection => {

        const records =
            IVC.getStorageData(
                collection.key
            );


        records.forEach(record => {

            const searchableText =
                JSON.stringify(record)
                    .toLowerCase();


            if (
                searchableText.includes(
                    query
                )
            ) {

                results.push({

                    id:
                        record.id,

                    type:
                        collection.type,

                    title:
                        collection.title(
                            record
                        ),

                    data:
                        record

                });

            }

        });

    });


    return results;

}


/* =========================================================
   RENDER RESULTADOS
   ========================================================= */

function renderSearchResults(
    query,
    container
) {

    if (!container) return;


    const results =
        globalDatabaseSearch(
            query
        );


    if (!query.trim()) {

        container.innerHTML = "";

        return;

    }


    if (!results.length) {

        container.innerHTML = `

            <div class="search-empty">

                <span>🔎</span>

                <strong>
                    Nenhum resultado encontrado.
                </strong>

                <p>
                    Tente pesquisar por outro termo.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        results.map(result => `

            <button
                type="button"
                class="search-result"
                data-search-result
                data-result-type="${escapeHTML(
                    result.type
                )}"
                data-result-id="${escapeHTML(
                    result.id
                )}"
            >

                <span class="search-result-icon">

                    ${getSearchIcon(
                        result.type
                    )}

                </span>


                <span class="search-result-content">

                    <strong>
                        ${escapeHTML(
                            result.title
                        )}
                    </strong>

                    <small>
                        ${escapeHTML(
                            result.type
                        )}
                    </small>

                </span>

            </button>

        `).join("");


    initializeResultButtons();

}


/* =========================================================
   ÍCONES
   ========================================================= */

function getSearchIcon(type) {

    const icons = {

        "País": "🌍",

        "Província": "🗺️",

        "Distrito": "📍",

        "Zona": "📌",

        "Igreja": "⛪",

        "Evento": "📅",

        "Notícia": "📰",

        "Media": "🎬",

        "Membro": "👤"

    };


    return icons[type] || "🔎";

}


/* =========================================================
   RESULTADO
   ========================================================= */

function initializeResultButtons() {

    document
        .querySelectorAll(
            "[data-search-result]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const type =
                        button.dataset.resultType;

                    const id =
                        button.dataset.resultId;


                    openSearchResult(
                        type,
                        id
                    );

                }
            );

        });

}


/* =========================================================
   ABRIR RESULTADO
   ========================================================= */

function openSearchResult(
    type,
    id
) {

    const pages = {

        "País":
            "pais.html",

        "Província":
            "pais.html",

        "Distrito":
            "pais.html",

        "Zona":
            "igrejas.html",

        "Igreja":
            "igrejas.html",

        "Evento":
            "eventos.html",

        "Notícia":
            "noticias.html",

        "Media":
            "media.html",

        "Membro":
            "admin/membros.html"

    };


    const page =
        pages[type];


    if (!page) return;


    localStorage.setItem(
        "ivc_search_result_id",
        id
    );


    localStorage.setItem(
        "ivc_search_result_type",
        type
    );


    window.location.href =
        page;

}


/* =========================================================
   BOTÕES DE PESQUISA
   ========================================================= */

function initializeSearchButtons() {

    document
        .querySelectorAll(
            "[data-search-button]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const input =
                        document.querySelector(
                            "[data-global-search]"
                        );

                    if (!input) return;


                    const container =
                        document.querySelector(
                            "[data-search-results]"
                        );


                    renderSearchResults(
                        input.value,
                        container
                    );

                }
            );

        });

}


/* =========================================================
   MENSAGEM DE RESULTADOS
   ========================================================= */

function updateSearchMessage(
    query,
    items
) {

    const message =
        document.querySelector(
            "[data-search-message]"
        );


    if (!message) return;


    if (!query) {

        message.textContent =
            "";

        return;

    }


    let visible = 0;


    items.forEach(item => {

        if (
            item.style.display !==
            "none"
        ) {

            visible++;

        }

    });


    message.textContent =
        `${visible} resultado(s) encontrado(s).`;

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

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}


/* =========================================================
   API
   ========================================================= */

window.IVCSearch = {

    performSearch,

    globalDatabaseSearch,

    renderSearchResults

};