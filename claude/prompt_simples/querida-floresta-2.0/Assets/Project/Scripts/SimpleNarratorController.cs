using UnityEngine;

// Narrator with introduction, miss and congratulations audios
public abstract class SimpleNarratorController : NarratorController
{
    [SerializeField] private AudioSource introductionAudio, missClickAudio,
    congratsAudio;

    public float CongratsAudioLength
    {
        get { return congratsAudio.clip.length; }
    }

    public float playIntroductionAudio()
    {
        return playAudioAndGetLength(introductionAudio);
    }

    public void playMissClickAudio()
    {
        playAudio(missClickAudio);
    }

    public void playCongratsAudio()
    {
        playAudio(congratsAudio);
    }
}
