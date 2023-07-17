import { create } from "zustand"

type StoreState = {
    isLogged: boolean
}

type Screen = {
    screen: boolean
}

export const useStore = create<StoreState>(() => ({ isLogged: false }))
export const storeHelper = { setIsLogged }
function setIsLogged(isLogged: boolean) {
    useStore.setState({ isLogged: isLogged })
}

export const screenStore = create<Screen>(() => ({ screen: false }))
export const screenHelper = { setScreen }
function setScreen(screen: boolean) {
    screenStore.setState({ screen: screen })
}