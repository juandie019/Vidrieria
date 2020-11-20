import { shallowMount } from '@vue/test-utils'

import Vue from 'vue';
import form from '@/views/clients/form.vue'

describe('form.vue', () => {
   
  it('renders props.msg when passed', () => {
    const clientId = '1213'
    const wrapper = shallowMount(form, {
      propsData: { clientId },
      methods:{ onSubmit:() => {}}
    })
    expect(wrapper.exists()).toBe(true)
  })

  windowSpy.mockRestore();
})

// function mountComponentWithProps (Component, propsData) {
//   const Constructor = Vue.extend(Component);
//   const vm = new Constructor({
//     propsData
//   }).$mount();

//   return vm.$el;
// }


// describe('HelloWorld.vue', () => {
//   it('should be the correct color', () => {
//     const headingData = mountComponentWithProps(HelloWorld, { text: 'blue' });
//     // const styleData = headingData.style.getPropertyValue('text');
// console.log(headingData)
//     // console.log(styleData)

//     // expect(styleData).toEqual('blue');
//   });
// });
