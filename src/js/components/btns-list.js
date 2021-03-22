{
    'use strict';

    const btnsLists = document.querySelectorAll('.btn-list');
    const os = getMobileOperatingSystem();
    for (let i = 0; i < btnsLists.length; i++) {
        const btnsList = btnsLists[i];
        const appStoreBtn = btnsList.querySelector('.btn--appstore');
        const googlePlayBtn = btnsList.querySelector('.btn--googleplay');


        if (os === 'iOS') {
            googlePlayBtn.style.display = 'none';
        } else if (os === 'Android') {
            appStoreBtn.style.display = 'none';
        }
    }

    function getMobileOperatingSystem() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ) {
            return 'iOS';
        } else if( userAgent.match( /Android/i ) ) {
            return 'Android';
        } else {
            return 'unknown';
        }
    }
}