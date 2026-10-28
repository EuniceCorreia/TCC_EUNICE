using UnityEngine;

public class NarratorS3Controller : QuizNarratorController
{
    [SerializeField] private AudioSource question3Audio;

    public void playQuestion3Audio()
    {
        playNarratorAudio(question3Audio);
    }
}
