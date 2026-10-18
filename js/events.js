/* =========================================================
   EVENTS.JS
   EVENTOS E CONFERÊNCIAS
   IGREJA VIDA DA CRUZ
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", initializeEvents);

function initializeEvents() {

    initializeEventForm();

    renderEvents();

    updateEventStatistics();

}


/* =========================================================
   OBTER EVENTOS
   ========================================================= */

function getEvents() {

    return IVC.getStorageData("events");

}


/* =========================================================
   ADICIONAR EVENTO
   ========================================================= */

function addEvent(data) {

    const events =
        getEvents();


    const event = {

        id:
            IVC.generateID("event"),

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

        type:
            data.type || "Evento",

        level:
            data.level || "Local",

        description:
            data.description || "",

        startDate:
            data.startDate || "",

        endDate:
            data.endDate || "",

        startTime:
            data.startTime || "",

        location:
            data.location || "",

        image:
            data.image || "",

        speaker:
            data.speaker || "",

        registration:
            data.registration || "",

        livestream:
            data.livestream || "",

        status:
            data.status || "Agendado",

        createdAt:
            IVC.getCurrentDateTime()

    };


    events.push(event);


    IVC.saveStorageData(
        "events",
        events
    );


    IVC.showToast(
        "Evento criado com sucesso."
    );


    renderEvents();

    updateEventStatistics();


    return event;

}


/* =========================================================
   FORMULÁRIO
   ========================================================= */

function initializeEventForm() {

    const form =
        document.querySelector("#eventForm");

    if (!form) return;


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const formData =
                new FormData(form);


            addEvent({

                countryId:
                    formData.get("countryId"),

                provinceId:
                    formData.get("provinceId"),

                districtId:
                    formData.get("districtId"),

                zoneId:
                    formData.get("zoneId"),

                churchId:
                    formData.get("churchId"),

                title:
                    formData.get("title"),

                type:
                    formData.get("type"),

                level:
                    formData.get("level"),

                description:
                    formData.get("description"),

                startDate:
                    formData.get("startDate"),

                endDate:
                    formData.get("endDate"),

                startTime:
                    formData.get("startTime"),

                location:
                    formData.get("location"),

                image:
                    formData.get("image"),

                speaker:
                    formData.get("speaker"),

                registration:
                    formData.get("registration"),

                livestream:
                    formData.get("livestream"),

                status:
                    formData.get("status")

            });


            form.reset();

        }
    );

}


/* =========================================================
   RENDER EVENTOS
   ========================================================= */

function renderEvents() {

    const container =
        document.querySelector(
            "[data-events-list]"
        );

    if (!container) return;


    const events =
        getEvents()
            .sort(
                (a, b) =>
                    new Date(a.startDate) -
                    new Date(b.startDate)
            );


    if (!events.length) {

        container.innerHTML = `

            <div class="empty-state">

                <div class="empty-state-icon">
                    📅
                </div>

                <strong>
                    Nenhum evento publicado.
                </strong>

                <p>
                    Adicione conferências, cultos especiais e eventos locais.
                </p>

            </div>

        `;

        return;
    }


    container.innerHTML =
        events.map(event => `

            <article
                class="event-card"
                data-search-item
            >

                <div class="event-date">

                    <strong>
                        ${formatEventDate(
                            event.startDate
                        )}
                    </strong>

                </div>


                <div class="event-card-body">

                    <span class="badge badge-red">
                        ${escapeHTML(
                            event.type
                        )}
                    </span>

                    <span class="badge badge-dark">
                        ${escapeHTML(
                            event.level
                        )}
                    </span>


                    <h3>
                        ${escapeHTML(
                            event.title
                        )}
                    </h3>


                    <p>
                        ${escapeHTML(
                            event.description
                        )}
                    </p>


                    <div class="event-meta">

                        ${
                            event.location
                            ?
                            `<span>
                                📍 ${escapeHTML(
                                    event.location
                                )}
                            </span>`
                            :
                            ""
                        }


                        ${
                            event.startTime
                            ?
                            `<span>
                                🕐 ${escapeHTML(
                                    event.startTime
                                )}
                            </span>`
                            :
                            ""
                        }


                        ${
                            event.speaker
                            ?
                            `<span>
                                🎤 ${escapeHTML(
                                    event.speaker
                                )}
                            </span>`
                            :
                            ""
                        }

                    </div>


                    <div class="event-actions">

                        ${
                            event.livestream
                            ?
                            `<a
                                href="${escapeHTML(
                                    event.livestream
                                )}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="btn btn-primary btn-sm"
                            >
                                📺 Assistir ao vivo
                            </a>`
                            :
                            ""
                        }


                        ${
                            event.registration
                            ?
                            `<a
                                href="${escapeHTML(
                                    event.registration
                                )}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="btn btn-outline btn-sm"
                            >
                                Inscrição
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
   FORMATAR DATA
   ========================================================= */

function formatEventDate(date) {

    if (!date) return "--";

    const parsed =
        new Date(date + "T00:00:00");

    return parsed.toLocaleDateString(
        "pt-MZ",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* =========================================================
   EVENTOS POR NÍVEL
   ========================================================= */

function getEventsByLevel(level) {

    return getEvents()
        .filter(
            event =>
                event.level === level
        );

}


/* =========================================================
   EVENTOS POR IGREJA
   ========================================================= */

function getEventsByChurch(churchId) {

    return getEvents()
        .filter(
            event =>
                event.churchId === churchId
        );

}


/* =========================================================
   ESTATÍSTICAS
   ========================================================= */

function updateEventStatistics() {

    const events =
        getEvents();


    setEventStat(
        "total-events",
        events.length
    );


    setEventStat(
        "national-events",
        events.filter(
            event =>
                event.level ===
                "Nacional"
        ).length
    );


    setEventStat(
        "local-events",
        events.filter(
            event =>
                event.level ===
                "Local"
        ).length
    );


    setEventStat(
        "conference-events",
        events.filter(
            event =>
                event.type ===
                "Conferência"
        ).length
    );

}


function setEventStat(id, value) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent =
            value;

    }

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

window.IVCEvents = {

    getEvents,

    addEvent,

    getEventsByLevel,

    getEventsByChurch,

    renderEvents,

    updateEventStatistics

};