import { MdcSnackbar } from '@angular-mdc/web'

export const showSnackBar = (snackbar: MdcSnackbar, message: string, action: string = 'OK'): void => {

    // this is to avoid component validation check errors
    setTimeout(() => {
        const snackbarRef = snackbar.show(message, action, {
            align: 'center',
            multiline: false,
            dismissOnAction: false,
            focusAction: false,
            actionOnBottom: false,
        })

        snackbarRef.afterDismiss().subscribe(() => {

        })
    })
}