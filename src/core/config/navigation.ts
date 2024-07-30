import { EPermission } from "../enums/EPermission";

const navigation = [
    {
        path: '/home',
        name: 'Painel',
        roles: [EPermission.operator, EPermission.admin]
    },
    {
        path: '/agenda',
        name: 'Agenda',
        roles: [EPermission.operator, EPermission.admin]
    },
    {
        path: '/users',
        name: 'Farmaceuticos',
        roles: [EPermission.admin]
    },
    {
        path: '/patients',
        name: 'Pacientes',
        roles: [EPermission.operator, EPermission.admin]
    }
]

export default navigation;