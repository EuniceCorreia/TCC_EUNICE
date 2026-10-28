using UnityEngine;

public class NarratorMMController : NarratorController
{
    [SerializeField] private AudioSource speechAudio, cacoIntro;

    public float SpeechAudioLength
    {
        get { return speechAudio.clip.length; }
    }

    public float playSpeechAudio()
    {
        return playAudioAndGetLength(speechAudio);
    }

    public float playSpeechAudioCaco()
    {
        return playAudioAndGetLength(cacoIntro);
    }
}
