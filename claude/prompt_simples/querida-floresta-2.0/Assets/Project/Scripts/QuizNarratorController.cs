using UnityEngine;

// Narrator of the question and answer scenes. The canvas is covered while it
// speaks so the player cannot answer before the question ends.
public abstract class QuizNarratorController : NarratorController
{
    private const float COVER_EXTRA_TIME = 1f;
    [SerializeField] private QuizCanvasController canvasController;
    [SerializeField] private AudioSource introductionAudio, question1Audio,
    question2Audio, rightAnswerAudio, wrongAnswerAudio, sceneCompletedAudio;

    public float RightAnswerAudioLength
    {
        get { return rightAnswerAudio.clip.length; }
    }

    public float SceneCompletedAudioLength
    {
        get { return sceneCompletedAudio.clip.length; }
    }

    protected void playNarratorAudio(AudioSource audio)
    {
        canvasController.activateBackgroundCover(
            audio.clip.length + COVER_EXTRA_TIME
        );
        playAudio(audio);
    }

    // Plays the introduction followed by the first question and returns
    // the time until both have finished
    public float playIntroductionAudio()
    {
        float introductionLength = introductionAudio.clip.length;

        playNarratorAudio(introductionAudio);
        this.InvokeAfter(introductionLength + 1f, playQuestion1Audio);
        return introductionLength + question1Audio.clip.length + 2f;
    }

    public void playQuestion1Audio()
    {
        playNarratorAudio(question1Audio);
    }

    public void playQuestion2Audio()
    {
        playNarratorAudio(question2Audio);
    }

    public void playRightAnswerAudio()
    {
        playNarratorAudio(rightAnswerAudio);
    }

    public void playWrongAnswerAudio()
    {
        playNarratorAudio(wrongAnswerAudio);
    }

    public void playSceneCompletedAudio()
    {
        playNarratorAudio(sceneCompletedAudio);
    }
}
