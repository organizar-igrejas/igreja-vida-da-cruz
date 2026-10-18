/* =========================================================
   MEMBERS.JS
   SISTEMA DE MEMBROS
   ========================================================= */

"use strict";


document.addEventListener(
    "DOMContentLoaded",
    initializeMembers
);


function initializeMembers() {

    initializeMemberForm();

    renderMembers();

    updateMemberStatistics();

}


/* =========================================================
   GET MEMBERS
   ========================================================= */

function getMembers() {

    return IVC.getStorageData(
        "members"
    );

}


/* =========================================================
   ADD MEMBER
   ========================================================= */

function addMember(data) {

    const members =
        getMembers();


    const member = {

        id:
            IVC.generateID("member"),

        churchId:
            data.churchId || "",

        countryId:
            data.countryId || "",

        provinceId:
            data.provinceId || "",

        districtId:
            data.districtId || "",

        zoneId:
            data.zoneId || "",

        firstName:
            data.firstName.trim(),

        lastName:
            data.lastName.trim(),

        gender:
            data.gender || "",

        birthDate:
            data.birthDate || "",

        phone:
            data.phone || "",

        email:
            data.email || "",

        address:
            data.address || "",

        membershipNumber:
            data.membershipNumber
            ||
            generateMembershipNumber(),

        baptism:
            data.baptism || "Não informado",

        maritalStatus:
            data.maritalStatus || "",

        department:
            data.department || "",

        ministry:
            data.ministry || "",

        role:
            data.role || "Membro",

        photo:
            data.photo || "",

        emergencyContact:
            data.emergencyContact || "",

        status:
            data.status || "Activo",

        notes:
            data.notes || "",

        registeredAt:
            IVC.getCurrentDateTime()

    };


    members.push(member);


    IVC.saveStorageData(
        "members",
        members
    );


    IVC.showToast(
        "Membro cadastrado com sucesso."
    );


    renderMembers();

    updateMemberStatistics();


    return member;

}


/* =========================================================
   MEMBERSHIP NUMBER
   ========================================================= */

function generateMembershipNumber() {

    const members =
        getMembers();


    const year =
        new Date()
            .getFullYear();


    const number =
        String(
            members.length + 1
        ).padStart(5, "0");


    return `IVC-${year}-${number}`;

}


/* =========================================================
   FORM
   ========================================================= */

function initializeMemberForm() {

    const form =
        document.querySelector(
            "#memberForm"
        );


    if (!form) return;


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const formData =
                new FormData(form);


            addMember({

                churchId:
                    formData.get(
                        "churchId"
                    ),

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

                firstName:
                    formData.get(
                        "firstName"
                    ),

                lastName:
                    formData.get(
                        "lastName"
                    ),

                gender:
                    formData.get(
                        "gender"
                    ),

                birthDate:
                    formData.get(
                        "birthDate"
                    ),

                phone:
                    formData.get(
                        "phone"
                    ),

                email:
                    formData.get(
                        "email"
                    ),

                address:
                    formData.get(
                        "address"
                    ),

                baptism:
                    formData.get(
                        "baptism"
                    ),

                maritalStatus:
                    formData.get(
                        "maritalStatus"
                    ),

                department:
                    formData.get(
                        "department"
                    ),

                ministry:
                    formData.get(
                        "ministry"
                    ),

                role:
                    formData.get(
                        "role"
                    ),

                photo:
                    formData.get(
                        "photo"
                    ),

                emergencyContact:
                    formData.get(
                        "emergencyContact"
                    ),

                status:
                    formData.get(
                        "status"
                    ),

                notes:
                    formData.get(
                        "notes"
                    )

            });


            form.reset();

        }
    );

}


/* =========================================================
   RENDER MEMBERS
   ========================================================= */

function renderMembers() {

    const container =
        document.querySelector(
            "[data-members-list]"
        );


    if (!container) return;


    const members =
        getMembers();


    if (!members.length) {

        container.innerHTML = `

            <div class="empty-state">

                <div class="empty-state-icon">
                    👥
                </div>

                <strong>
                    Nenhum membro cadastrado.
                </strong>

                <p>
                    Utilize o formulário para cadastrar o primeiro membro.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        members.map(member => {

            const fullName =
                `${member.firstName}
                ${member.lastName}`;


            return `

                <div
                    class="member-user"
                    data-search-item
                >

                    <div class="avatar">

                        ${
                            member.photo

                            ?

                            `<img
                                src="${escapeHTML(
                                    member.photo
                                )}"
                                alt="${escapeHTML(
                                    fullName
                                )}"
                            >`

                            :

                            getInitials(
                                fullName
                            )
                        }

                    </div>


                    <div
                        class="member-user-info"
                    >

                        <strong>
                            ${escapeHTML(
                                fullName
                            )}
                        </strong>

                        <span>
                            ${escapeHTML(
                                member.membershipNumber
                            )}
                        </span>

                    </div>


                    <span
                        class="badge badge-green"
                    >
                        ${escapeHTML(
                            member.status
                        )}
                    </span>


                    <button
                        class="btn btn-outline btn-sm"
                        onclick="
                            openMember(
                                '${member.id}'
                            )
                        "
                    >
                        Ver
                    </button>

                </div>

            `;

        }).join("");

}


/* =========================================================
   MEMBER STATISTICS
   ========================================================= */

function updateMemberStatistics() {

    const members =
        getMembers();


    setStatistic(
        "total-members",
        members.length
    );


    setStatistic(
        "male-members",
        members.filter(
            member =>
                member.gender === "Masculino"
        ).length
    );


    setStatistic(
        "female-members",
        members.filter(
            member =>
                member.gender === "Feminino"
        ).length
    );


    setStatistic(
        "active-members",
        members.filter(
            member =>
                member.status === "Activo"
        ).length
    );


    setStatistic(
        "leaders-count",
        members.filter(
            member =>
                member.role &&
                member.role !== "Membro"
        ).length
    );

}


function setStatistic(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value;

    }

}


/* =========================================================
   OPEN MEMBER
   ========================================================= */

function openMember(memberId) {

    localStorage.setItem(
        "ivc_selected_member",
        memberId
    );


    window.location.href =
        "membro.html?id=" +
        encodeURIComponent(memberId);

}


/* =========================================================
   GET MEMBER
   ========================================================= */

function getMemberById(memberId) {

    return getMembers()
        .find(
            member =>
                member.id === memberId
        );

}


/* =========================================================
   MEMBERS BY CHURCH
   ========================================================= */

function getMembersByChurch(
    churchId
) {

    return getMembers()
        .filter(
            member =>
                member.churchId === churchId
        );

}


/* =========================================================
   MEMBERS BY DEPARTMENT
   ========================================================= */

function getMembersByDepartment(
    department
) {

    return getMembers()
        .filter(
            member =>
                member.department ===
                department
        );

}


/* =========================================================
   DELETE MEMBER
   ========================================================= */

function deleteMember(memberId) {

    if (
        !IVC.confirmAction(
            "Deseja eliminar este membro?"
        )
    ) {

        return;

    }


    const members =
        getMembers()
            .filter(
                member =>
                    member.id !== memberId
            );


    IVC.saveStorageData(
        "members",
        members
    );


    IVC.showToast(
        "Membro eliminado.",
        "warning"
    );


    renderMembers();

    updateMemberStatistics();

}


/* =========================================================
   INITIALS
   ========================================================= */

function getInitials(name) {

    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map(
            word =>
                word
                    .charAt(0)
                    .toUpperCase()
        )
        .join("");

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
   GLOBAL API
   ========================================================= */

window.IVCMembers = {

    getMembers,

    getMemberById,

    getMembersByChurch,

    getMembersByDepartment,

    addMember,

    deleteMember,

    renderMembers,

    updateMemberStatistics

};