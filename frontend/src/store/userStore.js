export default {
  namespaced: true,
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('user');
    }
  },
  actions: {
    login({ commit }, user) {
      commit('setUser', user);
    },
    logout({ commit }) {
      commit('logout');
    }
  },
  getters: {
    isAuthenticated: state => !!state.user,
    isLoggedIn: state => !!state.user, // đồng bộ với ProductGrid.vue
    getUser: state => state.user,
    userId: state => (state.user ? state.user.id : null) // Thêm getter userId
  }
};