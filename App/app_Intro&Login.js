document.addEventListener("readystatechange", function(){ if (document.readyState === "complete"){GetHash();} });

function RestartIntroAnimations()
{
    const delay = 50;
    document.getElementById("IntroLogosCONTAINER").style.display = "flex";
    window.setTimeout(function(){document.getElementById("IntroLogosCONTAINER").style.display = "none";}, 10000);
    window.setTimeout(function(){document.getElementById("IntroLoadingTXT").style.display = "none";}, 250);

    //RestartAnimationClassDelay("IntroLogosCONTAINER", "logoDisable_ANIM", delay, 1, 1);
    RestartAnimationClassDelay("IntroBackgroundDIV", "cicBackground_ANIM", delay, 1, 1);
    //RestartAnimationClassDelay("IntroLoadingTXT", "cicLoading_ANIM", delay, 1, 1);
    RestartAnimationClassDelay("IntroHeartIMG", "cicHeart_ANIM", delay, 0, 0);
    RestartAnimationClassDelay("IntroCubeIMG", "cicCube_ANIM", delay, 0, 1);
    RestartAnimationClassDelay("IntroEyesIMG", "cicEyes_ANIM", delay, 0, 0);
    RestartAnimationClassDelay("IntroCatInCubeIMG", "cicCatInCube_ANIM", delay, 0, 1);
    RestartAnimationClassDelay("IntroStudiosIMG", "cicStudios_ANIM", delay, 0, 1);
    RestartAnimationClassDelay("IntroWhiteCicIMG", "cicWhite_ANIM", delay, 0, 0);
    RestartAnimationClassDelay("IntroPurpleIMG", "mbaPurple_ANIM", delay, 0, 1);
    RestartAnimationClassDelay("IntroColorIMG", "mbaColor_ANIM", delay, 0, 1);
    RestartAnimationClassDelay("IntroTextIMG", "mbaText_ANIM", delay, 0, 0);
    RestartAnimationClassDelay("IntroWhiteMbaIMG", "mbaWhite_ANIM", delay, 0, 0);
    
}
function RestartAnimationClassDelay(elementName, className, delay=50, waitOpacity=1, startOpacity=1)
{
    const element = document.getElementById(elementName);
    element.classList.remove(className);
    element.style.opacity = waitOpacity;
    window.setTimeout(function(){RestartAnimationClassDelayFinalize(element, className, startOpacity);}, delay);
}
function RestartAnimationClassDelayFinalize(element, className, startOpacity)
{
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



function PerformElementFieldCheck(element, msgArticle, msgNoun)
{
    if(!element.value)
    {
        cicMSG_ShowMessage("Please enter " + msgArticle + " " + msgNoun + ".", "", midScreenAlert, 5.5, 0.5, 'red', 'var(--mbaInputIndigo)', 'var(--mbaDarkPurple)');
        return false;
    }
    element.value = cicCutAndTrim(element.value);
    if(element.value == "")
    {
        cicMSG_ShowMessage("Invalid " + msgNoun + ".", "", midScreenAlert, 5.5, 0.5, 'red', 'var(--mbaInputIndigo)', 'var(--mbaDarkPurple)');
        return false;
    }
    return true;
}

function click_SessionLogin()
{
    const sessionIDField = document.getElementById("sessionID");
    const usernameField = document.getElementById("username");
    const passwordField = document.getElementById("password");

    if(PerformElementFieldCheck(sessionIDField, "a", "session ID") == false) return;
    const sessionIDparts = sessionIDField.value.split(":");
    if (sessionIDparts.length !== 3) {cicMSG_ShowMessage("Invalid session ID.", "", midScreenAlert, 5.5, 0.5, 'red', 'var(--mbaInputIndigo)', 'var(--mbaDarkPurple)'); return;}
    if(PerformElementFieldCheck(usernameField, "your", "username") == false) return;
    if(PerformElementFieldCheck(passwordField, "your", "password") == false) return;

    const sessionLoginData = 
    {
        serverID: sessionIDparts[0],
        sessionID: sessionIDparts[1],
        sessionNum: sessionIDparts[2],
        username: usernameField.value,
        password: passwordField.value
    };
}



function click_CreateAccount()
{
    const sessionIDField = document.getElementById("sessionID");
    const createAccountEmailField = document.getElementById("createAccountEmail");
    const createAccountUsernameField = document.getElementById("createAccountUsername");
    const createAccountDisplaynameField = document.getElementById("createAccountDisplayname");
    const createAccountPasswordField = document.getElementById("createAccountPassword");
    const createAccountConfirmPasswordField = document.getElementById("createAccountConfirmPassword");

    if(PerformElementFieldCheck(sessionIDField, "a", "session ID") == false) return;
    const sessionIDparts = sessionIDField.value.split(":");
    if (sessionIDparts.length<1 || sessionIDparts[0] == "") {cicMSG_ShowMessage("Invalid session ID.", "", midScreenAlert, 5.5, 0.5, 'red', 'var(--mbaInputIndigo)', 'var(--mbaDarkPurple)'); return;}
    if(PerformElementFieldCheck(createAccountEmailField, "your", "email") == false) return;
    if(PerformElementFieldCheck(createAccountUsernameField, "your", "username") == false) return;
    if(PerformElementFieldCheck(createAccountDisplaynameField, "your", "display name") == false) return;
    if(PerformElementFieldCheck(createAccountPasswordField, "your", "password") == false) return;
    if(!createAccountConfirmPasswordField.value) {cicMSG_ShowMessage("Please confirm your password.", "", midScreenAlert, 5.5, 0.5, 'red', 'var(--mbaInputIndigo)', 'var(--mbaDarkPurple)'); return;}
    createAccountConfirmPasswordField.value = cicCutAndTrim(createAccountConfirmPasswordField.value);
    if(createAccountConfirmPasswordField != createAccountPasswordField) {cicMSG_ShowMessage("Passwords do not match.", "", midScreenAlert, 5.5, 0.5, 'red', 'var(--mbaInputIndigo)', 'var(--mbaDarkPurple)'); return;}
  
    const createAccountData = 
    {
        serverID: sessionIDparts[0],
        email: createAccountEmailField.value,
        username: createAccountUsernameField.value,
        password: createAccountPasswordField.value,
        displayname: createAccountDisplaynameField.value,
        confirmPassword: createAccountConfirmPasswordField.value
    };
}

function click_SendUsername()
{
    const sessionIDField = document.getElementById("sessionID");
    const recoveryEmailField = document.getElementById("recoveryEmail");

    if(PerformElementFieldCheck(sessionIDField, "a", "session ID") == false) return;
    const sessionIDparts = sessionIDField.value.split(":");
    if (sessionIDparts.length<1 || sessionIDparts[0] == "") {cicMSG_ShowMessage("Invalid session ID.", "", midScreenAlert, 5.5, 0.5, 'red', 'var(--mbaInputIndigo)', 'var(--mbaDarkPurple)'); return;}
    if(PerformElementFieldCheck(recoveryEmailField, "your", "email") == false) return;

    const recoverUsernameData = 
    {
        serverID: sessionIDparts[0],
        email: recoveryEmailField.value
    };
}

function click_SendResetCode()
{
    const sessionIDField = document.getElementById("sessionID");
    const recoveryUsernameField = document.getElementById("recoveryUsername");

    if(PerformElementFieldCheck(sessionIDField, "a", "session ID") == false) return;
    const sessionIDparts = sessionIDField.value.split(":");
    if(sessionIDparts.length<1 || sessionIDparts[0] == "") {cicMSG_ShowMessage("Invalid session ID.", "", midScreenAlert, 5.5, 0.5, 'red', 'var(--mbaInputIndigo)', 'var(--mbaDarkPurple)'); return;}
    if(PerformElementFieldCheck(recoveryUsernameField, "your", "username") == false) return;

    const recoverPasswordData = 
    {
        serverID: sessionIDparts[0],
        username: recoveryUsernameField.value
    }
}

function click_ChangePassword()
{
    const sessionIDField = document.getElementById("sessionID");
    const resetpassUsernameField = document.getElementById("resetpassUsername");
    const resetpassResetCodeField = document.getElementById("resetpassResetCode");
    const resetpassNewPasswordField = document.getElementById("resetpassNewPassword");
    const resetpassConfirmNewPasswordField = document.getElementById("resetpassConfirmNewPassword");

    if(PerformElementFieldCheck(sessionIDField, "a", "session ID") == false) return;
    const sessionIDparts = sessionIDField.value.split(":");
    if(sessionIDparts.length<1 || sessionIDparts[0] == "") {cicMSG_ShowMessage("Invalid session ID.", "", midScreenAlert, 5.5, 0.5, 'red', 'var(--mbaInputIndigo)', 'var(--mbaDarkPurple)'); return;}
    if(PerformElementFieldCheck(resetpassUsernameField, "your", "username") == false) return;
    if(PerformElementFieldCheck(resetpassResetCodeField, "your", "reset code") == false) return;
    if(PerformElementFieldCheck(resetpassNewPasswordField, "your", "new password") == false) return;
    if(!resetpassConfirmNewPasswordField.value) {cicMSG_ShowMessage("Please confirm your new password.", "", midScreenAlert, 5.5, 0.5, 'red', 'var(--mbaInputIndigo)', 'var(--mbaDarkPurple)'); return;}
    resetpassConfirmNewPasswordField.value = cicCutAndTrim(resetpassConfirmNewPasswordField.value);
    if(resetpassConfirmNewPasswordField != resetpassNewPasswordField) {cicMSG_ShowMessage("Passwords do not match.", "", midScreenAlert, 5.5, 0.5, 'red', 'var(--mbaInputIndigo)', 'var(--mbaDarkPurple)'); return;}

    const resetPasswordData = 
    {
        serverID: sessionIDparts[0],
        username: resetpassUsernameField.value,
        resetCode: resetpassResetCodeField.value,
        newPassword: resetpassNewPasswordField.value,
        confirmPassword: resetpassConfirmNewPasswordField.value
    }
}