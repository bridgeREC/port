import request from '@/utils/request'

export default{
  getAppealsList(searchModel){
    return request({
      url: '/appeals/page',
      method: 'get',
      params:{
        pageNum: searchModel.pageNum,
        pageSize: searchModel.pageSize,
        pageShipid: searchModel.shipid,
        pageUserid: searchModel.userid,
        pageStatus: searchModel.status,
      },
    });
  },
  addAppeals(appeals){
    return request({
      url: '/appeals',
      method: 'post',
      data: appeals
    });
  },
  updateAppeals(appeals){
    return request({
      url: '/appeals',
      method: 'put',
      data: appeals
    });
  },
  saveAppeals(appeals){
    if(appeals.id == null && appeals.id == undefined){
      return this.addAppeals(appeals);
    }
    return this.updateAppeals(appeals);
  },
  getAppealsById(id){
    return request({
      url: `/appeals/${id}`,
      method: 'get'
    });
  },
  deleteAppealsById(id){
    return request({
      url: `/appeals/${id}`,
      method: 'delete'
    });
  },
}