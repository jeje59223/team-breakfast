import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TeamBreakfastHome from '@/components/TeamBreakfastHome.vue';

describe('TeamBreakfastHome', () => {
  const wrapper = mount(TeamBreakfastHome);

  it('renders properly', () => {
    const title = wrapper.find('[tnr-id="home-title"]');
    const subtitle = wrapper.find('[tnr-id="home-subtitle"]');
    expect(title.text()).toBe('Home');
    expect(subtitle.text()).toBe('Welcome to the home page');
  });
});
