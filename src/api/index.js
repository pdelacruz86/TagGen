import myAPI from './resources'
import config from '../config'

export default {
  localLogin: function (data) {
    return myAPI.post(config.api_root + '/login', {
      username: data.username,
      password: data.password
    })
    .then(function (response) {
      console.log(response)
      return response
    })
    .catch(function (error) {
      console.log(error)
    })
  },
  getUserInfo: function (data) {
    return myAPI.get(config.api_root + config.api_root_path + '/users')
      .then(function (response) {
        console.log(response)
        return response
      })
  }
}
