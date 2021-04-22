import axios from 'axios';

export default{
  async tryToLogTheUserIn({ commit },{ userName, password }) { 
    return await axios({
      method: "POST",
      url: `${this.$axios.defaults.baseURL}/login`,
        data: {
            userName,
            password,
        }
      })
      .then(res => {
        console.log('sakto na si res?',res);
        console.log("testUser", res.data);
        commit("logTheUserIn", res.data);
        return res.data;
      })
    },
}