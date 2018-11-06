export interface ApplicationContext {
    appName: string
    userId: string
    siteCollectionUrl: string
    relativeWebUrl: string
    webUrl: string
    appUrl: string
    siteAssetsUrl: string
    appSharedUrl: string
    appPageUrl: string
    briefPageUrl: string
    adminPageUrl: string
    deckPageUrl: string
    invitationsPageUrl: string

    sharedAppUrl: string
    pagesUrl: string
    appConfigRootUrl: string
    isIOS: boolean
}