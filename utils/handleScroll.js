import { handleLogEvent } from '@/utils/logEvent';

export const handleScroll = async (eventName, userId, event) => {
  // 로그 남기기
  await handleLogEvent(eventName, {
    time: new Date().toISOString(),
    userId: userId,
  });
};

export const DEFAULT_SCROLL_EVENT_THROTTLE = 100;
