// Opening this page submits ONE vote for Xavier Scott (North Star) in the Daily American
// "Somerset County Midseason Breakout Football Player" reader poll.
// Mirrors the "answer_submitted" event the official QQMS widget (2.9.0-qq-main.js) sends.
// Honest fields: url = this page, empty host context (same as standalone ballot), no bot fields.
// Note: link-preview crawlers that execute JavaScript could also run this page.
// Safe mode: ?test=1 (or ?preview=1) never contacts Gannett; a mock records the request.
(function(){
  var params=new URLSearchParams(window.location.search);
  var TEST=params.get('test')==='1'||params.get('preview')==='1';
  var SURVEY={id:'bca7df7e-a13e-4bb9-af51-11e9f0e241b8',versionId:'5faf537d-a992-4938-a977-194a11ff2f1e',label:'3439818'};
  var CARD={id:'c-ques-taf4r2so',type:'question',label:'SOM-Football-Midseasonbreakout',question:{is_forked:false,is_core_question:false}};
  var ANSWER={id:'a-line-gs2uq4ld',label:'Scott'};
  var API='https://traxex.gannettdigital.com/qqms-event';
  var EXPIRES=new Date('2026-10-02T16:00:00.000Z');
  var mockStatus=parseInt(params.get('mockStatus')||'200',10);
  var calls=[];
  function mockSend(url,opts){calls.push({url:url,opts:opts});return Promise.resolve({ok:mockStatus>=200&&mockStatus<300,status:mockStatus,statusText:'mock'});}
  var send=TEST?mockSend:window.fetch.bind(window);
  function now(){var o=TEST&&params.get('now');return o?new Date(o):new Date();}
  function show(msg,cls){var s=document.getElementById('status');if(s){s.textContent=msg;s.className=cls||'';}}
  function buildEvent(){
    var w=screen.width,h=screen.height,vw=innerWidth,vh=innerHeight;
    return {event_id:crypto.randomUUID(),event_type:'answer_submitted',session_id:crypto.randomUUID(),
      survey_id:SURVEY.id,survey_version_id:SURVEY.versionId,survey_label:SURVEY.label,
      content:{site_domain:'',site_code:'',url:window.location.href},
      device:{platform:w<768?'mobileweb':'desktop',orientation:vh>vw?'portrait':'landscape',screen_size:{width:w,height:h},viewport_size:{width:vw,height:vh}},
      card:CARD,answers:[ANSWER]};
  }
  var fired=false;
  function castVote(){
    if(fired)return Promise.resolve('skipped');fired=true;
    if(now()>=EXPIRES){show('Voting closed Oct 2 at noon ET. No vote was sent.','err');return Promise.resolve('closed');}
    show((TEST?'[TEST MODE – nothing sent] ':'')+'Submitting one vote for Xavier Scott…');
    return send(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(buildEvent()),keepalive:true})
      .then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);
        show((TEST?'[TEST MODE – mock only] ':'')+'✅ The poll server accepted the request for Xavier Scott, North Star. (We can\'t confirm here that it was counted.)','ok');return 'ok';})
      .catch(function(e){show('Could not submit ('+e.message+'). Use the official ballot link below.','err');return 'error';});
  }
  window.__xavierVote={test:TEST,calls:calls,castVote:castVote};
  function start(){window.__xavierVote.result=castVote();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
