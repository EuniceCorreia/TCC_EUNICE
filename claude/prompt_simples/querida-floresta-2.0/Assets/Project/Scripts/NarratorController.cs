using UnityEngine;

public class NarratorController : MonoBehaviour
{
    private const string SPEAKING_PARAMETER = "isSpeaking";
    private const float SPEECH_DELAY = 0.6f;
    private Animator narratorAnimator;

    private Animator NarratorAnimator
    {
        get {
            if (narratorAnimator == null)
                narratorAnimator = GetComponent<Animator>();
            return narratorAnimator;
        }
    }

    protected void playAudio(AudioSource audio)
    {
        NarratorAnimator.SetBool(SPEAKING_PARAMETER, true);
        audio.PlayDelayed(SPEECH_DELAY);
        this.InvokeAfter(
            audio.clip.length,
            () => NarratorAnimator.SetBool(SPEAKING_PARAMETER, false)
        );
    }

    // Returns the clip length so callers can schedule what comes after it
    protected float playAudioAndGetLength(AudioSource audio)
    {
        playAudio(audio);
        return audio.clip.length;
    }
}
