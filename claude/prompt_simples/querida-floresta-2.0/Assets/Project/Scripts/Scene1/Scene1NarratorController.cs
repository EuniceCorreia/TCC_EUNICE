using UnityEngine;

public class Scene1NarratorController : NarratorController
{
    [SerializeField] private AudioSource introduction1Audio, introduction2Audio,
    introduction3Audio, missClick1Audio, missClick2Audio, missClick3Audio,
    rightClickAudio, notClickedAudio, helpAudio, congratsAudio;

    /* All invoked by Scene1Controller. `level` goes from 0 to 2 */

    public void playIntroductionAudio(int level)
    {
        AudioSource[] introductions =
            {introduction1Audio, introduction2Audio, introduction3Audio};
        playAudio(introductions[level]);
    }

    public void playMissClickAudio(int level)
    {
        AudioSource[] missClicks =
            {missClick1Audio, missClick2Audio, missClick3Audio};
        playAudio(missClicks[level]);
    }

    public void playRightClickAudio()
    {
        playAudio(rightClickAudio);
    }

    public void playNotClickedAudio()
    {
        playAudio(notClickedAudio);
    }

    public void playHelpAudio()
    {
        playAudio(helpAudio);
    }

    public void playCongratsAudio()
    {
        playAudio(congratsAudio);
    }

    // The narration of levels 2 and 3 mentions the number of clouds
    public void changeToLessCloudsAudios()
    {
        missClick2Audio.clip = Resources.Load<AudioClip>("cliqueErradoFase2");
        missClick3Audio.clip = Resources.Load<AudioClip>("cliqueErradoFase3");
        introduction2Audio.clip = Resources.Load<AudioClip>("introducaoFase2");
        introduction3Audio.clip = Resources.Load<AudioClip>("introducaoFase3");
    }
}
