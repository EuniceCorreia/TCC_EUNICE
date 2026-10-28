interface RouteInfo {
    category: string;
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const MenuItems: RouteInfo[] = [
    { category: 'dashboard', path: '', title: 'Dashboard', icon: '', class: '' },
    { category: 'dashboard', path: '/dashboard', title: 'Dashboard', icon: 'tachometer-alt', class: '' },

    { category: 'themes', path: '', title: 'Jogo', icon: '', class: '' },
    { category: 'game_figures', path: '/game-figures', title: 'Figuras', icon: 'image', class: '' },
    { category: 'themes', path: '/themes', title: 'Temas', icon: 'images', class: '' },

    { category: '', path: '', title: 'Configurações', icon: '', class: '' },
    { category: 'auditings', path: '/auditings', title: 'Auditoria', icon: 'cog', class: '' },
    { category: 'configs', path: '/configs', title: 'Configurações', icon: 'cog', class: '' },
    { category: 'users', path: '/users', title: 'Usuários', icon: 'cog', class: '' },
    { category: 'access_levels', path: '/access-levels', title: 'Níveis de Acesso', icon: 'cog', class: '' },
];
