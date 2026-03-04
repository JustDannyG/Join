// Central place to configure your Firebase Realtime Database connection.
// If you created a *new* Realtime Database, replace DEFAULT_BASE_URL with the URL shown in:
// Firebase Console → Realtime Database → Data (top of the page).
//
// Optional (local override without changing this file):
// localStorage.setItem("JOIN_BASE_URL", "https://<db>-default-rtdb.<region>.firebasedatabase.app/");
(function () {
    const DEFAULT_BASE_URL = "https://join-322aa-default-rtdb.europe-west1.firebasedatabase.app/";

    const storedBaseUrl = localStorage.getItem("JOIN_BASE_URL");
    const baseUrl = (storedBaseUrl || DEFAULT_BASE_URL).trim();

    window.JOIN_CONFIG = window.JOIN_CONFIG || {};
    window.JOIN_CONFIG.BASE_URL = baseUrl;

    // If your database rules require authentication, you can set an auth token here.
    // window.JOIN_CONFIG.AUTH_TOKEN = "REPLACE_WITH_FIREBASE_DATABASE_SECRET_OR_ID_TOKEN";
})();
