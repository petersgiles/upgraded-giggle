export function initApplication(): Function {
  return () =>
    new Promise(resolve => {
      // tslint:disable-next-line:no-console
      // store.pipe(select(fromRoot.getLoggedIn)).subscribe(isLoggedIn => {
      //   if (isLoggedIn) {

      //     // tslint:disable-next-line:no-console
      //     console.log('user is logged in, start auto token refresh')

      //     store.dispatch(new StartAutoTokenRefresh())
      //   }
      // })

      resolve(true)
    })
}
