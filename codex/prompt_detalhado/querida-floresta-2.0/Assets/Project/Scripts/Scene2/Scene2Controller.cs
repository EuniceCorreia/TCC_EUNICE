using System;
using UnityEngine;
using UnityEngine.UI;

using DigitalRuby.RainMaker;
using System.Threading;

public class Scene2Controller : MonoBehaviour
{
    [SerializeField] private Button cowButton, garbageButton, treesButton;
    [SerializeField] private GameObject rainPrefab, cowObject, garbageObject, treesObject;
    [SerializeField] private SceneLoader sceneLoader;
    [SerializeField] private GoogleSheetsController sheetsController;
    [SerializeField] private SpritesS2Controller spritesController;
    [SerializeField] private CanvasS2Controller canvasController;
    [SerializeField] private Scene2NarratorController narratorController;
    private static float introAudioLength = 27.66f;
    private DateTime timeStarted;
    private RainScript2D rainScript;

    public void setFirstTimeInScene() // Called by Button (btQuit)
    {
        AplicationModel.isFirstTimeScene2 = true;
    }

    public void showHelp()
    {
        playANarratorAudio("playHelpAudio", "leaveHelpInterface", 9f);
        canvasController.changeToHelpInterface();
    }

    private void startRaining() // Invoked after the evaporation narration
    {
        rainScript =
            ( Instantiate(rainPrefab) ).GetComponent<RainScript2D>();
        rainScript.RainHeightMultiplier = 0f;
        rainScript.RainWidthMultiplier = 1.12f;
        Destroy(rainScript.gameObject, 8f);
    }

    private void playANarratorAudio(
        string functionToInvoke, string sceneFunction, float length
    )
    {
        playANarratorAudio(functionToInvoke, sceneFunction, length, canvasController);
    }

    private void playANarratorAudio(
        string functionToInvoke, string sceneFunction, float length,
        MonoBehaviour controller, float awaitTime = 0f
    )
    {
        narratorController.Invoke(functionToInvoke, awaitTime + 1f);
        if(sceneFunction == null) return;

        controller.Invoke(sceneFunction, length + awaitTime);
    }

    public void sceneMiss(string audioToInvoke, float audioLength)
    {
        AplicationModel.Scene2Misses++;
        playANarratorAudio(
            audioToInvoke, "changeToTryAgainInterface", audioLength
        );
    }

    private void sendDataToReport()
    {
        ReportCreator.writeLine("\nAtividade 2");
        ReportCreator.writeLine(
            $"Quantidade de erros da fase: {AplicationModel.Scene2Misses}"
        );
        ReportCreator.writeResponseTime(AplicationModel.PlayerResponseTime[1]);
    }

    private void selectTrees()
    {
        setFirstTimeInScene();

        playANarratorAudio(
            "playTreesSelectedAudio", "showTreesRoots", 8.74f,
            spritesController
        );
        playANarratorAudio(
            "playAboutRootsAudio", null, 9.89f,
            this, 8.74f
        );
        playANarratorAudio(
            "playAboutEvaporationAudio", "startRaining", 16.56f,
            this, 18.63f
        );
        playANarratorAudio(
            "playAboutRainAudio", "turnSceneGreenAndAnimalsHappy", 8.96f,
            spritesController, 35.19f
        );
        playANarratorAudio(
            "playSceneCompletedAudio",
            (Player.Instance.ScenesCompleted[1])
                ? "loadSceneSelection"
                : "loadPlayersForest",
            9f,
            sceneLoader, 44.15f
        );

        if(!Player.Instance.ScenesCompleted[1]) {
            sendDataToReport();
            new Thread(sheetsController.SavePlayerProgress).Start();
            Player.Instance.ScenesCompleted[1] = true;
        }
    }

    private void selectOption(GameObject selectedObject, Button button)
    {
        Button[] buttons = {cowButton, treesButton, garbageButton};

        if(
            !Player.Instance.ScenesCompleted[1] &&
            AplicationModel.PlayerResponseTime[1] == 0.00000f
        ) {
            AplicationModel.PlayerResponseTime[1] =
                (DateTime.Now - timeStarted).Seconds - introAudioLength;
        }

        canvasController.showBackgroundCover();
        foreach (Button btn in buttons) btn.onClick.RemoveAllListeners();
        Destroy(button.gameObject);
        selectedObject.SetActive(true);
    }

    void Start() // Start is called before the first frame update
    {
        timeStarted = DateTime.Now;
        AplicationModel.SceneAcesses[1]++;

        if(AplicationModel.isFirstTimeScene2)
        {
            AplicationModel.isFirstTimeScene2 = false;
            canvasController.showBackgroundCover();
            playANarratorAudio(
                "playIntroductionAudio", "hideBackgroundCover", introAudioLength
            );
        }
        else introAudioLength = 0f;

        cowButton.onClick.AddListener( () => {
            selectOption(cowObject, cowButton);
            sceneMiss("playCowSelectedAudio", 7.76f);
        });

        garbageButton.onClick.AddListener( () => {
            selectOption(garbageObject, garbageButton);
            sceneMiss("playTrashSelectedAudio", 8.49f);
        });

        treesButton.onClick.AddListener( () => {
            selectOption(treesObject, treesButton);
            selectTrees();
        });
    }
}
