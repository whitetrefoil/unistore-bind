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
import store from './store'

const myAction = bind(store, 'myAction', async state => {
  // Bind with a given name.
})

const myAction2 = bind(store, async function myAction2(state) {
  // Bind with function's own name.
})

const myAction3 = bind(store, async state => {
  // Bind with 'unknown' as action name.
})

const binder = new Binder(store)
const myAction4 = binder.bind('myAction4', async state => {
  // Don't need pass-in the store in this way.
})
```

Changelog
---------

### v0.1.0

* Initial release.
