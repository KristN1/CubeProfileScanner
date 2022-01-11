console.clear();

let url = window.location.href;
var user = {
    name: url.split("/")[4].split(".")[0],
    id: url.split("/")[4].split(".")[1],
};

function getPfp() {
    return document.getElementsByClassName(`avatar-u${user.id}-l`)[0].src;
}

function getBanner() {
    return "https" + document.getElementsByClassName("memberProfileBanner")[0].style.backgroundImage.split("url(\"")[1].split("\")")[0];
}

function getName() {
    let usernameElem = document.getElementsByClassName("username ")[0].children[0]

    let username = {
        "text": usernameElem.innerText,
        "color": getComputedStyle(usernameElem).color
    };

    return username;
}

function getBadges() {
    let allBadges = document.getElementsByClassName("memberHeader-banners");

    let badges = [];
    for (let i = 0; i < allBadges.length; i++) {
        badges.push(allBadges[i].children[0].innerText);
    }

    return badges;
}

function getAttributes() {
    let memberStats = document.getElementsByClassName("pairJustifier")[0];
    let memberActivity = document.getElementsByClassName("uix_memberHeader__extra")[0];

    let attributes = {
        "messages": memberStats.children[0].children[1].innerText,
        "featured_content": memberStats.children[1].children[1].innerText,
        "reaction_score": memberStats.children[2].children[1].innerText,
        "points": memberStats.children[3].children[1].innerText,

        "joined_at": memberActivity.children[0].children[0].children[1].innerText,
        "last_seen": memberActivity.children[1].children[0].children[1].innerText,
    };

    return attributes;
}

var pfp = getPfp();
var banner = getBanner();
var username = getName();
var badges = getBadges();
var attributes = getAttributes();

console.log(pfp);
console.log(banner);
console.log(username);
console.log(badges);
console.log(attributes);