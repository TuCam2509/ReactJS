export const adminMenu = [
    { //quản lý người dùng
        name: 'menu.admin.manage-user', 
        menus: [
            {
                name: 'menu.admin.crud',link: '/system/user-manage',
            },
            {
                name: 'menu.admin.crud-redux',link: '/system/user-redux',
            },
            {
                name: 'menu.admin.manage-doctor',link: '/system/manager-doctor',
                //subMenus: [
                    //{ name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                    //{ name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                //]
            },
            {//quản lý kế hoạch khám bệnh
                        name: 'menu.doctor.manager-schedule',link: '/doctors/manage-schedule',
            }

            
           
        ]
    },
    { //quản lý bác sĩ
        name: 'menu.admin.clinic', 
        menus: [
            {
                name: 'menu.admin.manage-clinic',link: '/system/manage-clinic',
            },
        ]
    },
    { //quản lý phòng khám
        name: 'menu.admin.specialty', 
        menus: [
            {
                name: 'menu.admin.manage-specialty',link: '/system/manage-specialty',
            },
        ]
    },
    { //quản lý bài đăng
        name: 'menu.admin.handbook', 
        menus: [
            {
                name: 'menu.admin.manage-handbook',link: 'system/manage-hanbook',
            },
        ]
    },
   

    

];
export const doctorMenu = [
    {
    name: 'menu.admin.manage-user', 
    menus:[
    { //quản lý kế hoạch khám bệnh
                name: 'menu.doctor.manager-schedule',link: '/doctors/manage-schedule'
    },
     { //quản lý bệnh nhân khám bệnh
                name: 'menu.doctor.manager-patient',link: '/doctors/manage-patient'
    }
]
}
    

    

];
