function cicCutAndTrim(string) { if(string) return string.replace(/(^\s+|\s+$)/gm,''); else return ''; }
function WashAndTrimString(str, removeNewLine=true, removeTabs=true, arrRemove=['"', ',', ';', ':', '|'])
{
  for (let removeStr of arrRemove)
    str = str.split(removeStr).join(' ');
  if (removeTabs)
    str = str.replace(/\t/g, '');
  if (removeNewLine)
    str = str.replace(/[\r\n]/g, '');
  str = str.trim();
  return str;
}

//120FPS is SIMULATING at 125 FPS         (+0.008/every8ms)
//90FPS  is SIMULATING at 90.909090rp FPS (+0.011/every11ms)
//60FPS  is SIMULATING at 62.5 FPS        (+0.016/every16ms)
//30FPS  is SIMULATING at 30.303030rp FPS (+0.033/every33ms)
//24FPS  is SIMULATING at 24.39024rep FPS (+0.041/every41ms)
//10FPS  is SIMULATING at 10 FPS          (+0.1/every100ms)
let targetFPS = 30;
const startTime = Object.freeze(new Date());
const cicFPSeventType = Object.freeze({perTick:0, repeatInterval:1, delayOnce:2, exactTime:3});
const cicFPSevents = { timerFPS:0, frameDuration:0, deltaTime:0, updateFPSevents:[] };
let intervalID = null;

SetFPSinterval(targetFPS);
function SetFPSinterval(FPS)
{
    if(intervalID!=null)
        clearInterval(intervalID);
    targetFPS = FPS;
    intervalID = setInterval(UpdateFPSevents, Math.floor(1000/targetFPS));
}

function cicFPS_SubscribeFPSevent(func, time, type=cicFPSeventType.perTick)
{
    cicFPSevents.updateFPSevents.push({func:func, time:((type==cicFPSeventType.perTick)?(cicFPS_MillisecondsSinceStart()):(time*1000)), type:type, nextTime:((type==cicFPSeventType.perTick)?(cicFPS_MillisecondsSinceStart()):((type==cicFPSevents.timedOnce)?(time*1000):(cicFPSevents.timerFPS+time*1000)))});
}

function cicFPS_UnsubscribeFPSevent(func)
{
    const index = cicFPSevents.updateFPSevents.findIndex(obj => obj.fn === func);
    if (index !== -1) cicFPSevents.updateFPSevents.splice(index, 1);
}

function UpdateFPSevents()
{
    const currTime=cicFPS_MillisecondsSinceStart(); 
    cicFPSevents.frameDuration=currTime-cicFPSevents.timerFPS; 
    cicFPSevents.deltaTime=cicFPSevents.frameDuration/1000; 
    cicFPSevents.timerFPS=currTime; 

    let i=0;
    while(i<cicFPSevents.updateFPSevents.length)
    {
        if(cicFPSevents.timerFPS>=cicFPSevents.updateFPSevents[i].nextTime)
        {
            cicFPSevents.updateFPSevents[i].func();
            if(cicFPSevents.updateFPSevents[i].type==cicFPSeventType.repeatInterval)
                cicFPSevents.updateFPSevents[i].nextTime += cicFPSevents.updateFPSevents[i].time;

            if(cicFPSevents.updateFPSevents[i].type==cicFPSeventType.delayOnce || cicFPSevents.updateFPSevents[i].type==cicFPSeventType.exactTime)
                cicFPSevents.updateFPSevents.splice(i, 1);
            else
                i++;
        }
        else
        {
            i++;
        }
    }
}

function cicFPS_MillisecondsSinceStart()
{
    return ((new Date().getTime()) - startTime.getTime()); //getTime() method of Date instances returns the number of milliseconds for this date since the epoch, which is defined as the midnight at the beginning of January 1, 1970, UTC.
}


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const midScreenAlert = document.createElement("div");
midScreenAlert.id = "midScreenMessageAlert";
midScreenAlert.className = "centerDiv textLoadingGlow";
midScreenAlert.style.fontSize = "2vw";
midScreenAlert.style.fontWeight = "bolder";
midScreenAlert.style.textAlign = "center";
midScreenAlert.style.padding = "20px 20px";
midScreenAlert.style.overflow = "hidden";
midScreenAlert.style.pointerEvents = "none";
midScreenAlert.style.zIndex = "1000";
document.body.appendChild(midScreenAlert);

const copyrightDiv = document.getElementById("copyrightDiv");
const copyrightMsg = "©2024 CIC Studios";
const copyrightColor = 'var(--mbaDarkPurple)';
let responseDiv = null;
let responseDefaultMsg = "";
let responseDefaultColor = 'var(--mbaDarkPurple)';
let responseBlinkColorOdd = 'var(--mbaDarkPurple)';
let responseBlinkColorEven = 'var(--mbaInputIndigo)';
let responseBlinkInterval = 0;
let responseBlinkTimeout = 0;
let responseBlinkCount = 0;
let responseDivTimeout = 0;
let isShowingResponseDiv = false;

cicFPS_SubscribeFPSevent(UpdateMessageDiv, 0, cicFPSeventType.perTick);
function UpdateMessageDiv()
{
    if(isShowingResponseDiv)
    {
        if(cicFPSevents.timerFPS>responseDivTimeout)
        {
            isShowingResponseDiv = false;
            responseBlinkCount = 0;
            responseDiv.innerHTML = responseDefaultMsg;
            responseDiv.style.color = responseDefaultColor;
        }
        else if(responseBlinkInterval>0 && cicFPSevents.timerFPS>responseBlinkTimeout)
        {
            responseBlinkTimeout = cicFPSevents.timerFPS+responseBlinkInterval;
            responseBlinkCount = (responseBlinkCount+1)%2;
            responseDiv.style.color = (responseBlinkCount==0)?(responseBlinkColorEven):(responseBlinkColorOdd);
        }
    }
}

function cicMSG_ShowMessage(msg, defaultMsg="", targetDiv=midScreenAlert, duration=5.5, blinkInterval=0.5, colorEven="red", colorOdd="black", colorDefault="black")
{
    if(responseDiv && responseDiv!=targetDiv)
    {
        responseDiv.innerHTML = responseDefaultMsg;
        responseDiv.style.color = responseDefaultColor;
    }
    responseDiv = targetDiv;
    responseBlinkInterval = blinkInterval*1000;
    responseBlinkTimeout = cicFPSevents.timerFPS+responseBlinkInterval;
    responseDivTimeout = cicFPSevents.timerFPS+duration*1000;
    responseDefaultColor = colorDefault;
    responseBlinkColorEven = colorEven;
    responseBlinkColorOdd = colorOdd;
    responseDefaultMsg = defaultMsg;
    responseBlinkCount = 0;

    responseDiv.innerHTML = msg;
    responseDiv.style.color = colorEven;
    isShowingResponseDiv = true;
}