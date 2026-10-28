using UnityEngine;
using UnityEngine.UI;

// First two questions of the final quiz (the third is the ConnectElements
// scene). The answer buttons are bound in the Inspector.
public class Quiz2Controller : MonoBehaviour
{
    private const int QUESTION_COUNT = 2;
    private const float NEXT_NARRATION_GAP = 1f;

    [SerializeField] private SceneLoader sceneLoader;
    [SerializeField] private Quiz2CanvasController canvasController;
    [SerializeField] private AudioController audioController;
    [SerializeField] private Quiz2NarratorController narratorController;
    private int questionIndex = 0;

    private void Start()
    {
        narratorController.playIntroductionAudio();
    }

    // Called by the right answer button
    public void rightAnswer(Button button)
    {
        float rightAnswerLength = narratorController.RightAnswerAudioLength;

        canvasController.setAnswerEffect(button, true);
        audioController.hitSound();
        narratorController.playRightAnswerAudio();
        questionIndex++;

        if (questionIndex < QUESTION_COUNT) {
            this.InvokeAfter(rightAnswerLength, canvasController.changeToQuestionTwo);
            this.InvokeAfter(
                rightAnswerLength + NEXT_NARRATION_GAP,
                narratorController.playQuestion2Audio
            );
        }
        else {
            this.InvokeAfter(
                rightAnswerLength + NEXT_NARRATION_GAP,
                sceneLoader.loadConnectFigures
            );
        }
    }

    // Called by the wrong answer buttons
    public void wrongAnswer(Button button)
    {
        canvasController.setAnswerEffect(button, false);
        audioController.missSound();
        narratorController.playWrongAnswerAudio();
        ApplicationModel.Scene10Misses[questionIndex]++;
    }

    // Called by Button (repeat question)
    public void repeatQuestionBtn()
    {
        if (questionIndex == 0) narratorController.playQuestion1Audio();
        else narratorController.playQuestion2Audio();
    }
}
