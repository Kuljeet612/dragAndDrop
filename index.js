const addClass = (elem, className) => {
    elem.classList.add(className);
}

const removeClass = (elem, className) => {
    elem.classList.remove(className);
}

const allowDrop = (ev) => {
    ev.preventDefault();
}

const drag = (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);
}

const drop = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

const createContainer = (e) => {
    const parent =  e.currentTarget.parentElement;
    const newContainer = document.createElement('div');       
    e.currentTarget.id === 'createNode' ? addClass(newContainer, "node") :  addClass(newContainer, "container");     
    let posX = Math.floor(Math.random()*(innerWidth-200));
    let posY = Math.floor(Math.random()*(innerHeight-200));   
    newContainer.style.left = posX + 'px';
    newContainer.style.top = posY + 'px';
    newContainer.id = "id_"+(Math.random()).toFixed(2);    
    newContainer.addEventListener('mousedown', (e) => {onMouseDown(e)})
    newContainer.addEventListener('mouseup', (e) => {onMouseUp(e)})  
    newContainer.addEventListener('mouseover', (e) => {onMouseOver(e)})  
    newContainer.addEventListener('mouseleave', (e) => {onMouseLeave(e)})        
    parent.addEventListener('drop', (e) => {drop(e)})
    parent.addEventListener('dragover', (e) => {allowDrop(e)})
    newContainer.addEventListener('dragover', (e) => {allowDrop(e)})
    newContainer.addEventListener('drop', (e) => {drop(e)})    
    parent.appendChild(newContainer);
}
const create10Nodes = (e) =>{
    for(let i = 0; i < 10; i++) {
        createContainer(e);
    }
}

const createButtons = function() {
    const div = document.createElement('div');
    div.id="parent";
    const createContainerBtn = document.createElement('button');
    createContainerBtn.id = "createContainer";
    addClass(createContainerBtn, "btn");
    createContainerBtn.setAttribute("title", "Create container");
    createContainerBtn.setAttribute("aria-label", "Create container");
    createContainerBtn.addEventListener('click', (e) => {createContainer(e)})
    createContainerBtn.innerText = "Create container";

    const createNodesBtn = document.createElement('button');
    createNodesBtn.id = "createNode";
    addClass(createNodesBtn, "btn");
    createNodesBtn.setAttribute("title", "Create 10 nodes");
    createNodesBtn.setAttribute("aria-label", "Create 10 nodes");
    createNodesBtn.addEventListener('click', (e) => {create10Nodes(e)})
    createNodesBtn.innerText = "Create 10 nodes";
    
    div.append(createContainerBtn);
    div.append(createNodesBtn);
    document.body.append(div);  
 }()

const onMouseUp = (e) => {    
    document.getElementById('parent').style.cursor = 'default';
    document.onmousemove = function() {}
}

const onMouseOver = (e) => {
    const elem = e.srcElement;
    addClass(elem, 'highlight');    
}

const onMouseLeave = (e) => {
    const elem = e.srcElement;   
    removeClass(elem, 'highlight');
}

const move = (elem, xpos, ypos) => {
    elem.style.left = xpos + 'px';
    elem.style.top = ypos + 'px';
  }

const onMouseDown = (e) => {    
    const posX = e.clientX;
    const posY = e.clientY;   
    const divTop = e.srcElement.style.top;
    const divLeft = e.srcElement.style.left;
    const eWi = parseInt("150px");
    const eHe = parseInt("120px");
    const diffX = posX - parseInt(divLeft);
    const diffY = posY - parseInt(divTop);   
    document.onmousemove = function(evt) {
        evt = evt || window.event;
        var posX = evt.clientX,
          posY = evt.clientY,
          aX = posX - diffX,
          aY = posY - diffY;
        if (aX < 0) aX = 0;
        if (aY < 0) aY = 0;    
        move(e.srcElement, aX, aY);
    }
}
