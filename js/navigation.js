/* =========================================================
   NAVIGATION.JS
   ========================================================= */

"use strict";

document.addEventListener(
    "DOMContentLoaded",
    initializeNavigation
);


function initializeNavigation() {

    highlightCurrentPage();

    initializeDropdowns();

    initializeMobileNavigation();

    initializeNavigationLinks();

}


/* =========================================================
   PÁGINA ACTUAL
   ========================================================= */

function highlightCurrentPage() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";


    document
        .querySelectorAll(
            "a[href]"
        )
        .forEach(link => {

            const href =
                link.getAttribute("href");

            if (!href) return;

            const cleanHref =
                href.split("#")[0]
                    .split("?")[0];

            if (
                cleanHref === currentPage
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

}


/* =========================================================
   DROPDOWNS
   ========================================================= */

function initializeDropdowns() {

    document
        .querySelectorAll(
            "[data-dropdown-toggle]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    const dropdown =
                        button.closest(
                            ".dropdown"
                        );

                    if (!dropdown) return;

                    dropdown.classList.toggle(
                        "open"
                    );

                }
            );

        });


    document.addEventListener(
        "click",
        () => {

            document
                .querySelectorAll(
                    ".dropdown.open"
                )
                .forEach(dropdown => {

                    dropdown.classList.remove(
                        "open"
                    );

                });

        }
    );

}


/* =========================================================
   NAVEGAÇÃO MOBILE
   ========================================================= */

function initializeMobileNavigation() {

    const button =
        document.querySelector(
            "[data-nav-toggle]"
        );

    const navigation =
        document.querySelector(
            "[data-navigation]"
        );


    if (!button || !navigation) {

        return;

    }


    button.addEventListener(
        "click",
        () => {

            navigation.classList.toggle(
                "open"
            );

            button.classList.toggle(
                "active"
            );

        }
    );


    navigation
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navigation.classList.remove(
                        "open"
                    );

                    button.classList.remove(
                        "active"
                    );

                }
            );

        });

}


/* =========================================================
   LINKS
   ========================================================= */

function initializeNavigationLinks() {

    document
        .querySelectorAll(
            "[data-country-link]"
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    const country =
                        link.dataset.countryLink;

                    localStorage.setItem(
                        "ivc_selected_country",
                        country
                    );

                }
            );

        });

}


/* =========================================================
   PAÍS ACTIVO
   ========================================================= */

function setSelectedCountry(country) {

    localStorage.setItem(
        "ivc_selected_country",
        country
    );

}


function getSelectedCountry() {

    return localStorage.getItem(
        "ivc_selected_country"
    );

}


window.IVCNavigation = {

    setSelectedCountry,

    getSelectedCountry

};