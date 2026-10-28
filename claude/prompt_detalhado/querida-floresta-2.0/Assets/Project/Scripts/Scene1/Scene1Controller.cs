using UnityEngine;
using System;
using System.Threading;

public class Scene1Controller : MonoBehaviour
{
    private const int sceneIndex = 0, lastLevelIndex = 2,
    missesBeforeLessClouds = 4;
    private const float introAudioLength = 10.67f, narratorDelay = 1f,
    helpAudioLength = 13f, rightClickAudioLength = 5f,
    missClickAudioLength = 9f, notClickedAudioLength = 7f,
    congratsDelay = 0.5f, loadNextSceneDelay = 9f;
    private const float playingMusicVolume = 0.01f, idleMusicVolume = 0.1f;
    private const float cloudStartHeight = -2.68f, cloudRiseHeight = 5f;
    private static readonly Vector2 cloudStartScale = new Vector2(0.066f, 0.093f),
    cloudEndScale = new Vector2(0.2f, 0.22f);
    // Indexed by level
    private static readonly float[] introductionAudioLengths =
        { introAudioLength, 7f, 10f };

    [SerializeField] private float timeGap, speedIncrement;
    [SerializeField] private GameObject difficultiesObj, rainObjPrefabObj,
    steamEffectsObj;
    [SerializeField] private SceneLoader sceneLoader;
    [SerializeField] private GoogleSheetsController sheetsController;
    [SerializeField] private CanvasS1Controller canvasController;
    [SerializeField] private Scene1NarratorController narratorController;
    [SerializeField] private AudioSource cloudAudio;
    [SerializeField] private AudioController audioController;
    private bool gameOn;
    private int cloudCounter, cloudNumber, levelCounter;
    private float timeCounter, cloudTargetHeight;
    private DateTime timeStarted;
    private Transform cloudTransform;
    private SpriteRenderer cloudRenderer;
    private GameObject rainObj, difficultyObj;
    private MusicPlayer musicPlayer;

    // Called by Button (btStart) every level start
    public void startGame()
    {
        gameOn = true;
        cloudAudio.Play();
        musicPlayer.setMusicVolume(playingMusicVolume);

        if(levelCounter == 0 && AplicationModel.Scene1Misses[0] == 0)
            registerResponseTime();
    }

    public void showHelp() // Called by Button (btHelp)
    {
        playNarratorAudio("playHelpAudio", "resetInterface", helpAudioLength);
        canvasController.changeToHelpInterface();
    }

    public void checkClickOnCenario() // Called by Button (ImgBackground)
    {
        if(!gameOn) return;

        // Player clicked on the right moment
        if(cloudCounter == cloudNumber) handleRightClick();
        else handleMissClick();

        musicPlayer.setMusicVolume(idleMusicVolume);
        gameOn = false;
    }

    public void resetLevel() // Called by button (btTryAgain)
    {
        Destroy(difficultyObj);
        instantiateDifficulty();

        canvasController.resetInterface();
        steamEffectsObj.SetActive(true);
        Destroy(rainObj);

        resetLevelData();
        moveToNextCloud();
    }

    public void goNextLevel() // Called by button (btNextLevel)
    {
        GameObject currentLevel = getLevelTemplate(levelCounter);

        // First destroying the clouds of current level
        destroyLastClouds(currentLevel.transform, currentLevel.transform.childCount);
        // Then disabling it before going to the next
        currentLevel.SetActive(false);

        levelCounter++;
        timeGap -= speedIncrement;

        resetLevel();
        canvasController.hideButtons();
        canvasController.updateLevelTxt(levelCounter);
        playIntroductionAudio();
    }

    private void registerResponseTime()
    {
        double secondsSinceStart = (DateTime.Now - timeStarted).TotalSeconds;
        AplicationModel.PlayerResponseTime[sceneIndex] =
            secondsSinceStart - introAudioLength;
    }

    private void handleRightClick()
    {
        audioController.hitSound();
        rainObj = Instantiate(rainObjPrefabObj);
        steamEffectsObj.SetActive(false);

        if(levelCounter < lastLevelIndex)
        {
            playNarratorAudio(
                "playRightClickAudio", "showNextLevelButton", rightClickAudioLength
            );
        }
        else completeScene();
    }

    // Here the narrator will congratulate the player
    private void completeScene()
    {
        bool isFirstCompletion = !Player.Instance.ScenesCompleted[sceneIndex];

        audioController.sceneCompletedSound();
        narratorController.Invoke("playCongratsAudio", congratsDelay);
        sceneLoader.Invoke(
            isFirstCompletion ? "loadPlayersForest" : "loadSceneSelection",
            loadNextSceneDelay
        );

        if(isFirstCompletion)
        {
            sendDataToReport();
            Player.Instance.ScenesCompleted[sceneIndex] = true;
            new Thread(sheetsController.SavePlayerProgress).Start();
        }
    }

    private void handleMissClick()
    {
        if(
            ++AplicationModel.Scene1Misses[levelCounter] > missesBeforeLessClouds &&
            !AplicationModel.lessClouds
        ) setLessClouds();

        showTryAgainInterface();
        cloudAudio.Stop();
        playNarratorAudio(
            "playMissClick" + (levelCounter + 1) + "Audio",
            "enableTryAgainButton", missClickAudioLength
        );
    }

    // Player let all the clouds pass without clicking
    private void handleNoClick()
    {
        AplicationModel.Scene1Misses[levelCounter]++;
        showTryAgainInterface();
        gameOn = false;
        playNarratorAudio(
            "playNotClickedAudio", "enableTryAgainButton", notClickedAudioLength
        );
    }

    private void showTryAgainInterface()
    {
        audioController.missSound();
        canvasController.changeToTryAgainInterface();
    }

    private void playNarratorAudio(
        string audioToInvoke, string canvasFunction, float audioLength)
    {
        narratorController.Invoke(audioToInvoke, narratorDelay);
        if(canvasFunction != null)
            canvasController.Invoke(canvasFunction, audioLength);
    }

    private void playIntroductionAudio()
    {
        playNarratorAudio(
            "playIntroduction" + (levelCounter + 1) + "Audio", "showButtons",
            introductionAudioLengths[levelCounter]
        );
    }

    private void sendDataToReport()
    {
        ReportCreator.resetReport();
        ReportCreator.writeLine("Atividade 1");
        ReportCreator.writeMissesPerPhase(AplicationModel.Scene1Misses);
        ReportCreator.writeResponseTime(
            AplicationModel.PlayerResponseTime[sceneIndex]
        );
    }

    private GameObject getLevelTemplate(int level)
    {
        return difficultiesObj.transform.GetChild(level).gameObject;
    }

    private void instantiateDifficulty()
    {
        GameObject levelTemplate = getLevelTemplate(levelCounter);
        levelTemplate.SetActive(true);
        difficultyObj = Instantiate(levelTemplate);
        levelTemplate.SetActive(false);
    }

    private void resetLevelData()
    {
        cloudCounter = 0;
        cloudNumber = difficultyObj.transform.childCount;
        timeCounter = 0f;
        gameOn = false;
    }

    private void moveToNextCloud()
    {
        cloudTransform = difficultyObj.transform.GetChild(cloudCounter);
        cloudRenderer = cloudTransform.GetComponent<SpriteRenderer>();
        cloudTargetHeight = cloudTransform.position.y + cloudRiseHeight;
    }

    private void destroyLastClouds(Transform level, int amount)
    {
        int lastIndex = level.childCount - 1;

        for(int i = 0; i < amount; ++i)
            Destroy(level.GetChild(lastIndex - i).gameObject);
    }

    private void setLessClouds()
    {
        // Removing 2 clouds from level 2 and 3 clouds from level 3
        for(int level = 1; level <= lastLevelIndex; ++level)
            destroyLastClouds(getLevelTemplate(level).transform, level + 1);

        cloudNumber = difficultyObj.transform.childCount;
        AplicationModel.lessClouds = true;
        narratorController.changeToLessCloudsAudios();
    }

    private void animateCurrentCloud()
    {
        timeCounter += Time.deltaTime;
        if(cloudCounter >= cloudNumber) return;

        float progress = timeCounter / timeGap;

        cloudTransform.position = new Vector2(
            cloudTransform.position.x,
            Mathf.Lerp(cloudStartHeight, cloudTargetHeight, progress)
        );
        Vector2 scale = Vector2.Lerp(cloudStartScale, cloudEndScale, progress);
        cloudTransform.localScale = new Vector3(scale.x, scale.y, 1f);
        cloudRenderer.color = new Vector4(
            255f, 255f, 255f, Mathf.Lerp(0f, 1f, progress)
        );
    }

    private void advanceToNextCloud()
    {
        timeCounter = 0f;
        canvasController.changeQuantityTxt(++cloudCounter);

        if(cloudCounter < cloudNumber)
        {
            moveToNextCloud();
            cloudAudio.Play();
        }
        else if(cloudCounter > cloudNumber) handleNoClick();
    }

    void Start() // Start is called before the first frame update
    {
        timeStarted = DateTime.Now;
        AplicationModel.SceneAcesses[sceneIndex]++;
        levelCounter = 0;
        instantiateDifficulty();
        musicPlayer = GameObject.FindGameObjectWithTag(
            "Music"
        ).GetComponent<MusicPlayer>();

        resetLevelData();
        moveToNextCloud();
        playIntroductionAudio();
    }

    void Update() // Update is called once per frame
    {
        if(!gameOn) return;

        if(timeCounter < timeGap) animateCurrentCloud();
        else advanceToNextCloud();
    }
}
