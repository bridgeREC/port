import request from '@/utils/request'

export default{
  getAnnouncementList(searchModel){
    return request({
      url: '/announcement/page',
      method: 'get',
      params:{
        pageNum: searchModel.pageNum,
        pageSize: searchModel.pageSize,
        pageTitle: searchModel.title,
        pageAuthor: searchModel.author,
      },
    });
  },
  addAnnouncement(announcement){
    return request({
      url: '/announcement',
      method: 'post',
      data: announcement
    });
  },
  updateAnnouncement(announcement){
    return request({
      url: '/announcement',
      method: 'put',
      data: announcement
    });
  },
  saveAnnouncement(announcement){
    if(announcement.id == null && announcement.id == undefined){
      return this.addAnnouncement(announcement);
    }
    return this.updateAnnouncement(announcement);
  },
  getAnnouncementById(id){
    return request({
      url: `/announcement/${id}`,
      method: 'get'
    });
  },
  deleteAnnouncementById(id){
    return request({
      url: `/announcement/${id}`,
      method: 'delete'
    });
  },
}