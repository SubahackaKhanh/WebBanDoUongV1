export default {
    namespaced: true,
    state: {
      admin: JSON.parse(localStorage.getItem('admin')) || null,
    },
    mutations: {
      setAdmin(state, admin) {
        state.admin = admin;
        localStorage.setItem('admin', JSON.stringify(admin));
      },
      logout(state) {
        state.admin = null;
        localStorage.removeItem('admin');
      }
    },
    actions: {
      adminLogin({ commit }, admin) {
        commit('setAdmin', admin);
      },
      logout({ commit }) {
        commit('logout');
      }
    },
    getters: {
      isAuthenticated: state => !!state.admin,
      getAdmin: state => state.admin
    }
  };