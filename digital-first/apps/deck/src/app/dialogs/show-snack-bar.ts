import { MdcSnackbar, MdcSnackbarConfig } from '@angular-mdc/web'

export const dfSnackbarConfig: MdcSnackbarConfig<any> = {
}

export const showSnackBar = (snackbar: MdcSnackbar, message: string, action: string = 'OK'): void => {

    // this is to avoid component validation check errors
    setTimeout(() => {
        const snackbarRef = snackbar.open(message, action, dfSnackbarConfig)
        snackbarRef.afterDismiss().subscribe(() => {
        })
    })
}