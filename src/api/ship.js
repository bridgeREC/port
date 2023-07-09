import request from '@/utils/request'

export default{
  getShipList(searchModel){
    return request({
      url: '/ship/page',
      method: 'get',
      params:{
        pageNum: searchModel.pageNum,
        pageSize: searchModel.pageSize,
        pageShipname: searchModel.name,
        pageShiptype: searchModel.shiptype,
        pageCaptainname: searchModel.captainname,
        pageOwnername: searchModel.ownername,
        pageLength: searchModel.length,
        pageTonnage: searchModel.tonnage,
        pageDraft: searchModel.draft,
        pageReviewstatus: searchModel.reviewstatus,
        pageUserid: searchModel.userid
      },
    });
  },
  addShip(ship){
    return request({
      url: '/ship',
      method: 'post',
      data: ship
    });
  },
  updateShip(ship){
    return request({
      url: '/ship',
      method: 'put',
      data: ship
    });
  },
  saveShip(ship){
    if(ship.id == null && ship.id == undefined){
      return this.addShip(ship);
    }
    return this.updateShip(ship);
  },
  getShipById(id){
    return request({
      url: `/ship/${id}`,
      method: 'get'
    });
  },
  deleteShipById(id){
    return request({
      url: `/ship/${id}`,
      method: 'delete'
    });
  },
}