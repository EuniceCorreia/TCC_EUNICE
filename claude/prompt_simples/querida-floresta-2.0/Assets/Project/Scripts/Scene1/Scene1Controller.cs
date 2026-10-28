using System;
using UnityEngine;

// Clouds rise one by one; the player must click on the scenery right after
// the last cloud of the level appears
public class Scene1Controller : MonoBehaviour
{
    private const int LAST_LEVEL = 2;
    private const int MISSES_BEFORE_LESS_CLOUDS = 4;
    private const float NARRATION_DELAY = 1f;
    private static readonly float[] INTRODUCTION_AUDIO_LENGTHS = {10.67f, 7f, 10f};
    private const float HELP_AUDIO_LENGTH = 13f;
    private const float MISS_CLICK_AUDIO_LENGTH = 9f;
    private const float RIGHT_CLICK_AUDIO_LENGTH = 5f;
    private const float NOT_CLICKED_AUDIO_LENGTH = 7f;
    private const float CONGRATS_DELAY = 0.5f, NEXT_SCENE_DELAY = 9f;
    private const float GAME_MUSIC_VOLUME = 0.01f, DEFAULT_MUSIC_VOLUME = 0.1f;

    // Cloud animation
    private const float CLOUD_START_Y = -2.68f, CLOUD_RISE = 5f;
    private static readonly Vector3 CLOUD_START_SCALE = new Vector3(0.066f, 0.093f, 1f);
    private static readonly Vector3 CLOUD_END_SCALE = new Vector3(0.2f, 0.22f, 1f);

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

    void Start()
    {
        timeStarted = DateTime.Now;
        ApplicationModel.SceneAcesses[ActivityIndex.Scene1]++;
        musicPlayer = GameObject.FindGameObjectWithTag("Music")
            .GetComponent<MusicPlayer>();

        levelCounter = 0;
        instantiateDifficulty();
        resetLevelData();
        moveToNextCloud();
        playIntroduction();
    }

    void Update()
    {
        if (!gameOn) return;

        if (timeCounter < timeGap) {
            timeCounter += Time.deltaTime;
            if (cloudCounter < cloudNumber)
                animateCurrentCloud(timeCounter / timeGap);
        }
        else onCloudFinished();
    }

    // Called by Button (btStart) every level start
    public void startGame()
    {
        gameOn = true;
        cloudAudio.Play();
        musicPlayer.setMusicVolume(GAME_MUSIC_VOLUME);

        bool isFirstTry = levelCounter == 0 &&
            ApplicationModel.Scene1Misses[0] == 0;
        if (isFirstTry) {
            ApplicationModel.PlayerResponseTime[ActivityIndex.Scene1] =
                (DateTime.Now - timeStarted).TotalSeconds -
                INTRODUCTION_AUDIO_LENGTHS[0];
        }
    }

    public void showHelp() // Called by Button (btHelp)
    {
        narrate(narratorController.playHelpAudio, HELP_AUDIO_LENGTH,
            canvasController.resetInterface);
        canvasController.changeToHelpInterface();
    }

    public void checkClickOnCenario() // Called by Button (ImgBackground)
    {
        if (!gameOn) return;

        if (cloudCounter == cloudNumber) onRightClick();
        else onMissClick();

        musicPlayer.setMusicVolume(DEFAULT_MUSIC_VOLUME);
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
        foreach (Transform cloud in currentLevel.transform)
            Destroy(cloud.gameObject);
        // Then disabling it before going to the next
        currentLevel.SetActive(false);

        levelCounter++;
        timeGap -= speedIncrement;

        resetLevel();
        canvasController.hideButtons();
        canvasController.updateLevelTxt(levelCounter);
        playIntroduction();
    }

    private void narrate(Action narration, float audioLength, Action onFinished)
    {
        this.InvokeAfter(NARRATION_DELAY, narration);
        this.InvokeAfter(audioLength, onFinished);
    }

    private void playIntroduction()
    {
        int level = levelCounter;
        narrate(
            () => narratorController.playIntroductionAudio(level),
            INTRODUCTION_AUDIO_LENGTHS[level], canvasController.showButtons
        );
    }

    private void onRightClick()
    {
        audioController.hitSound();
        rainObj = Instantiate(rainObjPrefabObj);
        steamEffectsObj.SetActive(false);

        if (levelCounter < LAST_LEVEL) {
            narrate(narratorController.playRightClickAudio,
                RIGHT_CLICK_AUDIO_LENGTH, canvasController.showNextLevelButton);
        }
        else completeScene();
    }

    private void onMissClick()
    {
        bool shouldReduceClouds =
            ++ApplicationModel.Scene1Misses[levelCounter] > MISSES_BEFORE_LESS_CLOUDS &&
            !ApplicationModel.lessClouds;
        if (shouldReduceClouds) setLessClouds();

        audioController.missSound();
        cloudAudio.Stop();
        canvasController.changeToTryAgainInterface();

        int level = levelCounter;
        narrate(() => narratorController.playMissClickAudio(level),
            MISS_CLICK_AUDIO_LENGTH, canvasController.enableTryAgainButton);
    }

    // The player waited too long and all clouds have passed
    private void onCloudsNotClicked()
    {
        audioController.missSound();
        ApplicationModel.Scene1Misses[levelCounter]++;
        canvasController.changeToTryAgainInterface();
        gameOn = false;
        narrate(narratorController.playNotClickedAudio,
            NOT_CLICKED_AUDIO_LENGTH, canvasController.enableTryAgainButton);
    }

    private void completeScene()
    {
        bool wasAlreadyCompleted =
            Player.Instance.ScenesCompleted[ActivityIndex.Scene1];

        audioController.sceneCompletedSound();
        this.InvokeAfter(CONGRATS_DELAY, narratorController.playCongratsAudio);
        this.InvokeAfter(NEXT_SCENE_DELAY,
            () => sceneLoader.loadAfterActivity(wasAlreadyCompleted));

        if (sheetsController.CompleteActivity(ActivityIndex.Scene1))
            sendDataToReport();
    }

    private void sendDataToReport()
    {
        ReportCreator.resetReport();
        ReportCreator.writeLine("Atividade 1");
        ReportCreator.writeMissesPerPhase(ApplicationModel.Scene1Misses);
        ReportCreator.writeResponseTime(
            ApplicationModel.PlayerResponseTime[ActivityIndex.Scene1]
        );
    }

    private void onCloudFinished()
    {
        canvasController.changeQuantityTxt(++cloudCounter);
        timeCounter = 0f;

        if (cloudCounter < cloudNumber) {
            moveToNextCloud();
            cloudAudio.Play();
        }
        else if (cloudCounter > cloudNumber) onCloudsNotClicked();
    }

    // progress: 0 (hidden, low and small) to 1 (visible, high and big)
    private void animateCurrentCloud(float progress)
    {
        cloudTransform.position = new Vector2(
            cloudTransform.position.x,
            Mathf.Lerp(CLOUD_START_Y, cloudTargetHeight, progress)
        );
        cloudTransform.localScale =
            Vector3.Lerp(CLOUD_START_SCALE, CLOUD_END_SCALE, progress);
        cloudRenderer.color = new Vector4(
            255f, 255f, 255f, Mathf.Lerp(0f, 1f, progress)
        );
    }

    private void moveToNextCloud()
    {
        cloudTransform = difficultyObj.transform.GetChild(cloudCounter);
        cloudTargetHeight = cloudTransform.position.y + CLOUD_RISE;
        cloudRenderer = cloudTransform.GetComponent<SpriteRenderer>();
    }

    private void resetLevelData()
    {
        cloudCounter = 0;
        cloudNumber = difficultyObj.transform.childCount;
        timeCounter = 0f;
        gameOn = false;
    }

    private GameObject getLevelTemplate(int level)
    {
        return difficultiesObj.transform.GetChild(level).gameObject;
    }

    // Each level plays on a copy of its template, so it can be restarted
    private void instantiateDifficulty()
    {
        GameObject template = getLevelTemplate(levelCounter);

        template.SetActive(true);
        difficultyObj = Instantiate(template);
        template.SetActive(false);
    }

    private void setLessClouds()
    {
        // Removing 2 clouds from level 2 and 3 clouds from level 3
        for (int level = 1; level <= LAST_LEVEL; ++level) {
            Transform levelTemplate = getLevelTemplate(level).transform;
            int lastCloud = levelTemplate.childCount - 1;

            for (int j = 0; j <= level; ++j)
                Destroy(levelTemplate.GetChild(lastCloud - j).gameObject);
        }

        ApplicationModel.lessClouds = true;
        narratorController.changeToLessCloudsAudios();
    }
}
