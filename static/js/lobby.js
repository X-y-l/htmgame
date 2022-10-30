var allClasses = [
    "Dr. Professor, PhD",
    "Sage Mage",
    "The Quantum Mechanic",
    "Swashbuckler",
    "Barber-ian",
    "Strongman",
    "Magician",
    "Rouge",
    "Cookie-jar Pilferer",
    "Astronomer",
    "Cult Leader",
    "Bar Nun",
]

var selectedClass = 0

function changeClass(index) {
    selectedClass = index
    renderClassList()
}

function renderClassList() {
    var el = document.getElementById("classes")
    el.innerHTML = ""

    for (var i = 0; i < allClasses.length; i++) {
        el.appendChild(makeClassButton(i))
    }
    
    document.getElementById("lobby-heading").innerHTML = classData[selectedClass].name
    document.getElementById("lobby-class").innerHTML = classData[selectedClass].description
    document.getElementById("start-item").innerHTML = itemsData[selectedClass].name
    document.getElementById("cat-feat").innerHTML = classData[selectedClass].category + ": " + categoryData[classData[selectedClass].category]
}

function makeClassButton(index) {
    var el = document.createElement("div")
    el.className = "class"

    if (index == selectedClass) {
        el.classList.add("selected")
    }

    var h1 = document.createElement("h1")
    h1.innerHTML = classData[index].name
    el.appendChild(h1)

    const classIndex = index
    el.onclick = () => changeClass(classIndex)

    return el
}