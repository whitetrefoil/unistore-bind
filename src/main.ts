import { Store } from 'unistore'

type IActionCreator<K, P> = (state: K, payload: P) => Promise<Partial<K>>|Partial<K>
type IBoundAction<P> = (payload?: P) => void

function bindWithName<K extends {}, P = void>(store: Store<K>, name: string, action: IActionCreator<K, P>): IBoundAction<P> {
  const a = action
  Object.defineProperty(a, 'name', { value: name })
  return store.action(a)
}

function bindWithoutName<K extends {}, P = void>(store: Store<K>, action: IActionCreator<K, P>): IBoundAction<P> {
  if (action.name != null && action.name.length > 0) {
    return store.action(action)
  }
  return bindWithName(store, 'unknown', action)
}

export function bind<K extends {}, P = void>(store: Store<K>, name: string, action: IActionCreator<K, P>): IBoundAction<P>
export function bind<K extends {}, P = void>(store: Store<K>, action: IActionCreator<K, P>): IBoundAction<P>
export function bind<K extends {}, P = void>(store: Store<K>, nameOrAction: string|IActionCreator<K, P>, action?: IActionCreator<K, P>): IBoundAction<P> {
  if (typeof nameOrAction === 'function') {
    return bindWithoutName(store, nameOrAction)
  } else if (action == null) {
    return bindWithName(store, nameOrAction, () => ({}))
  } else {
    return bindWithName(store, nameOrAction, action)
  }
}


export class Binder<K> {
  store: Store<K>
  constructor(store: Store<K>) {
    this.store = store
  }

  bind<P = void>(name: string, action: IActionCreator<K, P>): IBoundAction<P>
  bind<P = void>(action: IActionCreator<K, P>): IBoundAction<P>
  bind<P = void>(nameOrAction: string|IActionCreator<K, P>, action?: IActionCreator<K, P>): IBoundAction<P> {
    return bind(this.store, nameOrAction as any, action as any)
  }
}
