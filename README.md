@whitetrefoil/unistore-bind
============================

**WARNING: THIS APPLICATION IS STILL DEVELOPING!!!**

Tiny binder for unistore.

Why This?
---------


Usage
-----

```typescript
import { Binder, bind } from '@whitetrefoil/unistore-bind'
import { State, store } from './store'

const myAction = bind(store, 'myAction', state => {
  // Bind with a given name.
})
myAction()

const myAction2 = bind(store, 'myAction2', (state: State, val: string) => {
  // Bind with an additional payload.
  // Type of `state` must be specified in this case.
})
myAction2('test')

const myAction3 = bind(store, 'myAction3', async state => {
  // Bind an async action
})
myAction3().then(() => {
  // ...
})

const binder = new Binder(store)
const myAction4 = binder.bind('myAction4', async state => {
  // Don't need pass-in the store in this way.
})
```

Changelog
---------

### v0.2.0

* Now bound actions can be async automatically (by type of action).
* When the action accepts additional payload, type of `state` in action arguments is required as a workaround of above.
* Remove 'unknown' action name. Now action name is required.

### v0.1.0

* Initial release.
