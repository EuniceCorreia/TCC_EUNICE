using UnityEngine;

// Narrator of the scenes where the player chooses between the cow, the
// garbage and the trees (scenes 2 and 5)
public abstract class ThreeChoicesNarratorController : NarratorController
{
    [SerializeField] private AudioSource introductionAudio, trashSelectedAudio,
    cowSelectedAudio, treesSelectedAudio, helpAudio;
    [SerializeField] protected AudioController audioController;

    public abstract void playSceneCompletedAudio();

    public void playIntroductionAudio()
    {
        playAudio(introductionAudio);
    }

    public void playTrashSelectedAudio()
    {
        playAudio(trashSelectedAudio);
    }

    public void playCowSelectedAudio()
    {
        playAudio(cowSelectedAudio);
    }

    public void playTreesSelectedAudio()
    {
        playAudio(treesSelectedAudio);
    }

    public void playHelpAudio()
    {
        playAudio(helpAudio);
    }
}
