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

  const myAction = bind(store, 'myActionName', (state) => ({
    test: 'zxcv',
  }))

  store.subscribe((state, action) => {
    expect((action as any).name).to.eql('myActionName')
  })

  myAction()

  expect(store.getState().test).to.eql('zxcv')
})

it('bindWithArg', () => {

  const store = createStore<IState>({
    test: 'asdf',
  })

  const myAction = bind(store, 'myActionName', (state: IState, val: string) => ({
    test: val,
  }))

  store.subscribe((state, action) => {
    expect((action as any).name).to.eql('myActionName')
  })

  myAction('123')

  expect(store.getState().test).to.eql('123')
})

it('bindAsync', async() => {

  const store = createStore<IState>({
    test: 'asdf',
  })

  const myAction = bind(store, 'myActionName', async() => ({
    test: 'zxcv',
  }))

  store.subscribe((state, action) => {
    expect((action as any).name).to.eql('myActionName')
  })

  await myAction()

  expect(store.getState().test).to.eql('zxcv')
})

it('bindAsync', async() => {

  const store = createStore<IState>({
    test: 'asdf',
  })

  const myAction = bind(store, 'myActionName', async() => ({
    test: 'zxcv',
  }))

  store.subscribe((state, action) => {
    expect((action as any).name).to.eql('myActionName')
  })

  await myAction()

  expect(store.getState().test).to.eql('zxcv')
})

it('bindAsyncWithArgs', async() => {

  const store = createStore<IState>({
    test: 'asdf',
  })

  const myAction = bind(store, 'myActionName', async(state: IState, val: string) => ({
    test: val,
  }))

  store.subscribe((state, action) => {
    expect((action as any).name).to.eql('myActionName')
  })

  await myAction('123')

  expect(store.getState().test).to.eql('123')
})

describe('Binder', () => {

  it('bind', () => {

    const store  = createStore<IState>({
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

  it('bindAsync', async() => {

    const store  = createStore<IState>({
      test: 'asdf',
    })
    const binder = new Binder(store)

    const myAction = binder.bind('myActionName', async() => ({
      test: 'zxcv',
    }))

    store.subscribe((state, action) => {
      expect((action as any).name).to.eql('myActionName')
    })

    await myAction()

    expect(store.getState().test).to.eql('zxcv')
  })
})
