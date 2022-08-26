const {
  CategoryModel,
  CartModel,
  ProductModel,
  RfqModel,
  UserNotificationModel,
  AnnouncementModel,
  GlobalNotificationModel,
} = require('app/models');

module.exports = async (ctx, next) => {
  CategoryModel.setDefaultLanguage(ctx.state.lang);
  CartModel.setDefaultLanguage(ctx.state.lang);
  ProductModel.setDefaultLanguage(ctx.state.lang);
  RfqModel.setDefaultLanguage(ctx.state.lang);
  UserNotificationModel.setDefaultLanguage(ctx.state.lang);
  AnnouncementModel.setDefaultLanguage(ctx.state.lang);
  GlobalNotificationModel.setDefaultLanguage(ctx.state.lang);

  return next();
};
