export const PAGES_MENU = [
    {
        path: 'views',
        children: [
            {
                path: 'dashboard',
                data: {
                    menu: {
                        title: 'Dashboard',
                        icon: 'ion-android-home',
                        selected: false,
                        expanded: false,
                        order: 0
                    }
                }
            },
            {
                path: 'customers',
                data: {
                    menu: {
                        title: 'Klanten',
                        icon: 'ion-ios-people',
                        selected: false,
                        expanded: false,
                        order: 200
                    }
                }
            },
            {
                path: 'documents',
                data: {
                    menu: {
                        title: 'Documenten',
                        icon: 'ion-document',
                        selected: false,
                        expanded: false,
                        order: 300
                    }
                }
            },
            ]
    }
];