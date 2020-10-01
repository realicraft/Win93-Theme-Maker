// A lot of this is based off of Windows 94's 'Performance Tweaker', made by 'inverted cat#1194' (according to the .js file)
//The rest is made by me, Nef#0571

//Version 0.2.1

function themeMaker() {
  var configDir = ".config/tm_theme.json";
  var optionsDir = ".config/tm_options.json";
  var cssDir = "boot/themeMaker.css";
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
  const MainHTML = `<div id="tm_mainWindow">
<style>
	#tm_mainWindow p {
		margin: 4px 0px 4px 4px;
	}
	#tm_mainWindow div:not(#tm_mainButtons){
		border-style: ridge;
		border-color: rgb(223, 223, 223) rgb(128, 128, 128) rgb(128, 128, 128) rgb(233, 233, 233);
		border-width: 2px;
		border-collapse: collapse;
	}
	#tm_mainWindow {
		border-collapse: collapse;
	}
</style>
<p>Using this tool, you can easily apply custom styles to your copy of Windows 93.</p>
<div id="tm_mainButtons" style="height: 450px; position :absolute; top: 25px; width: 500px;">
	<div id="tm_mainSelect" class="skin_light" style="height: 225px; width: 250px; position: absolute; left: 0px; top: 0px;"></div><div id="tm_subSelect" class="skin_light" style="height: 225px; width: 250px; position: absolute; left: 0px; bottom: 0px;"></div><div id="tm_selectWindow" style="height: 450px; width: 250px; position: absolute; right: 0px; top: 0px;">Close Button Color: <input id="tm_closeButtonInput" type="color" value="#c0c0c0"><button id="tm_closeButtonReset">Reset to Default</button></div>
</div>
<footer id="tm_finalizeFooter" style="position: absolute; bottom: 0px; width: 500px; height: 25px;"><button id="tm_applyButton">Apply!</button></footer>
</div>`;
  appWindow.el.body.innerHTML = MainHTML;
  // Make sure the config and css files exist
  if ($fs.utils.exist("/a/.config/tm_theme.json") === false) {
    localforage.setItem(configDir, "{}");
  };
  if ($fs.utils.exist("/a/boot/themeMaker.css") === false) {
    localforage.setItem(cssDir, "");
  };
  // Make sure the options file exists
  if ($fs.utils.exist("/a/.config/tm_options.json") === false) {
    $alert.info("It looks like /a/.config/tm_options.json is missing.\nCurrently, Theme Maker can function without it, but in future versions, it will be reqired.");
    /*return null*/
  };
  // Get elements
  const closeColorInput = appWindow.el.body.querySelector("#tm_closeButtonInput");
  // Get buttons
  const closeColorReset = appWindow.el.body.querySelector("#tm_closeButtonReset");
  const applyButton = appWindow.el.body.querySelector("#tm_applyButton");
  // Make buttons do things
  closeColorReset.onclick = function() {
    closeColorInput.value = "#c0c0c0";
  };
  applyButton.onclick = function() {
    var madeCSS = ".ui_window__head__close {\n  background-color: " + closeColorInput.value + " !important;\n}";
    localforage.setItem(cssDir, madeCSS);
    var madeJSON = "{'closeButton':{'color':'" + closeColorInput.value + "'}}";
    localforage.setItem(configDir, madeJSON);
    var newStyleSheet = document.querySelector("#tm_appliedCSS");
    if (!newStyleSheet) {
      newStyleSheet = document.createElement('style');
      newStyleSheet.setAttribute("id", "#tm_appliedCSS");
      document.body.appendChild(newStyleSheet);
    };
    newStyleSheet.innerHTML = madeCSS;
    $explorer.refresh()
    $alert("Settings applied!");
  };
};

le._apps["themeMaker"] = {
  name: "Theme Maker",
  icon: "//win98icons.alexmeub.com/icons/png/display_properties-3.png",
  cats: ['Accessories>System Tools', 'Control Panel'],
  exec: themeMaker
};