function getJoinConfig() {
    return window.JOIN_CONFIG || {};
}

function normalizeBaseUrl(url) {
    if (!url || typeof url !== "string") return "";
    let normalized = url.trim();
    if (!normalized) return "";
    if (!normalized.endsWith("/")) normalized += "/";
    return normalized;
}

function buildFirebaseUrl(path = "") {
    const { BASE_URL } = getJoinConfig();
    const baseUrl = normalizeBaseUrl(BASE_URL);
    if (!baseUrl) {
        console.error("JOIN_CONFIG.BASE_URL is not set. Check scripts/config.js (or localStorage JOIN_BASE_URL).");
        return "";
    }

    const cleanPath = String(path || "").replace(/^\//, "");
    return `${baseUrl}${cleanPath}.json`;
}

function withAuth(url) {
    const { AUTH_TOKEN } = getJoinConfig();
    if (!AUTH_TOKEN) return url;
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}auth=${encodeURIComponent(AUTH_TOKEN)}`;
}

async function parseJsonSafe(response) {
    try {
        return await response.json();
    } catch (error) {
        return undefined;
    }
}

/**
 * Fetches data asynchronously from the specified API endpoint.
 *
 * @param {string} path - The relative path to the data (without the .json extension).
 * @returns {Promise<Object>} - A promise that resolves to the JSON data fetched from the server.
 * If an error occurs, an error message is logged.
 */
async function getData(path = "") {
    try {
        const url = withAuth(buildFirebaseUrl(path));
        if (!url) return undefined;

        let response = await fetch(url);
        if (!response.ok) {
            const body = await parseJsonSafe(response);
            console.error("getData failed:", response.status, response.statusText, body);
            return undefined;
        }

        let responseAsJson = await parseJsonSafe(response);
        if (typeof responseAsJson === "undefined") {
            console.error("getData failed: could not parse JSON response");
            return undefined;
        }
        if (responseAsJson && typeof responseAsJson === "object" && "error" in responseAsJson) {
            console.error("getData returned error:", responseAsJson);
            return undefined;
        }
        return responseAsJson;
    } catch (error) {
        console.error("Error", error);
        return undefined;
    }
}
/**
 * Sends data to the specified API endpoint using a POST request.
 *
 * @param {string} path - The relative path to the endpoint (without the .json extension).
 * @param {Object} data - The data object to be sent in the POST request.
 * @returns {Promise<Object>} - A promise that resolves to the JSON response from the server.
 */
async function postData(path = "", data = {}) {
    const url = withAuth(buildFirebaseUrl(path));
    if (!url) return undefined;

    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const body = await parseJsonSafe(response);
        console.error("postData failed:", response.status, response.statusText, body);
        return undefined;
    }
    const json = await parseJsonSafe(response);
    if (typeof json === "undefined") {
        console.error("postData failed: could not parse JSON response");
        return undefined;
    }
    return json;
}

/**
 * Sends data to the specified API endpoint using a PUT request to update existing data.
 *
 * @param {string} path - The relative path to the endpoint (without the .json extension).
 * @param {Object} data - The data object to be sent in the PUT request.
 * @returns {Promise<Object>} - A promise that resolves to the JSON response from the server.
 */
async function putData(path = "", data = {}) {
    const url = withAuth(buildFirebaseUrl(path));
    if (!url) return undefined;

    let response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const body = await parseJsonSafe(response);
        console.error("putData failed:", response.status, response.statusText, body);
        return undefined;
    }
    const json = await parseJsonSafe(response);
    if (typeof json === "undefined") {
        console.error("putData failed: could not parse JSON response");
        return undefined;
    }
    return json;
}

/**
 * Deletes data from the specified API endpoint using a DELETE request.
 *
 * @param {string} path - The relative path to the endpoint (without the .json extension).
 * @returns {Promise<Object>} - A promise that resolves to the JSON response from the server.
 */
async function deleteData(path = "", data = {}) {
    const url = withAuth(buildFirebaseUrl(path));
    if (!url) return undefined;

    let response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        const body = await parseJsonSafe(response);
        console.error("deleteData failed:", response.status, response.statusText, body);
        return undefined;
    }
    const json = await parseJsonSafe(response);
    if (typeof json === "undefined") {
        console.error("deleteData failed: could not parse JSON response");
        return undefined;
    }
    return json;
}
