import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Logo from '~/components/common/Logo.vue'

describe('Logo', () => {
  it('renders the logo text correctly', async () => {
    const wrapper = await mountSuspended(Logo)

    expect(wrapper.text()).toContain('Task Management')
  })

  it('applies correct Tailwind CSS classes', async () => {
    const wrapper = await mountSuspended(Logo)

    const textDiv = wrapper.find('div.text-xl')

    expect(textDiv.exists()).toBe(true)
    expect(textDiv.classes()).toContain('font-bold')
  })
})
