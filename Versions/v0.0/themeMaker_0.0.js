// A lot of this is based off of Windows 94's 'Performance Tweaker', made by 'inverted cat#1194' (according to the .js file)
//The rest is made by me, Nef#0571

function themeMaker() {
  var configDir = ".config/theme.json"
  var cssDir = "boot/themeMaker.css"
  // Setup Window
  const appWindow = $window({
      url: "about:blank",
      title: "Theme Maker",
      icon: "https://win98icons.alexmeub.com/icons/png/display_properties-3.png",
      height: 500,
      width: 500,
      center: true,
      resizable: false,
      maximizable: false,
      minimizable: true
      });
  // Add Window content
  const MainHTML = `
<p>Using this tool, you can easily apply custom styles to your copy of Windows 93.</p>
<div id="tm_mainButtons" height=450>Close Button Color: <input id="tm_closeButtonInput" type="color" value="#c0c0c0"><button id="tm_closeButtonReset">Reset to Default</button></div>
<footer id="tm_finalizeFooter"><button id="tm_applyButton">Apply!</button></footer>`
  appWindow.el.body.innerHTML = MainHTML
  // Get elements
  const closeColorInput = appWindow.el.body.querySelector("#tm_closeButtonInput")
  // Get buttons
  const closeColorReset = appWindow.el.body.querySelector("#tm_closeButtonReset")
  const applyButton = appWindow.el.body.querySelector("#tm_applyButton")
  // Make buttons do things
  closeColorReset.onclick = function() {
    closeColorInput.value = "#c0c0c0"
  }
  applyButton.onclick = function() {
    var madeCSS = ".ui_window__head__close {\n  background-color: " + closeColorInput.value + " !important;\n}"
    localforage.setItem(cssDir, madeCSS)
    var newStyleSheet = document.querySelector("#tm_appliedCSS")
    if (!newStyleSheet) {
      newStyleSheet = document.createElement('style');
      newStyleSheet.setAttribute("id", "#tm_appliedCSS")
      document.body.appendChild(newStyleSheet)
    }
    newStyleSheet.innerHTML = madeCSS
    $alert("Settings applied!")
  }
}

le._apps["themeMaker"] = {
  name: "Theme Maker",
  icon: "//win98icons.alexmeub.com/icons/png/display_properties-3.png",
  cats: ['Accessories>System Tools', 'Control Panel'],
  exec: themeMaker
}