/* =========================================================
   ADMIN.JS
   PAINEL ADMINISTRATIVO
   IGREJA VIDA DA CRUZ
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", initializeAdmin);


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

function initializeAdmin() {

    protectAdminPage();

    initializeAdminForms();

    initializeDeleteButtons();

    initializeLogout();

    renderAdminDashboard();

}


/* =========================================================
   PROTECÇÃO DO PAINEL
   ========================================================= */

function protectAdminPage() {

    const adminPage =
        document.body.dataset.adminPage === "true";

    if (!adminPage) return;

    const session =
        IVC.getStorageData("admin_session");

    if (!session || session.active !== true) {

        window.location.href =
            "admin/login.html";

    }

}


/* =========================================================
   LOGIN
   ========================================================= */

function adminLogin(username, password) {

    /*
     * IMPORTANTE:
     * Este login é apenas uma estrutura
     * para o frontend.
     *
     * Para segurança real, o sistema deverá
     * posteriormente utilizar backend/autenticação.
     */

    const administrators =
        IVC.getStorageData("administrators");

    const administrator =
        administrators.find(
            admin =>
                admin.username === username &&
                admin.password === password &&
                admin.active !== false
        );


    if (!administrator) {

        IVC.showToast(
            "Utilizador ou palavra-passe incorrectos.",
            "error"
        );

        return false;
    }


    const session = {

        active: true,

        adminId:
            administrator.id,

        name:
            administrator.name,

        role:
            administrator.role,

        loginAt:
            IVC.getCurrentDateTime()

    };


    IVC.saveStorageData(
        "admin_session",
        session
    );


    IVC.showToast(
        "Login efectuado com sucesso."
    );


    window.location.href =
        "dashboard.html";


    return true;

}


/* =========================================================
   LOGOUT
   ========================================================= */

function initializeLogout() {

    document
        .querySelectorAll(
            "[data-admin-logout]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                adminLogout
            );

        });

}


function adminLogout() {

    localStorage.removeItem(
        "ivc_admin_session"
    );

    localStorage.removeItem(
        "admin_session"
    );


    window.location.href =
        "login.html";

}


/* =========================================================
   FORMULÁRIOS ADMINISTRATIVOS
   ========================================================= */

function initializeAdminForms() {

    initializeCountryForm();

    initializeProvinceForm();

    initializeDistrictForm();

    initializeZoneForm();

    initializeChurchForm();

    initializeAdministratorForm();

}


/* =========================================================
   PAÍS
   ========================================================= */

function initializeCountryForm() {

    const form =
        document.querySelector(
            "#countryForm"
        );

    if (!form) return;


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const formData =
                new FormData(form);


            addCountry({

                name:
                    formData.get("name"),

                code:
                    formData.get("code"),

                language:
                    formData.get("language"),

                flag:
                    formData.get("flag"),

                capital:
                    formData.get("capital")

            });


            form.reset();

        }
    );

}


function addCountry(data) {

    const countries =
        IVC.getStorageData(
            "countries"
        );


    const country = {

        id:
            IVC.generateID("country"),

        name:
            data.name.trim(),

        code:
            data.code || "",

        language:
            data.language || "",

        flag:
            data.flag || "",

        capital:
            data.capital || "",

        active:
            true,

        createdAt:
            IVC.getCurrentDateTime()

    };


    countries.push(country);


    IVC.saveStorageData(
        "countries",
        countries
    );


    IVC.showToast(
        "País adicionado."
    );


    return country;

}


/* =========================================================
   PROVÍNCIA
   ========================================================= */

function initializeProvinceForm() {

    const form =
        document.querySelector(
            "#provinceForm"
        );

    if (!form) return;


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const formData =
                new FormData(form);


            addProvince({

                countryId:
                    formData.get(
                        "countryId"
                    ),

                name:
                    formData.get(
                        "name"
                    ),

                code:
                    formData.get(
                        "code"
                    )

            });


            form.reset();

        }
    );

}


function addProvince(data) {

    const provinces =
        IVC.getStorageData(
            "provinces"
        );


    const province = {

        id:
            IVC.generateID(
                "province"
            ),

        countryId:
            data.countryId,

        name:
            data.name.trim(),

        code:
            data.code || "",

        active:
            true,

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


    return province;

}


/* =========================================================
   DISTRITO
   ========================================================= */

function initializeDistrictForm() {

    const form =
        document.querySelector(
            "#districtForm"
        );

    if (!form) return;


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const formData =
                new FormData(form);


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
                    formData.get(
                        "name"
                    )

            });


            form.reset();

        }
    );

}


function addDistrict(data) {

    const districts =
        IVC.getStorageData(
            "districts"
        );


    const district = {

        id:
            IVC.generateID(
                "district"
            ),

        countryId:
            data.countryId,

        provinceId:
            data.provinceId,

        name:
            data.name.trim(),

        active:
            true,

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


    return district;

}


/* =========================================================
   ZONA
   ========================================================= */

function initializeZoneForm() {

    const form =
        document.querySelector(
            "#zoneForm"
        );

    if (!form) return;


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const formData =
                new FormData(form);


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
                    formData.get(
                        "name"
                    ),

                location:
                    formData.get(
                        "location"
                    )

            });


            form.reset();

        }
    );

}


function addZone(data) {

    const zones =
        IVC.getStorageData(
            "zones"
        );


    const zone = {

        id:
            IVC.generateID(
                "zone"
            ),

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

        active:
            true,

        createdAt:
            IVC.getCurrentDateTime()

    };


    zones.push(zone);


    IVC.saveStorageData(
        "zones",
        zones
    );


    IVC.showToast(
        "Zona adicionada."
    );


    return zone;

}


/* =========================================================
   IGREJA
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
                    formData.get(
                        "name"
                    ),

                type:
                    formData.get(
                        "type"
                    ),

                address:
                    formData.get(
                        "address"
                    ),

                city:
                    formData.get(
                        "city"
                    ),

                pastor:
                    formData.get(
                        "pastor"
                    ),

                phone:
                    formData.get(
                        "phone"
                    ),

                latitude:
                    formData.get(
                        "latitude"
                    ),

                longitude:
                    formData.get(
                        "longitude"
                    ),

                image:
                    formData.get(
                        "image"
                    )

            });


            form.reset();

        }
    );

}


function addChurch(data) {

    const churches =
        IVC.getStorageData(
            "churches"
        );


    const church = {

        id:
            IVC.generateID(
                "church"
            ),

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

        latitude:
            data.latitude || "",

        longitude:
            data.longitude || "",

        image:
            data.image || "",

        active:
            true,

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


    if (
        window.IVCChurches &&
        typeof IVCChurches.renderChurches ===
        "function"
    ) {

        IVCChurches.renderChurches();

    }


    return church;

}


/* =========================================================
   ADMINISTRADOR
   ========================================================= */

function initializeAdministratorForm() {

    const form =
        document.querySelector(
            "#administratorForm"
        );

    if (!form) return;


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const formData =
                new FormData(form);


            addAdministrator({

                name:
                    formData.get(
                        "name"
                    ),

                username:
                    formData.get(
                        "username"
                    ),

                password:
                    formData.get(
                        "password"
                    ),

                role:
                    formData.get(
                        "role"
                    ),

                countryId:
                    formData.get(
                        "countryId"
                    ),

                churchId:
                    formData.get(
                        "churchId"
                    )

            });


            form.reset();

        }
    );

}


function addAdministrator(data) {

    const administrators =
        IVC.getStorageData(
            "administrators"
        );


    const exists =
        administrators.some(
            admin =>
                admin.username ===
                data.username
        );


    if (exists) {

        IVC.showToast(
            "Este nome de utilizador já existe.",
            "error"
        );

        return null;

    }


    const administrator = {

        id:
            IVC.generateID(
                "admin"
            ),

        name:
            data.name.trim(),

        username:
            data.username.trim(),

        password:
            data.password,

        role:
            data.role ||
            "Administrador",

        countryId:
            data.countryId || "",

        churchId:
            data.churchId || "",

        active:
            true,

        createdAt:
            IVC.getCurrentDateTime()

    };


    administrators.push(
        administrator
    );


    IVC.saveStorageData(
        "administrators",
        administrators
    );


    IVC.showToast(
        "Administrador criado."
    );


    return administrator;

}


/* =========================================================
   ELIMINAR ITEM
   ========================================================= */

function initializeDeleteButtons() {

    document
        .querySelectorAll(
            "[data-delete-type]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const type =
                        button.dataset.deleteType;

                    const id =
                        button.dataset.deleteId;

                    deleteItem(
                        type,
                        id
                    );

                }
            );

        });

}


function deleteItem(type, id) {

    const keyMap = {

        country:
            "countries",

        province:
            "provinces",

        district:
            "districts",

        zone:
            "zones",

        church:
            "churches",

        event:
            "events",

        news:
            "news",

        media:
            "media",

        member:
            "members",

        administrator:
            "administrators"

    };


    const key =
        keyMap[type];


    if (!key) return;


    const confirmed =
        window.confirm(
            "Tem a certeza que pretende eliminar este registo?"
        );


    if (!confirmed) return;


    const records =
        IVC.getStorageData(key);


    const filtered =
        records.filter(
            item =>
                item.id !== id
        );


    IVC.saveStorageData(
        key,
        filtered
    );


    IVC.showToast(
        "Registo eliminado."
    );


    window.location.reload();

}


/* =========================================================
   DASHBOARD
   ========================================================= */

function renderAdminDashboard() {

    setAdminCount(
        "admin-countries",
        "countries"
    );

    setAdminCount(
        "admin-provinces",
        "provinces"
    );

    setAdminCount(
        "admin-districts",
        "districts"
    );

    setAdminCount(
        "admin-zones",
        "zones"
    );

    setAdminCount(
        "admin-churches",
        "churches"
    );

    setAdminCount(
        "admin-members",
        "members"
    );

    setAdminCount(
        "admin-events",
        "events"
    );

    setAdminCount(
        "admin-news",
        "news"
    );

    setAdminCount(
        "admin-media",
        "media"
    );

}


function setAdminCount(elementId, key) {

    const element =
        document.getElementById(
            elementId
        );

    if (!element) return;


    const data =
        IVC.getStorageData(key);


    element.textContent =
        data.length;

}


/* =========================================================
   API
   ========================================================= */

window.IVCAdmin = {

    adminLogin,

    adminLogout,

    addCountry,

    addProvince,

    addDistrict,

    addZone,

    addChurch,

    addAdministrator,

    deleteItem,

    renderAdminDashboard

};