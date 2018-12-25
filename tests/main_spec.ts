import { expect }       from 'chai'
import createStore      from 'unistore'
import { bind, Binder } from '../src/main'

interface IState {
  test: string
}

it('bind', () => {

  const store = createStore<IState>({
    test: 'asdf',
  })

  const myAction = bind(store, 'myActionName', () => ({
    test: 'zxcv',
  }))

  store.subscribe((state, action) => {
    expect((action as any).name).to.eql('myActionName')
  })

  myAction()

  expect(store.getState().test).to.eql('zxcv')
})

it('bind unknown', () => {

  const store = createStore<IState>({
    test: 'asdf',
  })

  const myAction = bind(store, () => ({
    test: 'zxcv',
  }))

  store.subscribe((state, action) => {
    expect((action as any).name).to.eql('unknown')
  })

  myAction()

  expect(store.getState().test).to.eql('zxcv')
})

it('bind named', () => {

  const store = createStore<IState>({
    test: 'asdf',
  })

  const myAction = bind(store, function myActionFn() {
    return { test: 'zxcv' }
  })

  store.subscribe((state, action) => {
    expect((action as any).name).to.eql('myActionFn')
  })

  myAction()

  expect(store.getState().test).to.eql('zxcv')
})

describe('Binder', () => {
  it('bind', () => {

    const store = createStore<IState>({
      test: 'asdf',
    })
    const binder = new Binder(store)

    const myAction = binder.bind('myActionName', () => ({
      test: 'zxcv',
    }))

    store.subscribe((state, action) => {
      expect((action as any).name).to.eql('myActionName')
    })

    myAction()

    expect(store.getState().test).to.eql('zxcv')
  })

  it('bind unknown', () => {

    const store = createStore<IState>({
      test: 'asdf',
    })
    const binder = new Binder(store)

    const myAction = binder.bind(() => ({
      test: 'zxcv',
    }))

    store.subscribe((state, action) => {
      expect((action as any).name).to.eql('unknown')
    })

    myAction()

    expect(store.getState().test).to.eql('zxcv')
  })

  it('bind named', () => {

    const store = createStore<IState>({
      test: 'asdf',
    })
    const binder = new Binder(store)

    const myAction = binder.bind(function myActionFn() {
      return { test: 'zxcv' }
    })

    store.subscribe((state, action) => {
      expect((action as any).name).to.eql('myActionFn')
    })

    myAction()

    expect(store.getState().test).to.eql('zxcv')
  })
})
