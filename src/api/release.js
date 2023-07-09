import request from '@/utils/request'

export default{
  getReleaseList(searchModel){
    return request({
      url: '/release/page',
      method: 'get',
      params:{
        pageNum: searchModel.pageNum,
        pageSize: searchModel.pageSize,
        pageShipid: searchModel.shipid,
        pageOperatorid: searchModel.operatorid,
        pageClearancetype: searchModel.clearancetype,
      },
    });
  },
  addRelease(release){
    return request({
      url: '/release',
      method: 'post',
      data: release
    });
  },
  updateRelease(release){
    return request({
      url: '/release',
      method: 'put',
      data: release
    });
  },
  saveRelease(release){
    if(release.id == null && release.id == undefined){
      return this.addRelease(release);
    }
    return this.updateRelease(release);
  },
  getReleaseById(id){
    return request({
      url: `/release/${id}`,
      method: 'get'
    });
  },
  deleteReleaseById(id){
    return request({
      url: `/release/${id}`,
      method: 'delete'
    });
  },
}