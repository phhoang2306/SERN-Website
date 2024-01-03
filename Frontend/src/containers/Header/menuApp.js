export const adminMenu = [
    { //User
        name: 'menu.admin.manage-user', menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
            },
            {
                name: 'menu.doctor.schedule', link: '/doctor/manage-schedule'
            }
        ]
    },
    { //Clinic
        name: 'menu.admin.clinic', menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            }
        ]
    },
    { //Sepcialty
        name: 'menu.admin.specialty', menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            }
        ]
    },
    { //Post
        name: 'menu.admin.post', menus: [
            {
                name: 'menu.admin.manage-post', link: '/system/manage-post'
            }
        ]
    },
];

export const doctorMenu = [
    { //Doctor
        name: 'menu.admin.manage-user', menus: [
            {
                name: 'menu.doctor.schedule', link: '/doctor/manage-schedule'
            }
        ]
    },
    { //Clinic
        name: 'menu.admin.clinic', menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            }
        ]
    },
    { //Sepcialty
        name: 'menu.admin.specialty', menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            }
        ]
    },
    { //Post
        name: 'menu.admin.post', menus: [
            {
                name: 'menu.admin.manage-post', link: '/system/manage-post'
            }
        ]
    },
];