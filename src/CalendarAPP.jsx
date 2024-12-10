import { Provider } from 'react-redux'
import { AppRouter } from './router/AppRouter'
import { store } from './store'

export const CalendarAPP = () => {
  return (
    <>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </>
  )
}
