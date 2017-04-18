/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

const STORAGE = browser.storage.local;
var gBackground = browser.extension.getBackgroundPage();

var saveOptions = (e) => {
    let whitelistElement = document.querySelector("#whitelist"),
        whitelistArray = gBackground.sanitize_whitelist(whitelistElement.value);
    whitelistElement["value"] = whitelistArray.join(', ') || "";

    STORAGE.set({
        oButtonBadgeTotal: document.querySelector("#buttonBadgeTotal").checked || false,
        oNotificationsOn: document.querySelector("#notificationsOn").checked || false,
        oNotificationsRate: parseInt(document.querySelector("#notificationsRate").value) || 60,
        oDayStartOffset: parseInt(document.querySelector("#dayStartOffset").value) || 0,
        oWhitelistArray: whitelistArray
    });
    e.preventDefault();
}

var restoreOptions = () => {
    STORAGE.get(gBackground.OPTIONS).then((result) => {
        document.querySelector("#buttonBadgeSite").checked = !result.oButtonBadgeTotal || true;
        document.querySelector("#buttonBadgeTotal").checked = result.oButtonBadgeTotal || false;
        document.querySelector("#notificationsOff").checked = !result.oNotificationsOn || true;
        document.querySelector("#notificationsOn").checked = result.oNotificationsOn || false;
        document.querySelector("#notificationsRate")["value"] = result.oNotificationsRate.toString() || 60;
        document.querySelector("#dayStartOffset")["value"] = result.oDayStartOffset.toString() || 4;
        document.querySelector("#whitelist")["value"] = result.oWhitelistArray.join(', ') || "";
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("#deleteButton").addEventListener("click", gBackground.deleteAllData);
