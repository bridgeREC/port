import request from '@/utils/request'

export default{
  getUserList(searchModel){
    return request({
      url: '/admin/page',
      method: 'get',
      params:{
        pageNum: searchModel.pageNum,
        pageSize: searchModel.pageSize,
        pageusername: searchModel.username,
        pageuserrealname: searchModel.realname,
        pageusership: searchModel.usership,
        pageuserreviewstatus: searchModel.userreviewstatus,
        pageuserroleid: searchModel.roleid,
      }
    });
  },
  addUser(user){
    return request({
      url: '/user',
      method: 'post',
      data: user
    });
  },
  updateUser(user){
    return request({
      url: '/user',
      method: 'put',
      data: user
    });
  },
  saveUser(user){
    if(user.id == null && user.id == undefined){
      return this.addUser(user);
    }
    return this.updateUser(user);
  },
  getUserById(id){
    return request({
      //url: '/user/' + id,
      url: `/user/${id}`,
      method: 'get'
    });
  },
  getUserByName(name){
    return request({
      //url: '/user/' + id,
      url: `/user/infobyname/${name}`,
      method: 'get'
    });
  },
  deleteUserById(id){
    return request({
      url: `/user/${id}`,
      method: 'delete'
    });
  },
}