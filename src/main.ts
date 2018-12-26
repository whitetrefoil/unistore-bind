import { Store } from 'unistore'


type Action<K> = (state: K) => Partial<K>
type ActionWithArg<K, P> = (state: K, payload: P) => Partial<K>
type AsyncAction<K> = (state: K) => Promise<Partial<K>>
type AsyncActionWithArg<K, P> = (state: K, payload: P) => Promise<Partial<K>>

type BoundAction = () => void
type BoundActionWithArg<P> = (payload: P) => void
type AsyncBoundAction = () => Promise<void>
type AsyncBoundActionWithArg<P> = (payload: P) => Promise<void>


export function bind<K, P>(store: Store<K>, name: string, action: Action<K>): BoundAction
export function bind<K, P>(store: Store<K>, name: string, action: ActionWithArg<K, P>): BoundActionWithArg<P>
export function bind<K, P>(store: Store<K>, name: string, action: AsyncAction<K>): AsyncBoundAction
export function bind<K, P>(store: Store<K>, name: string, action: AsyncActionWithArg<K, P>): AsyncBoundActionWithArg<P>
export function bind<K, P>(store: Store<K>, name: string, action: Function): Function {
  const a = action
  Object.defineProperty(a, 'name', { value: name })
  return store.action(a as any) as any
}


export class Binder<K> {
  store: Store<K>

  constructor(store: Store<K>) {
    this.store = store
  }

  bind<P>(name: string, action: Action<K>): BoundAction
  bind<P>(name: string, action: ActionWithArg<K, P>): BoundActionWithArg<P>
  bind<P>(name: string, action: AsyncAction<K>): AsyncBoundAction
  bind<P>(name: string, action: AsyncActionWithArg<K, P>): AsyncBoundActionWithArg<P>
  bind<P>(name: string, action: Function): Function {
    return bind<K, P>(this.store, name, action as any)
  }
}
