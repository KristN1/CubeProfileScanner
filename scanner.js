var currentUrl = window.location.href;
var user = {
    name: currentUrl.split("/")[4].split(".")[0],
    id: currentUrl.split("/")[4].split(".")[1],
};

if (currentUrl.includes("https://www.cubecraft.net/members/") == false) {
    alert("Not a valid profile!");
    throw new Error("not cubecraft.net");
}

function getPfp() {
    let pfp =  String(document.getElementsByClassName(`avatar-u${user.id}-l`)[0].src);
    if (pfp == "undefined") {
        return null;
    } else {
        return pfp;
    }
}

function getBanner() {
    try {
        return "https" + document.getElementsByClassName("memberProfileBanner")[0].style.backgroundImage.split("url(\"")[1].split("\")")[0];
    } catch (e) {
        return null;
    }
}

function getName() {
    let usernameElem = document.getElementsByClassName("username ")[0].children[0]

    if (usernameElem == null) {
        usernameElem = document.getElementsByClassName("username ")[0]
    }

    console.log(usernameElem);

    let username = {
        "text": usernameElem.innerText,
        "color": getComputedStyle(usernameElem).color
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
    "pfp": getPfp(),
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