import { firebase } from '@react-native-firebase/analytics';

export const cusutomAnalytics = firebase.analytics();

export const handleLogEvent = async (eventName, eventData) => {
  await cusutomAnalytics.logEvent(eventName, eventData);
};

// Today View
export const TODAYVIEW_VIEW_EVENT = 'todayView__view';
export const TODAYVIEW_SCROLL_EVENT = 'todayView__scroll';
export const WEEKLYCALENDAR_NAVIGATEWEEK_CLICK_EVENT =
  'weeklyCalenar__navigateWeek__click';
export const WEEKLYCALENDAR_DAYITEM_CLICK_EVENT =
  'weeklyCalenar__dayItem__click';
export const CATEGORY_SCROLL_EVENT = 'category__scroll';
export const CATEGORY_CATEGORY_CLICK_EVENT = 'category__category__click';
export const CATEGORY_ADDCATEGORY_CLICK_EVENT = 'category__addCategory__Click';
export const DAILYTODO_LIST_CLICK_EVENT = 'dailyTodo__list__click';
export const DAILYTODO_LIST_DRAG_EVENT = 'dailyTodo__list__drag';
export const DAILYTODO_MEATBALLMENU_CLICK_EVENT =
  'dailyTodo__meatballMenu__click';
export const DAILYTODO_CREATEAITODO_CLICK_EVENT =
  'dailyTodo__createAITodo__click';
export const DAILYTODO_CREATEAITODOMODAL_CLICK_EVENT =
  'dailyTodo__createAITodoModal__click';
export const DAILYTODO_TODOCOMPLETE_CLICK_EVENT =
  'dailyTodo__todoComplete__click';
export const DAILYTODO_SUBTODOCOMPLETE_CLICK_EVENT =
  'dailyTodo__subTodoComplete__click';
export const TODOMODAL_EDIT_CLICK_EVENT = 'todoModal__edit__click';
export const TODOMODAL_DELETE_CLICK_EVENT = 'todoModal__delete__click';
export const TODOMODAL_CREATESUBTODO_CLICK_EVENT =
  'todoModal__createSubTodo__click';
export const TODOMODAL_CHANGEDATE_CLICK_EVENT = 'todoModal__changeDate__click';
export const TODOMODAL_MOVETOINBOX_CLICK_EVENT =
  'todoModal__moveToInbox__click';
export const TODAYVIEW_TEXTINPUT_SUBMIT_EVENT = 'todayView__textInput__submit';

// Inbox View
export const INBOXVIEW_VIEW_EVENT = 'inboxView__view';
export const INBOXVIEW_SCROLL_EVENT = 'inboxView__scroll';
export const INBOX_CATEGORY_SCROLL_EVENT = 'inbox__category__scroll';
export const INBOX_CATEGPRY_CLICK_EVENT = 'inbox__category__click';
export const INBOXTODO_LIST_CLICK_EVENT = 'inboxTodo__list__click';
export const INBOXTODO_LIST_DRAG_EVENT = 'inboxTodo__list__drag';
export const INBOXTODO_MEATBALLMENU_CLICK_EVENT =
  'inboxTodo__meatballMenu__click';
export const INBOXTODO_CREATEAITODO_CLICK_EVENT =
  'inboxTodo__createAITodo__click';
export const INBOXTODO_COMPLETE_CLICK_EVENT = 'inboxTodo__complete__click';
export const INBOXTODO_SUBTODO_COMPLETECLICK_EVENT =
  'inboxTodo__subTodo__completeClick';
