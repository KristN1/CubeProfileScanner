/*
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

var currentUrl = window.location.href;
var user = {
    name: currentUrl.split("/")[4].split(".")[0],
    id: currentUrl.split("/")[4].split(".")[1],
};

if (currentUrl.includes("https://www.cubecraft.net/members/") == false) {
    alert("Not a valid profile!");
    throw new Error("not cubecraft.net");
}

function getAvatar() {
    let avatar =  String(document.getElementsByClassName(`avatar-u${user.id}-l`)[0].src);
    if (avatar == "undefined") {
        return null;
    } else {
        return avatar;
    }
}

function getBanner() {
    try {
        return "https:" + document.getElementsByClassName("memberProfileBanner")[0].style.backgroundImage.split("url(\"")[1].split("\")")[0];
    } catch (e) {
        return null;
    }
}

function getName() {
    let usernameElem = document.getElementsByClassName("username ")[0].children[0]

    if (usernameElem == null) {
        usernameElem = document.getElementsByClassName("username ")[0]
    }

    const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`

    let username = {
        "text": usernameElem.innerText,
        "color": rgba2hex(getComputedStyle(usernameElem).color)
    };

    return username;
}

function getBadges() {
    let allBadges = document.getElementsByClassName("memberHeader-banners")[0];

    if (allBadges == null) {
        return null;
    }

    let badges = [];
    for (let i = 0; i < allBadges.childElementCount; i++) {
        badges.push(allBadges.children[i].innerText);
    }

    return badges;
}

function getDescription(){
    return document.getElementsByClassName("memberHeader-blurb")[0].innerText;
}

function getStats() {
    let memberStats = document.getElementsByClassName("pairJustifier")[0];
    let memberActivity = document.getElementsByClassName("uix_memberHeader__extra")[0];

    let stats = {
        "messages": memberStats.children[0].children[1].innerText,
        "featured_content": memberStats.children[1].children[1].innerText,
        "reaction_score": memberStats.children[2].children[1].innerText,
        "points": memberStats.children[3].children[1].innerText,

        "joined_at": memberActivity.children[0].children[0].children[1].innerText,
        "last_seen": memberActivity.children[1].children[0].children[1].innerText,
    };

    return stats;
}

var profile = {
    "avatar": getAvatar(),
    "banner": getBanner(),
    "name": getName(),
    "badges": getBadges(),
    "description": getDescription(),
    "stats": getStats(),
}

function Download() {
    var json = JSON.stringify(profile, null, 4);
    var blob = new Blob([json], {type: "application/json"});
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = `${user.name}-${user.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

Download();