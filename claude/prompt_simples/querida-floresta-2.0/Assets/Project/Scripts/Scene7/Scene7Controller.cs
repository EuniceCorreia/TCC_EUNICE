using System;
using UnityEngine;
using UnityEngine.UI;

// The player chooses which picture goes on the wall; only one is right
public class Scene7Controller : MonoBehaviour
{
    private const float NARRATION_DELAY = 1f;
    private const float INTRO_AUDIO_LENGTH = 12f;
    private const float CORRECT_AUDIO_LENGTH = 6.5f;
    private const float MISS_AUDIO_LENGTH = 6f;

    [SerializeField] private GameObject wrong1Object, wrong2Object,
    correctObject, correctPlace;
    [SerializeField] private SceneLoader sceneLoader;
    [SerializeField] private GoogleSheetsController sheetsController;
    [SerializeField] private Scene7CanvasController canvasController;
    [SerializeField] private Scene7NarratorController narratorController;
    private GameObject[] choices;

    private void Awake()
    {
        choices = new[] {wrong1Object, wrong2Object, correctObject};
    }

    void Start()
    {
        bool[] isFirstTime = ApplicationModel.IsFirstTimeInActivity;

        if (isFirstTime[ActivityIndex.Scene7]) {
            isFirstTime[ActivityIndex.Scene7] = false;
            canvasController.showBackgroundCover();
            narrate(
                narratorController.playIntroductionAudio, INTRO_AUDIO_LENGTH,
                canvasController.hideBackgroundCover
            );
        }

        addChoiceListener(wrong1Object, onWrongChoice);
        addChoiceListener(wrong2Object, onWrongChoice);
        addChoiceListener(correctObject, onCorrectChoice);
    }

    private void narrate(Action narration, float audioLength, Action onFinished)
    {
        this.InvokeAfter(NARRATION_DELAY, narration);
        this.InvokeAfter(audioLength, onFinished);
    }

    private void addChoiceListener(GameObject choice, Action onChosen)
    {
        choice.GetComponent<Button>().onClick.AddListener(() => {
            choose(choice);
            onChosen();
        });
    }

    // Covers the scene, disables the choices and puts the chosen picture on
    // the wall
    private void choose(GameObject chosenObject)
    {
        canvasController.showBackgroundCover();
        foreach (GameObject choice in choices)
            choice.GetComponent<Button>().onClick.RemoveAllListeners();

        correctPlace.GetComponent<Image>().sprite =
            chosenObject.GetComponent<Image>().sprite;
        correctPlace.SetActive(true);
        Destroy(chosenObject);
    }

    private void onWrongChoice()
    {
        ApplicationModel.Scene7Misses++;
        narrate(
            narratorController.playMissAudio, MISS_AUDIO_LENGTH,
            canvasController.changeToTryAgainInterface
        );
    }

    private void onCorrectChoice()
    {
        narrate(
            narratorController.playCorrectAudio, CORRECT_AUDIO_LENGTH,
            sceneLoader.loadScene8
        );

        // A replay after completing it starts with the introduction again
        ApplicationModel.IsFirstTimeInActivity[ActivityIndex.Scene7] = true;
        sheetsController.CompleteActivity(ActivityIndex.Scene7);
    }
}
