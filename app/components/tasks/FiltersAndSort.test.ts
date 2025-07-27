import { describe, it, expect, beforeEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import FiltersAndSort from './FiltersAndSort.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useTaskStore } from '~/store/tasks'

describe('FiltersAndSort', () => {
  let taskStore: ReturnType<typeof useTaskStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    taskStore = useTaskStore()
    taskStore.$reset()
  })

  it('renders filter and sort controls', async () => {
    const wrapper = await mountSuspended(FiltersAndSort)

    expect(wrapper.find('label[for="filterStatus"]').exists()).toBe(true)
    expect(wrapper.find('select#filterStatus').exists()).toBe(true)

    expect(wrapper.find('label[for="filterPriority"]').exists()).toBe(true)
    expect(wrapper.find('select#filterPriority').exists()).toBe(true)

    expect(wrapper.find('label[for="sortBy"]').exists()).toBe(true)
    expect(wrapper.find('select#sortBy').exists()).toBe(true)

    expect(wrapper.find('button').text()).toContain('Clear All Filters')
  })

  it('updates filterStatus in store when status select changes', async () => {
    const wrapper = await mountSuspended(FiltersAndSort)
    const statusSelect = wrapper.find('select#filterStatus')
    await statusSelect.setValue('completed')
    expect(wrapper.find('select#filterStatus.completed').exists()).toBe(true)
    await statusSelect.setValue('active')
    expect(wrapper.find('select#filterStatus.active').exists()).toBe(true)
  })
})
