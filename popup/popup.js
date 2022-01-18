/*
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

async function getTabId() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.id;
  }

const tabId = getTabId().then (tabId => {
    chrome.scripting.executeScript({files: ["/scanner.js"], target: {tabId: tabId, allFrames: true}})
});