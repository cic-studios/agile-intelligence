GetHash();

function RestartIntroAnimations()
{
    console.log("Restarting intro animations");
    const delay = 500;
    document.getElementById("IntroLogosCONTAINER").style.display = "flex";
    //RestartAnimationClassDelay("IntroLogosCONTAINER", "logoDisable", delay, 1, 1);
    RestartAnimationClassDelay("IntroBackgroundDIV", "cicBackground", delay, 1, 1);
    RestartAnimationClassDelay("IntroLoadingTXT", "cicLoading", delay, 1, 1);
    RestartAnimationClassDelay("IntroHeartIMG", "cicHeart", delay, 0, 0);
    RestartAnimationClassDelay("IntroCubeIMG", "cicCube", delay, 0, 1);
    RestartAnimationClassDelay("IntroEyesIMG", "cicEyes", delay, 0, 0);
    RestartAnimationClassDelay("IntroCatInCubeIMG", "cicCatInCube", delay, 0, 1);
    RestartAnimationClassDelay("IntroStudiosIMG", "cicStudios", delay, 0, 1);
    RestartAnimationClassDelay("IntroWhiteCicIMG", "cicWhite", delay, 0, 0);
    RestartAnimationClassDelay("IntroPurpleIMG", "mbaPurple", delay, 0, 1);
    RestartAnimationClassDelay("IntroColorIMG", "mbaColor", delay, 0, 1);
    RestartAnimationClassDelay("IntroTextIMG", "mbaText", delay, 0, 0);
    RestartAnimationClassDelay("IntroWhiteMbaIMG", "mbaWhite", delay, 0, 0);
    window.setTimeout(function(){document.getElementById("IntroLogosCONTAINER").style.display = "none";}, 10000);
}
function RestartAnimationClassDelay(elementName, className, delay=50, waitOpacity=1, startOpacity=1)
{
    const element = document.getElementById(elementName);
    console.log(`Stopping Element: '${elementName}' with class: '${className}': `, element);
    element.classList.remove(className);
    element.style.opacity = waitOpacity;
    window.setTimeout(function(){RestartAnimationClassDelayFinalize(element, className, startOpacity);}, delay);
}
function RestartAnimationClassDelayFinalize(element, className, startOpacity)
{
    console.log(`Starting Element: '${element.id}' with class: '${className}': `, element);
    element.style.opacity = startOpacity;
    element.classList.add(className);
}

function GetHash()
{
    const urlParams = new URLSearchParams(window.location.hash.slice(1));
    const user = urlParams.get('u');
    const pass = urlParams.get('p');
    const sess = urlParams.get('s');
    const intro = urlParams.get('i');

    if(intro && (intro=="f" || intro=="false")) 
        document.getElementById("IntroLogosCONTAINER").style.display = "none";
    else
        RestartIntroAnimations();

    if(user) 
    {
        const usernameField = document.getElementById("username");
        if(usernameField)
        {
            usernameField.value = user; 
            DisableElementSelection(usernameField, true);
        }
    }
    if(pass)
    {
        const passwordField = document.getElementById("password");
        if(passwordField)
        {
            passwordField.value = pass;
            DisableElementSelection(passwordField, true);
        }
    }
    if(sess) 
    {
        const sessionIDField = document.getElementById("sessionID");
        if(sessionIDField)
        {
            sessionIDField.value = sess; 
            DisableElementSelection(sessionIDField, true);
        }
        const serverIDField = document.getElementById("serverID");
        if(serverIDField)
        {
            serverIDField.value = sess.split(":")[0]; 
            DisableElementSelection(serverIDField, true);
        }
    }
}
function DisableElementSelection(element, changeAspect=false, forceUserSelectNone=false)
{
    element.tabIndex = -1;
    element.setAttribute('readonly', 'true');
    element.setAttribute('unselectable', 'on');
    element.classList.remove('userSelectAuto');
    element.classList.remove('userSelectContain');
    if(forceUserSelectNone) {element.style.userSelect = "none";}
    element.onselect = function(event) {event.preventDefault(); this.selectionStart = this.selectionEnd; window.getSelection().removeAllRanges(); return false;};
    element.onselectstart = function(event) {event.preventDefault(); this.selectionStart = this.selectionEnd; window.getSelection().removeAllRanges(); return false;};
    element.onselectend = function(event) {event.preventDefault(); this.selectionStart = this.selectionEnd; window.getSelection().removeAllRanges(); return false;};
    element.oncopy = function(event) {event.preventDefault(); return false;};
    element.oncut = function(event) {event.preventDefault(); return false;};
    element.onpaste = function(event) {event.preventDefault(); return false;};
    element.oncontextmenu = function(event) {event.preventDefault(); return false;};
    element.onmousedown = function(event) {event.preventDefault(); return false;};
    element.onkeydown = function(event) {event.preventDefault(); return false;};
    element.onclick = function(event) {event.preventDefault(); return false;};
    element.ondblclick = function(event) {event.preventDefault(); return false;};
    element.onfocus = function(event) {event.preventDefault(); this.blur(); return false;};
    if(changeAspect)
    {
        element.style.background = "transparent";
        element.style.fontStyle = "italic";
        element.style.color = "var(--mbaInputIndigo)";
    }
}



function click_ShowSessionLogin()
{
    document.getElementById("createAccountUI").style.display = "none";
    document.getElementById("resetPasswordUI").style.display = "none";
    document.getElementById("loginUI").style.display = "flex";
}
function click_ShowResetPassword()
{
    document.getElementById("loginUI").style.display = "none";
    document.getElementById("createAccountUI").style.display = "none";
    document.getElementById("resetPasswordUI").style.display = "flex";
}
function click_ShowCreateAccount()
{
    document.getElementById("loginUI").style.display = "none";
    document.getElementById("resetPasswordUI").style.display = "none";
    document.getElementById("createAccountUI").style.display = "flex";
}




function click_SessionLogin()
{
    const sessionIDField = document.getElementById("sessionID");
    const usernameField = document.getElementById("username");
    const passwordField = document.getElementById("password");
    const sessionIDparts = sessionIDField.value.split(":");
    const sessionData = 
    {
        appScript: sessionIDparts[0],
        sessionID: sessionIDparts[1],
        sessionNum: sessionIDparts[2],
        username: usernameField.value,
        password: passwordField.value
    };
}

function click_CreateAccount()
{

}

function click_SendUsername()
{

}

function click_SendResetCode()
{

}

function click_ChangePassword()
{

}