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
            {
                path: 'workagreements',
                data: {
                    menu: {
                        title: 'Werkdocumenten',
                        icon: 'ion-briefcase',
                        selected: false,
                        expanded: false,
                        order: 350
                    }
                },
                children: [                                       {
                        path: 'walist',
                        data: {
                            menu: {
                                title: 'Werkdoc Lijst',
                            }
                        }
                    },
                    {
                        path: 'newwa',
                        data: {
                            menu: {
                                title: 'Nieuw Werkdoc',
                            }
                        }
                    }
                ]
            },
            {
                path: 'tickets',
                data: {
                    menu: {
                        title: 'Tickets',
                        icon: 'ion-ios-list-outline',
                        selected: false,
                        expanded: false,
                        order: 400
                    }
                },
                children: [
                    {
                        path: 'ticketlist',
                        data: {
                            menu: {
                                title: 'Ticket Lijst',
                            }
                        }
                    },
                    {
                        path: 'newticket',
                        data: {
                            menu: {
                                title: 'Nieuw Ticket',
                            }
                        }
                    }
                ]
            },
            ]
    }
];