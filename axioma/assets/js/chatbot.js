// AnimeForYou — AI Chatbot "Aria"
(function(){
  var chatOpen=false, chatInit=false;

  function createChatbot(){
    if(chatInit)return;
    chatInit=true;

    var fab=document.createElement('button');
    fab.className='chatbot-fab';
    fab.id='chatFab';
    fab.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="26" height="26"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
    fab.onclick=toggleChat;
    document.body.appendChild(fab);

    var win=document.createElement('div');
    win.className='chatbot-window';
    win.id='chatWindow';
    win.innerHTML='<div class="chatbot-header"><div class="chatbot-header-info"><h4>🤖 Aria</h4><span>AI Anime Assistant</span></div><button class="chatbot-close" onclick="window._ariaChat.toggleChat()">✕</button></div><div class="chatbot-messages" id="chatMessages"></div><div class="chatbot-input"><input type="text" id="chatInput" placeholder="Ask me anything..." onkeydown="if(event.key===\'Enter\')window._ariaChat.send()" /><button class="chatbot-send" onclick="window._ariaChat.send()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button></div>';
    document.body.appendChild(win);

    addBotMsg("Hi! I'm **Aria**, your AI anime assistant! 🎬\n\nI can help you with:\n- Anime recommendations\n- Finding anime by genre\n- Answering anime questions\n- Site navigation help\n\nWhat would you like to know?");
  }

  function toggleChat(){
    chatOpen=!chatOpen;
    var win=document.getElementById('chatWindow');
    var fab=document.getElementById('chatFab');
    if(chatOpen){
      win.classList.add('open');
      fab.classList.add('open');
      fab.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="26" height="26"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
      document.getElementById('chatInput').focus();
    }else{
      win.classList.remove('open');
      fab.classList.remove('open');
      fab.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="26" height="26"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
    }
  }

  function addBotMsg(text){
    var el=document.getElementById('chatMessages');
    var div=document.createElement('div');
    div.className='chat-msg bot';
    div.innerHTML=text.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');
    el.appendChild(div);
    el.scrollTop=el.scrollHeight;
  }

  function addUserMsg(text){
    var el=document.getElementById('chatMessages');
    var div=document.createElement('div');
    div.className='chat-msg user';
    div.textContent=text;
    el.appendChild(div);
    el.scrollTop=el.scrollHeight;
  }

  function showTyping(){
    var el=document.getElementById('chatMessages');
    var div=document.createElement('div');
    div.className='chat-typing';
    div.id='chatTyping';
    div.innerHTML='<span></span><span></span><span></span>';
    el.appendChild(div);
    el.scrollTop=el.scrollHeight;
  }

  function hideTyping(){
    var t=document.getElementById('chatTyping');
    if(t)t.remove();
  }

  function getResponse(input){
    var q=input.toLowerCase().trim();
    if(q.match(/\b(home|main)\b/)) return "Go to the homepage by clicking **Home** in the navigation bar!";
    if(q.match(/\b(browse|search|find)\b/)) return "You can browse all anime on the **Browse** page! Use the search bar or genre filters.";
    if(q.match(/\b(feature|what can)\b/)) return "Check out our **Features** page to see everything AnimeForYou offers!";
    if(q.match(/\b(about|who)\b/)) return "Visit our **About** page to learn more about AnimeForYou!";
    if(q.match(/\b(contact|support|help)\b/)) return "Need help? Visit our **Support** page with FAQ and contact form!";

    if(q.match(/\b(recommend|suggest|what should|best anime|top anime)\b/)){
      var animes=window.DataStore?DataStore.getList():[];
      if(animes.length){
        var top=animes.sort(function(a,b){return(b.rating||0)-(a.rating||0)}).slice(0,3);
        return "Here are my top recommendations:\n\n"+top.map(function(a){return '**'+a.title+'** ('+a.rating+'★) - '+(a.genre||'')}).join('\n')+"\n\nBrowse more on the Browse page!";
      }
      return "Check out our **Browse** page to see the full library sorted by rating.";
    }

    if(q.match(/\b(action)\b/)){
      var animes=window.DataStore?DataStore.getList():[];
      var action=animes.filter(function(a){return(a.genre||'').toLowerCase().includes('action')}).slice(0,3);
      if(action.length) return "Action anime:\n\n"+action.map(function(a){return '**'+a.title+'** ('+a.rating+'★)'}).join('\n');
      return "Check our Browse page and filter by **Action** genre!";
    }

    if(q.match(/\b(comedy|funny)\b/)){
      var animes=window.DataStore?DataStore.getList():[];
      var comedy=animes.filter(function(a){return(a.genre||'').toLowerCase().includes('comedy')}).slice(0,3);
      if(comedy.length) return "Comedy anime:\n\n"+comedy.map(function(a){return '**'+a.title+'** ('+a.rating+'★)'}).join('\n');
      return "Check our Browse page and filter by **Comedy** genre!";
    }

    if(q.match(/\b(how many|count|total)\b/)){
      var animes=window.DataStore?DataStore.getList():[];
      return "We currently have **"+animes.length+" anime** in our library!";
    }

    if(q.match(/\b(download|link|watch|stream)\b/)){
      return "To download anime:\n\n1. Go to **Browse** page\n2. Click on any anime\n3. Select an episode\n4. Choose a download server\n5. Click download!";
    }

    if(q.match(/^(hi|hello|hey|yo)/)) return "Hey there! 👋 I'm **Aria**, your anime assistant! Ask me for recommendations or help finding anime!";
    if(q.match(/\b(thanks|thank you)\b/)) return "You're welcome! 😊 Let me know if you need anything else!";
    if(q.match(/\b(who are you|your name)\b/)) return "I'm **Aria**, the AI assistant for AnimeForYou! 🤖";
    if(q.match(/\b(help)\b/)) return "I can help you with:\n\n🔍 **Find anime** - Search by title or genre\n🎬 **Recommendations** - Get top-rated suggestions\n📖 **Navigation** - Find pages and features\n❓ **FAQ** - Common questions";

    var animes=window.DataStore?DataStore.getList():[];
    var match=animes.filter(function(a){return(a.title||'').toLowerCase().includes(q)});
    if(match.length>0){
      var a=match[0];
      return "**"+a.title+"**\n\nRating: "+(a.rating||'N/A')+"★ | Genre: "+(a.genre||'N/A')+"\n\nClick on it in the Browse page to watch!";
    }

    return "I'm not sure about that! 🤔 Try asking me:\n\n- \"Recommend me anime\"\n- \"Find action anime\"\n- \"How many anime do you have\"";
  }

  function send(){
    var input=document.getElementById('chatInput');
    var text=input.value.trim();
    if(!text)return;
    addUserMsg(text);
    input.value='';
    showTyping();
    setTimeout(function(){
      hideTyping();
      addBotMsg(getResponse(text));
    },600+Math.random()*800);
  }

  window._ariaChat={toggleChat:toggleChat,send:send};

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',createChatbot);
  }else{
    createChatbot();
  }
})();
