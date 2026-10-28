using UnityEngine;

public class NarratorPFController : NarratorController
{
    [SerializeField] private AudioSource unlockAudio;

    public float UnlockAudioLength
    {
        get { return unlockAudio.clip.length; }
    }

    public void playUnlockAudio()
    {
        playAudio(unlockAudio);
    }
}
