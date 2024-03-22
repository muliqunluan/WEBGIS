// 获取所有标签和主要内容元素
const tabs = {
    hnkd: {
      tab: document.getElementById('hnkd'),
      main: document.getElementById('main-hnkd')
    },
    write: {
      tab: document.getElementById('write'),
      main: document.getElementById('main-write')
    },
    inbox: {
      tab: document.getElementById('inbox'),
      main: document.getElementById('main-inbox')
    },
    contacts: {
      tab: document.getElementById('contacts'),
      main: document.getElementById('main-contacts')
    },
    subVoting:{
        tab: document.getElementById('subVoting'),
        main: document.getElementById('main-subVoting')
    },
    posts:{
      tab:document.getElementById('posts'),
      main:document.getElementById('main-posts')
    },
    votings:{
      tab:document.getElementById('votings'),
      main:document.getElementById('main-votings')
    }
  };
  
  // 切换标签和主要内容的显示
  function switchTab(activeTab) {
    for (const tab in tabs) {
      const { tab: tabElement, main: mainElement } = tabs[tab];
      const isActive = tab === activeTab;
  
      tabElement.classList.toggle('active', isActive);
      mainElement.style.display = isActive ? 'block' : 'none';
    }
  }
  
  // 添加点击事件监听器
  for (const tab in tabs) {
    tabs[tab].tab.addEventListener('click', () => switchTab(tab));
  }
  
  // 默认显示第一个标签
  switchTab('hnkd');