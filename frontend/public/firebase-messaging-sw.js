// 서비스워커 스크립트 설치 여부
self.addEventListener('install', function (e) {
    console.log('fcm sw install..');
    self.skipWaiting();
});

// 서비스워커 활성화 여부
self.addEventListener('activate', function (e) {
    console.log('fcm sw activate..');
});

// 웹 푸시 알림 노출
self.addEventListener('push', function (e) {
    if (!e.data.json()) return;
    console.log(e);

    const resultData = e.data.json().notification;
    const notificationTitle = resultData.title;
    const notificationOptions = {
        body: resultData.body,
        icon: resultData.image, // 웹 푸시 이미지는 icon
        tag: resultData.tag,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// 웹 푸시 알림 클릭 핸들러
self.addEventListener('notificationclick', function (event) {
    console.log('알림 클릭');
    const url = '/'; // 이동 위치
    event.notification.close();
    event.waitUntil(clients.openWindow(url));
});
