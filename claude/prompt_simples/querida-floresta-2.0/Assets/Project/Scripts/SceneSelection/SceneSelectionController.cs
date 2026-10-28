using UnityEngine;
using UnityEngine.UI;

// Each button opens a group of activities. A group is unlocked when the last
// activity of the previous group has been completed.
public class SceneSelectionController : MonoBehaviour
{
    // Last activity of the group of each button, except the last button
    private static readonly int[] LAST_ACTIVITY_OF_GROUP = {
        ActivityIndex.Scene1, ActivityIndex.Scene2, ActivityIndex.Scene3,
        ActivityIndex.Scene5, ActivityIndex.Scene7, ActivityIndex.Scene9
    };

    [SerializeField] private Button scene1Btn, scene2Btn, scene3Btn, scene4Btn,
    scene6Btn, scene8Btn, scene10Btn;

    void Start()
    {
        Button[] buttons =
            {scene1Btn, scene2Btn, scene3Btn, scene4Btn, scene6Btn, scene8Btn, scene10Btn};

        buttons[0].interactable = true;
        for (int i = 0; i < LAST_ACTIVITY_OF_GROUP.Length; i++) {
            if (!Player.Instance.ScenesCompleted[LAST_ACTIVITY_OF_GROUP[i]]) break;
            buttons[i + 1].interactable = true;
        }
    }
}
