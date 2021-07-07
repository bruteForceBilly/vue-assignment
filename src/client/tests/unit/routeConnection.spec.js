import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import routeConnection from '@/store/modules/routeConnection.js'
import cloneDeep from 'lodash.clonedeep'

test('setMessageAction sets number zero as default value if illegal type string', async () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store(cloneDeep(routeConnection))

  const message = {
    time: '',
    energy: '',
    gps: '',
    odo: '',
    speed: '',
    soc: ''
  }

  expect(store.state.message).toBe(null)

  await store.dispatch('setMessageAction', message)

  expect(store.state.message.time).toBe(0)
  expect(store.state.message.energy).toBe(0)
  expect(store.state.message.odo).toBe(0)
  expect(store.state.message.speed).toBe(0)
  expect(store.state.message.soc).toBe(0)
})

test('setMessageAction splits GPS string into tuple of numbers', async () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store(cloneDeep(routeConnection))

  const message = {
    gps: '52.093448638916016|5.117378234863281'
  }

  const expected = [52.093448638916016, 5.117378234863281]

  expect(store.state.message).toBe(null)

  await store.dispatch('setMessageAction', message)

  expect(store.state.message.gps).toEqual(expect.arrayContaining(expected))
})
