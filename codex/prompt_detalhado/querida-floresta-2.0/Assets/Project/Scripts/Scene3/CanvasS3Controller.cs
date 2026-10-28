using UnityEngine;
using UnityEngine.UI;

public class CanvasS3Controller : MonoBehaviour
{
    [SerializeField] private GameObject icon1BtnObj, icon2BtnObj, icon3BtnObj,
    word1Obj, word2Obj, backgroundCoverObj, quitButtonObj, repeatQuestionBtnObj;
    [SerializeField] private Sprite btn1Sprite, btn2Sprite, btn3Sprite;

    public void setAnswerEffect(Button button, bool isRightAnswer)
    {
        StartCoroutine(AnswerFeedback.Play(button, isRightAnswer));
    }

    // Invoked by activateBackgroundCover()
    public void deactivateBackgroundCover()
    {
        backgroundCoverObj.SetActive(false);
    }

    // Invoked by the option buttons
    public void activateBackgroundCover(float timeToDeactivate)
    {
        backgroundCoverObj.SetActive(true);
        Invoke("deactivateBackgroundCover", timeToDeactivate);
    }

    public void changeToQuestionTwo() // Invoked by Scene3Controller
    {
        icon1BtnObj.GetComponent<Image>().sprite = btn1Sprite;
        icon2BtnObj.GetComponent<Image>().sprite = btn2Sprite;
        icon3BtnObj.GetComponent<Image>().sprite = btn3Sprite;
    }

    public void changeToQuestionThree() // Invoked by Scene3Controller
    {
        GameObject[] objects = {icon1BtnObj, icon2BtnObj, icon3BtnObj};
        foreach (var obj in objects) Destroy(obj);

        word1Obj.SetActive(true);
        word2Obj.SetActive(true);
    }

    public void levelIsOver() // Invoked by Scene3Controller
    {
        GameObject[] objects = {
            repeatQuestionBtnObj, quitButtonObj, word1Obj , word2Obj,
        };
        foreach (var obj in objects) Destroy(obj);
    }
}
