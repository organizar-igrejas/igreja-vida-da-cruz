/* =========================================================
   NEWS.JS
   SISTEMA DE NOTÍCIAS
   IGREJA VIDA DA CRUZ
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", initializeNews);

function initializeNews() {

    initializeNewsForm();

    renderNews();

}


/* =========================================================
   GET NEWS
   ========================================================= */

function getNews() {

    return IVC.getStorageData("news");

}


/* =========================================================
   ADD NEWS
   ========================================================= */

function addNews(data) {

    const news =
        getNews();


    const article = {

        id:
            IVC.generateID("news"),

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

        subtitle:
            data.subtitle || "",

        content:
            data.content || "",

        category:
            data.category || "Geral",

        author:
            data.author || "",

        image:
            data.image || "",

        language:
            data.language || "Português",

        featured:
            data.featured === true ||
            data.featured === "true",

        published:
            data.published !== false,

        publishedAt:
            data.publishedAt ||
            IVC.getCurrentDateTime(),

        createdAt:
            IVC.getCurrentDateTime()

    };


    news.push(article);


    IVC.saveStorageData(
        "news",
        news
    );


    IVC.showToast(
        "Notícia publicada."
    );


    renderNews();


    return article;

}


/* =========================================================
   FORM
   ========================================================= */

function initializeNewsForm() {

    const form =
        document.querySelector(
            "#newsForm"
        );

    if (!form) return;


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const formData =
                new FormData(form);


            addNews({

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

                subtitle:
                    formData.get(
                        "subtitle"
                    ),

                content:
                    formData.get(
                        "content"
                    ),

                category:
                    formData.get(
                        "category"
                    ),

                author:
                    formData.get(
                        "author"
                    ),

                image:
                    formData.get(
                        "image"
                    ),

                language:
                    formData.get(
                        "language"
                    ),

                featured:
                    formData.get(
                        "featured"
                    ),

                published:
                    true

            });


            form.reset();

        }
    );

}


/* =========================================================
   RENDER NEWS
   ========================================================= */

function renderNews() {

    const container =
        document.querySelector(
            "[data-news-list]"
        );

    if (!container) return;


    const news =
        getNews()
            .filter(
                article =>
                    article.published !== false
            )
            .sort(
                (a, b) =>
                    new Date(b.publishedAt) -
                    new Date(a.publishedAt)
            );


    if (!news.length) {

        container.innerHTML = `

            <div class="empty-state">

                <div class="empty-state-icon">
                    📰
                </div>

                <strong>
                    Nenhuma notícia publicada.
                </strong>

                <p>
                    As notícias da Igreja aparecerão aqui.
                </p>

            </div>

        `;

        return;
    }


    container.innerHTML =
        news.map(article => `

            <article
                class="news-card"
                data-search-item
            >

                <div class="news-image">

                    ${
                        article.image

                        ?

                        `<img
                            src="${escapeHTML(
                                article.image
                            )}"
                            alt="${escapeHTML(
                                article.title
                            )}"
                        >`

                        :

                        `<div class="news-placeholder">
                            📰
                        </div>`
                    }

                </div>


                <div class="news-body">

                    <div class="news-tags">

                        <span class="badge badge-red">
                            ${escapeHTML(
                                article.category
                            )}
                        </span>

                        <span class="badge badge-dark">
                            ${escapeHTML(
                                article.language
                            )}
                        </span>

                    </div>


                    <h3>
                        ${escapeHTML(
                            article.title
                        )}
                    </h3>


                    ${
                        article.subtitle

                        ?

                        `<p class="news-subtitle">
                            ${escapeHTML(
                                article.subtitle
                            )}
                        </p>`

                        :

                        ""
                    }


                    <p class="news-date">

                        📅

                        ${formatNewsDate(
                            article.publishedAt
                        )}

                    </p>


                    <button
                        class="btn btn-primary btn-sm"
                        onclick="
                            openNews(
                                '${article.id}'
                            )
                        "
                    >
                        Ler notícia
                    </button>

                </div>

            </article>

        `).join("");

}


/* =========================================================
   OPEN NEWS
   ========================================================= */

function openNews(newsId) {

    localStorage.setItem(
        "ivc_selected_news",
        newsId
    );


    window.location.href =
        "noticia.html?id=" +
        encodeURIComponent(newsId);

}


/* =========================================================
   NEWS BY COUNTRY
   ========================================================= */

function getNewsByCountry(
    countryId
) {

    return getNews()
        .filter(
            article =>
                article.countryId ===
                countryId
        );

}


/* =========================================================
   NEWS BY LANGUAGE
   ========================================================= */

function getNewsByLanguage(
    language
) {

    return getNews()
        .filter(
            article =>
                article.language ===
                language
        );

}


/* =========================================================
   FEATURED NEWS
   ========================================================= */

function getFeaturedNews() {

    return getNews()
        .filter(
            article =>
                article.featured === true
        );

}


/* =========================================================
   FORMAT DATE
   ========================================================= */

function formatNewsDate(date) {

    if (!date) return "";

    return new Date(date)
        .toLocaleDateString(
            "pt-MZ",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
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

window.IVCNews = {

    getNews,

    addNews,

    getNewsByCountry,

    getNewsByLanguage,

    getFeaturedNews,

    renderNews

};