// app/components/menu/MenuNavLink.test.ts
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import MenuNavLink from './MenuNavLink.vue'

describe('MenuNavLink', () => {
  it('renders correctly with label and link', async () => {
    const wrapper = await mountSuspended(MenuNavLink, {
      props: {
        to: '/test-path',
        label: 'Test Link',
      },
    })

    const link = wrapper.find('a[href="/test-path"]')
    expect(link.exists()).toBe(true)

    expect(wrapper.text()).toContain('Test Link')
  })

  it('renders with an icon when iconName is provided', async () => {
    const wrapper = await mountSuspended(MenuNavLink, {
      props: {
        to: '/another-path',
        label: 'Icon Link',
        iconName: 'home',
      },
    })
    console.log('html', wrapper.html())

    const icon = wrapper.find('baseicon')
    expect(icon.exists()).toBe(true)

    expect(icon.attributes('name')).toBe('home')
  })
})
