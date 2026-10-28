using System;
using UnityEngine;
using UnityEngine.UI;

// Three questions: the first two are answered with the icon buttons and the
// last one with the word buttons
public class Scene3Controller : MonoBehaviour
{
    private const float QUESTION_TWO_TRANSITION_DELAY = 2f;
    private const float QUESTION_THREE_TRANSITION_DELAY = 2.5f;
    private const float LEVEL_OVER_DELAY = 2.5f;
    private const float NEXT_NARRATION_GAP = 1f;
    private const float NEXT_SCENE_EXTRA_TIME = 3f;

    [SerializeField] private SceneLoader sceneLoader;
    [SerializeField] private GoogleSheetsController sheetsController;
    [SerializeField] private CanvasS3Controller canvasController;
    [SerializeField] private AudioController audioController;
    [SerializeField] private NarratorS3Controller narratorController;
    [SerializeField] private Button option1Btn, option2Btn, option3Btn,
    word1Btn, word2Btn, repeatQuestionBtn;
    private int questionIndex;
    private DateTime timeStarted;
    private float introductionLength;
    private bool isResponseTimeRecorded;

    private Button[] OptionButtons
    {
        get { return new[] {option1Btn, option2Btn, option3Btn}; }
    }

    void Start()
    {
        timeStarted = DateTime.Now;
        ApplicationModel.SceneAcesses[ActivityIndex.Scene3]++;
        // Replays keep the response time of the first play
        isResponseTimeRecorded =
            Player.Instance.ScenesCompleted[ActivityIndex.Scene3];

        introductionLength = narratorController.playIntroductionAudio();
        setupQuestionOne();
    }

    private void setupQuestionOne()
    {
        setupQuestion(
            OptionButtons, option3Btn, narratorController.playQuestion1Audio,
            () => {
                playAfterRightAnswerAudio(narratorController.playQuestion2Audio);
                setupQuestionTwo();
            }
        );
    }

    private void setupQuestionTwo()
    {
        this.InvokeAfter(
            QUESTION_TWO_TRANSITION_DELAY, canvasController.changeToQuestionTwo
        );
        setupQuestion(
            OptionButtons, option2Btn, narratorController.playQuestion2Audio,
            () => {
                playAfterRightAnswerAudio(narratorController.playQuestion3Audio);
                setupQuestionThree();
            }
        );
    }

    private void setupQuestionThree()
    {
        removeListeners(OptionButtons);
        this.InvokeAfter(
            QUESTION_THREE_TRANSITION_DELAY, canvasController.changeToQuestionThree
        );
        setupQuestion(
            new[] {word1Btn, word2Btn}, word1Btn,
            narratorController.playQuestion3Audio, finishScene
        );
    }

    private void setupQuestion(
        Button[] answers, Button rightAnswer, Action repeatQuestion,
        Action onRightAnswer)
    {
        repeatQuestionBtn.onClick.RemoveAllListeners();
        repeatQuestionBtn.onClick.AddListener(() => repeatQuestion());

        removeListeners(answers);
        foreach (Button answer in answers) {
            if (answer == rightAnswer) {
                answer.onClick.AddListener(() => {
                    recordResponseTime();
                    setRightAnswer(answer);
                    onRightAnswer();
                });
            }
            else {
                answer.onClick.AddListener(() => {
                    recordResponseTime();
                    setWrongAnswer(answer);
                });
            }
        }
    }

    private static void removeListeners(params Button[] buttons)
    {
        foreach (Button button in buttons) button.onClick.RemoveAllListeners();
    }

    private void playAfterRightAnswerAudio(Action narration)
    {
        this.InvokeAfter(
            narratorController.RightAnswerAudioLength + NEXT_NARRATION_GAP,
            narration
        );
    }

    // Time between the end of the introduction and the first answer
    private void recordResponseTime()
    {
        if (isResponseTimeRecorded) return;
        isResponseTimeRecorded = true;

        ApplicationModel.PlayerResponseTime[ActivityIndex.Scene3] =
            (DateTime.Now - timeStarted).TotalSeconds - introductionLength;
    }

    private void setRightAnswer(Button button)
    {
        canvasController.setAnswerEffect(button, true);
        audioController.hitSound();
        narratorController.playRightAnswerAudio();
        questionIndex++;
    }

    private void setWrongAnswer(Button button)
    {
        canvasController.setAnswerEffect(button, false);
        audioController.missSound();
        narratorController.playWrongAnswerAudio();
        ApplicationModel.Scene3Misses[questionIndex]++;
    }

    private void finishScene()
    {
        bool wasAlreadyCompleted =
            Player.Instance.ScenesCompleted[ActivityIndex.Scene3];
        float rightAnswerLength = narratorController.RightAnswerAudioLength;

        // Clicks before the words disappear must not finish the scene twice
        removeListeners(word1Btn, word2Btn);
        this.InvokeAfter(LEVEL_OVER_DELAY, canvasController.levelIsOver);
        this.InvokeAfter(
            rightAnswerLength + NEXT_NARRATION_GAP,
            narratorController.playSceneCompletedAudio
        );
        this.InvokeAfter(
            rightAnswerLength + narratorController.SceneCompletedAudioLength
                + NEXT_SCENE_EXTRA_TIME,
            () => sceneLoader.loadAfterActivity(wasAlreadyCompleted)
        );

        if (sheetsController.CompleteActivity(ActivityIndex.Scene3))
            sendDataToReport();
    }

    private void sendDataToReport()
    {
        ReportCreator.writeLine("\nAtividade 3");
        ReportCreator.writeMissesPerPhase(ApplicationModel.Scene3Misses);
        ReportCreator.writeResponseTime(
            ApplicationModel.PlayerResponseTime[ActivityIndex.Scene3]
        );
    }
}
