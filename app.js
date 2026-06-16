// Simple state-driven To-Do app with localStorage persistence
(function(){
  const STORAGE_KEY = 'todo.tasks.v1';

  // DOM refs
  const form = document.getElementById('new-task-form');
  const input = document.getElementById('new-task-input');
  const list = document.getElementById('task-list');
  const itemsLeft = document.getElementById('items-left');
  const filters = document.querySelectorAll('.filter-btn');
  const clearCompletedBtn = document.getElementById('clear-completed');

  // App state
  const state = {
    tasks: [],
    filter: 'all'
  };

  // Utilities
  function uid(){return Date.now().toString(36) + Math.random().toString(36).slice(2,8)}

  function save(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
  }

  function load(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      state.tasks = raw ? JSON.parse(raw) : [];
    }catch(e){ state.tasks = [] }
  }

  // CRUD
  function addTask(text){
    const task = {id: uid(), text: text.trim(), completed: false, createdAt: Date.now()};
    state.tasks.unshift(task);
    save(); render();
  }

  function updateTask(id, changes){
    const t = state.tasks.find(x=>x.id===id);
    if(!t) return;
    Object.assign(t, changes);
    save(); render();
  }

  function deleteTask(id){
    state.tasks = state.tasks.filter(x=>x.id!==id);
    save(); render();
  }

  function clearCompleted(){
    state.tasks = state.tasks.filter(t=>!t.completed);
    save(); render();
  }

  function setFilter(f){ state.filter = f; render(); }

  function filtered(){
    if(state.filter==='active') return state.tasks.filter(t=>!t.completed);
    if(state.filter==='completed') return state.tasks.filter(t=>t.completed);
    return state.tasks;
  }

  // Rendering
  function render(){
    // update filters active state
    filters.forEach(btn=>btn.classList.toggle('active', btn.dataset.filter===state.filter));

    // items left
    const left = state.tasks.filter(t=>!t.completed).length;
    itemsLeft.textContent = left;

    // list
    list.innerHTML = '';
    const items = filtered();
    if(items.length===0){
      const li = document.createElement('li');
      li.className = 'task';
      li.textContent = 'No tasks';
      li.style.opacity = '0.7';
      list.appendChild(li);
      return;
    }

    items.forEach(task=>{
      const li = document.createElement('li');
      li.className = 'task';
      li.dataset.id = task.id;

      const cb = document.createElement('button');
      cb.className = 'task__checkbox';
      cb.setAttribute('aria-pressed', String(task.completed));
      cb.title = task.completed ? 'Mark active' : 'Mark completed';
      cb.innerHTML = task.completed ? '✓' : '';

      const label = document.createElement('div');
      label.className = 'task__label' + (task.completed ? ' completed' : '');
      label.textContent = task.text;
      label.tabIndex = 0;

      const actions = document.createElement('div');
      actions.className = 'task__actions';

      const editBtn = document.createElement('button');
      editBtn.className = 'task__edit';
      editBtn.title = 'Edit task';
      editBtn.textContent = 'Edit';

      const delBtn = document.createElement('button');
      delBtn.className = 'task__delete';
      delBtn.title = 'Delete task';
      delBtn.textContent = 'Delete';

      actions.appendChild(editBtn);
      actions.appendChild(delBtn);

      li.appendChild(cb);
      li.appendChild(label);
      li.appendChild(actions);

      list.appendChild(li);
    });
  }

  // Event handling (delegated)
  list.addEventListener('click', (e)=>{
    const li = e.target.closest('li.task');
    if(!li) return;
    const id = li.dataset.id;

    if(e.target.classList.contains('task__checkbox')){
      const t = state.tasks.find(x=>x.id===id);
      updateTask(id, {completed: !t.completed});
      return;
    }

    if(e.target.classList.contains('task__delete')){
      deleteTask(id);
      return;
    }

    if(e.target.classList.contains('task__edit')){
      // switch to edit mode
      enterEditMode(li, id);
      return;
    }
  });

  function enterEditMode(li, id){
    const task = state.tasks.find(x=>x.id===id);
    if(!task) return;
    li.innerHTML = '';

    const input = document.createElement('input');
    input.className = 'task__edit-input';
    input.value = task.text;
    li.appendChild(input);

    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);

    function finish(saveText){
      if(saveText && input.value.trim()) updateTask(id, {text: input.value.trim()});
      else render();
      cleanup();
    }

    function cleanup(){
      input.removeEventListener('blur', onBlur);
      input.removeEventListener('keydown', onKey);
    }

    function onBlur(){ finish(true); }
    function onKey(ev){
      if(ev.key === 'Enter') finish(true);
      if(ev.key === 'Escape') finish(false);
    }

    input.addEventListener('blur', onBlur);
    input.addEventListener('keydown', onKey);
  }

  // filter buttons
  document.querySelector('.filters').addEventListener('click', (e)=>{
    const btn = e.target.closest('.filter-btn');
    if(!btn) return;
    setFilter(btn.dataset.filter);
  });

  // clear completed
  clearCompletedBtn.addEventListener('click', ()=>{
    clearCompleted();
  });

  // form submit
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const val = input.value.trim();
    if(!val) return;
    addTask(val);
    form.reset();
    input.focus();
  });

  // keyboard: Enter on a label to edit
  list.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
      const li = e.target.closest('li.task');
      if(!li) return;
      enterEditMode(li, li.dataset.id);
    }
  });

  // init
  load(); render();

})();
