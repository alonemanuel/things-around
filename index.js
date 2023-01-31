var taskInput = document.getElementById('newItem');
var addTaskButton = document.getElementById('addItemButton');
var incompleteTasks = document.getElementById('toDo');
var completedTask = document.getElementById('completedTasks');

var data = `{
    "name": "דברים",
    "content": [
      {
        "name": "חיות",
        "content": [
          {
            "name": "יונקים",
            "content": [
              {
                "name": "יונקים שגם עפים",
                "content": [
                  {
                    "name": "עטלפים",
                    "content": [
                      { "name": "עטלפים בתל אביב", "content": [] },
                      { "name": "דברים שעטלפים אוכלים", "content": [] },
                      { "name": "צלילים שעטלפים יכולים לשמוע", "content": [] }
                    ]
                  },
                  {
                    "name": "יונקים מאוסטרליה",
                    "content": [
                      { "name": "גורים של קנגורו", "content": [] },
                      { "name": "וומבטים", "content": [] },
                      {
                        "name": "דברים",
                        "content": [
                          {
                            "name": "דברים",
                            "content": [
                              {
                                "name": "דברים",
                                "content": [
                                  { "name": "דברים", "content": [{}, {}] },
                                  { "name": "דברים", "content": [{}, {}] },
                                  { "name": "דברים", "content": [{}, {}] }
                                ]
                              },
                              {
                                "name": "דברים",
                                "content": [
                                  { "name": "דברים", "content": [{}, {}] },
                                  { "name": "דברים", "content": [{}, {}] },
                                  { "name": "דברים", "content": [{}, {}] }
                                ]
                              }
                            ]
                          },
                          {}
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "name": "יונקים שגם במים",
                "content": []
              },
              {
                "name": "אנשים",
                "content": [{
                  "name":"אנשים שזרקו אותי",
                  "content": [
                      {
                          
                      }
                  ]
                }]
              }
            ]
          },
          {
            "name": "חיות גדולות",
            "content": [
              {
                "name": "דברים",
                "content": [
                  {
                    "name": "דברים",
                    "content": [
                      { "name": "דברים", "content": [{}, {}] },
                      { "name": "דברים", "content": [{}, {}] },
                      { "name": "דברים", "content": [{}, {}] }
                    ]
                  },
                  {
                    "name": "דברים",
                    "content": [
                      { "name": "דברים", "content": [{}, {}] },
                      { "name": "דברים", "content": [{}, {}] },
                      { "name": "דברים", "content": [{}, {}] }
                    ]
                  }
                ]
              },
              {}
            ]
          },
          { "name": "חיות מפחידות", "content": [] }
        ]
      },
      {
        "name": "כלי תחבורה",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },
      {
        "name": "אנשים מפורסמים",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      },
      {
        "name": "מדינות",
        "content": [
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] },
          { "name": "דברים", "content": [{}, {}] }
        ]
      }
    ]
  }
  `

let NUM_DOTS = 12;
let FADE_FACTOR = .8;

let dots = [];
let mouse = {
  x: 0,
  y: 0
};

var Dot = function () {
  this.x = 0;
  this.y = 0;
  this.node = (function () {
    let n = document.createElement(`div`);
    n.className = `trail`;
    document.body.appendChild(n);
    return n;
  }());
};

Dot.prototype.draw = function () {
  this.node.style.left = `${this.x}px`;
  this.node.style.top = `${this.y}px`;
};


function initDrawing() {

  for (const i of Array(NUM_DOTS).keys()) {
    let d = new Dot();
    dots.push(d);
  }


  addEventListener(`mousemove`, function (event) {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
  });


}
function draw() {
  let lastX = dots.pe
  // console.log(`Drawing...`);
  let x = mouse.x;
  let y = mouse.y;
  // console.log(`x: ${x}, y: ${y}...`);
  dots.forEach(function (dot, index, dots) {
    let nextDot = dots[index + 1] || dots[0];
    dot.x = x;
    dot.y = y;
    dot.draw();
    x += (nextDot.x - dot.x) * FADE_FACTOR;
    y += (nextDot.y - dot.y) * FADE_FACTOR;
  });
}

function animate() {
  // console.log(`Animating...`);
  draw();
  requestAnimationFrame(animate);
}

let addItem = function () {
  var text = taskInput.value;
  var li = document.createElement('li');
  li.innerHTML = text;
  incompleteTasks.appendChild(li);
}

var listDivId = 'mainThingsList';
var listDivElem = document.getElementById(listDivId);

var lastPressed;


function setOnClick(clicked, elem, content) {
  clicked.addEventListener('click', function (e) {
    if (lastPressed) {
      lastPressed.classList.remove('selected');
    }
    console.debug('/n');
    console.debug(`last pressed: ${lastPressed}`);
    console.debug(`clicked: ${clicked}`);
    if (lastPressed != elem || content.style.display == 'none') {
      elem.classList.add('selected');
      // e.currentTarget.style.color = 'red';
    }
    lastPressed = elem;
    content.style.display = (getComputedStyle(content).display == 'none') ? 'block' : 'none';
    // for (let child of content.children) {
    // child.classList.add('selected');
    // child.style.color = 'red';

    // alert(e.currentTarget.textContent);
    // }
  });

}

function initJsonObj(prevElem, jObj) {
  // console.debug('\n');
  if ('name' in jObj) {
    console.debug(jObj["name"]);

    let listItem = prevElem.appendChild(document.createElement(`li`));
    let itemName = listItem.appendChild(document.createElement(`h2`));
    itemName.textContent = jObj["name"];

    let itemContent = listItem.appendChild(document.createElement('ul'));
    setOnClick(itemName, listItem, itemContent);

    // Init input
    // let inputDiv = document.createElement(`li`);

    // wage.addEventListener("keydown", function (e) {
    //     if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
    //         validate(e);
    //     }
    // });

    // function validate(e) {
    //     var text = e.target.value;
    //     //validation of the input...
    // }


    let inputSpan = itemContent.appendChild(document.createElement(`span`));
    inputSpan.classList.add('input-span');
    let inputDiv = inputSpan.appendChild(document.createElement(`input`));
    inputDiv.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        let childLi = prependEmptyChild(itemContent, e.target.value, true);
        inputDiv.value = "";
        // let newLi = itemContent.appendChild(document.createElement(`li`));
        // newLi.textContent = "just added this";
        // inputDiv.style.backgroundColor = "red";
      }
    });

    if ('content' in jObj) {
      for (let item of jObj["content"]) {
        initJsonObj(itemContent, item);
      }

    }

  }

}

function appendAsSecond(parent, child) {
  parent.insertBefore(child, parent.children[1]);
  return child;
}

function prependChild(parent, child) {
  parent.prepend(child);
  return child;
}

function appendEmptyInput(parent) {
  let inputSpan = parent.appendChild(document.createElement(`span`));
  inputSpan.classList.add('input-span');
  let inputDiv = inputSpan.appendChild(document.createElement(`input`));
  inputDiv.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      let childLi = prependEmptyChild(parent, e.target.value, true);
      inputDiv.value = "";
      // let newLi = itemContent.appendChild(document.createElement(`li`));
      // newLi.textContent = "just added this";
      // inputDiv.style.backgroundColor = "red";
    }
  });
}

const ITEM_CONTENT_INDEX = 1;
function prependEmptyChild(parent, childTextContent, shouldInsertAsSecond) {
  // let itemContent = parent.children[ITEM_CONTENT_INDEX];
  let childLi;
  if (shouldInsertAsSecond) {
    childLi = appendAsSecond(parent, document.createElement('li'));
  } else {
    childLi = prependChild(parent, document.createElement('li'));
  }
  // console.debug('errrrr');
  let childH2 = childLi.appendChild(document.createElement('h2'));
  childH2.textContent = childTextContent;
  let childItemContent = childLi.appendChild(document.createElement('ul'));
  let emptyInput = appendEmptyInput(childItemContent);
  setOnClick(childH2, childLi, childItemContent);

  return childLi;
  // let childItemContent =  
}

function initElements() {
  let jsonObj = JSON.parse(data);
  // console.debug(jsonObj);

  // console.debug
  initJsonObj(listDivElem, jsonObj);
}




function main() {
  // initDrawing();
  // animate();
  initElements();

}

main();