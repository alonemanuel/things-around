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
        lastPressed = elem;
        elem.classList.add('selected');
        // e.currentTarget.style.color = 'red';
        console.debug(content);
        console.debug(content.style.display);
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

        let listItem = document.createElement(`li`);
        let itemName = document.createElement(`h2`);
        itemName.textContent = jObj["name"];
        listItem.append(itemName);
        prevElem.append(listItem);
        
        let itemContent = document.createElement('ul');
        listItem.append(itemContent);
        setOnClick(itemName, listItem, itemContent);

        // Init input
        let inputSpan = document.createElement(`span`);
        inputSpan.classList.add('input-span');
        let inputDiv = document.createElement(`li`);
        inputDiv.append(inputSpan);
        inputSpan.append(document.createElement(`input`));
        itemContent.append(inputSpan);

        if ('content' in jObj) {
            for (let item of jObj["content"]) {
                initJsonObj(itemContent, item);
            }

        }

    }

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