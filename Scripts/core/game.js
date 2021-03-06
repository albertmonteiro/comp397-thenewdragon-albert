/// <reference path = "_reference.ts" />
// global variables
var canvas;
var stage;
var stats;
var currentScene;
var scene;
// Game Scenes
var intro;
var leftCave;
var rightCave;
function init() {
    // create a reference the HTML canvas Element
    canvas = document.getElementById("canvas");
    // create our main display list container
    stage = new createjs.Stage(canvas);
    // Enable mouse events
    stage.enableMouseOver(20);
    // set the framerate to 60 frames per second
    createjs.Ticker.setFPS(config.Game.FPS);
    // create an event listener to count off frames
    createjs.Ticker.on("tick", gameLoop, this);
    // sets up our stats counting workflow
    setupStats();
    // set initial scene
    scene = config.Scene.INTRO;
    changeScene();
}
// Main Game Loop function that handles what happens each "tick" or frame
function gameLoop(event) {
    // start collecting stats for this frame
    stats.begin();
    // calling State's update method
    currentScene.update();
    // redraw/refresh stage every frame
    stage.update();
    // stop collecting stats for this frame
    stats.end();
}
// Setup Game Stats
function setupStats() {
    stats = new Stats();
    stats.setMode(0); // shows fps
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
}
// Finite State Machine used to change Scenes
function changeScene() {
    // Launch various scenes
    switch (scene) {
        case config.Scene.INTRO:
            // show the MENU scene
            stage.removeAllChildren();
            intro = new scenes.Intro();
            currentScene = intro;
            console.log("Starting INTRO Scene");
            break;
        case config.Scene.LEFT_CAVE:
            // show the PLAY scene
            stage.removeAllChildren();
            leftCave = new scenes.LeftCave();
            currentScene = leftCave;
            console.log("Starting LEFT_CAVE Scene");
            // Albert
            switch (scene) {
                case config.Scene.LEFT_CAVE:
                    // show the PLAY scene
                    stage.removeAllChildren();
                    leftCave = new scenes.LeftCave();
                    currentScene = leftCave;
                    console.log("NEW LEFT NODE");
                    break;
                case config.Scene.RIGHT_CAVE:
                    // show the game OVER scene
                    stage.removeAllChildren();
                    rightCave = new scenes.RightCave();
                    currentScene = rightCave;
                    console.log("NEW RIGHT NODE");
                    break;
            }
            break;
        case config.Scene.RIGHT_CAVE:
            // show the game OVER scene
            stage.removeAllChildren();
            rightCave = new scenes.RightCave();
            currentScene = rightCave;
            console.log("Starting RIGHT_CAVE Scene");
            break;
    }
    console.log(currentScene.numChildren);
}
