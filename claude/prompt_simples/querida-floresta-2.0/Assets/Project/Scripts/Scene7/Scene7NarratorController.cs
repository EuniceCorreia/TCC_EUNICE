using UnityEngine;

public class Scene7NarratorController : NarratorController
{
    [SerializeField] private AudioSource introductionAudio, correctAudio, missAudio;

    /* All invoked by Scene7Controller */
    public void playIntroductionAudio()
    {
        playAudio(introductionAudio);
    }

    public void playCorrectAudio()
    {
        playAudio(correctAudio);
    }

    public void playMissAudio()
    {
        playAudio(missAudio);
    }
}
