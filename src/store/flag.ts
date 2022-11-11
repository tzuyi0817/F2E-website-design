import { defineStore } from "pinia";

const defaultState = {
  device: '',  
};

export default defineStore('f2e_website_design_flag', {
  state: () => ({ ...defaultState }),
  getters: {
    isMobile: (state) => {
      return state.device === 'mobile';
    },
  },
  actions: {
    setInnerSize(size: number) {
      this.device = size > 768 ? 'desktop' : 'mobile';
    },
  },
});