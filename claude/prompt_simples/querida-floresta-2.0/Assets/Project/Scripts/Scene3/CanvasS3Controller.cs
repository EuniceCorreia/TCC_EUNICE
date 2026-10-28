using UnityEngine;
using UnityEngine.UI;

public class CanvasS3Controller : QuizCanvasController
{
    [SerializeField] private GameObject icon1BtnObj, icon2BtnObj, icon3BtnObj,
    word1Obj, word2Obj, quitButtonObj, repeatQuestionBtnObj;
    [SerializeField] private Sprite btn1Sprite, btn2Sprite, btn3Sprite;

    private static void destroyAll(params GameObject[] objects)
    {
        foreach (GameObject obj in objects) Destroy(obj);
    }

    public void changeToQuestionTwo() // Invoked by Scene3Controller
    {
        icon1BtnObj.GetComponent<Image>().sprite = btn1Sprite;
        icon2BtnObj.GetComponent<Image>().sprite = btn2Sprite;
        icon3BtnObj.GetComponent<Image>().sprite = btn3Sprite;
    }

    public void changeToQuestionThree() // Invoked by Scene3Controller
    {
        destroyAll(icon1BtnObj, icon2BtnObj, icon3BtnObj);
        word1Obj.SetActive(true);
        word2Obj.SetActive(true);
    }

    public void levelIsOver() // Invoked by Scene3Controller
    {
        destroyAll(repeatQuestionBtnObj, quitButtonObj, word1Obj, word2Obj);
    }
}
