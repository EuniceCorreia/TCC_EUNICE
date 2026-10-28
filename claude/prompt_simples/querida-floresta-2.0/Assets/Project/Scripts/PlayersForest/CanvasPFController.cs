using UnityEngine;
using UnityEngine.UI;

// Forest with one reward for each of the first three activities
public class CanvasPFController : MonoBehaviour
{
    private static readonly Color LOCKED_COLOR = new Color(0f, 0f, 0f, 1f);
    private static readonly Color UNLOCKED_COLOR = new Color(1f, 1f, 1f, 1f);

    [SerializeField] private GameObject reward1Obj, reward2Obj, reward3Obj,
    imgLevelSignObj;
    // Reward of the activity that has just been completed
    private GameObject newReward;

    private GameObject[] Rewards
    {
        get { return new[] {reward1Obj, reward2Obj, reward3Obj}; }
    }

    // Awake, so it is ready when PlayersForestController.Start() runs
    void Awake()
    {
        if (ApplicationModel.isForestInTemporaryMode) newReward = findNewReward();
    }

    private GameObject findNewReward()
    {
        bool[] completed = Player.Instance.ScenesCompleted;
        GameObject[] rewards = Rewards;
        int lastIndex = rewards.Length - 1;

        if (!completed[0] || completed[lastIndex]) return rewards[lastIndex];
        return completed[1] ? rewards[1] : rewards[0];
    }

    public void setRewardsActive()
    {
        GameObject[] rewards = Rewards;

        for (int i = 0; i < rewards.Length; i++)
            if (Player.Instance.ScenesCompleted[i]) rewards[i].SetActive(true);
    }

    public void setLockedEffect()
    {
        setNewRewardColor(LOCKED_COLOR);
    }

    public void removeLockedEffect()
    {
        setNewRewardColor(UNLOCKED_COLOR);
    }

    private void setNewRewardColor(Color color)
    {
        if (newReward == null) return;

        foreach (Transform part in newReward.transform)
            part.GetComponent<Image>().color = color;
    }

    // Makes the whole canvas clickable and shows the sign asking for a click
    public Button addButton()
    {
        Button canvasButton = gameObject.AddComponent<Button>();

        canvasButton.transition = Selectable.Transition.None;
        canvasButton.onClick.AddListener(() => imgLevelSignObj.SetActive(false));
        imgLevelSignObj.SetActive(true);

        return canvasButton;
    }
}
